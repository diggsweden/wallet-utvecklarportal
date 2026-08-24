---
layout: default
title: "Anslut som förlitande part"
---

# Anslut som förlitande part

**Roll:** Denna guide riktar sig till **förlitande parter** (Relying Parties) som vill ansluta sina tjänster till det svenska plånbokssystemet. En förlitande part är den organisation eller tjänst som tar emot och verifierar digitala intyg från användarens plånbok.

> **Obs:** Denna anslutningsguide avser Diggs **Sandbox-miljö** för test och utveckling.

---

## Generellt anslutningsflöde

> Plånboksappen **kräver strikt HTTPS (`https://`)** för alla presentationsadresser (`request_uri` och `DirectPost`). Okrypterad `http://` avvisas av säkerhetsskäl av appen.
Vid lokal utveckling och testning mot en fysisk mobiltelefon används därför en HTTPS-tunnel (t.ex. Cloudflare Tunnel). Om tjänsterna istället körs i en servermiljö används er befintliga publika domän.

Oavsett vilken teknisk implementation du väljer, följer anslutningsprocessen dessa grundläggande steg:

1. **Förbered publik HTTPS-adress & `.env`** – Starta en temporär HTTPS-tunnel.
2. **Skapa certifikatkedja & keystore** – Generera en lokal Root CA och signerat verifierarcertifikat matchat mot domänen.
3. **Starta tjänsterna med Docker Compose** – Kör Verifier Backend, Trust Validator och Demo Web UI.
4. **Testa med plånboksappen** – Skanna QR-koden och verifiera ditt test-PID.

---

## Steg 1: Förbered publik HTTPS-adress & `.env`

### Lokal testning med Cloudflare Tunnel 

Om du utvecklar lokalt och vill kunna skanna QR-koden med en fysisk telefon exponerar du verifierarporten (`8080`) via en snabbtunnel.

Ladda ner och starta Cloudflare Tunnel i en separat terminal:

```bash
curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared && chmod +x /tmp/cloudflared
/tmp/cloudflared tunnel --url http://localhost:8080
```

Kopiera den tilldelade HTTPS-adressen från loggen (t.ex. `https://random-namn.trycloudflare.com`) och skapa filen `.env` i din projektmapp:

```bash
TUNNEL_URL="https://random-namn.trycloudflare.com" # Ersätt med din faktiska tunnel-URL
TUNNEL_HOST=$(echo "$TUNNEL_URL" | sed -e 's|^https://||' -e 's|/.*||')

cat << EOF > .env
VERIFIER_PUBLIC_URL=${TUNNEL_URL}
VERIFIER_CLIENT_ID=${TUNNEL_HOST}
DEMO_PUBLIC_BASE_URL=http://localhost:3002
EOF
```

---

## Steg 2: Skapa certifikatkedja & keystore

Verifierarens backend (`eudi-srv-verifier-endpoint`) signerar förfrågningar enligt OpenID4VP och kräver en PKCS#12-keystore (`verifier_backend.p12`) med en 2-stegs certifikatkedja (Root CA + verifierarcertifikat). Certifikatets SAN (*Subject Alternative Name*) måste matcha verifierarens `client_id` (tunneldomänen).

Kör följande script i samma mapp för att generera certifikaten och keystoren:

```bash
# Läs domän från .env (eller använd localhost som fallback)
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
CLIENT_HOST="${VERIFIER_CLIENT_ID:-localhost}"

# 1. Skapa lokal Root CA (EC P-256)
openssl ecparam -name prime256v1 -genkey -noout -out ca_key.pem
openssl req -new -x509 -key ca_key.pem -out ca_cert.pem -days 3650 \
  -subj "/C=SE/O=Test CA/CN=Test Verifier Root CA"

# 2. Skapa privat nyckel och CSR för Verifier Backend
openssl ecparam -name prime256v1 -genkey -noout -out verifier_key.pem

cat << EOF > verifier_ext.cnf
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = DNS:localhost,DNS:${CLIENT_HOST}
EOF

openssl req -new -key verifier_key.pem -out verifier_csr.pem \
  -subj "/C=SE/O=Min Organisation/CN=Verifier Backend"

# 3. Signera verifierarcertifikatet med Root CA
openssl x509 -req -in verifier_csr.pem -CA ca_cert.pem -CAkey ca_key.pem \
  -CAcreateserial -out verifier_cert.pem -days 365 -extfile verifier_ext.cnf

# 4. Paketera certifikatkedjan i verifier_backend.p12
cat verifier_cert.pem ca_cert.pem > full_chain.pem
openssl pkcs12 -export -in full_chain.pem -inkey verifier_key.pem \
  -out verifier_backend.p12 -name "verifier_backend" -passout pass:pass1234

# 5. Sätt läsrättigheter så att containern kan läsa filen
chmod 644 verifier_backend.p12
```

---

## Steg 3: Starta tjänsterna med Docker Compose

Skapa en `docker-compose.yaml` i samma mapp som `.env` och `verifier_backend.p12`. Den sätter upp:
- **`verifier-backend`**: EU:s referens-verifierare (`ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.11.0`).
- **`trust-validator`**: EU:s tillitsvaliderare (`ghcr.io/eu-digital-identity-wallet/eudi-srv-trust-validator:0.2.2-alpha`), förkonfigurerad mot Diggs Sandbox LoTE (`https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json`).
- **`demo-verifier`**: Test-webbgränssnitt (`ghcr.io/diggsweden/wallet-verifier-test-web:0.1.10`) på port `3002`.

```yaml
services:
  verifier-backend:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.11.0
    container_name: verifier-backend
    volumes:
      - ./verifier_backend.p12:/opt/common/verifier_backend.p12:ro
    environment:
      SPRING_WEBFLUX_BASEPATH: "/verifier"
      VERIFIER_PUBLICURL: "${VERIFIER_PUBLIC_URL:-http://localhost:8080}/verifier"
      VERIFIER_ORIGINALCLIENTID: "${VERIFIER_CLIENT_ID:-localhost}"
      VERIFIER_CLIENTIDPREFIX: "x509_san_dns"
      SPRING_PROFILES_ACTIVE: "self-signed"
      VERIFIER_ACCESS_CERTIFICATE_SIGNING_ALGORITHM: "ES256"
      VERIFIER_ACCESS_CERTIFICATE_KEYSTORE: "file:///opt/common/verifier_backend.p12"
      VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_TYPE: "PKCS12"
      VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_PASSWORD: "pass1234"
      VERIFIER_ACCESS_CERTIFICATE_ALIAS: "verifier_backend"
      VERIFIER_ACCESS_CERTIFICATE_PASSWORD: "pass1234"
      VERIFIER_DEFEAULTHTTPRESPONSEMODE: "DirectPost"
      VERIFIER_ATTESTATIONCLASSIFICATIONS_PID_VCTS: "urn:eudi:pid:1"
      VERIFIER_TRUST_VALIDATOR_SERVICE_URL: "http://trust-validator:8080/trust-validator/trust"
      LOGGING_LEVEL_EU_EUROPA_EC_EUDI_VERIFIER_ENDPOINT: "DEBUG"
      JAVA_OPTS: "-XX:MaxDirectMemorySize=128M"
    ports:
      - "8080:8080"
    depends_on:
      - trust-validator

  trust-validator:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-trust-validator:0.2.2-alpha
    container_name: trust-validator
    environment:
      SPRING_WEBFLUX_BASE_PATH: "/trust-validator"
      TRUST_VALIDATOR_DSS_CACHE_LOCATION: "/tmp/dss-cache"
      TRUST_VALIDATOR_LOTE_CACHE_LOCATION: "/tmp/lote-cache"
      TRUST_VALIDATOR_TRUST_SOURCES_PID_PROVIDERS_LOTE_LOCATION: "https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json"
      TRUST_VALIDATOR_TRUST_SOURCES_PID_PROVIDERS_LOTE_ISSUANCE_SERVICE: "http://uri.etsi.org/19602/SvcType/PID/Issuance"
      TRUST_VALIDATOR_TRUST_SOURCES_PID_PROVIDERS_LOTE_REVOCATION_SERVICE: "http://uri.etsi.org/19602/SvcType/PID/Revocation"
      TRUST_VALIDATOR_TRUST_SOURCES_WALLET_PROVIDERS_LOTE_LOCATION: "https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json"
      TRUST_VALIDATOR_TRUST_SOURCES_WALLET_PROVIDERS_LOTE_ISSUANCE_SERVICE: "http://uri.etsi.org/19602/SvcType/WalletSolution/Issuance"
      TRUST_VALIDATOR_TRUST_SOURCES_WALLET_PROVIDERS_LOTE_REVOCATION_SERVICE: "http://uri.etsi.org/19602/SvcType/WalletSolution/Revocation"

  demo-verifier:
    image: ghcr.io/diggsweden/wallet-verifier-test-web:0.1.10
    container_name: demo-verifier
    environment:
      HOST_API: "http://verifier-backend:8080/verifier"
      PORT: "3002"
      NITRO_PORT: "3002"
      NUXT_PUBLIC_BASE_URL: "${DEMO_PUBLIC_BASE_URL:-http://localhost:3002}/demo-verifier"
      NUXT_APP_BASE_URL: "/demo-verifier"
      NODE_TLS_REJECT_UNAUTHORIZED: "0"
    ports:
      - "3002:3002"
    depends_on:
      - verifier-backend
```

Starta tjänsterna:
```bash
docker compose up -d
```

---

## Steg 4: Testa och logga in med plånboksappen

1. **Installera testappen & hämta PID:**
    - Följ [Guiden för att prova plånboksappen](planboksappen/prova-planboksappen.md) för att installera appen på din telefon.
    - Öppna appen, välj **Hämta personuppgifter**, logga in mot Sandbox-utfärdaren med en testanvändare och spara ditt test-PID.
2. **Öppna test-webbplatsen på datorn:**
    - Gå till **[http://localhost:3002/demo-verifier](http://localhost:3002/demo-verifier)** i din webbläsare.
    - Välj ett scenario (t.ex. *Vaccincentralen* eller *Biocentralen*).
    - Klicka på **Logga in med din digitala plånbok** -> **Starta inloggningen**.
3. **Skanna & verifiera:**
    - Skanna den genererade QR-koden med plånboksappen på din telefon.
    - Granska de begärda uppgifterna i appen och tryck **Godkänn / Skicka**.
    - Plånboken signerar presentationen via Sandbox HSM och skickar den till din Verifier Backend via den publika HTTPS-adressen.
    - Webbläsaren på datorn uppdateras automatiskt och visar de verifierade personuppgifterna!

---

## Support och fördjupning

### Kontakt

För tekniska frågor och hjälp med anslutningsprocessen & testmiljön kontakta: [digitalwallet@digg.se](mailto:digitalwallet@digg.se)

### Dokumentation och specifikationer

För en djupare förståelse av plånbokssystemet:

- **Huvudprojekt:** [diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)
- **Tekniska standarder:** [Standarder & Profiler](standarder-och-profiler.md) (OpenID4VP, OpenID4VCI, SD-JWT VC).
- **EUDIW dokumentation:** [eudi-doc-architecture-and-reference-framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/)

---

*Denna guide uppdaterades senast augusti 2026.*

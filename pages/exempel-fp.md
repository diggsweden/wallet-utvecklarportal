---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: "Anslut som förlitande part med exempel"
---

# Anslut som förlitande part med exempel

> **Obs:** Läs [Anslut som förlitande part](anslutning-fp.md) först.
> Specifikt begär åtkomst till plånboksappen
> så att du har tillgång till den när det är dags att testa anslutningen.

---

## Anslutningsflöde

> Plånboksappen **kräver strikt HTTPS (`https://`)** för alla presentationsadresser (`request_uri` och `DirectPost`).
> Okrypterad `http://` avvisas av säkerhetsskäl av appen.
> Vid lokal utveckling och testning mot en fysisk mobiltelefon används därför en HTTPS-tunnel (t.ex. Cloudflare Tunnel).
> Om tjänsterna istället körs i en servermiljö används er befintliga publika domän.

Här följer ett exempel som använder Docker Compose för att köra Diggs verifierar-frontend tillsammans med EU:s
referensimplementation av en verifierar-backend för OpenID4VP.

---

## Steg 1: Förbered publik HTTPS-adress och .env

### Lokal testning med Cloudflare Tunnel

Om du utvecklar lokalt och vill kunna skanna QR-koden med en fysisk telefon kan du exponera verifierarporten (`8080`)
via en snabbtunnel.
Trafiken kommer då att gå via en betrodd HTTPS-domän över internet.

Ladda ner och starta Cloudflare Tunnel i en separat terminal:

> **Obs:**
> Exemplet nedan är anpassat för Linux.
> Om du kör instruktionerna på en annan plattform
> kan du själv ladda ner rätt variant av
> [Cloudflares mjukvara](https://github.com/cloudflare/cloudflared/releases/latest)
> och sedan starta tunneln:
> ```
> <path-to-cloudflared> tunnel --url http://localhost:8080
> ```

```bash
curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared && chmod +x /tmp/cloudflared
/tmp/cloudflared tunnel --url http://localhost:8080
```

> **Obs om felloggar i tunneln:**
> Innan tjänsterna har startats i Steg 3 kommer Cloudflare-tunneln kontinuerligt att logga
> `connect: connection refused` mot port `8080`.
> Detta är helt normalt och upphör så snart Docker Compose-miljön startats.
>
> **Viktigt om tunnelns livscykel:**
> Cloudflares snabbtunnlar (`https://*.trycloudflare.com`) tilldelar en ny slumpmässig domän vid varje omstart.
> Om tunneln avbryts eller startas om måste du uppdatera `VERIFIER_PUBLIC_URL` i `.env` och köra
> `docker compose up -d` igen.
> Klientidentifieraren och de nedladdade certifikaten kan behållas i den nuvarande testmiljön, se Steg 2.

Kopiera den tilldelade HTTPS-adressen från loggen (t.ex. `https://random-namn.trycloudflare.com`).
Skapa filen `.env` i projektets rotmapp med följande innehåll.
Ersätt exempeladressen i `VERIFIER_PUBLIC_URL` med din tunneladress.

```dotenv
VERIFIER_PUBLIC_URL=https://random-namn.trycloudflare.com
VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_PASSWORD=abcd1234
VERIFIER_ACCESS_CERTIFICATE_ALIAS=verifier_access_certificate
DEMO_PUBLIC_BASE_URL=http://localhost:3002
```

---

## Steg 2: Hämta åtkomstcertifikat och registreringscertifikat

Hämta följande testmaterial från Digg:

- **`verifier-access-certificate.p12`:** En `.p12`-fil med åtkomstcertifikat, privat nyckel och certifikatkedja.
  Backend använder den för att signera OpenID4VP-förfrågningar.
  Se till att filen är läsbar för användaren som kör backend-containern.
- **`registration_certificate.jwt`:** Ett registreringscertifikat som signerad JWT.
  Backend skickar med det i förfrågningarna för avsedd användning med id `1`.

Exemplet förutsätter lösenordet `abcd1234` och nyckelaliaset `verifier_access_certificate`.
Kontrollera uppgifterna som följer med materialet och anpassa `.env` vid behov.
Lösenordet för `.p12`-filen och den privata nyckelns lösenord förutsätts vara samma.

> **Om klientidentifieraren och den publika adressen:** Compose-exemplet använder `VERIFIER_CLIENT_ID` från `.env`
> för att sätta EU-verifierarens miljövariabel `VERIFIER_ORIGINALCLIENTID`.
> Med `VERIFIER_CLIENTIDPREFIX=x509_hash` blir förfrågans `client_id` då `x509_hash:<certifikathash>`.
> Värdet i `VERIFIER_CLIENT_ID` ska vara SHA-256 av åtkomstcertifikatet i DER-format,
> kodat som base64url utan utfyllnad (`=`), utan prefixet `x509_hash:`.
> Kommandona nedan beräknar värdet från lövcertifikatet i `.p12`-filen och lägger till det i `.env`.
> Behåll värdet även när tunneln får en ny adress och beräkna om det när åtkomstcertifikatet byts ut.
> Den publika adressen måste fortfarande ha ett betrott HTTPS-certifikat.

Kör i samma projektmapp som `.env`:

```bash
set -euo pipefail

. ./.env

curl --fail --show-error --location \
  https://wallet.sandbox.digg.se/trust-source/utvecklarportalen/verifier/verifier-access-certificate.p12 \
  --output verifier-access-certificate.p12
curl --fail --show-error --location \
  https://wallet.sandbox.digg.se/trust-source/utvecklarportalen/verifier/registration_certificate.jwt \
  --output registration_certificate.jwt

VERIFIER_CLIENT_ID=$(
  openssl pkcs12 -in verifier-access-certificate.p12 -clcerts -nokeys \
    -passin "pass:${VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_PASSWORD}" |
    openssl x509 -outform DER |
    openssl dgst -sha256 -binary |
    openssl base64 -A |
    tr '+/' '-_' | tr -d '='
)
printf 'VERIFIER_CLIENT_ID=%s\n' "$VERIFIER_CLIENT_ID" >> .env
printf 'client_id=x509_hash:%s\n' "$VERIFIER_CLIENT_ID"

printf 'VERIFIER_REGISTRATION_CERTIFICATE=%s\n' \
  "$(tr -d '\r\n' < registration_certificate.jwt)" >> .env
```

Kommandona ovan sparar registreringscertifikatets JWT-sträng på en rad i `.env`,
så att den kan läsas in via `environment` för `verifier-backend` i nästa steg.

Det publika certifikatmaterialet och lösenordet tillhandahålls tillfälligt för användning i testmiljön.
Framöver behöver ni beställa åtkomst- och registreringscertifikat för er egen organisation även för att använda
testplattformen.

---

## Steg 3: Starta tjänsterna med Docker Compose

Skapa en `docker-compose.yaml` i samma mapp som `.env` och `verifier-access-certificate.p12`.
Den sätter upp:

- **`verifier-backend`**:
  EU:s referensverifierare (`ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.11.0`).
- **`trust-validator`**:
  EU:s tillitsvaliderare (`ghcr.io/eu-digital-identity-wallet/eudi-srv-trust-validator:0.3.1-alpha`),
  förkonfigurerad med en LoTE som litar på Testplattform för digital identitetsplånbok
  (<https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json>).
- **`demo-verifier`**: Testwebbgränssnitt (`ghcr.io/diggsweden/wallet-verifier-test-web:0.1`) på port `3002`.

[//]: # (spell-checker:disable)

```yaml
services:
  verifier-backend:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.11.0
    container_name: verifier-backend
    volumes:
      - ./verifier-access-certificate.p12:/opt/common/verifier-access-certificate.p12:ro
    environment:
      SPRING_WEBFLUX_BASEPATH: "/verifier"
      VERIFIER_PUBLICURL: "${VERIFIER_PUBLIC_URL:?Ange VERIFIER_PUBLIC_URL i .env}/verifier"
      VERIFIER_ORIGINALCLIENTID: "${VERIFIER_CLIENT_ID:?Ange VERIFIER_CLIENT_ID i .env}"
      VERIFIER_CLIENTIDPREFIX: "x509_hash"
      VERIFIER_ACCESS_CERTIFICATE_SIGNING_ALGORITHM: "ES256"
      VERIFIER_ACCESS_CERTIFICATE_KEYSTORE: "file:///opt/common/verifier-access-certificate.p12"
      VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_TYPE: "PKCS12"
      VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_PASSWORD: "${VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_PASSWORD:?Ange lösenord i .env}"
      VERIFIER_ACCESS_CERTIFICATE_ALIAS: "${VERIFIER_ACCESS_CERTIFICATE_ALIAS:?Ange nyckelalias i .env}"
      VERIFIER_ACCESS_CERTIFICATE_PASSWORD: "${VERIFIER_ACCESS_CERTIFICATE_KEYSTORE_PASSWORD:?Ange lösenord i .env}"
      VERIFIER_INTENDEDUSES_0_ID: "1"
      VERIFIER_INTENDEDUSES_0_DESCRIPTION: "Identifiering med personuppgifter"
      VERIFIER_INTENDEDUSES_0_REGISTRATIONCERTIFICATE: "${VERIFIER_REGISTRATION_CERTIFICATE:?Ange registreringscertifikat i .env}"
      VERIFIER_DEFAULTHTTPRESPONSEMODE: "DirectPost"
      VERIFIER_ATTESTATIONCLASSIFICATIONS_PID_VCTS: "urn:eudi:pid:1"
      VERIFIER_TRUST_VALIDATOR_SERVICE_URL: "http://trust-validator:8080/trust-validator/trust"
      LOGGING_LEVEL_EU_EUROPA_EC_EUDI_VERIFIER_ENDPOINT: "DEBUG"
      JAVA_OPTS: "-XX:MaxDirectMemorySize=128M"
    ports:
      - "8080:8080"
    depends_on:
      - trust-validator

  trust-validator:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-trust-validator:0.3.1-alpha
    container_name: trust-validator
    environment:
      SPRING_WEBFLUX_BASE_PATH: "/trust-validator"
      TRUST_VALIDATOR_ENABLE_CERTIFICATE_REVOCATION_CHECK: "false"
      TRUST_VALIDATOR_DSS_FILE_CACHE_LOCATION: "/tmp/dss-cache"
      TRUST_VALIDATOR_LOTE_FILE_CACHE_LOCATION: "/tmp/lote-cache"
      TRUST_VALIDATOR_TRUST_SOURCES_PID_PROVIDERS_LOTE_LOCATION: "https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json"
      TRUST_VALIDATOR_TRUST_SOURCES_PID_PROVIDERS_LOTE_ISSUANCE_SERVICE: "http://uri.etsi.org/19602/SvcType/PID/Issuance"
      TRUST_VALIDATOR_TRUST_SOURCES_PID_PROVIDERS_LOTE_REVOCATION_SERVICE: "http://uri.etsi.org/19602/SvcType/PID/Revocation"
      TRUST_VALIDATOR_TRUST_SOURCES_WALLET_PROVIDERS_LOTE_LOCATION: "https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json"
      TRUST_VALIDATOR_TRUST_SOURCES_WALLET_PROVIDERS_LOTE_ISSUANCE_SERVICE: "http://uri.etsi.org/19602/SvcType/WalletSolution/Issuance"
      TRUST_VALIDATOR_TRUST_SOURCES_WALLET_PROVIDERS_LOTE_REVOCATION_SERVICE: "http://uri.etsi.org/19602/SvcType/WalletSolution/Revocation"

  demo-verifier:
    image: ghcr.io/diggsweden/wallet-verifier-test-web:0.1
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

[//]: # (spell-checker:enable)

Starta tjänsterna:

```bash
docker compose up -d
```

### Kontrollera att tjänsterna svarar

Verifiera att backend och tunnel är redo innan du testar inloggningen i appen:

```bash
# Verifiera lokal backend (ska svara HTTP 200)
curl -sI http://localhost:8080/verifier/actuator/health

# Verifiera publik tunnel (ska svara HTTP 200)
. ./.env
curl -sI "${VERIFIER_PUBLIC_URL}/verifier/actuator/health"
```

---

## Steg 4: Testa och logga in med plånboksappen

1. **Installera testappen och hämta PID:**
   - Följ [Guiden för att prova plånboksappen](planboksappen/prova-planboksappen.md) för att installera appen på din
     telefon.
   - Öppna appen, välj **Hämta personuppgifter**, logga in mot utfärdaren med en testanvändare och spara ditt test-PID.
2. **Öppna testwebbplatsen på datorn:**
   - Gå till **[http://localhost:3002/demo-verifier](http://localhost:3002/demo-verifier)** i din webbläsare.
   - Välj ett scenario (t.ex. *Vaccincentralen* eller *Biocentralen*).
   - Klicka på **Logga in med din digitala plånbok** -> **Starta inloggningen**.
3. **Skanna och verifiera:**
   - Skanna den genererade QR-koden med plånboksappen på din telefon.
   - Granska de begärda uppgifterna i appen och tryck **Godkänn / Skicka**.
   - Plånboken signerar presentationen via testplattformens HSM och skickar den till din Verifier Backend via den
     publika HTTPS-adressen.
   - Webbläsaren på datorn uppdateras automatiskt och visar de verifierade personuppgifterna!

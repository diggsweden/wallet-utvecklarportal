---
layout: default
title: "Anslut som förlitande part"
---

# Anslut som förlitande part

**Roll:** Denna guide riktar sig till **förlitande parter** (Relying Parties) som vill ansluta sina tjänster till det svenska plånbokssystemet. En förlitande part är den organisation eller tjänst som tar emot och verifierar digitala intyg från användarens plånbok.

> **Obs:** Denna anslutningsguide avser Diggs **Sandbox-miljö** för test och utveckling.

---

## Generellt anslutningsflöde

Oavsett vilken teknisk implementation du väljer, följer anslutningsprocessen dessa grundläggande steg:

1. **Etablera tillit (LoTE)** – Tillitsförhållanden etableras dynamiskt genom Sandboxens publika tillitslista (**LoTE** – *List of Trusted Entities* enligt ETSI TS 119 602). Inget manuellt certifikatsutbyte via e-post krävs.
2. **Skapa din identitet (Signing Key)** – Generera den privata nyckeln och det certifikat som identifierar din Verifier Backend.
3. **Konfigurera din Verifier Backend & Trust Validator** – Ställ in din verifierartjänst samt tillitsvalidering mot Sandboxens LoTE.
4. **Testa med testplånbok** – Verifiera att din integration fungerar mot Diggs Sandbox-miljö och testplånboksapp.

---

## Detaljerad genomgång

### Steg 1: Etablera tillit med Sandbox LoTE

Plånbokssystemet använder en maskinläsbar tillitslista (**LoTE** – *List of Trusted Entities*) baserad på standarden **ETSI TS 119 602**. Tillitslistan publiceras som en kryptografiskt signerad JWT (JWS med ES256) som innehåller certifikatkedjor och beviljad status för samtliga godkända aktörer i Sandbox-miljön (både PID-utfärdare och Wallet Providers).

#### 1.1 Sandbox LoTE-endpoint

I Diggs Sandbox-miljö publiceras den aktuella LoTE-filen publikt på följande URL:

```
https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json
```

Du kan själv inspektera innehållet i tillitslistan med `curl` och valfritt JWT-verktyg:

```bash
# Hämta LoTE JWT från Sandbox
curl -s https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json | cut -d'.' -f2 | base64 -d 2>/dev/null | jq .
```

Payloaden innehåller strukturerad information om beviljade tjänster:
- **PID-utfärdande:** `http://uri.etsi.org/19602/SvcType/PID/Issuance`
- **Plånboksutfärdande:** `http://uri.etsi.org/19602/SvcType/WalletSolution/Issuance`

#### 1.2 Hur tilliten valideras

I stället för att manuellt ladda ner och konfigurera statiska truststores (`.p12`) hos varje förlitande part, använder verifieraren en tillitsvalideringstjänst (**Trust Validator**, referensimplementation `ghcr.io/eu-digital-identity-wallet/eudi-srv-trust-validator`). Trust Validator läser kontinuerligt in och cachar LoTE från Sandboxens endpoint och validerar inkommande intyg och plånbokssignaturer automatiskt.

---

### Steg 2: Skapa din digitala identitet (Signing Key)

En **Signing Key** är din förlitande parts privata kryptografiska nyckel. Den används för att:
- Signera förfrågningar (Request Objects / Authorization Requests) enligt OpenID4VP-protokollet.
- Identifiera din specifika **Verifier Backend-instans** gentemot plånboken.
- Säkerställa integriteten på presentationsflödet.

#### Om Signing Key

| Aspekt | Beskrivning |
|--------|--------------|
| **Syfte** | Signerar förfrågningar till plånboken enligt OpenID4VP-protokollet |
| **Skapas av** | Din organisation (för test: självsignerat certifikat; för produktion: CA-signerat certifikat) |
| **Identifierar** | Din specifika **Verifier Backend-instans** (teknisk klient), inte organisationen i sig |
| **Format** | EC P-256 privat nyckel + tillhörande X.509-certifikat (publika nyckeln) paketerat i PKCS#12 (`.p12`) |
| **Klient-ID typ** | `x509_san_dns` (klientens ID matchar SAN DNS-namnet i certifikatet) |

#### 2.1 Generera Signing Key & Certifikat (för test)

För Sandbox-miljön och lokala tester skapar du ett självsignerat EC P-256 certifikat och paketerar det i en `.p12`-fil:

```bash
# 1. Generera privat EC-nyckel (P-256) och självsignerat X.509-certifikat
openssl req -x509 -newkey ec:<(openssl ecparam -name prime256v1) -nodes \
  -keyout verifier_key.pem -out verifier_cert.pem -days 365 \
  -subj "/C=SE/O=Min Organisation/CN=Verifier Backend" \
  -addext "subjectAltName=DNS:localhost,DNS:din-verifierare.example.se"

# 2. Paketera nyckeln och certifikatet i en PKCS#12-fil (verifier_backend.p12)
openssl pkcs12 -export -in verifier_cert.pem -inkey verifier_key.pem \
  -out verifier_backend.p12 -name "verifier_backend" -passout pass:pass1234
```

> **Säkerhetsnotis:** Självsignerade certifikat används enbart i testmiljöer. I framtida produktion krävs certifikat utfärdat av en godkänd certifikatutfärdare (CA) under det nationella tillitsramverket.

---

### Steg 3: Konfigurera Verifier Backend & Trust Validator

Verifieraren ansvarar för att:
1. Skapa och signera presentationsförfrågningar (Presentation Requests med DCQL).
2. Ta emot presentationsresponsen från plånboken via `DirectPost`.
3. Anropa **Trust Validator** för att verifiera att intygen och plånboken finns med och är beviljade i Sandbox LoTE.

#### Komplett Docker Compose-exempel

Nedan finns en komplett, körbar `docker-compose.yaml` som sätter upp både EU:s referens-verifierare (`eudi-srv-verifier-endpoint:v0.11.0`) och tillitsvalideraren (`eudi-srv-trust-validator:0.2.2-alpha`), förkonfigurerad mot Diggs Sandbox LoTE:

```yaml
services:
  verifier-backend:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.11.0
    container_name: verifier-backend
    volumes:
      - ./verifier_backend.p12:/opt/common/verifier_backend.p12:ro
    environment:
      SPRING_WEBFLUX_BASEPATH: "/verifier"
      VERIFIER_PUBLICURL: "https://din-verifierare.example.se/verifier"
      VERIFIER_ORIGINALCLIENTID: "localhost"
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
```

---

### Steg 4: Testa med Diggs testplånbok

För att verifiera att din uppsatta miljö fungerar och kan kommunicera med plånboken, använder du **Diggs test-plånboksapp**.

#### Hur du testar

1. **Installera test-plånboksappen** – Följ [Guiden för att prova plånboksappen](planboksappen/prova-planboksappen.md) för att få tillgång via TestFlight (iOS) eller Google Play (Android).
2. **Hämta test-ID (PID)** – Logga in mot Diggs testutfärdare i appen för att ladda ner en test-PID.
3. **Initiera förfrågan** – Från din Verifier Backend, skapa en presentationsförfrågan (Authorization Request).
4. **Presentera intyg** – Skanna QR-koden eller öppna länken i test-plånboksappen och godkänn delningen.
5. **Validera svar** – Din Verifier Backend tar emot svaret via `DirectPost` och verifierar intyget och dess utfärdare mot Sandbox LoTE via Trust Validator.

---

### Support och fördjupning

#### Kontakt

För tekniska frågor och hjälp med anslutningsprocessen eller testmiljön, kontakta: [digitalwallet@digg.se](mailto:digitalwallet@digg.se).

#### Dokumentation och specifikationer

- **Huvudprojekt:** [diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)
- **Tekniska standarder:** [Standarder & Profiler](standarder-och-profiler.md) (OpenID4VP, OpenID4VCI, SD-JWT VC, ETSI TS 119 602)
- **EUDIW dokumentation:** [eudi-doc-architecture-and-reference-framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/)

---

### Sammanfattning: Checklista

- [ ] Har genererat Signing Key och PKCS#12-keystore (`verifier_backend.p12`)
- [ ] Har konfigurerat Trust Validator mot Sandbox LoTE (`https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json`)
- [ ] Har startat och konfigurerat Verifier Backend
- [ ] Har installerat Diggs test-plånboksapp
- [ ] Har genomfört en lyckad presentation och validering med testplånboken

---

*Denna guide uppdaterades senast augusti 2026.*

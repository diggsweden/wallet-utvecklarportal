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

1. **Etablera tillit** – Hämta och konfigurera de certifikat som krävs för att validera plånboken och dess intyg.
2. **Skapa din identitet** – Generera den kryptografiska nyckel (Signing Key) som identifierar din tjänst.
3. **Konfigurera din backend** – Ställ in din system för att kommunicera med plånbokssystemet.
4. **Testa med testplånbok** – Verifiera att din integration fungerar med Diggs testmiljö.

---

## Detaljerad genomgång

### Steg 1: Etablera tillit med plånbokssystemet

För att din verifierare (backend) ska kunna validera att en plånbok och dess intyg är äkta, behöver du de publika certifikat som utfärdats av Digg.

#### 1.1 Hämta publika certifikat från Digg

Kontakta [digitalwallet@digg.se](mailto:digitalwallet@digg.se) för att få följande certifikat:

- **`sandbox_root_ca.pem`** – Ekosystemets gemensamma rot-certifikat. Används för att validera att plånboken och dess intyg kommer från en betrodd källa.
- **`pid_issuer.pem`** – Certifikatet för den part som utfärdar Personidentitetsdata (PID) i Sandbox-miljön.

#### 1.2 Skapa din förtroendelista (Trust Store)

Din verifierare behöver en Trust Store (i PKCS12-format) för att veta vilka utfärdare den ska lita på. Du skapar denna genom att importera de PEM-filer du fått från Digg:

```bash
# Importera Sandbox-roten
keytool -importcert -noprompt -alias sandbox_root_ca -file sandbox_root_ca.pem \
  -keystore trusted_issuers.p12 -storepass pass1234 -storetype PKCS12

# Importera PID-utfärdaren
keytool -importcert -noprompt -alias pid_issuer -file pid_issuer.pem \
  -keystore trusted_issuers.p12 -storepass pass1234 -storetype PKCS12
```

### Steg 2: Skapa din digitala identitet (Signing Key)

En **Signing Key** är en kryptografisk nyckel som används för att:
- Signera förfrågningar (Request Objects) som skickas till plånboken
- Säkerställa att förfrågan kommer från en legitim aktör
- Skydda integriteten på kommunikationen

#### Om Signing Key

**Du behöver både Signing Key och certifikat.** Signing Key är din *privata nyckel* som används för att signera förfrågningar. Certifikatet innehåller din *publika nyckel* samt metadata och används av plånboken för att verifiera din signatur och din identitet.

| Aspekt | Beskrivning |
|--------|--------------|
| **Syfte** | Signerar förfrågningar till plånboken enligt OpenID4VP-protokollet |
| **Skapas av** | Din organisation (för test: självsignerat certifikat; för produktion: CA-signerat) |
| **Identifierar** | Din specifika **Verifier Backend-instans** (teknisk klient), inte organisationen i sig |
| **Format** | EC P-256 privat nyckel + tillhörande certifikat (publika nyckeln) |
| **Säkerhetsaspekter** | Bör granskas ur informationssäkerhetsperspektiv. För produktion krävs certifikat utfärdat av en betrodd certifikatutfärdare (CA). För Sandbox-miljön räcker självsignerade certifikat. |
| **Juridisk status** | Signing Key och dess certifikat representerar din tekniska klient i ekosystemet. Se till att nyckeln och certifikatet hanteras enligt din organisations säkerhetspolicy. |

#### 2.1 Generera Signing Key (för test)

För lokala tester och Sandbox-miljön kan du generera ett självsignerat certifikat:

```bash
# Generera en privat EC-nyckel (P-256) och ett självsignerat certifikat
openssl req -x509 -newkey ec:<(openssl ecparam -name prime256v1) -nodes \
  -keyout verifier_key.pem -out verifier_cert.pem -days 365 \
  -subj "/C=SE/O=Din Organisation/CN=Din Verifier Backend" \
  -addext "subjectAltName=DNS:wallet.sandbox.digg.se,DNS:localhost"

# Paketera nyckeln och certifikatet i en PKCS12-fil
openssl pkcs12 -export -in verifier_cert.pem -inkey verifier_key.pem \
  -out verifier_backend.p12 -name "verifier_backend" -passout pass:pass1234
```

> **Säkerhetsnotis:** Använd inte självsignerade certifikat i produktion. För produktion, ansök om certifikat från en godkänd CA.

### Steg 3: Konfigurera din Verifier Backend

Din backend (verifierare) ansvarar för att:
- Skapa förfrågningar om intyg (Credential Requests)
- Ta emot och validera presenterade intyg från plånboken
- Utföra affärslogik baserat på de verifierade intygen

#### 3.1 Generell konfiguration (teknik-oberoende)

Oavsett vilken implementation du använder, behöver du konfigurera:

- **Publik endpoint** – URL dit plånboken kan skicka sina svar
- **Tillitsankare** – De certifikat som din backend litar på (Trust Store)
- **Egen identitet** – Din Signing Key och certifikat
- **Kravspecifikation** – Vilka intygstyper du begär (t.ex. PID)

#### 3.2 Exempel: Referensimplementation (EUDIW)

Digg använder EU:s referensimplementations backendtjänst i test. Den återfinns på: `ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint`.

##### Docker Compose-exempel

```yaml
services:
  verifier-backend:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.8.0
    volumes:
      - ./verifier_backend.p12:/opt/common/verifier_backend.p12:ro
      - ./trusted_issuers.p12:/opt/common/trusted_issuers.p12:ro
    environment:
      # Ditt publika endpoint (måste matcha vad som anges i certifikatets SAN)
      VERIFIER_PUBLICURL: "https://din-domän.se/verifier"
      
      # Sökvägar till dina PKCS12-filer
      VERIFIER_JAR_SIGNING_KEY_KEYSTORE: "file:///opt/common/verifier_backend.p12"
      VERIFIER_TRUSTSOURCES_0_KEYSTORE_PATH: "file:///opt/common/trusted_issuers.p12"
      VERIFIER_TRUSTSOURCES_0_KEYSTORE_PASSWORD: "pass1234"
      VERIFIER_JAR_SIGNING_KEY_KEYSTORE_PASSWORD: "pass1234"
      
      # Typ av klientidentifiering
      VERIFIER_CLIENTIDPREFIX: "x509_san_dns"
      
      # ... övriga variabler enligt projektets README ...
    ports:
      - "8080:8080"
```

> **Notis:** Detta är ett exempel med referensimplementationen. Andra implementationer kan kräva olika konfigurationsparametrar.

---

## Steg 4: Testa med Diggs testplånbok

För att verifiera att din uppsatta miljö fungerar och kan kommunicera med plånboken, behöver du använda **Diggs test-plånboksapp**.

### Om testplånboken

- **Tillhandahålls av:** Digg
- **Syfte:** Test och utveckling i Sandbox-miljön
- **Plattform:** Tillgänglig för iOS och Android
- **Testdata:** Innehåller test-identiteter (PID) för utveckling

### Hur du testar

1. **Installera test-plånboksappen** – Följ [Guiden för att prova plånboksappen](prova-planboksappen.md) för detaljerade instruktioner.
2. **Hämta test-ID (PID)** – Använd testanvändare för att ladda ner ett test-intyg.
3. **Initiera förfrågan** – Från din backend, skapa en förfrågan om intyg (t.ex. PID).
4. **Presentera intyg** – Använd test-plånboksappen för att skanna QR-koden eller följa länken.
5. **Validera svar** – Din backend tar emot och validerar det presenterade intyget.

> **Viktigt:** Testplånboksappen kommunicerar med Diggs Sandbox-miljö. För att testa mot din lokala backend, se till att din `VERIFIER_PUBLICURL` är korrekt konfigurerad och tillgänglig.

---

## Support och fördjupning

### Kontakt

För tekniska frågor och hjälp med:
- Certifikatsutbyte
- Anslutningsprocessen
- Testmiljön

Kontakta: [digitalwallet@digg.se](mailto:digitalwallet@digg.se)

### Dokumentation och specifikationer

För en djupare förståelse av plånbokssystemet:

- **Huvudprojekt:** [diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)
- **Tekniska standarder:** OpenID4VP, OpenID4VCI, SD-JWT
- **EUDIW dokumentation:** [eudi-doc-architecture-and-reference-framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/)

---

## Sammanfattning: Checklista

- [ ] Har hämtat publika certifikat från Digg
- [ ] Har skapat Trust Store med Diggs certifikat
- [ ] Har genererat Signing Key (självsignerat för test)
- [ ] Har konfigurerat min Verifier Backend
- [ ] Har installerat Diggs test-plånboksapp
- [ ] Har testat anslutningen med testplånboken

---

*Denna guide uppdaterades senast juni 2026.*

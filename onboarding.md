# Onboarding-guide: Anslut som extern förlitande part till Sandbox

Välkommen till Det svenska plånbokssystemet! Denna guide beskriver steg-för-steg hur du som extern tjänsteleverantör (förlitande part) sätter upp en testmiljö lokalt och ansluter den mot Diggs **Sandbox-miljö**.

## Innehåll
1. [Syfte](#syfte)
2. [Steg 1: Hantera certifikat och tillit](#steg-1-hantera-certifikat-och-tillit)
3. [Steg 2: Konfigurera och starta backend](#steg-2-konfigurera-och-starta-backend)
4. [Support och fördjupning](#support-och-fördjupning)

---

## Syfte
Syftet med denna guide är att ge dig en snabbstart för att sätta upp en egen **Verifier Backend** (baserad på EU:s referensimplementation) som kommunicerar direkt med Diggs Sandbox-miljö.

---

## Steg 1: Hantera certifikat och tillit
För att din verifierare ska fungera i Sandbox-miljön behöver du hantera två typer av certifikat.

### 1.1 Hämta publika certifikat från Digg
Du behöver hämta följande filer från Diggs Confluence (kontakta **Magnus** för åtkomst):
- `sandbox_root_ca.pem`: Ekosystemets gemensamma rot-certifikat. Detta används för att validera att plånboken och dess intyg är äkta.
- `pid_issuer.pem`: Certifikatet för den part som utfärdar Personidentitetsdata (PID) i Sandbox.

### 1.2 Skapa din förtroendelista (Trust Store)
Verifieraren (`eudi-srv-verifier-endpoint`) kräver en Trust Store i PKCS12-format för att veta vilka utfärdare den ska lita på. Du skapar denna genom att importera de PEM-filer du fått från Digg:

```bash
# Importera Sandbox-roten
keytool -importcert -noprompt -alias sandbox_root_ca -file sandbox_root_ca.pem \
  -keystore trusted_issuers.p12 -storepass pass1234 -storetype PKCS12

# Importera PID-utfärdaren
keytool -importcert -noprompt -alias pid_issuer -file pid_issuer.pem \
  -keystore trusted_issuers.p12 -storepass pass1234 -storetype PKCS12
```

### 1.3 Skapa din egen identitet (Signing Key)
Du behöver också en egen privat nyckel och ett certifikat för att signera dina förfrågningar till plånboken. För lokala tester kan du generera ett självsignerat certifikat:

```bash
# Generera en privat EC-nyckel (P-256) och ett självsignerat certifikat
openssl req -x509 -newkey ec:<(openssl ecparam -name prime256v1) -nodes \
  -keyout verifier_key.pem -out verifier_cert.pem -days 365 \
  -subj "/C=SE/O=Partner/CN=Verifier Backend" \
  -addext "subjectAltName=DNS:wallet.sandbox.digg.se,DNS:localhost"

# Paketera nyckeln och certifikatet i en PKCS12-fil
openssl pkcs12 -export -in verifier_cert.pem -inkey verifier_key.pem \
  -out verifier_backend.p12 -name "verifier_backend" -passout pass:pass1234
```

---

## Steg 2: Konfigurera och starta backend
När du kör containern `ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint` pekar du ut dina nyskapade `.p12`-filer via miljövariabler.

### Viktiga miljövariabler för Sandbox:
- `VERIFIER_PUBLICURL`: `https://wallet.sandbox.digg.se/verifier` (Din publika endpoint)
- `VERIFIER_TRUSTSOURCES_0_KEYSTORE_PATH`: Sökväg till din `trusted_issuers.p12`
- `VERIFIER_JAR_SIGNING_KEY_KEYSTORE`: Sökväg till din `verifier_backend.p12`
- `VERIFIER_CLIENTIDPREFIX`: `x509_san_dns`

Exempel på hur du startar med Docker Compose:
```yaml
services:
  verifier-backend:
    image: ghcr.io/eu-digital-identity-wallet/eudi-srv-verifier-endpoint:v0.8.0
    volumes:
      - ./verifier_backend.p12:/opt/common/verifier_backend.p12:ro
      - ./trusted_issuers.p12:/opt/common/trusted_issuers.p12:ro
    environment:
      VERIFIER_PUBLICURL: "https://wallet.sandbox.digg.se/verifier"
      VERIFIER_JAR_SIGNING_KEY_KEYSTORE: "file:///opt/common/verifier_backend.p12"
      VERIFIER_TRUSTSOURCES_0_KEYSTORE_PATH: "file:///opt/common/trusted_issuers.p12"
      # ... se projektets README för samtliga variabler ...
```


## Support och fördjupning

### Kontakt
För tekniska frågor och hjälp med certifikatsutbyte, kontakta **Magnus** på Digg.

### Dokumentation och specifikationer
För en djupare förståelse av hur hela plånbokssystemet hänger ihop, se dokumentationen i huvudprojektet:
[https://github.com/diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)

---
*Denna guide är ett första utkast för onboarding i Sandbox-miljön per mars 2026.*

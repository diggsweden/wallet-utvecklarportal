---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: "Anslut som förlitande part"
---

# Anslut som förlitande part

**Roll:** Denna guide riktar sig till **förlitande parter** (Relying Parties) som vill ansluta sina tjänster till det
svenska plånbokssystemet.
En förlitande part är den organisation eller tjänst som tar emot och verifierar digitala intyg från användarens plånbok.

> **Obs:** Denna anslutningsguide avser **Diggs plånboksapp**
> som använder sig av **Testplattform för digital identitetsplånbok**
> för test och utveckling.

---

## Krav

- **OpenID4VP-stöd:** Er tjänst följer OpenID4VP (se vad vår app stödjer under
  [Stöd för OpenID4VP](planboksappen/openid4vp.md)).
- **Åtkomstcertifikat och registreringscertifikat från Digg:** Verifieraren behöver ett åtkomstcertifikat för att
  signera förfrågningar och ett registreringscertifikat att skicka med i dem.
- **Nätverksåtkomst:** Åtkomst till Testplattform för digital identitetsplånbok (publik på internet) från app och
  telefon.
- **Betrodd HTTPS-domän:** Trafik mellan telefonen och er verifierare måste gå via en av android/ios betrodd
  HTTPS-domän.
  - Plånboksappen **kräver strikt HTTPS (`https://`)** för alla presentationsadresser (`request_uri` och `DirectPost`).
    Okrypterad `http://` avvisas av säkerhetsskäl av appen.
- **Tillit till LoTE:** Verifieraren behöver lita på testplattformens tillitslista
  ([List of Trusted Entities](https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json),
  se även [Tillitsramverk & Tillitslistor](standarder-och-profiler.md#tillitsramverk--tillitslistor-lote)).
- **Vitlistning** I dagsläget har diggs plånbok ingen vitlista för betrodda tjänster utan litar på alla.

---

## Hämta och konfigurera certifikat

Digg tillhandahåller för närvarande publikt certifikatmaterial för anslutning till testplattformen.
De CA:er som utfärdar testmaterialets åtkomst- och registreringscertifikat är för närvarande betrodda via
[testplattformens LoTE](https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json).

1. **Hämta åtkomstcertifikatet:**
   - Ladda ned
     [PKCS#12-filen (`.p12`)](https://wallet.sandbox.digg.se/trust-source/utvecklarportalen/verifier/verifier-access-certificate.p12).
     Filen innehåller åtkomstcertifikat, privat nyckel och certifikatkedja.
     Lösenordet för det publika testmaterialet är `abcd1234`.
   - Konfigurera verifieraren att signera OpenID4VP-förfrågningar med den privata nyckeln i `.p12`-filen.
     Ange `.p12`-filens sökväg och lösenordet ovan.
     Den privata nyckelns alias är `verifier_access_certificate`.
   - Det gemensamma testcertifikatet har DNS-namnet `localhost`.
     Förfrågans `client_id` ska därför vara `x509_san_dns:localhost`.
     Diggs plånboksapp validerar ännu inte certifikatets SAN.
2. **Hämta registreringscertifikatet:**
   - Ladda ned
     [registreringscertifikatet som signerad JWT](https://wallet.sandbox.digg.se/trust-source/utvecklarportalen/verifier/registration_certificate.jwt).
   - Lägg den nedladdade JWT-strängen oförändrad i `data` i ett objekt i `verifier_info`-arrayen,
     med `format` satt till `registration_cert`.
     Fältet ingår i den signerade OpenID4VP-förfrågan (*Request Object*):

     ```json
     {
       "verifier_info": [
         {
           "format": "registration_cert",
           "data": "<hela den nedladdade JWT-strängen>"
         }
       ]
     }
     ```

     Utdraget visar endast registreringscertifikatets placering; övriga förfrågningsfält behöver också anges.
     Se [Verifier Info i OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#section-5.11).
3. **Konfigurera den publika HTTPS-adressen:**
   - Ange verifierarens publika adress så att plånboksappen kan hämta förfrågningar och skicka presentationer dit.
   - Adressen behöver ett betrott HTTPS-certifikat.
     Åtkomstcertifikatet används för signering och ersätter inte HTTPS-certifikatet.

Det publika certifikatmaterialet är en tillfällig lösning.
Framöver behöver ni beställa åtkomst- och registreringscertifikat utfärdade till er organisation,
även för användning i testplattformen.

---

## Testa med plånboksappen

1. **Installera testappen och hämta PID:**
   - Följ [Guiden för att prova plånboksappen](planboksappen/prova-planboksappen.md) för att installera appen på din
     telefon.
   - Öppna appen, välj **Hämta personuppgifter**, logga in mot utfärdaren med en testanvändare och spara ditt test-PID.
2. **Starta presentation i er tjänst:**
   - Gå till er tjänst i en webbläsare och starta ett presentationsflöde.
   - Skanna QR-koden eller öppna OpenID4VP-länken i telefonen för att öppna Diggs plånboksapp.
   - Granska de begärda uppgifterna i appen och tryck **Godkänn / Skicka**.
   - Verifierarens callback tar emot presentationen och uppgifterna verifieras.

---

## Support och fördjupning

### Kontakt

För tekniska frågor och hjälp med anslutningsprocessen och testmiljön, kontakta:
[digitalwallet@digg.se](mailto:digitalwallet@digg.se)

### Dokumentation och specifikationer

För en djupare förståelse av plånbokssystemet:

- **Exempel på en lokal uppsättning:** [Anslut som förlitande part med exempel](exempel-fp.md)
- **Huvudprojekt:** [diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)
- **Tekniska standarder:** [Standarder & Profiler](standarder-och-profiler.md) (OpenID4VP, OpenID4VCI, SD-JWT VC).
- **EUDIW-dokumentation:** [eudi-doc-architecture-and-reference-framework](https://eudi.dev/latest/)

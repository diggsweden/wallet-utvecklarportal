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

Digg tillhandahåller publikt certifikatmaterial för anslutning till testplattformen.
De CA:er som utfärdar materialet är betrodda via
[testplattformens LoTE](https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json).

1. **Hämta och konfigurera åtkomstcertifikatet:** Ladda ned
   [.p12-filen](https://wallet.sandbox.digg.se/trust-source/utvecklarportalen/verifier/verifier-access-certificate.p12).
   Den innehåller åtkomstcertifikat, privat nyckel och certifikatkedja.
   Lösenordet är `abcd1234`.
   Använd nyckeln för att signera OpenID4VP-förfrågningar.

   Sätt förfrågans `client_id` till `x509_hash:<certifikathash>`.
   Beräkna hashen från lövcertifikatet i förfrågans `x5c`-header med SHA-256 över DER-formatet,
   kodat som base64url utan utfyllnad (`=`).
   Se kommandon i [exemplets steg 2](exempel-fp.md#steg-2-hämta-åtkomstcertifikat-och-registreringscertifikat).
   Värdet behöver bara beräknas om när åtkomstcertifikatet byts ut.
2. **Hämta och konfigurera registreringscertifikatet:** Ladda ned
   [registreringscertifikatet som signerad JWT](https://wallet.sandbox.digg.se/trust-source/utvecklarportalen/verifier/registration_certificate.jwt).
   Lägg JWT-strängen oförändrad i `data` i ett objekt i förfrågans
   `verifier_info`-array, med `format` satt till `registration_cert`.
   Se [Verifier Info i OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#section-5.11).
3. **Konfigurera den publika HTTPS-adressen:** Ange verifierarens publika adress så att plånboksappen kan hämta
   förfrågningar och skicka presentationer dit.
   Adressen behöver ett betrott HTTPS-certifikat.
   Åtkomstcertifikatet används för signering och ersätter inte HTTPS-certifikatet.

Det publika materialet är tillfälligt.
Framöver behöver ni beställa åtkomst- och registreringscertifikat för er egen organisation även för testplattformen.

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

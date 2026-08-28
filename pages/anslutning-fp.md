---
layout: default
title: "Anslut som förlitande part"
---

# Anslut som förlitande part

**Roll:** Denna guide riktar sig till **förlitande parter** (Relying Parties) som vill ansluta sina tjänster till det svenska plånbokssystemet. En förlitande part är den organisation eller tjänst som tar emot och verifierar digitala intyg från användarens plånbok.

> **Obs:** Denna anslutningsguide avser **Diggs plånboksapp** som använder sig av **Diggs Sandbox-miljö** för test och utveckling.

---

## Krav

- **OpenID4VP-stöd:** Er tjänst följer OpenID4VP (se vad vår app stödjer under [Stöd för OpenID4VP](planboksappen/openid4vp.md)).
- **Nätverksåtkomst:** Åtkomst till Diggs Sandbox-miljö (publik på internet) från app och telefon.
- **Betrodd HTTPS-domän:** Trafik mellan telefonen och er verifierare måste gå via en av android/ios betrodd HTTPS-domän.
  - Plånboksappen **kräver strikt HTTPS (`https://`)** för alla presentationsadresser (`request_uri` och `DirectPost`). Okrypterad `http://` avvisas av säkerhetsskäl av appen.
- **Tillit till LoTE:** Verifieraren behöver lita på Diggs Sandbox-tillitslista ([List of Trusted Entities](https://wallet.sandbox.digg.se/trust-source/signed/trusted-entities.json), se även [Tillitsramverk & Tillitslistor](standarder-och-profiler.md#tillitsramverk--tillitslistor-lote)).
- **Vitlistning** I dagsläget har diggs plånbok ingen vitlista för betrodda tjänster utan litar på alla.

---

## Testa med plånboksappen

1. **Installera testappen och hämta PID:**
   - Följ [Guiden för att prova plånboksappen](planboksappen/prova-planboksappen.md) för att installera appen på din telefon.
   - Öppna appen, välj **Hämta personuppgifter**, logga in mot Sandbox-utfärdaren med en testanvändare och spara ditt test-PID.
2. **Starta presentation i er tjänst:**
   - Gå till er tjänst i en webbläsare och starta ett presentationsflöde.
   - Skanna QR-koden eller öppna OpenID4VP-länken i telefonen för att öppna Diggs plånboksapp.
   - Granska de begärda uppgifterna i appen och tryck **Godkänn / Skicka**.
   - Verifierarens callback tar emot presentationen och uppgifterna verifieras.

---

## Support och fördjupning

### Kontakt

För tekniska frågor och hjälp med anslutningsprocessen och testmiljön, kontakta: [digitalwallet@digg.se](mailto:digitalwallet@digg.se)

### Dokumentation och specifikationer

För en djupare förståelse av plånbokssystemet:

- **Exempel på en lokal uppsättning:** [Anslut som förlitande part med exempel](exempel-fp.md)
- **Huvudprojekt:** [diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)
- **Tekniska standarder:** [Standarder & Profiler](standarder-och-profiler.md) (OpenID4VP, OpenID4VCI, SD-JWT VC).
- **EUDIW-dokumentation:** [eudi-doc-architecture-and-reference-framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/)

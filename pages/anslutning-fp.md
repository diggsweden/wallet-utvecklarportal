---
layout: default
title: "Anslut som förlitande part"
---

# Anslut som förlitande part

**Roll:** Denna guide riktar sig till **förlitande parter** (Relying Parties) som vill ansluta sina tjänster till det svenska plånbokssystemet. En förlitande part är den organisation eller tjänst som tar emot och verifierar digitala intyg från användarens plånbok.

> **Obs:** Denna anslutningsguide avser **Diggs plånboksapp** som använder sig av **Diggs Sandbox-miljö** för test och utveckling.

---
## Krav
- er tjänst följer OpenID4VP. (Se vad vår app stödjer här [Stöd för OpenID4VP](planboksappen/openid4vp.md))
- åtkomst till digg sandboxmiljön (publik på internet) från app / telefon 
- betrodd https domän från tel till eran verifier 
  - Plånboksappen **kräver strikt HTTPS (`https://`)** för alla presentationsadresser (`request_uri` och `DirectPost`). Okrypterad `http://` avvisas av säkerhetsskäl av appen.
- betro våra LotE (länk till den)

---

## Testa med plånboksappen

1. **Installera testappen & hämta PID:**
    - Följ [Guiden för att prova plånboksappen](planboksappen/prova-planboksappen.md) för att installera appen på din telefon.
    - Öppna appen, välj **Hämta personuppgifter**, logga in mot Sandbox-utfärdaren med en testanvändare och spara ditt test-PID.
2. **Öppna test-webbplatsen på datorn:**
    - Gå till er tjänst i en webbläsare.
    - Skanna QR kod eller öppna OpenID4VP länk i telefon, vilket triggar digg appen  
    - Granska de begärda uppgifterna i appen och tryck **Godkänn / Skicka**.
    - Verifierarcallbacken har fått en presentation!

## Support och fördjupning

### Kontakt

För tekniska frågor och hjälp med anslutningsprocessen & testmiljön kontakta: [digitalwallet@digg.se](mailto:digitalwallet@digg.se)

### Dokumentation och specifikationer

För en djupare förståelse av plånbokssystemet:
- **Exempel på en lokal uppsättning:** [Förlitande part med exempel](exempel-fp.md)
- **Huvudprojekt:** [diggsweden/wallet-ecosystem](https://github.com/diggsweden/wallet-ecosystem)
- **Tekniska standarder:** [Standarder & Profiler](standarder-och-profiler.md) (OpenID4VP, OpenID4VCI, SD-JWT VC).
- **EUDIW dokumentation:** [eudi-doc-architecture-and-reference-framework](https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/)


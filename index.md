---
layout: default
title: Wallet Utvecklarportal
---

# Välkommen till Utvecklarportalen

Detta är navet för dig som vill förstå, integrera och testa lösningar mot det svenska plånbokssystemet (EUDI Wallet). Portalen riktar sig till tekniska intressenter som vill ansluta sina tjänster eller prova på tekniken bakom den statliga identitetsplånboken.

## Mål & Vision
Den här portalen finns för att göra det enklare att integrera tekniskt mot det svenska plånbokssystemet. Här hittar du dokumentation och testmiljöer (Sandbox) för att du som utvecklare snabbt ska kunna komma igång och ansluta dina tjänster till infrastrukturen för digitala identiteter.

## Förutsättningar
För att kunna följa instruktionerna på denna sida och integrera mot Sandbox-miljön behöver du:
*   En miljö för att köra **Docker-containrar** (om du vill sätta upp en egen verifierare).
*   En smartphone (**iOS eller Android**) för att testa mobilappen.

## Ekosystemets komponenter
Det svenska plånbokssystemet består av fem centrala delar som samverkar för ett säkert informationsutbyte:

1.  **Digital plånbok (EUDI Wallet)** – Den mobila appen där användaren lagrar och väljer att dela sina intyg.
2.  **PID-utfärdare** – Diggs tjänst som utfärdar och signerar det grundläggande identitetsintyget (PID).
3.  **Förlitande part** – Den organisation eller tjänst som tar emot och verifierar intyg via en **Verifier Backend**.
4.  **Wallet Provider** – Leverantören som tillhandahåller plånboksinfrastrukturen och kommunikationsprotokollen.
5.  **Tillitsinfrastruktur** – De tillitslistor och certifikat som säkerställer att alla parter litar på varandra.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/diagrams/sandbox.svg" alt="Översikt av ekosystemet" width="800" style="display: block; margin: 0 auto;">
  <figcaption style="font-style: italic; font-size: 0.9em; color: #666; margin-top: 0.5em;">Översikt av ekosystemets komponenter och deras samspel. Inkluderar Digital plånbok, PID-utfärdare, Förlitande part, Wallet Provider och Tillitsinfrastruktur.</figcaption>
</figure>



---

## Integration & Teknik
Systemet bygger på öppna europeiska standarder och vi strävar efter att vara kompatibla med [**WEBUILD**](https://github.com/webuild-consortium).

### Protokoll och Format
För integrationen använder vi följande protokoll och format:
*   [**OpenID4VP**](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) – För säker presentation av intyg från plånboken till en förlitande part.
*   [**SD-JWT VC**](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/) – Ett format för verifierbara intyg som möjliggör *selektivt utlämnande*, vilket innebär att användaren kan dela enstaka uppgifter utan att avslöja hela sitt intyg.

### Hantering av personnummer i PID
I dagsläget använder vi enbart **fiktiva identiteter** i våra testmiljöer. Det är för närvarande inte möjligt att använda sin egen riktiga identitet eller sitt faktiska personnummer i Sandbox-miljön.

---

## Kom igång
Är du redo att börja testa?

*   [**Guide: Prova mobilappen**](pages/prova-planboksappen.md) – Instruktioner för hur du installerar betaversionen och hämtar ditt första test-ID.
*   [**Onboarding: Anslut till Sandbox**](pages/onboarding.md) – Steg-för-steg för dig som vill integrera din tjänst som förlitande part.
*   [**Teknisk Referens: Standarder & Profiler**](pages/standarder-och-profiler.md) – Läs mer om de öppna standarder (t.ex. OpenID4VCI, SD-JWT) som ekosystemet bygger på.

---
*Har du frågor? Kontakta oss på [digitalwallet@digg.se](mailto:digitalwallet@digg.se).*

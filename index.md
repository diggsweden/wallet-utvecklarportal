---
layout: default
title: Wallet Utvecklarportal
---

# Välkommen till Utvecklarportalen

Detta är navet för dig som vill förstå, integrera och testa lösningar mot det svenska plånbokssystemet (EUDI Wallet). Portalen riktar sig till utvecklare och förlitande parter som vill ansluta sina tjänster eller prova på tekniken bakom den statliga identitetsplånboken.

## Mål & Vision
Den här portalen finns för att göra det enklare att integrera tekniskt mot det svenska plånbokssystemet. Här hittar du dokumentation och testmiljöer (Sandbox) för att du som utvecklare snabbt ska kunna komma igång och ansluta dina tjänster till infrastrukturen för digitala identiteter.

## Förutsättningar
För att kunna följa instruktionerna på denna sida och integrera mot Sandbox-miljön behöver du:
*   En miljö för att köra **Docker-containrar** (om du vill sätta upp en egen verifierare).
*   En smartphone (**iOS eller Android**) för att testa mobilappen.

## Ekosystemets komponenter
Det svenska plånbokssystemet består av fem centrala delar som samverkar för ett säkert informationsutbyte:

1.  **Digital plånbok (EUDI Wallet)** – Den mobila appen där användaren lagrar och väljer att dela sina intyg.
2.  **PID-utfärdare** – Tjänsten som utfärdar och signerar det grundläggande identitetsintyget (PID) – i testmiljön tillhandahålls denna i dagsläget av Digg (i framtida produktion är det Polismyndigheten).
    <div style="background: #e7f5ff; padding: 12px; border-radius: 4px; border-left: 4px solid #0066cc; margin: 10px 0 15px 25px;" role="note">
      <span style="color: #0052cc; margin-right: 8px;" aria-label="Information">ℹ️</span>
      Vi använder enbart fiktiva identiteter med svenska testpersonnummer.
    </div>
3.  **Förlitande part** – Den organisation eller tjänst som tar emot och verifierar intyg via en **Verifier Backend**.
4.  **Wallet Provider** – Leverantören som tillhandahåller plånboksinfrastrukturen och kommunikationsprotokollen.
5.  **Tillitsramverk** – Det regelverk och den tekniska infrastruktur (t.ex. tillitslistor) som säkerställer att alla aktörer litar på varandra.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/diagrams/sandbox.svg" alt="Översikt av ekosystemet" width="800" style="display: block; margin: 0 auto;">
  <figcaption style="font-style: italic; font-size: 0.9em; color: #666; margin-top: 0.5em;">Översikt av ekosystemets komponenter och deras samspel. Inkluderar Digital plånbok, PID-utfärdare, Förlitande part, Wallet Provider och Tillitsramverk.</figcaption>
</figure>



---

## Kom igång
Är du redo att börja testa?

*   [**Guide: Prova mobilappen**](pages/prova-planboksappen.md) – Instruktioner för hur du installerar betaversionen och hämtar ditt första test-ID.
*   [**Onboarding: Anslut till Sandbox**](pages/onboarding.md) – Steg-för-steg för dig som vill integrera din tjänst som förlitande part.
*   [**Teknisk Referens: Standarder & Profiler**](pages/standarder-och-profiler.md) – Läs mer om de öppna standarder (t.ex. OpenID4VCI, SD-JWT) som ekosystemet bygger på.
*   [**Ordlista**](pages/ordlista.md) – En ordlista med de vanligast förekommande termerna och begreppen

---
*Har du frågor? Kontakta oss på [digitalwallet@digg.se](mailto:digitalwallet@digg.se).*

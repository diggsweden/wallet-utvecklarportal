---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: Wallet Utvecklarportal
---

# Välkommen till Utvecklarportalen

<div class="card important" role="note">
  <main>
  <span class="icon">⚠️</span><strong>Viktig information om testdata
  och Testplattform för digital identitetsplånbok</strong>
  <p>Denna utvecklarportal
  och Testplattform för digital identitetsplånbok
  (inklusive testplånbok, test-PID, testutfärdare och verifieringsflöden)
  är enbart avsedda för test, demonstration och utvecklingsändamål.</p>
  <ul>
    <li><strong>Endast fiktiv testdata:</strong>
    Testplattformen och alla testflöden använder uteslutande fiktiv testdata.</li>
    <li><strong>Inga verkliga personuppgifter:</strong> Miljön får under inga omständigheter användas med verkliga personuppgifter eller produktionsdata.</li>
    <li><strong>Ej i produktion:</strong> Testtjänsterna (såsom Diggs test-PID-utfärdare och testplånbok) är inte produktionssatta tjänster och representerar inte en skarp driftsättning eller färdiga produktionsmiljöer.</li>
  </ul>
  </main>
</div>

Detta är navet för dig som vill förstå, integrera och testa lösningar mot det svenska plånbokssystemet (EUDI Wallet).
Portalen riktar sig till utvecklare och förlitande parter som vill ansluta sina tjänster eller prova på tekniken bakom
den statliga identitetsplånboken.

## Mål & Vision

Den här portalen finns för att göra det enklare att integrera tekniskt mot det svenska plånbokssystemet.
Här hittar du dokumentation om testplattformen för att du som utvecklare snabbt ska kunna komma igång och ansluta dina
tjänster till infrastrukturen för digitala identiteter.

## Förutsättningar

För att kunna följa instruktionerna på denna sida och integrera mot Testplattform för digital identitetsplånbok behöver
du:

* En miljö för att köra **Docker-containrar** (om du vill sätta upp en egen verifierare).
* En smartphone (**iOS eller Android**) för att testa mobilappen.

## Ekosystemets komponenter

Det svenska plånbokssystemet består av fem centrala delar som samverkar för ett säkert informationsutbyte:

1. **Digital plånbok (EUDI Wallet)** – Den mobila appen där användaren lagrar och väljer att dela sina intyg.
2. **PID-utfärdare** – Tjänsten som utfärdar och signerar det grundläggande identitetsintyget (PID) – i testmiljön tillhandahålls denna i dagsläget av Digg (i framtida produktion är det Polismyndigheten).
    <div class="card info" role="note">
      <span class="icon">ℹ️</span>
      Vi använder enbart fiktiva identiteter med svenska testpersonnummer.
    </div>
3. **Förlitande part** – Den organisation eller tjänst som tar emot och verifierar intyg via en **Verifier Backend**.
4. **Wallet Provider** – Leverantören som tillhandahåller plånboksinfrastrukturen och kommunikationsprotokollen.
5. **Tillitsramverk** – Det regelverk och den tekniska infrastruktur (t.ex. tillitslistor) som säkerställer att alla
   aktörer litar på varandra.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/diagrams/sandbox.png" alt="Översikt av ekosystemet" width="800" style="display: block; margin: 0 auto;">
  <figcaption style="font-style: italic; font-size: 0.9em; color: #666; margin-top: 0.5em;">Översikt av ekosystemets komponenter och deras samspel. Inkluderar Digital plånbok, PID-utfärdare, Förlitande part, Wallet Provider och Tillitsramverk.</figcaption>
</figure>

---

## Kom igång

Är du redo att börja testa?

* [**Guide: Prova mobilappen**](pages/planboksappen/prova-planboksappen.md) – Instruktioner för hur du installerar
  betaversionen och hämtar ditt första test-ID.
* [**Anslut som förlitande part**](pages/anslutning-fp.md) – Steg-för-steg för dig som vill integrera din tjänst som
  förlitande part.
* [**Teknisk Referens: Standarder & Profiler**](pages/standarder-och-profiler.md) – Läs mer om de öppna standarder
  (t.ex. OpenID4VCI, SD-JWT) som ekosystemet bygger på.
* [**Ordlista**](pages/ordlista.md) – En ordlista med de vanligast förekommande termerna och begreppen

---
*Har du frågor? Kontakta oss på [digitalwallet@digg.se](mailto:digitalwallet@digg.se).*

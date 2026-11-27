---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: Ordlista
description: Ordlista över centrala begrepp och termer som används i det svenska plånbokssystemet.
---

# Ordlista

Här hittar du definitioner och förklaringar av centrala begrepp och termer som används i det svenska plånbokssystemet
och på denna utvecklarportal.
Syftet är att underlätta kommunikation och säkerställa en enhetlig förståelse av de olika delarna i ekosystemet.

---

Aktör
: En gemensam beteckning för en part som ingår eller interagerar i plånbokssystemet,
  till exempel en utfärdare av intyg eller en mottagare (förlitande part).

Anslutning
: Den rent tekniska integrationen och kopplingen av en förlitande parts e-tjänst till plånbokssystemets gränssnitt och
  testplattformen.

Attributsintyg (Electronic Attestation of Attributes, EAA)
: Officiellt elektroniskt attributsintyg: ett intyg i elektronisk form som möjliggör autentisering av attribut.
  Till skillnad från PID innehåller det inte uppgifter för personidentifiering.
  Ett exempel är Learning Credential, ett intyg om genomförd utbildning, i testplattformen.
: **Källa:** [EUDI ARF, bilaga 1 – Definitions](https://eudi.dev/3.0.0/annexes/annex-1/annex-1-definitions/)

Certifikatmaterial
: Det som Digg tillhandahåller för att ansluta en verifierare eller utfärdare till testplattformen:
  ett åtkomstcertifikat och ett registreringscertifikat.
  För verifierare levereras åtkomstcertifikatet i en `.p12`-fil,
  tillsammans med dess privata nyckel och certifikatkedja.

Digital plånbok (EUDI Wallet)
: Den mobila applikationen där en användare förvarar,
  hanterar och väljer att dela sina digitala intyg (t.ex. PID) med olika förlitande parter.
: **Källa:**
  [EUDI ARF, avsnitt 4.3.2 – Components of a Wallet Unit](https://eudi.dev/3.0.0/main/04-high-level-architecture/#432-components-of-a-wallet-unit)

EUDI Wallet Reference Framework (ARF)
: *European Digital Identity Architecture and Reference Framework*.
  Det övergripande europeiska ramverket som anger gemensamma standarder,
  specifikationer och krav för de digitala identitetsplånböckerna inom EU.
: **Källa:**
  [EUDI Architecture and Reference Framework (ARF)](https://eudi.dev/latest/architecture-and-reference-framework-main/)
  och dess [GitHub-arkiv](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)

Förlitande part (Relying Party)
: I ARF och i portalen en tjänsteleverantör som begär och tar emot attribut från plånboken.
  I portalen kallad **verifierare**.
  Den organisation eller e-tjänst som tar emot och verifierar digitala intyg från användarens digitala plånbok för att
  till exempel identifiera en person eller kontrollera ett attribut.
: Enligt ARF omfattar begreppet "wallet-relying party" i förordningen om europeisk digital identitet juridiskt även
  leverantörer av attesteringar (QEAA, PuB-EAA och icke-kvalificerade EAA).
  ARF använder det inte så, utan reserverar förlitande part för tjänsteleverantörer.
: ARF använder *Verifier* bara för interaktioner mellan två plånböcker.
  Portalen använder verifierare för samma roll som förlitande part, efter OpenID4VP.
: **Källa:**
  [EUDI ARF, avsnitt 3.11.1 – Relying Parties](https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/#3111-relying-parties)

Onboarding
: Den övergripande administrativa och förberedande processen för en organisation som vill ansluta sina tjänster till det
  svenska plånbokssystemets miljöer.

Personidentifieringsuppgifter (PID)
: *Person Identification Data*.
  Det grundläggande identitetsintyget (t.ex. namn, personnummer,
  födelsedatum) som utfärdas av den statliga PID-utfärdaren till användarens plånbok.
: **Källa:** [eIDAS-förordningen (EU 2024/1183)](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX:32024R1183)
  och
  [EUDI ARF, avsnitt A.2 – Definitions from the European Digital Identity Regulation](https://eudi.dev/3.0.0/annexes/annex-1/annex-1-definitions/#a2-definitions-from-the-european-digital-identity-regulation)

PID-utfärdare (PID Issuer)
: Den centrala tjänst som utfärdar och signerar användarens grundläggande identitetsdata (PID) till plånboken.
  ARF kallar rollen *PID Provider*, officiellt tillhandahållare av personidentifieringsuppgifter.
  I den framtida svenska produktionsmiljön är det Polismyndigheten som är PID-utfärdare (via den statliga
  e-legitimationen Sverige-id), men i testplattformen tillhandahålls denna tjänst i dagsläget av Digg.
: **Källa:**
  [EUDI ARF, avsnitt 3.4 – Person Identification Data (PID) Providers](https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/#34-person-identification-data-pid-providers)

Registreringscertifikat
: Officiellt förlitandepartregistreringscertifikat (*wallet-relying party registration certificate*):
  ett dataobjekt som anger de attribut som en förlitande part har registrerat i avsikt att begära från användare.
  Plånboksappen avvisar en förfrågan som inte ryms i certifikatet.
: **Källa:** [EUDI ARF, bilaga 1 – Definitions](https://eudi.dev/3.0.0/annexes/annex-1/annex-1-definitions/)

SD-JWT VC
: *Selective Disclosure for JWTs Verifiable Credentials*.
  Det kredentialformat som används för identitetsintygen i det svenska plånbokssystemet.
  Det tillåter selektivt utlämnande,
  vilket innebär att användaren kan välja att enbart dela specifika uppgifter (t.ex. bekräfta att man är över 18 år)
  utan att avslöja hela sitt personnummer eller namn.
: **Källa:**
  [SD-JWT-based Verifiable Credentials (SD-JWT VC)](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/),
  [IETF OAuth Selective Disclosure for JWTs (SD-JWT)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-selective-disclosure-jwt)
  och
  [EUDI Standards and Technical Specifications](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications)

Testplattform för digital identitetsplånbok
: Den testplattform som tillhandahålls av Digg där utvecklare och förlitande parter kan bygga och testa
  interoperabilitet för sina tjänster i en säker och isolerad miljö.
  Även kallad "testplattformen".

Tillitslista / List of Trusted Entities (LoTE)
: En kryptografiskt signerad förteckning (lista) över godkända och betrodda aktörer i plånbokssystemet enligt standarden
  **ETSI TS 119 602**, till exempel utfärdare av intyg (PID/QEAA) och plånboksleverantörer.
  Genom att läsa av tillitslistan (som publiceras som en signerad JWS) kan tillitsvaliderare automatiskt och dynamiskt
  verifiera att en part är behörig och att dess certifikat är giltiga inom tillitsramverket,
  utan manuellt certifikatsutbyte.
: **Källa:**
  [EUDI ARF, avsnitt 3.5 – Trusted List Provider or LoTE Provider](https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/#35-trusted-list-provider-or-lote-provider)
  och [ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)

Tillitsramverk
: Det gemensamma regelverk och den tekniska infrastruktur (såsom tillitslistor) som säkerställer att alla anslutna
  aktörer i plånbokssystemet kan lita på varandras identitet, behörighet och intyg.
: **Källa:** [eIDAS-förordningen (EU 2024/1183)](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX:32024R1183)
  (förordningen om en europeisk digital identitet)

Utfärdare av attributsintyg (Attestation Provider)
: ARF:s samlingsbegrepp för leverantörer av attesteringar: kvalificerade (QEAA),
  offentliga organ (PuB-EAA) och icke-kvalificerade (EAA).
  I portalen kallad utfärdare, som i OpenID4VCI.
: **Källa:** [EUDI ARF, bilaga 1 – Definitions](https://eudi.dev/3.0.0/annexes/annex-1/annex-1-definitions/)

Verifier Backend (Verifierare)
: Den programvara eller tjänst som körs hos den förlitande parten.
  Den ansvarar för att skapa förfrågningar om intyg,
  skicka dem till plånboksappen samt ta emot och validera de presenterade uppgifterna.
: **Källa:**
  [EUDI ARF, avsnitt 3.11.3 – Relying Party Instances](https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/#3113-relying-party-instances)

Wallet Provider
: Den leverantör som tillhandahåller själva plånboksinfrastrukturen,
  tillhörande protokoll och administrationsgränssnitt för att plånboksappen ska kunna kommunicera i ekosystemet.
: **Källa:**
  [EUDI ARF, avsnitt 3.3 – Wallet Providers](https://eudi.dev/3.0.0/main/03-roles-within-the-eudi-wallet-ecosystem/#33-wallet-providers)

Wallet Secure Cryptographic Device (WSCD)
: Den säkra hårdvarubaserade eller mjukvarubaserade kryptografiska modul i användarens enhet (t.ex. Secure Element) som
  skyddar plånbokens nycklar mot obehörig åtkomst och kopiering.
: **Källa:**
  [EUDI ARF, avsnitt 4.3.2 – Components of a Wallet Unit](https://eudi.dev/3.0.0/main/04-high-level-architecture/#432-components-of-a-wallet-unit)
  och
  [avsnitt 4.5 – WSCD Architecture Types](https://eudi.dev/3.0.0/main/04-high-level-architecture/#45-wscd-architecture-types)

Wallet Unit Attestation (WUA)
: Ett kryptografiskt intyg utfärdat på enhetsnivå som bekräftar att en specifik plånboksapplikation körs i en godkänd
  och säker miljö som uppfyller kraven i tillitsramverket och ARF.
: **Källa:**
  [EUDI Standards and Technical Specifications, TS-3: Wallet Unit Attestation](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/5924eb77ab4495d4dc0a874e54ac3e5de1fbd5b1/docs/technical-specifications/ts3-wallet-unit-attestation.md)

Åtkomstcertifikat
: Officiellt förlitandepartcertifikat (*wallet-relying party access certificate*):
  ett certifikat för elektroniska stämplar eller underskrifter som autentiserar och validerar den förlitande parten och
  som utfärdats av en tillhandahållare av förlitandepartcertifikat.
: **Källa:** [EUDI ARF, bilaga 1 – Definitions](https://eudi.dev/3.0.0/annexes/annex-1/annex-1-definitions/)

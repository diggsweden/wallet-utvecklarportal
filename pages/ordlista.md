---
layout: default
title: Ordlista
description: Ordlista över centrala begrepp och termer som används i det svenska plånbokssystemet.
---

# Ordlista

Här hittar du definitioner och förklaringar av centrala begrepp och termer som används i det svenska plånbokssystemet och på denna utvecklarportal. Syftet är att underlätta kommunikation och säkerställa en enhetlig förståelse av de olika delarna i ekosystemet.

---

### Aktör
En gemensam beteckning för en part som ingår eller interagerar i plånbokssystemet, till exempel en utfärdare av intyg eller en mottagare (förlitande part).

### Anslutning
Den rent tekniska integrationen och kopplingen av en förlitande parts e-tjänst till plånbokssystemets gränssnitt och testmiljöer.

### Digital plånbok (EUDI Wallet)
Den mobila applikationen där en användare förvarar, hanterar och väljer att dela sina digitala intyg (t.ex. PID) med olika förlitande parter.
> **Källa:** [EUDI ARF, Avsnitt 3.1 & 3.3](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#33-wallet-providers)

### EUDI Wallet Reference Framework (ARF)
*European Digital Identity Architecture and Reference Framework*. Det övergripande europeiska ramverket som anger gemensamma standarder, specifikationer och krav för de digitala identitetsplånböckerna inom EU.
> **Källa:** [EUDI Architecture and Reference Framework (ARF)](https://eudi.dev/latest/architecture-and-reference-framework-main/) och dess [GitHub-arkiv](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)

### Förlitande part (Relying Party)
Den organisation eller e-tjänst som tar emot och verifierar digitala intyg och personuppgifter från användarens digitala plånbok för att till exempel identifiera en person eller kontrollera ett attribut.
> **Källa:** [EUDI ARF, Avsnitt 3.11.1](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#3111-relying-parties)

### Onboarding
Den övergripande administrativa och förberedande processen för en organisation som vill ansluta sina tjänster till det svenska plånbokssystemets miljöer.

### Personidentitetsdata (PID)
*Personal Identity Data*. Det grundläggande identitetsintyget (t.ex. namn, personnummer, födelsedatum) som utfärdas av den statliga PID-utfärdaren till användarens plånbok.
> **Källa:** [eIDAS-förordningen (EU 2024/1183)](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX:32024R1183) och [EUDI ARF, Avsnitt 3.4](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#34-person-identification-data-pid-providers)

### PID-utfärdare (PID Issuer)
Den centrala tjänst som utfärdar och signerar användarens grundläggande identitetsdata (PID) till plånboken. I den framtida svenska produktionsmiljön är det Polismyndigheten som är PID-utfärdare (via den statliga e-legitimationen Sverige-id), men i testplattformen tillhandahålls denna tjänst i dagsläget av Digg.
> **Källa:** [EUDI ARF, Avsnitt 3.4](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#34-person-identification-data-pid-providers)

### Sandbox
Den test- och experimentmiljö som tillhandahålls av Digg där utvecklare och blivande förlitande parter kan bygga, testa och verifiera sina integrationer i en säker och isolerad miljö.

### SD-JWT VC
*Selective Disclosure for JWTs Verifiable Credentials*. Det kredentialformat som används för identitetsintygen i det svenska plånbokssystemet. Det tillåter selektivt utlämnande, vilket innebär att användaren kan välja att enbart dela specifika uppgifter (t.ex. bekräfta att man är över 18 år) utan att avslöja hela sitt personnummer eller namn.
> **Källa:** [IETF OAuth Selective Disclosure for JWTs (SD-JWT)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-selective-disclosure-jwt) och [EUDI Standards and Technical Specifications](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications)

### Tillitslista / List of Trusted Entities (LoTE)
En kryptografiskt signerad förteckning (lista) över godkända och betrodda aktörer i plånbokssystemet enligt standarden **ETSI TS 119 602**, till exempel utfärdare av intyg (PID/QEAA) och plånboksleverantörer. Genom att läsa av tillitslistan (som publiceras som en signerad JWS) kan tillitsvaliderare automatiskt och dynamiskt verifiera att en part är behörig och att dess certifikat är giltiga inom tillitsramverket, utan manuellt certifikatsutbyte.
> **Källa:** [EUDI ARF, Avsnitt 3.5](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#35-trusted-list-or-lote-provider) och [ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)

### Tillitsramverk
Det gemensamma regelverk och den tekniska infrastruktur (såsom tillitslistor) som säkerställer att alla anslutna aktörer i plånbokssystemet kan lita på varandras identitet, behörighet och intyg.
> **Källa:** [eIDAS-förordningen (EU 2024/1183)](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX:32024R1183) (förordningen om en europeisk digital identitet)

### Verifier Backend (Verifierare)
Den programvara eller tjänst som körs hos den förlitande parten. Den ansvarar för att skapa förfrågningar om intyg, skicka dem till plånboksappen samt ta emot och validera de presenterade uppgifterna.
> **Källa:** [EUDI ARF, Avsnitt 3.11.2 (Relying Party Instances)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#3112-relying-party-instances)

### Wallet Provider
Den leverantör som tillhandahåller själva plånboksinfrastrukturen, tillhörande protokoll och administrationsgränssnitt för att plånboksappen ska kunna kommunicera i ekosystemet.
> **Källa:** [EUDI ARF, Avsnitt 3.3](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#33-wallet-providers)

### Wallet Secure Cryptographic Device (WSCD)
Den säkra hårdvarubaserade eller mjukvarubaserade kryptografiska modul i användarens enhet (t.ex. Secure Element) som skyddar plånbokens nycklar mot obehörig åtkomst och kopiering.
> **Källa:** [EUDI ARF, Avsnitt 4.3.2](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#432-components-of-a-wallet-unit) och [Avsnitt 4.5](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/main/docs/architecture-and-reference-framework-main.md#45-wscd-architecture-types)

### Wallet Unit Attestation (WUA)
Ettt kryptografiskt intyg utfärdat på enhetsnivå som bekräftar att en specifik plånboksapplikation körs i en godkänd och säker miljö som uppfyller kraven i tillitsramverket och ARF.
> **Källa:** [EUDI Standards and Technical Specifications, TS-3: Wallet Unit Attestation](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)

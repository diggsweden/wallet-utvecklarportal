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

### EUDI Wallet Reference Framework (ARF)
*European Digital Identity Architecture and Reference Framework*. Det övergripande europeiska ramverket som anger gemensamma standarder, specifikationer och krav för de digitala identitetsplånböckerna inom EU.

### Förlitande part (Relying Party)
Den organisation eller e-tjänst som tar emot och verifierar digitala intyg och personuppgifter från användarens digitala plånbok för att till exempel identifiera en person eller kontrollera ett attribut.

### Onboarding
Den övergripande administrativa och förberedande processen för en organisation som vill ansluta sina tjänster till det svenska plånbokssystemets miljöer.

### Personidentitetsdata (PID)
*Personal Identity Data*. Det grundläggande identitetsintyget (t.ex. namn, personnummer, födelsedatum) som utfärdas av den statliga PID-utfärdaren till användarens plånbok.

### PID-utfärdare (PID Issuer)
Den centrala tjänsten (tillhandahållen av Digg i Sverige) som utfärdar och signerar användarens grundläggande identitetsdata (PID) till plånboken.

### Sandbox
Den test- och experimentmiljö som tillhandahålls av Digg där utvecklare och blivande förlitande parter kan bygga, testa och verifiera sina integrationer i en säker och isolerad miljö.

### SD-JWT VC
*Selective Disclosure for JWTs Verifiable Credentials*. Det kredentialformat som används för identitetsintygen i det svenska plånbokssystemet. Det tillåter selektivt utlämnande, vilket innebär att användaren kan välja att enbart dela specifika uppgifter (t.ex. bekräfta att man är över 18 år) utan att avslöja hela sitt personnummer eller namn.

### Tillitsramverk
Det gemensamma regelverk och den tekniska infrastruktur (såsom tillitslistor) som säkerställer att alla anslutna aktörer i plånbokssystemet kan lita på varandras identitet, behörighet och intyg.

### Verifier Backend (Verifierare)
Den programvara eller tjänst som körs hos den förlitande parten. Den ansvarar för att skapa förfrågningar om intyg, skicka dem till plånboksappen samt ta emot och validera de presenterade uppgifterna.

### Wallet Provider
Den leverantör som tillhandahåller själva plånboksinfrastrukturen, tillhörande protokoll och administrationsgränssnitt för att plånboksappen ska kunna kommunicera i ekosystemet.

### Wallet Secure Cryptographic Device (WSCD)
Den säkra hårdvarubaserade eller mjukvarubaserade kryptografiska modul i användarens enhet (t.ex. Secure Element) som skyddar plånbokens nycklar mot obehörig åtkomst och kopiering.

### Wallet Unit Attestation (WUA)
Ett kryptografiskt intyg utfärdat på enhetsnivå som bekräftar att en specifik plånboksapplikation körs i en godkänd och säker miljö som uppfyller kraven i tillitsramverket och ARF.

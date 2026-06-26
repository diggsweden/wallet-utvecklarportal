---
layout: default
title: Standarder & Profiler
---

# Standarder & Profiler

För att underlätta för förlitande parter att ansluta sina e-tjänster till ekosystemet för den svenska digitala identitetsplånboken, listar vi här de tekniska standarder och profiler som vår implementation bygger på. Syftet är att ge er den information ni behöver för att säkerställa interoperabilitet.

Istället för att återskapa specifikationer i detalj här, refererar vi direkt till de officiella standarderna. 

---

## Övergripande Ramverk (EUDI ARF)

Vårt ekosystem utvecklas i linje med det europeiska ramverket för digital identitet:
* **[EUDI Architecture and Reference Framework (ARF)](https://eudi.dev/latest/architecture-and-reference-framework-main/)** – Det övergripande arkitekturramverket för EUDI-plånboken. Se även det officiella [ARF-arkivet på GitHub](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework).
* **[EUDI Standards and Technical Specifications](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/tree/main)** – Officiella tekniska specifikationer för EUDI-plånboken.

---

## Sandbox vs. Framtida Produktion

Det är viktigt att skilja på de komponenter vi använder i testmiljön (Sandbox) och hur rollfördelningen är planerad att se ut i den framtida produktionsmiljön.

| Funktion / Roll | Sandbox (Testmiljö)                                                                                                                                                                                                  | Produktion (Framtida målbild) |
| :--- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| :--- |
| **Identitetshantering** | **Keycloak** används för att hantera testanvändare och simulera inloggning.                                                                                                                                          | **Polismyndigheten** utfärdar den statliga e-legitimationen [**Sverige-id**](https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/statlig-e-legitimation-sverige-id/). |
| **PID-utfärdare** | En testtjänst som i dagsläget tillhandahålls av Digg för att utfärda fiktiva PID (Personidentitetsdata).                                                                                                             | **Polismyndigheten** är officiell PID-utfärdare via Sverige-id (planerad lansering 1 december 2026). |
| **Tillitsvalidering** | EU:s referensimplementation för tillitsvalidering ([**eudi-srv-trust-validator**](https://github.com/eu-digital-identity-wallet/eudi-srv-trust-validator)) används för att kontrollera certifikat och tillitslistor. | **[Post- och telestyrelsen (PTS)](https://www.pts.se)** agerar tillsynsmyndighet för betrodda tjänster under eIDAS. |

---

## Utfärdande av Intyg (Issuance)

För att utfärda den personliga identiteten (PID) och andra intyg till plånboken använder vi:
* **[OpenID for Verifiable Credential Issuance (OpenID4VCI)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)**
  * Vi använder proof-type `openid4vci-proof+jwt`.
* **[DPoP (Demonstrating Proof-of-Possession)](https://datatracker.ietf.org/doc/html/rfc9449)** – Används för att kryptografiskt binda tokens till plånboksinstansen.

---

## Presentation av Intyg (Verification)

När en e-tjänst (förlitande part) vill verifiera identitet eller attribut från plånboken sker detta via:
* **[OpenID for Verifiable Presentations (OpenID4VP)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)**
  * Vi stöder svarsläget (response mode) `direct_post`.
* **[Digital Credentials Query Language (DCQL)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-digital-credentials-query-l)** – Används för att konstruera detaljerade och selektiva förfrågningar av attribut (claims) från plånboken.

---

## Kredentialformat & Kryptografi

Själva formatet på identitetsdatan (PID) som sparas i plånboken:
* **[SD-JWT VC (Selective Disclosure for JWTs Verifiable Credentials)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-selective-disclosure-jwt)**
  * Tillåter att användaren endast delar specifika attribut (t.ex. ålder) istället för hela identiteten.
  * I dagsläget har vi valt att **enbart stödja SD-JWT VC** som kredentialformat. **mso-mdoc** är inte aktuellt för oss i detta skede.
* **Kryptografi:** För signering av JWT och SD-JWT används **ECDSA med kurvan P-256 (ES256)**.

---

## Förklaring av Attesteringar (WUA, WIA, KA)

För att säkerställa plånbokens integritet och skydda nycklar mot kopiering, definierar ARF tre centrala kryptografiska attesteringar:

1. **WIA (Wallet Instance Attestation)**
   * *Vad det är:* Ett intyg på applikationsnivå utfärdat av plånboksleverantören (Wallet Provider).
   * *Syfte:* Attesterar att plånboksappen som är installerad på enheten är äkta, inte har modifierats och tillhör en certifierad plånbokslösning.
2. **KA (Key Attestation)**
   * *Vad det är:* Ett intyg från hårdvaran (eller säker miljö) till plånboksappen.
   * *Syfte:* Bevisar för omvärlden att de privata nycklarna har genererats och skyddas inuti enhetens säkra hårdvarumodul (**WSCD** – *Wallet Secure Cryptographic Device*), till exempel ett Secure Element eller motsvarande.
3. **WUA (Wallet Unit Attestation)**
   * *Vad det är:* Den sammanslagna attesteringen för hela plånboksenheten.
   * *Syfte:* Intygar att plånboksenheten (kombinationen av applikation/WIA och hårdvara/KA) uppfyller kraven i tillitsramverket. Se vidare i [WUA-specifikationen](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md).

---

## Koppling till WE BUILD

Det svenska plånbokssystemets testmiljö är utformad för att vara kompatibel med de tekniska profiler som utvecklas inom det europeiska pilotkonsortiet [**WE BUILD**](https://github.com/webuild-consortium). 

Syftet med detta är att:
* Säkerställa att en plånbok som är certifierad och fungerar i andra EU-länder också kan användas sömlöst mot de svenska förlitande parternas e-tjänster.
* Ge utvecklare en testmiljö som speglar de internationella kraven på interoperabilitet inför den skarpa driftsättningen av EUDI-plånböckerna.

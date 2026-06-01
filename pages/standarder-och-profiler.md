---
layout: default
title: Standarder & Profiler
---

# Standarder & Profiler

För att underlätta för integratörer att ansluta sina e-tjänster till ekosystemet för den svenska digitala identitetsplånboken, listar vi här de tekniska standarder och profiler som vår implementation bygger på. Syftet är att ge er den information ni behöver för att säkerställa interoperabilitet.

Istället för att återskapa specifikationer i detalj här, refererar vi direkt till de officiella standarderna. 

## Övergripande Ramverk

Vårt ekosystem utvecklas i linje med det europeiska ramverket för digital identitet:
* **[EUDI Architecture and Reference Framework (ARF)](https://eudi.dev/latest/architecture-and-reference-framework-main/)** – Det övergripande arkitekturramverket för EUDI-plånboken.
* **[EUDI Standards and Technical Specifications](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/tree/main)** – Officiella tekniska specifikationer för EUDI-plånboken.

## Utfärdande av Intyg (Issuance)

För att utfärda den personliga identiteten (PID) och andra intyg till plånboken använder vi:
* **[OpenID for Verifiable Credential Issuance (OpenID4VCI)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)**
  * Vi använder proof-type `openid4vci-proof+jwt`.
* **[DPoP (Demonstrating Proof-of-Possession)](https://datatracker.ietf.org/doc/html/rfc9449)** används för att binda tokens till klienten.

## Presentation av Intyg (Verification)

När en e-tjänst (förlitande part) vill verifiera identitet eller attribut från plånboken sker detta via:
* **[OpenID for Verifiable Presentations (OpenID4VP)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)**
  * Vi stöder svarsläget (response mode) `direct_post`.
* **[Digital Credentials Query Language (DCQL)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-digital-credentials-query-l)**
  * Används för att konstruera detaljerade och selektiva förfrågningar av claims från plånboken.

## Kredentialformat & Kryptografi

Själva formatet på identitetsdatan (PID) som sparas i plånboken:
* **[SD-JWT VC (Selective Disclosure for JWTs Verifiable Credentials)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-selective-disclosure-jwt)**
  * Tillåter att användaren endast delar specifika attribut (t.ex. ålder) istället för hela identiteten.
  * I dagsläget har vi valt att **enbart stödja SD-JWT VC** som kredentialformat. **mso-mdoc** är inte aktuellt för oss i detta skede.
* **Kryptografi:** För signering av JWT och SD-JWT används **ECDSA med kurvan P-256 (ES256)**.

## Wallet Unit Attestation (WUA)

Vi stödjer **Wallet Unit Attestation (WUA)** i enlighet med EUDI Architecture and Reference Framework (ARF). WUA intygar att plånboksenheten och dess komponenter, inklusive **Wallet Secure Cryptographic Device (WSCD)**, uppfyller gällande säkerhets- och regleringskrav för att säkerställa autenticitet och säkerhet.

WUA använder format som förväntas av EUDI-plånboksekosystemet (se [WUA-specifikation](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)). Vi strävar också efter att vara kompatibla med [**WEBUILD**](https://github.com/webuild-consortium).

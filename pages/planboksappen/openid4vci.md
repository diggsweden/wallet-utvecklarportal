---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: Stöd för OpenID4VCI
description: Plånboksappens stöd för OpenID for Verifiable Credential Issuance (OpenID4VCI).
---

# Stöd för OpenID4VCI

Denna sida beskriver vilka delar av
[OpenID for Verifiable Credential Issuance (OpenID4VCI)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
som plånboksappen stöder i dagsläget.
Den vänder sig till dig som bygger en utfärdare.

Tekniska termer från specifikationen behålls på engelska för att undvika tvetydigheter.

Uppgifterna är hämtade ur appens källkod (Android).
Observera att dokumentet inte är komplett och uppdateras löpande i takt med att stödet i appen utökas.

## Innehåll

{: .page-toc}

1. [Credential offer](#credential-offer)
   - [1.1 Parametrar](#offer-parametrar)
   - [1.2 Pre-authorized code flow](#pre-authorized-code-flow)
   - [1.3 Djuplänkning](#djuplankning)
2. [Credential issuer metadata](#issuer-metadata)
   - [2.1 Signerad metadata](#signerad-metadata)
   - [2.2 Registreringscertifikat](#registreringscertifikat)
   - [2.3 Credential configurations](#credential-configurations)
3. [Authorization](#authorization)
   - [3.1 Authorization code flow](#authorization-code-flow)
   - [3.2 Klientautentisering](#klientautentisering)
   - [3.3 DPoP](#dpop)
4. [Nonce endpoint](#nonce-endpoint)
5. [Credential request](#credential-request)
   - [5.1 Proof types](#proof-types)
   - [5.2 Key attestation](#key-attestation)
   - [5.3 Krypterad request](#krypterad-request)
6. [Credential response](#credential-response)
   - [6.1 Krypterat svar](#krypterat-svar)
   - [6.2 Flera intyg i svaret](#flera-intyg)
   - [6.3 Deferred credential endpoint](#deferred)
   - [6.4 Kontroll av intyget](#kontroll-av-intyget)
7. [Visning av intyg](#visning)
8. [High Assurance Interoperability Profile (HAIP)](#haip)
9. [Specifikationer](#specifikationer)

---

## 1. Credential offer {#credential-offer}

### 1.1 Parametrar {#offer-parametrar}

| Parameter                                | Stöds                                                  |
| ---------------------------------------- | ------------------------------------------------------ |
| `credential_issuer`                      | ✅                                                     |
| `credential_configuration_ids`           | Appen använder den första som har formatet `dc+sd-jwt` |
| `grants` – `authorization_code`          | ✅                                                     |
| `grants` – pre-authorized code (`tx_code`) | ❌                                                   |

### 1.2 Pre-authorized code flow {#pre-authorized-code-flow}

Stöds ej.

### 1.3 Djuplänkning {#djuplankning}

Appen tar emot en credential offer via länkar med följande URL-scheman:

- `openid-credential-offer://`
- `haip-vci://`

---

## 2. Credential issuer metadata {#issuer-metadata}

### 2.1 Signerad metadata {#signerad-metadata}

| Funktion                                   | Stöds                                        |
| ------------------------------------------ | -------------------------------------------- |
| Signerad metadata (`application/jwt`)      | ✅ Valideras mot tillitsankarna              |
| Osignerad metadata (`application/json`)    | ✅ Godtas utan kontroll                      |

Appen föredrar signerad metadata.
Utfärdarens certifikatkedja i `x5c`-headern ska sluta i ett tillitsankare.
Ankarna hämtas från de tillitslistor som Diggs gateway pekar ut.
Appen kontrollerar kedjan mot alla ankare, oavsett tjänstetyp.
Appen kontrollerar inte nyckelanvändning eller återkallning av certifikaten.

### 2.2 Registreringscertifikat {#registreringscertifikat}

Registreringscertifikat läggs i `issuer_info.attestations` med format `registration_cert` eller `jwt`.
Appen validerar dem mot tillitsankarna.
Saknas de, görs ingen kontroll.

### 2.3 Credential configurations {#credential-configurations}

| Funktion                                   | Stöds                    |
| ------------------------------------------ | ------------------------ |
| Format `dc+sd-jwt`                         | ✅                       |
| Format `mso_mdoc`                          | ❌                       |

---

## 3. Authorization {#authorization}

### 3.1 Authorization code flow {#authorization-code-flow}

Stöds.
Appen omdirigeras tillbaka till `wallet-app://authorize`.

### 3.2 Klientautentisering {#klientautentisering}

Appen använder ingen klientautentisering (`client_id` är `wallet-dev`),
eller plånboksattestering om auktoriseringsservern stödjer det.

### 3.3 DPoP {#dpop}

Appen använder DPoP om utfärdaren stödjer det.

---

## 4. Nonce endpoint {#nonce-endpoint}

Om metadatan har ett `nonce_endpoint` hämtar appen en `c_nonce` därifrån och använder den i nyckelbeviset.

---

## 5. Credential request {#credential-request}

### 5.1 Proof types {#proof-types}

| Funktion                                   | Stöds                                                          |
| ------------------------------------------ | -------------------------------------------------------------- |
| Proof type `jwt`                           | ✅ Utfärdaren måste ange stöd för det i `proof_types_supported` |
| Andra proof types                          | ❌                                                             |

Nyckelbeviset är en JWT.
Dess header innehåller plånbokens publika nyckel (`jwk`), eller key attestation om den krävs.
Payloaden innehåller `aud` (utfärdarens identifierare), `iss` med värdet `wallet-app` och `nonce` om en sådan finns.
Appen begär intyget med `credential_configuration_id`.

### 5.2 Key attestation {#key-attestation}

Appen skickar key attestation i proof-headern om utfärdaren kräver det.

### 5.3 Krypterad request {#krypterad-request}

Appen krypterar requesten om utfärdaren kräver det.

---

## 6. Credential response {#credential-response}

### 6.1 Krypterat svar {#krypterat-svar}

Appen begär ett krypterat svar (`ECDH-ES`, `A128GCM`) när requesten krypteras.
Annars är svaret okrypterat.

### 6.2 Flera intyg i svaret {#flera-intyg}

Appen skickar ett nyckelbevis och sparar det första intyget i svaret.

### 6.3 Deferred credential endpoint {#deferred}

Stöds ej.
Appen hanterar inte uppskjutet utfärdande.

### 6.4 Kontroll av intyget {#kontroll-av-intyget}

Appen kontrollerar inte intygets signatur när intyget tas emot.
Intygets signatur kontrolleras av den förlitande parten vid presentation.

---

## 7. Visning av intyg {#visning}

Appen visar följande från utfärdarens metadata:

- Utfärdarens namn och logotyp, från `display` (första posten).
- Intygets namn, från `display` för `credential_metadata`.
- Namn på attribut, från `display` för respektive claim i `credential_metadata.claims`.

---

## 8. High Assurance Interoperability Profile (HAIP) {#haip}

Appen stöder ännu ej OpenID4VCI-utfärdande enligt HAIP.

---

## 9. Specifikationer {#specifikationer}

Avsnitten på den här sidan motsvarar följande avsnitt i specifikationerna.

| Avsnitt på sidan | Avsnitt i specifikationen |
| --- | --- |
| [1 Credential offer](#credential-offer) | [OpenID4VCI 4.1. Credential Offer](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-offer) |
| [1.1 Parametrar](#offer-parametrar) | [OpenID4VCI 4.1.1. Credential Offer Parameters](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-offer-parameters) |
| [1.2 Pre-authorized code flow](#pre-authorized-code-flow) | [OpenID4VCI 3.5. Pre-Authorized Code Flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-pre-authorized-code-flow) |
| [1.3 Djuplänkning](#djuplankning) | [OpenID4VCI 4.1.2. Sending Credential Offer by Value Using credential_offer Parameter](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-sending-credential-offer-by) |
| [2 Credential issuer metadata](#issuer-metadata) | [OpenID4VCI 12.2. Credential Issuer Metadata](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-issuer-metadata) |
| [3 Authorization](#authorization) | [OpenID4VCI 5. Authorization Endpoint](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-authorization-endpoint) |
| [3.1 Authorization code flow](#authorization-code-flow) | [OpenID4VCI 3.4. Authorization Code Flow](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-authorization-code-flow) |
| [3.3 DPoP](#dpop) | [RFC 9449, Demonstrating Proof of Possession (DPoP)](https://datatracker.ietf.org/doc/html/rfc9449) |
| [4 Nonce endpoint](#nonce-endpoint) | [OpenID4VCI 7. Nonce Endpoint](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-nonce-endpoint) |
| [5 Credential request](#credential-request) | [OpenID4VCI 8.2. Credential Request](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-request) |
| [5.3 Krypterad request](#krypterad-request) | [OpenID4VCI 10. Encrypted Credential Requests and Responses](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-encrypted-credential-reques) |
| [6 Credential response](#credential-response) | [OpenID4VCI 8.3. Credential Response](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-credential-response) |
| [6.2 Flera intyg i svaret](#flera-intyg) | [OpenID4VCI 3.3.2. Batch Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-batch-credential-issuance) |
| [6.3 Deferred credential endpoint](#deferred) | [OpenID4VCI 9. Deferred Credential Endpoint](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html#name-deferred-credential-endpoin) |
| [8 High Assurance Interoperability Profile (HAIP)](#haip) | [HAIP 4. OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html#name-openid-for-verifiable-crede) |

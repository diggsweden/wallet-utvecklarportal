---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: Stöd för OpenID4VP
description: Plånboksappens stöd för OpenID for Verifiable Presentations (OpenID4VP).
---

# Stöd för OpenID4VP

Denna sida beskriver vilka delar av
[OpenID for Verifiable Presentations (OpenID4VP)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
som plånboksappen stöder i dagsläget.

Tekniska termer från specifikationen behålls på engelska för att undvika tvetydigheter.

Observera att dokumentet inte är komplett och uppdateras löpande i takt med att stödet i appen utökas.

## Innehåll

{: .page-toc}

1. [Authorization request](#authorization-request)
   - [1.1 Parametrar](#parametrar)
   - [1.2 Scope values](#scope-values)
   - [1.3 Response type vp_token](#response-type-vp-token)
   - [1.4 Client identifiers och prefixes](#client-identifiers-och-prefixes)
   - [1.5 Request URI method POST](#request-uri-method-post)
   - [1.6 Verifier info](#verifier-info)
2. [Digital Credentials Query Language (DCQL)](#dcql)
   - [2.1 Credential query](#credential-query)
   - [2.2 Trusted authorities query](#trusted-authorities-query)
   - [2.3 Credential set query](#credential-set-query)
   - [2.4 Claims och claim sets](#claims-och-claim-sets)
3. [Response](#response)
   - [3.1 Response modes](#response-modes)
4. [Djuplänkning](#djuplankning)
5. [Wallet metadata](#wallet-metadata)
6. [Verifier attestation JWT](#verifier-attestation-jwt)
7. [High Assurance Interoperability Profile (HAIP)](#haip)
8. [Specifikationer](#specifikationer)

---

## 1. Authorization request {#authorization-request}

### 1.1 Parametrar {#parametrar}

| Parameter            | Stöds                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| `dcql_query`         | ✅                                                                              |
| `client_metadata`    | ✅                                                                              |
| `request_uri_method` | ✅                                                                              |
| `transaction_data`   | ❌                                                                              |
| `verifier_info`      | ✅                                                                              |
| `nonce`              | ✅                                                                              |
| `scope`              | ❌                                                                              |
| `response_mode`      | ✅                                                                              |
| `client_id`          | Delvis – se [Client identifiers och prefixes](#client-identifiers-och-prefixes) |
| `state`              | ✅                                                                              |

### 1.2 Scope values {#scope-values}

Stöds ej.

### 1.3 Response type vp_token {#response-type-vp-token}

Stöds.

### 1.4 Client identifiers och prefixes {#client-identifiers-och-prefixes}

Appen stöder client identifier prefix `x509_san_dns` och `x509_hash`.
I [Anslut som förlitande part](../anslutning-fp.md) används `x509_hash` med en certifikathash beräknad från
åtkomstcertifikatet.

Appen stöder ej
["pre-registered clients"](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-fallback).

| Prefix                     | Stöds |
| -------------------------- | ----- |
| `redirect_uri`             | ❌    |
| `openid_federation`        | ❌    |
| `decentralized_identifier` | ❌    |
| `verifier_attestation`     | ❌    |
| `x509_san_dns`             | ✅    |
| `x509_hash`                | ✅    |
| `origin`                   | ❌    |

### 1.5 Request URI method POST {#request-uri-method-post}

Appen stöder för närvarande ej att `wallet_metadata` eller `wallet_nonce` skickas med när POST-varianten av request URI
används.

### 1.6 Verifier info {#verifier-info}

Appen validerar i dagsläget inte metadata i verifier info eller PoP (Proof of Possession).

---

## 2. Digital Credentials Query Language (DCQL) {#dcql}

Observera att appen endast stöder credentials med formatet `dc+sd-jwt`.

### 2.1 Credential query {#credential-query}

| Parameter                              | Stöds                                    |
| -------------------------------------- | ---------------------------------------- |
| `id`                                   | ✅                                       |
| `format`                               | Endast `dc+sd-jwt`                       |
| `meta`                                 | ✅                                       |
| `trusted_authorities`                  | ❌                                       |
| `require_cryptographic_holder_binding` | Appen tillhandahåller alltid key binding |
| `claims`                               | ✅                                       |
| `claim_sets`                           | ✅                                       |

### 2.2 Trusted authorities query {#trusted-authorities-query}

Stöds ej.
Appen har för närvarande ingen mekanism för att verifiera "trusted authorities".

### 2.3 Credential set query {#credential-set-query}

Appen har delvis stöd för credential sets.
När flera credentials anges i options-arrayen gör appen ingen antingen/eller-matchning,
utan väljer alltid det första alternativet.

Appen respekterar däremot flaggan required och låter användaren välja om icke-obligatoriska credential queries ska
presenteras eller inte.

### 2.4 Claims och claim sets {#claims-och-claim-sets}

Appen stöder endast grundläggande matchning av claims i en DCQL-query.
Den matchar enbart attribut som definieras i `claims`-arrayen.
Vid avsaknad av `claims` parametern presenteras alla attribut från PID:en.

`claim_sets` ignoreras för närvarande.

---

## 3. Response {#response}

Appen stöder endast response type `vp_token`.

### 3.1 Response modes {#response-modes}

| Response mode     | Stöds |
| ----------------- | ----- |
| `direct_post`     | ✅    |
| `direct_post.jwt` | ✅    |

---

## 4. Djuplänkning {#djuplankning}

Appen stöder endast presentation för länkar med följande URL-scheman:

- `openid4vp://`
- `haip-vp://`

## 5. Wallet metadata {#wallet-metadata}

Stöds ej.

## 6. Verifier attestation JWT {#verifier-attestation-jwt}

Stöds ej.

## 7. High Assurance Interoperability Profile (HAIP) {#haip}

Appen stöder ännu ej OpenID4VP-presentationer enligt HAIP.

---

## 8. Specifikationer {#specifikationer}

Avsnitten på den här sidan motsvarar följande avsnitt i specifikationerna.

| Avsnitt på sidan | Avsnitt i specifikationen |
| --- | --- |
| [1.2 Scope values](#scope-values) | [OpenID4VP 5.5. Using scope Parameter to Request Presentations](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-using-scope-parameter-to-re) |
| [1.3 Response type vp_token](#response-type-vp-token) | [OpenID4VP 5.6. Response Type vp_token](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-response-type-vp_token) |
| [1.4 Client identifiers och prefixes](#client-identifiers-och-prefixes) | [OpenID4VP 5.9.3. Defined Client Identifier Prefixes](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#section-5.9.3) |
| [1.5 Request URI method POST](#request-uri-method-post) | [OpenID4VP 5.10. Request URI Method post](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-request-uri-method-post) |
| [1.6 Verifier info](#verifier-info) | [OpenID4VP 5.11. Verifier Info](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-info) |
| [2.1 Credential query](#credential-query) | [OpenID4VP 6.1. Credential Query](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-credential-query) |
| [2.2 Trusted authorities query](#trusted-authorities-query) | [OpenID4VP 6.1.1. Trusted Authorities Query](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-trusted-authorities-query) |
| [2.3 Credential set query](#credential-set-query) | [OpenID4VP 6.2. Credential Set Query](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-credential-set-query) |
| [2.4 Claims och claim sets](#claims-och-claim-sets) | [OpenID4VP 6.4.1. Selecting Claims](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-selecting-claims) |
| [3 Response](#response) | [OpenID4VP 8. Response](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-response) |
| [4 Djuplänkning](#djuplankning) | [OpenID4VP 9. Wallet Invocation](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-wallet-invocation) |
| [5 Wallet metadata](#wallet-metadata) | [OpenID4VP 10. Wallet Metadata (Authorization Server Metadata)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-wallet-metadata-authorizati) |
| [6 Verifier attestation JWT](#verifier-attestation-jwt) | [OpenID4VP 12. Verifier Attestation JWT](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-attestation-jwt) |
| [7 High Assurance Interoperability Profile (HAIP)](#haip) | [HAIP 5. OpenID for Verifiable Presentations](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html#name-openid-for-verifiable-prese) |

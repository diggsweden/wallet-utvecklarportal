---
layout: default
title: Stöd för OpenID4VP
description: Plånboksappens stöd för OpenID for Verifiable Presentations (OpenID4VP).
---

# Stöd för OpenID4VP

Denna sida beskriver vilka delar av [OpenID for Verifiable Presentations (OpenID4VP)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) som plånboksappen stöder i dagsläget.

Tekniska termer från specifikationen behålls på engelska för att undvika tvetydigheter.

Observera att dokumentet inte är komplett och uppdateras löpande i takt med att stödet i appen utökas.

## Innehåll

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
   {: .page-toc}

---

## 1. Authorization request {#authorization-request}

### 1.1 Parametrar {#parametrar}

| Parameter            | Stöds                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| `dcql_query`         | ✅                                                                              |
| `client_metadata`    | ✅                                                                              |
| `request_uri_method` | ✅                                                                              |
| `transaction_data`   | ❌                                                                              |
| `verifier_info`      | ❌                                                                              |
| `nonce`              | ✅                                                                              |
| `scope`              | ❌                                                                              |
| `response_mode`      | ✅                                                                              |
| `client_id`          | Delvis – se [Client identifiers och prefixes](#client-identifiers-och-prefixes) |
| `state`              | ✅                                                                              |

### 1.2 [Scope values](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-using-scope-parameter-to-re) {#scope-values}

Stöds ej.

### 1.3 [Response type vp_token](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-response-type-vp_token) {#response-type-vp-token}

Stöds.

### 1.4 [Client identifiers och prefixes](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#section-5.9.3) {#client-identifiers-och-prefixes}

Appen stöder för närvarande endast client identifier prefix `x509_san_dns`.

Appen stöder ej ["pre-registered clients"](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-fallback).

| Prefix                     | Stöds |
| -------------------------- | ----- |
| `redirect_uri`             | ❌    |
| `openid_federation`        | ❌    |
| `decentralized_identifier` | ❌    |
| `verifier_attestation`     | ❌    |
| `x509_san_dns`             | ✅    |
| `x509_hash`                | ❌    |
| `origin`                   | ❌    |

### 1.5 [Request URI method POST](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-request-uri-method-post) {#request-uri-method-post}

Appen stöder för närvarande ej att `wallet_metadata` eller `wallet_nonce` skickas med när POST-varianten av request URI används.

### 1.6 [Verifier info](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-info) {#verifier-info}

Appen validerar i dagsläget inte metadata i verifier info eller PoP (Proof of Possession).

---

## 2. Digital Credentials Query Language (DCQL) {#dcql}

Observera att appen endast stöder credentials med formatet `dc+sd-jwt`.

Appen stöder endast attributsintyg med verifiable credential type (`vct`): `urn:eudi:pid:1` och matchar enbart claims från den.

### 2.1 [Credential query](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-credential-query) {#credential-query}

| Parameter                              | Stöds                                    |
| -------------------------------------- | ---------------------------------------- |
| `id`                                   | ✅                                       |
| `format`                               | Endast `dc+sd-jwt`                       |
| `meta`                                 | ❌                                       |
| `trusted_authorities`                  | ❌                                       |
| `require_cryptographic_holder_binding` | Appen tillhandahåller alltid key binding |
| `claims`                               | ✅                                       |
| `claim_sets`                           | ✅                                       |

### 2.2 [Trusted authorities query](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-trusted-authorities-query) {#trusted-authorities-query}

Stöds ej. Appen har för närvarande ingen mekanism för att verifiera "trusted authorities".

### 2.3 [Credential set query](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-credential-set-query) {#credential-set-query}

Appen har delvis stöd för credential sets. När flera credentials anges i options-arrayen gör appen ingen antingen/eller-matchning, utan väljer alltid det första alternativet.

Appen respekterar däremot flaggan required och låter användaren välja om icke-obligatoriska credential queries ska presenteras eller inte.

### 2.4 [Claims och claim sets](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-selecting-claims) {#claims-och-claim-sets}

Appen stöder endast grundläggande matchning av claims i en DCQL-query. Den matchar enbart attribut som definieras i `claims`-arrayen. Vid avsaknad av `claims` parametern presenteras alla attribut från PID:en.

`claim_sets` ignoreras för närvarande.

---

## 3. [Response](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-response) {#response}

Appen stöder endast response type `vp_token`.

### 3.1 Response modes {#response-modes}

| Response mode     | Stöds |
| ----------------- | ----- |
| `direct_post`     | ✅    |
| `direct_post.jwt` | ❌    |

---

## 4. [Djuplänkning](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-wallet-invocation) {#djuplankning}

Appen stöder endast presentation för länkar med följande URL scheman:

- `openid4vp://`

## 5. [Wallet metadata](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-wallet-metadata-authorizati) {#wallet-metadata}

Stöds ej.

## 6. [Verifier attestation JWT](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-verifier-attestation-jwt) {#verifier-attestation-jwt}

Stöds ej.

## 7. [High Assurance Interoperability Profile (HAIP)](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html#name-openid-for-verifiable-prese) {#haip}

Appen stöder ännu ej OpenID4VP-presentationer enligt HAIP.

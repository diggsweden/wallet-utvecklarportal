---
# SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government
#
# SPDX-License-Identifier: CC0-1.0

layout: default
title: Prova plånboksappen under utveckling
description: Instruktioner för hur du får åtkomst till, installerar och provar den statliga identitetsplånboksappen under utveckling i Diggs Sandbox-miljö.
---

# Prova plånboksappen under utveckling

Denna guide beskriver steg-för-steg hur du laddar ned, installerar och provar den statliga identitetsplånboksappen (hädanefter kallad appen) under utveckling i Diggs Sandbox-miljö.

> **Obs:** Testning av plånboksappen är endast tillgänglig för
> organisationer som har bjudits in av Digg.
> För att få åtkomst behöver du tillhöra en inbjuden organisation
> och bli registrerad som testare via organisationens kontaktperson.

## Innehåll

1. [Få åtkomst till appen](#1-få-åtkomst-till-appen)
2. [Installera appen](#2-installera-appen)
3. [Första uppstart och hämtning av test-ID](#3-första-uppstart-av-appen-och-hämtning-av-test-id-pid)
4. [Testa att använda din PID](#4-testa-att-använda-din-pid-vaccincentralen)
5. [Återkoppling och Support](#återkoppling-och-support)

---

## Steg-för-steg-guide

### 1. Få åtkomst till appen

Kontakta kontaktpersonen för plånbokstestning i din organisation
och ange vilken plattform du vill använda:

- **iOS:**
   Meddela att du vill testa iOS-klienten.
   När du har registrerats som testare får du en inbjudningslänk från kontaktpersonen.

- **Android:**
   Meddela att du vill testa Android-klienten
   och ange e-postadressen som är kopplad till Google-kontot på din telefon.
   Kontaktpersonen anmäler adressen till Digg
   och skickar inbjudningslänken när du har registrerats som testanvändare.

**Systemkrav:** Appen kräver **iOS 17.6 eller senare**
respektive **Android 12 (API-nivå 31) eller senare**.
Kontrollera att din telefon uppfyller kraven innan du begär åtkomst.

---

### 2. Installera appen

Installationen skiljer sig åt beroende på vilken plattform du använder. Följ instruktionerna för din plattform när du har fått din inbjudan:

- [Installera på iOS (Apple)](installera-ios.md) – via TestFlight.
- [Installera på Android (Google)](installera-android.md) – via Google Play.

---

### 3. Första uppstart av appen och hämtning av test-ID (PID)

När du öppnar appen första gången behöver du konfigurera den och ladda den med ett test-ID (Personidentitetsdata / PID).

1. **Öppna appen** och klicka på **Nästa** i introvyn.
2. **Skapa en PIN-kod** (välj en kod du vill använda för att logga in i appen framöver) och klicka på **Nästa**.
3. **Bekräfta PIN-koden** genom att ange samma kod igen och klicka på **Nästa**.
4. Nu är det dags att ladda på en PID i plånboken. Klicka på **Begär personuppgifter**.
5. Klicka på **Logga in** för att identifiera dig mot Diggs test-PID-utfärdare.
6. Välj en av de fördefinierade testanvändarna i listan och genomför inloggningen.
7. Ditt hämtade attributsintyg visas på skärmen. Granska uppgifterna och klicka på **Godkänn** längst ner på sidan.
8. Grattis! Du har nu ett test-ID (PID) sparat i din plånbok.

---

### 4. Testa att använda din PID (Vaccincentralen)

För att testa hur plånboksappen kan användas för att logga in eller dela uppgifter med en webbplats har Digg satt upp ett testverktyg kallat **Vaccincentralen**.

Du kan utföra testet på två olika sätt:

#### Alternativ 1: Utför hela flödet på samma mobila enhet

1. Öppna webbläsaren på din mobil (där plånboksappen är installerad) och gå till:  
   [wallet.sandbox.digg.se/demo-verifier/vaccincentralen](https://wallet.sandbox.digg.se/demo-verifier/vaccincentralen)
2. Klicka på **Logga in med din digitala plånbok**.
3. Klicka på **Starta inloggningen**.
4. Klicka på **Har du plånboken på den här enheten?**.
5. Klicka på **Öppna wallet** (på iOS klickar du på *Öppna* i den systemdialog som frågar om du vill öppna appen).
6. Granska de uppgifter som Vaccincentralen efterfrågar (via OpenID4VP-protokollet) i plånboksappen.
7. Klicka på **Skicka**.
8. Du slussas tillbaka till webbläsaren och möts av ett meddelande om att inloggningen lyckades, samt ser de uppgifter som delats med tjänsten!

#### Alternativ 2: Besök tjänsten på en annan enhet (t.ex. PC) och skanna QR-kod

1. Öppna webbläsaren på din dator eller en annan enhet och gå till:  
   [wallet.sandbox.digg.se/demo-verifier/vaccincentralen](https://wallet.sandbox.digg.se/demo-verifier/vaccincentralen)
2. Klicka på **Logga in med din digitala plånbok**.
3. Klicka på **Starta inloggningen**. En QR-kod visas nu på skärmen.
4. Öppna din mobils kamera-app (eller plånboksappens inbyggda skanner) och skanna QR-koden på datorskärmen.
   - *iOS:* Klicka på länken *Öppna i id-plånboken* som dyker upp efter skanningen.
5. Granska uppgifterna som efterfrågas i plånboksappen på din telefon.
6. Klicka på **Skicka**.
7. Webbbläsaren på din dator uppdateras nu automatiskt och visar att inloggningen lyckades tillsammans med den delade datan!
   - *Android:* Plånboksappen visar också en bekräftelse på att sändningen lyckades.

---

## Återkoppling och Support

- Vid frågor, feedback eller tekniska problem, kontakta utvecklingsteamet på [digitalwallet@digg.se](mailto:digitalwallet@digg.se).

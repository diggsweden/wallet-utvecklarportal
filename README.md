<!--
SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government

SPDX-License-Identifier: CC0-1.0
-->

# wallet-utvecklarportal

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/diggsweden/wallet-utvecklarportal/badge)](https://securityscorecards.dev/viewer/?uri=github.com/diggsweden/wallet-utvecklarportal)

En utvecklarportal med information och hjälp riktad till parter som vill ansluta till svenska plånbokssystemets
testmiljö.

**Gå till portalen:**
[https://diggsweden.github.io/wallet-utvecklarportal/](https://diggsweden.github.io/wallet-utvecklarportal/)

---

## Diagram (Mermaid)

Mermaid-diagram lagras i `_mermaid/` som `.mmd`-filer och renderas till önskat filformat i `assets/images/diagrams/`.

### Lägg till nytt diagram

1. Lägg till `.mmd`-fil i `_mermaid/`
2. Kör `rake diagrams`

### Generera om alla diagram

```bash
rake diagrams
```

### Lokal utveckling

För att generera diagram och starta den lokala servern:

```bash
rake && jekyll serve
```

### Förutsättningar

Projektet använder [mise](https://mise.jdx.dev/) och [just](https://github.com/casey/just) för att automatiskt hantera
alla nödvändiga verktyg, versioner och linting-skript.

För att installera alla verktyg och linter-skript lokalt, kör:

```bash
just install
```

### Rutin vid driftstörning

När en driftstörning upptäckts:

1. Under rubriken "Pågående driftstörningar" på [sidan Aktuellt](./pages/aktuellt.md#pågående-drift):

   - Byt ut standardtexten mot information om den pågående störningen.
     I källkoden finns ett utkommenterat avsnitt att utgå ifrån.
   - Glöm inte att ta bort eller kommentera ut standardtexten.

2. I banderollen med id `sub_header_bar` i [vår sidmall](_layouts/default.html):

   - Byt ut standardtexten mot en kortfattad text som länkar till [sidan Aktuellt](./pages/aktuellt.md).
     I källkoden finns ett utkommenterat avsnitt att utgå ifrån.
   - Glöm inte att ta bort eller kommentera ut standardtexten.

3. Testa att ändringarna ser bra ut genom att bygga och köra en lokal version av sajten med `just serve`.

4. Gör en pull request och skeppa ändringen enligt normal rutin.

Om störningen blir långvarig kan det vara bra att periodvis uppdatera informationen.

När störningen är åtgärdad:

1. Återställ informationen i banderollen och på sidan Aktuellt till ursprungligt skick, till exempel med `git revert`.

2. Under rubriken "Tidigare händelser" på [sidan Aktuellt](./pages/aktuellt.md#tidigare-händelser):

   - Lägg till en kort sammanfattning av det som inträffat och eventuell påverkan för våra användare.

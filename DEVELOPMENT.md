<!--
SPDX-FileCopyrightText: 2026 Digg - Agency for Digital Government

SPDX-License-Identifier: CC0-1.0
-->

# Utveckling av Wallet Utvecklarportal

Denna guide beskriver hur du sätter upp en lokal miljö för att utveckla och förhandsgranska portalen.

## Förutsättningar

- Ubuntu 24.04 (eller liknande Linux-distribution)
- Ruby 3.2+
- Build-essential (gcc, make)

## Installation och uppsättning

Projektet använder [mise](https://mise.jdx.dev/) för verktygshantering och [just](https://github.com/casey/just) som task runner. Det innebär att alla beroenden (Ruby, Node, Mermaid-CLI, bundler, linters) installeras automatiskt i projektet.

### Förutsättningar

- Du behöver ha `mise` installerat på din maskin. Om du inte har det, följ [mises installationsguide](https://mise.jdx.dev/getting-started.html).
- Systemberoenden för att kompilera eventuella gems (t.ex. `build-essential`, `gcc`, `make` på Ubuntu/Debian).

### 1. Installera utvecklingsverktyg och beroenden

Kör följande kommando från projektets rot:

```bash
just install
```

Detta kommando installerar:

- Rätt Ruby- och Node.js-versioner lokalt för projektet.
- Alla linters och utvecklingsverktyg.
- Alla npm-paket lokalt (`mermaid-cli`).
- Alla Ruby-gems (`bundle install`).

## Lokal utveckling

1. **Starta servern**:

   ```bash
   bundle exec jekyll serve
   ```

Servern kommer nu att finnas tillgänglig på: **[http://localhost:4000](http://localhost:4000)**

Webbplatsen byggs om automatiskt när du gör ändringar i filerna.

### Snabbkommandon med `just`

Projektet har en `justfile` för vanliga utvecklingsuppgifter:

```bash
just --list          # Visa alla tillgängliga kommandon
just build           # Bygg Jekyll-webbplatsen
just serve           # Starta den lokala utvecklingsservern
just check-links     # Bygg och validera alla interna och externa länkar med Lychee
```

## Testa och driftsätt din branch

Om du vill förhandsgranska dina ändringar på den publika webbplatsen innan du mergar till `main`:

> [!IMPORTANT]
> För att detta ska fungera och för att undvika det inbyggda, felaktiga GitHub Pages-bygget (som inte får med alla resurser som diagram och skapar ett race condition) måste GitHub Pages vara konfigurerat för att använda **GitHub Actions** som källa. Det ställs in under **Settings** -> **Pages** -> **Build and deployment** -> **Source: GitHub Actions**.

När detta är konfigurerat kan du testa en branch på följande sätt:

1. Gå till [Actions](https://github.com/diggsweden/wallet-utvecklarportal/actions) i repot.
2. Välj workflowet **Build and Deploy** i listan till vänster.
3. Klicka på **Run workflow**-knappen till höger.
4. Välj den branch du vill testa (t.ex. `feat/min-ändring`) under **Use workflow from**.
5. Klicka på den gröna **Run workflow**-knappen.
6. Det tar ungefär 1-2 minuter innan ändringarna visas på [https://diggsweden.github.io/wallet-utvecklarportal/](https://diggsweden.github.io/wallet-utvecklarportal/).

**Viktigt:** Glöm inte att köra workflowet mot **main** igen när du är klar med testningen, så att den publika sidan återställs till det som är mergat i main!

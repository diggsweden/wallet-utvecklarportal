# wallet-utvecklarportal

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/diggsweden/wallet-utvecklarportal/badge)](https://securityscorecards.dev/viewer/?uri=github.com/diggsweden/wallet-utvecklarportal)

En utvecklarportal med information och hjälp riktad till parter som vill ansluta till svenska plånbokssystemets testmiljö.

**Gå till portalen:** [https://diggsweden.github.io/wallet-utvecklarportal/](https://diggsweden.github.io/wallet-utvecklarportal/)

---

## Diagram (Mermaid)

Mermaid-diagram lagras i `_mermaid/` som `.mmd`-filer och renderas till önskat filformat i `assets/images/diagrams/`.

### Lägg till nytt diagram

1. Lägg till `.mmd`-fil i `_mermaid/`
2. Kör `rake diagrams` (se till att `/tmp/puppeteer.json` existerar först, se nedan)

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

Projektet använder [mise](https://mise.jdx.dev/) för att automatiskt hantera alla nödvändiga verktyg och versioner (såsom Ruby, Node.js, Mermaid-CLI samt alla linting-verktyg).

För att installera alla verktyg lokalt, kör:

```bash
mise install
```

| Beroende | Syfte |
|----------|-------------------------------------------------|
| **Node.js** + `@mermaid-js/mermaid-cli` | Renderar Mermaid-diagram till önskat filformat |
| **Ruby** + Bundler | Bygger webbplatsen med Jekyll |

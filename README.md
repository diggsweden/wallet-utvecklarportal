# wallet-utvecklarportal

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/diggsweden/wallet-utvecklarportal/badge)](https://securityscorecards.dev/viewer/?uri=github.com/diggsweden/wallet-utvecklarportal)

En utvecklarportal med information och hjälp riktad till parter som vill ansluta till svenska plånbokssystemets testmiljö.

**Gå till portalen:** [https://diggsweden.github.io/wallet-utvecklarportal/](https://diggsweden.github.io/wallet-utvecklarportal/)

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

Projektet använder [mise](https://mise.jdx.dev/) och [just](https://github.com/casey/just) för att automatiskt hantera alla nödvändiga verktyg, versioner och linting-skript.

För att installera alla verktyg och linter-skript lokalt, kör:

```bash
just install
```

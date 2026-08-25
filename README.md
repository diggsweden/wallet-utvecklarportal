# wallet-utvecklarportal
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/diggsweden/
{wallet-utvecklarportal}/badge)](https://securityscorecards.dev/viewer/?uri=github.com/diggsweden/wallet-utvecklarportal)

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
För att generera diagram och köra servern:

```bash
# Skapa puppeteer-konfig (krävs på Linux)
echo '{"args": ["--no-sandbox", "--disable-setuid-sandbox"]}' > /tmp/puppeteer.json

# Generera diagram och starta lokal server
rake && jekyll serve
```

### Förutsättningar

| Beroende | Syfte                                           | Installation |
|----------|-------------------------------------------------|--------------|
| **Node.js** (v20+) + `@mermaid-js/mermaid-cli` | Renderar Mermaid-diagram till önskat filformat | `npm install -g @mermaid-js/mermaid-cli` |
| **Ruby** (v3.0+) + Bundler | Bygger webbplatsen med Jekyll                   | `gem install bundler && bundle install` |

# wallet-utvecklarportal

En utvecklarportal med information och hjälp riktad till parter som vill ansluta till svenska plånbokssystemets testmiljö.

**Gå till portalen:** [https://diggsweden.github.io/wallet-utvecklarportal/](https://diggsweden.github.io/wallet-utvecklarportal/)

---

## Diagramm (Mermaid)

Mermaid-diagramm lagras i `_mermaid/` som `.mmd`-filer och renderas till SVG i `assets/images/diagrams/`.

### Lägg till nytt diagram
1. Lägg till `.mmd`-fil i `_mermaid/`
2. Kör `rake` eller `mmdc -p /tmp/puppeteer.json -i _mermaid/filename.mmd -o assets/images/diagrams/filename.svg`

### Generera om alla diagram
```bash
rake diagrams
```

### Lokal utveckling
```bash
rake && jekyll serve
```

### Förutsättningar
- Node.js med `@mermaid-js/mermaid-cli` installerat globalt
- Puppeteer-konfiguration i `/tmp/puppeteer.json` med avaktiverad sandbox:
  ```json
  {"args": ["--no-sandbox", "--disable-setuid-sandbox"]}
  ```

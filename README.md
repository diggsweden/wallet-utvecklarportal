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

### Publicering till GitHub Pages

GitHub Pages **kör inte `rake` automatiskt**. Använd något av dessa tillvägagångssätt:

#### Alternativ 1: Committa SVG-filer (Rekommenderas för enkelhet)
- Kör `rake diagrams` lokalt
- Committa både `.mmd`-källfiler och genererade `.svg`-filer
- GitHub Pages bygger med förgenererade SVG-filer

#### Alternativ 2: GitHub Actions (Automatisk)
Arbetsflödet i `.github/workflows/jekyll.yml` gör automatiskt:
1. Installerar Node.js och mermaid-cli (med npm-cache)
2. Genererar alla diagram med `rake diagrams`
3. Bygger Jekyll-siten med `actions/jekyll-build-pages`
4. Publicerar till GitHub Pages med `actions/deploy-pages`

Körs endast vid push till `main`-grenen.

### Förutsättningar
- Node.js med `@mermaid-js/mermaid-cli` installerat globalt
- Puppeteer-konfiguration i `/tmp/puppeteer.json` med avaktiverad sandbox:
  ```json
  {"args": ["--no-sandbox", "--disable-setuid-sandbox"]}
  ```

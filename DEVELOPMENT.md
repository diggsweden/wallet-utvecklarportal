# Utveckling av Wallet Utvecklarportal

Denna guide beskriver hur du sätter upp en lokal miljö för att utveckla och förhandsgranska portalen.

## Förutsättningar

- Ubuntu 24.04 (eller liknande Linux-distribution)
- Ruby 3.2+
- Build-essential (gcc, make)

## Installation

### 1. Installera systemberoenden
```bash
sudo apt update && sudo apt install ruby-full build-essential zlib1g-dev -y
```

### 2. Konfigurera lokal gem-sökväg
För att undvika att installera gems systemvitt (och behöva `sudo`), lägg till följande i din `~/.bashrc`:

```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 3. Installera Jekyll och Bundler
```bash
gem install jekyll bundler
```

## Lokal utveckling

1. **Klona repot och navigera till mappen**:
   ```bash
   cd diggsweden/wallet-utvecklarportal
   ```

2. **Installera projektberoenden**:
   ```bash
   bundle install
   ```

3. **Starta servern**:
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

## Länkverifiering

För att säkerställa att inga brutna externa eller interna länkar publiceras används **[Lychee](https://github.com/lycheeverse/lychee)**:

* **Lokalt:** Kör `just check-links` innan du skapar en PR.
* **Vid Pull Request:** GitHub Actions validerar alla länkar och blockerar PR:en om brutna länkar upptäcks.
* **Schemalagt:** Ett veckovis cron-jobb körs varje måndag och öppnar automatiskt ett issue om externa länkar dör.
* **Konfiguration:** Regler och undantag styrs via `lychee.toml`.

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

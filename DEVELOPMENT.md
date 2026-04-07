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

## Testa och driftsätt din branch

Om du vill förhandsgranska dina ändringar på den publika webbplatsen innan du mergar till `main`:

1.  Gå till [Inställningar för GitHub Pages](https://github.com/diggsweden/wallet-utvecklarportal/settings/pages).
2.  Under **Build and deployment**, ändra **Branch** från "main" till namnet på din branch (t.ex. `feat/min-ändring`).
3.  Klicka på **Save**.
4.  Det tar ungefär 1 minut innan ändringarna visas på [https://diggsweden.github.io/wallet-utvecklarportal/](https://diggsweden.github.io/wallet-utvecklarportal/).

**Viktigt:** Glöm inte att ändra tillbaka till **main** när du är klar med testningen!

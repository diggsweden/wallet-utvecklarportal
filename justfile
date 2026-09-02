# Default recipe: list available recipes
default:
    @just --list

# Build the Jekyll site
build:
    bundle exec jekyll build

# Start local Jekyll development server
serve:
    bundle exec jekyll serve

# Generate Mermaid diagrams
diagrams:
    bundle exec rake diagrams

# Build site and verify all internal and external links
check-links:
    bundle exec jekyll build
    mise exec -- lychee --config lychee.toml --root-dir _site _site

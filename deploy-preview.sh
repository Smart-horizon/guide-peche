#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy-preview.sh — Worker d'APERÇU dédié pour Sanity Presentation.
#
# Build SSR + stega + brouillons temps réel + overlays Visual Editing.
# Déployé sur un worker SÉPARÉ (guide-peche-preview) → le site public
# (guide-peche) reste 100% propre, sans stega.
#
# Sanity Studio (Presentation) doit pointer sur :
#   https://guide-peche-preview.smart-horizon.workers.dev
# ─────────────────────────────────────────────────────────────────────────────
set -e

OLD_DIR="src/pages/old"
BACKUP_DIR=".pages-old-backup"
PRERENDER_BACKUP=".prerender-backup"

# Pages passées en SSR pour l'aperçu (brouillons temps réel).
PRERENDER_PAGES=(
  "src/pages/blog/[slug].astro"
  "src/pages/en/[slug].astro"
  "src/pages/en/blog/[slug].astro"
  "src/pages/en/blog/index.astro"
  "src/pages/en/contact.astro"
  "src/pages/en/index.astro"
  "src/pages/en/temoignages.astro"
  "src/pages/en/newsletter.astro"
  "src/pages/newsletter.astro"
)

restore() {
  # Restaure prerender = true
  if [ -d "$PRERENDER_BACKUP" ]; then
    for f in "${PRERENDER_PAGES[@]}"; do
      bak="$PRERENDER_BACKUP/$(echo "$f" | tr '/[]' '___')"
      [ -f "$bak" ] && cp "$bak" "$f"
    done
    rm -rf "$PRERENDER_BACKUP"
  fi
  # Restaure old/
  [ -d "$BACKUP_DIR" ] && mv "$BACKUP_DIR" "$OLD_DIR"
}
trap restore EXIT

# ── Charge SANITY_TOKEN depuis .env (nécessaire pour lire les brouillons) ─────
if [ -f .env ]; then
  export $(grep -E '^SANITY_TOKEN=' .env | xargs)
fi
if [ -z "$SANITY_TOKEN" ]; then
  echo "❌ SANITY_TOKEN manquant (.env). Requis pour lire les brouillons."
  exit 1
fi

# ── Masque les pages hardcodées de référence ─────────────────────────────────
if [ -d "$OLD_DIR" ]; then
  echo "📦 Masquage de $OLD_DIR..."
  mv "$OLD_DIR" "$BACKUP_DIR"
fi

# ── Bascule prerender = true → false (SSR temps réel) ─────────────────────────
echo "🔀 Passage des pages en SSR pour l'aperçu..."
mkdir -p "$PRERENDER_BACKUP"
for f in "${PRERENDER_PAGES[@]}"; do
  if [ -f "$f" ]; then
    cp "$f" "$PRERENDER_BACKUP/$(echo "$f" | tr '/[]' '___')"
    # sed portable (BSD/GNU) via perl pour éviter les soucis d'in-place
    perl -0pi -e 's/export const prerender = true/export const prerender = false/' "$f"
  fi
done

echo ""
echo "🧹 Nettoyage du cache Vite..."
rm -rf node_modules/.vite/deps_ssr node_modules/.vite/deps_astro

echo ""
echo "🚀 Build APERÇU (stega + brouillons + overlays)..."
PUBLIC_SANITY_PREVIEW=true npx astro build

# ── Patch wrangler.json : nom du worker d'aperçu + run_worker_first ───────────
echo "⚙️  Patch wrangler.json (worker guide-peche-preview)..."
node -e "
  const fs = require('fs');
  const p = 'dist/server/wrangler.json';
  const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
  cfg.name = 'guide-peche-preview';
  cfg.assets = cfg.assets || {};
  cfg.assets.run_worker_first = true;
  fs.writeFileSync(p, JSON.stringify(cfg));
  console.log('  ✓ name = guide-peche-preview');
"

echo ""
echo "🚀 Deploy Wrangler (worker aperçu)..."
npx wrangler deploy --config dist/server/wrangler.json

echo ""
echo "✅ Aperçu déployé — https://guide-peche-preview.smart-horizon.workers.dev"
echo "   (overlays + brouillons, visibles uniquement ici et dans Sanity)"

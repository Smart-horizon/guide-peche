#!/bin/bash
# Script deploy sécurisé — masque src/pages/old/ avant le build, le restaure après.

set -e

OLD_DIR="src/pages/old"
BACKUP_DIR=".pages-old-backup"

# ── Masque les pages hardcodées ───────────────────────────────────────────────
if [ -d "$OLD_DIR" ]; then
  echo "📦 Masquage de $OLD_DIR..."
  mv "$OLD_DIR" "$BACKUP_DIR"
  echo "  ✓ $OLD_DIR temporairement retiré"
else
  echo "  (aucun dossier $OLD_DIR à masquer)"
fi

echo ""
echo "🧹 Nettoyage du cache Vite (SSR)..."
rm -rf node_modules/.vite/deps_ssr node_modules/.vite/deps_astro
echo "  ✓ Cache Vite vidé"

echo ""
echo "🚀 Build en cours..."
npx astro build

# ── Patch wrangler.json : run_worker_first = true ─────────────────────────────
# Requis depuis que Cloudflare Workers Assets bypasse le Worker par défaut.
# Sans ce flag, les pages SSR (calendrier, login) retournent 404.
echo "⚙️  Patch wrangler.json (run_worker_first)..."
node -e "
  const fs = require('fs');
  const p = 'dist/server/wrangler.json';
  const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
  cfg.assets = cfg.assets || {};
  cfg.assets.run_worker_first = true;
  fs.writeFileSync(p, JSON.stringify(cfg));
  console.log('  ✓ assets.run_worker_first = true');
"

echo ""
echo "🚀 Deploy Wrangler..."
npx wrangler deploy --config dist/server/wrangler.json

# ── Fix cache Wrangler : forcer le re-upload de tous les HTML ────────────────
echo "🔄 Invalidation du cache Wrangler..."
find dist/client -name "index.html" -exec sh -c 'echo " " >> "$1"' _ {} \;
# Re-patch car le find a modifié dist mais pas le wrangler.json
node -e "
  const fs = require('fs');
  const p = 'dist/server/wrangler.json';
  const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
  cfg.assets = cfg.assets || {};
  cfg.assets.run_worker_first = true;
  fs.writeFileSync(p, JSON.stringify(cfg));
"
npx wrangler deploy --config dist/server/wrangler.json 2>/dev/null | grep -E "Found [0-9]|Uploaded [0-9]|Deployed" || true

echo ""
echo "🔁 Restauration de $OLD_DIR..."
if [ -d "$BACKUP_DIR" ]; then
  mv "$BACKUP_DIR" "$OLD_DIR"
  echo "  ✓ $OLD_DIR restauré"
fi

echo ""
echo "✅ Deploy terminé — workers.dev = Sanity, localhost /old/* = pages de référence"

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
echo "🚀 Deploy en cours..."
npm run deploy

# ── Fix cache Wrangler : forcer le re-upload de tous les HTML ────────────────
echo "🔄 Invalidation du cache Wrangler..."
find dist/client -name "index.html" -exec sh -c 'echo " " >> "$1"' _ {} \;
npx wrangler deploy --config dist/server/wrangler.json 2>/dev/null | grep -E "Found [0-9]|Uploaded [0-9]|Deployed" || true

echo ""
echo "🔁 Restauration de $OLD_DIR..."
if [ -d "$BACKUP_DIR" ]; then
  mv "$BACKUP_DIR" "$OLD_DIR"
  echo "  ✓ $OLD_DIR restauré"
fi

echo ""
echo "✅ Deploy terminé — workers.dev = Sanity, localhost /old/* = pages de référence"

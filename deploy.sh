#!/bin/bash
# Script de deploy du site public (worker guide-peche).
# Obligatoire (ne pas utiliser `npm run deploy` directement) car il :
#   1. nettoie le cache Vite SSR
#   2. patche wrangler.json (run_worker_first, requis pour les pages SSR)
#   3. force le re-upload des HTML (invalidation du cache Wrangler)
# NB : les anciennes pages hardcodées vivent dans archive/pages-old-hardcodees
# (hors de src/) — plus aucun masquage nécessaire depuis le 14/07/2026.

set -e

echo "🧹 Nettoyage du cache Vite (SSR)..."
rm -rf node_modules/.vite/deps_ssr node_modules/.vite/deps_astro
echo "  ✓ Cache Vite vidé"

echo ""
echo "🚀 Build en cours..."
npx astro build

# ── Patch wrangler.json : run_worker_first (+ exclusions 301) ────────────────
# Requis pour les pages SSR (calendrier, login) ; les exclusions laissent la
# couche assets servir les vrais 301 de public/_redirects.
echo "⚙️  Patch wrangler.json (run_worker_first + exclusions 301)..."
node patch-wrangler.cjs

echo ""
echo "🚀 Deploy Wrangler..."
npx wrangler deploy --config dist/server/wrangler.json

# ── Fix cache Wrangler : forcer le re-upload de tous les HTML ────────────────
echo "🔄 Invalidation du cache Wrangler..."
find dist/client -name "index.html" -exec sh -c 'echo " " >> "$1"' _ {} \;
# Re-patch car le find a modifié dist mais pas le wrangler.json
node patch-wrangler.cjs
npx wrangler deploy --config dist/server/wrangler.json 2>/dev/null | grep -E "Found [0-9]|Uploaded [0-9]|Deployed" || true

echo ""
echo "✅ Deploy terminé — https://guide-peche.smart-horizon.workers.dev"

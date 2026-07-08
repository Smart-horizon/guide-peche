/**
 * fix-extraits-entities.mjs
 * Décode les entités HTML restées en clair dans les extraits d'articles
 * (&nbsp;, &amp;, &eacute;…) — artefact de la migration BlogSpirit où la
 * meta description était doublement encodée.
 *
 * ⚠️ Décodage STRICT uniquement : aucun mot n'est modifié ni réécrit.
 *
 * Usage : node scripts/fix-extraits-entities.mjs           (aperçu)
 *         node scripts/fix-extraits-entities.mjs --apply    (patch Sanity)
 */
import { createClient } from '@sanity/client'
import 'dotenv/config'

const APPLY = process.argv.includes('--apply')

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const NAMED = {
  nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>',
  eacute: 'é', egrave: 'è', ecirc: 'ê', euml: 'ë',
  agrave: 'à', acirc: 'â', ccedil: 'ç',
  icirc: 'î', iuml: 'ï', ocirc: 'ô', ouml: 'ö',
  ugrave: 'ù', ucirc: 'û', uuml: 'ü',
  hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  laquo: '«', raquo: '»', euro: '€', deg: '°', ndash: '–', mdash: '—', oelig: 'œ',
}

function decodeEntities(s) {
  let out = s
  // Deux passes : gère les cas doublement encodés (&amp;nbsp; → &nbsp; → espace)
  for (let i = 0; i < 2; i++) {
    out = out
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m)
  }
  // Les &nbsp; devenus espaces peuvent créer des doubles espaces → on resserre
  return out.replace(/ {2,}/g, ' ').replace(/\s+$/,'').replace(/^\s+/,'')
}

const ENTITY_RX = /&(#\d+|#x[0-9a-f]+|[a-z]+);/i

const articles = await client.fetch(
  `*[_type == "article" && defined(extrait)]{ _id, extrait, "slug": slug.current }`
)

const toFix = articles.filter(a => ENTITY_RX.test(a.extrait))
console.log(`\n${toFix.length} extrait(s) avec entités HTML sur ${articles.length} articles\n`)

for (const a of toFix) {
  const fixed = decodeEntities(a.extrait)
  console.log(`— ${a.slug?.slice(0, 55)}`)
  console.log(`  avant : ${a.extrait.slice(0, 90)}`)
  console.log(`  après : ${fixed.slice(0, 90)}`)
  if (APPLY) {
    await client.patch(a._id).set({ extrait: fixed }).commit()
    console.log('  ✓ patché')
  }
}

console.log(APPLY ? '\n✅ Corrections appliquées dans Sanity' : '\nAperçu seul — relancer avec --apply pour patcher')

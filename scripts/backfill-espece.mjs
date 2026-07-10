/**
 * backfill-espece.mjs
 * Classe les articles sans champ `espece` à partir de leurs tags et titre.
 * Métadonnée de classement uniquement — AUCUN contenu modifié.
 *
 * Usage : node scripts/backfill-espece.mjs           (aperçu)
 *         node scripts/backfill-espece.mjs --apply    (patch Sanity)
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

// Ordre = priorité (le premier qui matche gagne)
const RULES = [
  ['alose',    /alose/i],
  ['brochet',  /brochet|pike|sandre|aspe/i],
  ['saumon',   /saumon|salmon|spey|castillon|migrateur/i],
  ['exotique', /los.?roques|cuba|bonefish|tarpon|permit|argentine|mexi(que|co)|venezuela|tsimane|kola|russie|ponoi|norv[eè]ge|patagonie|sea.?trout|terre de feu|rio grande|exotique|maurice|seychelles|carangue|caranx|barracuda|cal[ée]donie/i],
  ['bar',      /\bbars?\b|estuaire|c[ôo]ti[eè]re?|mulet|maquereau|lieu jaune|orphie|calamar|squid|seiche/i],
  ['truite',   /truite|r[ée]servoir|nymphe|s[èe]che|streamer|fario|arc.?en.?ciel|rivi[èe]re|mouche s[èe]che|l[ée]on|elorn|aulne|odet|ell[ée]|scorff|blavet/i],
]

function classify(article) {
  const haystack = [article.title || '', ...(article.tags || [])].join(' · ')
  for (const [espece, rx] of RULES) {
    if (rx.test(haystack)) return espece
  }
  return null
}

const articles = await client.fetch(
  `*[_type == "article" && !defined(espece)]{ _id, title, tags, "slug": slug.current } | order(title asc)`
)
console.log(`\n${articles.length} article(s) sans espèce\n`)

let classified = 0, skipped = 0
for (const a of articles) {
  const espece = classify(a)
  if (espece) {
    classified++
    console.log(`  ${espece.padEnd(9)} ← ${(a.title || a.slug).slice(0, 75)}`)
    if (APPLY) await client.patch(a._id).set({ espece }).commit()
  } else {
    skipped++
    console.log(`  (aucune)  ← ${(a.title || a.slug).slice(0, 75)}`)
  }
}

console.log(`\n${classified} classé(s), ${skipped} inclassable(s)`)
console.log(APPLY ? '✅ Appliqué dans Sanity' : 'Aperçu seul — relancer avec --apply')

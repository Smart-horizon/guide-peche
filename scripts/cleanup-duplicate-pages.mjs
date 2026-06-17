/**
 * Supprime les documents "page" en doublon avec un document prestation/voyage de même slug.
 *
 * Usage :
 *   node --env-file=.env scripts/cleanup-duplicate-pages.mjs          → dry-run (liste)
 *   node --env-file=.env scripts/cleanup-duplicate-pages.mjs --delete  → suppression réelle
 */
import { createClient } from '@sanity/client'

const DRY_RUN = !process.argv.includes('--delete')

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN manquant')
    process.exit(1)
  }

  console.log(DRY_RUN ? '🔍 DRY-RUN — aucune suppression\n' : '⚠️  MODE SUPPRESSION ACTIVÉ\n')

  // 1. Trouver tous les docs "page" dont le slug existe aussi en prestation ou voyage
  const duplicates = await client.fetch(`
    *[_type == "page" && defined(slug.current) && count(*[_type in ["prestation","voyage"] && slug.current == ^.slug.current]) > 0]{
      _id,
      title,
      "slug": slug.current,
      "duplicateId":   *[_type in ["prestation","voyage"] && slug.current == ^.slug.current][0]._id,
      "duplicateType": *[_type in ["prestation","voyage"] && slug.current == ^.slug.current][0]._type,
    }
  `)

  if (duplicates.length === 0) {
    console.log('✅ Aucun doublon trouvé — base Sanity déjà propre.')
    return
  }

  console.log(`📋 ${duplicates.length} document(s) "page" en doublon avec une prestation/voyage :\n`)
  for (const d of duplicates) {
    console.log(`  • /${d.slug}`)
    console.log(`      page       : ${d._id}  "${d.title || '(sans titre)'}"`)
    console.log(`      ${d.duplicateType.padEnd(10)} : ${d.duplicateId}`)
  }

  if (DRY_RUN) {
    console.log(`\n→ Relancez avec --delete pour supprimer ces ${duplicates.length} documents "page".`)
    return
  }

  // 2. Suppression en transaction
  console.log(`\n🗑  Suppression de ${duplicates.length} documents "page"...`)
  const tx = client.transaction()
  for (const d of duplicates) tx.delete(d._id)
  const result = await tx.commit()
  console.log(`\n✅ ${result.results?.length ?? duplicates.length} document(s) supprimé(s).`)
  console.log('   La base Sanity est maintenant propre — un redeploy peut être lancé.')
}

main().catch(err => { console.error(err); process.exit(1) })

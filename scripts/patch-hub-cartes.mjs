/**
 * patch-hub-cartes.mjs
 * Adds `tag` and `description` to cartes in the materiel hub page (published + draft)
 */
import { createClient } from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const CARTES_META = {
  '/materiel-mouche-migrateur': { tag: 'Saumon · Alose', description: 'Cannes Spey, soies Skagit et heads pour la pêche des migrateurs en Bretagne.' },
  '/materiel-mouche-truite': { tag: 'Eau douce', description: 'Soies légères et cannes fines pour la truite en rivière et en réservoir.' },
  '/materiel-mouche-bar': { tag: 'Côte · Bretagne', description: 'Cannes puissantes 9-12#, soies Shooting Head pour la chasse au bar à la mouche.' },
  '/materiel-mouche-reservoir': { tag: 'Lac · Plan d\'eau', description: 'Soies plongeantes et cannes intermédiaires pour les réservoirs à truites.' },
  '/materiel-mouche-brochet': { tag: 'Eau douce', description: 'Cannes 9-10#, grosses mouches articuées pour la traque du brochet.' },
  '/materiel-mouche-peche-exotique': { tag: 'International', description: 'Équipement tropicaux pour la pêche en eaux chaudes : tarpon, permit, GT.' },
}

async function patchDoc(docId) {
  const doc = await client.getDocument(docId)
  if (!doc) { console.log(`  ⚠️  Introuvable : ${docId}`); return }

  const pb = doc.pagebuilder || []
  const hubIdx = pb.findIndex(s => s._type === 'sectionGrilleSubPages')
  if (hubIdx === -1) { console.log(`  ⚠️  Pas de sectionGrilleSubPages dans ${docId}`); return }

  const cartes = pb[hubIdx].cartes || []
  const patchedCartes = cartes.map(c => {
    const meta = CARTES_META[c.url]
    if (meta) return { ...c, tag: meta.tag, description: meta.description }
    return c
  })

  await client
    .patch(docId)
    .set({ [`pagebuilder[${hubIdx}].cartes`]: patchedCartes })
    .commit()

  console.log(`  ✅ ${docId} — ${patchedCartes.length} cartes mises à jour`)
}

const IDS = ['page-materiel-jeanbaptistevidal', 'drafts.page-materiel-jeanbaptistevidal']

for (const id of IDS) {
  await patchDoc(id)
}
console.log('\nTerminé.')

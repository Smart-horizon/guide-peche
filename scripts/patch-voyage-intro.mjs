/**
 * patch-voyage-intro.mjs
 * Ajoute eyebrow + titre + champs manquants dans sectionIntro de chaque voyage.
 * Données extraites des pages hardcodées et des imports.
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uievv97s', dataset: 'production', useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN ||
    'skl1Jq1cu6ITb7XLmqhhExxPs49cBrlfmgynCLiVWj6a06hb09zCHnoaariWQdtgcTUzpyd9P3y5ocNpnUPYVOS863y3jY0rCxfIM2oAcfgPfaECJVFczkF1zzwztlb41HszbYACr8XRFzAxUqSLGyiba0KDzoA0g0m27TFwuniTC9BjMtPN',
})

const VOYAGES = [
  {
    slug:    'voyage-peche-argentine-rio-grande-truite-de-mer',
    eyebrow: 'Rio Grande · Terre de Feu · Argentine',
    titre:   'Le meilleur spot mondial de truite de mer',
    saison:  'Janvier à fin mars',
    tarif:   'Sur demande — variable selon la saison',
  },
  {
    slug:    'peche-mouche-cuba-cayo-cruz',
    eyebrow: 'Cayo Cruz · Cuba · Côte Nord',
    titre:   'La meilleure destination permit de Cuba',
    saison:  'Janvier à juin (tarpons : fin mars–juin)',
    tarif:   'Sur demande',
  },
  {
    slug:    'peche-mouche-cuba-cayo-santa-maria',
    eyebrow: 'Cayo Santa Maria · Jardins du Roi',
    titre:   'Une destination d\'exception pour le tarpon',
    saison:  'Janvier à juin (tarpon peak : fin avr–juin)',
    tarif:   'Sur demande',
  },
  {
    slug:    'voyage-peche-mouche-mexique',
    eyebrow: 'Xcalak · Mexique · Quintana Roo',
    titre:   'La fièvre du permit en mer des Caraïbes',
    saison:  'Nov – Mars (basse saison) · Avr – Juin (migration tarpons)',
    tarif:   'Sur demande',
  },
  {
    slug:    'los-roques-venezuela',
    eyebrow: 'Los Roques · Venezuela · Caraïbes',
    titre:   'Le top 3 mondial du bonefish',
    // saison et tarif déjà présents pour Los Roques
  },
]

async function main() {
  console.log('📝 Patch sectionIntro des pages voyage...\n')
  let ok = 0, skip = 0

  for (const { slug, eyebrow, titre, saison, tarif } of VOYAGES) {
    const doc = await client.fetch(
      `*[_type == "voyage" && slug.current == $slug][0]{
        _id, "introKey": pagebuilder[_type == "sectionIntro"][0]._key
      }`,
      { slug }
    )

    if (!doc?._id) { console.log(`  ⚠  ${slug} — document introuvable`); skip++; continue }
    if (!doc.introKey) { console.log(`  ⚠  ${slug} — pas de sectionIntro`); skip++; continue }

    const set = {
      [`pagebuilder[_key=="${doc.introKey}"].eyebrow`]: eyebrow,
      [`pagebuilder[_key=="${doc.introKey}"].titre`]:   titre,
    }
    if (saison) set[`pagebuilder[_key=="${doc.introKey}"].saison`] = saison
    if (tarif)  set[`pagebuilder[_key=="${doc.introKey}"].tarif`]  = tarif

    await client.patch(doc._id).set(set).commit()
    console.log(`  ✅ ${slug}`)
    console.log(`     eyebrow : ${eyebrow}`)
    console.log(`     titre   : ${titre}\n`)
    ok++
  }

  console.log(`✨ Terminé : ${ok} mis à jour, ${skip} ignorés`)
}

main()

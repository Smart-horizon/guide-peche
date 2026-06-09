/**
 * patch-intro-eyebrow-titre.mjs
 * Ajoute eyebrow + titre dans chaque sectionIntro des prestations,
 * extrait des pages hardcodées.
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN ||
    'skl1Jq1cu6ITb7XLmqhhExxPs49cBrlfmgynCLiVWj6a06hb09zCHnoaariWQdtgcTUzpyd9P3y5ocNpnUPYVOS863y3jY0rCxfIM2oAcfgPfaECJVFczkF1zzwztlb41HszbYACr8XRFzAxUqSLGyiba0KDzoA0g0m27TFwuniTC9BjMtPN',
})

// Données extraites des pages hardcodées
const DATA = [
  { slug: 'peche-de-l-alose-a-la-mouche',
    eyebrow: 'Guidage alose · Bretagne-Sud',
    titre:   'Un migrateur confidentiel et inoubliable' },

  { slug: 'initiation-peche-du-bar-a-la-mouche',
    eyebrow: 'Initiation · Bar à la mouche',
    titre:   'Vous rendre autonome, c\'est ma priorité' },

  { slug: 'peche-du-bar-perfectionnement',
    eyebrow: 'Perfectionnement · Bar à la mouche',
    titre:   'Pour les pêcheurs initiés qui veulent aller plus loin' },

  { slug: 'peche-mouche-bar-bateau-bretagne',
    eyebrow: 'Bar à la mouche · En bateau',
    titre:   'Un outil taillé pour la pêche à la mouche en estuaire' },

  { slug: 'peche-du-bar-a-vue-a-la-mouche',
    eyebrow: 'Bar à vue · Estuaire breton',
    titre:   'La forme la plus exigeante, la plus gratifiante' },

  { slug: 'peche-du-bar-a-la-mouche-coaching',
    eyebrow: 'Coaching · Bar à la mouche',
    titre:   'Mon expertise directement sur vos secteurs de pêche' },

  { slug: 'initiation-peche-a-la-mouche',
    eyebrow: 'Initiation · Pêche à la mouche',
    titre:   'Partir du bon pied avec un professionnel' },

  { slug: 'peche-de-la-truite-a-la-mouche-en-bretagne',
    eyebrow: 'Guidage truite · Bretagne-Sud',
    titre:   'La truite fario sauvage sur les plus belles rivières' },

  { slug: 'peche-de-la-truite-en-reservoir',
    eyebrow: 'Stage · Guidage · Réservoir',
    titre:   'Pêche de la truite en réservoir' },

  { slug: 'peche-du-brochet-a-la-mouche',
    eyebrow: 'Guidage brochet · Bretagne-Sud',
    titre:   'Un prédateur hors du commun' },

  { slug: 'stage-spey-cast-et-cours-de-lancer',
    eyebrow: 'Spey Cast · Lancer à la mouche',
    titre:   'L\'art du lancer sans dégagement' },

  { slug: 'master-class-peche-en-reservoir',
    eyebrow: 'Masterclass · Pêche en réservoir',
    titre:   'Techniques de pêche en réservoir avec Grégoire Juglaret' },

  { slug: 'master-class-nymphe-au-fil',
    eyebrow: 'Masterclass · Nymphe au fil',
    titre:   'Maîtrisez la nymphe au fil avec Jean-Baptiste Vidal' },

  { slug: 'peche-du-bar-a-la-mouche',
    eyebrow: 'Bar à la mouche · Bretagne-Sud',
    titre:   'La pêche du bar à la mouche en Bretagne' },
]

async function main() {
  console.log('📝 Patch eyebrow + titre sur les sectionIntro...\n')
  let ok = 0, skip = 0, err = 0

  for (const { slug, eyebrow, titre } of DATA) {
    try {
      // Récupérer le document et la clé de sa sectionIntro
      const doc = await client.fetch(
        `*[_type == "prestation" && slug.current == $slug][0]{
          _id,
          "introKey": pagebuilder[_type == "sectionIntro"][0]._key
        }`,
        { slug }
      )

      if (!doc?._id) {
        console.log(`  ⚠  ${slug} — document introuvable`)
        skip++; continue
      }

      if (!doc.introKey) {
        console.log(`  ⚠  ${slug} — pas de sectionIntro`)
        skip++; continue
      }

      await client.patch(doc._id)
        .set({
          [`pagebuilder[_key=="${doc.introKey}"].eyebrow`]: eyebrow,
          [`pagebuilder[_key=="${doc.introKey}"].titre`]:   titre,
        })
        .commit()

      console.log(`  ✅ ${slug}`)
      console.log(`     eyebrow : ${eyebrow}`)
      console.log(`     titre   : ${titre}\n`)
      ok++

    } catch (e) {
      console.error(`  ❌ ${slug} — ${e.message}`)
      err++
    }
  }

  console.log(`\n✨ Terminé : ${ok} mis à jour, ${skip} ignorés, ${err} erreurs`)
}

main()

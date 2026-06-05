/**
 * migrate-accueil.mjs
 * Migre le document "accueil" de la structure plate (heroBadge, heroTitre…)
 * vers la structure imbriquée (hero.badge, hero.titre…).
 *
 * Usage :
 *   node migrate-accueil.mjs
 * (Le fichier .env doit être dans le répertoire parent ou la variable
 *  SANITY_TOKEN doit être définie dans l'environnement.)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Charger le .env manuellement (pas de dotenv pour rester léger)
const __dir = dirname(fileURLToPath(import.meta.url))
try {
  const envPath = resolve(__dir, '.env')
  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }
} catch { /* .env optionnel */ }

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID ?? 'uievv97s',
  dataset:   process.env.SANITY_DATASET    ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
})

// ── Mapping label → slug (pour les cartes sans categorie)
const catToSlug = {
  'Eau douce':          'eau-douce',
  'Pêche du bar':       'bar',
  'Masterclass':        'masterclass',
  'Spey Cast & Lancer': 'spey-cast',
  'Bon cadeau':         'bon-cadeau',
}

async function migrate() {
  console.log('📥 Lecture du document accueil…')
  const doc = await client.fetch(`*[_id == "accueil"][0]`)

  if (!doc) {
    console.error('❌ Document "accueil" introuvable dans Sanity.')
    process.exit(1)
  }

  console.log('📋 Champs existants :', Object.keys(doc).filter(k => !k.startsWith('_')).join(', '))

  // ── Construction de la nouvelle structure imbriquée
  const patch = {

    hero: {
      badge:        doc.heroBadge        ?? '21 ans de guidage',
      eyebrow:      doc.heroEyebrow      ?? "Moniteur-Guide diplômé d'État · Bretagne-Sud",
      titre:        doc.heroTitre        ?? 'Pêche à la mouche',
      titreItalic:  doc.heroTitreItalic  ?? 'en Bretagne sauvage',
      texte:        doc.heroTexte        ?? "La pêche est possible toute l'année en eau douce ou en mer du fait de la complémentarité des milieux. Lacs, réservoirs, rivières, estuaires et côte — une multitude de possibilités en Bretagne-Sud.",
      ...(doc.heroImage ? { image: doc.heroImage } : {}),
      bouton1Texte: doc.heroBouton1Texte ?? 'Pêche du bar',
      bouton1Lien:  doc.heroBouton1Lien  ?? '/peche-du-bar-a-la-mouche',
      bouton2Texte: doc.heroBouton2Texte ?? 'Réserver une sortie',
      bouton2Lien:  doc.heroBouton2Lien  ?? '/contact',
    },

    guide: {
      ...(doc.guidePhoto ? { photo: doc.guidePhoto } : {}),
      accroche: doc.guideAccroche ?? "33 ans de pêche à la mouche et d'expérience à votre service, dont 21 années de guidage en France et à l'étranger.",
      bio:      doc.guideBio      ?? "Après des études dans l'environnement et 5 ans à la Fédération de Pêche du Finistère, Jean-Baptiste a guidé 6 saisons sur le Rio Grande (Argentine) pour Nervous Waters, puis en Irlande, Russie et Bolivie. Depuis 2014, il propose ses services de Moniteur-Guide en Bretagne-Sud, tout au long de l'année.",
      stats:    doc.guideStats ?? [
        { _type: 'stat', _key: 'stat1', nombre: '33 ans',    label: 'de pêche à la mouche' },
        { _type: 'stat', _key: 'stat2', nombre: '21 ans',    label: 'de guidage' },
        { _type: 'stat', _key: 'stat3', nombre: '6 saisons', label: 'sur le Rio Grande' },
        { _type: 'stat', _key: 'stat4', nombre: '1 bateau',  label: 'Carolina Skiff' },
      ],
    },

    prestations: {
      eyebrow: doc.prestationsEyebrow ?? 'Ce que je propose',
      titre:   doc.prestationsTitre   ?? 'Stages & guidages',
      cards: (doc.prestationsCards ?? [
        { _type: 'card', _key: 'c1', label: 'Eau douce',          sub: 'Truite · Alose · Brochet',         href: '/peche-a-la-mouche-en-bretagne',      categorie: 'eau-douce'   },
        { _type: 'card', _key: 'c2', label: 'Pêche du bar',       sub: 'Pêche à vue · Bateau',             href: '/peche-du-bar-a-la-mouche',           categorie: 'bar'         },
        { _type: 'card', _key: 'c3', label: 'Masterclass',        sub: 'Réservoir · Nymphe au fil',        href: '/masterclass',                        categorie: 'masterclass'  },
        { _type: 'card', _key: 'c4', label: 'Spey Cast & Lancer', sub: 'Canne une main · Switch · Spey',   href: '/stage-spey-cast-et-cours-de-lancer', categorie: 'spey-cast'   },
        { _type: 'card', _key: 'c5', label: 'Bon cadeau',         sub: 'Offrir une sortie',                href: '/bon-cadeau-peche-mouche',            categorie: 'bon-cadeau'  },
      ]).map(card => ({
        ...card,
        // Ajouter le champ categorie si absent (résout aussi le bug des stega chars)
        categorie: card.categorie ?? catToSlug[card.label] ?? '',
      })),
    },

    bar: {
      titre:       doc.barTitre       ?? 'Pêche du bar à la mouche',
      texte:       doc.barTexte       ?? 'Bar à vue dans les estuaires bretons ou streamer en bateau sur le Carolina Skiff. Poissons trophées de 2 à 5 kg+ dans des cadres sauvages et préservés.',
      boutonTexte: doc.barBoutonTexte ?? 'Découvrir les formules',
      boutonLien:  doc.barBoutonLien  ?? '/peche-du-bar-a-la-mouche',
    },

    materiel: {
      eyebrow:         doc.materielEyebrow         ?? 'Équipement · Ressources',
      titre:           doc.materielTitre           ?? 'Matériel & univers',
      featuredEyebrow: doc.materielFeaturedEyebrow ?? 'Cannes · Soies · Moulinets · Accessoires',
      featuredTitre:   doc.materielFeaturedTitre   ?? 'Mon matériel',
    },

    temo: {
      eyebrow: doc.temoEyebrow ?? "Ce qu'ils disent",
      score:   doc.temoScore   ?? '5.0',
      nombre:  doc.temoNombre  ?? '26 témoignages',
      pitch:   doc.temoPitch   ?? 'Des pêcheurs de toute la France font confiance à Jean-Baptiste depuis 2004.',
    },

    cta: {
      titre:     doc.ctaTitre     ?? 'Prêt pour votre première sortie ?',
      texte:     doc.ctaTexte     ?? 'Contactez Jean-Baptiste pour construire votre programme selon votre niveau, vos espèces cibles et vos disponibilités.',
      telephone: doc.ctaTelephone ?? '06 87 30 34 56',
      email:     doc.ctaEmail     ?? 'enjoy.fishing@hotmail.fr',
    },
  }

  console.log('🔄 Application du patch (structure imbriquée)…')
  await client.patch('accueil').set(patch).commit()

  console.log('✅ Migration terminée ! Le document "accueil" a maintenant une structure par section.')
  console.log('   hero.badge :', patch.hero.badge)
  console.log('   prestations.cards[0].categorie :', patch.prestations.cards[0]?.categorie)
}

migrate().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})

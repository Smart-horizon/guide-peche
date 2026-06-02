/**
 * migrate-accueil.mjs (v2 — migration complète)
 * Usage : npx sanity exec migrate-accueil.mjs --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function migrate() {
  console.log('📥 Lecture du document accueil…')
  const doc = await client.fetch(`*[_id == "accueil"][0]`)

  if (!doc) {
    console.error('❌ Document "accueil" introuvable.')
    process.exit(1)
  }

  // Raccourci pour accéder aux sections existantes
  const h = doc.hero        ?? {}
  const g = doc.guide       ?? {}
  const p = doc.prestations ?? {}
  const b = doc.bar         ?? {}
  const m = doc.materiel    ?? {}
  const t = doc.temo        ?? {}
  const c = doc.cta         ?? {}

  const patch = {

    hero: {
      badge:        h.badge        ?? '21 ans de guidage',
      eyebrow:      h.eyebrow      ?? "Moniteur-Guide diplômé d'État · Bretagne-Sud",
      titre:        h.titre        ?? 'Pêche à la mouche',
      titreItalic:  h.titreItalic  ?? 'en Bretagne sauvage',
      texte:        h.texte        ?? "La pêche est possible toute l'année en eau douce ou en mer du fait de la complémentarité des milieux.",
      ...(h.image ? { image: h.image } : {}),
      bouton1Texte: h.bouton1Texte ?? 'Pêche du bar',
      bouton1Lien:  h.bouton1Lien  ?? '/peche-du-bar-a-la-mouche',
      bouton2Texte: h.bouton2Texte ?? 'Réserver une sortie',
      bouton2Lien:  h.bouton2Lien  ?? '/contact',
    },

    guide: {
      ...(g.photo ? { photo: g.photo } : {}),
      eyebrow:     g.eyebrow     ?? 'Votre guide',
      nom:         g.nom         ?? 'Jean-Baptiste Vidal',
      accroche:    g.accroche    ?? "33 ans de pêche à la mouche et d'expérience à votre service, dont 21 années de guidage en France et à l'étranger.",
      bio:         g.bio         ?? "Après des études dans l'environnement et 5 ans à la Fédération de Pêche du Finistère, Jean-Baptiste a guidé 6 saisons sur le Rio Grande (Argentine) pour Nervous Waters, puis en Irlande, Russie et Bolivie. Depuis 2014, il propose ses services de Moniteur-Guide en Bretagne-Sud, tout au long de l'année.",
      stats:       g.stats       ?? [
        { _type: 'stat', _key: 'stat1', nombre: '33 ans',    label: 'de pêche à la mouche' },
        { _type: 'stat', _key: 'stat2', nombre: '21 ans',    label: 'de guidage' },
        { _type: 'stat', _key: 'stat3', nombre: '6 saisons', label: 'sur le Rio Grande' },
        { _type: 'stat', _key: 'stat4', nombre: '1 bateau',  label: 'Carolina Skiff' },
      ],
      boutonTexte: g.boutonTexte ?? 'Votre guide',
      boutonLien:  g.boutonLien  ?? '/jean-baptiste-vidal-moniteur-guide-de-peche',
      visible:     g.visible     !== false ? true : false,
      position:    g.position    ?? 2,
    },

    prestations: {
      eyebrow: p.eyebrow ?? 'Ce que je propose',
      titre:   p.titre   ?? 'Stages & guidages',
      cards:   p.cards   ?? [
        { _type: 'card', _key: 'c1', label: 'Eau douce',          sub: 'Truite · Alose · Brochet',         href: '/peche-a-la-mouche-en-bretagne',      categorie: 'eau-douce'  },
        { _type: 'card', _key: 'c2', label: 'Pêche du bar',       sub: 'Pêche à vue · Bateau',             href: '/peche-du-bar-a-la-mouche',           categorie: 'bar'        },
        { _type: 'card', _key: 'c3', label: 'Masterclass',        sub: 'Réservoir · Nymphe au fil',        href: '/masterclass',                        categorie: 'masterclass' },
        { _type: 'card', _key: 'c4', label: 'Spey Cast & Lancer', sub: 'Canne une main · Switch · Spey',   href: '/stage-spey-cast-et-cours-de-lancer', categorie: 'spey-cast'  },
        { _type: 'card', _key: 'c5', label: 'Bon cadeau',         sub: 'Offrir une sortie',                href: '/bon-cadeau-peche-mouche',            categorie: 'bon-cadeau' },
      ],
      visible:  p.visible  !== false ? true : false,
      position: p.position ?? 1,
    },

    bar: {
      eyebrow:     b.eyebrow     ?? 'Page star du site',
      titre:       b.titre       ?? 'Pêche du bar à la mouche',
      texte:       b.texte       ?? 'Bar à vue dans les estuaires bretons ou streamer en bateau sur le Carolina Skiff. Poissons trophées de 2 à 5 kg+ dans des cadres sauvages et préservés.',
      ...(b.image ? { image: b.image } : {}),
      boutonTexte: b.boutonTexte ?? 'Découvrir les formules',
      boutonLien:  b.boutonLien  ?? '/peche-du-bar-a-la-mouche',
      visible:     b.visible     !== false ? true : false,
      position:    b.position    ?? 3,
    },

    materiel: {
      eyebrow:         m.eyebrow         ?? 'Équipement · Ressources',
      titre:           m.titre           ?? 'Matériel & univers',
      ...(m.featuredImage ? { featuredImage: m.featuredImage } : {}),
      featuredEyebrow: m.featuredEyebrow ?? 'Cannes · Soies · Moulinets · Accessoires',
      featuredTitre:   m.featuredTitre   ?? 'Mon matériel',
      featuredLien:    m.featuredLien    ?? '/materiel-jeanbaptistevidal',
      sousLiens: m.sousLiens ?? [
        { _type: 'sousLien', _key: 'sl1', label: 'Matériel migrateurs', href: '/materiel-mouche-migrateur' },
        { _type: 'sousLien', _key: 'sl2', label: 'Matériel truite',     href: '/materiel-mouche-truite' },
        { _type: 'sousLien', _key: 'sl3', label: 'Matériel bar',        href: '/materiel-mouche-bar' },
        { _type: 'sousLien', _key: 'sl4', label: 'Matériel réservoir',  href: '/materiel-mouche-reservoir' },
        { _type: 'sousLien', _key: 'sl5', label: 'Matériel brochet',    href: '/materiel-mouche-brochet' },
        { _type: 'sousLien', _key: 'sl6', label: 'Matériel exotique',   href: '/materiel-mouche-peche-exotique' },
      ],
      cardsSecondaires: m.cardsSecondaires ?? [
        { _type: 'cardMat', _key: 'cm1', eyebrow: 'Streamers · Nymphes · Sèches', titre: 'Mes mouches', lien: '/mouches-de-peche-jeanbaptiste-vidal' },
        { _type: 'cardMat', _key: 'cm2', eyebrow: 'Carolina Skiff · Fond plat',   titre: 'Le bateau',   lien: '/bateau-bar-a-la-mouche' },
      ],
      visible:  m.visible  !== false ? true : false,
      position: m.position ?? 5,
    },

    temo: {
      eyebrow:  t.eyebrow  ?? "Ce qu'ils disent",
      score:    t.score    ?? '5.0',
      nombre:   t.nombre   ?? '26 témoignages',
      pitch:    t.pitch    ?? 'Des pêcheurs de toute la France font confiance à Jean-Baptiste depuis 2004.',
      ctaTexte: t.ctaTexte ?? 'Lire tous les témoignages',
      ctaLien:  t.ctaLien  ?? '/temoignages',
      visible:  t.visible  !== false ? true : false,
      position: t.position ?? 6,
    },

    cta: {
      titre:     c.titre     ?? 'Prêt pour votre première sortie ?',
      texte:     c.texte     ?? 'Contactez Jean-Baptiste pour construire votre programme selon votre niveau, vos espèces cibles et vos disponibilités.',
      telephone: c.telephone ?? '06 87 30 34 56',
      email:     c.email     ?? 'enjoy.fishing@hotmail.fr',
      btn1Texte: c.btn1Texte ?? 'Me contacter',
      btn1Lien:  c.btn1Lien  ?? '/contact',
      btn2Texte: c.btn2Texte ?? 'Voir les disponibilités 2026',
      btn2Lien:  c.btn2Lien  ?? '/disponibilites-guidages',
    },
  }

  console.log('🔄 Patch en cours…')
  await client.patch('accueil').set(patch).commit()

  console.log('✅ Migration terminée !')
  console.log('   guide.eyebrow         :', patch.guide.eyebrow)
  console.log('   bar.eyebrow           :', patch.bar.eyebrow)
  console.log('   materiel.sousLiens    :', patch.materiel.sousLiens.map(l => l.label).join(', '))
  console.log('   materiel.cardsSecondaires :', patch.materiel.cardsSecondaires.map(c => c.titre).join(', '))
  console.log('   temo.ctaTexte         :', patch.temo.ctaTexte)
  console.log('   prestations.position  :', patch.prestations.position, '/ visible:', patch.prestations.visible)
  console.log('   guide.position        :', patch.guide.position,       '/ visible:', patch.guide.visible)
  console.log('   bar.position          :', patch.bar.position,         '/ visible:', patch.bar.visible)
  console.log('   materiel.position     :', patch.materiel.position,    '/ visible:', patch.materiel.visible)
  console.log('   temo.position         :', patch.temo.position,        '/ visible:', patch.temo.visible)
  console.log('   cta.btn1Texte         :', patch.cta.btn1Texte)
  console.log('   cta.btn2Texte         :', patch.cta.btn2Texte)
}

migrate().catch(err => {
  console.error('❌ Erreur :', err.message)
  process.exit(1)
})

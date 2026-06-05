/**
 * pageTemoignages.js
 * Singleton — textes éditables de la page /temoignages
 * Un seul document de ce type (documentId: 'pageTemoignages')
 */

export default {
  name: 'pageTemoignages',
  title: 'Page Témoignages',
  type: 'document',
  // Singleton — interdire création et suppression
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero',    title: '🎯 Hero' },
    { name: 'bar',     title: '🌊 Section Bar' },
    { name: 'saumon',  title: '🐟 Section Saumon & Spey' },
    { name: 'truite',  title: '🏞️ Section Truite & Initiation' },
    { name: 'voyages', title: '✈️ Section Voyages' },
    { name: 'cta',     title: '📣 CTA final' },
  ],

  fields: [

    // ── HERO ─────────────────────────────────────────────────────────────────

    {
      name: 'heroEyebrow',
      title: 'Texte au-dessus du titre (eyebrow)',
      type: 'string',
      group: 'hero',
      initialValue: '21 ans de guidage',
      description: 'Petit texte affiché en majuscules au-dessus du H1 (ex : "21 ans de guidage")',
    },
    {
      name: 'heroTitre',
      title: 'Titre principal (H1)',
      type: 'string',
      group: 'hero',
      initialValue: 'Témoignages & Avis',
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroIntro',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue: 'Sur cette page vous pourrez trouver certains témoignages de personnes qui m\'ont fait confiance et qui ont participé à une journée de pêche en France ou été guidé par mes soins lors d\'un voyage à l\'étranger :',
    },

    // ── SECTION BAR ──────────────────────────────────────────────────────────

    {
      name: 'barOnglet',
      title: 'Libellé de l\'onglet de navigation',
      type: 'string',
      group: 'bar',
      initialValue: 'Bar à la mouche',
      description: 'Texte court affiché dans la barre de navigation des sections (max ~18 car.)',
    },
    {
      name: 'barTitre',
      title: 'Titre de la section (H2)',
      type: 'string',
      group: 'bar',
      initialValue: 'Bar à la mouche',
    },
    {
      name: 'barSousTitre',
      title: 'Sous-titre de la section',
      type: 'string',
      group: 'bar',
      initialValue: 'Pêche du bar en Bretagne-Sud, bar à vue, en bateau, en estuaire',
    },
    {
      name: 'barCtaTexte',
      title: 'Texte du lien CTA',
      type: 'string',
      group: 'bar',
      initialValue: 'Découvrir la pêche du bar à la mouche →',
    },
    {
      name: 'barCtaUrl',
      title: 'URL du lien CTA',
      type: 'string',
      group: 'bar',
      initialValue: '/peche-du-bar-a-la-mouche',
      description: 'Lien de destination du bouton (ex : /peche-du-bar-a-la-mouche)',
    },

    // ── SECTION SAUMON ───────────────────────────────────────────────────────

    {
      name: 'saumonOnglet',
      title: 'Libellé de l\'onglet de navigation',
      type: 'string',
      group: 'saumon',
      initialValue: 'Saumon & Spey Cast',
    },
    {
      name: 'saumonTitre',
      title: 'Titre de la section (H2)',
      type: 'string',
      group: 'saumon',
      initialValue: 'Saumon, Alose & Spey Cast',
    },
    {
      name: 'saumonSousTitre',
      title: 'Sous-titre de la section',
      type: 'string',
      group: 'saumon',
      initialValue: 'Guidage migrateurs sur les rivières bretonnes : Ellé, Scorff, Aulne, Aven, Elorn',
    },
    {
      name: 'saumonCtaTexte',
      title: 'Texte du lien CTA',
      type: 'string',
      group: 'saumon',
      initialValue: 'Découvrir le Spey Cast →',
    },
    {
      name: 'saumonCtaUrl',
      title: 'URL du lien CTA',
      type: 'string',
      group: 'saumon',
      initialValue: '/stage-spey-cast-et-cours-de-lancer',
    },

    // ── SECTION TRUITE ───────────────────────────────────────────────────────

    {
      name: 'truiteOnglet',
      title: 'Libellé de l\'onglet de navigation',
      type: 'string',
      group: 'truite',
      initialValue: 'Truite & Initiation',
    },
    {
      name: 'truiteTitre',
      title: 'Titre de la section (H2)',
      type: 'string',
      group: 'truite',
      initialValue: 'Truite & Initiation',
    },
    {
      name: 'truiteSousTitre',
      title: 'Sous-titre de la section',
      type: 'string',
      group: 'truite',
      initialValue: 'Initiation, perfectionnement truite en rivière : Scorff, Ellé, Isole',
    },
    {
      name: 'truiteCtaTexte',
      title: 'Texte du lien CTA',
      type: 'string',
      group: 'truite',
      initialValue: 'Découvrir la pêche en eau douce →',
    },
    {
      name: 'truiteCtaUrl',
      title: 'URL du lien CTA',
      type: 'string',
      group: 'truite',
      initialValue: '/peche-a-la-mouche-en-bretagne',
    },

    // ── SECTION VOYAGES ──────────────────────────────────────────────────────

    {
      name: 'voyagesOnglet',
      title: 'Libellé de l\'onglet de navigation',
      type: 'string',
      group: 'voyages',
      initialValue: 'Voyages',
    },
    {
      name: 'voyagesTitre',
      title: 'Titre de la section (H2)',
      type: 'string',
      group: 'voyages',
      initialValue: 'Voyages internationaux',
    },
    {
      name: 'voyagesSousTitre',
      title: 'Sous-titre de la section',
      type: 'string',
      group: 'voyages',
      initialValue: 'Argentine · Bolivie · Cuba · Venezuela · Mexique',
    },
    {
      name: 'voyagesCtaTexte',
      title: 'Texte du lien CTA',
      type: 'string',
      group: 'voyages',
      initialValue: 'Découvrir les voyages →',
    },
    {
      name: 'voyagesCtaUrl',
      title: 'URL du lien CTA',
      type: 'string',
      group: 'voyages',
      initialValue: '/voyages-peche-mouche',
    },

    // ── CTA FINAL ────────────────────────────────────────────────────────────

    {
      name: 'ctaTitre',
      title: 'Titre du bloc CTA (H2)',
      type: 'string',
      group: 'cta',
      initialValue: 'Prêt à vivre votre expérience ?',
    },
    {
      name: 'ctaTexte',
      title: 'Texte sous le titre',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'Rejoignez les centaines de pêcheurs qui ont fait confiance à Jean-Baptiste depuis 2004.',
    },
    {
      name: 'ctaBtn1Texte',
      title: 'Bouton principal — texte',
      type: 'string',
      group: 'cta',
      initialValue: 'Réserver une sortie',
    },
    {
      name: 'ctaBtn1Url',
      title: 'Bouton principal — URL',
      type: 'string',
      group: 'cta',
      initialValue: '/contact',
    },
    {
      name: 'ctaBtn2Texte',
      title: 'Bouton secondaire — texte',
      type: 'string',
      group: 'cta',
      initialValue: 'Voir les prestations',
    },
    {
      name: 'ctaBtn2Url',
      title: 'Bouton secondaire — URL',
      type: 'string',
      group: 'cta',
      initialValue: '/stage-peche-mouche',
    },

  ],
}

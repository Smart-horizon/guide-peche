export default {
  name: 'prestation',
  title: 'Prestations',
  type: 'document',
  icon: () => '🎣',
  groups: [
    { name: 'hero',    title: '🖼️ Hero' },
    { name: 'contenu', title: '📝 Contenu' },
    { name: 'infos',   title: '💶 Infos pratiques' },
    { name: 'media',   title: '📸 Galerie & Vidéo' },
    { name: 'seo',     title: '🔍 SEO' },
  ],
  fields: [

    // ── IDENTITÉ ──────────────────────────────────────────────────────────────

    {
      name: 'title',
      title: 'Titre de la page (H1)',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required().error('Le titre est obligatoire'),
    },
    {
      name: 'slug',
      title: 'URL de la page',
      type: 'slug',
      group: 'hero',
      options: { source: 'title' },
      description: '⚠️ Ne pas modifier après publication — risque SEO',
      validation: Rule => Rule.required(),
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      group: 'hero',
      options: {
        list: [
          { title: '🏞️ Guidage eau douce', value: 'eau-douce' },
          { title: '🌊 Pêche du bar',      value: 'bar' },
          { title: '🏆 Masterclass',       value: 'masterclass' },
          { title: '🎿 Spey Cast & Lancer', value: 'spey-cast' },
          { title: '🎁 Bon cadeau',        value: 'bon-cadeau' },
        ],
        layout: 'radio',
      },
    },

    // ── HERO ──────────────────────────────────────────────────────────────────

    {
      name: 'image',
      title: 'Photo du hero (fond)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Grande photo affichée en fond de la bannière principale',
    },
    {
      name: 'heroEyebrow',
      title: 'Texte au-dessus du titre (eyebrow)',
      type: 'string',
      group: 'hero',
      description: 'Ex : "Bar à la mouche · Bretagne-Sud"',
    },
    {
      name: 'heroSubtitle',
      title: 'Phrase d\'accroche sous le titre',
      type: 'string',
      group: 'hero',
      description: 'Ex : "Depuis 2000 en Bretagne-Sud : bar à vue, en bateau, en estuaire"',
    },
    {
      name: 'heroMaterielLien',
      title: 'Lien vers la page Matériel (optionnel)',
      type: 'string',
      group: 'hero',
      description: 'Ex : /materiel-mouche-bar — laissez vide si aucun',
    },

    // ── CONTENU ────────────────────────────────────────────────────────────────

    {
      name: 'description',
      title: 'Texte principal',
      type: 'array',
      group: 'contenu',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Description de l\'image' }],
        },
      ],
    },

    // ── SOUS-PRESTATIONS (pour les pages "overview" : Bar, Eau douce…) ────────

    {
      name: 'sousPrestations',
      title: 'Sous-prestations (grille de cards)',
      type: 'array',
      group: 'contenu',
      description: 'Utilisez ce bloc pour les pages "overview" qui listent plusieurs offres (ex : page Bar → Initiation, Perfectionnement, Bar à vue…)',
      of: [
        {
          type: 'object',
          title: 'Carte de prestation',
          fields: [
            { name: 'titre',     type: 'string', title: 'Titre de la carte' },
            { name: 'sousTitre', type: 'string', title: 'Sous-titre / description courte' },
            { name: 'lien',      type: 'string', title: 'URL cible (ex : /initiation-peche-du-bar-a-la-mouche)' },
            { name: 'image',     type: 'image',  title: 'Photo de fond', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'titre', subtitle: 'lien', media: 'image' },
          },
        },
      ],
    },

    // ── INFOS PRATIQUES ───────────────────────────────────────────────────────

    {
      name: 'niveau',
      title: 'Niveau requis',
      type: 'string',
      group: 'infos',
      description: 'Ex : Tous niveaux — Débutant à expert',
      initialValue: 'Tous niveaux',
    },
    {
      name: 'format',
      title: 'Format(s) proposé(s)',
      type: 'text',
      rows: 2,
      group: 'infos',
      description: 'Ex : Initiation · Perfectionnement · Bar à vue · Coaching · Bateau',
    },
    {
      name: 'saison',
      title: 'Saison / période',
      type: 'string',
      group: 'infos',
      description: 'Ex : Toute l\'année — Avril à octobre',
    },
    {
      name: 'tarif',
      title: 'Tarif',
      type: 'string',
      group: 'infos',
      description: 'Ex : 300 € / journée · 180 € / demi-journée',
    },
    {
      name: 'duree',
      title: 'Durée',
      type: 'string',
      group: 'infos',
      description: 'Ex : Journée complète (8h) · Demi-journée (4h)',
    },

    // ── GALERIE & VIDÉO ────────────────────────────────────────────────────────

    {
      name: 'gallery',
      title: 'Galerie photos',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Description (SEO)' }],
        },
      ],
    },
    {
      name: 'videoUrl',
      title: 'Vidéo YouTube ou Vimeo',
      type: 'url',
      group: 'media',
      description: 'Ex : https://www.youtube.com/watch?v=xxxxx',
    },

    // ── SEO ───────────────────────────────────────────────────────────────────

    {
      name: 'seoTitle',
      title: 'Titre SEO (balise <title>)',
      type: 'string',
      group: 'seo',
      description: 'Laissez vide pour utiliser le titre de la page',
      validation: Rule => Rule.max(65).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescription',
      title: 'Description SEO (meta description)',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
  ],

  preview: {
    select: { title: 'title', subtitle: 'categorie', media: 'image' },
    prepare({ title, subtitle, media }) {
      const cats = {
        'eau-douce':  '🏞️',
        'bar':        '🌊',
        'masterclass':'🏆',
        'spey-cast':  '🎿',
        'bon-cadeau': '🎁',
      }
      return {
        title,
        subtitle: cats[subtitle] ? `${cats[subtitle]} ${subtitle}` : subtitle,
        media,
      }
    },
  },
}

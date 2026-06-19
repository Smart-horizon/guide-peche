export default {
  name: 'article',
  title: 'Articles du blog',
  type: 'document',
  icon: () => '✍️',
  groups: [
    { name: 'contenu',     title: '📝 Contenu' },
    { name: 'traductions', title: '🇬🇧 Version anglaise' },
    { name: 'classement',  title: '🏷️ Classement' },
    { name: 'seo',         title: '🔍 SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: "Titre de l'article",
      type: 'string',
      group: 'contenu',
      validation: Rule => Rule.required().error('Le titre est obligatoire'),
    },
    {
      name: 'slug',
      title: "URL de l'article",
      type: 'slug',
      group: 'contenu',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date de publication',
      type: 'datetime',
      group: 'contenu',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'image',
      title: 'Photo principale',
      type: 'image',
      group: 'contenu',
      options: { hotspot: true },
    },
    {
      name: 'galerie',
      title: 'Galerie photos (optionnel)',
      type: 'array',
      group: 'contenu',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt',     type: 'string', title: 'Description (texte alternatif)' },
          { name: 'caption', type: 'string', title: 'Légende (affichée sous la photo)' },
        ],
      }],
      description: '📸 Glissez-déposez plusieurs photos — elles s\'afficheront en galerie sous l\'article',
      options: { layout: 'grid' },
    },
    {
      name: 'extrait',
      title: 'Extrait / Chapô',
      type: 'text',
      rows: 3,
      group: 'contenu',
      description: 'Court résumé affiché dans la liste des articles',
      validation: Rule => Rule.max(300).warning('Moins de 300 caractères recommandé'),
    },
    {
      name: 'contenu',
      title: "Contenu de l'article",
      type: 'array',
      group: 'contenu',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: "Description de l'image (SEO)", type: 'string' }],
        },
      ],
    },
    // ── Traductions EN ──────────────────────────────────────────────────────
    {
      name: 'titleEn',
      title: 'Titre — English',
      type: 'string',
      group: 'traductions',
    },
    {
      name: 'extraitEn',
      title: 'Extrait — English',
      type: 'text',
      rows: 3,
      group: 'traductions',
    },
    {
      name: 'contenuEn',
      title: '🇬🇧 Contenu de l\'article — English',
      type: 'array',
      group: 'traductions',
      description: 'English version of the article body. Leave empty to fall back to French.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Image description (SEO)', type: 'string' }],
        },
      ],
    },
    {
      name: 'seoTitleEn',
      title: 'Titre SEO — English',
      type: 'string',
      group: 'traductions',
      validation: Rule => Rule.max(65).warning('Ideally under 65 characters'),
    },
    {
      name: 'seoDescriptionEn',
      title: 'Description SEO — English',
      type: 'text',
      rows: 3,
      group: 'traductions',
      validation: Rule => Rule.max(160).warning('Ideally under 160 characters'),
    },

    {
      name: 'espece',
      title: 'Espèce',
      type: 'string',
      group: 'classement',
      options: {
        list: [
          { title: '🌊 Bar', value: 'bar' },
          { title: '🏞️ Truite', value: 'truite' },
          { title: '🐟 Saumon', value: 'saumon' },
          { title: '🐟 Alose', value: 'alose' },
          { title: '🎣 Brochet', value: 'brochet' },
          { title: '✈️ Exotique', value: 'exotique' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'classement',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      group: 'seo',
      validation: Rule => Rule.max(65).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image', espece: 'espece' },
    prepare({ title, subtitle, media, espece }) {
      const emojis = { bar: '🌊', truite: '🏞️', saumon: '🐟', alose: '🐟', brochet: '🎣', exotique: '✈️' }
      const date = subtitle ? new Date(subtitle).toLocaleDateString('fr-FR') : ''
      return {
        title: `${emojis[espece] || '✍️'} ${title}`,
        subtitle: date,
        media,
      }
    },
  },
}

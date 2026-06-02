export default {
  name: 'prestation',
  title: 'Prestations',
  type: 'document',
  icon: () => '🎣',
  groups: [
    { name: 'contenu', title: '📝 Contenu' },
    { name: 'tarifs', title: '💶 Tarifs & Infos pratiques' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Titre de la prestation',
      type: 'string',
      group: 'contenu',
      validation: Rule => Rule.required().error('Le titre est obligatoire'),
    },
    {
      name: 'slug',
      title: 'URL de la page',
      type: 'slug',
      group: 'contenu',
      options: { source: 'title' },
      description: 'Généré automatiquement depuis le titre — ne pas modifier sans prévenir Quentin',
      validation: Rule => Rule.required(),
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      group: 'contenu',
      options: {
        list: [
          { title: '🏞️ Guidage eau douce', value: 'eau-douce' },
          { title: '🌊 Pêche du bar', value: 'bar' },
          { title: '🏆 Masterclass', value: 'masterclass' },
          { title: '🎿 Spey Cast & Lancer', value: 'spey-cast' },
          { title: '🎁 Bon cadeau', value: 'bon-cadeau' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'image',
      title: 'Photo principale',
      type: 'image',
      group: 'contenu',
      options: { hotspot: true },
      description: 'Photo affichée en grand en haut de la page',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'contenu',
      of: [{ type: 'block' }],
    },
    {
      name: 'tarif',
      title: 'Tarif',
      type: 'string',
      group: 'tarifs',
      description: 'Ex: 300 € / journée · 180 € / demi-journée',
    },
    {
      name: 'duree',
      title: 'Durée',
      type: 'string',
      group: 'tarifs',
      description: 'Ex: Journée complète (8h) · Demi-journée (4h)',
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
    select: { title: 'title', subtitle: 'categorie', media: 'image' },
    prepare({ title, subtitle, media }) {
      const cats = {
        'eau-douce': '🏞️',
        'bar': '🌊',
        'masterclass': '🏆',
        'spey-cast': '🎿',
        'bon-cadeau': '🎁',
      }
      return { title, subtitle: cats[subtitle] ? `${cats[subtitle]} ${subtitle}` : subtitle, media }
    },
  },
}

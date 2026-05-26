export default {
  name: 'prestation',
  title: 'Prestations',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Guidage eau douce', value: 'eau-douce' },
          { title: 'Pêche du bar', value: 'bar' },
          { title: 'Masterclass', value: 'masterclass' },
          { title: 'Spey Cast & Lancer', value: 'spey-cast' },
          { title: 'Bon cadeau', value: 'bon-cadeau' },
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'tarif',
      title: 'Tarif',
      type: 'string'
    },
    {
      name: 'duree',
      title: 'Durée',
      type: 'string'
    },
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string'
    },
    {
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 3
    }
  ]
}
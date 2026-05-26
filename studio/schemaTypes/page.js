export default {
  name: 'page',
  title: 'Pages',
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
      name: 'contenu',
      title: 'Contenu',
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
export default {
  name: 'article',
  title: 'Articles Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'URL', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'date', title: 'Date de publication', type: 'date' },
    { name: 'image', title: 'Image principale', type: 'image', options: { hotspot: true } },
    { name: 'extrait', title: 'Extrait', type: 'text', rows: 3 },
    { name: 'contenu', title: 'Contenu', type: 'array', of: [{ type: 'block' }] },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'espece', title: 'Espèce', type: 'string',
      options: { list: [
        { title: 'Bar', value: 'bar' },
        { title: 'Truite', value: 'truite' },
        { title: 'Saumon', value: 'saumon' },
        { title: 'Alose', value: 'alose' },
        { title: 'Brochet', value: 'brochet' },
        { title: 'Exotique', value: 'exotique' },
      ]}
    },
    { name: 'seoTitle', title: 'Titre SEO', type: 'string' },
    { name: 'seoDescription', title: 'Description SEO', type: 'text', rows: 3 }
  ]
}
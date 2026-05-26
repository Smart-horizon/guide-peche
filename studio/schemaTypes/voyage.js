export default {
  name: 'voyage',
  title: 'Voyages',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titre', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'URL', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'pays', title: 'Pays / Destination', type: 'string' },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'image', title: 'Image principale', type: 'image', options: { hotspot: true } },
    { name: 'periode', title: 'Période', type: 'string' },
    { name: 'prix', title: 'Prix', type: 'string' },
    { name: 'especes', title: 'Espèces ciblées', type: 'string' },
    { name: 'seoTitle', title: 'Titre SEO', type: 'string' },
    { name: 'seoDescription', title: 'Description SEO', type: 'text', rows: 3 }
  ]
}
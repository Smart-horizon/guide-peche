export default {
  name: 'temoignage',
  title: 'Témoignages',
  type: 'document',
  fields: [
    { name: 'nom', title: 'Nom du client', type: 'string', validation: Rule => Rule.required() },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'note', title: 'Note /5', type: 'number', validation: Rule => Rule.min(1).max(5) },
    { name: 'prestation', title: 'Prestation concernée', type: 'string' },
    { name: 'texte', title: 'Témoignage', type: 'text', rows: 5, validation: Rule => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }
  ]
}
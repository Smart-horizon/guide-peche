import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'temoignage',
  title: 'Témoignages',
  type: 'document',
  icon: () => '⭐',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'temoignage' }),
    {
      name: 'afficherAccueil',
      title: "Afficher sur la page d'accueil",
      type: 'boolean',
      description: "Cocher pour inclure ce témoignage dans la section « Ce qu'ils disent » de la page d'accueil.",
      initialValue: false,
    },
    {
      name: 'nom',
      title: 'Nom du client',
      type: 'string',
      validation: Rule => Rule.required().error('Le nom du client est obligatoire'),
    },
    {
      name: 'date',
      title: 'Date de la sortie',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    },
    {
      name: 'note',
      title: 'Note',
      type: 'number',
      description: 'Note de 1 à 5 étoiles',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ — Excellent', value: 5 },
          { title: '⭐⭐⭐⭐ — Très bien', value: 4 },
          { title: '⭐⭐⭐ — Bien', value: 3 },
          { title: '⭐⭐ — Moyen', value: 2 },
          { title: '⭐ — Décevant', value: 1 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
    },
    {
      name: 'prestation',
      title: 'Prestation concernée',
      type: 'string',
      description: 'Ex: Pêche du bar à vue, Guidage saumon, Spey Cast...',
      options: {
        list: [
          { title: '🌊 Bar à la mouche', value: 'Bar à la mouche' },
          { title: '🐟 Saumon', value: 'Saumon' },
          { title: '🐟 Alose', value: 'Alose' },
          { title: '🏞️ Truite en rivière', value: 'Truite en rivière' },
          { title: '🎣 Brochet', value: 'Brochet' },
          { title: '🎓 Initiation pêche à la mouche', value: 'Initiation pêche à la mouche' },
          { title: '🏆 Masterclass', value: 'Masterclass' },
          { title: '🎿 Spey Cast', value: 'Spey Cast' },
          { title: '✈️ Voyage', value: 'Voyage' },
        ],
      },
    },
    {
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required().error('Le texte du témoignage est obligatoire'),
    },
    {
      name: 'photo',
      title: 'Photo du client (optionnelle)',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'prestation',
      note: 'note',
      afficherAccueil: 'afficherAccueil',
    },
    prepare({ title, subtitle, note, afficherAccueil }) {
      const stars = note ? '⭐'.repeat(note) : ''
      const badge = afficherAccueil ? '🏠 ' : ''
      return {
        title: badge + title,
        subtitle: `${subtitle || 'Prestation non précisée'} ${stars}`,
      }
    },
  },
}

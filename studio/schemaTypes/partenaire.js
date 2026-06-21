import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'partenaire',
  title: 'Partenaire',
  type: 'document',
  icon: () => '🤝',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'partenaire' }),
    {
      name: 'nom',
      title: 'Nom court',
      type: 'string',
      description: 'Ex: SAGE, SIMMS, FFMGP',
      validation: Rule => Rule.required(),
    },
    {
      name: 'nomComplet',
      title: 'Nom complet',
      type: 'string',
      description: 'Ex: Sage Fly Fishing',
    },
    {
      name: 'tag',
      title: 'Catégorie',
      type: 'string',
      description: 'Ex: Canne & moulinet, Vêtements de pêche, Organisme professionnel',
    },
    {
      name: 'tagEn',
      title: 'Catégorie (English)',
      type: 'string',
      description: 'Ex: Rod & reel, Fishing clothing, Professional body',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
      description: 'Version anglaise de la description — affichée sur /en/partenaires',
    },
    {
      name: 'url',
      title: 'URL du site',
      type: 'url',
      description: 'Ex: https://www.sageflyfish.com/',
    },
    {
      name: 'labelLien',
      title: 'Label du lien',
      type: 'string',
      description: 'Ex: sageflyfish.com',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
      description: 'Logo du partenaire (fond transparent de préférence)',
    },
  ],
  preview: {
    select: { title: 'nom', subtitle: 'tag', media: 'logo' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Sans nom',
      subtitle: subtitle || '',
      media,
    }),
  },
}

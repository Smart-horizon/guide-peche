import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'revuePresse',
  title: 'Revue de presse',
  type: 'document',
  icon: () => '📰',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'revuePresse' }),
    {
      name: 'magazine',
      title: 'Magazine / Support',
      type: 'string',
      description: 'Ex : Pêche Mouche, Voyages de Pêche, Field & Stream (USA)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'numero',
      title: 'Numéro',
      type: 'string',
      description: 'Ex : N° 153 (laisser vide si pas de numéro)',
    },
    {
      name: 'date',
      title: 'Date de parution',
      type: 'string',
      description: 'Ex : Novembre–Décembre 2022',
      validation: Rule => Rule.required(),
    },
    {
      name: 'annee',
      title: 'Année (pour tri)',
      type: 'number',
      description: 'Ex : 2022 — utilisé uniquement pour référence',
    },
    {
      name: 'titre',
      title: 'Titre de l\'article',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'type',
      title: 'Type de publication',
      type: 'string',
      description: 'Ex : Portrait, Article, Rubrique, Couverture, Article voyage…',
    },
    {
      name: 'cover',
      title: 'Image principale (couverture)',
      type: 'image',
      options: { hotspot: false },
      description: 'Couverture du magazine ou visuel principal de l\'article',
    },
    {
      name: 'photos',
      title: 'Photos du carrousel (optionnel)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: false },
        fields: [{ name: 'alt', type: 'string', title: 'Description (texte alternatif)' }],
      }],
      description: '📸 Ajoutez plusieurs photos pour le carrousel automatique (effet page de livre) — si vide, seule l\'image principale est affichée',
    },
    {
      name: 'fichierPdf',
      title: 'Fichier PDF à télécharger (optionnel)',
      type: 'file',
      options: { accept: '.pdf' },
      description: '⬆️ Glissez-déposez le PDF de l\'article ici — prioritaire sur le lien URL ci-dessous',
    },
    {
      name: 'lien',
      title: 'Lien externe (optionnel)',
      type: 'string',
      description: 'URL vers l\'article en ligne — utilisé uniquement si aucun PDF n\'est uploadé',
    },
    {
      name: 'labelLien',
      title: 'Label du bouton',
      type: 'string',
      description: 'Ex : Lire le magazine en ligne — laisser vide pour "Télécharger l\'article (PDF)" par défaut',
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'magazine', media: 'cover', numero: 'numero', date: 'date' },
    prepare: ({ title, subtitle, media, numero, date }) => ({
      title: title || 'Sans titre',
      subtitle: [subtitle, numero, date].filter(Boolean).join(' · '),
      media,
    }),
  },
}

/**
 * pageContact.js
 * Singleton — textes éditables de la page /contact
 * Un seul document de ce type (documentId: 'pageContact')
 * NB : téléphone, e-mail, adresse et certifications viennent de ⚙️ Paramètres.
 */

export default {
  name: 'pageContact',
  title: 'Page Contact',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero',       title: '🎯 Hero' },
    { name: 'formulaire', title: '📝 Formulaire' },
    { name: 'infos',      title: 'ℹ️ Encart infos' },
    { name: 'seo',        title: '🔍 SEO' },
  ],

  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────
    {
      name: 'heroEyebrow', title: 'Texte au-dessus du titre', type: 'string',
      group: 'hero', initialValue: 'Enjoy Fishing',
    },
    {
      name: 'heroTitre', title: 'Titre principal (H1)', type: 'string',
      group: 'hero', initialValue: 'Contact',
    },
    {
      name: 'heroSousTitre', title: 'Sous-titre', type: 'string',
      group: 'hero', initialValue: 'Moniteur - Guide de pêche à la mouche',
    },

    // ── FORMULAIRE ────────────────────────────────────────────────────────
    {
      name: 'formIntro', title: 'Texte d\'introduction du formulaire', type: 'text', rows: 3,
      group: 'formulaire',
      initialValue: 'Que ce soit pour une demande de renseignements ou bien pour réserver une prestation, formulez votre demande ici. Je vous répondrai dans les plus brefs délais.',
    },
    {
      name: 'sujets',
      title: 'Sujets proposés (menu déroulant « Sujet »)',
      type: 'array',
      group: 'formulaire',
      description: 'Groupes de prestations proposés dans le formulaire — à tenir à jour quand une prestation change',
      of: [{
        type: 'object',
        name: 'sujetGroupe',
        fields: [
          { name: 'groupe', title: 'Nom du groupe', type: 'string' },
          { name: 'options', title: 'Prestations du groupe', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: {
          select: { title: 'groupe', options: 'options' },
          prepare: ({ title, options }) => ({ title: title || '(groupe)', subtitle: `${options?.length || 0} option(s)` }),
        },
      }],
      initialValue: [
        { _key: 'g1', groupe: '— Eau douce', options: ["Stage d'initiation à la mouche", 'Pêche de la truite', 'Pêche du brochet', "Pêche de l'alose"] },
        { _key: 'g2', groupe: '— Bar (mer)', options: ['Initiation bar à la mouche', 'Perfectionnement bar', 'Bar à vue en estuaire', 'Bar en bateau', 'Coaching bar'] },
        { _key: 'g3', groupe: '— Voyages', options: ['Voyage Argentine — Rio Grande', 'Voyage Cuba — Cayo Cruz', 'Voyage Cuba — Santa Maria', 'Voyage Venezuela — Los Roques', 'Voyage Mexique'] },
        { _key: 'g4', groupe: '— Autres', options: ['Bon cadeau', 'Renseignements généraux'] },
      ],
    },
    {
      name: 'boutonEnvoyer', title: 'Texte du bouton d\'envoi', type: 'string',
      group: 'formulaire', initialValue: 'Envoyer ma demande',
    },
    {
      name: 'succesMsg', title: 'Message de succès', type: 'string',
      group: 'formulaire', initialValue: 'Vos informations ont bien été envoyées !',
    },
    {
      name: 'erreurMsg', title: 'Message d\'erreur', type: 'string',
      group: 'formulaire', initialValue: 'Une erreur est survenue. Merci de réessayer ou de nous contacter par téléphone.',
    },

    // ── ENCART INFOS ──────────────────────────────────────────────────────
    {
      name: 'carteSousTitre', title: 'Sous-titre de l\'encart (sous « Jean-Baptiste Vidal »)', type: 'text', rows: 2,
      group: 'infos',
      initialValue: "Moniteur-Guide diplômé d'État\nPêche à la mouche en Bretagne-Sud",
      description: 'Un retour à la ligne = un saut de ligne affiché',
    },
    {
      name: 'delaiTitre', title: 'Titre du bloc délai', type: 'string',
      group: 'infos', initialValue: 'Délai de réponse',
    },
    {
      name: 'delaiTexte', title: 'Texte du bloc délai', type: 'string',
      group: 'infos', initialValue: 'Je réponds généralement sous 24 à 48 heures en semaine.',
    },

    // ── SEO ───────────────────────────────────────────────────────────────
    {
      name: 'seoTitle', title: 'Titre SEO (balise <title>)', type: 'string',
      group: 'seo', initialValue: 'Contact — Jean-Baptiste Vidal, Guide de pêche à la mouche en Bretagne',
      validation: Rule => Rule.max(70).warning('Idéalement moins de 65 caractères'),
    },
    {
      name: 'seoDescription', title: 'Description SEO', type: 'text', rows: 3,
      group: 'seo', initialValue: 'Contacter Jean-Baptiste Vidal Moniteur-Guide de pêche à la mouche en Bretagne pour organiser votre stage.',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères'),
    },
  ],

  preview: {
    prepare: () => ({ title: '✉️ Page Contact — textes' }),
  },
}

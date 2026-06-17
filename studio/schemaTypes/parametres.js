export default {
  name: 'parametres',
  title: 'Paramètres du site',
  type: 'document',
  // Singleton — un seul document de ce type
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'contact', title: '📞 Contact & Coordonnées' },
    { name: 'reseaux', title: '📱 Réseaux sociaux' },
    { name: 'footer', title: '🔽 Footer' },
    { name: 'seo', title: '🔍 SEO global' },
    { name: 'acces', title: '🔒 Accès protégés' },
  ],
  fields: [
    // ── Contact ──
    {
      name: 'telephone',
      title: 'Numéro de téléphone',
      type: 'string',
      group: 'contact',
      description: 'Affiché dans le header et le footer (ex: 06 87 30 34 56)',
      validation: Rule => Rule.required().error('Le numéro de téléphone est obligatoire'),
    },
    {
      name: 'email',
      title: 'Adresse e-mail',
      type: 'string',
      group: 'contact',
      description: 'Affiché dans le footer et la page contact',
      validation: Rule => Rule.required().email().error('Adresse e-mail invalide'),
    },
    {
      name: 'adresse',
      title: 'Zone géographique',
      type: 'string',
      group: 'contact',
      description: 'Ex: Bretagne-Sud, entre Quimper et Quimperlé',
    },
    {
      name: 'formspreeId',
      title: 'Formspree — ID du formulaire de contact',
      type: 'string',
      group: 'contact',
      description: "ID Formspree (ex : xlekvqad). S'inscrire sur formspree.io → New Form → copier l'ID dans l'URL.",
    },
    // ── Réseaux sociaux ──
    {
      name: 'facebook',
      title: 'Facebook (URL)',
      type: 'url',
      group: 'reseaux',
    },
    {
      name: 'instagram',
      title: 'Instagram (URL)',
      type: 'url',
      group: 'reseaux',
    },
    {
      name: 'youtube',
      title: 'YouTube (URL)',
      type: 'url',
      group: 'reseaux',
    },
    {
      name: 'vimeo',
      title: 'Vimeo (URL)',
      type: 'url',
      group: 'reseaux',
    },
    // ── Footer ──
    {
      name: 'footerTexte',
      title: 'Texte du footer',
      type: 'text',
      rows: 3,
      group: 'footer',
      description: 'Courte description affichée dans le bas de page',
    },
    {
      name: 'mentionsLegales',
      title: 'Mentions légales',
      type: 'text',
      rows: 5,
      group: 'footer',
    },
    // ── Accès protégés ──
    {
      name: 'motDePasseDispo',
      title: 'Mot de passe — Calendrier des disponibilités',
      type: 'string',
      group: 'acces',
      description: 'Partagez ce mot de passe avec vos clients pour qu\'ils accèdent au calendrier. Laissez vide pour désactiver la protection.',
    },
    // ── SEO global ──
    {
      name: 'siteTitle',
      title: 'Titre du site',
      type: 'string',
      group: 'seo',
      description: 'Nom du site tel qu\'il apparaît dans Google',
      validation: Rule => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Description globale',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Description par défaut utilisée sur les pages sans description SEO propre',
      validation: Rule => Rule.max(160).warning('Idéalement moins de 160 caractères pour Google'),
    },
    {
      name: 'ogImage',
      title: 'Image de partage (Open Graph)',
      type: 'image',
      group: 'seo',
      description: 'Image affichée quand le site est partagé sur Facebook, WhatsApp, etc.',
      options: { hotspot: true },
    },
  ],
}

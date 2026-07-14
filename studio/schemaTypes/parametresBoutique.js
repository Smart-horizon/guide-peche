export default {
  name: 'parametresBoutique',
  title: 'Boutique — Livraison',
  type: 'document',
  icon: () => '🚚',
  // Singleton créé automatiquement — pas de création manuelle
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'paysLivraison',
      title: 'Pays de livraison autorisés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🇫🇷 France',      value: 'FR' },
          { title: '🇧🇪 Belgique',    value: 'BE' },
          { title: '🇱🇺 Luxembourg',  value: 'LU' },
          { title: '🇨🇭 Suisse',      value: 'CH' },
          { title: '🇩🇪 Allemagne',   value: 'DE' },
          { title: '🇳🇱 Pays-Bas',    value: 'NL' },
          { title: '🇮🇹 Italie',      value: 'IT' },
          { title: '🇪🇸 Espagne',     value: 'ES' },
          { title: '🇬🇧 Royaume-Uni', value: 'GB' },
          { title: '🇮🇪 Irlande',     value: 'IE' },
        ],
      },
      description: 'Le client ne pourra saisir une adresse de livraison que dans ces pays',
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'francoSeuil',
      title: 'Livraison offerte à partir de (€)',
      type: 'number',
      description: 'Laissez vide pour ne jamais offrir la livraison. Ex : 60 → port gratuit dès 60 € d\'articles.',
      validation: Rule => Rule.positive(),
    },
    {
      name: 'modes',
      title: 'Modes d\'expédition proposés',
      type: 'array',
      description: 'Le client choisit parmi les modes compatibles avec le poids de son panier. Glissez-déposez pour changer l\'ordre d\'affichage.',
      validation: Rule => Rule.required().min(1),
      of: [{
        type: 'object',
        name: 'modeExpedition',
        fields: [
          {
            name: 'nom',
            title: 'Nom affiché au client',
            type: 'string',
            description: 'Ex : "Lettre suivie", "Colissimo domicile"',
            validation: Rule => Rule.required(),
          },
          {
            name: 'delai',
            title: 'Délai estimé (optionnel)',
            type: 'string',
            description: 'Ex : "2-3 jours ouvrés" — affiché entre parenthèses au paiement',
          },
          {
            name: 'prix',
            title: 'Prix (€ TTC)',
            type: 'number',
            validation: Rule => Rule.required().min(0),
          },
          {
            name: 'poidsMax',
            title: 'Poids maximum du panier (grammes)',
            type: 'number',
            description: 'Ce mode n\'est proposé que si le panier pèse moins. Laissez vide = tous poids. Ex : 250 pour une lettre suivie.',
            validation: Rule => Rule.positive(),
          },
          {
            name: 'actif',
            title: 'Actif',
            type: 'boolean',
            initialValue: true,
            description: 'Décochez pour suspendre ce mode sans le supprimer',
          },
        ],
        preview: {
          select: { nom: 'nom', prix: 'prix', poidsMax: 'poidsMax', actif: 'actif', delai: 'delai' },
          prepare({ nom, prix, poidsMax, actif, delai }) {
            const etat = actif === false ? ' · 🚫 suspendu' : ''
            const limite = poidsMax ? ` · ≤ ${poidsMax} g` : ''
            return {
              title: nom,
              subtitle: `${prix != null ? prix.toFixed(2).replace('.', ',') + ' €' : ''}${delai ? ` · ${delai}` : ''}${limite}${etat}`,
            }
          },
        },
      }],
    },
  ],
  preview: {
    prepare: () => ({ title: '🚚 Livraison — pays, tarifs et modes d\'expédition' }),
  },
}

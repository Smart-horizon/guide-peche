export default {
  name: 'commande',
  title: 'Commandes (boutique)',
  type: 'document',
  icon: () => '📬',
  // Les commandes sont créées automatiquement par le paiement Stripe.
  // JBV ne fait que changer leur statut — pas de création manuelle.
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: 'numero',
      title: 'Numéro de commande',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'date',
      title: 'Date de la commande',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'statut',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '🆕 Commandée',            value: 'commandee' },
          { title: '📦 Préparée',             value: 'preparee'  },
          { title: '🚚 Expédiée',             value: 'expediee'  },
          { title: '✅ Livrée',               value: 'livree'    },
          { title: '❌ Annulée / remboursée', value: 'annulee'   },
        ],
        layout: 'radio',
      },
      initialValue: 'commandee',
      description: 'Faites avancer la commande à chaque étape — c\'est votre suivi de préparation',
      validation: Rule => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client',
      type: 'object',
      readOnly: true,
      fields: [
        { name: 'nom',       title: 'Nom',       type: 'string' },
        { name: 'email',     title: 'E-mail',    type: 'string' },
        { name: 'telephone', title: 'Téléphone', type: 'string' },
      ],
    },
    {
      name: 'adresseLivraison',
      title: 'Adresse de livraison',
      type: 'text',
      rows: 4,
      readOnly: true,
    },
    {
      name: 'lignes',
      title: 'Articles commandés',
      type: 'array',
      readOnly: true,
      of: [{
        type: 'object',
        name: 'ligneCommande',
        fields: [
          { name: 'titre',    title: 'Produit',        type: 'string' },
          { name: 'variante', title: 'Variante',       type: 'string' },
          { name: 'quantite', title: 'Quantité',       type: 'number' },
          { name: 'prix',     title: 'Prix unitaire €', type: 'number' },
        ],
        preview: {
          select: { titre: 'titre', variante: 'variante', quantite: 'quantite', prix: 'prix' },
          prepare({ titre, variante, quantite, prix }) {
            return {
              title: `${quantite} × ${titre}${variante ? ` — ${variante}` : ''}`,
              subtitle: prix != null ? `${(prix * quantite).toFixed(2).replace('.', ',')} €` : '',
            }
          },
        },
      }],
    },
    {
      name: 'totalArticles',
      title: 'Total articles (€)',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'fraisPort',
      title: 'Frais de port (€)',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'totalPaye',
      title: 'Total payé (€)',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'note',
      title: 'Note interne (optionnel)',
      type: 'text',
      rows: 2,
      description: 'Pour vous : n° de suivi colis, remarque…',
    },
    {
      name: 'stripeSessionId',
      title: 'Référence Stripe',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
  ],

  orderings: [
    {
      title: 'Plus récentes d\'abord',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],

  preview: {
    select: { numero: 'numero', date: 'date', statut: 'statut', total: 'totalPaye', client: 'client.nom' },
    prepare({ numero, date, statut, total, client }) {
      const badges = {
        commandee: '🆕', preparee: '📦', expediee: '🚚', livree: '✅', annulee: '❌',
      }
      const jour = date ? new Date(date).toLocaleDateString('fr-FR') : ''
      return {
        title: `${badges[statut] ?? ''} ${numero ?? 'Commande'} — ${client ?? ''}`,
        subtitle: `${jour} · ${total != null ? total.toFixed(2).replace('.', ',') + ' €' : ''}`,
      }
    },
  },
}

export default {
  name: 'disponibilite',
  title: 'Calendrier des disponibilités',
  type: 'document',
  icon: () => '📅',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      description: 'Ex : "Bar à vue — Étel", "Stage Spey", "Vacances", "Option client Martin"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'statut',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Disponible',                   value: 'disponible'   },
          { title: '🔴 Réservé / Guidage confirmé',   value: 'reserve'      },
          { title: '🟡 Option / En discussion',        value: 'option'       },
          { title: '⛔ Indisponible (vacances / arrêt)', value: 'indisponible' },
          { title: '🌊 Favorable au bar',              value: 'favorable'    },
        ],
        layout: 'radio',
      },
      initialValue: 'disponible',
      validation: Rule => Rule.required(),
    },
    {
      name: 'dateDebut',
      title: 'Date de début',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'dateFin',
      title: 'Date de fin (optionnel — pour une plage)',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      description: 'Laisser vide pour un événement d\'une seule journée',
    },
    {
      name: 'note',
      title: 'Note interne (visible dans le tooltip)',
      type: 'string',
      description: 'Affiché au survol. Ex : "Client Martin — bar à vue Étel" ou "Séjour famille"',
    },
    {
      name: 'confidentiel',
      title: 'Masquer le titre (afficher seulement le statut)',
      type: 'boolean',
      description: 'Utile pour les réservations confidentielles — seule la couleur apparaît sur le calendrier.',
      initialValue: false,
    },
  ],
  preview: {
    select: { titre: 'titre', dateDebut: 'dateDebut', dateFin: 'dateFin', statut: 'statut' },
    prepare: ({ titre, dateDebut, dateFin, statut }) => {
      const icons = { disponible: '🟢', reserve: '🔴', option: '🟡', indisponible: '⛔', favorable: '🌊' }
      const dates = dateFin && dateFin !== dateDebut
        ? `${dateDebut} → ${dateFin}`
        : (dateDebut || '')
      return {
        title:    `${icons[statut] || '•'} ${titre || ''}`,
        subtitle: dates,
      }
    },
  },
  orderings: [{
    title: 'Date (croissant)',
    name:  'dateAsc',
    by: [{ field: 'dateDebut', direction: 'asc' }],
  }],
}

/**
 * navigation.js
 * Singleton — menu principal du site (header).
 * Jean-Baptiste peut modifier les liens, labels et sous-menus
 * sans toucher au code.
 */

export default {
  name: 'navigation',
  title: '🧭 Menu de navigation',
  type: 'document',

  fields: [
    {
      name: 'items',
      title: 'Liens du menu principal',
      type: 'array',
      description: 'Glissez-déposez pour réorganiser. Chaque lien peut avoir un sous-menu.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {
              name: 'label',
              title: 'Libellé affiché',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'Ex : "Mer", "Voyages", "Blog"',
            },
            {
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'Ex : /peche-du-bar-a-la-mouche · /blog · /contact',
            },
            {
              name: 'activePrefix',
              title: 'Préfixe de détection (optionnel)',
              type: 'string',
              description: 'Pour surligner ce lien sur toutes les sous-pages. Ex : /peche-du-bar — laisser vide si non nécessaire.',
            },
            {
              name: 'children',
              title: 'Sous-menu (optionnel)',
              type: 'array',
              description: 'Liens affichés dans le menu déroulant. Le premier lien apparaît en surligné.',
              of: [
                {
                  type: 'object',
                  name: 'navChild',
                  fields: [
                    {
                      name: 'label',
                      title: 'Libellé',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'URL',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href', children: 'children' },
            prepare: ({ title, subtitle, children }) => ({
              title: title || '(sans titre)',
              subtitle: children?.length
                ? `${subtitle} — ${children.length} sous-lien(s)`
                : subtitle || '',
            }),
          },
        },
      ],
    },
  ],

  // Empêche la création de plusieurs documents navigation
  __experimental_actions: ['update', 'publish'],
}

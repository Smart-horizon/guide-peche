import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {ManuelTool} from './plugins/ManuelTool'
import {StockTool} from './plugins/StockTool'
import {SyncEnSectionsAction} from './actions/syncEnSections'
import {createPublishWithEnSync} from './actions/publishWithEnSync'

// ── Structure personnalisée du menu latéral ──
const customStructure = (S, context) =>
  S.list()
    .title('Jean-Baptiste Vidal')
    .items([

      // 🏠 Page d'accueil — même pagebuilder que les autres pages
      S.listItem()
        .title("🏠 Page d'accueil")
        .child(async () => {
          const sanityClient = context.getClient({ apiVersion: '2024-01-01' })
          const doc = await sanityClient.fetch(
            `*[_type == "page" && slug.current == "/"][0]{ _id }`
          ).catch(() => null)
          if (doc?._id) {
            return S.document()
              .schemaType('page')
              .documentId(doc._id)
              .title("Page d'accueil")
          }
          // Fallback si le document n'existe pas encore
          return S.documentList()
            .title("Page d'accueil")
            .filter('_type == "page" && slug.current == "/"')
        }),

      // 🧭 Menu de navigation (singleton)
      S.listItem()
        .title('🧭 Menu de navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
            .title('Menu de navigation')
        ),

      // ⚙️ Paramètres du site (singleton)
      S.listItem()
        .title('⚙️ Paramètres du site')
        .child(
          S.document()
            .schemaType('parametres')
            .documentId('siteParametres')
        ),

      S.divider(),

      // 🎣 Prestations
      S.listItem()
        .title('🎣 Prestations')
        .child(
          S.list()
            .title('Prestations')
            .items([
              S.listItem()
                .title('🌊 Bar à la mouche')
                .child(S.documentList().title('Bar').filter('_type == "prestation" && categorie == "bar"')),
              S.listItem()
                .title('🏞️ Eau douce')
                .child(S.documentList().title('Eau douce').filter('_type == "prestation" && categorie == "eau-douce"')),
              S.listItem()
                .title('🏆 Masterclass')
                .child(S.documentList().title('Masterclass').filter('_type == "prestation" && categorie == "masterclass"')),
              S.listItem()
                .title('🎿 Spey Cast & Lancer')
                .child(S.documentList().title('Spey Cast').filter('_type == "prestation" && categorie == "spey-cast"')),
              S.listItem()
                .title('🎁 Bons cadeaux')
                .child(S.documentList().title('Bons cadeaux').filter('_type == "prestation" && categorie == "bon-cadeau"')),
              S.divider(),
              S.listItem()
                .title('📋 Toutes les prestations')
                .child(S.documentList().title('Toutes les prestations').filter('_type == "prestation"')),
            ])
        ),

      // ✈️ Voyages
      S.listItem()
        .title('✈️ Voyages')
        .child(
          S.list()
            .title('Voyages')
            .items([
              S.listItem()
                .title('✈️ Page hub voyages')
                .child(
                  S.document()
                    .schemaType('page')
                    .documentId('page-voyages-peche-mouche')
                    .title('Voyages de pêche à la mouche — hub')
                ),
              S.divider(),
              S.listItem()
                .title('📋 Tous les voyages')
                .child(S.documentList().title('Voyages').filter('_type == "voyage"')),
            ])
        ),

      S.divider(),

      // ⭐ Témoignages (avec drag & drop) + textes de la page
      S.listItem()
        .title('⭐ Témoignages')
        .child(
          S.list()
            .title('Témoignages')
            .items([
              // Textes de la page /temoignages
              S.listItem()
                .title('✏️ Textes de la page')
                .child(
                  S.document()
                    .schemaType('pageTemoignages')
                    .documentId('pageTemoignages')
                    .title('Page Témoignages — textes')
                ),
              S.divider(),
              // Liste des témoignages (drag & drop)
              orderableDocumentListDeskItem({
                type: 'temoignage',
                title: '📋 Liste des témoignages',
                icon: () => '⭐',
                S,
                context,
              }),
            ])
        ),

      S.divider(),

      // 📄 Pages du site
      S.listItem()
        .title('📄 Pages du site')
        .child(
          S.list()
            .title('Pages du site')
            .items([

              // ── Le guide (bio JBV) ─────────────────────────────────────────
              S.listItem()
                .title('👤 Jean-Baptiste Vidal (bio)')
                .child(
                  S.document()
                    .schemaType('page')
                    .documentId('page-jean-baptiste-vidal-moniteur-guide-de-peche')
                    .title('Jean-Baptiste Vidal — Le guide')
                ),

              S.divider(),

              // ── Pages mer ─────────────────────────────────────────────────
              S.listItem()
                .title('🚤 Le bateau (Carolina Skiff)')
                .child(S.document().schemaType('page').documentId('page-bateau-bar-a-la-mouche').title('Le bateau')),

              S.divider(),

              // ── Pages pratiques ───────────────────────────────────────────
              S.listItem()
                .title('💰 Tarifs')
                .child(S.document().schemaType('page').documentId('page-tarifs').title('Tarifs')),
              S.listItem()
                .title('📅 Disponibilités (page)')
                .child(S.document().schemaType('page').documentId('page-disponibilites-guidages').title('Disponibilités')),
              S.listItem()
                .title('📅 Calendrier des disponibilités')
                .child(
                  S.documentList()
                    .title('📅 Calendrier des disponibilités')
                    .schemaType('disponibilite')
                    .filter('_type == "disponibilite"')
                    .defaultOrdering([{ field: 'dateDebut', direction: 'asc' }])
                ),
              S.listItem()
                .title('🎁 Bon cadeau')
                .child(S.document().schemaType('page').documentId('page-bon-cadeau').title('Bon cadeau')),
              S.listItem()
                .title('📜 Conditions générales de vente')
                .child(S.document().schemaType('page').documentId('page-conditions-generales-de-ventes').title('CGV')),

              S.divider(),

              // ── Matériel ──────────────────────────────────────────────────
              S.listItem()
                .title('🎣 Mon matériel')
                .child(
                  S.list()
                    .title('Matériel')
                    .items([
                      S.listItem().title('🎣 Matériel (hub)').child(S.document().schemaType('page').documentId('page-materiel-jeanbaptistevidal').title('Mon matériel')),
                      S.listItem().title('🪰 Mes mouches').child(S.document().schemaType('page').documentId('page-mouches-de-peche-jeanbaptiste-vidal').title('Mes mouches')),
                      S.listItem().title('🌊 Matériel bar').child(S.document().schemaType('page').documentId('page-materiel-mouche-bar').title('Matériel bar')),
                      S.listItem().title('🏞️ Matériel truite').child(S.document().schemaType('page').documentId('page-materiel-mouche-truite').title('Matériel truite')),
                      S.listItem().title('🐟 Matériel migrateurs').child(S.document().schemaType('page').documentId('page-materiel-mouche-migrateur').title('Matériel migrateurs')),
                      S.listItem().title('🎿 Matériel réservoir').child(S.document().schemaType('page').documentId('page-materiel-mouche-reservoir').title('Matériel réservoir')),
                      S.listItem().title('🐊 Matériel brochet').child(S.document().schemaType('page').documentId('page-materiel-mouche-brochet').title('Matériel brochet')),
                      S.listItem().title('✈️ Matériel exotique').child(S.document().schemaType('page').documentId('page-materiel-mouche-peche-exotique').title('Matériel exotique')),
                    ])
                ),

              S.divider(),

              // ── Autres pages ──────────────────────────────────────────────
              S.listItem()
                .title('🤝 Partenaires')
                .child(
                  S.list()
                    .title('Partenaires')
                    .items([
                      S.listItem()
                        .title('✏️ Contenu de la page')
                        .child(
                          S.document()
                            .schemaType('page')
                            .documentId('page-partenaires-jeanbaptistevidal')
                            .title('Page Partenaires — sections')
                        ),
                      S.divider(),
                      orderableDocumentListDeskItem({
                        type: 'partenaire',
                        title: '🤝 Liste des partenaires',
                        icon: () => '🤝',
                        S,
                        context,
                      }),
                    ])
                ),
              S.listItem()
                .title('📰 Revue de presse')
                .child(
                  S.list()
                    .title('Revue de presse')
                    .items([
                      S.listItem()
                        .title('✏️ Contenu de la page')
                        .child(
                          S.document()
                            .schemaType('page')
                            .documentId('page-revue-de-presse-jbvidal')
                            .title('Page Revue de presse — sections')
                        ),
                      S.divider(),
                      orderableDocumentListDeskItem({
                        type: 'revuePresse',
                        title: '📰 Liste des articles de presse',
                        icon: () => '📰',
                        S,
                        context,
                      }),
                    ])
                ),
              S.listItem()
                .title('🎥 Vidéos')
                .child(S.document().schemaType('page').documentId('page-videos-jeanbaptiste-vidal-moniteur-guide-de-peche').title('Vidéos')),

              S.divider(),

              // 📧 Newsletter (singleton)
              S.listItem()
                .title('📧 Newsletter')
                .child(
                  S.document()
                    .schemaType('newsletter')
                    .documentId('newsletter-config')
                    .title('Newsletter — configuration')
                ),
            ])
        ),

      S.divider(),

      // ✍️ Blog
      S.listItem()
        .title('✍️ Blog')
        .child(
          S.list()
            .title('Articles')
            .items([
              S.listItem()
                .title('🌊 Bar')
                .child(S.documentList().title('Articles Bar').filter('_type == "article" && espece == "bar"')),
              S.listItem()
                .title('🏞️ Truite')
                .child(S.documentList().title('Articles Truite').filter('_type == "article" && espece == "truite"')),
              S.listItem()
                .title('🐟 Saumon & Alose')
                .child(S.documentList().title('Articles Saumon/Alose').filter('_type == "article" && (espece == "saumon" || espece == "alose")')),
              S.listItem()
                .title('🎣 Brochet')
                .child(S.documentList().title('Articles Brochet').filter('_type == "article" && espece == "brochet"')),
              S.listItem()
                .title('✈️ Exotique')
                .child(S.documentList().title('Articles Exotique').filter('_type == "article" && espece == "exotique"')),
              S.divider(),
              S.listItem()
                .title('📋 Tous les articles')
                .child(S.documentList().title('Tous les articles').filter('_type == "article"')),
            ])
        ),

      S.divider(),

      // 🛒 Boutique
      S.listItem()
        .title('🛒 Boutique')
        .child(
          S.list()
            .title('Boutique')
            .items([
              S.listItem()
                .title('🪰 Mouches')
                .child(S.documentList().title('Mouches').filter('_type == "produit" && categorie == "mouche"')),
              S.listItem()
                .title('🧢 Casquettes & goodies')
                .child(S.documentList().title('Casquettes & goodies').filter('_type == "produit" && categorie == "goodies"')),
              S.divider(),
              S.listItem()
                .title('📋 Tous les produits')
                .child(S.documentList().title('Tous les produits').filter('_type == "produit"')),
              S.divider(),
              // 🚚 Livraison — pays, tarifs, modes d'expédition (singleton)
              S.listItem()
                .title('🚚 Livraison')
                .child(
                  S.document()
                    .schemaType('parametresBoutique')
                    .documentId('parametresBoutique')
                    .title('Livraison — pays et tarifs')
                ),
              S.divider(),
              // 📬 Commandes — créées automatiquement par les paiements Stripe
              S.listItem()
                .title('📬 Commandes')
                .child(
                  S.list()
                    .title('Commandes')
                    .items([
                      S.listItem()
                        .title('🆕 À préparer')
                        .child(S.documentList().title('À préparer').filter('_type == "commande" && statut == "commandee"').defaultOrdering([{ field: 'date', direction: 'desc' }])),
                      S.listItem()
                        .title('📦 Préparées')
                        .child(S.documentList().title('Préparées').filter('_type == "commande" && statut == "preparee"').defaultOrdering([{ field: 'date', direction: 'desc' }])),
                      S.listItem()
                        .title('🚚 Expédiées')
                        .child(S.documentList().title('Expédiées').filter('_type == "commande" && statut == "expediee"').defaultOrdering([{ field: 'date', direction: 'desc' }])),
                      S.divider(),
                      S.listItem()
                        .title('📋 Toutes les commandes')
                        .child(S.documentList().title('Toutes les commandes').filter('_type == "commande"').defaultOrdering([{ field: 'date', direction: 'desc' }])),
                    ])
                ),
            ])
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Jean-Baptiste Vidal — Guide Pêche',

  projectId: 'uievv97s',
  dataset: 'production',

  plugins: [
    frFRLocale(),
    structureTool({ structure: customStructure }),
    presentationTool({
      name: 'preview',
      title: '👁️ Aperçu du site',
      // Worker d'APERÇU dédié (deploy-preview.sh) : SSR + brouillons temps réel
      // + overlays Visual Editing. Le site public (guide-peche) reste sans stega.
      previewUrl: 'https://guide-peche-preview.smart-horizon.workers.dev',
      resolve: {
        locations: {
          // Témoignages → page publiée (pas de preview SSR pour cette page statique)
          temoignage: () => ({
            locations: [{ title: 'Page Témoignages', href: '/temoignages' }],
          }),
          pageTemoignages: () => ({
            locations: [{ title: 'Page Témoignages', href: '/temoignages' }],
          }),
          accueil: () => ({
            locations: [{ title: "Page d'accueil", href: '/' }],
          }),
          parametres: () => ({
            locations: [{ title: "Page d'accueil", href: '/' }],
          }),
          // Prestations → page live (Visual Editing overlays actifs)
          prestation: (doc) => ({
            locations: doc?.slug?.current
              ? [{ title: doc.title || 'Prestation', href: `/${doc.slug.current}` }]
              : [],
          }),
          // Voyages → page publiée (statique)
          voyage: (doc) => ({
            locations: doc?.slug?.current
              ? [{ title: doc.title || 'Voyage', href: `/${doc.slug.current}` }]
              : [],
          }),
          // Pages génériques → page publiée (statique)
          page: (doc) => ({
            locations: doc?.slug?.current
              ? [{ title: doc.title || 'Page', href: doc.slug.current === '/' ? '/' : `/${doc.slug.current}` }]
              : [],
          }),
          // Articles → page statique (pas de route preview pour le blog)
          article: (doc) => ({
            locations: doc?.slug?.current
              ? [{ title: doc.title || 'Article', href: `/blog/${doc.slug.current}` }]
              : [],
          }),
        },
      },
    }),
    visionTool(),
  ],

  tools: (prev) => [
    ...prev,
    {
      name: 'manuel',
      title: '📖 Manuel',
      component: ManuelTool,
    },
    {
      name: 'stocks',
      title: '📦 Stocks',
      component: StockTool,
    },
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Miroir EN placé APRÈS les actions natives : "Publier" reste le bouton
    // principal, le miroir est accessible via le menu ⋯
    // "Publier" est enveloppé pour aligner l'ordre des sections EN sur le FR
    // à chaque publication (ordre seul — textes EN préservés).
    actions: (prev, context) =>
      ['page', 'prestation', 'voyage'].includes(context.schemaType)
        ? [
            ...prev.map((action) =>
              action.action === 'publish' ? createPublishWithEnSync(action) : action
            ),
            SyncEnSectionsAction,
          ]
        : prev,
  },

  deployment: {
    appId: 'obu7zdkgranctpllogehvpfu',
    autoUpdates: true,
  },
})

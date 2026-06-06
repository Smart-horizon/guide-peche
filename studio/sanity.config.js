import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {SectionOrderManager} from './components/SectionOrderManager'

// ── Structure personnalisée du menu latéral ──
const customStructure = (S, context) =>
  S.list()
    .title('Jean-Baptiste Vidal')
    .items([

      // 🏠 Page d'accueil — sections personnalisées listées directement (async)
      S.listItem()
        .title("🏠 Page d'accueil")
        .child(async () => {
          const sanityClient = context.getClient({ apiVersion: '2024-01-01' })
          const EMOJI = { texteImage: '📝', promo: '🌟', cartes: '🃏', banniere: '📢' }

          let customSections = []
          try {
            customSections = await sanityClient.fetch(
              `*[_type == "sectionAccueil"] | order(position asc) { _id, titre, sectionType }`
            )
          } catch (e) {
            console.error('[Structure] sectionAccueil fetch error:', e)
          }

          return S.list()
            .title("Page d'accueil")
            .items([
              // ── Contenu principal (singleton accueil) ────────────────────
              S.listItem()
                .title("✏️ Contenu principal")
                .child(
                  S.document()
                    .schemaType('accueil')
                    .documentId('accueil')
                    .title("Page d'accueil")
                    .views([
                      S.view.component(SectionOrderManager).id('contenu').title('✏️ Contenu'),
                    ])
                ),

              // ── Sections personnalisées (une par une, pas de sous-dossier) ─
              ...(customSections.length > 0 ? [S.divider()] : []),
              ...customSections.map(s =>
                S.listItem()
                  .id(s._id)
                  .title(`${EMOJI[s.sectionType] ?? '➕'} ${s.titre || '(sans titre)'}`)
                  .child(
                    S.document()
                      .schemaType('sectionAccueil')
                      .documentId(s._id)
                  )
              ),
            ])
        }),

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
          S.documentList().title('Voyages').filter('_type == "voyage"')
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
      // /preview/* = route SSR qui affiche les BROUILLONS en temps réel
      previewUrl: 'https://guide-peche.smart-horizon.workers.dev',
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
          // Voyages → page live
          voyage: (doc) => ({
            locations: doc?.slug?.current
              ? [{ title: doc.title || 'Voyage', href: `/${doc.slug.current}` }]
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

  schema: {
    types: schemaTypes,
  },

  deployment: {
    appId: 'obu7zdkgranctpllogehvpfu',
    autoUpdates: true,
  },
})

import newsletter from './newsletter'
import page from './page'
import disponibilite from './disponibilite'
import navigation from './navigation'
import partenaire from './partenaire'
import revuePresse from './revuePresse'
import prestation from './prestation'
import voyage from './voyage'
import temoignage from './temoignage'
import article from './article'
import parametres from './parametres'
import produit from './produit'
import commande from './commande'
import parametresBoutique from './parametresBoutique'
import accueil from './accueil'
import sectionAccueil from './sectionAccueil'
import pageTemoignages from './pageTemoignages'
import pageContact from './pageContact'
import pageBlog from './pageBlog'
import {
  sectionHero, sectionIntro, sectionTitre, sectionCards, sectionTexte,
  sectionTexteImage, sectionGalerie, sectionVideo, sectionStats,
  sectionCta, sectionBanniere, sectionCarrousel3Images,
  sectionProgramme, sectionProgrammeTexte, sectionProgrammeCartes,
  sectionSelection, sectionCards2, sectionBilan, sectionDates, sectionChoix,
  sectionFriseChronologique, sectionListe, sectionLienBlog,
  sectionPrestationsHP, sectionGuideHP, sectionMaterielHP, sectionTemoignagesHP, sectionBonCadeauHP,
  sectionCards3, sectionBanniereCard, sectionPartenaires, sectionRevuePresse,
  sectionMaterielIntro, sectionEquipement, sectionMaterielNav,
  sectionVideos, sectionGrilleSubPages, sectionTarifs,
  sectionAvantages, sectionVoyagesGrid, sectionFaq, sectionBlog,
  sectionProduits, sectionBoutiqueCta,
} from './sections.js'

export const schemaTypes = [
  // Documents
  newsletter,
  disponibilite,
  navigation,
  accueil,
  partenaire,
  revuePresse,
  sectionAccueil,
  pageTemoignages,
  pageContact,
  pageBlog,
  parametres,
  prestation,
  produit,
  commande,
  parametresBoutique,
  voyage,
  temoignage,
  article,
  page,
  // Blocs Page Builder (objets, pas de documents)
  sectionHero,
  sectionIntro,
  sectionTitre,
  sectionCards,
  sectionTexte,
  sectionTexteImage,
  sectionGalerie,
  sectionVideo,
  sectionStats,
  sectionCta,
  sectionBanniere,
  sectionCarrousel3Images,
  sectionProgramme,
  sectionProgrammeTexte,
  sectionProgrammeCartes,
  sectionSelection,
  sectionCards2,
  sectionCards3,
  sectionBilan,
  sectionDates,
  sectionChoix,
  sectionFriseChronologique,
  sectionListe,
  sectionLienBlog,
  sectionPrestationsHP,
  sectionGuideHP,
  sectionMaterielHP,
  sectionTemoignagesHP,
  sectionBonCadeauHP,
  sectionBanniereCard,
  sectionPartenaires,
  sectionRevuePresse,
  sectionMaterielIntro,
  sectionEquipement,
  sectionMaterielNav,
  sectionVideos,
  sectionGrilleSubPages,
  sectionTarifs,
  sectionAvantages,
  sectionVoyagesGrid,
  sectionFaq,
  sectionBlog,
  sectionProduits,
  sectionBoutiqueCta,
]

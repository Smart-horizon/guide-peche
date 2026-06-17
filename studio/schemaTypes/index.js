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
import accueil from './accueil'
import sectionAccueil from './sectionAccueil'
import pageTemoignages from './pageTemoignages'
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
  sectionAvantages, sectionVoyagesGrid,
} from './sections.js'

export const schemaTypes = [
  // Documents
  disponibilite,
  navigation,
  accueil,
  partenaire,
  revuePresse,
  sectionAccueil,
  pageTemoignages,
  parametres,
  prestation,
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
]

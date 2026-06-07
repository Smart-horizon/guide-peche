import page from './page'
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
  sectionCta, sectionBanniere, sectionCarrousel3Images, sectionProgramme,
} from './sections.js'

export const schemaTypes = [
  // Documents
  accueil,
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
]

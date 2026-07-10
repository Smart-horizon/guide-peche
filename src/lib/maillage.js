/**
 * maillage.js — Maillage interne SEO (cocon sémantique)
 *
 * Relie les 156 articles de blog (champ `espece`) aux pages prestations
 * "piliers" (champ `categorie`), dans les deux sens :
 *   · Blog → Prestation : CTA contextuel en bas d'article (transfert d'autorité)
 *   · Prestation → Blog : bloc "Derniers récits" (autorité thématique + conversion)
 */

// Page pilier pour chaque espèce d'article
export const PILIERS = {
  bar: {
    url: '/peche-du-bar-a-la-mouche',
    titre: 'La pêche du bar à la mouche en Bretagne',
    titreEn: 'Sea bass fly fishing in Brittany',
  },
  truite: {
    url: '/peche-de-la-truite-a-la-mouche-en-bretagne',
    titre: 'La pêche de la truite à la mouche en Bretagne',
    titreEn: 'Trout fly fishing in Brittany',
  },
  saumon: {
    url: '/peche-a-la-mouche-en-bretagne',
    titre: 'La pêche à la mouche en Bretagne',
    titreEn: 'Fly fishing in Brittany',
  },
  alose: {
    url: '/peche-de-l-alose-a-la-mouche',
    titre: "La pêche de l'alose à la mouche",
    titreEn: 'Shad fly fishing',
  },
  brochet: {
    url: '/peche-du-brochet-a-la-mouche',
    titre: 'La pêche du brochet à la mouche',
    titreEn: 'Pike fly fishing',
  },
  exotique: {
    url: '/voyages-peche-mouche',
    titre: 'Les voyages de pêche à la mouche',
    titreEn: 'Fly fishing trips',
  },
}

// Espèces d'articles pertinentes pour une prestation/un voyage
export function especesPourDoc(doc) {
  if (doc?._type === 'voyage') return ['exotique']
  if (doc?._type !== 'prestation') return null
  switch (doc.categorie) {
    case 'bar':         return ['bar']
    case 'eau-douce':   return ['truite', 'saumon', 'alose', 'brochet']
    case 'masterclass': return ['truite']
    case 'spey-cast':   return ['saumon', 'truite']
    default:            return null // bon-cadeau, etc.
  }
}

/**
 * seo.js — helpers SEO partagés.
 */

/**
 * Balise <title> complète : ajoute « — Jean-Baptiste Vidal » sauf si le titre
 * (souvent saisi dans Sanity avec le nom déjà inclus) le contient déjà.
 * Évite les doublons type « … — Jean-Baptiste Vidal — Jean-Baptiste Vidal ».
 */
export function fullTitle(t) {
  const titre = t || 'Jean-Baptiste Vidal'
  return titre.includes('Jean-Baptiste Vidal') ? titre : `${titre} — Jean-Baptiste Vidal`
}

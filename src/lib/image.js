/**
 * image.js — cadrage des images Sanity piloté par le hotspot.
 *
 * ── LE PROBLÈME ───────────────────────────────────────────────────────────────
 * `urlFor(img).width(W).height(H).fit('crop').crop('focalpoint')` produit une
 * image d'un ratio FIGÉ. Tant que le cadre CSS a le même ratio, tout va bien.
 * Mais dès qu'une media query change le ratio du cadre, `background-size: cover`
 * redécoupe l'image AU CENTRE : le hotspot est perdu et le sujet saute.
 * (C'est ce qui coupait le visage du guide sur mobile : cadre 3/4 → 16/9.)
 *
 * ── LA RÈGLE ──────────────────────────────────────────────────────────────────
 * On ne recadre plus côté CDN. L'image est servie à son ratio naturel, puis :
 *   · POSITION : le hotspot est ancré dans le cadre → le sujet reste visible
 *     quel que soit le ratio, sans aucun cas particulier.
 *   · ZOOM     : déduit de la TAILLE du hotspot. C'est la sémantique voulue par
 *     Sanity — le hotspot n'est pas un point mais « la zone qui doit rester
 *     visible ». Cercle serré = gros plan, cercle large = plan large.
 *
 * Une seule constante (CIBLE) règle tout le site, et JBV recadre n'importe
 * quelle image depuis le Studio sans intervention d'un développeur.
 *
 * Périmètre actuel : les CARTES (photo du guide, cartes Matériel). Les heros
 * gardent heroBg() — ils rendent déjà correctement.
 */

/**
 * Part du cadre que le hotspot doit occuper — SEUL réglage global du cadrage.
 * Autrement dit : à quel point on serre autour de la zone marquée « doit rester
 * visible ». Monter cette valeur zoome tout le site, la baisser l'élargit.
 *
 * Calé sur le contenu réel (16/07/2026) : photo du guide (h=0.46) → ×1.97,
 * cartes Matériel (h=0.81) → ×1.11, image sans hotspot → ×1.
 */
const CIBLE = 0.9

/** Garde-fou : au-delà, on agrandirait au-delà de la définition source. */
const ZOOM_MAX = 2.5

/**
 * Ancre CSS du hotspot (`background-position` / `object-position`).
 *
 * ⚠️ Suppose qu'aucun `rect`/crop CDN n'est appliqué à l'URL : les coordonnées
 * du hotspot sont relatives à l'image ENTIÈRE.
 */
export function hotspotPosition(image) {
  const hs = image?.hotspot
  if (hs?.x == null || hs?.y == null) return 'center'
  return `${Math.round(hs.x * 100)}% ${Math.round(hs.y * 100)}%`
}

/**
 * Facteur de zoom déduit de la hauteur du hotspot.
 * Jamais < 1 (on ne dézoome pas sous `cover`), jamais > ZOOM_MAX.
 * Sans hotspot → 1 : l'image est rendue exactement comme avant.
 */
export function hotspotZoom(image) {
  const h = image?.hotspot?.height
  if (typeof h !== 'number' || !(h > 0)) return 1
  return Math.min(ZOOM_MAX, Math.max(1, CIBLE / h))
}

/**
 * Variables CSS à poser en style inline sur un élément `.img-hotspot`
 * (motif défini dans le <style is:global> de BaseLayout.astro).
 *
 * Le zoom y est appliqué par `transform: scale()` sur un ::before en
 * `background-size: cover`, et NON par `background-size: auto Z%` : agrandir
 * un fond déjà en `cover` couvre toujours le cadre, alors qu'une hauteur en
 * pourcentage laisserait apparaître des bandes si l'image était plus étroite
 * que le cadre (typiquement si JBV remplace une photo paysage par un portrait).
 *
 * @param {string|null} url  URL servie à son RATIO NATUREL (pas de height/crop)
 */
export function hotspotVars(url, image) {
  if (!url) return undefined
  const parts = [
    `--img:url('${url}')`,
    `--img-pos:${hotspotPosition(image)}`,
    `--img-zoom:${hotspotZoom(image).toFixed(3)}`,
  ]
  return parts.join(';')
}

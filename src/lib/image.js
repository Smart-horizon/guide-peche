/**
 * image.js — helpers de cadrage des images Sanity.
 */

/**
 * Traduit le hotspot Sanity en `background-position` / `object-position` CSS.
 *
 * POURQUOI plutôt que le recadrage CDN (`.fit('crop').crop('focalpoint')`) :
 * le CDN produit une image d'un ratio FIGÉ. Dès qu'elle est affichée dans un
 * cadre d'un autre ratio (typiquement une media query qui passe de 3/4 à 16/9
 * sur mobile), `background-size: cover` la redécoupe — et il la recentre, en
 * ignorant le hotspot. Le sujet saute.
 *
 * En servant l'image à son ratio naturel et en positionnant par le hotspot, le
 * point d'intérêt reste visible quel que soit le ratio du cadre. Même principe
 * que `heroBg()` dans PageBuilderSections.astro.
 *
 * ⚠️ Suppose qu'aucun rectangle de rognage n'est appliqué à l'URL : les
 * coordonnées du hotspot sont relatives à l'image ENTIÈRE. Si un jour on
 * réintroduit un `rect`/crop côté CDN, ce calcul devient faux.
 */
export function hotspotPosition(image) {
  const hs = image?.hotspot
  if (hs?.x == null || hs?.y == null) return 'center'
  return `${Math.round(hs.x * 100)}% ${Math.round(hs.y * 100)}%`
}

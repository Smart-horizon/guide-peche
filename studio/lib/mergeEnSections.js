/**
 * mergeEnSections.js
 * Fusion des sections FR + EN pour les pages anglaises.
 *
 * Principe : la STRUCTURE, les IMAGES et le DESIGN viennent toujours du
 * pagebuilder FR (source de vérité). Seuls les champs TEXTE sont pris dans
 * pagebuilderEn quand ils sont remplis. Conséquences :
 *   - une photo changée en FR apparaît immédiatement en EN (zéro resync)
 *   - une section ajoutée/supprimée en FR suit automatiquement en EN
 *   - les traductions EN ne sont jamais écrasées par une modif de texte FR
 *
 * ⚠️ Copie synchronisée : studio/lib/mergeEnSections.js (même logique pour
 * le bouton "Miroir sections EN" du Studio). Modifier les deux ensemble.
 */

// Champs "design / liens / techniques" — toujours pris côté FR
const NON_TEXT_KEY = /^(fond|style|hauteur|alignement|colonnes|position\w*|isLarge|showInfoCard|lien|href|url\w*|video\w*|voyageFeaturedSlug|avatar|emoji|icone|statut|couleur\w*|slug|categorie|badges|mode|nombre|espece|articlesChoisis|type|nouvelOnglet)$/i

const isAssetObj = (v) =>
  v && typeof v === 'object' && !Array.isArray(v) &&
  (v.asset !== undefined || v._type === 'image' || v._type === 'file')

const isBlockArr = (a) =>
  Array.isArray(a) && a.length > 0 && a.some((x) => x && x._type === 'block')

// Fusionne récursivement une valeur FR avec sa contrepartie EN
function mergeValue(key, fr, en) {
  // Clés techniques et design → FR
  if (key.startsWith('_') || NON_TEXT_KEY.test(key)) return fr

  // Chaîne de texte → EN si non vide
  if (typeof fr === 'string') {
    return (typeof en === 'string' && en.trim()) ? en : fr
  }

  // Nombres / booléens → FR
  if (typeof fr !== 'object' || fr === null) return fr

  // Portable Text (blocs) → EN en entier si non vide
  if (isBlockArr(fr)) return isBlockArr(en) ? en : fr

  // Images / fichiers → FR
  if (isAssetObj(fr)) return fr

  // Tableaux
  if (Array.isArray(fr)) {
    // Tableau de chaînes (specs…) → EN en entier si non vide
    if (fr.every((x) => typeof x === 'string')) {
      return (Array.isArray(en) && en.length && en.every((x) => typeof x === 'string')) ? en : fr
    }
    // Tableau d'objets (cards, etapes, stats…) → item par item, _key puis index
    return fr.map((item, i) => {
      if (!item || typeof item !== 'object') return item
      let match = null
      if (item._key && Array.isArray(en)) match = en.find((e) => e && e._key === item._key)
      if (!match && Array.isArray(en) && en[i] && en[i]._type === item._type) match = en[i]
      return match ? mergeObject(item, match) : item
    })
  }

  // Objet imbriqué (intervenant…) → récursion
  return mergeObject(fr, en)
}

function mergeObject(fr, en) {
  if (!en || typeof en !== 'object') return fr
  const out = {}
  for (const k of Object.keys(fr)) out[k] = mergeValue(k, fr[k], en[k])
  return out
}

/**
 * Fusionne la liste des sections FR avec les textes EN.
 * Correspondance : _key identique, sinon n-ième section du même _type.
 */
export function mergeSectionsEn(frSections, enSections) {
  const fr = frSections ?? []
  const en = enSections ?? []
  if (!en.length) return fr.length ? fr : null
  if (!fr.length) return en.length ? en : null

  // Compteur de position par _type pour le fallback
  const typeCount = {}
  const enByType = {}
  for (const s of en) {
    if (!s?._type) continue
    ;(enByType[s._type] ||= []).push(s)
  }

  return fr.map((sec) => {
    if (!sec?._type) return sec
    let match = sec._key ? en.find((e) => e && e._key === sec._key) : null
    if (!match) {
      const idx = typeCount[sec._type] ?? 0
      match = enByType[sec._type]?.[idx] ?? null
    }
    typeCount[sec._type] = (typeCount[sec._type] ?? 0) + 1
    return match ? mergeObject(sec, match) : sec
  })
}

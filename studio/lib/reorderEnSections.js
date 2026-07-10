/**
 * reorderEnSections.js
 * Réordonne pagebuilderEn pour suivre l'ordre du pagebuilder FR (par _key).
 *
 * - Seul l'ORDRE change : aucun contenu EN n'est modifié ni copié.
 * - Les sections EN sans correspondance FR (clés différentes) restent à la
 *   fin, dans leur ordre relatif — le rendu les rattrape par n-ième du type.
 * - Retourne le nouveau tableau, ou null si l'ordre est déjà correct.
 *
 * Rappel : le site EN suit TOUJOURS la structure FR au rendu
 * (mergeSectionsEn) — ce réordonnancement sert à garder l'onglet 🇬🇧 du
 * Studio visuellement aligné sur le FR.
 */
export function reorderEnSections(fr, en) {
  if (!Array.isArray(fr) || fr.length === 0) return null
  if (!Array.isArray(en) || en.length < 2) return null

  const pos = new Map(fr.map((s, i) => [s?._key, i]))
  const matched = en
    .filter((s) => pos.has(s?._key))
    .sort((a, b) => pos.get(a._key) - pos.get(b._key))
  const orphans = en.filter((s) => !pos.has(s?._key))
  const next = [...matched, ...orphans]

  const changed = next.some((s, i) => s?._key !== en[i]?._key)
  return changed ? next : null
}

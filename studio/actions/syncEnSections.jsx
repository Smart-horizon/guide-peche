/**
 * Action de document "🇬🇧 Miroir sections EN"
 * Reconstruit pagebuilderEn depuis le pagebuilder FR :
 *   - structure, images et design copiés du FR (grisés côté EN)
 *   - les TEXTES déjà traduits en EN sont PRÉSERVÉS (jamais écrasés)
 *   - les nouvelles sections FR apparaissent avec leur texte FR, à traduire
 *
 * Note : même sans cliquer ce bouton, le site EN affiche la structure FR
 * avec les textes EN disponibles (fusion au rendu). Ce bouton sert surtout
 * à faire apparaître les sections dans l'onglet 🇬🇧 pour la traduction.
 */
import { useDocumentOperation } from 'sanity'
import { mergeSectionsEn } from '../lib/mergeEnSections'

export function SyncEnSectionsAction(props) {
  const { patch } = useDocumentOperation(props.id, props.type)
  const doc = props.draft || props.published

  const hasPagebuilder = Array.isArray(doc?.pagebuilder) && doc.pagebuilder.length > 0

  return {
    label: '🇬🇧 Miroir sections EN',
    tone: 'primary',
    disabled: !hasPagebuilder,
    title: hasPagebuilder
      ? 'Copie la structure FR vers l\'onglet anglais en préservant les textes déjà traduits'
      : 'Aucune section FR à copier',
    onHandle: () => {
      const fr = doc?.pagebuilder ?? []
      const en = doc?.pagebuilderEn ?? []
      // Structure/images/design depuis FR + textes EN existants préservés
      const mirrored = mergeSectionsEn(fr, en) ?? fr
      patch.execute([{ set: { pagebuilderEn: mirrored } }])
      props.onComplete()
    },
  }
}

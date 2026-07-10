/**
 * Action "Publier" enrichie : avant chaque publication, l'ordre des sections
 * de l'onglet 🇬🇧 (pagebuilderEn) est automatiquement aligné sur l'ordre du
 * pagebuilder FR. Seul l'ordre est touché — les textes EN sont préservés.
 *
 * JBV déplace une section en FR → Publier → l'onglet EN suit tout seul.
 * (Le site EN suivait déjà l'ordre FR au rendu ; ceci aligne aussi le Studio.)
 */
import { useDocumentOperation } from 'sanity'
import { reorderEnSections } from '../lib/reorderEnSections'

export function createPublishWithEnSync(originalPublishAction) {
  const PublishWithEnSync = (props) => {
    const { patch } = useDocumentOperation(props.id, props.type)
    const original = originalPublishAction(props)

    return {
      ...original,
      onHandle: () => {
        const doc = props.draft || props.published
        const reordered = reorderEnSections(doc?.pagebuilder, doc?.pagebuilderEn)
        if (reordered) {
          patch.execute([{ set: { pagebuilderEn: reordered } }])
        }
        original.onHandle?.()
      },
    }
  }
  // Conserve l'identité "publish" (bouton principal + raccourci clavier)
  PublishWithEnSync.action = originalPublishAction.action
  return PublishWithEnSync
}

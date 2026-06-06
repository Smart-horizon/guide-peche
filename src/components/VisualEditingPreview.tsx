/**
 * VisualEditingPreview.tsx
 * Wrapper client-side : active les overlays Visual Editing UNIQUEMENT
 * lorsque la page est chargée dans le contexte Sanity Studio
 * (iframe presentation tool OU paramètre ?sanity-preview-perspective=drafts).
 *
 * Pour les visiteurs normaux : composant vide, aucun overlay.
 */
import React, { useEffect, useState } from 'react'
import { VisualEditing } from '@sanity/visual-editing/react'

// Reproduit le history adapter de @sanity/astro pour la navigation Astro
function useHistoryAdapter() {
  return React.useMemo(() => ({
    subscribe: (navigate: (update: { type: string; url: string; title: string }) => void) => {
      const sync = () => navigate({ type: 'push', url: window.location.pathname + window.location.search + window.location.hash, title: document.title })
      sync()
      window.addEventListener('popstate', sync)
      return () => window.removeEventListener('popstate', sync)
    },
    update: (update: { type: string; url?: string }) => {
      if (update.type === 'push' && update.url) window.location.assign(update.url)
      else if (update.type === 'replace' && update.url) window.location.replace(update.url)
      else if (update.type === 'pop') window.history.back()
    },
  }), [])
}

export default function VisualEditingPreview() {
  const [active, setActive] = useState(false)
  const history = useHistoryAdapter()

  useEffect(() => {
    const inIframe   = window.self !== window.top
    const inPreview  = new URLSearchParams(window.location.search).has('sanity-preview-perspective')
    setActive(inIframe || inPreview)
  }, [])

  if (!active) return null

  return (
    <VisualEditing
      history={history}
      // La route /preview/* est SSR : recharger suffit pour voir les brouillons à jour
      refresh={() => new Promise(resolve => { window.location.reload(); resolve() })}
    />
  )
}

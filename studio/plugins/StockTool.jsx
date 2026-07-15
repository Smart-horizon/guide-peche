import { useCallback, useEffect, useState } from 'react'
import { useClient } from 'sanity'

// 📦 Gestion des stocks — vue unique pour voir et modifier le stock de tous
// les produits de la boutique. Écrit directement dans les fiches produit
// (champ stock / variantes[].stock) : c'est la même donnée que les fiches,
// aucune synchronisation nécessaire.

const police = 'system-ui, -apple-system, sans-serif'

const styles = {
  page:    { minHeight: '100vh', background: '#101214', padding: '2.5rem 1.5rem', boxSizing: 'border-box', fontFamily: police },
  cadre:   { maxWidth: 860, margin: '0 auto' },
  titre:   { color: 'white', fontSize: '1.35rem', fontWeight: 600, margin: 0 },
  sousTitre: { color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0.5rem 0 2rem' },
  carte:   { background: '#16191c', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', marginBottom: '1rem', overflow: 'hidden' },
  enTete:  { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  nomProduit: { color: 'white', fontWeight: 600, fontSize: '0.95rem', flex: 1 },
  badge:   { fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, padding: '0.1rem 0.5rem' },
  ligne:   { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.1rem' },
  nomLigne: { color: 'rgba(255,255,255,0.8)', fontSize: '0.87rem', flex: 1 },
  etat:    { fontSize: '0.75rem', minWidth: 90, textAlign: 'right' },
  input:   { width: 74, padding: '0.4rem 0.5rem', borderRadius: 5, border: '1px solid rgba(255,255,255,0.18)', background: '#0d0f11', color: 'white', fontSize: '0.9rem', fontFamily: police, textAlign: 'center' },
  bouton:  { padding: '0.42rem 0.9rem', borderRadius: 5, border: 'none', background: '#1B5E8A', color: 'white', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: police },
  boutonOk: { background: '#1e7d4f' },
}

function Etat({ stock }) {
  if (stock === 0)   return <span style={{ ...styles.etat, color: '#e5534b' }}>❌ Épuisé</span>
  if (stock == null) return <span style={{ ...styles.etat, color: 'rgba(255,255,255,0.35)' }}>∞ Illimité</span>
  if (stock <= 5)    return <span style={{ ...styles.etat, color: '#e8a03e' }}>⚠ {stock} restant{stock > 1 ? 's' : ''}</span>
  return <span style={{ ...styles.etat, color: '#4cae7f' }}>{stock} en stock</span>
}

function LigneStock({ libelle, stock, onSauver }) {
  const [valeur, setValeur] = useState(stock == null ? '' : String(stock))
  const [statut, setStatut] = useState('repos') // repos | modifié | envoi | ok | erreur

  useEffect(() => { setValeur(stock == null ? '' : String(stock)); setStatut('repos') }, [stock])

  const sauver = async () => {
    setStatut('envoi')
    try {
      const nombre = valeur.trim() === '' ? null : Math.max(0, Math.floor(Number(valeur)))
      await onSauver(Number.isNaN(nombre) ? null : nombre)
      setStatut('ok')
      setTimeout(() => setStatut('repos'), 1600)
    } catch (e) {
      console.error(e)
      setStatut('erreur')
    }
  }

  return (
    <div style={styles.ligne}>
      <span style={styles.nomLigne}>{libelle}</span>
      <Etat stock={stock} />
      <input
        style={styles.input}
        type="number"
        min="0"
        placeholder="∞"
        value={valeur}
        onChange={(e) => { setValeur(e.target.value); setStatut('modifié') }}
        onKeyDown={(e) => e.key === 'Enter' && statut === 'modifié' && sauver()}
      />
      {statut === 'modifié' && <button style={styles.bouton} onClick={sauver}>Enregistrer</button>}
      {statut === 'envoi'   && <button style={{ ...styles.bouton, opacity: 0.6 }} disabled>…</button>}
      {statut === 'ok'      && <button style={{ ...styles.bouton, ...styles.boutonOk }} disabled>✓ Enregistré</button>}
      {statut === 'erreur'  && <button style={{ ...styles.bouton, background: '#e5534b' }} onClick={sauver}>Réessayer</button>}
    </div>
  )
}

export function StockTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [produits, setProduits] = useState(null)

  const charger = useCallback(async () => {
    const docs = await client.fetch(`
      *[_type == "produit" && !(_id in path("drafts.**"))] | order(categorie asc, title asc) {
        _id, title, categorie, stock, disponible,
        "variantes": variantes[]{ _key, nom, stock }
      }
    `)
    setProduits(docs)
  }, [client])

  useEffect(() => { charger() }, [charger])

  // Écrit le stock dans le document publié ET dans son brouillon éventuel,
  // pour que la fiche affichée dans le Studio reste cohérente.
  const patcher = useCallback(async (id, chemin, valeur) => {
    const operation = (p) => (valeur == null ? p.unset([chemin]) : p.set({ [chemin]: valeur }))
    await operation(client.patch(id)).commit()
    try { await operation(client.patch(`drafts.${id}`)).commit() } catch { /* pas de brouillon */ }
    await charger()
  }, [client, charger])

  return (
    <div style={styles.page}>
      <div style={styles.cadre}>
        <h2 style={styles.titre}>📦 Gestion des stocks</h2>
        <p style={styles.sousTitre}>
          Modifiez le chiffre puis cliquez « Enregistrer » (ou touche Entrée).
          Champ vide = stock illimité · 0 = affiché « épuisé » sur la boutique.
          Les changements s'appliquent directement aux fiches produit.
        </p>

        {produits === null && <p style={{ color: 'rgba(255,255,255,0.4)' }}>Chargement…</p>}
        {produits?.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)' }}>Aucun produit publié pour le moment.</p>}

        {produits?.map((p) => (
          <div key={p._id} style={styles.carte}>
            <div style={styles.enTete}>
              <span style={styles.nomProduit}>
                {{ mouche: '🪰', coffret: '🎁', goodies: '🧢', materiel: '🎣', autre: '📦' }[p.categorie] ?? '📦'} {p.title}
              </span>
              {p.disponible === false && <span style={styles.badge}>masqué de la boutique</span>}
              {(p.variantes?.length ?? 0) > 0 && <span style={styles.badge}>{p.variantes.length} variantes</span>}
            </div>

            {(p.variantes?.length ?? 0) > 0 ? (
              p.variantes.map((v) => (
                <LigneStock
                  key={v._key}
                  libelle={v.nom}
                  stock={v.stock ?? null}
                  onSauver={(n) => patcher(p._id, `variantes[_key=="${v._key}"].stock`, n)}
                />
              ))
            ) : (
              <LigneStock
                libelle="Stock du produit"
                stock={p.stock ?? null}
                onSauver={(n) => patcher(p._id, 'stock', n)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

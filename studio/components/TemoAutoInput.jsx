/**
 * TemoAutoInput.jsx
 * Inputs personnalisés pour les champs "score" et "nombre" de la section Témoignages.
 * Affiche une pastille indiquant si la valeur est calculée automatiquement
 * depuis Sanity (🤖 vert) ou saisie manuellement (✏️ orange).
 *
 * Mode auto  : champ vide → le site utilise la valeur calculée en temps réel
 * Mode custom : champ rempli → le site affiche cette valeur en priorité
 */

import React, { useState, useEffect } from 'react'
import { useClient } from 'sanity'
import { Stack, Badge, Text, Box } from '@sanity/ui'

// ── Composant générique ────────────────────────────────────────────────────────
function AutoValueInput({ props, fetchAutoValue }) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [autoValue, setAutoValue] = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    fetchAutoValue(client)
      .then(v => { setAutoValue(v); setLoading(false) })
      .catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isCustom = Boolean(props.value?.trim?.())

  const badgeTone  = isCustom ? 'caution' : 'positive'
  const badgeLabel = loading
    ? '⏳ Calcul en cours…'
    : isCustom
      ? `✏️ Personnalisé  ·  valeur auto : ${autoValue}`
      : `🤖 Automatique  ·  valeur calculée : ${autoValue}`

  return (
    <Stack space={3}>
      <Box>
        <Badge tone={badgeTone} style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          {badgeLabel}
        </Badge>
      </Box>
      {props.renderDefault(props)}
      {isCustom && (
        <Text size={1} muted>
          💡 Effacez ce champ pour revenir à la valeur automatique.
        </Text>
      )}
    </Stack>
  )
}

// ── Note moyenne ───────────────────────────────────────────────────────────────
export function ScoreInput(props) {
  return (
    <AutoValueInput
      props={props}
      fetchAutoValue={async (client) => {
        const temos = await client.fetch(`*[_type == "temoignage"]{ note }`)
        if (!temos.length) return '5.0'
        const avg = temos.reduce((s, t) => s + (t.note ?? 5), 0) / temos.length
        return avg.toFixed(1)
      }}
    />
  )
}

// ── Nombre de témoignages ──────────────────────────────────────────────────────
export function NombreInput(props) {
  return (
    <AutoValueInput
      props={props}
      fetchAutoValue={async (client) => {
        const count = await client.fetch(`count(*[_type == "temoignage"])`)
        return `${count} témoignage${count !== 1 ? 's' : ''}`
      }}
    />
  )
}

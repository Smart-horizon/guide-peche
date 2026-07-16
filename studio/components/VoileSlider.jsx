/**
 * VoileSlider.jsx
 * Curseur "Épaisseur du voile bleu" du Hero (sectionHero.voile).
 *
 * Sanity n'a pas d'input curseur natif pour les nombres (NumberOptions
 * n'accepte que les listes d'énumération) — d'où ce composant.
 *
 * 50 = réglage d'origine. La valeur pilote un multiplicateur (v/50) appliqué
 * aux alphas du dégradé du hero — même calcul que voileMult/voileAlpha dans
 * src/components/PageBuilderSections.astro. ⚠️ Les deux doivent rester alignés.
 *
 * À 50 le champ est retiré du document (unset) : le réglage d'origine reste
 * l'absence de valeur, et les heros existants ne sont jamais modifiés.
 *
 * L'aperçu reprend la vraie photo du hero + un titre blanc témoin, pour régler
 * à l'œil sans quitter le Studio.
 */

import React from 'react'
import { set, unset, useClient, useFormValue } from 'sanity'
import { Stack, Text, Box, Flex, Badge, Button } from '@sanity/ui'
import imageUrlBuilder from '@sanity/image-url'

const NEUTRE = 50

// ⚠️ Miroir de voileMult/voileAlpha (PageBuilderSections.astro)
const mult = (v) => Math.min(100, Math.max(0, v)) / NEUTRE
const alpha = (base, k) => +Math.min(1, base * k).toFixed(3)

// Dégradé du hero image (heroBg) — mêmes paliers : .88 / .45 / .3
const gradientFor = (k) =>
  `linear-gradient(to top, rgba(7,24,31,${alpha(0.88, k)}) 0%, rgba(13,43,62,${alpha(0.45, k)}) 60%, rgba(13,43,62,${alpha(0.3, k)}) 100%)`

export function VoileSlider(props) {
  const { value, onChange, path, elementProps } = props

  const v = typeof value === 'number' ? value : NEUTRE
  const k = mult(v)

  // Le champ frère "image" du même objet sectionHero
  const hero = useFormValue(path.slice(0, -1))
  const client = useClient({ apiVersion: '2024-01-01' })

  let url = null
  try {
    if (hero?.image?.asset) url = imageUrlBuilder(client).image(hero.image).width(900).auto('format').url()
  } catch {
    url = null // asset pas encore résolu (upload en cours)
  }

  const commit = (n) => onChange(n === NEUTRE ? unset() : set(n))

  const tone = v === NEUTRE ? 'default' : v > NEUTRE ? 'primary' : 'caution'
  const etiquette =
    v === NEUTRE ? "50 · réglage d'origine" : v === 0 ? '0 · aucun voile' : String(v)

  return (
    <Stack space={3}>
      <Flex align="center" gap={3}>
        <input
          {...elementProps}
          type="range"
          min={0}
          max={100}
          step={5}
          value={v}
          onChange={(e) => commit(Number(e.currentTarget.value))}
          style={{ flex: 1, accentColor: '#1B5E8A', cursor: 'pointer' }}
        />
        <Box style={{ minWidth: 130, textAlign: 'right' }}>
          <Badge tone={tone}>{etiquette}</Badge>
        </Box>
        {v !== NEUTRE && (
          <Button mode="bleed" fontSize={1} text="Réinitialiser" onClick={() => commit(NEUTRE)} />
        )}
      </Flex>

      {url ? (
        <Box
          style={{
            position: 'relative',
            height: 190,
            borderRadius: 6,
            overflow: 'hidden',
            background: `${gradientFor(k)}, url(${url}) center/cover no-repeat`,
          }}
        >
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '18px 20px',
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#fff',
                fontSize: 26,
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              {hero?.titre || 'Titre du hero'}
            </span>
            {hero?.sousTitre && (
              <span style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, marginTop: 6 }}>
                {hero.sousTitre}
              </span>
            )}
          </Box>
        </Box>
      ) : (
        <Text size={1} muted>
          {hero?.videoYoutubeUrl || hero?.videoUrl
            ? '🎬 Ce hero utilise une vidéo : le voile s’y applique aussi, mais l’aperçu n’est possible que sur une photo.'
            : '📷 Ajoutez une photo de fond ci-dessus pour voir l’aperçu du voile.'}
        </Text>
      )}
    </Stack>
  )
}

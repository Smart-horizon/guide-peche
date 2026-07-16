/**
 * VoileSlider.jsx
 * Curseurs "Épaisseur du voile bleu" du Hero — deux champs distincts :
 *   · sectionHero.voile       → voile de la PHOTO (fond, ou poster d'une vidéo)
 *   · sectionHero.voileVideo  → voile de la VIDÉO une fois démarrée
 *
 * Pourquoi deux : sur un hero vidéo, la photo sert de poster au démarrage et
 * elle est peinte AU-DESSUS de .pb-hero__overlay (z-index 1 vs auto). Les deux
 * calques sont donc voilés séparément — et n'ont de toute façon pas la même
 * luminosité.
 *
 * Sanity n'a pas d'input curseur natif pour les nombres (NumberOptions
 * n'accepte que les listes d'énumération) — d'où ce composant.
 *
 * 50 = réglage d'origine. La valeur pilote un multiplicateur (v/50) appliqué
 * aux alphas du dégradé — même calcul que voileMult/voileAlpha dans
 * src/components/PageBuilderSections.astro. ⚠️ Les deux doivent rester alignés.
 *
 * À 50 le champ est retiré du document (unset) : le réglage d'origine reste
 * l'absence de valeur, et les heros existants ne sont jamais modifiés.
 */

import React from 'react'
import { set, unset, useClient, useFormValue } from 'sanity'
import { Stack, Text, Box, Flex, Badge, Button } from '@sanity/ui'
import imageUrlBuilder from '@sanity/image-url'

const NEUTRE = 50

// ⚠️ Miroir de voileMult/voileAlpha (PageBuilderSections.astro)
const mult = (v) => Math.min(100, Math.max(0, v)) / NEUTRE
const alpha = (base, k) => +Math.min(1, base * k).toFixed(3)

// Paliers du dégradé — distincts selon le calque, comme côté site :
//   photo (heroBg)          : .88 / .45 à 60% / .3
//   vidéo (.pb-hero__overlay): .88 / .5  à 55% / .25
const PALIERS = {
  photo: [[0.88, 0], [0.45, 60], [0.3, 100]],
  video: [[0.88, 0], [0.5, 55], [0.25, 100]],
}

const gradientFor = (k, calque) =>
  `linear-gradient(to top, ${PALIERS[calque]
    .map(([base, pos], i) =>
      `rgba(${i === 0 ? '7,24,31' : '13,43,62'},${alpha(base, k)}) ${pos}%`)
    .join(', ')})`

function Curseur({ props, calque }) {
  const { value, onChange, path, elementProps } = props

  const v = typeof value === 'number' ? value : NEUTRE
  const k = mult(v)

  // L'objet sectionHero parent (champs frères : image, titre, vidéo…)
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
        <Stack space={2}>
          <Box
            style={{
              position: 'relative',
              height: 190,
              borderRadius: 6,
              overflow: 'hidden',
              background: `${gradientFor(k, calque)}, url(${url}) center/cover no-repeat`,
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
          {calque === 'video' && (
            <Text size={1} muted>
              ⚠️ Aperçu posé sur la photo, faute de pouvoir afficher la vidéo ici : il
              montre l’épaisseur du voile, pas la luminosité réelle de la vidéo. Vérifiez
              avec « 👁️ Aperçu du site ».
            </Text>
          )}
        </Stack>
      ) : (
        <Text size={1} muted>
          📷 Ajoutez une photo de fond ci-dessus pour voir l’aperçu du voile.
        </Text>
      )}
    </Stack>
  )
}

export function VoilePhotoSlider(props) {
  return <Curseur props={props} calque="photo" />
}

export function VoileVideoSlider(props) {
  return <Curseur props={props} calque="video" />
}

/**
 * SectionOrderManager.jsx — v6
 * Layout deux colonnes :
 *   Gauche  : liste des sections (drag & drop, gear, toggle, supprimer)
 *   Droite  : panneau de configuration ouvert via ⚙️
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useClient } from 'sanity'
import {
  Box, Card, Stack, Flex, Text, Button, Switch, Dialog,
  Spinner, Badge, Grid, TextInput, TextArea, Select, Label,
} from '@sanity/ui'

const PROJECT_ID = 'uievv97s'
const DATASET    = 'production'

// ── Utilitaires ───────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36) }

function sanityThumb(ref, w = 360) {
  if (!ref) return null
  try {
    const clean = ref.replace(/^image-/, '')
    const parts = clean.split('-')
    const fmt = parts.pop()
    const dim = parts.pop()
    const id  = parts.join('-')
    return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dim}.${fmt}?w=${w}&h=${Math.round(w * 0.55)}&fit=crop`
  } catch { return null }
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, k) => acc?.[k], obj)
}

// ── Configs des champs ────────────────────────────────────────────────────────
const HERO_FIELDS = [
  { path: 'hero.badge',        label: 'Badge (petit texte)',           type: 'text'     },
  { path: 'hero.eyebrow',      label: 'Texte au-dessus du titre',      type: 'text'     },
  { path: 'hero.titre',        label: 'Titre principal',               type: 'text'     },
  { path: 'hero.titreItalic',  label: 'Titre italique (2ème ligne)',   type: 'text'     },
  { path: 'hero.texte',        label: 'Texte de présentation',         type: 'textarea' },
  { path: 'hero.image',        label: 'Photo de fond (plein écran)',   type: 'image'    },
  { path: 'hero.bouton1Texte', label: 'Bouton 1 — texte',              type: 'text'     },
  { path: 'hero.bouton1Lien',  label: 'Bouton 1 — lien',               type: 'text'     },
  { path: 'hero.bouton2Texte', label: 'Bouton 2 — texte',              type: 'text'     },
  { path: 'hero.bouton2Lien',  label: 'Bouton 2 — lien',               type: 'text'     },
]

const CTA_FIELDS = [
  { path: 'cta.titre',     label: 'Titre',                   type: 'text'     },
  { path: 'cta.texte',     label: 'Texte',                   type: 'textarea' },
  { path: 'cta.telephone', label: 'Téléphone',               type: 'text'     },
  { path: 'cta.email',     label: 'Email',                   type: 'text'     },
  { path: 'cta.btn1Texte', label: 'Bouton 1 — texte',        type: 'text'     },
  { path: 'cta.btn1Lien',  label: 'Bouton 1 — lien',         type: 'text'     },
  { path: 'cta.btn2Texte', label: 'Bouton 2 — texte',        type: 'text'     },
  { path: 'cta.btn2Lien',  label: 'Bouton 2 — lien',         type: 'text'     },
]

const MAIN_SECTIONS = [
  {
    id: 'prestations', emoji: '🎣', label: 'Stages & Guidages', defaultPos: 1,
    fields: [
      { path: 'prestations.eyebrow', label: 'Texte au-dessus du titre', type: 'text' },
      { path: 'prestations.titre',   label: 'Titre de la section',      type: 'text' },
    ],
    note: '5 cartes incluses : Eau douce · Bar · Masterclass · Spey · Bon cadeau',
  },
  {
    id: 'guide', emoji: '👤', label: 'Le Guide', defaultPos: 2,
    fields: [
      { path: 'guide.eyebrow',     label: 'Texte au-dessus du titre', type: 'text'     },
      { path: 'guide.nom',         label: 'Nom affiché',              type: 'text'     },
      { path: 'guide.accroche',    label: "Phrase d'accroche",        type: 'textarea' },
      { path: 'guide.bio',         label: 'Biographie',               type: 'textarea' },
      { path: 'guide.photo',       label: 'Photo de Jean-Baptiste',   type: 'image'    },
      { path: 'guide.boutonTexte', label: 'Bouton — texte',           type: 'text'     },
      { path: 'guide.boutonLien',  label: 'Bouton — lien',            type: 'text'     },
    ],
    note: 'Les statistiques clés (chiffres) ne sont pas modifiables ici.',
  },
  {
    id: 'bar', emoji: '🌊', label: 'Bar à la mouche', defaultPos: 3,
    fields: [
      { path: 'bar.eyebrow',     label: 'Texte au-dessus du titre', type: 'text'     },
      { path: 'bar.titre',       label: 'Titre',                    type: 'text'     },
      { path: 'bar.texte',       label: 'Texte',                    type: 'textarea' },
      { path: 'bar.image',       label: 'Photo (colonne droite)',   type: 'image'    },
      { path: 'bar.boutonTexte', label: 'Bouton — texte',           type: 'text'     },
      { path: 'bar.boutonLien',  label: 'Bouton — lien',            type: 'text'     },
    ],
  },
  {
    id: 'materiel', emoji: '🎿', label: 'Matériel & Univers', defaultPos: 5,
    fields: [
      { path: 'materiel.eyebrow',         label: 'Texte au-dessus du titre',     type: 'text'  },
      { path: 'materiel.titre',           label: 'Titre de la section',          type: 'text'  },
      { path: 'materiel.featuredImage',   label: 'Photo carte principale',       type: 'image' },
      { path: 'materiel.featuredEyebrow', label: 'Carte principale — sous-titre', type: 'text' },
      { path: 'materiel.featuredTitre',   label: 'Carte principale — titre',     type: 'text'  },
      { path: 'materiel.featuredLien',    label: 'Carte principale — lien',      type: 'text'  },
    ],
    note: 'Sous-liens et cartes secondaires non modifiables ici.',
  },
  {
    id: 'temo', emoji: '⭐', label: 'Témoignages', defaultPos: 6,
    fields: [
      { path: 'temo.eyebrow',  label: 'Texte au-dessus',     type: 'text'      },
      { path: 'temo.score',    label: 'Note globale',         type: 'auto-text', autoKey: 'score'  },
      { path: 'temo.nombre',   label: 'Nombre de témoignages', type: 'auto-text', autoKey: 'nombre' },
      { path: 'temo.pitch',    label: 'Texte de confiance',   type: 'textarea'  },
      { path: 'temo.ctaTexte', label: 'Bouton — texte',       type: 'text'      },
      { path: 'temo.ctaLien',  label: 'Bouton — lien',        type: 'text'      },
    ],
  },
]

const LIBRE_TYPES = [
  {
    sanityType: 'texteImage', emoji: '📝', label: 'Texte + image',
    description: 'Photo à gauche ou à droite avec texte et bouton',
    defaults: { eyebrow: 'Nouveauté', titre: 'Titre de votre section', texte: 'Décrivez ici votre contenu.', disposition: 'image-droite', boutonTexte: 'En savoir plus', boutonLien: '/contact' },
  },
  {
    sanityType: 'promo', emoji: '🌟', label: 'Mise en avant',
    description: 'Fond sombre, grand titre accrocheur et bouton',
    defaults: { eyebrow: 'À ne pas manquer', titre: 'Titre de la mise en avant', texte: 'Décrivez ici votre offre.', boutonTexte: 'Réserver', boutonLien: '/contact' },
  },
  {
    sanityType: 'cartes', emoji: '🃏', label: 'Galerie de cartes',
    description: 'Grille de cartes avec photos, titres et liens',
    defaults: {
      eyebrow: 'À découvrir', titre: 'Titre de votre galerie',
      cartes: [
        { _type: 'carte', label: 'Sortie 1', sub: 'Lieu · espèce', href: '/contact' },
        { _type: 'carte', label: 'Sortie 2', sub: 'Lieu · espèce', href: '/contact' },
      ],
    },
  },
  {
    sanityType: 'banniere', emoji: '📢', label: 'Bannière',
    description: 'Message centré avec ou sans bouton',
    defaults: { eyebrow: 'À retenir', titre: 'Votre message important', boutonTexte: 'En savoir plus', boutonLien: '/contact', fond: 'sable' },
  },
]

const LIBRE_FIELDS = {
  texteImage: [
    { name: 'eyebrow',     label: 'Texte au-dessus du titre', type: 'text'     },
    { name: 'titre',       label: 'Titre',                    type: 'text'     },
    { name: 'texte',       label: 'Texte',                    type: 'textarea' },
    { name: 'boutonTexte', label: 'Bouton — texte',           type: 'text'     },
    { name: 'boutonLien',  label: 'Bouton — lien',            type: 'text'     },
    { name: 'disposition', label: 'Disposition de la photo', type: 'select',
      options: [{ title: 'Image à droite', value: 'image-droite' }, { title: 'Image à gauche', value: 'image-gauche' }] },
    { name: 'image', label: 'Photo', type: 'image' },
  ],
  promo: [
    { name: 'eyebrow',     label: 'Texte au-dessus du titre', type: 'text'     },
    { name: 'titre',       label: 'Titre',                    type: 'text'     },
    { name: 'texte',       label: 'Texte',                    type: 'textarea' },
    { name: 'boutonTexte', label: 'Bouton — texte',           type: 'text'     },
    { name: 'boutonLien',  label: 'Bouton — lien',            type: 'text'     },
    { name: 'image',       label: 'Photo (optionnelle)',      type: 'image'    },
  ],
  cartes: [
    { name: 'eyebrow', label: 'Texte au-dessus du titre', type: 'text' },
    { name: 'titre',   label: 'Titre',                    type: 'text' },
  ],
  banniere: [
    { name: 'eyebrow',     label: 'Texte au-dessus du titre', type: 'text'     },
    { name: 'titre',       label: 'Titre',                    type: 'text'     },
    { name: 'texte',       label: 'Texte',                    type: 'textarea' },
    { name: 'boutonTexte', label: 'Bouton — texte',           type: 'text'     },
    { name: 'boutonLien',  label: 'Bouton — lien',            type: 'text'     },
    { name: 'fond', label: 'Couleur de fond', type: 'select',
      options: [{ title: 'Beige (clair)', value: 'sable' }, { title: 'Blanc', value: 'blanc' }, { title: 'Bleu (sombre)', value: 'ocean' }] },
  ],
}

// ── Champ image ───────────────────────────────────────────────────────────────
function ImageField({ label, imageRef, onUpload, isUploading }) {
  const fileRef = useRef()
  const thumb   = sanityThumb(imageRef)
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {thumb ? (
          <img src={thumb} alt={label}
            style={{ width: '100%', maxWidth: 340, height: 90, objectFit: 'cover', borderRadius: 8, display: 'block', border: '1px solid rgba(0,0,0,0.08)' }} />
        ) : (
          <div style={{ width: '100%', maxWidth: 340, height: 60, background: 'rgba(0,0,0,0.04)', borderRadius: 8, border: '1px dashed rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: '#aaa' }}>Aucune photo</span>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => { if (e.target.files?.[0]) { onUpload(e.target.files[0]); e.target.value = '' } }} />
        <button
          disabled={isUploading}
          onClick={() => fileRef.current?.click()}
          style={{
            alignSelf: 'flex-start',
            background: isUploading ? 'rgba(0,0,0,0.04)' : 'white',
            border: '1px solid rgba(0,0,0,0.18)',
            borderRadius: 6, cursor: isUploading ? 'default' : 'pointer',
            fontSize: 12, padding: '5px 12px', color: isUploading ? '#aaa' : '#333',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
          {isUploading ? <><Spinner muted />&nbsp;Envoi en cours…</> : (thumb ? '🔄 Changer la photo' : '📷 Ajouter une photo')}
        </button>
      </div>
    </div>
  )
}

// ── Champ texte générique ─────────────────────────────────────────────────────
function TextField({ label, value, onChange, multiline }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 6 }}>
        {label}
      </div>
      {multiline
        ? <TextArea key={label + '|' + value} fontSize={1} rows={3}
            defaultValue={value ?? ''} onBlur={e => onChange(e.target.value)}
            style={{ width: '100%' }} />
        : <TextInput key={label + '|' + value} fontSize={1}
            defaultValue={value ?? ''} onBlur={e => onChange(e.target.value)}
            style={{ width: '100%' }} />
      }
    </div>
  )
}

// ── Champ select générique ────────────────────────────────────────────────────
function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 6 }}>
        {label}
      </div>
      <Select fontSize={1} value={value ?? options[0]?.value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.title}</option>)}
      </Select>
    </div>
  )
}

// ── Panneau de configuration (colonne droite) ─────────────────────────────────
function ConfigPanel({
  heading, subheading, typeBadge,
  fields, isLibre, section, note, doc,
  onPatchMain, onImageUploadMain,
  onPatchLibre, onImageUploadLibre,
  uploading, saving,
  autoValues,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* En-tête du panneau */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>{heading.split(' ')[0]}</span>
              <span style={{ fontSize: 17, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>
                {heading.split(' ').slice(1).join(' ')}
              </span>
            </div>
            {subheading && (
              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#999', letterSpacing: '0.04em' }}>{subheading}</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {saving && <Spinner muted />}
            {typeBadge && (
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: 'rgba(34,118,252,0.1)', color: '#2276fc' }}>
                {typeBadge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Corps scrollable */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '20px 24px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520 }}>

          {fields.map(f => {
            // ── Champ avec badge auto/personnalisé ─────────────────────────
            if (f.type === 'auto-text') {
              const currentVal = getByPath(doc, f.path)
              const autoVal    = autoValues?.[f.autoKey]
              const isCustom   = Boolean(currentVal?.trim?.())
              return (
                <div key={f.path}>
                  <div style={{
                    display: 'inline-block', marginBottom: 8,
                    fontSize: 10, fontWeight: 600, padding: '2px 9px', borderRadius: 4,
                    background: isCustom ? 'rgba(245,166,35,0.12)' : 'rgba(46,160,67,0.12)',
                    color:      isCustom ? '#b77800'               : '#1a7f37',
                    border:    `1px solid ${isCustom ? 'rgba(245,166,35,0.3)' : 'rgba(46,160,67,0.3)'}`,
                  }}>
                    {isCustom
                      ? `✏️ Personnalisé · auto : ${autoVal ?? '…'}`
                      : `🤖 Automatique · valeur : ${autoVal ?? '…'}`}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 6 }}>
                    {f.label}
                  </div>
                  <TextInput
                    key={f.path + '|' + currentVal}
                    fontSize={1}
                    defaultValue={currentVal ?? ''}
                    placeholder={autoVal ? `Auto : ${autoVal}` : ''}
                    onBlur={e => onPatchMain(f.path, e.target.value)}
                    style={{ width: '100%' }}
                  />
                  {isCustom && (
                    <div style={{ fontSize: 11, color: '#999', marginTop: 5 }}>
                      💡 Effacez ce champ pour revenir à la valeur automatique.
                    </div>
                  )}
                </div>
              )
            }

            if (isLibre) {
              if (f.type === 'image') {
                return (
                  <ImageField key={f.name} label={f.label}
                    imageRef={section?.image?.asset?._ref}
                    isUploading={uploading === section?._id + '.image'}
                    onUpload={file => onImageUploadLibre(section._id, file)} />
                )
              }
              if (f.type === 'select') {
                return (
                  <SelectField key={f.name} label={f.label}
                    value={section?.[f.name]} options={f.options}
                    onChange={val => onPatchLibre(f.name, val)} />
                )
              }
              return (
                <TextField key={f.name} label={f.label}
                  value={section?.[f.name]}
                  multiline={f.type === 'textarea'}
                  onChange={val => onPatchLibre(f.name, val)} />
              )
            } else {
              const currentVal = getByPath(doc, f.path)
              if (f.type === 'image') {
                return (
                  <ImageField key={f.path} label={f.label}
                    imageRef={currentVal?.asset?._ref}
                    isUploading={uploading === f.path}
                    onUpload={file => onImageUploadMain(f.path, file)} />
                )
              }
              return (
                <TextField key={f.path} label={f.label}
                  value={currentVal}
                  multiline={f.type === 'textarea'}
                  onChange={val => onPatchMain(f.path, val)} />
              )
            }
          })}

          {/* Notes */}
          {note && (
            <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: 12, color: '#888' }}>ℹ️&nbsp; {note}</span>
            </div>
          )}
          {isLibre && section?.sectionType === 'cartes' && (
            <div style={{ background: 'rgba(34,118,252,0.04)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(34,118,252,0.12)' }}>
              <span style={{ fontSize: 12, color: '#2276fc' }}>🃏&nbsp; Pour modifier les cartes individuelles → cliquez sur la section dans le menu latéral</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ── Bouton ⚙️ ─────────────────────────────────────────────────────────────────
function GearBtn({ active, onClick }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick() }}
      title={active ? 'Fermer la configuration' : 'Configurer cette section'}
      style={{
        width: 28, height: 28, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'rgba(34,118,252,0.12)' : 'transparent',
        border: active ? '1px solid rgba(34,118,252,0.25)' : '1px solid transparent',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 14, lineHeight: 1,
        color: active ? '#2276fc' : '#bbb',
        transition: 'all .15s',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#555' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#bbb' } }}>
      ⚙️
    </button>
  )
}

// ── Composant principal ───────────────────────────────────────────────────────
export function SectionOrderManager({ document: sanityDoc }) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const doc    = sanityDoc?.displayed ?? {}

  const [customDocs,    setCustomDocs]    = useState([])
  const [saving,        setSaving]        = useState(false)
  const [uploading,     setUploading]     = useState(null)
  const [dragId,        setDragId]        = useState(null)
  const [dragOverId,    setDragOverId]    = useState(null)
  const [selectedId,    setSelectedId]    = useState(null)
  const [showPicker,    setShowPicker]    = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [confirmHide,   setConfirmHide]   = useState(null)
  const [temoStats,     setTemoStats]     = useState(null)

  // Fetch stats pour les badges auto/personnalisé des champs temo.score et temo.nombre
  useEffect(() => {
    client.fetch(`*[_type == "temoignage"]{ note }`)
      .then(temos => {
        const count = temos.length
        const avg   = count > 0
          ? (temos.reduce((s, t) => s + (t.note ?? 5), 0) / count).toFixed(1)
          : '5.0'
        setTemoStats({ score: avg, nombre: `${count} témoignage${count !== 1 ? 's' : ''}` })
      })
      .catch(() => {})
  }, [client])

  useEffect(() => {
    const sub = client.listen('*[_type == "sectionAccueil"] | order(position asc)')
      .subscribe(() => {
        client.fetch('*[_type == "sectionAccueil"] | order(position asc)')
          .then(setCustomDocs).catch(console.error)
      })
    client.fetch('*[_type == "sectionAccueil"] | order(position asc)')
      .then(setCustomDocs).catch(console.error)
    return () => sub.unsubscribe()
  }, [client])

  const buildSections = useCallback(() => {
    const main = MAIN_SECTIONS.map(s => ({
      ...s, kind: 'main',
      position: doc[s.id]?.position ?? s.defaultPos,
      visible:  doc[s.id]?.visible  !== false,
    }))
    const libre = customDocs.map(l => {
      const info = LIBRE_TYPES.find(t => t.sanityType === l.sectionType)
      return {
        id: l._id, _id: l._id, kind: 'libre',
        label:     l.titre || '(sans titre)',
        emoji:     info?.emoji    ?? '➕',
        typeLabel: info?.label    ?? l.sectionType,
        position:  l.position ?? 99,
        visible:   l.visible  !== false,
        data:      l,
      }
    })
    return [...main, ...libre].sort((a, b) => a.position - b.position)
  }, [doc, customDocs])

  const [sections, setSections] = useState(() => buildSections())
  useEffect(() => { setSections(buildSections()) }, [buildSections])

  const saveOrder = useCallback(async (next) => {
    setSaving(true)
    try {
      const mp = {}
      next.forEach((s, i) => { if (s.kind === 'main') mp[`${s.id}.position`] = i + 1 })
      if (Object.keys(mp).length) await client.patch('accueil').set(mp).commit()
      await Promise.all(next.filter(s => s.kind === 'libre')
        .map(s => client.patch(s._id).set({ position: next.indexOf(s) + 1 }).commit()))
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }, [client])

  const toggleVisible = useCallback(async (id) => {
    const s = sections.find(x => x.id === id)
    if (!s) return
    const next = !s.visible
    setSaving(true)
    try {
      if (s.kind === 'main') await client.patch('accueil').set({ [`${s.id}.visible`]: next }).commit()
      else await client.patch(s._id).set({ visible: next }).commit()
      setSections(prev => prev.map(x => x.id === id ? { ...x, visible: next } : x))
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }, [client, sections])

  const patchMainField = useCallback(async (path, value) => {
    setSaving(true)
    try { await client.patch('accueil').set({ [path]: value }).commit() }
    catch (err) { console.error(err) }
    finally { setSaving(false) }
  }, [client])

  const uploadMainImage = useCallback(async (fieldPath, file) => {
    setUploading(fieldPath)
    try {
      const asset = await client.assets.upload('image', file, { filename: file.name })
      await client.patch('accueil').set({ [fieldPath]: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit()
    } catch (err) { window.alert('Erreur téléversement : ' + (err?.message ?? err)) }
    finally { setUploading(null) }
  }, [client])

  const patchLibreField = useCallback(async (docId, field, value) => {
    setSaving(true)
    try {
      await client.patch(docId).set({ [field]: value }).commit()
      setSections(prev => prev.map(s => {
        if (s._id !== docId) return s
        return { ...s, label: field === 'titre' ? (value || '(sans titre)') : s.label, data: { ...s.data, [field]: value } }
      }))
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }, [client])

  const uploadLibreImage = useCallback(async (docId, file) => {
    const key = docId + '.image'
    setUploading(key)
    try {
      const asset = await client.assets.upload('image', file, { filename: file.name })
      const imgObj = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
      await client.patch(docId).set({ image: imgObj }).commit()
      setCustomDocs(prev => prev.map(d => d._id === docId ? { ...d, image: imgObj } : d))
    } catch (err) { window.alert('Erreur téléversement : ' + (err?.message ?? err)) }
    finally { setUploading(null) }
  }, [client])

  const onDragStart = (e, id) => { setDragId(id); e.dataTransfer.effectAllowed = 'move' }
  const onDragOver  = (e, id) => { e.preventDefault(); if (id !== dragOverId) setDragOverId(id) }
  const onDrop = (e, targetId) => {
    e.preventDefault()
    if (!dragId || dragId === targetId) return
    const next = [...sections]
    const from = next.findIndex(s => s.id === dragId)
    const to   = next.findIndex(s => s.id === targetId)
    if (from < 0 || to < 0) return
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setSections(next)
    saveOrder(next)
    setDragId(null); setDragOverId(null)
  }
  const onDragEnd = () => { setDragId(null); setDragOverId(null) }

  const addLibre = useCallback(async (typeInfo) => {
    const defaults = { ...typeInfo.defaults }
    if (defaults.cartes) defaults.cartes = defaults.cartes.map(c => ({ ...c, _key: uid() }))
    setSaving(true)
    try {
      await client.create({ _type: 'sectionAccueil', sectionType: typeInfo.sanityType, position: sections.length + 1, visible: true, ...defaults })
      setShowPicker(false)
    } catch (err) { window.alert("Erreur : " + (err?.message ?? err)) }
    finally { setSaving(false) }
  }, [client, sections])

  const deleteLibre = useCallback(async (docId) => {
    setSaving(true)
    try {
      await client.delete(docId)
      setSections(prev => prev.filter(s => s._id !== docId))
      if (selectedId === docId) setSelectedId(null)
    } catch (err) { console.error(err) }
    finally { setSaving(false); setConfirmDelete(null) }
  }, [client, selectedId])

  const selectSection = (id) => setSelectedId(prev => prev === id ? null : id)

  // Contenu panneau droit
  const getRightPanel = () => {
    if (!selectedId) return null
    if (selectedId === '__hero') return { heading: '🖼️ Hero (bannière principale)', subheading: 'Toujours en première position', fields: HERO_FIELDS, isLibre: false }
    if (selectedId === '__cta')  return { heading: "📞 Appel à l'action", subheading: 'Toujours en dernière position', fields: CTA_FIELDS, isLibre: false }
    const s = sections.find(x => x.id === selectedId)
    if (!s) return null
    if (s.kind === 'main') {
      const cfg = MAIN_SECTIONS.find(m => m.id === s.id)
      return { heading: `${s.emoji} ${s.label}`, subheading: null, fields: cfg?.fields ?? [], note: cfg?.note, isLibre: false }
    }
    return { heading: `${s.emoji} ${s.label}`, subheading: null, typeBadge: s.typeLabel, fields: LIBRE_FIELDS[s.data?.sectionType] ?? [], isLibre: true, section: s.data, docId: s._id }
  }
  const rightPanel = getRightPanel()

  // ── Rendu ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 600, background: 'var(--card-bg-color, white)' }}>

      {/* ═══════ COLONNE GAUCHE ═══════ */}
      <div style={{
        width: 268,
        flexShrink: 0,
        borderRight: '1px solid rgba(0,0,0,0.07)',
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.015)',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header liste */}
        <div style={{ padding: '16px 14px 10px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#666' }}>
              Sections
            </span>
            {saving && <Spinner muted />}
          </div>
          <div style={{ marginTop: 3, fontSize: 10, color: '#bbb', letterSpacing: '0.02em' }}>
            Glisser pour réordonner
          </div>
        </div>

        {/* Contenu liste */}
        <div style={{ padding: '8px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Hero — fixe */}
          <FixedRow emoji="🖼️" label="Hero" sub="Toujours en premier"
            active={selectedId === '__hero'} onGear={() => selectSection('__hero')} />

          {/* Séparateur */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '4px 4px' }} />

          {/* Sections ordonnables */}
          {sections.map(s => {
            const isDragging = dragId    === s.id
            const isDragOver = dragOverId === s.id && dragId !== s.id
            const isSelected = selectedId === s.id
            const isLibre    = s.kind === 'libre'

            return (
              <div key={s.id} draggable
                onDragStart={e => onDragStart(e, s.id)} onDragOver={e => onDragOver(e, s.id)}
                onDrop={e => onDrop(e, s.id)} onDragEnd={onDragEnd}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 8px',
                  borderRadius: 7,
                  cursor: 'grab',
                  userSelect: 'none',
                  opacity: s.visible ? 1 : 0.42,
                  background: isSelected ? 'rgba(34,118,252,0.07)' : isDragOver ? 'rgba(34,118,252,0.04)' : 'transparent',
                  borderLeft: isLibre ? '2.5px solid rgba(34,118,252,0.3)' : '2.5px solid transparent',
                  boxShadow: isDragging ? '0 3px 12px rgba(0,0,0,.12)' : 'none',
                  outline: isDragOver ? '1.5px dashed rgba(34,118,252,0.5)' : 'none',
                  transition: 'background .12s, opacity .2s',
                }}>

                {/* Grip */}
                <span style={{ fontSize: 13, color: '#ccc', lineHeight: 1, flexShrink: 0 }}>⠿⠿</span>

                {/* Label */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: isSelected ? 600 : 400, color: isSelected ? '#1a5fcb' : '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>
                    {s.emoji} {s.label}
                  </div>
                  {isLibre && (
                    <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{s.typeLabel}</div>
                  )}
                </div>

                {/* Badge masqué */}
                {!s.visible && (
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#f5a623', background: 'rgba(245,166,35,0.12)', padding: '2px 5px', borderRadius: 3, flexShrink: 0 }}>off</span>
                )}

                {/* Gear */}
                <GearBtn active={isSelected} onClick={() => selectSection(s.id)} />

                {/* Switch */}
                <Switch
                  style={{ flexShrink: 0 }}
                  checked={s.visible}
                  onChange={() => isLibre ? toggleVisible(s.id) : (s.visible ? setConfirmHide(s.id) : toggleVisible(s.id))} />

                {/* Supprimer (libre uniquement) */}
                {isLibre && (
                  <button onClick={() => setConfirmDelete(s._id)}
                    title="Supprimer"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ddd', fontSize: 16, lineHeight: 1, padding: '0 2px', flexShrink: 0, transition: 'color .15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e55'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ddd'}>
                    ×
                  </button>
                )}
              </div>
            )
          })}

          {/* Séparateur */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '4px 4px' }} />

          {/* Bouton + Ajouter */}
          <button
            onClick={() => setShowPicker(true)}
            style={{
              width: '100%', padding: '9px 8px',
              background: 'transparent', border: '1.5px dashed rgba(34,118,252,0.3)',
              borderRadius: 7, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              color: '#2276fc', fontSize: 12, fontWeight: 500,
              transition: 'background .12s, border-color .12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,118,252,0.05)'; e.currentTarget.style.borderColor = 'rgba(34,118,252,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(34,118,252,0.3)' }}>
            <span style={{ fontSize: 16, fontWeight: 300, lineHeight: 1 }}>+</span>
            Ajouter une section
          </button>

          {/* Séparateur */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '4px 4px' }} />

          {/* CTA — fixe */}
          <FixedRow emoji="📞" label="Appel à l'action" sub="Toujours en dernier"
            active={selectedId === '__cta'} onGear={() => selectSection('__cta')} />

        </div>
      </div>

      {/* ═══════ COLONNE DROITE ═══════ */}
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        {rightPanel ? (
          <ConfigPanel
            key={selectedId}
            heading={rightPanel.heading}
            subheading={rightPanel.subheading}
            typeBadge={rightPanel.typeBadge}
            fields={rightPanel.fields}
            note={rightPanel.note}
            isLibre={rightPanel.isLibre}
            section={rightPanel.section}
            doc={doc}
            onPatchMain={patchMainField}
            onImageUploadMain={uploadMainImage}
            onPatchLibre={(field, value) => patchLibreField(rightPanel.docId, field, value)}
            onImageUploadLibre={uploadLibreImage}
            uploading={uploading}
            saving={saving}
            autoValues={temoStats}
          />
        ) : (
          <div style={{ height: '100%', minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: 0.3, pointerEvents: 'none' }}>
            <div style={{ fontSize: 36 }}>⚙️</div>
            <div style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
              Cliquez sur ⚙️ pour configurer<br />une section
            </div>
          </div>
        )}
      </div>

      {/* Dialog : choisir le type */}
      {showPicker && (
        <Dialog header="Choisissez un type de section" id="type-picker"
          onClose={() => setShowPicker(false)} zOffset={1000} width={1}>
          <Box padding={4}>
            <Grid columns={2} gap={3}>
              {LIBRE_TYPES.map(t => (
                <Card key={t.sanityType} padding={4} radius={3} shadow={1}
                  style={{ cursor: 'pointer', transition: 'box-shadow .15s, transform .1s' }}
                  onClick={() => addLibre(t)}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 0 2px #2276fc'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}>
                  <Stack space={2}>
                    <Text size={4}>{t.emoji}</Text>
                    <Text size={2} weight="semibold">{t.label}</Text>
                    <Text size={1} muted>{t.description}</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Box>
        </Dialog>
      )}

      {/* Dialog : masquer */}
      {confirmHide && (() => {
        const s = sections.find(x => x.id === confirmHide)
        return (
          <Dialog header={`Masquer « ${s?.label} » ?`} id="confirm-hide"
            onClose={() => setConfirmHide(null)} zOffset={1000}
            footer={<Flex gap={2} padding={3} justify="flex-end">
              <Button mode="ghost" text="Annuler" onClick={() => setConfirmHide(null)} />
              <Button tone="caution" text="Masquer" onClick={() => { toggleVisible(confirmHide); setConfirmHide(null) }} />
            </Flex>}>
            <Box padding={4}><Text>La section sera masquée sur le site. Réaffichable via le switch.</Text></Box>
          </Dialog>
        )
      })()}

      {/* Dialog : supprimer */}
      {confirmDelete && (() => {
        const s = sections.find(x => x._id === confirmDelete)
        return (
          <Dialog header={`Supprimer « ${s?.label || 'cette section'} » ?`} id="confirm-delete"
            onClose={() => setConfirmDelete(null)} zOffset={1000}
            footer={<Flex gap={2} padding={3} justify="flex-end">
              <Button mode="ghost" text="Annuler" onClick={() => setConfirmDelete(null)} />
              <Button tone="critical" text="Supprimer définitivement" onClick={() => deleteLibre(confirmDelete)} />
            </Flex>}>
            <Box padding={4}><Text>Cette action est <strong>irréversible</strong>.</Text></Box>
          </Dialog>
        )
      })()}
    </div>
  )
}

// ── Ligne fixe (Hero / CTA) ───────────────────────────────────────────────────
function FixedRow({ emoji, label, sub, active, onGear }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '7px 8px',
      borderRadius: 7,
      background: active ? 'rgba(34,118,252,0.07)' : 'transparent',
      borderLeft: '2.5px solid transparent',
      opacity: active ? 1 : 0.55,
      transition: 'background .12s',
    }}>
      <span style={{ fontSize: 13, color: '#e0e0e0', lineHeight: 1, flexShrink: 0 }}>⠿⠿</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? '#1a5fcb' : '#444', lineHeight: 1.3 }}>
          {emoji} {label}
        </div>
        <div style={{ fontSize: 10, color: '#bbb' }}>{sub}</div>
      </div>
      <GearBtn active={active} onClick={onGear} />
    </div>
  )
}

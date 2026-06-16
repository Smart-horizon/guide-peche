// create-page-revue-presse.mjs
// Crée le document page /revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche dans Sanity

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envContent = readFileSync(join(__dirname, '../.env'), 'utf-8')
const env = {}
for (const line of envContent.split('\n')) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const idx = t.indexOf('=')
  if (idx === -1) continue
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim()
}

const client = createClient({
  projectId: 'uievv97s',
  dataset: 'production',
  token: env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const doc = {
  _id: 'page-revue-de-presse-jbvidal',
  _type: 'page',
  title: 'Revue de presse',
  slug: { _type: 'slug', current: 'revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche' },
  seoTitle: 'Revue de presse — Jean-Baptiste Vidal, Moniteur-Guide de pêche à la mouche',
  seoDescription: "Revue de presse de Jean-Baptiste Vidal : articles dans Pêche Mouche, Voyages de Pêche, Fly Life Australie, Field & Stream USA et bien d'autres publications françaises et étrangères.",
  pagebuilder: [
    {
      _type: 'sectionHero',
      _key: 'press-hero',
      eyebrow: 'Pêche Mouche · Voyages de Pêche · Field & Stream · Fly Life',
      titre: 'Revue de presse',
      sousTitre: "Plus de 15 ans de collaboration avec la presse spécialisée, en France et à l'étranger. Articles techniques, portraits, reportages de voyage et une couverture internationale.",
      hauteur: 'medium',
      btnReserverTexte: 'Réserver une sortie',
      btnReserverLien: '/contact',
    },
    {
      _type: 'sectionStats',
      _key: 'press-stats',
      fond: 'dark',
      stats: [
        { _type: 'stat', _key: 'stat-1', nombre: '14+', label: 'ans dans Pêche Mouche' },
        { _type: 'stat', _key: 'stat-2', nombre: '4',   label: 'magazines étrangers' },
        { _type: 'stat', _key: 'stat-3', nombre: '1',   label: 'couverture internationale' },
        { _type: 'stat', _key: 'stat-4', nombre: '2007–2025', label: 'période de publication' },
      ],
    },
    {
      _type: 'sectionTexte',
      _key: 'press-intro',
      texte: [
        {
          _type: 'block',
          _key: 'press-intro-p1',
          style: 'normal',
          markDefs: [],
          children: [
            { _type: 'span', _key: 's1', text: "Depuis novembre 2011 j'écrivais dans le magazine ", marks: [] },
            { _type: 'span', _key: 's2', text: 'Pêche Mouche', marks: ['strong'] },
            { _type: 'span', _key: 's3', text: ", qui a malheureusement été arrêté en janvier 2025. J'y ai collaboré pour différents articles : \"coins de pêche\", \"portraits\", \"technique de Pro\", et j'y ai créé puis animé pendant plusieurs années la rubrique de montage \"Mouches du moment\", puis \"Votre boîte à mouches\".", marks: [] },
          ],
        },
        {
          _type: 'block',
          _key: 'press-intro-p2',
          style: 'normal',
          markDefs: [],
          children: [
            { _type: 'span', _key: 's4', text: "J'écris également ponctuellement pour le ", marks: [] },
            { _type: 'span', _key: 's5', text: 'magazine des Voyages de Pêche', marks: ['strong'] },
            { _type: 'span', _key: 's6', text: " sur différents séjours à l'étranger, et j'ai pu apparaître dans des magazines étrangers, dont une couverture en Australie ! Ces dernières années, j'écris aussi très régulièrement sur le site ", marks: [] },
            { _type: 'span', _key: 's7', text: 'Pêche.com', marks: ['strong'] },
            { _type: 'span', _key: 's8', text: ', dont je gère toute la partie pêche à la mouche.', marks: [] },
          ],
        },
      ],
      largeur: 'normal',
      fond: 'sand',
    },
    {
      _type: 'sectionRevuePresse',
      _key: 'press-grid',
      fond: 'white',
    },
    {
      _type: 'sectionCta',
      _key: 'press-pechecom',
      titre: 'Pêche.com — Toute la partie mouche',
      texte: "Ces dernières années, j'écris très régulièrement sur le site Pêche.com, dont je m'occupe de toute la partie pêche à la mouche. Des articles sur de nombreux sujets : techniques, espèces, destinations, matériel.",
      btn1Texte: 'Lire mes articles sur Pêche.com',
      btn1Lien: 'https://www.peche.com/',
      btn2Texte: '',
      btn2Lien: '',
      style: 'sand',
    },
    {
      _type: 'sectionCta',
      _key: 'press-cta',
      titre: 'Journalistes & photographes',
      texte: "Disponible pour des reportages, interviews ou accompagnements photo sur le terrain en Bretagne et à l'étranger.",
      btn1Texte: 'Me contacter',
      btn1Lien: '/contact-jeanbaptiste-vidal-guide-de-peche',
      btn2Texte: 'Voir les vidéos',
      btn2Lien: '/videos-jeanbaptiste-vidal-moniteur-guide-de-peche',
      style: 'dark',
    },
  ],
}

console.log('📄 Création du document page revue de presse...')
try {
  const result = await client.createOrReplace(doc)
  console.log(`✅ Page créée : ${result._id}`)
  console.log('   slug : /revue-de-presse-jeanbaptiste-vidal-moniteur-guide-de-peche')
  console.log('\nDéploie maintenant : bash deploy.sh')
} catch (err) {
  console.error('❌ Erreur :', err.message)
}

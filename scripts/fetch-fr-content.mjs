import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { writeFileSync } from 'fs'
config()

const client = createClient({
  projectId: 'uievv97s', dataset: 'production',
  useCdn: false, apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

// Extraire seulement les champs texte de chaque section
function extractTexts(pb) {
  if (!pb) return []
  return pb.map(s => {
    const base = { _key: s._key, _type: s._type }

    const txt = (blocks) => blocks?.filter(b => b._type === 'block')
      .map(b => b.children?.map(c => c.text).join('')).filter(Boolean).join(' | ')

    switch (s._type) {
      case 'sectionHero':
        return { ...base, eyebrow: s.eyebrow, titre: s.titre, sousTitre: s.sousTitre, btnReserverTexte: s.btnReserverTexte, btnMaterielLabel: s.btnMaterielLabel, btnYoutubeTexte: s.btnYoutubeTexte, stats: s.statsHero?.map(st => ({ nombre: st.nombre, label: st.label })) }
      case 'sectionIntro':
        return { ...base, eyebrow: s.eyebrow, titre: s.titre, texte: txt(s.texte), niveau: s.niveau, format: s.format, saison: s.saison, tarif: s.tarif, duree: s.duree, lignesSupp: s.lignesSupp?.map(l => ({ label: l.label, valeur: l.valeur, note: l.note })), boutons: s.boutons?.map(b => ({ texte: b.texte, lien: b.lien })) }
      case 'sectionTexte':
        return { ...base, texte: txt(s.texte) }
      case 'sectionProgrammeTexte':
        return { ...base, eyebrow: s.eyebrow, titre: s.titre, intro: s.intro, colonnes: s.colonnes?.map(c => ({ label: c.label, items: c.items?.map(i => ({ texte: i.texte })) })) }
      case 'sectionCta':
        return { ...base, titre: s.titre, texte: s.texte, btn1Texte: s.btn1Texte, btn1Lien: s.btn1Lien, btn2Texte: s.btn2Texte, btn2Lien: s.btn2Lien }
      case 'sectionVideo':
        return { ...base, titre: s.titre, description: txt(s.description) }
      case 'sectionVideos':
        return { ...base, titre: s.titre, description: s.description, items: s.items?.map(i => ({ titre: i.titre, description: i.description })) }
      default:
        return { ...base, titre: s.titre, texte: txt(s.texte) }
    }
  })
}

const prestations = await client.fetch(`
  *[_type=="prestation" && !defined(pagebuilderEn)]{
    _id, "slug": slug.current, title,
    seoTitle, seoDescription,
    pagebuilder[]{ ..., texte[]{ _type, style, children[]{ _type, text, marks } }, description[]{ _type, style, children[]{ _type, text, marks } } }
  }
`)

const compact = prestations.map(p => ({
  id: p._id,
  slug: p.slug,
  title: p.title,
  seoTitle: p.seoTitle,
  seoDescription: p.seoDescription,
  sections: extractTexts(p.pagebuilder),
  // Keep original pagebuilder for reconstruction
  _pagebuilder: p.pagebuilder,
}))

writeFileSync('./scripts/fr-content.json', JSON.stringify(compact, null, 2))
console.log(`Wrote ${compact.length} prestations to scripts/fr-content.json`)
compact.forEach(p => console.log(`  ${p.slug}: ${p.sections.length} sections`))

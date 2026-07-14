import { defineMiddleware } from 'astro/middleware'

const PROTECTED = ['/disponibilites-guidages', '/en/disponibilites-guidages']

// Domaine canonique du site (celui qui garde tout le jus SEO)
const MAIN = 'https://www.jeanbaptistevidalguidepeche.com'

// enjoyfishingbrittany.com → /en/ du site principal (mapping page à page,
// sitemap Wix du 14/07/2026 — le site est SEO-mort, seul le trafic de marque compte)
const EN_SITE_MAP = {
  '/rates': '/en/tarifs',
  '/your-guide': '/en/jean-baptiste-vidal-moniteur-guide-de-peche',
  '/about-3': '/en/jean-baptiste-vidal-moniteur-guide-de-peche',
  '/why-booking-with-us': '/en/jean-baptiste-vidal-moniteur-guide-de-peche',
  '/sight-fshing-for-sea-bass': '/en/peche-du-bar-a-vue-a-la-mouche',
  '/sea-bass-boat-fishing': '/en/peche-mouche-bar-bateau-bretagne',
  '/saltwater-fly-fishing': '/en/peche-du-bar-a-la-mouche',
  '/freshwater-fly-fishing': '/en/peche-a-la-mouche-en-bretagne',
  '/trout-fishing': '/en/peche-de-la-truite-a-la-mouche-en-bretagne',
  '/shad-fishing': '/en/peche-de-l-alose-a-la-mouche',
  '/bateaux-de-p%C3%AAche': '/en/bateau-bar-a-la-mouche',
  '/galerie': '/en/',
  '/location-enjoy-fishing-brittany': '/en/contact',
  '/contact-us': '/en/contact',
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { hostname, pathname } = ctx.url

  // ── Redirections par domaine (inertes tant que ces domaines ne pointent pas
  //    vers ce worker — activées au lancement en les attachant au worker) ─────

  // enjoyfishing.fr (ancien blog) → /blog/ du site principal
  if (hostname.endsWith('enjoyfishing.fr')) {
    const article = pathname.match(/^\/archive\/\d{4}\/\d{2}\/\d{2}\/(.+)\.html$/)
    if (article) return ctx.redirect(`${MAIN}/blog/${article[1]}`, 301)
    if (pathname.startsWith('/video')) return ctx.redirect(`${MAIN}/videos-jeanbaptiste-vidal-moniteur-guide-de-peche`, 301)
    if (pathname.startsWith('/voyages')) return ctx.redirect(`${MAIN}/voyages-peche-mouche`, 301)
    return ctx.redirect(`${MAIN}/blog`, 301) // accueil, /tag/*, archives mensuelles…
  }

  // enjoyfishingbrittany.com (ancien site anglais) → /en/ du site principal
  if (hostname.endsWith('enjoyfishingbrittany.com')) {
    const cible = EN_SITE_MAP[pathname] ?? EN_SITE_MAP[decodeURIComponent(pathname)] ?? '/en/'
    return ctx.redirect(`${MAIN}${cible}`, 301)
  }

  // NB : PAS de règle apex → www ici — Astro prérend les pages avec le host du
  // `site` (l'apex), une telle règle transformerait tout le build en pages de
  // redirection. L'apex → www se fera par une Redirect Rule Cloudflare au
  // lancement (cf. docs/mapping-301.md).

  // ── Protection de la page disponibilités ────────────────────────────────────
  if (PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    const auth = ctx.cookies.get('dispo_auth')
    if (!auth?.value) {
      return ctx.redirect(`/disponibilites-login?r=${encodeURIComponent(pathname)}`)
    }
  }

  return next()
})

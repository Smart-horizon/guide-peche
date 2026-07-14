import { defineMiddleware } from 'astro/middleware'

const PROTECTED = ['/disponibilites-guidages', '/en/disponibilites-guidages']

// ⚠️ Ne PAS mettre de redirections de domaine/URL ici : le middleware s'exécute
// pendant le prerender Astro (host du build = celui de `site`) et ne tourne PAS
// au runtime pour les pages statiques. Toutes les redirections 301 du lancement
// passent par public/_redirects (chemins) et par des Redirect Rules Cloudflare
// (domaines) — cf. docs/mapping-301.md.

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url

  if (PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    const auth = ctx.cookies.get('dispo_auth')
    if (!auth?.value) {
      return ctx.redirect(`/disponibilites-login?r=${encodeURIComponent(pathname)}`)
    }
  }

  return next()
})

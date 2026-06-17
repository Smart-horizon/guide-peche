import { defineMiddleware } from 'astro/middleware'

const PROTECTED = ['/disponibilites-guidages']

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

import { defineMiddleware } from 'astro:middleware'

// Prevent Cloudflare edge from caching HTML responses.
// CDN-Cache-Control is the CF-specific header that takes priority over Cache-Control.
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next()
  const ct = response.headers.get('Content-Type') || ''
  if (ct.includes('text/html')) {
    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'no-store')
    headers.set('CDN-Cache-Control', 'no-store')
    headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
    return new Response(response.body, { status: response.status, headers })
  }
  return response
})

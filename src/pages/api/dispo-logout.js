export const prerender = false

export async function GET({ cookies, redirect }) {
  cookies.delete('dispo_auth', { path: '/' })
  return redirect('/disponibilites-login')
}

// Central settings — change these instead of hunting through components.
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
export const FORM_KEY = import.meta.env.VITE_FORM_KEY || ''

// Images live in src/assets/img (optimised WebP). Vite fingerprints them for caching in the normal
// build and inlines them in the single-file preview build. Reference them by path without extension,
// e.g. img('products/neon'). Anything that starts with http(s) or / is used as-is.
const FILES = import.meta.glob('./assets/img/**/*.{webp,png,jpg,jpeg,svg}', { eager: true, import: 'default' })
const BY_KEY = Object.fromEntries(Object.entries(FILES).map(([p, url]) => [p.replace('./assets/img/', '').replace(/\.[a-z]+$/i, ''), url]))

export const img = (p) => {
  if (!p) return ''
  if (/^(https?:)?\/\//.test(p) || p.startsWith('/') || p.startsWith('data:')) return p
  const key = p.replace(/\.[a-z]+$/i, '')
  if (import.meta.env.DEV && !BY_KEY[key]) console.warn('[img] missing asset:', key)
  return BY_KEY[key] || ''
}

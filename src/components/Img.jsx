import { useState } from 'react'
import { img as resolve } from '../config.js'
import { illSvg } from '../lib/illustrations.js'

/**
 * Image with a designed fallback.
 * - `ill`: illustration name shown behind the photo (and instead of it if the photo fails).
 * - `initials`: big initials shown instead (team photos).
 */
export default function Img({ src, alt = '', ill, initials, contain, className = '', eager }) {
  const [state, setState] = useState('loading') // loading | loaded | error
  const url = resolve(src)
  return (
    <figure className={`ph ${contain ? 'contain' : ''} ${className}`}>
      {state !== 'loaded' && ill && <div className="ill" dangerouslySetInnerHTML={{ __html: illSvg(ill) }} />}
      {state !== 'loaded' && !ill && initials && <div className="initials" aria-hidden="true">{initials}</div>}
      {url && state !== 'error' && (
        <img
          src={url}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={(e) => setState(e.currentTarget.naturalWidth > 1 ? 'loaded' : 'error')}
          onError={() => setState('error')}
        />
      )}
    </figure>
  )
}

/** Client/partner logo that falls back to the company name. */
export function LogoChip({ name, logo, className = '', color }) {
  const [bad, setBad] = useState(false)
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {!bad ? (
        <img src={resolve(logo)} alt={name} loading="lazy" decoding="async" onError={() => setBad(true)}
          className={`max-h-full w-auto max-w-[140px] object-contain transition duration-300 hover:scale-105 `} />
      ) : (
        <span className="whitespace-nowrap text-center text-[17px] font-bold tracking-tight text-slate-400 transition hover:text-brand-deep">{name}</span>
      )}
    </div>
  )
}

/**
 * Green X AIoT logo (official artwork, Oct 2026).
 * "Green" in deep green-black, an "X" made of a dark-green stroke and a lime leaf,
 * and an "AIoT" badge. Built from real text + SVG so it stays crisp and scales with font-size.
 *   <GreenX />                 full logo with AIoT badge
 *   <GreenX model="500" />     product name: Green X 500 (no badge)
 *   <GreenX light />           for dark backgrounds
 *   <GreenX badge={false} />   hide the badge
 */
export function GreenXMark({ className = '', light = false }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <polygon points="5,7 15,7 43,45 33,45" fill={light ? '#2FA35A' : '#0A6A3A'} />
      <path d="M5 45 L14.5 45 C 20 37 25 30 29.5 24.5 C 36 22 42 15 45 3.5 C 36 5 29.5 9.5 26.5 17 C 25.5 19.5 25 21.5 25 23 C 18 30.5 11 38 5 45 Z" fill={light ? '#6FD13F' : '#4BB22C'} />
    </svg>
  )
}

export default function GreenX({ model, light = false, badge, className = '' }) {
  const showBadge = badge ?? !model
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap font-display font-extrabold leading-none tracking-[-0.03em] ${light ? 'text-white' : 'text-[#0B1F16]'} ${className}`}>
      <span className="sr-only">Green X{model ? ` ${model}` : ''}{showBadge ? ' AIoT' : ''}</span>
      <span aria-hidden="true">Green</span>
      <GreenXMark light={light} className="ml-[0.05em] h-[0.84em] w-[0.84em] translate-y-[0.06em] self-baseline" />
      {model && <span aria-hidden="true" className="ml-[0.22em]">{model}</span>}
      {showBadge && (
        <span aria-hidden="true" className={`ml-[0.14em] self-start rounded-[0.14em] px-[0.2em] py-[0.07em] text-[0.27em] font-extrabold leading-none tracking-normal text-white ${light ? 'bg-[#0E6B3A] ring-1 ring-[#4BB22C]/60' : 'bg-[#0E6B3A]'}`}>AIoT</span>
      )}
    </span>
  )
}

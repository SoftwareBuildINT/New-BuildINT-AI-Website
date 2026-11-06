import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HUB_NODES } from '../../data/home.js'
import { ARCHITECTURE } from '../../data/products.js'
import { SITE } from '../../data/site.js'
import { img } from '../../config.js'
import { Icon, Reveal } from '../ui.jsx'
import GreenX from '../GreenX.jsx'

const R = 39 // node orbit radius, % of the square

export default function PlatformHub() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (reduce || hold) return
    const t = setInterval(() => setActive((a) => (a + 1) % HUB_NODES.length), 2800)
    return () => clearInterval(t)
  }, [reduce, hold])

  const pos = HUB_NODES.map((_, i) => {
    const a = ((-90 + i * (360 / HUB_NODES.length)) * Math.PI) / 180
    return [50 + R * Math.cos(a), 50 + R * Math.sin(a)]
  })
  const n = HUB_NODES[active]

  return (
    <section className="py-10 md:py-14">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
        <div>
          <Reveal className="grid gap-4">
            <span className="eyebrow">The Green X Platform</span>
            <h2 className="h-section">Every Device. Every Site. <span className="mark">One Cloud</span></h2>
            <p className="lede">Green X 100, 200, 500 and 1000 devices, cameras, solar and access systems feed one cloud. Green X turns that live data into automation, alerts and savings on a single dashboard.</p>
          </Reveal>

          <div className="mt-8 min-h-[176px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                className="grid grid-cols-[64px_1fr] gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-brand-tint text-brand-deep">
                  {n.img ? <img src={img(n.img)} alt="" className="h-full w-full object-cover" /> : <Icon name={n.icon} className="h-7 w-7" />}
                </span>
                <span className="grid gap-1.5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">{n.role}</span>
                  <b className="font-display text-xl">{n.name}</b>
                  <span className="text-[15px] text-muted">{n.desc}</span>
                  <Link to={n.to} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink">Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {ARCHITECTURE.capabilities.map(([b, t]) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span><b className="text-ink">{b}</b> {t}</span></li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="relative mx-auto aspect-square w-full max-w-[600px]" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
          <div className="absolute inset-[6%] rounded-full border border-dashed border-line" />
          <div className="absolute inset-[24%] rounded-full bg-[radial-gradient(circle,rgba(118,223,35,.22),transparent_70%)]" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {pos.map(([x, y], i) => {
              const d = `M${x} ${y} L50 50`
              const on = i === active
              return (
                <g key={i}>
                  <path d={d} stroke={on ? '#3CA80C' : '#CBD5E1'} strokeWidth={on ? 0.7 : 0.4} strokeDasharray="1.2 1.2" fill="none" />
                  {!reduce && <circle r={on ? 1.1 : 0.7} fill={on ? '#76DF23' : '#3CA80C'}><animateMotion dur={on ? '1.2s' : '2.6s'} begin={`${i * 0.3}s`} repeatCount="indefinite" path={d} /></circle>}
                </g>
              )
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-center shadow-lift ring-8 ring-brand-tint">
            <span className="pulse-dot absolute inset-0 rounded-full" />
            <span className="grid justify-items-center gap-1 px-3">
              <GreenX light className="text-[clamp(16px,3.6vw,30px)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brand-lime sm:text-[10px]">Platform · Cloud</span>
            </span>
          </div>

          {HUB_NODES.map((node, i) => {
            const [x, y] = pos[i]
            const on = i === active
            return (
              <button key={node.id} type="button" onClick={() => setActive(i)} onFocus={() => { setActive(i); setHold(true) }} onBlur={() => setHold(false)}
                aria-pressed={on} aria-label={`${node.name}: ${node.role}`}
                className="absolute grid -translate-x-1/2 -translate-y-1/2 justify-items-center gap-1.5" style={{ left: `${x}%`, top: `${y}%` }}>
                <motion.span animate={{ scale: on ? 1.12 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border-2 bg-white shadow-card transition sm:h-[72px] sm:w-[72px] ${on ? 'border-brand' : 'border-line'}`}>
                  {node.img ? <img src={img(node.img)} alt="" className="h-full w-full object-cover" /> : <Icon name={node.icon} className={`h-6 w-6 sm:h-7 sm:w-7 ${on ? 'text-brand-deep' : 'text-ink'}`} />}
                </motion.span>
                <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold sm:text-xs ${on ? 'bg-ink text-brand-lime' : 'bg-white/90 text-ink'}`}>{node.name}</span>
              </button>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

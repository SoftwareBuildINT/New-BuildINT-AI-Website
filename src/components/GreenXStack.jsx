import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Building2 } from 'lucide-react'
import { SERIES } from '../data/products.js'
import { img } from '../config.js'
import GreenX from './GreenX.jsx'
import { Reveal } from './ui.jsx'

function Arrow() {
  return (
    <div className="grid place-items-center py-1 lg:py-0" aria-hidden="true">
      <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="grid h-11 w-11 place-items-center rounded-full bg-brand-lime text-ink">
        <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
      </motion.span>
    </div>
  )
}

/** iBMS → Green X → Products: how the solution, platform and hardware relate. */
export default function GreenXStack({ dark = false }) {
  const card = dark ? 'border-white/10 bg-ink-soft text-white' : 'border-line bg-white shadow-card'
  const label = dark ? 'text-brand-lime' : 'text-brand-deep'
  const sub = dark ? 'text-slate-400' : 'text-muted'
  return (
    <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.35fr] lg:gap-4">
      <Reveal className={`grid content-start gap-3 rounded-3xl border p-6 ${card}`}>
        <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${label}`}>01 · The solution</span>
        <span className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand-deep"><Building2 className="h-6 w-6" /></span><b className="font-display text-3xl font-extrabold">iBMS</b></span>
        <p className={`text-[15px] ${sub}`}>Intelligent Building Management System: energy, HVAC, lighting, pumps, bills and safety, automated.</p>
        <Link to="/solutions/ibms" className={`group inline-flex items-center gap-1.5 text-sm font-semibold ${label}`}>Explore iBMS <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
      </Reveal>
      <Arrow />
      <Reveal delay={0.1} className="grid content-start gap-3 rounded-3xl border-2 border-brand-lime bg-ink p-6 text-white">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-lime">02 · The platform</span>
        <GreenX light className="text-[40px]" />
        <p className="text-[15px] text-slate-300">The Green X Platform connects every device to the cloud, runs AI analytics and puts every site on one dashboard.</p>
        <Link to="/products" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-lime">About Green X <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
      </Reveal>
      <Arrow />
      <Reveal delay={0.2} className={`grid content-start gap-3 rounded-3xl border p-6 ${card}`}>
        <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${label}`}>03 · The products</span>
        <div className="grid gap-2">
          {SERIES.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className={`group grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-2xl border p-2 transition hover:border-brand ${dark ? 'border-white/10 hover:bg-white/5' : 'border-line hover:bg-surface'}`}>
              <img src={img(p.img)} alt="" className="h-12 w-12 rounded-xl bg-white object-cover" />
              <span className="min-w-0"><GreenX model={p.model} light={dark} className="text-[18px]" /><span className={`block truncate text-[13px] ${sub}`}>{p.device} · {p.kind}</span></span>
              <ArrowRight className={`h-4 w-4 transition group-hover:translate-x-1 ${sub}`} />
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WHY } from '../../data/home.js'
import { img } from '../../config.js'
import { Icon, SectionHead } from '../ui.jsx'

export default function WhyTabs() {
  const [i, setI] = useState(0)
  const w = WHY[i]
  return (
    <section className="on-dark bg-ink py-10 md:py-14">
      <div className="container-site">
        <SectionHead dark eyebrow="Why BuildINT AI" title={<>Why Facility, IT and Finance Teams <span className="text-brand-lime">Choose BuildINT</span></>} />
        <div role="tablist" aria-label="Why BuildINT" className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5">
          {WHY.map((x, k) => (
            <button key={x.id} role="tab" type="button" aria-selected={k === i} onClick={() => setI(k)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${k === i ? 'border-brand-lime bg-brand-lime text-ink' : 'border-white/15 text-slate-300 hover:border-white/40 hover:text-white'}`}>
              <Icon name={x.icon} className="h-4 w-4" />{x.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={w.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}
            className="grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-ink-soft p-6 md:grid-cols-2 md:p-10">
            <div className="grid content-start gap-4">
              <h3 className="text-[clamp(26px,3.2vw,40px)] font-extrabold leading-tight text-white">{w.title}</h3>
              <p className="text-[17px] text-slate-300">{w.text}</p>
              <ul className="mt-2 grid gap-2.5">
                {w.points.map((p, k) => (
                  <motion.li key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.08 }} className="flex items-center gap-3 font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-brand-lime" />{p}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="overflow-hidden rounded-2xl bg-white">
              <img src={img(w.img)} alt={w.title} loading="lazy" className={`aspect-[16/11] w-full ${w.id === 'india' || w.id === 'scale' || w.id === 'security' ? 'object-contain p-4' : 'object-cover'}`} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

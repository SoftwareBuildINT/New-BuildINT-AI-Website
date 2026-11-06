import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Reveal, SectionHead } from './ui.jsx'

const fmt = (n) => Math.round(n).toLocaleString('en-IN')
const inr = (n) => (n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)} L` : `₹${fmt(n)}`)

function Range({ id, label, value, min, max, step = 1, display, onChange }) {
  const p = ((value - min) / (max - min)) * 100
  return (
    <div className="grid gap-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">{label}</label>
        <output htmlFor={id} className="font-display text-2xl font-bold tabular-nums">{display}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="range" style={{ '--p': `${p}%` }} />
    </div>
  )
}

/** Savings estimator — uses BuildINT's published 10–15% typical saving as the default band. */
export default function Estimator() {
  const [sites, setSites] = useState(100)
  const [bill, setBill] = useState(25000)
  const [pct, setPct] = useState(12)
  const month = sites * bill * (pct / 100)
  return (
    <section id="estimator" className="scroll-mt-12 bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="Savings estimator" title={<>How Much Could Your Sites <span className="mark">Save?</span></>}
          lede="Move the sliders to match your portfolio. The estimate uses the 10–15% energy savings BuildINT typically delivers; your exact figure comes from a site assessment." />
        <Reveal className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-2">
          <div className="grid gap-7 p-7 md:p-10">
            <Range id="e-sites" label="Number of sites" value={sites} min={1} max={2000} display={fmt(sites)} onChange={setSites} />
            <Range id="e-bill" label="Avg. monthly bill per site" value={bill} min={2000} max={500000} step={1000} display={`₹${fmt(bill)}`} onChange={setBill} />
            <Range id="e-pct" label="Expected saving" value={pct} min={5} max={20} display={`${pct}%`} onChange={setPct} />
          </div>
          <div className="relative grid content-center gap-5 overflow-hidden bg-ink p-7 text-white md:p-10" aria-live="polite">
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(60,168,12,.35),transparent_65%)]" />
            <span className="relative font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated annual savings</span>
            <motion.div key={Math.round(month)} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="relative font-display text-[clamp(44px,6vw,72px)] font-extrabold leading-none tracking-tight text-brand-lime tabular-nums">{inr(month * 12)}</motion.div>
            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 p-4"><span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Per month</span><b className="mt-1 block font-display text-xl tabular-nums">{inr(month)}</b></div>
              <div className="rounded-xl border border-white/10 p-4"><span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Per site / year</span><b className="mt-1 block font-display text-xl tabular-nums">{inr(bill * (pct / 100) * 12)}</b></div>
            </div>
            <p className="relative text-[13px] text-slate-400">Indicative only. Actual savings depend on equipment, usage and tariff.</p>
            <Button to="/contact" className="relative justify-self-start">Get an Exact Assessment</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

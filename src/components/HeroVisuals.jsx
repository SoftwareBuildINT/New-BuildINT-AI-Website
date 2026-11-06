import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Drifting IoT-node network drawn on canvas behind the hero. Pauses off-screen / in background tabs. */
export function HeroNetwork() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let W = 0, H = 0, pts = [], raf, visible = true
    const size = () => {
      const r = c.getBoundingClientRect()
      W = r.width; H = r.height
      c.width = W * dpr; c.height = H * dpr
      x.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(64, (W * H) / 17000))
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.6 + 1 }))
    }
    const draw = () => {
      x.clearRect(0, 0, W, H)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1 }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2
          if (d < 15000) { x.strokeStyle = `rgba(60,168,12,${0.18 * (1 - d / 15000)})`; x.lineWidth = 1; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke() }
        }
        x.fillStyle = i % 7 === 0 ? 'rgba(60,168,12,.85)' : 'rgba(100,116,139,.35)'
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, Math.PI * 2); x.fill()
      }
    }
    const loop = () => { if (visible && !document.hidden) draw(); raf = requestAnimationFrame(loop) }
    size(); draw()
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting })
    io.observe(c)
    const onResize = () => { size(); draw() }
    window.addEventListener('resize', onResize, { passive: true })
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', onResize) }
  }, [reduce])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

/** Example iEMS dashboard card (clearly labelled as a sample). */
export function DashboardCard() {
  const reduce = useReducedMotion()
  const [kwh, setKwh] = useState(142.6)
  const [sig, setSig] = useState(false)
  const [temp, setTemp] = useState(24)
  useEffect(() => {
    if (reduce) return
    const a = setInterval(() => !document.hidden && setKwh((k) => k + Math.random() * 0.4 + 0.05), 1400)
    const b = setInterval(() => { if (document.hidden) return; setSig((s) => !s); setTemp(23 + Math.round(Math.random() * 2)) }, 4200)
    return () => { clearInterval(a); clearInterval(b) }
  }, [reduce])

  const rows = [
    { name: 'AC · Thermal comfort', val: `${temp}°C`, pill: 'AUTO', on: true },
    { name: 'Signage · Smart timer', val: sig ? 'motion detected' : 'till 23:00', pill: sig ? 'ON' : 'SCHEDULED', on: sig },
    { name: 'UPS · Power monitor', val: 'EB · UPS · Batt', pill: 'HEALTHY', on: true },
  ]
  return (
    <motion.aside initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      aria-label="Example iEMS dashboard" className="relative rounded-[22px] bg-ink p-5 font-data text-[12.5px] text-slate-300 shadow-[0_40px_80px_-30px_rgba(15,23,42,.6)] ring-1 ring-white/5 sm:p-6">
      <span className="absolute -top-3 right-5 rounded-full bg-brand-lime px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink">Sample view</span>
      <div className="flex items-center justify-between gap-3 text-slate-400">
        <span>iEMS · SITE DASHBOARD</span>
        <span className="flex items-center gap-2 text-brand-lime"><i className="pulse-dot h-2 w-2 rounded-full bg-brand" />LIVE</span>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold tracking-tight text-white">Energy Saved Today</h3>
        <b className="text-[22px] font-semibold tabular-nums text-brand-lime">{kwh.toFixed(1)}<small className="ml-1 text-xs text-slate-400">kWh</small></b>
      </div>
      <div className="mt-3 rounded-xl bg-ink-soft px-2.5 pb-1.5 pt-3">
        <svg viewBox="0 0 320 130" role="img" aria-label="Baseline load versus optimised load across the day" className="block h-auto w-full">
          <g stroke="#334155" strokeWidth="1"><line x1="20" y1="20" x2="316" y2="20" /><line x1="20" y1="60" x2="316" y2="60" /><line x1="20" y1="100" x2="316" y2="100" /></g>
          <g fill="#94A3B8" fontSize="9" fontFamily="IBM Plex Mono, monospace"><text x="0" y="23">12</text><text x="4" y="63">6</text><text x="4" y="103">0</text><text x="20" y="122">00:00</text><text x="150" y="122">12:00</text><text x="282" y="122">23:59</text></g>
          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }} d="M20 88 C50 86 70 70 95 48 S140 26 170 28 S230 34 260 56 S300 84 316 86 L316 92 C300 92 280 84 260 70 S220 50 170 50 S130 52 100 66 S50 90 20 92 Z" fill="rgba(60,168,12,.2)" />
          <path d="M20 88 C50 86 70 70 95 48 S140 26 170 28 S230 34 260 56 S300 84 316 86" fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="4 4" />
          <path className="draw-line" d="M20 92 C50 90 80 74 100 66 S140 50 170 50 S230 52 260 70 S300 92 316 92" fill="none" stroke="#3CA80C" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="316" cy="92" r="4" fill="#76DF23" className="blink" />
        </svg>
        <div className="flex gap-4 px-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><i className="inline-block h-[3px] w-2.5 bg-slate-400" />Baseline</span>
          <span className="flex items-center gap-1.5"><i className="inline-block h-[3px] w-2.5 bg-brand" />With BuildINT</span>
        </div>
      </div>
      <div className="mt-3.5 grid gap-2">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-2.5 rounded-lg border border-white/10 bg-ink-soft px-3 py-2.5 sm:grid-cols-[1fr_auto_auto]">
            <span className="text-slate-200">{r.name}</span>
            <em className="hidden not-italic text-slate-400 sm:block">{r.val}</em>
            <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] transition ${r.on ? 'bg-brand/15 text-brand-lime' : 'bg-slate-500/15 text-slate-400'}`}>{r.pill}</span>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

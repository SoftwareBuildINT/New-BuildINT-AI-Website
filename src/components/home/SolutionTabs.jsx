import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BellRing, Check, ScanFace } from 'lucide-react'
import { SOLUTION_TABS } from '../../data/home.js'
import { img } from '../../config.js'
import { illSvg } from '../../lib/illustrations.js'
import { Button, SectionHead } from '../ui.jsx'

const DWELL = 7000
const box = 'absolute rounded-md border-2 border-brand-lime'
const chip = 'rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-lime backdrop-blur sm:text-[11px]'

/* Live overlays drawn on top of each real site photo (positions in % of the photo). */
function Overlay({ id }) {
  const t = (d = 0) => ({ initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: d, duration: 0.4 } })
  if (id === 'cctv') {
    const faces = [[7, 29], [18, 25], [26.5, 25], [38.5, 31], [50, 31], [63, 31], [76, 34], [85, 27]]
    return (
      <>
        {faces.map(([x, y], i) => (
          <motion.span key={i} {...t(0.3 + i * 0.18)} className={box} style={{ left: `${x}%`, top: `${y}%`, width: '8.5%', height: '13%' }}>
            {i % 3 === 0 && <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-brand-lime px-1.5 font-mono text-[9px] font-bold text-ink sm:text-[10px]">PERSON {96 + (i % 4)}%</span>}
          </motion.span>
        ))}
        <motion.span {...t(1.8)} className={`${chip} absolute right-3 top-3 flex items-center gap-1.5`}><i className="h-2 w-2 animate-pulse rounded-full bg-red-500" />REC · CAM 04</motion.span>
        <motion.span {...t(2.2)} className={`${chip} absolute bottom-3 left-3`}>8 people detected · AI analytics</motion.span>
      </>
    )
  }
  if (id === 'access') {
    return (
      <>
        <motion.span {...t(0.3)} className={`${box} overflow-hidden`} style={{ left: '12.5%', top: '41%', width: '7.5%', height: '17%' }}>
          <motion.span className="absolute inset-x-0 h-[2px] bg-brand-lime" animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 1.4, repeat: 2 }} />
        </motion.span>
        <motion.span {...t(2.6)} className="absolute flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12px] font-bold text-ink shadow-lift sm:text-sm" style={{ left: '22%', top: '42%' }}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-deep text-white"><Check className="h-4 w-4" /></span>Access granted · Face verified
        </motion.span>
        <motion.span {...t(1)} className={`${chip} absolute right-3 top-3 flex items-center gap-1.5`}><ScanFace className="h-3.5 w-3.5" />DigiSuraksha</motion.span>
      </>
    )
  }
  if (id === 'fire') {
    return (
      <>
        <motion.span className="absolute rounded-lg border-2 border-red-500" style={{ left: '20%', top: '28%', width: '20%', height: '30%' }} animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute right-3 top-3 grid w-[min(260px,60%)] gap-1 rounded-xl bg-white p-3 shadow-lift">
          <span className="flex items-center gap-2 text-[13px] font-bold text-red-600"><BellRing className="h-4 w-4" />Smoke detected · Zone 2</span>
          <span className="text-[12px] text-muted">Hooter on · SMS &amp; call alerts sent · Command center notified</span>
        </motion.div>
        <motion.span {...t(1.6)} className={`${chip} absolute bottom-3 left-3`}>24×7 centralized fire monitoring</motion.span>
      </>
    )
  }
  const chips = {
    ibms: [['HVAC', 'AUTO', '12%', '16%'], ['Pumps', 'ON', '12%', '30%'], ['Meter', '142.6 kWh', '66%', '56%'], ['Lighting', 'SCHEDULED', '66%', '70%']],
    iatm: [['AC', '24°C AUTO', '8%', '30%'], ['Signage', 'TIMER', '8%', '44%'], ['UPS', 'HEALTHY', '8%', '58%'], ['Remote reset', 'READY', '8%', '72%']],
    cbms: [['Bills synced', '1,240', '6%', '10%'], ['Due this week', '18', '6%', '24%'], ['Auto-paid', '✓', '6%', '38%']],
    solar: [['Generation', '↑ LIVE', '4%', '80%'], ['Solar share', 'RISING', '36%', '80%'], ['Inverter', 'HEALTHY', '68%', '80%']],
  }[id] || []
  return (
    <>
      {chips.map(([k, v, x, y], i) => (
        <motion.span key={k} {...t(0.3 + i * 0.25)} className="absolute flex items-center gap-2 rounded-xl bg-ink/85 px-3 py-2 text-[11px] text-white shadow-lift backdrop-blur sm:text-[12.5px]" style={{ left: x, top: y }}>
          <i className="h-2 w-2 rounded-full bg-brand-lime" /><span className="text-slate-300">{k}</span><b className="font-mono text-brand-lime">{v}</b>
        </motion.span>
      ))}
      <motion.span {...t(1.6)} className={`${chip} absolute bottom-3 right-3`}>Illustrative live data</motion.span>
    </>
  )
}

export default function SolutionTabs() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const bar = useRef(null)
  const tab = SOLUTION_TABS[i]

  useEffect(() => {
    if (reduce || hold) return
    const el = bar.current
    if (el) { el.style.transition = 'none'; el.style.transform = 'scaleX(0)'; void el.offsetWidth; el.style.transition = `transform ${DWELL}ms linear`; el.style.transform = 'scaleX(1)' }
    const t = setTimeout(() => setI((v) => (v + 1) % SOLUTION_TABS.length), DWELL)
    return () => clearTimeout(t)
  }, [i, hold, reduce])

  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="AI-powered solutions" title={<>Proactive Buildings, <span className="mark">Powered by AI</span></>}
          lede="See what BuildINT systems do on real sites, from automation panels to AI cameras and face-recognition doors." action={<Button to="/solutions" kind="outline">All Solutions</Button>} />
        <div className="grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
          <div role="tablist" aria-label="Solutions" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:grid lg:gap-1 lg:overflow-visible lg:px-0">
            {SOLUTION_TABS.map((s, k) => (
              <button key={s.id} role="tab" type="button" aria-selected={k === i} onClick={() => setI(k)}
                className={`relative shrink-0 overflow-hidden rounded-2xl border px-4 py-3 text-left transition lg:px-5 lg:py-4 ${k === i ? 'border-line bg-white shadow-card' : 'border-transparent hover:bg-white/60'}`}>
                <b className={`block whitespace-nowrap font-display text-[16px] lg:text-lg ${k === i ? 'text-ink' : 'text-muted'}`}>{s.title}</b>
                <span className="hidden text-sm text-muted lg:block">{s.short}</span>
                {k === i && <span ref={bar} className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand" style={{ transform: reduce || hold ? 'scaleX(1)' : 'scaleX(0)' }} />}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-ink">
              <AnimatePresence mode="wait">
                <motion.div key={tab.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 grid place-items-center">
                  {tab.img && <img src={img(tab.img)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />}
                  <motion.div initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
                    className="relative max-h-full max-w-full" style={{ aspectRatio: tab.ratio, height: Number(tab.ratio.split('/')[1]) / Number(tab.ratio.split('/')[0]) > 0.625 ? '100%' : 'auto', width: Number(tab.ratio.split('/')[1]) / Number(tab.ratio.split('/')[0]) > 0.625 ? 'auto' : '100%' }}>
                    {tab.img ? <img src={img(tab.img)} alt={tab.title} className="h-full w-full object-cover" />
                      : <div className="h-full w-full bg-gradient-to-b from-sky-100 to-white [&_svg]:h-full [&_svg]:w-full" role="img" aria-label={tab.title} dangerouslySetInnerHTML={{ __html: illSvg(tab.id) }} />}
                    <Overlay id={tab.id} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={tab.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid gap-4 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
                <div className="grid content-start gap-3">
                  <h3 className="text-[22px] font-bold">{tab.title}</h3>
                  <p className="text-muted">{tab.text}</p>
                  <Link to={tab.to} className="group inline-flex items-center gap-1.5 font-semibold text-brand-deep">Explore {tab.title} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
                </div>
                <ul className="ticks content-start">{tab.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

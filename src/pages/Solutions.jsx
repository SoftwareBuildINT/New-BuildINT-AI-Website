import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SECTIONS } from '../data/solutions.js'
import { PageHero, Reveal, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'
import { CtaBand, Ticks } from '../components/Cards.jsx'
import { Architecture } from './Products.jsx'
import GreenX from '../components/GreenX.jsx'
import GreenXStack from '../components/GreenXStack.jsx'

// The four solutions from the client brief, plus turnkey delivery.
const GROUPS = [
  { sol: 'ibms', n: '01', title: 'iBMS', sub: 'Intelligent Building Management: energy, HVAC, lighting, pumps, ATMs, bills and fire safety on one AI platform.' },
  { sol: 'cctv', n: '02', title: 'Surveillance AI', sub: 'AI video surveillance, 32-zone e-surveillance and iMAXX, monitored from a centralized command center.' },
  { sol: 'solar', n: '03', title: 'Solar', sub: 'Rooftop solar connected to Green X, so generation and consumption sit on one dashboard.' },
  { sol: 'access', n: '04', title: 'Access Control', sub: 'Biometric, facial recognition, RFID and DigiSuraksha Aadhaar-based authentication.' },
  { sol: 'delivery', n: '', title: 'Turnkey delivery', sub: 'Design, supply, installation, integration and maintenance by one accountable team.' },
]
// Old dropdown ids map onto the first section of each group.
const ALIAS = { 'smart-offices': 'smart-office', residential: 'ibms' }

function Section({ s, i }) {
  const rev = i % 2 === 1
  return (
    <article id={`sec-${s.id}`} className="scroll-mt-36 border-t border-line py-10 first:border-t-0 md:py-14">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-10">
        <Reveal className={`grid gap-4 md:sticky md:top-40 ${rev ? 'md:order-2' : ''}`}>
          <Img ill={s.ill} src={s.img} alt={s.title} contain={s.contain} className="zoom aspect-[16/11] border border-line shadow-card" />
          {s.extraMedia && <Img ill={s.extraMedia.ill} src={s.extraMedia.img} alt={s.extraMedia.alt} className="zoom aspect-[16/11] border border-line shadow-card" />}
        </Reveal>
        <Reveal delay={0.08} className="grid min-w-0 gap-5">
          <div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="mb-1.5 mt-3.5 text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.12]">{s.title}</h2>
            {s.sub && <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.1em] text-brand-deep">{s.sub}</h3>}
          </div>
          {s.intro && <p className="text-[17px] text-muted">{s.intro}</p>}
          {s.features && <div className="grid gap-4 rounded-2xl border border-line bg-white p-6 shadow-card transition hover:border-brand/50"><h4 className="text-lg font-bold">{s.features.title}</h4><Ticks items={s.features.items} /></div>}
          {s.labeled && <Ticks items={s.labeled} />}
          {s.value && (
            <div className="grid gap-3 rounded-2xl bg-ink p-6 text-white">
              <h4 className="text-lg font-bold text-white">Business Value</h4>
              <ul className="grid gap-2 sm:grid-cols-2">{s.value.map((v) => <li key={v} className="flex items-start gap-2 text-[15px] text-slate-200"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lime" />{v}</li>)}</ul>
            </div>
          )}
          {s.demos && (
            <div>
              <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted">Live deployments</p>
              <div className="flex flex-wrap gap-2">{s.demos.map((d) => <span key={d} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold"><span className="pulse-dot h-2 w-2 rounded-full bg-brand" />{d}</span>)}</div>
            </div>
          )}
          {s.spec && (
            <div className="grid overflow-hidden rounded-2xl border border-line bg-line [gap:1px] sm:grid-cols-2">
              {s.spec.map(([b, t]) => <div key={b} className="bg-white p-5 transition hover:bg-surface"><b className="mb-1 block font-display text-[17px]">{b}</b><span className="text-sm text-muted">{t}</span></div>)}
            </div>
          )}
          {s.boxes && (
            <div className="grid gap-4 sm:grid-cols-2">
              {s.boxes.map((b) => <div key={b.title} className="grid content-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:border-brand/50"><h4 className="text-[17px] font-bold">{b.title}</h4><Ticks items={b.items} /></div>)}
            </div>
          )}
          {s.steps && (
            <>
              <h4 className="text-xl font-bold">Simplify Electricity Bill Management in <span className="mark">3 Easy Steps</span></h4>
              <div className="grid gap-3 sm:grid-cols-3">
                {s.steps.map((t, n) => <div key={t} className={`grid gap-1 rounded-2xl p-5 ${n === 2 ? 'bg-brand text-ink' : 'bg-ink text-white'}`}><i className={`font-mono text-xs not-italic ${n === 2 ? 'text-ink/70' : 'text-brand-lime'}`}>Step {n + 1}</i><b className="font-display text-lg">{t}</b></div>)}
              </div>
            </>
          )}
        </Reveal>
      </div>
    </article>
  )
}

export default function Solutions() {
  useSeo('Solutions', 'BuildINT AI solutions: iBMS powered by the Green X Platform, Surveillance AI, Solar and Access Control, delivered turnkey.')
  const { section } = useParams()
  const [active, setActive] = useState(SECTIONS[0].id)
  const bar = useRef(null)

  // Deep link: /solutions/cctv scrolls to that section.
  useEffect(() => {
    const id = section && (ALIAS[section] || section)
    if (!id) return
    const t = setTimeout(() => {
      const el = document.getElementById(`sec-${id}`)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' })
    }, 150)
    return () => clearTimeout(t)
  }, [section])

  // Scroll-spy for the chip bar.
  useEffect(() => {
    const onScroll = () => {
      let cur = SECTIONS[0].id
      for (const s of SECTIONS) { const el = document.getElementById(`sec-${s.id}`); if (el && el.getBoundingClientRect().top < 220) cur = s.id }
      setActive(cur)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const chip = bar.current?.querySelector(`[data-id="${active}"]`)
    if (chip && bar.current) bar.current.scrollTo({ left: chip.offsetLeft - 20, behavior: 'smooth' })
  }, [active])

  return (
    <>
      <PageHero crumb={[{ label: 'Solutions' }]} title={<>Four Solutions, <span className="mark">One Platform</span></>}
        lede="iBMS powered by the Green X Platform, Surveillance AI, Solar and Access Control, delivered turnkey across India." ill="iot" img="photos/controllers" />
      <div className="sticky z-30 border-b border-line bg-white/90 backdrop-blur-xl" style={{ top: 'calc(72px + env(safe-area-inset-top, 0px))' }}>
        <div className="container-site">
          <nav ref={bar} aria-label="Solutions" className="no-scrollbar flex items-center gap-2 overflow-x-auto py-3">
            {GROUPS.map((g) => (
              <span key={g.sol} className="flex items-center gap-2">
                <span className="whitespace-nowrap pl-2 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-muted first:pl-0">{g.n && `${g.n} · `}{g.title}</span>
                {SECTIONS.filter((x) => x.sol === g.sol).map((x) => (
                  <Link key={x.id} data-id={x.id} to={`/solutions/${x.id}`} replace
                    className={`whitespace-nowrap rounded-full border-[1.5px] px-4 py-2 text-[13px] font-semibold transition ${active === x.id ? 'border-ink bg-ink text-brand-lime' : 'border-line bg-white text-ink hover:border-ink'}`}>{x.chip}</Link>
                ))}
              </span>
            ))}
          </nav>
        </div>
      </div>
      {GROUPS.map((g) => {
        const list = SECTIONS.filter((x) => x.sol === g.sol)
        return (
          <div key={g.sol} id={`grp-${g.sol}`}>
            <section className={`${g.sol === 'ibms' ? 'bg-ink on-dark' : 'bg-surface'} py-10 md:py-14`}>
              <div className="container-site">
                <Reveal className="flex flex-wrap items-end justify-between gap-6">
                  <div className="grid max-w-3xl gap-3">
                    <span className="eyebrow">{g.n ? `Solution ${g.n}` : 'How we deliver'}</span>
                    <h2 className={`h-section ${g.sol === 'ibms' ? 'text-white' : ''}`}>{g.title}{g.sol === 'ibms' && <span className="text-slate-400"> · powered by </span>}{g.sol === 'ibms' && <GreenX light />}</h2>
                    <p className={`lede ${g.sol === 'ibms' ? 'text-slate-300' : ''}`}>{g.sub}</p>
                  </div>
                </Reveal>
                {g.sol === 'ibms' && <div className="mt-10"><GreenXStack dark /></div>}
              </div>
            </section>
            <div className="container-site">{list.slice(0, 1).map((x, i) => <Section key={x.id} s={x} i={i} />)}</div>
            {g.sol === 'ibms' && <Architecture />}
            <div className="container-site">{list.slice(1).map((x, i) => <Section key={x.id} s={x} i={i + 1} />)}</div>
          </div>
        )
      })}
      <CtaBand title="Find the Right Fit for Your Sites" text="Our team will assess your requirements and suggest the best-fit solution for your business." />
    </>
  )
}

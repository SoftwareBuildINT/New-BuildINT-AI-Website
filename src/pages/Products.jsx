import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SERIES, DEVICES, PILLARS, ARCHITECTURE } from '../data/products.js'
import { SITE } from '../data/site.js'
import { img } from '../config.js'
import { Button, Icon, Reveal, SectionHead, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'
import GreenX from '../components/GreenX.jsx'
import GreenXStack from '../components/GreenXStack.jsx'
import { CtaBand } from '../components/Cards.jsx'

export function Architecture() {
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="iBMS · Technical architecture" title={<>From Green X Devices <span className="mark">to the Cloud</span></>}
          lede="How BuildINT AI's Intelligent Building Management System is wired together on the Green X Platform." />
        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
          <Reveal><Img src="diagrams/ibms-architecture" ill="iot" contain alt="iBMS system architecture: distribution panel, smart meter, LiBi, Bi-Bug, BigIO and NEON connect through a router to the cloud" className="aspect-[1727/910] border border-line bg-white shadow-card" /></Reveal>
          <div className="grid gap-5">
            <Reveal className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">Connectivity &amp; Data Flow</h3>
              <ol className="grid gap-3">
                {ARCHITECTURE.flow.map((t, i) => (
                  <li key={t} className="grid grid-cols-[32px_1fr] items-start gap-3 text-[15px]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-deep font-mono text-sm font-semibold text-white">{i + 1}</span>{t}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.08} className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-lime">Platform Capabilities</h3>
              <ul className="grid gap-2.5">
                {ARCHITECTURE.capabilities.map(([b, t]) => <li key={b} className="text-[15px] text-slate-300"><b className="text-white">{b}</b> {t}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Products() {
  useSeo('Green X Products', 'The Green X series by BuildINT AI: Green X 100 (LiBi lighting controller), Green X 200 (BigIO IoT gateway), Green X 500 (NEON AC controller) and Green X 1000 (Bi-Bug multi-sensor).')
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(118,223,35,.25),transparent_65%)]" />
        <div className="container-site relative py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted"><Link to="/" className="hover:text-brand-deep">Home</Link> / <span className="text-ink">Products</span></nav>
          <div className="mt-6 grid items-end gap-6 md:grid-cols-[1.2fr_.8fr]">
            <div>
              <span className="eyebrow">The product series by BuildINT AI</span>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4">
                <GreenX className="text-[clamp(56px,9vw,112px)]" />
              </motion.h1>
              <p className="mt-3 text-[clamp(20px,2.4vw,28px)] font-bold text-ink">Smart IoT for energy, automation &amp; control.</p>
            </div>
            <p className="lede">Four series, one platform. Green X 100, 200, 500 and 1000 are designed and built in India to make any building intelligent. {SITE.tagline}.</p>
          </div>
          <motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            src={img('products/lineup')} alt="Green X devices: Bi-Bug, LiBi, BigIO and NEON" className="mx-auto mt-10 w-full max-w-5xl" />
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {PILLARS.map(([ic, t]) => <div key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 font-semibold"><Icon name={ic} className="h-5 w-5 text-brand-deep" />{t}</div>)}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14">
        <div className="container-site">
          <SectionHead eyebrow="How it fits together" title={<>iBMS <span className="text-brand-lime">→</span> Green X <span className="text-brand-lime">→</span> Products</>}
            lede="iBMS is the solution you buy. The Green X Platform runs it. The Green X 100, 200, 500 and 1000 devices do the work on site." />
          <GreenXStack />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-6">
          {SERIES.map((p, i) => (
            <Reveal key={p.id} className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-[.9fr_1.1fr]">
              <div className={`relative grid place-items-center gap-4 bg-gradient-to-br from-surface to-white p-8 ${i % 2 ? 'md:order-2' : ''}`}>
                <span className="absolute left-6 top-6 font-display text-[clamp(64px,8vw,110px)] font-extrabold leading-none text-ink/[0.05]">{p.model}</span>
                <div className={`relative grid w-full items-center gap-4 ${p.devices.length > 1 ? 'grid-cols-[1.3fr_.7fr]' : ''}`}>
                  {p.devices.map((d) => (
                    <motion.img key={d} whileHover={{ scale: 1.04, rotate: -1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }} src={img(DEVICES[d].img)} alt={`${p.name} – ${DEVICES[d].name}`} loading="lazy" className="max-h-[320px] w-full object-contain" />
                  ))}
                </div>
              </div>
              <div className="grid content-start gap-5 p-7 md:p-10">
                <div>
                  <span className="eyebrow">{p.kind}</span>
                  <h2 className="mt-3"><GreenX model={p.model} className="text-[clamp(32px,4vw,48px)]" /></h2>
                  <p className="mt-2 text-lg font-semibold text-brand-deep">Powered by {p.device} · {p.title}</p>
                </div>
                <p className="text-[17px] text-muted">{p.overview}</p>
                <ul className="flex flex-wrap gap-2">{p.devices.flatMap((d) => DEVICES[d].features.slice(0, p.devices.length > 1 ? 3 : 5)).map((f) => <li key={f} className="rounded-full bg-brand-tint px-3 py-1.5 text-[13px] font-semibold text-brand-dark">{f}</li>)}</ul>
                <div className="flex flex-wrap gap-3">
                  <Button to={`/products/${p.id}`}>Full Specifications</Button>
                  <Button href={SITE.demoUrl} kind="outline" arrow={false}>Request a Demo</Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Architecture />
      <CtaBand mascot title={<>Let's Build a Greener Tomorrow, Together</>} text="Tell us about your sites and our engineers will recommend the right Green X setup." />
    </>
  )
}

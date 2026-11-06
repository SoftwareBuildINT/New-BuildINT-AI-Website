import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { SITE } from '../data/site.js'
import { SOLUTIONS } from '../data/solutions.js'
import { PRODUCTS, PILLARS } from '../data/products.js'
import { CLIENTS, CASES } from '../data/people.js'
import { INDUSTRY_TILES } from '../data/home.js'
import { img } from '../config.js'
import { Button, CountUp, Icon, Reveal, SectionHead, useSeo } from '../components/ui.jsx'
import { LogoChip } from '../components/Img.jsx'
import GreenX from '../components/GreenX.jsx'
import GreenXStack from '../components/GreenXStack.jsx'
import ExplainerFilm from '../components/home/ExplainerFilm.jsx'
import PlatformHub from '../components/home/PlatformHub.jsx'
import SolutionTabs from '../components/home/SolutionTabs.jsx'
import WhyTabs from '../components/home/WhyTabs.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Estimator from '../components/Estimator.jsx'
import { CtaBand } from '../components/Cards.jsx'

const ease = [0.2, 0.7, 0.2, 1]

function Hero() {
  const head = 'One Platform for AIoT Energy & Smart Infrastructure'
  return (
    <section className="on-dark relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_80%_0%,rgba(60,168,12,.35),transparent_45%),radial-gradient(circle_at_0%_100%,rgba(118,223,35,.12),transparent_40%)]" />
      <div className="container-site relative pb-12 pt-8 md:pb-20 md:pt-6">
        <div className="grid items-end gap-4 lg:grid-cols-[1.25fr_.75fr] lg:gap-12">
          <div>
            <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="inline-flex items-center gap-3 font-display text-[clamp(16px,1.7vw,22px)] font-extrabold uppercase leading-tight tracking-[0.1em]">
              {/* Indian tricolour: saffron, white, green */}
              <span aria-hidden="true" className="grid h-[1.2em] w-[5px] shrink-0 grid-rows-3 overflow-hidden rounded-full"><span className="bg-[#FF9933]" /><span className="bg-white" /><span className="bg-[#2BB24C]" /></span>
              <span><span className="text-[#FF9933]">Bharat Ka</span> <span className="text-white">Apna</span> <span className="text-[#3DDC5F]">Building Intelligence</span></span>
            </motion.span>
            <h1 className="mt-4 text-[clamp(20px,3.8vw,45px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              {head.split(' ').map((w, i) => (
                <motion.span key={i} className={`mr-[0.22em] inline-block ${['Smarter,', 'Safer,', 'Greener'].includes(w) ? 'text-brand-lime' : ''}`}
                  initial={{ opacity: 0, y: '0.4em' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 + i * 0.06, ease }}>{w}</motion.span>
              ))}
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }} className="grid gap-5">
            <p className="text-[15px] leading-relaxed text-slate-300">BuildINT AI runs iBMS on the Green X Platform and brings Surveillance AI, solar and access control onto one cloud dashboard, with Made-in-India devices.</p>
            <div className="flex flex-wrap gap-2">
              <Button href={SITE.demoUrl}>Request a Demo</Button>
              <Button to="/products" kind="light" arrow={false}>Explore Products</Button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease }} className="mt-10 md:mt-12">
          <ExplainerFilm />
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 md:grid-cols-5">
          {SITE.traction.map((s, i) => (
            <div key={s.label} className={`pr-4 ${i ? 'md:border-l md:border-white/10 md:pl-6' : ''}`}>
              <b className="block font-display text-[clamp(26px,3vw,40px)] font-extrabold leading-none tracking-tight text-white"><CountUp to={s.to} suffix={s.suffix} /></b>
              <span className="mt-1.5 block text-sm text-slate-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const list = [...CLIENTS, ...CLIENTS]
  return (
    <div className="border-b border-line bg-white py-6" aria-label="Our clients">
      <p className="mb-4 text-center font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">Trusted by 52+ Leading Organizations</p>
      <div className="marquee"><div className="marquee-track items-center">{list.map((c, i) => <LogoChip key={i} {...c} className="h-12 min-w-[100px]" />)}</div></div>
    </div>
  )
}

function Products() {
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="Our products" title={<>The <GreenX /> Series</>}
          lede="iBMS is the solution. The Green X Platform runs it. Green X 100, 200, 500 and 1000 are the Made-in-India devices that do the work on site, with minimum wiring and no civil work."
          action={<Button to="/products" kind="outline">View All Products</Button>} />
        <GreenXStack />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link to={`/products/${p.id}`} className="group grid h-full content-start overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-lift">
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-b from-surface to-white">
                  <span className="absolute left-5 top-3 font-display text-7xl font-extrabold text-ink/[0.05]">{p.model}</span>
                  <img src={img(p.img)} alt={`${p.name} – ${p.device}`} loading="lazy" className="relative h-[84%] w-[84%] object-contain transition duration-700 group-hover:scale-105" />
                </div>
                <div className="grid gap-1.5 border-t border-line p-5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">Powered by {p.device}</span>
                  <h3><GreenX model={p.model} className="text-[28px]" /></h3>
                  <p className="text-[15px] text-muted">{p.title}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold">Specs &amp; Features <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PILLARS.map(([ic, t]) => <div key={t} className="flex items-center gap-3 rounded-2xl bg-brand-tint px-4 py-3.5 font-semibold text-brand-dark"><Icon name={ic} className="h-5 w-5" />{t}</div>)}
        </div>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section className="bg-brand-dark py-10 text-white md:py-12">
      <div className="container-site">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-lime">Proven results</span><h2 className="mt-3 text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.12] text-white">Measurable Savings, Site After Site</h2></div>
          <Button to="/case-studies" kind="light">See All Projects</Button>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {[...CASES].reverse().map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <b className="block font-display text-[clamp(48px,5.5vw,72px)] font-extrabold leading-none tracking-tight text-brand-lime">{c.resultPrefix}<CountUp to={c.result} suffix="%" /></b>
              <span className="mt-2 block font-semibold text-white">{c.resultLabel}</span>
              <span className="mt-1 block text-sm text-green-100">{c.title}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section className="py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="Industries we serve" title={<>Intelligence for <span className="mark">Any Building</span></>}
          lede="Government, railways, banking, commercial, retail, education, health care, FMCG and MNCs." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_TILES.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <Link to="/case-studies" className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
                <img src={img(t.img)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 grid gap-1 p-6">
                  <b className="font-display text-2xl text-white">{t.name}</b>
                  <span className="text-sm text-slate-300">{t.text}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-lime">Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="Trusted by leading organizations" title={<>From Indian Railways to <span className="mark">Goldman Sachs</span></>} />
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line [gap:1px] sm:grid-cols-4 lg:grid-cols-7">
          {CLIENTS.map((c) => <LogoChip key={c.name} {...c} color className="h-24 bg-white p-4 transition hover:bg-surface" />)}
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {SITE.certifications.map((c) => (
            <span key={c.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold"><BadgeCheck className="h-4 w-4 text-brand-deep" />{c.name}</span>
          ))}
          {SITE.recognitions.filter((r) => !r.startsWith('ISO')).map((r) => <span key={r} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-muted">{r}</span>)}
        </div>
      </div>
    </section>
  )
}

function ExploreAll() {
  return (
    <section className="py-12 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="Explore" title={<>Everything BuildINT <span className="mark">Does</span></>} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...SOLUTIONS.map((s) => ({ to: `/solutions/${s.id}`, icon: s.icon, t: s.title, d: s.long })), ...PRODUCTS.map((p) => ({ to: `/products/${p.id}`, thumb: p.img, t: p.name, d: `${p.device} · ${p.title}` }))].map((x, i) => (
            <Reveal key={x.to} delay={(i % 3) * 0.05} className="min-w-0">
              <Link to={x.to} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand-tint text-brand-deep">
                  {x.thumb ? <img src={img(x.thumb)} alt="" className="h-full w-full object-cover" /> : <Icon name={x.icon} className="h-6 w-6" />}
                </span>
                <span className="min-w-0 flex-1"><b className="block font-display">{x.t}</b><span className="block truncate text-sm text-muted">{x.d}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-brand-deep" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useSeo(null, 'BuildINT AI – Bharat Ka Apna Building Intelligence. One AI platform for energy, lighting, Surveillance AI, fire safety and access control: iBMS, iEMS, NEON, LiBi, BigIO and Bi-Bug.')
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    return () => clearTimeout(t)
  }, [hash])
  return (
    <>
      <Hero />
      <Marquee />
      <PlatformHub />
      <Products />
      <SolutionTabs />
      <WhyTabs />
      <Results />
      <Industries />
      <Trust />
      <Testimonials />
      <Estimator />
      <ExploreAll />
      <CtaBand mascot title={<>Let's Build a Greener Tomorrow, Together</>} demo={<Button href={SITE.demoUrl} kind="light">Request a Demo</Button>} />
    </>
  )
}

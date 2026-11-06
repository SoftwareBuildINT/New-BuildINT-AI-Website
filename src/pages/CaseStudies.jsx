import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CASES, FIELD, CLIENTS } from '../data/people.js'
import { SITE } from '../data/site.js'
import { img } from '../config.js'
import { Button, CountUp, PageHero, Reveal, SectionHead, useSeo } from '../components/ui.jsx'
import Img, { LogoChip } from '../components/Img.jsx'
import { CtaBand, Ticks } from '../components/Cards.jsx'

const TAGS = ['All', 'iBMS', 'CCTV', 'Fire', 'Access']

function FieldGallery() {
  const [tag, setTag] = useState('All')
  const [open, setOpen] = useState(null)
  const list = FIELD.filter((f) => tag === 'All' || f.tag === tag)
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="From the field" title={<>Real Sites, <span className="mark">Real Installations</span></>} lede="A look at BuildINT engineers and systems at work across India." />
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {TAGS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tag === t} onClick={() => setTag(t)}
              className={`rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition ${tag === t ? 'border-ink bg-ink text-brand-lime' : 'border-line bg-white hover:border-ink'}`}>{t}</button>
          ))}
        </div>
        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {list.map((f) => (
              <motion.button layout key={f.img} type="button" onClick={() => setOpen(f)} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white text-left shadow-card">
                <img src={img(f.img)} alt={f.label} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 text-sm font-semibold text-white">
                  {f.label}<span className="shrink-0 rounded-full bg-brand-lime px-2 py-0.5 font-mono text-[10px] uppercase text-ink">{f.tag}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label={open.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/85 p-5 backdrop-blur-sm">
            <motion.figure initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="m-0 max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <img src={img(open.img)} alt={open.label} className="max-h-[78vh] w-auto rounded-2xl" />
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-white"><span className="font-semibold">{open.label}</span>
                <button type="button" onClick={() => setOpen(null)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close"><X className="h-5 w-5" /></button></figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default function CaseStudies() {
  useSeo('Projects & Case Studies', 'BuildINT AI projects: up to 30% lower HVAC energy in hospitals, 20% energy cost reduction in commercial buildings, 10–15% savings for BFSI, and 15,000+ sites deployed.')
  return (
    <>
      <PageHero crumb={[{ label: 'Projects' }]} title={<>Client <span className="mark">Success Stories</span></>} ill="dash" img="ai/success"
        lede="We take pride in our long-term relationship with our customers. Due to confidentiality constraints, we have only mentioned the industries we serve." />
      <section className="py-10 md:py-14">
        <div className="container-site grid gap-6">
          {CASES.map((c, i) => (
            <Reveal key={c.title} className="grid gap-8 rounded-3xl border border-line bg-white p-6 shadow-card transition duration-500 hover:shadow-lift md:grid-cols-[.9fr_1.1fr] md:gap-10 md:p-10">
              <div className="grid content-start gap-5">
                <span className="eyebrow">Case 0{i + 1}</span>
                <h2 className="text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.12]">{c.title}</h2>
                <Img ill={c.ill} src={c.img} alt={c.title} className="zoom aspect-[16/11] border border-line" />
              </div>
              <div className="grid min-w-0 content-start gap-6">
                <div className="rounded-2xl bg-brand-tint p-5">
                  <div className="font-display text-[clamp(52px,6.5vw,80px)] font-extrabold leading-[.9] tracking-[-0.05em] text-brand-deep">{c.resultPrefix}<CountUp to={c.result} suffix="%" /></div>
                  <small className="mt-2 block font-mono text-xs uppercase tracking-wider text-brand-dark">{c.resultLabel}</small>
                </div>
                <div><span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted">Challenge</span><p className="text-muted">{c.challenge}</p></div>
                <div><span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted">Solution</span><Ticks items={c.solution} /></div>
                <Button href={SITE.demoUrl} className="justify-self-start">Request a Demo</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FieldGallery />

      <section className="py-10 md:py-14">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead className="!mb-6" eyebrow="Client recognition & project success" title={<>In Our Clients' <span className="mark">Own Words</span></>}
              lede="Letters of appreciation from Diebold Nixdorf, Hitachi Payment Services and L&T Finance recognising BuildINT's delivery and support." />
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-line bg-line [gap:1px]">
              {CLIENTS.filter((c) => ['Diebold Nixdorf', 'Hitachi Payment Services', 'L&T Finance'].includes(c.name)).map((c) => <LogoChip key={c.name} {...c} color className="h-20 bg-white p-3" />)}
            </div>
          </div>
          <Reveal delay={0.1}><Img src="photos/client-letters" ill="cert" contain alt="Client appreciation letters" className="aspect-[3010/1821] border border-line bg-white shadow-card" /></Reveal>
        </div>
      </section>
      <CtaBand mascot />
    </>
  )
}

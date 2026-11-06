import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Leaf } from 'lucide-react'
import { SERIES, DEVICES, deviceIdToSeries } from '../data/products.js'
import { SITE } from '../data/site.js'
import { img } from '../config.js'
import { Button, Reveal, useSeo } from '../components/ui.jsx'
import GreenX from '../components/GreenX.jsx'
import { CtaBand } from '../components/Cards.jsx'
import NotFound from './NotFound.jsx'

function DeviceBlock({ d, showName }) {
  return (
    <div className="grid gap-6">
      {showName && (
        <div className="flex flex-wrap items-center gap-4">
          <img src={img(d.img)} alt="" className="h-16 w-16 rounded-2xl border border-line bg-white object-cover" />
          <div><h2 className="text-3xl font-extrabold">{d.name}</h2><p className="font-semibold text-brand-deep">{d.title}</p></div>
          <p className="basis-full text-[17px] text-muted">{d.overview}</p>
        </div>
      )}
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr_1.15fr]">
        <Reveal className="rounded-3xl border border-line bg-white p-7 shadow-card">
          <h3 className="mb-5 text-[22px] font-bold">Key Features</h3>
          <ul className="ticks">{d.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </Reveal>
        <Reveal delay={0.06} className="rounded-3xl border border-line bg-white p-7 shadow-card">
          <h3 className="mb-5 text-[22px] font-bold">Applications</h3>
          <ul className="grid gap-2.5">{d.applications.map((a) => <li key={a} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-deep" />{a}</li>)}</ul>
        </Reveal>
        <Reveal delay={0.12} className="overflow-hidden rounded-3xl bg-ink text-white">
          <h3 className="px-7 pb-4 pt-7 text-2xl font-extrabold text-white">{d.specs ? 'Technical specifications' : 'Integration & capabilities'}</h3>
          <dl className="divide-y divide-white/10 border-t border-white/10">
            {(d.specs || d.capabilities).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[1fr_1.2fr] gap-4 px-7 py-3.5 text-[15px]">
                <dt className="font-mono text-xs uppercase tracking-wider text-slate-400">{k}</dt><dd className="font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const p = SERIES.find((x) => x.id === id)
  const legacy = !p && deviceIdToSeries(id)
  useSeo(p ? `${p.name} (${p.device})` : null, p?.overview)
  if (legacy) return <Navigate to={`/products/${legacy.id}`} replace />
  if (!p) return <NotFound />
  const devs = p.devices.map((d) => DEVICES[d])
  const others = SERIES.filter((x) => x.id !== p.id)

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface to-white">
        <div className="container-site grid items-center gap-8 py-8 md:grid-cols-2 md:py-10">
          <div>
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted"><Link to="/" className="hover:text-brand-deep">Home</Link> / <Link to="/products" className="hover:text-brand-deep">Products</Link> / <span className="text-ink">{p.name}</span></nav>
            <span className="eyebrow mt-6">{p.kind}</span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-3">
              <GreenX model={p.model} className="text-[clamp(48px,7vw,88px)]" />
            </motion.h1>
            <p className="mt-4 text-[clamp(18px,2vw,24px)] font-bold leading-snug text-brand-deep">Powered by {p.device}</p>
            <p className="lede mt-4">{p.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={SITE.demoUrl}>Request a Demo</Button>
              <Button to="/solutions/ibms" kind="outline" arrow={false}>Part of iBMS</Button>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} className="relative">
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(118,223,35,.35),transparent_65%)]" />
            <div className={`relative grid items-center gap-4 ${devs.length > 1 ? 'grid-cols-[1.3fr_.7fr]' : ''}`}>
              {devs.map((d, i) => (
                <motion.img key={d.id} animate={{ y: [0, -10, 0] }} transition={{ duration: 5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }} src={img(d.img)} alt={`${p.name} – ${d.name}`} className="mx-auto max-h-[420px] w-full object-contain" />
              ))}
            </div>
            <span className="absolute bottom-4 right-2 inline-flex items-center gap-2 rounded-2xl bg-brand-deep px-4 py-3 text-sm font-semibold text-white shadow-lift"><Leaf className="h-4 w-4" />{p.tagline}</span>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-site grid gap-10">{devs.map((d) => <DeviceBlock key={d.id} d={d} showName={devs.length > 1} />)}</div>
      </section>

      <section className="bg-surface py-10 md:py-12">
        <div className="container-site">
          <h2 className="mb-8 text-[clamp(26px,3vw,36px)] font-extrabold">More from the Green X Series</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.06}>
                <Link to={`/products/${o.id}`} className="group grid grid-cols-[96px_1fr] items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-brand/60">
                  <img src={img(o.img)} alt="" className="h-24 w-24 rounded-xl object-contain" />
                  <span><GreenX model={o.model} className="text-2xl" /><span className="mt-1 block text-sm text-muted">{o.device} · {o.kind}</span>
                    <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-brand-deep">View <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand mascot title={<>Ready to Deploy {p.name}?</>} text="Our engineers will assess your sites and recommend the right setup." />
    </>
  )
}

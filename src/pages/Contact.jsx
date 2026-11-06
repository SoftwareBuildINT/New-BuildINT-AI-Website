import { useState } from 'react'
import { MapPin, Phone, Copy, Check, Mail, Globe } from 'lucide-react'
import { SITE } from '../data/site.js'
import { PageHero, Reveal, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'
import { ContactForm } from '../components/Forms.jsx'

function CopyButton({ value, label }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1600) } catch { /* the text stays selectable */ }
  }
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 justify-self-start rounded-lg border border-white/15 px-2.5 py-1.5 font-mono text-xs text-slate-300 transition hover:border-brand-lime hover:text-brand-lime">
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{done ? 'Copied' : label}
    </button>
  )
}

export default function Contact() {
  useSeo('Contact Us', `Contact BuildINT AI: ${SITE.phone}, ${SITE.email}. Registered office in Mumbai, AI Tech Center in Lucknow; teams in Hyderabad, Gurugram and Dubai.`)
  return (
    <>
      <PageHero crumb={[{ label: 'Contact Us' }]} title={<>Let's Build a <span className="mark">Greener Tomorrow</span></>} ill="map" img="presence/india-map" contain
        lede="We would love to hear from you and cater to your needs." />
      <section className="py-10 md:py-14">
        <div className="container-site grid items-start gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-12">
          <Reveal className="grid gap-6 rounded-3xl bg-ink p-8 text-white">
            <h2 className="text-[28px] font-bold text-white">{SITE.legalName}</h2>
            <div className="grid gap-2 border-t border-white/10 pt-5">
              <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-lime"><Phone className="h-3.5 w-3.5" />Phone</span>
              <p className="select-all text-lg font-semibold">{SITE.phone}</p>
              <CopyButton value={SITE.phone} label="Copy number" />
            </div>
            <div className="grid gap-2 border-t border-white/10 pt-5">
              <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-lime"><Mail className="h-3.5 w-3.5" />Email</span>
              <p className="select-all text-lg font-semibold">{SITE.email}</p>
              <CopyButton value={SITE.email} label="Copy email" />
            </div>
            <div className="grid gap-2 border-t border-white/10 pt-5">
              <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-lime"><Globe className="h-3.5 w-3.5" />Presence</span>
              <p className="text-slate-200">{SITE.presence.join(' · ')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-9">
            <h2 className="mb-6 text-2xl font-extrabold">Send Us a Message</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <section className="bg-surface py-10 md:py-14">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {SITE.offices.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.08} className="zoom overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <Img src={o.photo} ill="office" alt={`${o.kind}, ${o.city}`} className="aspect-[16/9] !rounded-none" />
              <div className="grid gap-2 p-7">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-brand-deep">{o.kind}</span>
                <h3 className="text-[22px] font-bold">{o.city}</h3>
                <p className="flex gap-2 text-muted"><MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" />{o.address}</p>
                <a href={o.map} target="_blank" rel="noopener noreferrer" className="justify-self-start text-sm font-semibold text-brand-deep hover:underline">Open in Google Maps →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

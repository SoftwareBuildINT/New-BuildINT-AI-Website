import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/people.js'
import Img from './Img.jsx'
import { SectionHead } from './ui.jsx'

export default function Testimonials() {
  const track = useRef(null)
  const [hold, setHold] = useState(false)
  const reduce = useReducedMotion()
  const move = (dir) => {
    const el = track.current; if (!el) return
    const w = (el.firstElementChild?.getBoundingClientRect().width || 340) + 20
    if (dir > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) el.scrollTo({ left: 0, behavior: 'smooth' })
    else el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => {
      const el = track.current; if (!el || hold || document.hidden) return
      const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) move(1)
    }, 5500)
    return () => clearInterval(t)
  }, [hold, reduce])

  return (
    <section id="reviews" className="on-dark scroll-mt-12 bg-ink py-10 md:py-14">
      <div className="container-site">
        <SectionHead dark eyebrow="Customer experience" title={<>Trusted Where <span className="text-brand-lime">Uptime Is Everything</span></>}
          action={<div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Previous review" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"><ArrowLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next review" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"><ArrowRight className="h-5 w-5" /></button>
          </div>} />
        <div ref={track} tabIndex={0} aria-label="Customer reviews"
          onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}
          className="no-scrollbar grid snap-x snap-mandatory auto-cols-[minmax(290px,420px)] grid-flow-col gap-5 overflow-x-auto pb-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.org} className="m-0 grid snap-start content-between gap-6 rounded-2xl border border-white/10 bg-ink-soft p-7 transition duration-300 hover:-translate-y-1 hover:border-brand/60">
              <blockquote className="text-[16.5px] leading-relaxed text-slate-200">
                <span className="mb-2 block font-display text-6xl font-extrabold leading-[.6] text-brand-lime">“</span>
                {t.text}
              </blockquote>
              <figcaption className="flex items-center gap-3.5 border-t border-white/10 pt-4">
                <Img src={t.logo} initials={t.initials} contain className="h-12 w-12 shrink-0 !rounded-xl !bg-white [&_.initials]:text-lg" />
                <span>
                  <b className="block font-display text-[17px] text-white">{t.org}</b>
                  <span className="flex items-center gap-1 font-mono text-xs text-brand-lime">
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3 w-3 fill-brand-lime text-brand-lime" aria-hidden="true" />)} {t.rating}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

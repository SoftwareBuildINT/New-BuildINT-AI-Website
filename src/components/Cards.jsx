import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Img from './Img.jsx'
import { Reveal } from './ui.jsx'
import { readMinutes } from '../data/posts.js'
import { SITE } from '../data/site.js'
import { img } from '../config.js'

/** Card that tilts gently toward the pointer (mouse only). */
export function TiltLink({ to, className = '', children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return <Link ref={ref} to={to} onPointerMove={onMove} onPointerLeave={reset} className={`will-change-transform transition-[transform,box-shadow,border-color] duration-300 ${className}`}>{children}</Link>
}

export function SolutionCard({ s, i = 0, wide }) {
  return (
    <Reveal delay={i * 0.07} className={wide ? 'md:col-span-3' : 'md:col-span-3 lg:col-span-2'}>
      <TiltLink to={`/solutions/${s.id}`} className="zoom group grid h-full grid-rows-[auto_1fr] rounded-2xl border border-line bg-white p-3 shadow-card hover:border-brand/60 hover:shadow-lift">
        <Img ill={s.ill} src={s.img} alt={s.title} className="aspect-[16/9]" />
        <div className="grid content-start gap-2 px-2.5 pb-2.5 pt-5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">{s.tag}</span>
          <h3 className="text-[22px] font-bold">{s.title}</h3>
          {s.long && <p className="-mt-1 text-sm font-semibold text-ink/70">{s.long}</p>}
          <p className="text-[15px] text-muted">{s.desc}</p>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </div>
      </TiltLink>
    </Reveal>
  )
}

export function PostCard({ p, i = 0 }) {
  return (
    <Reveal delay={i * 0.08}>
      <Link to={`/blog/${p.slug}`} className="zoom group grid content-start gap-3.5">
        <Img ill={p.ill} src={p.img} alt="" className="aspect-[16/10] border border-line" />
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted"><b className="font-semibold text-brand-deep">{p.tag}</b>· {readMinutes(p)} min read</span>
        <h3 className="text-[22px] font-bold leading-snug transition group-hover:text-brand-deep">{p.title}</h3>
        <p className="text-[15px] text-muted">{p.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-deep">Read Article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </Link>
    </Reveal>
  )
}

export function Ticks({ items }) {
  return <ul className="ticks">{items.map((t) => <li key={typeof t === 'string' ? t : t[0]}>{typeof t === 'string' ? t : <span><b className="font-semibold text-ink">{t[0]}:</b> {t[1]}</span>}</li>)}</ul>
}

export function CtaBand({ title = <>Go Green.<br />Save Energy.</>, text = "We would love to hear from you and cater to your needs. Tell us about your sites and we'll suggest the best-fit solution.", demo, mascot }) {
  return (
    <section className="py-12 md:py-14">
      <div className="container-site">
        <Reveal className={`relative grid items-end gap-8 overflow-hidden rounded-[28px] bg-ink p-8 text-white md:grid-cols-[1.3fr_1fr] md:p-16 ${mascot ? 'md:pr-56 lg:pr-64' : ''}`}>
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_85%_10%,rgba(60,168,12,.55),transparent_45%),radial-gradient(circle_at_10%_100%,rgba(118,223,35,.25),transparent_40%)]" />
          {mascot ? <motion.img src={img(SITE.mascot)} alt="Elebi, the BuildINT mascot, greeting with namaste" className="pointer-events-none absolute -bottom-2 right-4 hidden w-40 md:block lg:w-48" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }} /> : <motion.svg aria-hidden="true" viewBox="0 0 100 140" className="absolute right-8 top-8 hidden w-20 md:block" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <path d="M50 8a36 36 0 0 0-22 64c6 5 8 11 8 18h28c0-7 2-13 8-18A36 36 0 0 0 50 8z" fill="#3CA80C" />
            <path d="M40 60l10-18 4 14h8L50 78l-2-12h-8z" fill="#0F172A" />
            <rect x="36" y="96" width="28" height="8" rx="3" fill="#94A3B8" /><rect x="38" y="108" width="24" height="8" rx="3" fill="#94A3B8" /><rect x="43" y="120" width="14" height="8" rx="4" fill="#94A3B8" />
          </motion.svg>}
          <h2 className="relative text-[clamp(32px,4.4vw,56px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">{title}</h2>
          <div className="relative grid gap-5">
            <p className="text-lg text-slate-300">{text}</p>
            <div className="flex flex-wrap gap-3">
              <TiltLinkButton />
              {demo}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
function TiltLinkButton() {
  return <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#76DF23]">Contact us <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
}

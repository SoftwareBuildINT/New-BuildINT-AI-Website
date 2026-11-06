import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Circle, Sun, ArrowRight, Zap, Video, ReceiptIndianRupee, Cpu, ShieldCheck, Plug, Leaf, Sprout, CloudCog, Timer, Building2, MonitorCheck, Flame, Fingerprint, House, AirVent, Lightbulb, Router, Radar, Settings, BarChart3, Landmark, TrainFront, Factory, ShoppingCart, GraduationCap, HeartPulse, Package, Globe, Users, Monitor, Wrench, EyeOff, Boxes, IndianRupee, TrendingDown, BrainCircuit } from 'lucide-react'
import Img from './Img.jsx'

// Only the icons referenced by name in data files — keeps the bundle small.
const ICONS = { Sun, ArrowRight, Zap, Video, ReceiptIndianRupee, Cpu, ShieldCheck, Plug, Leaf, Sprout, CloudCog, Timer, Building2, MonitorCheck, Flame, Fingerprint, House, AirVent, Lightbulb, Router, Radar, Settings, BarChart3, Landmark, TrainFront, Factory, ShoppingCart, GraduationCap, HeartPulse, Package, Globe, Users, Monitor, Wrench, EyeOff, Boxes, IndianRupee, TrendingDown, BrainCircuit }
export function Icon({ name, ...props }) {
  const C = ICONS[name] || Circle
  return <C aria-hidden="true" {...props} />
}

const btnBase = 'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40'
const btnKinds = {
  primary: 'bg-brand-deep text-white shadow-[0_10px_24px_-12px_rgba(43,127,10,.9)] hover:bg-brand-dark',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  outline: 'border-2 border-ink/90 text-ink hover:bg-ink hover:text-white',
  light: 'border-2 border-white/30 text-white hover:bg-white hover:text-ink',
}

/** One button for internal routes, external links and form submits. */
export function Button({ to, href, kind = 'primary', arrow = true, children, className = '', ...rest }) {
  const cls = `${btnBase} ${btnKinds[kind]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

/** Fade-and-rise on scroll. */
export function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }} {...rest}>
      {children}
    </M>
  )
}

export function SectionHead({ eyebrow, title, lede, action, className = '', dark }) {
  return (
    <Reveal className={`mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="grid max-w-3xl gap-3">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className={`h-section ${dark ? 'text-white' : ''}`}>{title}</h2>
        {lede && <p className={`lede ${dark ? 'text-slate-400' : ''}`}>{lede}</p>}
      </div>
      {action}
    </Reveal>
  )
}

/** Inner page header with breadcrumb and illustration. */
export function PageHero({ crumb, title, lede, ill, img, contain, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface to-white">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(#E2E8F0_1px,transparent_1px),linear-gradient(90deg,#E2E8F0_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_70%_20%,#000,transparent_70%)]" />
      <div className="container-site relative grid items-center gap-8 py-8 md:grid-cols-[1.2fr_.8fr] md:py-10">
        <div>
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
            <Link to="/" className="hover:text-brand-deep">Home</Link>
            {crumb.map((c) => (
              <span key={c.label}> / {c.to ? <Link to={c.to} className="hover:text-brand-deep">{c.label}</Link> : <span className="text-ink">{c.label}</span>}</span>
            ))}
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-5 text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.06] tracking-[-0.035em]">{title}</motion.h1>
          {lede && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="lede mt-5">{lede}</motion.p>}
          {children}
        </div>
        {ill && (
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}>
            <Img ill={ill} src={img} contain={contain} alt="" className="aspect-[4/3] max-h-[300px] w-full rounded-3xl border border-line shadow-card md:max-h-[320px]" />
          </motion.div>
        )}
      </div>
    </section>
  )
}

/** Number that counts up when scrolled into view. Shows the final value without JS/motion. */
export function CountUp({ to, prefix = '', suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(to)
  useEffect(() => {
    if (!inView || reduce) return
    let raf, start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / (duration * 1000))
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    setVal(0)
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, to, duration])
  return <span ref={ref} className={`tabular-nums ${className}`}>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>
}

/** Sets <title> and meta description per page. */
export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | BuildINT AI` : 'BuildINT AI | Bharat Ka Apna Building Intelligence'
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
      m.content = description
    }
  }, [title, description])
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { NAV, SITE } from '../data/site.js'
import { SOLUTIONS } from '../data/solutions.js'
import { PRODUCTS } from '../data/products.js'
import { img } from '../config.js'
import { Button, Icon } from './ui.jsx'

export function Logo({ white = false, className = 'h-9' }) {
  const [bad, setBad] = useState(false)
  if (bad) return <span className={`font-display text-2xl font-extrabold tracking-tight ${white ? 'text-white' : 'text-brand-red'}`}>BuildINT <span className="text-brand">AI</span></span>
  return <img src={img(white ? SITE.logoWhite : SITE.logo)} alt="BuildINT AI" className={`w-auto ${className}`} onError={() => setBad(true)} />
}

const MENUS = {
  solutions: {
    items: SOLUTIONS.map((s) => ({ to: `/solutions/${s.id}`, icon: s.icon, title: s.title, desc: s.long })),
    all: { to: '/solutions', title: 'All Solutions', desc: 'iEMS, iATM, CBMS, fire safety, iMAXX and turnkey delivery' },
  },
  products: {
    items: PRODUCTS.map((p) => ({ to: `/products/${p.id}`, thumb: p.img, title: p.name, desc: `${p.device} · ${p.kind}` })),
    all: { to: '/products', title: 'The Green X Series', desc: 'Specs, features and the Green X Platform' },
  },
}

function Dropdown({ menu }) {
  const m = MENUS[menu]
  return (
    <div className="grid gap-1 p-2 lg:grid-cols-2">
      {m.items.map((s) => (
        <Link key={s.to} to={s.to} className="group grid grid-cols-[44px_1fr] items-center gap-3 rounded-xl p-2.5 transition hover:bg-surface">
          {s.thumb
            ? <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-line bg-white"><img src={img(s.thumb)} alt="" className="h-full w-full object-cover" /></span>
            : <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-tint text-brand-deep transition group-hover:bg-brand-deep group-hover:text-white"><Icon name={s.icon} className="h-5 w-5" /></span>}
          <span>
            <b className="block text-[14.5px] font-semibold text-ink">{s.title}</b>
            <small className="block text-[12.5px] leading-snug text-muted">{s.desc}</small>
          </span>
        </Link>
      ))}
      <Link to={m.all.to} className="grid grid-cols-[44px_1fr] items-center gap-3 rounded-xl p-2.5 transition hover:bg-surface">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-brand-lime"><Icon name="ArrowRight" className="h-5 w-5" /></span>
        <span><b className="block text-[14.5px] font-semibold">{m.all.title}</b><small className="block text-[12.5px] text-muted">{m.all.desc}</small></span>
      </Link>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const linkCls = ({ isActive }) =>
    `relative flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[14px] font-medium transition ${isActive ? 'text-ink' : 'text-muted hover:bg-surface hover:text-ink'} ${isActive ? "after:absolute after:inset-x-2.5 after:-bottom-[1px] after:h-[2px] after:rounded-full after:bg-brand after:content-['']" : ''}`

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition ${scrolled ? 'border-line shadow-[0_8px_30px_-18px_rgba(15,23,42,.3)]' : 'border-transparent'}`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="container-site flex h-[72px] items-center gap-4">
        <Link to="/" className="flex shrink-0 items-center" aria-label="BuildINT AI home"><Logo className="h-7 sm:h-8" /></Link>
        <nav className="ml-auto hidden xl:block" aria-label="Main">
          <ul className="flex items-center gap-0.5">
            {NAV.map((n) => (
              <li key={n.to} className={n.dropdown ? 'group relative' : ''}>
                <NavLink to={n.to} end={n.to === '/'} className={linkCls}>
                  {n.label}{n.dropdown && <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden="true" />}
                </NavLink>
                {n.dropdown && (
                  <div className="invisible absolute left-1/2 top-full w-[600px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-2xl border border-line bg-white shadow-lift"><Dropdown menu={n.dropdown} /></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Button href={SITE.demoUrl} className="hidden whitespace-nowrap !px-5 !py-2.5 !text-sm xl:inline-flex">Request a Demo</Button>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-line text-ink xl:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white xl:hidden">
            <nav className="container-site grid gap-1 py-4" aria-label="Mobile">
              {NAV.map((n) => (
                <div key={n.to}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `block rounded-xl px-3 py-3 text-lg font-semibold ${isActive ? 'bg-brand-tint text-brand-dark' : 'text-ink'}`}>{n.label}</NavLink>
                  {n.dropdown && <div className="pl-2"><Dropdown menu={n.dropdown} /></div>}
                </div>
              ))}
              <Button href={SITE.demoUrl} className="mt-3 w-full">Request a Demo</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

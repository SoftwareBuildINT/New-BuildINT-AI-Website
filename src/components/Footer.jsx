import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '../data/site.js'
import { Logo } from './Navbar.jsx'

const cols = [
  { h: 'Solutions', links: [['/solutions/ibms', 'iBMS'], ['/solutions/cctv', 'Surveillance AI'], ['/solutions/solar', 'Solar'], ['/solutions/access', 'Access Control'], ['/solutions/turnkey', 'Turnkey Projects']] },
  { h: 'Green X', links: [['/products/green-x-100', 'Green X 100 · LiBi'], ['/products/green-x-200', 'Green X 200 · BigIO'], ['/products/green-x-500', 'Green X 500 · NEON'], ['/products/green-x-1000', 'Green X 1000 · Bi-Bug'], ['/products', 'The Green X Platform']] },
  { h: 'Company', links: [['/about', 'About Us'], ['/case-studies', 'Projects'], ['/csr', 'CSR Essential'], ['/esg', 'ESG'], ['/careers', 'Careers'], ['/blog', 'Blog'], ['/faq', 'FAQ']] },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-slate-300" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="container-site pb-10 pt-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_.8fr_.8fr]">
          <div>
            <Logo white className="h-8" />
            <p className="mt-2 text-sm font-semibold text-brand-lime">{SITE.tagline}</p>
            <p className="mt-5 max-w-sm text-[15px] text-slate-400">AI and IoT-powered smart building intelligence: iBMS on the Green X Platform, Surveillance AI, solar and access control.</p>
            <div className="mt-6 grid gap-2.5 text-sm">
              <span className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-brand-lime" /><span className="select-all">{SITE.phone}</span></span>
              <span className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brand-lime" /><span className="select-all">{SITE.email}</span></span>
              <span className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-brand-lime" />{SITE.presence.join(' · ')}</span>
            </div>
            <div className="mt-6 flex gap-2">
              {SITE.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 font-mono text-xs font-semibold text-slate-400 transition hover:-translate-y-0.5 hover:border-brand-lime hover:bg-brand-lime hover:text-ink">{s.short}</a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-lime">{c.h}</h4>
              <ul className="grid gap-2.5">
                {c.links.map(([to, label]) => <li key={label}><Link to={to} className="transition hover:pl-1 hover:text-white">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2">
          {SITE.offices.map((o) => (
            <div key={o.city}><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-lime">{o.kind} · {o.city}</span><p className="mt-1.5 text-sm text-slate-400">{o.address}</p></div>
          ))}
        </div>

        <div aria-hidden="true" className="mt-12 select-none whitespace-nowrap font-display text-[clamp(48px,10vw,140px)] font-extrabold leading-[.8] tracking-[-0.06em] text-white">
          <span className="text-orange-400">Jai</span> Hind<span className="text-green-400">!</span>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-slate-500">
          <span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
          <nav className="flex flex-wrap gap-5" aria-label="Legal">
            <Link to="/cookies" className="hover:text-brand-lime">Cookie Policy</Link>
            <Link to="/privacy" className="hover:text-brand-lime">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-lime">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

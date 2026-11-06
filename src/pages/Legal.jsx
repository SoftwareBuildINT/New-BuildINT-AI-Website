import { NavLink } from 'react-router-dom'
import { LEGAL } from '../data/legal.js'
import { useSeo } from '../components/ui.jsx'

export default function Legal({ kind }) {
  const doc = LEGAL[kind]
  useSeo(doc.title)
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-surface to-white">
        <div className="container-site py-10 md:py-14">
          <p className="font-mono text-xs text-muted">Home / {doc.title}</p>
          <h1 className="mt-5 text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.06] tracking-[-0.035em]">{doc.title}</h1>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Policies">
            {Object.entries(LEGAL).map(([k, d]) => (
              <NavLink key={k} to={`/${k}`} className={({ isActive }) => `rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition ${isActive ? 'border-ink bg-ink text-brand-lime' : 'border-line hover:border-ink'}`}>{d.title}</NavLink>
            ))}
          </nav>
        </div>
      </section>
      <section className="py-10 md:py-14"><div className="container-site"><div className="legal-body" dangerouslySetInnerHTML={{ __html: doc.html }} /></div></section>
    </>
  )
}

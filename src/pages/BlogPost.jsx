import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { POSTS, readMinutes, sectionId } from '../data/posts.js'
import { Button, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'
import { PostCard } from '../components/Cards.jsx'
import NotFound from './NotFound.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const p = POSTS.find((x) => x.slug === slug)
  useSeo(p?.title, p?.excerpt)
  const [on, setOn] = useState('')
  useEffect(() => {
    if (!p) return
    const onScroll = () => { let cur = ''; for (const [t] of p.sections) { const el = document.getElementById(sectionId(t)); if (el && el.getBoundingClientRect().top < 140) cur = t } setOn(cur) }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [p])
  if (!p) return <NotFound />
  const jump = (t) => (e) => { e.preventDefault(); const el = document.getElementById(sectionId(t)); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }) }

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-surface to-white">
        <div className="container-site pb-10 pt-14 md:pt-20">
          <nav className="font-mono text-xs text-muted" aria-label="Breadcrumb"><Link to="/" className="hover:text-brand-deep">Home</Link> / <Link to="/blog" className="hover:text-brand-deep">Blogs</Link> / <span className="text-ink">{p.short}</span></nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-5 max-w-[22ch] text-[clamp(32px,4.4vw,56px)] font-extrabold leading-[1.1] tracking-[-0.03em]">{p.title}</motion.h1>
          <p className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted"><b className="font-semibold text-brand-deep">{p.tag}</b>· {readMinutes(p)} min read · BuildINT</p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="container-site">
          <Img ill={p.ill} src={p.cover} alt={p.title} eager className="mb-12 aspect-[21/9] rounded-3xl border border-line" />
          <div className="grid items-start gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
            <nav aria-label="On this page" className="grid gap-1 text-sm lg:sticky lg:top-28">
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
              {p.sections.map(([t]) => (
                <a key={t} href={`#${sectionId(t)}`} onClick={jump(t)} className={`border-l-2 py-1.5 pl-3 transition ${on === t ? 'border-brand font-semibold text-ink' : 'border-line text-muted hover:border-brand hover:text-ink'}`}>{t}</a>
              ))}
            </nav>
            <article className="article-body">
              <p className="text-lg text-muted">{p.excerpt}</p>
              {p.sections.map(([t, html]) => (
                <div key={t} className="contents">
                  <h2 id={sectionId(t)}>{t}</h2>
                  <div className="grid gap-4" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              ))}
              <div className="mt-6 grid gap-3 rounded-2xl bg-ink p-7 text-white">
                <b className="font-display text-2xl">Ready to put IoT to work?</b>
                <p className="text-slate-400">Talk to BuildINT about energy management, e-surveillance and automation for your sites.</p>
                <Button to="/contact" className="justify-self-start">Contact Us</Button>
              </div>
            </article>
          </div>
          <p className="mb-6 mt-12 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">Keep reading</p>
          <div className="grid gap-10 sm:grid-cols-2">{POSTS.filter((x) => x.slug !== p.slug).map((x, i) => <PostCard key={x.slug} p={x} i={i} />)}</div>
        </div>
      </section>
    </>
  )
}

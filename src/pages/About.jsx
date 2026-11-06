// Website created by Krutiksha Bawa.
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Network, Zap, Globe, Target, Eye, MapPin, ArrowRight, Sun, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GreenXMark } from '../components/GreenX.jsx'
import { SITE } from '../data/site.js'
import { BOARD, LEADERSHIP } from '../data/people.js'
import { img } from '../config.js'
import { CountUp, Reveal, SectionHead, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'
import { CtaBand } from '../components/Cards.jsx'

const VALUES = [
  [Lightbulb, 'Innovation', 'With technology evolving rapidly, our dedicated R&D team continues to enhance our IoT platforms, smart devices, and automation solutions, driving forward intelligent energy systems built for tomorrow.'],
  [Network, 'Collaboration', 'We believe in the strength of connected networks and meaningful partnerships—working together to unlock new opportunities through IoT integration and shared growth.'],
  [Zap, 'Agility', 'In a world of constant change, we stay adaptable—embracing real-time data, edge analytics, and fresh ideas to respond swiftly and positively to every challenge.'],
  [Globe, 'Diversity', 'We value the richness of diverse minds and experiences, knowing that the best IoT solutions are shaped by many voices, ideas, and perspectives from across industries and cultures.'],
]
const initials = (n) => n.replace(/^(Captain|Dr)\s+/, '').split(' ').map((w) => w[0]).join('').slice(0, 2)

function Avatar({ p, size = 'h-40 w-40' }) {
  return (
    <div className={`relative ${size} shrink-0`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-lime to-brand-deep p-[3px]">
        <Img src={p.photo} initials={initials(p.name)} alt={p.name} className="h-full w-full !rounded-full bg-white [&>img]:object-top" />
      </div>
    </div>
  )
}

function PersonCard({ p, i }) {
  return (
    <Reveal delay={i * 0.08} className="grid content-start justify-items-center gap-3 rounded-3xl border border-line bg-white p-8 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Avatar p={p} />
      <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
      <span className="h-[3px] w-10 rounded-full bg-brand" />
      <span className="font-semibold text-brand-deep">{p.role}</span>
      {p.bio && <p className="text-[15px] text-muted">{p.bio}</p>}
      {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn`} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-xs font-bold text-muted transition hover:border-ink hover:bg-ink hover:text-brand-lime">in</a>}
    </Reveal>
  )
}

function BoardCard({ p, i }) {
  return (
    <Reveal delay={i * 0.08} className="group relative grid h-full items-start gap-6 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-tint/70 via-white to-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[auto_1fr] md:p-8">
      <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-lime/10" aria-hidden="true" />
      <div className="relative mx-auto sm:mx-0 sm:mt-1"><Avatar p={p} size="h-36 w-36 md:h-44 md:w-44" /></div>
      <div className="relative grid gap-2.5 text-center sm:text-left">
        <span className="eyebrow justify-center sm:justify-start">{p.role}</span>
        <h3 className="text-[clamp(24px,2.4vw,30px)] font-extrabold leading-tight">{p.name}</h3>
        <span className="mx-auto h-[3px] w-10 rounded-full bg-brand sm:mx-0" />
        {p.bio && <p className="text-[15.5px] leading-relaxed text-muted">{p.bio}</p>}
        {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center justify-center gap-2 self-center justify-self-center rounded-full border-2 border-ink px-4 py-1.5 text-sm font-semibold transition hover:bg-ink hover:text-white sm:justify-self-start">
          <span className="grid h-5 w-5 place-items-center rounded bg-[#0A66C2] text-[10px] font-bold text-white">in</span>LinkedIn</a>}
      </div>
    </Reveal>
  )
}

function FeaturedCard({ p }) {
  return (
    <Reveal className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-[.9fr_1.1fr]">
      <div className="relative min-h-[340px] bg-ink md:min-h-full">
        <img src={img(p.photo)} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[12px] font-bold text-ink shadow-card"><span className="h-2 w-2 rounded-full bg-brand" />Founder · Since 2019</span>
      </div>
      <div className="flex flex-col justify-center gap-3 bg-gradient-to-br from-brand-tint/70 via-white to-white p-7 text-left md:p-9">
        <span className="eyebrow">{p.role}</span>
        <h3 className="text-[clamp(26px,2.6vw,32px)] font-extrabold leading-tight">{p.name}</h3>
        <span className="h-[3px] w-10 rounded-full bg-brand" />
        {(p.about || [p.bio]).map((t) => <p key={t.slice(0, 24)} className="text-[16px] leading-relaxed text-muted">{t}</p>)}
        {p.highlights && (
          <ul className="mt-1 flex flex-wrap gap-2">
            {p.highlights.map((h) => <li key={h} className="rounded-full border border-brand/25 bg-white px-3 py-1.5 text-[12px] font-semibold text-brand-deep">{h}</li>)}
          </ul>
        )}
        {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 justify-self-start self-start rounded-full border-2 border-ink px-5 py-2 text-sm font-semibold transition hover:bg-ink hover:text-white">Connect on LinkedIn</a>}
      </div>
    </Reveal>
  )
}

/* Video with a branded thumbnail: title, length and a big play button */
function FilmCard() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const play = () => { setPlaying(true); requestAnimationFrame(() => ref.current?.play()) }
  return (
    <div className="relative">
      <div className="absolute -inset-2 rounded-[26px] bg-gradient-to-br from-brand-lime/30 to-transparent blur-xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(118,223,35,.45)]">
        <video ref={ref} className="block aspect-video w-full" src="/videos/buildint-journey.mp4" poster={img('photos/journey-poster')}
          controls={playing} playsInline preload="none" aria-label="BuildINT AI company film: 7 years of building intelligence, 2019 to 2026" />
        {!playing && (
          <button type="button" onClick={play} className="group absolute inset-0 text-left" aria-label="Play the BuildINT AI company film">
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" aria-hidden="true" />
            <span className="absolute inset-x-5 bottom-5 flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-lime text-ink shadow-[0_0_0_8px_rgba(118,223,35,.22)] transition duration-300 group-hover:scale-110 md:h-16 md:w-16">
                <Play className="h-6 w-6 translate-x-0.5 fill-current md:h-7 md:w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-lime">Company film · 2:30</span>
                <b className="block font-display text-[clamp(17px,2vw,24px)] font-extrabold leading-tight text-white">7 Years of Building Intelligence</b>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

function Journey() {
  return (
    <section className="on-dark overflow-hidden bg-ink py-12 md:py-16">
      <div className="container-site">
        <Reveal className="mb-8 grid gap-3 md:mb-10">
          <span className="eyebrow">Our journey</span>
          <h2 className="h-section max-w-[24ch] text-white">From a Start-Up in 2019 to <span className="text-brand-lime">15,000+ Sites</span></h2>
        </Reveal>
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-10">
          <Reveal><FilmCard /></Reveal>
          <Reveal delay={0.1}>
            <ol className="relative grid gap-0.5 border-l-2 border-white/10 pl-6">
              {SITE.journey.map((j) => (
                <li key={j.year} className="relative grid grid-cols-[52px_1fr] items-baseline gap-3 py-2">
                  <span className={`absolute -left-[31px] top-[13px] h-3 w-3 rounded-full border-2 bg-ink ${j.note ? 'border-amber-400' : 'border-brand-lime'}`} aria-hidden="true" />
                  <b className="font-display text-[15px] font-extrabold text-brand-lime">{j.year}</b>
                  <span className="text-[15px] leading-snug text-slate-200">{j.text}{j.note && <span className="ml-2 rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">{j.note}</span>}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  useSeo('About Us', 'Go green, save energy. BuildINT AI runs iBMS on the Green X Platform, and ESSA brings energy, surveillance AI, solar and access control onto one cloud dashboard, with Made-in-India devices.')
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-10 pt-8 md:pb-14 md:pt-12">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal className="grid gap-5 text-[17px] text-muted">
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted"><Link to="/" className="hover:text-brand-deep">Home</Link> / <span className="text-ink">About Us</span></nav>
            <span className="eyebrow">About BuildINT AI</span>
            <h1 className="whitespace-nowrap text-[clamp(28px,3.6vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">Go Green. <span className="text-brand">Save Energy.</span></h1>
            <p className="text-[19px] font-medium leading-relaxed text-ink">BuildINT AI runs iBMS on the Green X Platform, and <b className="font-extrabold text-brand-deep">ESSA</b> brings <b>E</b>nergy, <b>S</b>urveillance AI, <b>S</b>olar and <b>A</b>ccess control onto one cloud dashboard, with Made-in-India devices.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SITE.brands.map((b) => (
                <Link key={b.name} to={b.to} className="group grid content-start gap-2.5 rounded-2xl border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand-deep">{b.name === 'Green X' ? <GreenXMark className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</span>
                    <span><b className="block font-display text-xl font-extrabold leading-none text-ink">{b.name}</b><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">{b.role}</span></span>
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted">{b.text}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
            {SITE.about.slice(1).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <div className="grid gap-3 rounded-2xl border-l-4 border-brand bg-brand-tint/60 p-5 md:p-6">
              <b className="font-display text-xl font-extrabold text-ink">From Vision to Reality</b>
              {SITE.story.map((p) => <p key={p.slice(0, 24)} className="text-[16px] leading-relaxed">{p}</p>)}
            </div>
          </Reveal>
          <div className="grid gap-4">
            <Reveal className="relative">
              <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-br from-brand-lime/35 via-brand-tint to-transparent" aria-hidden="true" />
              <Img src="ai/success" ill="ai" alt="AI-powered energy savings across buildings: lower HVAC energy and energy cost with Green X" eager className="relative aspect-[4/3] rounded-3xl border border-line shadow-lift" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[13px] font-bold text-ink shadow-card backdrop-blur"><span className="h-2 w-2 rounded-full bg-brand" />AI that saves energy, automatically</span>
            </Reveal>
            {[[Target, 'Our Mission', SITE.mission], [Eye, 'Our Vision', SITE.vision]].map(([I, h, t], i) => (
              <Reveal key={h} delay={i * 0.08} className="grid grid-cols-[52px_1fr] gap-4 rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-brand-tint text-brand-deep"><I className="h-6 w-6" /></span>
                <span><b className="block font-display text-xl">{h}</b><span className="text-muted">{t}</span></span>
              </Reveal>
            ))}
            <Reveal delay={0.16} className="grid grid-cols-3 gap-3 rounded-2xl bg-brand-dark p-6 text-white">
              {[SITE.traction[2], SITE.traction[3], SITE.traction[4]].map((s) => (
                <div key={s.label}><b className="block font-display text-[clamp(22px,2.4vw,30px)] font-extrabold text-brand-lime"><CountUp to={s.to} suffix={s.suffix} /></b><span className="text-xs text-green-100">{s.label}</span></div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <Journey />

      <section className="py-10 md:py-14">
        <div className="container-site">
          <Reveal className="mb-8 grid gap-3 text-center justify-items-center">
            <span className="eyebrow">Board of Advisors</span>
            <h2 className="h-section">Guiding <span className="text-brand-lime">BuildINT's Vision</span></h2>
          </Reveal>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            {BOARD.map((p, i) => <BoardCard key={p.name} p={p} i={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-surface py-10 md:py-14">
        <div className="container-site">
          <Reveal className="mb-6 grid gap-3">
            <span className="eyebrow">Leadership team</span>
            <h2 className="h-section lg:whitespace-nowrap">Meet the Leaders Driving <span className="text-brand-lime">BuildINT's Growth</span></h2>
          </Reveal>
          <p className="mb-8 text-[17px] text-muted">Our leadership team brings together a wealth of experience, expertise, and vision to guide BuildINT AI's mission of delivering smart energy management solutions. With a focus on innovation, sustainability, and customer success, our leaders are committed to shaping the future of intelligent energy systems.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((p, i) => <PersonCard key={p.name} p={p} i={i} />)}
          </div>

        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-site">
          <Reveal className="mb-8 grid justify-items-center gap-3 text-center">
            <span className="eyebrow">BuildINT family</span>
            <h2 className="h-section">Bandhan: <span className="text-brand-lime">One Team. One Vision. One Future.</span></h2>
            <p className="lede">Work together. Celebrate together. Grow together. The people behind every Green X device and every site we power.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {[['team/bandhan-team', 'The BuildINT team together, wearing Bandhan t-shirts', 'Team Bandhan'], ['team/bandhan-art', 'Illustration of the BuildINT family with the Bandhan logo', 'The BuildINT Family']].map(([src, alt, cap], i) => (
              <Reveal key={src} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-line shadow-card">
                <img src={img(src)} alt={alt} loading="lazy" className="aspect-[2/1] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[13px] font-bold text-ink shadow-card"><span className="h-2 w-2 rounded-full bg-brand" />{cap}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-10 md:py-14">
        <div className="container-site">
          <SectionHead dark eyebrow="Our core values" title={<>How We <span className="text-brand-lime">Build</span></>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([I, h, p], i) => (
              <Reveal key={h} delay={i * 0.08} className="grid content-start gap-3 rounded-2xl border border-white/10 bg-ink-soft p-7 transition duration-300 hover:-translate-y-1 hover:border-brand/60">
                <I className="h-9 w-9 text-brand-lime" strokeWidth={1.6} />
                <h3 className="text-2xl font-bold text-white">{h}</h3>
                <p className="text-[15px] text-slate-400">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal><img src={img('presence/india-map')} alt="BuildINT presence: Mumbai, Lucknow, Hyderabad, Gurugram and Dubai" loading="lazy" className="mx-auto w-full max-w-[500px]" /></Reveal>
          <div>
            <Reveal className="mb-6 grid gap-3">
              <span className="eyebrow">Our presence</span>
              <h2 className="text-[clamp(17px,1.7vw,22px)] font-extrabold leading-snug tracking-[-0.01em] text-ink sm:whitespace-nowrap">{SITE.presence.join(' · ')}</h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {SITE.offices.map((o) => (
                <div key={o.city} className="zoom overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                  <Img src={o.photo} ill="office" alt={`${o.kind}, ${o.city}`} className="aspect-[16/10] !rounded-none" />
                  <div className="grid gap-1 p-5"><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-deep">{o.kind}</span><b className="font-display text-lg">{o.city}</b><p className="flex gap-1.5 text-sm text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{o.address}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand mascot />
    </>
  )
}

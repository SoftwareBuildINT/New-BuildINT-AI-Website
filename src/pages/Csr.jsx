import { Leaf, Zap, Trophy, ArrowUpRight } from 'lucide-react'
import { CountUp, PageHero, Reveal, SectionHead, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'
import { CtaBand } from '../components/Cards.jsx'
import { SITE } from '../data/site.js'

const ROWS = [
  { k: 'Planet', h: 'Sustainable Practices', ill: 'factory', img: 'old/Sustainable-practice', p: 'We embed smart energy systems into every part of our operations—from eco-friendly manufacturing to energy-efficient recycling—driven by IoT-based automation and a deep commitment to reducing our carbon footprint.' },
  { k: 'People', h: 'Education Initiatives', ill: 'edu', img: 'old/education', p: 'Through interactive learning and school partnerships, we promote energy awareness and smart technology education—empowering the next generation to lead with sustainable thinking.' },
  { k: 'Communities', h: 'Bridging the Energy Gap in Rural India', ill: 'rural', img: 'old/rural-education', p: "Using connected devices and renewable solutions, we're helping rural communities access reliable energy—boosting livelihoods and supporting long-term sustainable development." },
]

const LINKEDIN = SITE.socials.find((s) => s.label === 'LinkedIn')?.url

function Impact() {
  const { energy, co2, note } = SITE.impact
  const tiles = [[Zap, energy], [Leaf, co2]]
  return (
    <section className="on-dark relative overflow-hidden bg-brand-dark py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_85%_10%,rgba(118,223,35,.35),transparent_45%),radial-gradient(circle_at_0%_100%,rgba(118,223,35,.18),transparent_40%)]" />
      <div className="container-site relative grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal className="grid gap-4">
          <span className="eyebrow">BuildINT AI · Sustainability impact</span>
          <h2 className="h-section text-white">Real Savings, <span className="text-brand-lime">Measured Impact</span></h2>
          <p className="max-w-[48ch] text-[17px] leading-relaxed text-green-100">Every Green X device we install cuts waste automatically. Added up across our sites, that is energy India doesn't have to generate and carbon that never reaches the air.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {tiles.map(([I, t], i) => (
            <Reveal key={t.label} delay={0.1 + i * 0.1} className="grid gap-3 rounded-3xl border border-white/15 bg-white/[.06] p-7 backdrop-blur">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-lime/15 text-brand-lime"><I className="h-5 w-5" /></span>
              <b className="whitespace-nowrap font-display text-[clamp(34px,3.6vw,46px)] font-extrabold leading-none tracking-[-0.03em] text-white">
                <CountUp to={t.to} suffix={t.suffix} /> <span className="text-[0.42em] font-bold tracking-normal text-brand-lime">{t.unit}</span>
              </b>
              <span className="text-[15px] font-semibold text-green-100">{t.label}</span>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="flex items-start gap-3 rounded-2xl bg-black/15 px-5 py-4 text-[14px] leading-relaxed text-green-50 sm:col-span-2">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-brand-lime" />{note}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Community() {
  return (
    <section className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <SectionHead eyebrow="Community & sport" title={<>Beyond Buildings: <span className="mark">Backing Our Communities</span></>}
          lede="From the playing field to the classroom, we support the people and places around us." />
        <div className="grid gap-6 md:grid-cols-2">
          {SITE.community.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className={`group grid content-start gap-4 rounded-3xl border border-line bg-white p-7 shadow-card transition duration-300 hover:shadow-lift ${c.photos ? 'md:col-span-2 md:p-8' : 'hover:-translate-y-1'}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand-deep"><Trophy className="h-6 w-6" /></span>
                <span className="eyebrow">{c.kind}</span>
              </div>
              {c.img && <Img src={c.img} alt={c.title} className="aspect-[16/9] border border-line" />}
              {c.photos && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {c.photos.map(([src, alt]) => <Img key={src} src={src} alt={alt} className="zoom aspect-[2/1] rounded-2xl border border-line" />)}
                </div>
              )}
              <h3 className="text-2xl font-bold">{c.title}</h3>
              <p className="text-[16px] text-muted">{c.text}</p>
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 justify-self-start rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004182]">
                  See it on LinkedIn<ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </Reveal>
          ))}
          <Reveal delay={0.1} className="grid content-center justify-items-start gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand-tint/60 p-7 md:col-span-2">
            <span className="eyebrow">Follow our journey</span>
            <h3 className="text-2xl font-bold">Events, Drives and Milestones</h3>
            <p className="text-[16px] text-muted">See our latest CSR activities, sponsorships and team moments as they happen.</p>
            {LINKEDIN && (
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-semibold transition hover:bg-ink hover:text-white">
                Follow BuildINT AI on LinkedIn<ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Csr() {
  useSeo('CSR Essential', 'Smart IoT for social impact: 10 Lakh+ kWh energy saved, 675+ tonnes of CO₂ avoided, education initiatives, community sport and rural energy access.')
  return (
    <>
      <PageHero crumb={[{ label: 'CSR Essential' }]} title={<>Smart IoT for <span className="mark">Social Impact</span></>} ill="leaf"
        lede="At BuildINT, we're committed to smart infrastructure solutions that go beyond business—focused on giving back and creating lasting impact. Through IoT-driven sustainability, energy-efficient technologies, and community-centered initiatives, we work toward a greener, more connected future for all." />
      <Impact />
      <section className="py-10 md:py-14">
        <div className="container-site">
          {ROWS.map((r, i) => (
            <div key={r.h} className="grid items-center gap-8 border-t border-line py-12 first:border-t-0 md:grid-cols-2 md:gap-10 md:py-10">
              <Reveal className={i % 2 ? 'md:order-2' : ''}><Img ill={r.ill} src={r.img} alt={r.h} className="zoom aspect-[16/10] border border-line shadow-card" /></Reveal>
              <Reveal delay={0.08}>
                <span className="eyebrow">{r.k}</span>
                <h2 className="mb-4 mt-3.5 text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.12]">{r.h}</h2>
                <p className="max-w-[52ch] text-[17px] text-muted">{r.p}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <Community />
      <CtaBand />
    </>
  )
}

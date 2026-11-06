import { TrendingUp, Lightbulb, HeartHandshake, Sprout } from 'lucide-react'
import { ROLES } from '../data/people.js'
import { PageHero, Reveal, useSeo } from '../components/ui.jsx'
import { CareerForm } from '../components/Forms.jsx'

const PERKS = [
  [TrendingUp, 'Room to Grow', 'Careers in smart technology with space to innovate and thrive.'],
  [Lightbulb, 'Bold Ideas Welcome', 'A culture that sparks creativity and promotes ownership.'],
  [HeartHandshake, 'A Work Family', 'We celebrate wins and support each other every step of the way.'],
  [Sprout, 'Meaningful Work', 'Fair opportunities and a future that truly matters.'],
]

export default function Careers() {
  useSeo('Careers', 'Come build the future with BuildINT AI: 300+ engineers PAN India and an AI Tech Center in Lucknow. Openings for Project Managers, Site Engineers and Software Developers.')
  return (
    <>
      <PageHero crumb={[{ label: 'Career' }]} title={<>Come Build the Future with <span className="mark">BuildINT</span></>} ill="team" img="presence/lucknow-tech-center">
        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">We are looking for</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {ROLES.map((r) => (
            <button key={r} type="button" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5">
              <i className="pulse-dot h-2 w-2 rounded-full bg-brand" />{r}
            </button>
          ))}
        </div>
      </PageHero>
      <section className="py-12 md:py-14">
        <div className="container-site grid items-start gap-12 md:grid-cols-2">
          <Reveal className="grid gap-5 text-[17px] text-muted">
            <p>At BuildINT, we offer more than just jobs—we offer careers in smart technology with room to grow, innovate, and thrive. Our smart office is home to connected minds working on real impact through IoT devices, automation solutions, and intelligent systems.</p>
            <p>We foster a culture that sparks creativity, promotes ownership, and welcomes bold ideas. Here, you're not just part of a team—you're part of a work family that values growth, celebrates wins, and supports each other every step of the way. We believe in fair opportunities, meaningful work, and building a future that truly matters.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {PERKS.map(([I, h, p], i) => (
              <Reveal key={h} delay={i * 0.07} className="grid gap-2 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-brand/50">
                <I className="h-7 w-7 text-brand-deep" /><b className="font-display text-lg">{h}</b><p className="text-sm text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="apply" className="scroll-mt-12 bg-surface py-12 md:py-14">
        <div className="container-site">
          <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-10">
            <h2 className="mb-6 text-[clamp(26px,3vw,36px)] font-extrabold">Apply Now</h2>
            <CareerForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

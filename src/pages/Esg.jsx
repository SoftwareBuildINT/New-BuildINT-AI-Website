import { PageHero, Reveal, SectionHead, useSeo } from '../components/ui.jsx'
import Img from '../components/Img.jsx'

const ROWS = [
  ['E', 'Environmental Factors', "Impact on company's operations, both direct and indirect."],
  ['S', 'Social Factors', 'Relation of companies with the employees, labour, suppliers, consumers and other stakeholders.'],
  ['G', 'Governance Factors', 'Diversity in the board, leadership, remuneration of the board, engagement of stakeholders and independence in the matter of financial auditing and reporting.'],
]
const PILLARS = [
  { h: 'Environment', ill: 'leaf', img: 'old/green-technology', items: ['Energy Usage', 'Carbon Footprint', 'Climate Change', 'Waste Management', 'Pollution Monitoring', 'Natural Resource Conservation', 'Contaminated property', 'Hazardous Waste', 'Toxic emissions', 'Pollution control regulations'] },
  { h: 'Social', ill: 'team', img: 'old/group', items: ['Employee Welfare', 'Vendor relationships', 'Local social welfare programmes', 'Healthcare Initiative', 'Welfare Initiatives', 'Gender equality', 'Race equality', 'Religion equality', 'Human Rights monitoring', 'Education initiative'] },
  { h: 'Governance', ill: 'bank', img: 'old/government', items: ['Transparent Accounting', 'Investor Relationships', 'Board-conflict of Interest', 'Business Ethics', 'Opportunity of being heard', 'Political influence', 'Legal practices', 'Whistleblower policy'] },
]

export default function Esg() {
  useSeo('ESG Understandings', 'What ESG means and the environmental, social and governance components BuildINT works with.')
  return (
    <>
      <PageHero crumb={[{ label: 'ESG Understandings' }]} title={<>ESG <span className="mark">Understandings</span></>} ill="leaf" lede="Environmental, Social and Governance factors (ESG) are standards set to be socially conscious." />
      <section className="py-10 md:py-14">
        <div className="container-site">
          <Reveal className="grid overflow-hidden rounded-2xl border border-line bg-line [gap:1px]">
            {ROWS.map(([L, b, p]) => (
              <div key={L} className="grid grid-cols-[60px_1fr] items-center gap-5 bg-white p-6 transition hover:bg-surface md:grid-cols-[90px_240px_1fr]">
                <span className="font-display text-5xl font-extrabold text-brand-deep md:text-6xl">{L}</span>
                <b className="font-display text-xl">{b}</b>
                <p className="col-span-2 text-muted md:col-span-1">{p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="on-dark bg-ink py-10 md:py-14">
        <div className="container-site">
          <SectionHead dark eyebrow="ESG components" title={<>What Each Pillar <span className="text-brand-lime">Covers</span></>} />
          <div className="grid gap-5 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.h} delay={i * 0.08} className="grid content-start gap-5 rounded-2xl border border-white/10 bg-ink-soft p-7 transition hover:border-brand/60">
                <Img ill={p.ill} src={p.img} contain alt="" className="aspect-video !bg-white" />
                <h3 className="text-[28px] font-bold text-brand-lime">{p.h}</h3>
                <ul className="grid gap-2">{p.items.map((t) => <li key={t} className="relative pl-5 text-slate-300 before:absolute before:left-0 before:top-[.7em] before:h-[2px] before:w-2.5 before:bg-brand">{t}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

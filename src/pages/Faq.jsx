import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQ } from '../data/people.js'
import { Button, PageHero, Reveal, useSeo } from '../components/ui.jsx'
import { SITE } from '../data/site.js'
import { img } from '../config.js'

export default function Faq() {
  useSeo('FAQ', 'Answers to common questions about BuildINT energy management, iATM, support and getting started.')
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHero crumb={[{ label: 'FAQ' }]} title={<>Frequently Asked <span className="mark">Questions</span></>} ill="ai" />
      <section className="py-10 md:py-14">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid gap-3">
            {FAQ.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.03} className={`rounded-2xl border bg-white transition ${open === i ? 'border-brand shadow-card' : 'border-line'}`}>
                <h3>
                  <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold">
                    {q}
                    <Plus className={`h-5 w-5 shrink-0 text-brand-deep transition duration-300 ${open === i ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="max-w-[68ch] px-6 pb-6 text-muted">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28">
            <div className="relative grid gap-4 overflow-hidden rounded-3xl bg-ink p-8 pt-44 text-white">
              <img src={img(SITE.mascot)} alt="Elebi, the BuildINT mascot" className="absolute -top-2 left-1/2 w-40 -translate-x-1/2" />
              <h2 className="text-2xl font-bold text-white">Still Have a Question? Ask Elebi</h2>
              <p className="text-slate-400">Our team provides remote assistance, troubleshooting, and guidance. Reach out and we'll get back to you.</p>
              <div className="flex flex-wrap gap-2"><Button href={SITE.chatUrl}>Chat with Elebi.AI</Button><Button to="/contact" kind="light" arrow={false}>Contact Us</Button></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

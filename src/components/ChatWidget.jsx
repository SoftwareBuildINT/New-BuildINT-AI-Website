import { useEffect, useState } from 'react'
import { SITE } from '../data/site.js'
import { img } from '../config.js'

/* ------------------------------------------------------------------ *
 * Elebi.AI chat: opens on the same page in a small window, with
 * maximise / restore, open-in-new-tab and close. The chat is loaded
 * only on first open and kept alive afterwards, so the conversation
 * survives closing and reopening the window.
 * ------------------------------------------------------------------ */

const I = {
  max: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  min: <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />,
  ext: <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
}
const Icon = ({ d }) => <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [big, setBig] = useState(false)
  const [loaded, setLoaded] = useState(false) // mount the iframe on first open, keep it after

  useEffect(() => {
    if (!open) return
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [open])

  const toggle = () => { setOpen((o) => !o); setLoaded(true) }
  const edge = { right: 'max(18px, calc(env(safe-area-inset-right, 0px) + 12px))', bottom: 'max(18px, calc(env(safe-area-inset-bottom, 0px) + 12px))' }
  const btn = 'grid h-9 w-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white'

  return (
    <>
      {/* backdrop only when maximised */}
      <div aria-hidden="true" onClick={() => setBig(false)}
        className={`fixed inset-0 z-[55] bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${open && big ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />

      {loaded && (
        <section role="dialog" aria-label="Chat with Elebi.AI" aria-hidden={!open}
          className={`fixed z-[60] flex flex-col overflow-hidden border border-slate-200 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,.45)] transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)]
            ${big
              ? 'inset-2 rounded-2xl sm:inset-6 md:inset-x-[8vw] md:inset-y-[5vh]'
              : 'inset-x-2 bottom-2 top-[72px] rounded-2xl sm:inset-x-auto sm:top-auto sm:h-[min(600px,calc(100vh-120px))] sm:w-[390px]'}
            ${open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'}`}
          style={big ? undefined : { right: edge.right, bottom: `calc(${edge.bottom} + 68px)`, transformOrigin: 'bottom right' }}>
          <header className="flex items-center gap-3 bg-ink px-3 py-2.5 text-white">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white"><img src={img(SITE.mascotFace)} alt="" className="h-9 w-9 object-cover" /></span>
            <div className="min-w-0 flex-1 leading-tight">
              <b className="block text-[15px] font-bold">Elebi.AI</b>
              <span className="flex items-center gap-1.5 text-[11.5px] text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />BuildINT assistant · online</span>
            </div>
            <button type="button" className={btn} onClick={() => setBig((b) => !b)} aria-label={big ? 'Restore chat size' : 'Maximise chat'} title={big ? 'Restore' : 'Maximise'}><Icon d={big ? I.min : I.max} /></button>
            <a className={`${btn} hidden sm:grid`} href={SITE.chatUrl} target="_blank" rel="noopener noreferrer" aria-label="Open chat in a new tab" title="Open in new tab"><Icon d={I.ext} /></a>
            <button type="button" className={btn} onClick={() => setOpen(false)} aria-label="Close chat" title="Close"><Icon d={I.x} /></button>
          </header>
          <iframe src={SITE.chatUrl} title="Elebi.AI chat" className="min-h-0 w-full flex-1 border-0 bg-white" allow="clipboard-write; microphone" />
        </section>
      )}

      <button type="button" onClick={toggle} aria-expanded={open} aria-label={open ? 'Close Elebi.AI chat' : 'Ask Elebi.AI'}
        className="fixed z-[61] flex items-center gap-2.5 rounded-full bg-ink p-2 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 sm:pr-4"
        style={edge}>
        <span className={`grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white ${open ? '' : 'pulse-dot'}`}>
          {open ? <span className="text-ink"><Icon d={I.x} /></span> : <img src={img(SITE.mascotFace)} alt="" className="h-10 w-10 object-cover" />}
        </span>
        <span className="hidden sm:inline">{open ? 'Close chat' : 'Ask Elebi.AI'}</span>
      </button>
    </>
  )
}

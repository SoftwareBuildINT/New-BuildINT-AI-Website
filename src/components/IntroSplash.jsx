import { useEffect, useRef, useState } from 'react'
import { img } from '../config.js'

/* ------------------------------------------------------------------ *
 * Welcome intro: Elebi greets the visitor ("Namaste!"), the title
 * animates in, then the screen zooms out into the website.
 * Plays once per browser session; skippable; off for reduced motion.
 * ------------------------------------------------------------------ */

const KEY = 'bi-intro-seen'
const HOLD = 2600 // ms before the zoom-out starts
const EXIT = 900 // ms zoom-out duration

export function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem(KEY)) return false
  } catch { /* storage blocked: still show */ }
  return true
}

export default function IntroSplash({ onExit, onDone }) {
  const [leaving, setLeaving] = useState(false)
  const done = useRef(false)

  const leave = () => {
    if (done.current) return
    done.current = true
    try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ }
    setLeaving(true)
    onExit?.()
    setTimeout(() => onDone?.(), EXIT)
  }

  useEffect(() => {
    const t = setTimeout(leave, HOLD)
    const key = (e) => { if (e.key === 'Escape' || e.key === 'Enter') leave() }
    window.addEventListener('keydown', key)
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => { clearTimeout(t); window.removeEventListener('keydown', key); document.documentElement.style.overflow = prev }
  }, [])

  const words = ['Welcome', 'to', 'the', 'BuildINT', 'AI']
  return (
    <div className={`bi-intro ${leaving ? 'bi-intro-out' : ''}`} role="dialog" aria-label="Welcome to the BuildINT AI" onClick={leave}>
      <style>{CSS}</style>
      <div className="bi-intro-bg" aria-hidden="true" />
      <div className="bi-intro-stage">
        <div className="bi-intro-hero">
          <span className="bi-ring" aria-hidden="true" /><span className="bi-ring bi-ring2" aria-hidden="true" />
          <div className="bi-elebi-wrap"><img src={img('brand/elebi')} alt="Elebi, the BuildINT AI mascot, greeting you with a namaste" className="bi-elebi" /></div>
          <span className="bi-bubble">Namaste! <span aria-hidden="true">🙏</span></span>
        </div>
        <h1 className="bi-title">
          {words.map((w, i) => (
            <span key={i} className={`bi-word ${w === 'BuildINT' || w === 'AI' ? 'bi-green' : ''}`} style={{ animationDelay: `${0.75 + i * 0.09}s` }}>{w}</span>
          ))}
        </h1>
        <p className="bi-sub"><span className="bi-saffron">Bharat Ka</span> Apna <span className="bi-india-green">Building Intelligence</span></p>
        <div className="bi-bar" aria-hidden="true"><span /></div>
      </div>
      <button type="button" className="bi-skip" onClick={(e) => { e.stopPropagation(); leave() }}>Skip</button>
    </div>
  )
}

/* Applied to the site wrapper while the intro zooms out */
export const REVEAL_CLASS = 'bi-reveal'

const CSS = `
.bi-intro { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; overflow: hidden; cursor: pointer; font-family: "Plus Jakarta Sans", system-ui, sans-serif; }
.bi-intro-bg { position: absolute; inset: 0; background: radial-gradient(circle at 50% 42%, #F1FAEA 0%, #FFFFFF 55%), #fff; }
.bi-intro-bg::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(#E2E8F0 1px, transparent 1px); background-size: 22px 22px; opacity: .7; mask-image: radial-gradient(circle at 50% 45%, #000, transparent 70%); }
.bi-intro-stage { position: relative; display: grid; justify-items: center; gap: 14px; padding: 24px; text-align: center; }
.bi-intro-hero { position: relative; width: min(46vw, 230px); aspect-ratio: 420 / 506; display: grid; place-items: center; }
.bi-ring { position: absolute; left: 50%; top: 52%; width: 130%; aspect-ratio: 1; border-radius: 50%; border: 2px solid rgba(118,223,35,.55); transform: translate(-50%,-50%) scale(.5); opacity: 0; animation: bi-ring 2.4s .3s ease-out infinite; }
.bi-ring2 { animation-delay: 1.5s; }
.bi-elebi-wrap { width: 100%; animation: bi-rise .9s cubic-bezier(.2,.8,.2,1.15) both; }
.bi-elebi { width: 100%; height: auto; display: block; filter: drop-shadow(0 24px 30px rgba(15,23,42,.18)); animation: bi-bob 2.6s 1s ease-in-out infinite; }
.bi-bubble { position: absolute; top: 4%; right: -58%; background: #0F172A; color: #fff; font-weight: 800; font-size: clamp(14px, 1.6vw, 18px); padding: 9px 15px; border-radius: 16px 16px 16px 4px; white-space: nowrap; box-shadow: 0 12px 28px -12px rgba(15,23,42,.5); animation: bi-pop .55s .55s cubic-bezier(.2,.8,.2,1.3) both; transform-origin: 0% 100%; }
.bi-title { margin: 6px 0 0; font-weight: 800; font-size: clamp(26px, 4.2vw, 52px); line-height: 1.1; letter-spacing: -0.03em; color: #0F172A; max-width: 16ch; text-wrap: balance; }
.bi-word { display: inline-block; margin: 0 .13em; animation: bi-word .6s cubic-bezier(.2,.7,.2,1) both; }
.bi-green { color: #3CA80C; }
.bi-sub { margin: 0; font-weight: 800; font-size: clamp(11px, 1.2vw, 14px); letter-spacing: .16em; text-transform: uppercase; color: #64748B; animation: bi-fade .6s 1.45s ease both; }
.bi-saffron { color: #F28C1E; } .bi-india-green { color: #2BB24C; }
.bi-bar { width: 140px; height: 3px; border-radius: 3px; background: #E2E8F0; overflow: hidden; margin-top: 6px; animation: bi-fade .4s 1.2s ease both; }
.bi-bar span { display: block; height: 100%; background: linear-gradient(90deg, #76DF23, #3CA80C); transform-origin: left; animation: bi-load 1.4s 1.2s cubic-bezier(.4,0,.2,1) both; }
.bi-skip { position: absolute; top: max(18px, env(safe-area-inset-top)); right: max(18px, env(safe-area-inset-right)); z-index: 2; border: 1px solid #E2E8F0; background: rgba(255,255,255,.85); color: #475569; font: 700 13px/1 "Plus Jakarta Sans", system-ui, sans-serif; padding: 10px 16px; border-radius: 999px; cursor: pointer; animation: bi-fade .4s .8s ease both; }
.bi-skip:hover { color: #0F172A; border-color: #CBD5E1; }
/* zoom-out exit: the welcome card flies toward the viewer and dissolves into the site */
.bi-intro-out { pointer-events: none; }
.bi-intro-out .bi-intro-stage { animation: bi-zoom-out ${EXIT}ms cubic-bezier(.6,0,.2,1) forwards; }
.bi-intro-out .bi-intro-bg { animation: bi-bg-out ${EXIT}ms cubic-bezier(.6,0,.2,1) forwards; }
.bi-intro-out .bi-skip { opacity: 0; transition: opacity .2s; }
/* the site itself settles from slightly zoomed-in to normal */
.bi-reveal { animation: bi-site-in ${EXIT + 150}ms cubic-bezier(.2,.7,.2,1) both; transform-origin: 50% 30vh; }
@keyframes bi-rise { from { opacity: 0; transform: translateY(40px) scale(.7); } to { opacity: 1; transform: none; } }
@keyframes bi-bob { 50% { transform: translateY(-6px); } }
@keyframes bi-pop { from { opacity: 0; transform: scale(.3) rotate(-8deg); } to { opacity: 1; transform: none; } }
@keyframes bi-word { from { opacity: 0; transform: translateY(.5em); filter: blur(8px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes bi-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes bi-load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes bi-ring { 0% { transform: translate(-50%,-50%) scale(.5); opacity: .9; } 100% { transform: translate(-50%,-50%) scale(1.25); opacity: 0; } }
@keyframes bi-zoom-out { 0% { transform: scale(1); opacity: 1; filter: blur(0); } 100% { transform: scale(2.6); opacity: 0; filter: blur(6px); } }
@keyframes bi-bg-out { 0% { opacity: 1; } 35% { opacity: 1; } 100% { opacity: 0; } }
@keyframes bi-site-in { from { transform: scale(1.08); opacity: 0; filter: blur(4px); } to { transform: none; opacity: 1; filter: none; } }
@media (max-width: 520px) { .bi-bubble { right: auto; left: 62%; top: -2%; } }
`

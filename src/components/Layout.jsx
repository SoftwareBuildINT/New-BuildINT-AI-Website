import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { SITE } from '../data/site.js'
import { img } from '../config.js'
import IntroSplash, { shouldShowIntro, REVEAL_CLASS } from './IntroSplash.jsx'
import ChatWidget from './ChatWidget.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [showTop, setShowTop] = useState(false)
  const [intro, setIntro] = useState(shouldShowIntro)
  const [reveal, setReveal] = useState(false)
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 900)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      {intro && <IntroSplash onExit={() => setReveal(true)} onDone={() => setIntro(false)} />}
      <div className={reveal ? REVEAL_CLASS : undefined} onAnimationEnd={(e) => { if (e.target === e.currentTarget) setReveal(false) }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand" style={{ scaleX }} aria-hidden="true" />
      <Navbar />
      <motion.main id="main" key={pathname.split('/')[1] || 'home'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}><Outlet /></Suspense>
      </motion.main>
      <Footer />

      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
        className={`fixed z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink shadow-card transition duration-300 ${showTop ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
        style={{ left: 'max(18px, calc(env(safe-area-inset-left, 0px) + 12px))', bottom: 'max(18px, calc(env(safe-area-inset-bottom, 0px) + 12px))' }}>
        <ArrowUp className="h-5 w-5" />
      </button>
      </div>
      <ChatWidget />
    </>
  )
}

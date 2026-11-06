import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { lazy, useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
const About = lazy(() => import('./pages/About.jsx'))
const Solutions = lazy(() => import('./pages/Solutions.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Csr = lazy(() => import('./pages/Csr.jsx'))
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Esg = lazy(() => import('./pages/Esg.jsx'))
const Faq = lazy(() => import('./pages/Faq.jsx'))
const Legal = lazy(() => import('./pages/Legal.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Hash routing is only used for the single-file preview build (no server rewrites there).
const Router = import.meta.env.VITE_HASH_ROUTER === '1' ? HashRouter : BrowserRouter

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Section deep links (/solutions/cctv, /#estimator) scroll themselves; everything else starts at the top.
    if (!/^\/solutions\/.+/.test(pathname)) window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:section" element={<Solutions />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="csr" element={<Csr />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="careers" element={<Careers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="esg" element={<Esg />} />
            <Route path="faq" element={<Faq />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />
            <Route path="cookies" element={<Legal kind="cookies" />} />
            <Route path="terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </MotionConfig>
  )
}

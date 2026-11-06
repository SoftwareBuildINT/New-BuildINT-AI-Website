import { POSTS } from '../data/posts.js'
import { PageHero, useSeo } from '../components/ui.jsx'
import { PostCard } from '../components/Cards.jsx'

export default function Blog() {
  useSeo('Blog', 'IoT & automation insights from BuildINT: IoT explained, AIoT, and 5G for connected buildings.')
  return (
    <>
      <PageHero crumb={[{ label: 'Blogs' }]} title={<>IoT &amp; Automation <span className="mark">Insights</span></>} ill="tower" lede="Plain-language guides to the technology behind smarter, greener buildings." />
      <section className="py-10 md:py-14">
        <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{POSTS.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}</div>
      </section>
    </>
  )
}

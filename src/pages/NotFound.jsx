import { Button, useSeo } from '../components/ui.jsx'
import { SITE } from '../data/site.js'
import { img } from '../config.js'

export default function NotFound() {
  useSeo('Page not found')
  return (
    <section className="py-10 md:py-14">
      <div className="container-site grid items-center gap-10 md:grid-cols-2">
        <div className="grid gap-5">
          <span className="eyebrow">Error 404</span>
          <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.06] tracking-[-0.035em]">This Page Switched Itself Off</h1>
          <p className="lede">The link may be old or mistyped. Head back home or explore our solutions.</p>
          <div className="flex flex-wrap gap-3"><Button to="/">Back to Home</Button><Button to="/solutions" kind="outline" arrow={false}>Our Solutions</Button></div>
        </div>
        <img src={img(SITE.mascot)} alt="Elebi, the BuildINT mascot" className="mx-auto w-full max-w-[300px]" />
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { FORM_ENDPOINT, FORM_KEY } from '../config.js'
import { ROLES } from '../data/people.js'
import { Button } from './ui.jsx'

/**
 * Sends a form to VITE_FORM_ENDPOINT (Web3Forms, Formspree, Google Apps Script…).
 * Without an endpoint it only shows the thank-you message, so nothing is lost silently in production —
 * set the endpoint in .env before going live.
 */
async function send(form, subject) {
  if (!FORM_ENDPOINT) return { ok: true, demo: true }
  const data = new FormData(form)
  data.append('subject', subject)
  if (FORM_KEY) data.append('access_key', FORM_KEY)
  const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
  return { ok: res.ok }
}

function useSubmit(subject) {
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const r = await send(form, subject)
      if (r.ok) { setStatus('done'); form.reset() } else setStatus('error')
    } catch { setStatus('error') }
  }
  return { status, onSubmit }
}

const input = 'w-full rounded-xl border-[1.5px] border-line bg-white px-4 py-3 text-base text-ink transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15'
function Field({ id, label, full, children }) {
  return (
    <div className={`grid min-w-0 gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={id} className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">{label}</label>
      {children}
    </div>
  )
}
function Status({ status }) {
  if (status === 'done') return <p role="status" className="flex items-center gap-2 rounded-xl border border-brand/40 bg-brand-tint px-4 py-3 font-semibold text-brand-dark sm:col-span-2"><CheckCircle2 className="h-5 w-5" />Thank you! The BuildINT team will get back to you shortly.</p>
  if (status === 'error') return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-700 sm:col-span-2">Your message couldn’t be sent. Please check your connection and try again, or call +91 7400074047.</p>
  return null
}

export function ContactForm() {
  const { status, onSubmit } = useSubmit('New enquiry from buildint.ai')
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field id="f-name" label="Your name *"><input id="f-name" name="name" required autoComplete="name" className={input} /></Field>
      <Field id="f-email" label="Email address *"><input id="f-email" name="email" type="email" required autoComplete="email" className={input} /></Field>
      <Field id="f-area" label="Area of interest *">
        <select id="f-area" name="area" required defaultValue="" className={input}>
          <option value="" disabled>Select</option>
          <option>IoT iEMS</option><option>CCTV Camera Installation &amp; E-Surveillance</option><option>CBMS</option><option>Turnkey Project</option>
        </select>
      </Field>
      <Field id="f-phone" label="Contact number"><input id="f-phone" name="phone" type="tel" autoComplete="tel" className={input} /></Field>
      <Field id="f-msg" label="Message" full><textarea id="f-msg" name="message" rows={5} className={input} /></Field>
      <label className="flex items-center gap-2.5 text-sm text-muted sm:col-span-2">
        <input id="f-agree" type="checkbox" required className="h-[18px] w-[18px] accent-brand" /> I have read and agree to the <Link to="/privacy" className="font-semibold text-brand-deep underline-offset-2 hover:underline">privacy policy</Link>
      </label>
      <Button type="submit" disabled={status === 'sending'} className="justify-self-start disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Submit'}</Button>
      <Status status={status} />
    </form>
  )
}

export function CareerForm() {
  const { status, onSubmit } = useSubmit('New job application from buildint.ai')
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" encType="multipart/form-data">
      <Field id="c-name" label="Your name *"><input id="c-name" name="name" required autoComplete="name" className={input} /></Field>
      <Field id="c-mob" label="Mobile number *"><input id="c-mob" name="mobile" type="tel" required autoComplete="tel" className={input} /></Field>
      <Field id="c-email" label="Email ID *"><input id="c-email" name="email" type="email" required autoComplete="email" className={input} /></Field>
      <Field id="c-co" label="Company name"><input id="c-co" name="company" autoComplete="organization" className={input} /></Field>
      <Field id="c-des" label="Designation"><input id="c-des" name="designation" className={input} /></Field>
      <Field id="c-exp" label="Experience (years) *"><input id="c-exp" name="experience" type="number" min="0" required className={input} /></Field>
      <Field id="c-ctc" label="Current CTC"><input id="c-ctc" name="current_ctc" className={input} /></Field>
      <Field id="c-ectc" label="Expected CTC"><input id="c-ectc" name="expected_ctc" className={input} /></Field>
      <Field id="c-pos" label="Position *">
        <select id="c-pos" name="position" required defaultValue="" className={input}>
          <option value="" disabled>Select</option>{ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </Field>
      <Field id="c-cv" label="Resume (PDF, DOC, DOCX) *"><input id="c-cv" name="resume" type="file" accept=".pdf,.doc,.docx" required className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-brand-tint file:px-3 file:py-1.5 file:font-semibold file:text-brand-dark`} /></Field>
      <Button type="submit" disabled={status === 'sending'} className="justify-self-start disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Submit application'}</Button>
      <Status status={status} />
    </form>
  )
}

# BuildINT AI Website (React + Vite)

Redesigned buildint.ai — clean corporate layout in BuildINT AI's official brochure colours
(BuildINT green #3CA80C, lime #76DF23, logo red). Content sourced from the 2026 Company Profile,
the Product Brochure and the previous website.

## Run it

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Where to edit content

All text lives in `src/data/` — no need to touch components:

| File | What it holds |
|---|---|
| `site.js` | Phone, email, offices, presence, mission/vision, journey timeline, growth numbers, industries, certifications, menu |
| `products.js` | Green X series (500 · NEON, 200 · BigIO, 100 · LiBi, 1000 · Bi-Bug), device specs, iBMS architecture |
| `solutions.js` | The 4 solutions (iBMS, CCTV Surveillance, Solar, Access Control) + every Solutions-page section |
| `home.js` | Home page: explainer-film chapters, Green X platform hub, solution tabs, why-BuildINT tabs, industries |
| `people.js` | Client wall, partners, testimonials, founder, leadership, board (kept in data, not shown on the site), case studies, field photos, FAQ, job roles |
| `posts.js` | Blog articles (HTML strings) |
| `legal.js` | Privacy / Cookie / Terms pages (**draft — get BuildINT to review**) |

## Images

All images are bundled in `src/assets/img/` as optimised WebP (≈3 MB total), taken from the old site,
the company profile and the product brochure. Reference them by path without extension, e.g. `products/neon`.
To replace one, drop a new file with the same name (any of webp/png/jpg) into that folder.
If an image is missing, an on-brand illustration is shown instead (team photos show initials).

## Forms

Contact and Career forms post to `VITE_FORM_ENDPOINT` (Web3Forms, Formspree, Google Apps Script, etc.).
Copy `.env.example` to `.env` and fill it in. Without an endpoint the forms only show a thank-you message.

## Deploying

The build is a static site in `dist/`. Routing configs are included for every common host:

- **Vercel** — `vercel.json`
- **Netlify** — `public/_redirects`
- **cPanel / Apache** — `public/.htaccess` (upload the contents of `dist/` to `public_html/`)

## Routes

`/` · `/about` · `/solutions` (+ `/solutions/ibms|iems|automation|smart-office|iatm|cbms|ai|fire|cctv|esurveillance|imaxx|solar|access|turnkey`) ·
`/products` (+ `/products/green-x-500|green-x-200|green-x-100`; old `/products/neon` etc. redirect) ·
`/csr` · `/case-studies` · `/careers` · `/blog` · `/blog/:slug` · `/contact` · `/esg` · `/faq` · `/privacy` · `/cookies` · `/terms`

## Still needed from BuildINT

- Solar: confirm scope (design & install vs monitoring only) and send project photos
- Green X logo artwork (the site uses a drawn wordmark based on the sketch)

- Public video links for the "live demonstration" projects (the profile links point to a private SharePoint drive)
- Confirm the unit for "5 Lakh+ energy saved" (kWh?)
- Vaibhav Mogal's short bio (LinkedIn is linked)
- Legal review of the policy pages
- A form endpoint (`VITE_FORM_ENDPOINT`) so contact/career forms send email

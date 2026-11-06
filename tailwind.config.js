/** BuildINT — "Clean corporate" theme in BuildINT's official brochure colours.
 *  White-first, slate text, BuildINT greens, logo red only in the logo. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0F172A', soft: '#1E293B', 950: '#020617' },
        surface: '#F1F5F9',
        line: '#E2E8F0',
        muted: '#475569',
        brand: {
          DEFAULT: '#3CA80C', // BuildINT green (brochure) — icons, fills under dark text
          deep: '#2B7F0A',    // text, links and primary buttons on white (AA contrast)
          dark: '#1F5F07',
          tint: '#F1FAEA',
          lime: '#76DF23',    // BuildINT lime — highlights, dark sections
          red: '#D90B0B',     // logo red — used very sparingly
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        // Small uppercase labels use the brand sans (cleaner than a code font); data readouts use `font-data`.
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        data: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: { site: '1200px' },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,.04), 0 8px 24px -12px rgba(15,23,42,.12)',
        lift: '0 2px 4px rgba(15,23,42,.04), 0 24px 48px -20px rgba(15,23,42,.25)',
      },
    },
  },
  plugins: [],
}

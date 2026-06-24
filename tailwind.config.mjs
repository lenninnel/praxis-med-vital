/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Warm Minimal — med.vital palette
        cream:    { DEFAULT: '#f5f0e8', dk: '#ede8de', dkr: '#e2dbd0' },
        parchment: '#d4c9b8',
        ink:      { DEFAULT: '#1a100a', mid: '#5a4a3c', lt: '#9a8878' },
        gold:     { DEFAULT: '#c4a05a', lt: '#cdab66', dk: '#a8843f' },
        stone:    { DEFAULT: '#5a4d42', mid: '#7d6d5a', lt: '#f0ebe3' },
        sage:     { DEFAULT: '#6b5c4a', lt: '#eef2ec' },
        line:     '#ddd5c6',
      },
      fontFamily: {
        // Display = characterful old-style serif; Body = warm humanist sans.
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Mulish', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // fluid display sizes
        'display': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        'h2': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.08' }],
      },
      letterSpacing: {
        eyebrow: '0.22em',
        label: '0.18em',
      },
      borderRadius: {
        card: '1.25rem',
        btn: '0.625rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 18px 48px -24px rgba(90,77,66,0.28)',
        card: '0 12px 32px -18px rgba(90,77,66,0.22)',
      },
      maxWidth: {
        prose: '62ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

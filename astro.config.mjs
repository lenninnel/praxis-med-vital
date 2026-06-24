import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site:
//   https://lenninnel.github.io/praxis-med-vital/
// `base` is surfaced to templates via import.meta.env.BASE_URL, so switching to
// the custom domain later only means setting site back to 'https://med-vital.de'
// and base to '/'.
export default defineConfig({
  site: 'https://lenninnel.github.io',
  base: '/praxis-med-vital/',
  compressHTML: true,
});

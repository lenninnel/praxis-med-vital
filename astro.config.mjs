import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Deployed to GitHub Pages as a project site:
//   https://lenninnel.github.io/praxis-med-vital/
// `base` is surfaced to templates via import.meta.env.BASE_URL (see src/lib/base.ts).
// When moving to the custom domain, set site:'https://med-vital.de' and base:'/'.
export default defineConfig({
  site: 'https://lenninnel.github.io',
  base: '/praxis-med-vital/',
  compressHTML: true,
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});

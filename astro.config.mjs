import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://praxis-med-vital.de',
  compressHTML: true,
  integrations: [
    react(),
    // We own the base layer in src/styles/global.css (fonts, resets, tokens).
    tailwind({ applyBaseStyles: false }),
  ],
});

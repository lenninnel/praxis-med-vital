import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth-scroll, mounted once in the Layout.
 * Disabled under prefers-reduced-motion. Cleans up on unmount and on
 * Astro view-transition swaps, then re-inits on the next page's hydration.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth-scroll in-page anchor links
    const onAnchor = (e: Event) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -90 });
      }
    };
    document.addEventListener('click', onAnchor);

    const cleanup = () => {
      document.removeEventListener('click', onAnchor);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
    document.addEventListener('astro:before-swap', cleanup, { once: true });

    return cleanup;
  }, []);

  return null;
}

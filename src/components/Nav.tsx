import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type Link = { label: string; href: string };
type NavData = {
  primary: Link[];
  full: Link[];
  cta: Link;
};
type Props = {
  nav: NavData;
  brand: { pre: string; post: string };
  tagline: string;
  current?: string;
};

export default function Nav({ nav, brand, tagline, current = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 140 && y > last + 4) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? current === '/' : current.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-[transform,background-color,border-color] duration-300 ${
        scrolled ? 'border-line bg-cream/90 backdrop-blur-md' : 'border-transparent bg-cream'
      } ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-[4%]">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5" aria-label="med.vital — Startseite">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[22px] text-ink">
              {brand.pre}
              <span className="text-gold">{brand.post}</span>
            </span>
            <span className="mt-0.5 font-sans text-[9px] font-medium uppercase tracking-label text-ink-lt">
              {tagline}
            </span>
          </span>
        </a>

        {/* Desktop primary links */}
        <div className="hidden items-center gap-9 lg:flex">
          {nav.primary.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-sans text-[11px] font-semibold uppercase tracking-label transition-colors hover:text-ink ${
                isActive(l.href) ? 'text-ink' : 'text-ink-mid'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href={nav.cta.href}
            className="hidden rounded-btn bg-gold px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-label text-white transition-colors hover:bg-gold-dk sm:inline-flex"
          >
            {nav.cta.label}
          </a>
          <button
            type="button"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-5 w-6 flex-col justify-between"
          >
            <span
              className={`block h-px w-full bg-ink transition-transform duration-300 ${
                open ? 'translate-y-[9px] rotate-45' : ''
              }`}
            />
            <span className={`block h-px w-full bg-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block h-px w-full bg-ink transition-transform duration-300 ${
                open ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-[72px] z-40 bg-ink/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-[4%] top-[68px] z-50 w-[260px] overflow-hidden rounded-card border border-white/10 bg-stone py-3 shadow-soft"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              role="menu"
            >
              {nav.full.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 px-6 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-cream/80 transition-colors last:border-0 hover:bg-white/5 hover:text-gold-lt"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Item = { text: string; author: string };
type Props = { items: Item[]; interval?: number };

export default function Testimonials({ items, interval = 6500 }: Props) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);

  const go = (n: number) => setI((n + items.length) % items.length);
  const current = items[i];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="font-serif text-6xl leading-none text-gold/40">&ldquo;</span>
      <div className="relative mt-2 min-h-[200px] sm:min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <p className="font-serif text-2xl font-light italic leading-relaxed text-ink md:text-[28px]">
              {current.text}
            </p>
            <footer className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-label text-ink-lt">
              {current.author}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Vorherige Bewertung"
          onClick={() => go(i - 1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-mid transition-colors hover:border-gold hover:text-gold"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 4 6 9 11 14" /></svg>
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Bewertung ${n + 1}`}
              onClick={() => go(n)}
              className={`h-1.5 rounded-full transition-all ${n === i ? 'w-6 bg-gold' : 'w-1.5 bg-line'}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Nächste Bewertung"
          onClick={() => go(i + 1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-mid transition-colors hover:border-gold hover:text-gold"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="7 4 12 9 7 14" /></svg>
        </button>
      </div>
    </div>
  );
}

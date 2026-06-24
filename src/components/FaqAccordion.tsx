import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Bullet = { label: string; text: string };
type Item = { frage: string; intro?: string; bullets?: Bullet[]; outro?: string };
type Props = { items: Item[]; limit?: number; defaultOpen?: number };

export default function FaqAccordion({ items, limit, defaultOpen = 0 }: Props) {
  const data = typeof limit === 'number' ? items.slice(0, limit) : items;
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-[880px] border-t border-line">
      {data.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left md:gap-7"
              >
                <span className="font-serif text-2xl leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-lg leading-snug text-ink transition-colors hover:text-gold md:text-xl">
                  {item.frage}
                </span>
                <span
                  className={`text-ink-mid transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : ''}`}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 7 9 12 14 7" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={reduce ? undefined : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-[760px] pb-9 pl-[46px] pr-2 md:pl-[52px]">
                    {item.intro && (
                      <p className="font-sans text-[14px] font-light leading-[1.8] text-ink-mid">{item.intro}</p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-4">
                        {item.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="relative border-b border-line py-3.5 pl-7 font-sans text-[14px] font-light leading-relaxed text-ink-mid last:border-0"
                          >
                            <span className="absolute left-0 top-[1.45rem] h-px w-3.5 bg-gold" aria-hidden="true" />
                            {b.label && <strong className="font-semibold text-ink">{b.label}</strong>}
                            {b.text && <span>{b.label ? ' — ' : ''}{b.text}</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.outro && (
                      <p className="mt-5 font-sans text-[14px] font-light leading-[1.8] text-ink-mid">{item.outro}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

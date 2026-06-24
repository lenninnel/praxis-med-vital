import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { withBase } from '../lib/base';

type Step = { n: string; title: string; text: string; image: string };

const STEPS: Step[] = [
  { n: '01', title: 'Erstbefund', text: 'Wir hören zu und untersuchen gründlich. Aus Ihren Zielen und einem präzisen Befund entsteht Ihr persönlicher Plan — die Grundlage für alles Weitere.', image: '/img/hero-room.png' },
  { n: '02', title: 'Therapie', text: 'Gezielte, ganzheitliche Behandlung auf höchstem Niveau. Wir behandeln nicht nur das Symptom, sondern seine Ursache — manuell, individuell, nachhaltig.', image: '/img/therapie.png' },
  { n: '03', title: 'Training', text: 'Aus Therapie wird Stabilität. Auf modernen Geräten bauen Sie gezielt Kraft, Ausdauer und Koordination auf — fachlich begleitet, in Ihrem Tempo.', image: '/img/training.png' },
  { n: '04', title: 'Coaching', text: 'Gesundheit, die bleibt. Im Coaching verankern wir gesunde Gewohnheiten — Ernährung, Bewegung und Erholung — fest in Ihrem Alltag.', image: '/img/coaching.png' },
];

const INTERVAL = 5200;

export default function Journey() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const paused = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((v) => (v + 1) % STEPS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce]);

  const step = STEPS[active];

  return (
    <div
      className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-stretch"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Steps list */}
      <ol className="flex flex-col justify-center gap-1">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on}
                className={`group relative w-full overflow-hidden rounded-2xl border px-6 py-5 text-left transition-colors duration-300 ${
                  on ? 'border-gold/50 bg-cream-dk' : 'border-transparent hover:bg-cream-dk/60'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className={`font-serif text-2xl leading-none transition-colors ${on ? 'text-gold' : 'text-ink-lt'}`}>{s.n}</span>
                  <span className={`font-serif text-2xl transition-colors ${on ? 'text-ink' : 'text-ink-mid'}`}>{s.title}</span>
                </div>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.p
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <span className="mt-3 block pl-10 font-sans text-[14px] font-light leading-relaxed text-ink-mid">{s.text}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
                {on && !reduce && (
                  <motion.span
                    key={active}
                    className="absolute bottom-0 left-0 h-[2px] bg-gold"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Crossfading image */}
      <div className="relative min-h-[360px] overflow-hidden rounded-card md:min-h-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={active}
            src={withBase(step.image)}
            alt={step.title}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-7 z-10">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-label text-cream/70">Schritt {step.n}</span>
          <div className="font-serif text-3xl italic text-cream">{step.title}</div>
        </div>
      </div>
    </div>
  );
}

import { useReducedMotion } from 'framer-motion';

type Props = { items: string[]; speed?: number };

/** Seamless infinite marquee of label strings, separated by a gold mark. */
export default function Marquee({ items, speed = 36 }: Props) {
  const reduce = useReducedMotion();
  const Row = () => (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap font-serif text-2xl italic text-ink/65 md:text-3xl">
          <span className="px-8">{t}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <div className="overflow-hidden border-y border-line py-6">
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 px-6">
          <Row />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex overflow-hidden border-y border-line py-6">
      <div className="flex animate-marquee" style={{ animationDuration: `${speed}s` }}>
        <Row />
        <Row />
      </div>
    </div>
  );
}

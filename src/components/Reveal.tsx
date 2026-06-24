import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** delay in seconds before the reveal starts */
  delay?: number;
  /** vertical offset to animate from, in px */
  y?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper. Fades + lifts children into view once.
 * Respects prefers-reduced-motion (renders final state, no motion).
 * Degrades to visible content when JS is disabled.
 */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

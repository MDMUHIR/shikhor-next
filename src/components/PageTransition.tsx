import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: ReactNode;
  key?: string;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

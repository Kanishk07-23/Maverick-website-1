'use client';

import { motion } from 'framer-motion';

// Minimal, tasteful page transition — content fades in instantly.
// The "wow" moment is handled by the card→page expansion on service pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}

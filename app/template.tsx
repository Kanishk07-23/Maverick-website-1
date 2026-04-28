'use client';

import { motion } from 'framer-motion';
import PageTransitionCurtain from '@/components/PageTransitionCurtain';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransitionCurtain />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          // Delay matches strips in (0.45s anim + 0.24s stagger) + buffer
          delay: 0.75,
          ease: 'easeOut',
        }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </>
  );
}

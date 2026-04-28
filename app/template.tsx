'use client';

import { motion } from 'framer-motion';
import PageTransitionCurtain from '@/components/PageTransitionCurtain';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransitionCurtain />
      <motion.main
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2, // Wait for curtain to pass halfway
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </>
  );
}

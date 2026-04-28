'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransitionCurtain() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="transition-curtain"
          initial={{ y: '100%' }}
          animate={{ y: '-100%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col"
        >
          {/* Main curtain block */}
          <div className="flex-1 w-full bg-foreground" />
          
          {/* Brand accent line */}
          <div className="h-[4px] w-full bg-gradient-to-r from-brand-purple via-brand-violet to-brand-blue" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

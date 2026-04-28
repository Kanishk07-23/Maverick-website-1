'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

const STRIP_COUNT = 5;

export default function PageTransitionCurtain() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<'idle' | 'in' | 'out'>('idle');
  const prevPath = useRef(pathname);

  useEffect(() => {
    // Only fire on actual route changes, not initial mount
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    setPhase('in');
    // After strips fully cover screen, switch to exit phase
    const outTimer = setTimeout(() => setPhase('out'), 500);
    // After strips fully retract, go idle
    const idleTimer = setTimeout(() => setPhase('idle'), 1100);

    return () => { clearTimeout(outTimer); clearTimeout(idleTimer); };
  }, [pathname]);

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <div
          key="curtain-wrap"
          className="fixed inset-0 z-[200] pointer-events-none flex"
          aria-hidden="true"
        >
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const delay = i * 0.06;
            const exitDelay = (STRIP_COUNT - 1 - i) * 0.06; // Reverse order for exit

            return (
              <motion.div
                key={i}
                className="flex-1 h-full relative overflow-hidden"
                style={{ willChange: 'transform' }}
              >
                {/* Strip fill */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'var(--foreground)' }}
                  initial={{ y: '105%' }}
                  animate={phase === 'in'
                    ? { y: '0%', transition: { duration: 0.45, delay, ease: [0.76, 0, 0.24, 1] } }
                    : { y: '-105%', transition: { duration: 0.45, delay: exitDelay, ease: [0.76, 0, 0.24, 1] } }
                  }
                />
                {/* Brand colour accent at top of each strip */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, var(--brand-purple), var(--brand-violet))`,
                    opacity: 0.8,
                  }}
                  initial={{ y: '105%' }}
                  animate={phase === 'in'
                    ? { y: '0%', transition: { duration: 0.45, delay, ease: [0.76, 0, 0.24, 1] } }
                    : { y: '-105%', transition: { duration: 0.45, delay: exitDelay, ease: [0.76, 0, 0.24, 1] } }
                  }
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

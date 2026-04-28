'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { readCardTransition, CardTransitionData } from '@/lib/cardTransition';

/**
 * ServicePageReveal
 *
 * Drop this at the top of any service detail page.
 * On mount it reads the stored card rect from sessionStorage and
 * animates a colored overlay from that rect → full viewport → fade out,
 * creating the illusion of the card expanding into the page.
 *
 * If there's no stored rect (direct navigation / refresh) it simply
 * doesn't render — the normal page fade-in from template.tsx takes over.
 */
export default function ServicePageReveal({ color }: { color: string }) {
  const [data, setData] = useState<CardTransitionData | null>(null);
  const [phase, setPhase] = useState<'expand' | 'fadeout' | 'done'>('expand');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readCardTransition();
    if (!saved) return;
    setData(saved);

    // After expand completes, fade out
    const t1 = setTimeout(() => setPhase('fadeout'), 520);
    // After fade-out, hide completely
    const t2 = setTimeout(() => setPhase('done'), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!data || phase === 'done') return null;

  // Initial rect — positioned exactly where the card was on screen
  const initial = {
    position: 'fixed' as const,
    left: data.x,
    top: data.y,
    width: data.width,
    height: data.height,
    borderRadius: 28,
    zIndex: 150,
    pointerEvents: 'none' as const,
    background: data.color,
    overflow: 'hidden',
  };

  return (
    <motion.div
      ref={overlayRef}
      initial={initial}
      animate={
        phase === 'expand'
          ? {
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: 0,
              opacity: 1,
              transition: {
                duration: 0.52,
                ease: [0.76, 0, 0.24, 1],
              },
            }
          : {
              opacity: 0,
              transition: { duration: 0.38, ease: 'easeInOut' },
            }
      }
      style={{ position: 'fixed', zIndex: 150, pointerEvents: 'none' }}
    >
      {/* Subtle brand initials on back-face while expanding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'expand' ? 0.15 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className="font-outfit font-black select-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 16rem)', color: 'white', letterSpacing: '-0.05em' }}
        >
          M
        </span>
      </motion.div>
    </motion.div>
  );
}

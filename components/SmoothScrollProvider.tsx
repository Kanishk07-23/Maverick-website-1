'use client';

import { useEffect } from 'react';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        // Smooth out each tick — 0.7s feels like native scroll but silky
        duration: 0.9,
        // Gentle ease-out cubic: starts at full speed, gracefully decelerates
        // No explosive launch like the previous exponential
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        // Reduce how many pixels each scroll tick travels (default is 1.0)
        wheelMultiplier: 0.85,
        // Smooth touch on mobile but don't over-extend
        touchMultiplier: 1.5,
        // Prevent rubber-banding at top/bottom
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

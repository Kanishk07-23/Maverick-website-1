'use client';

import { useEffect } from 'react';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const isMobile = window.innerWidth < 768;
      
      lenis = new Lenis({
        duration: isMobile ? 0.6 : 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: !isMobile,
        wheelMultiplier: isMobile ? 1.0 : 0.85,
        touchMultiplier: isMobile ? 1.0 : 1.5,
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

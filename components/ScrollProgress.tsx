'use client';
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      // Direct DOM write — zero React re-renders, stays on compositor thread
      bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]" style={{ background: 'transparent' }}>
      <div
        ref={barRef}
        className="h-full"
        style={{
          width: '0%',
          background: 'var(--gradient-brand)',
          // No CSS transition — tracks scroll in real-time, zero lag
        }}
      />
    </div>
  );
}

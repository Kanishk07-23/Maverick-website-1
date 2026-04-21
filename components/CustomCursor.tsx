'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let hasMoved = false;
    let raf: number;

    // Use transform3d so cursor stays on compositor thread (avoids layout)
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasMoved = true;
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    const animate = () => {
      if (hasMoved) {
        // Lerp ring toward dot — only compute/write when there's delta
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
          ringX += dx * 0.1;
          ringY += dy * 0.1;
          ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
        }
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onEnter = () => {
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.background = 'var(--brand-violet)';
      ring.style.width = '54px';
      ring.style.height = '54px';
      ring.style.marginLeft = '-9px';
      ring.style.marginTop = '-9px';
    };
    const onLeave = () => {
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.background = 'var(--brand-purple)';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.marginLeft = '0px';
      ring.style.marginTop = '0px';
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Don't render on touch devices (SSR-safe guard)
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Use top/left=0 and drive position purely via transform3d for compositor-only updates */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ top: 0, left: 0, transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ top: 0, left: 0, transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
}

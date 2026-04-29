'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  color: string;
  badge?: string;
}

// ─── Single card component (Vertical/Portrait Brutalist Carousel) ───────────
function WheelCard({
  service,
  index,
  total,
  activeFloat,
  isActive,
  containerW,
  onSelect,
  onFocus,
}: {
  service: Service;
  index: number;
  total: number;
  activeFloat: any;
  isActive: boolean;
  containerW: number;
  onSelect: (s: Service) => void;
  onFocus: (index: number) => void;
}) {
  const angleStep = 360 / total;

  // Calculate card's angle relative to the active scroll position
  const cardAngleDeg = useTransform(activeFloat, (a: number) => (index - a) * angleStep);
  const cardAngleRad = useTransform(cardAngleDeg, (d: number) => d * (Math.PI / 180));

  // Elliptical orbit radii for a wide wheel look
  const xRadius = containerW < 768 ? containerW * 0.42 : containerW * 0.35;
  const zRadius = containerW < 768 ? 250 : 400;

  // 3D positional mapping
  const x = useTransform(cardAngleRad, (r: number) => Math.sin(r) * xRadius);
  const z = useTransform(cardAngleRad, (r: number) => Math.cos(r) * zRadius);

  // Cards rotate on Y axis to remain tangent to the wheel
  const rotateY = useTransform(cardAngleDeg, (d: number) => -d);

  // Scale down and fade out as they go to the back
  const scale = useTransform(z, [-zRadius, 0, zRadius], [0.65, 0.8, 1]);
  const opacity = useTransform(z, [-zRadius, -zRadius * 0.1, zRadius * 0.5, zRadius], [0, 0, 0.3, 1]);
  const zIndex = useTransform(z, (val: number) => Math.round(val + 1000));

  // Vertical (Portrait) Card Dimensions
  const cardWidth = containerW < 640 ? 300 : 380;
  const cardHeight = containerW < 640 ? 440 : 520;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        translateX: x,
        scale,
        opacity,
        zIndex,
        rotateY,
        pointerEvents: 'auto',
      }}
    >
      <motion.div
        onClick={() => {
          if (isActive) onSelect(service);
          else onFocus(index);
        }}
        whileHover={isActive ? { scale: 1.02 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div
          className="flex flex-col relative group"
          style={{
            width: cardWidth,
            height: cardHeight,
            cursor: isActive ? 'pointer' : 'pointer',
            background: 'var(--background)',
            border: `1px solid ${isActive ? 'var(--foreground)' : 'var(--border)'}`,
            padding: containerW < 768 ? '32px' : '40px',
            transition: 'border-color 0.4s ease',
          }}
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-8">
            <span className="label-sm text-[var(--foreground)]">
              0{index + 1} {'//'}
            </span>
            {service.badge && (
              <span className="text-[9px] uppercase tracking-widest font-bold bg-[var(--foreground)] text-[var(--background)] px-2 py-1">
                {service.badge}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2
              className="font-outfit font-black text-[var(--foreground)] leading-none mb-6"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '-0.04em' }}
            >
              {service.title}
            </h2>

            <div className="h-px bg-[var(--border)] w-12 mb-6 transition-all duration-300 group-hover:w-full" />

            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-[280px]">
              {service.tagline}
            </p>
          </div>

          {/* Bottom Action */}
          <div
            className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-6"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">
              Explore Protocol
            </span>
            <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Wheel Layout ────────────────────────────────────────────────────────
export default function ServicesList({ services }: { services: Service[] }) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerW(scrollContainerRef.current.clientWidth);
      scrollContainerRef.current.scrollLeft = 0;
    }
    const onResize = () => {
      if (scrollContainerRef.current) setContainerW(scrollContainerRef.current.clientWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const smoothProgress = useSpring(scrollXProgress, { damping: 20, stiffness: 90, mass: 0.6 });
  const total = services.length;
  const activeFloat = useTransform(smoothProgress, [0, 1], [0, total - 1]);

  useMotionValueEvent(activeFloat, 'change', (v) => {
    const idx = Math.round(Math.max(0, Math.min(total - 1, v)));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  const handleSelect = useCallback(
    (service: Service) => {
      setIsTransitioning(true);
      setTimeout(() => router.push(`/services/${service.id}`), 450);
    },
    [router]
  );

  const handleFocus = useCallback(
    (index: number) => {
      if (scrollContainerRef.current && containerW > 0) {
        const targetScroll = index * containerW;
        scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    },
    [containerW]
  );

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isAtStart = el.scrollLeft <= 0;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const isAtEnd = Math.ceil(el.scrollLeft) >= maxScroll;

        if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) return;

        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [containerW]);

  if (containerW === 0) {
    return <div ref={scrollContainerRef} style={{ width: '100%', height: '100vh' }} />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: ".hide-scrollbar::-webkit-scrollbar { display: none; }\n.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }"
      }} />

      {/* Screen flash transition */}
      <div
        className={`fixed inset-0 z-[9999] pointer-events-none transition-all duration-500 ${
          isTransitioning ? 'bg-[var(--foreground)] opacity-100' : 'opacity-0'
        }`}
      />

      {/* Massive Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
            animate={{ opacity: 0.03, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -100, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-outfit font-black uppercase text-center text-[var(--foreground)] leading-none whitespace-nowrap absolute"
            style={{ fontSize: 'clamp(15rem, 40vw, 45rem)', letterSpacing: '-0.05em' }}
          >
            {services[activeIndex].id}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        ref={scrollContainerRef}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'sticky',
            left: 0,
            top: 0,
            width: containerW,
            height: '100vh',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            overflow: 'hidden',
            perspective: 2000,
          }}
        >
          {/* Horizontal tracking line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-[var(--border)] opacity-30 -translate-y-1/2 pointer-events-none" />

          {/* Center Pivot for cards */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            {services.map((service, i) => (
              <WheelCard
                key={service.id}
                service={service}
                index={i}
                total={total}
                activeFloat={activeFloat}
                isActive={i === activeIndex}
                containerW={containerW}
                onSelect={handleSelect}
                onFocus={handleFocus}
              />
            ))}
          </div>

          {/* Bottom progress indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 pointer-events-auto">
            <span className="label-sm text-[var(--foreground)]">Scroll / Drag</span>
            <div className="flex gap-2">
              {services.map((_, i) => (
                <div
                  key={i}
                  onClick={() => handleFocus(i)}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 32 : 8,
                    height: 2,
                    backgroundColor: i === activeIndex ? 'var(--foreground)' : 'var(--border)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {services.slice(1).map((_, i) => (
          <div
            key={i + 1}
            style={{ width: containerW, height: '100vh', flexShrink: 0, scrollSnapAlign: 'start' }}
          />
        ))}
      </div>
    </>
  );
}

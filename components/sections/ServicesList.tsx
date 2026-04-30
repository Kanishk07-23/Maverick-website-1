'use client';

import { useRef, useState, useEffect } from 'react';
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

function WheelCard({
  service,
  index,
  total,
  activeFloat,
  isActive,
  containerW,
  onSelect,
}: {
  service: Service;
  index: number;
  total: number;
  activeFloat: any;
  isActive: boolean;
  containerW: number;
  onSelect: (s: Service) => void;
}) {
  const angleStep = 360 / total;
  const cardAngleDeg = useTransform(activeFloat, (a: number) => (index - a) * angleStep);
  const cardAngleRad = useTransform(cardAngleDeg, (d: number) => d * (Math.PI / 180));

  const xRadius = containerW < 768 ? containerW * 0.45 : containerW * 0.38;
  const zRadius = containerW < 768 ? 200 : 450;

  const x = useTransform(cardAngleRad, (r: number) => Math.sin(r) * xRadius);
  const z = useTransform(cardAngleRad, (r: number) => Math.cos(r) * zRadius);
  const rotateY = useTransform(cardAngleDeg, (d: number) => -d);

  const scale = useTransform(z, [-zRadius, 0, zRadius], [0.6, 0.8, 1]);
  const opacity = useTransform(z, [-zRadius, -zRadius * 0.2, zRadius * 0.3, zRadius], [0, 0, 0.2, 1]);
  const zIndex = useTransform(z, (val: number) => Math.round(val + 1000));

  const cardWidth = containerW < 640 ? 280 : 400;
  const cardHeight = containerW < 640 ? 420 : 560;

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
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <div
        onClick={() => onSelect(service)}
        className="flex flex-col relative group overflow-hidden bg-[var(--background)] border border-[var(--border)] transition-colors duration-500"
        style={{
          width: cardWidth,
          height: cardHeight,
          cursor: 'pointer',
          padding: containerW < 768 ? '24px' : '32px',
          borderColor: isActive ? 'var(--foreground)' : 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="label-sm text-[var(--foreground)] opacity-50">
            0{index + 1} {'//'}
          </span>
          {service.badge && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-black bg-[var(--inverted-bg)] text-[var(--inverted-text)] px-3 py-1">
              {service.badge}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2
            className="font-outfit font-black text-[var(--foreground)] leading-[0.95] mb-8 uppercase"
            style={{ 
              fontSize: service.id === 'performance-marketing' ? 'clamp(1.75rem, 3.2vw, 2.75rem)' : 'clamp(2rem, 4vw, 3.5rem)', 
              letterSpacing: '-0.07em'
            }}
          >
            {service.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>

          <div className="h-px bg-[var(--foreground)] w-0 group-hover:w-full transition-all duration-700 ease-exo" />

          <p className="text-[var(--muted-foreground)] text-base leading-relaxed mt-8 max-w-[300px] font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {service.tagline}
          </p>
        </div>

        <div
          className="mt-auto flex items-center justify-between pt-8 border-t border-[var(--border)]"
          style={{ opacity: isActive ? 1 : 0 }}
        >
          <span className="text-xs font-black uppercase tracking-[0.2em]">Explore Protocol</span>
          <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesList({ services }: { services: Service[] }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    setContainerW(window.innerWidth);
    const onResize = () => setContainerW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollXProgress } = useScroll({
    container: scrollRef,
  });

  const total = services.length;
  const smoothProgress = useSpring(scrollXProgress, { damping: 30, stiffness: 100, mass: 1 });
  const activeFloat = useTransform(smoothProgress, [0, 1], [0, total - 1]);

  useMotionValueEvent(activeFloat, 'change', (v) => {
    const idx = Math.round(v);
    if (idx !== activeIndex && idx >= 0 && idx < total) {
      setActiveIndex(idx);
    }
  });

  const handleSelect = (service: Service) => {
    setIsTransitioning(true);
    setTimeout(() => router.push(`/services/${service.id}`), 1200);
  };

  return (
    <div className="relative h-screen min-h-[700px] max-h-[1000px] w-full overflow-hidden bg-[var(--background)]">
      {/* Sophisticated Curtain Reveal Overlay */}
      <motion.div
        initial={false}
        animate={{ scaleY: isTransitioning ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-[var(--foreground)] origin-bottom pointer-events-none"
      />

      {/* Massive Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ opacity: 0.04, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-outfit font-black uppercase text-center text-[var(--foreground)] leading-none whitespace-nowrap absolute"
            style={{ fontSize: '40vw', letterSpacing: '-0.08em' }}
          >
            {services[activeIndex].id.split('-')[0]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrollable Rail wrapping the Sticky 3D Wheel */}
      <div 
        ref={scrollRef}
        className="absolute inset-0 overflow-x-auto overflow-y-hidden z-40 hide-scrollbar cursor-ew-resize"
      >
        <div style={{ width: `${total * 100}%`, height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
        
        <div className="sticky left-0 top-0 w-screen h-full flex items-center justify-center pointer-events-none" style={{ perspective: '2000px' }}>
          <div className="absolute w-full h-px bg-[var(--border)] top-1/2 left-0 opacity-20 pointer-events-none" />
          
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
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation Meta */}
      <div className="absolute bottom-12 left-0 w-full px-6 md:px-10 flex items-end justify-between z-50 pointer-events-none">
        <div className="flex flex-col gap-2">
          <span className="label-sm opacity-50">Discovery Protocol</span>
          <div className="flex gap-1.5">
            {services.map((_, i) => (
              <div
                key={i}
                className="h-[2px] transition-all duration-500 ease-exo"
                style={{
                  width: i === activeIndex ? '40px' : '12px',
                  backgroundColor: i === activeIndex ? 'var(--foreground)' : 'var(--border)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-right flex flex-col items-end gap-2">
          <span className="label-sm opacity-50 uppercase tracking-widest">Swipe / Shift {'< >'}</span>
          <div className="w-24 h-px bg-[var(--border)] relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[var(--foreground)]"
              style={{ width: '100%', scaleX: scrollXProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

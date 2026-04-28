'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
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

// ─── Single card component (proper React component so hooks are valid) ──────
function WheelCard({
  service,
  index,
  total,
  activeFloat,
  isActive,
  radius,
  windowW,
  onSelect,
}: {
  service: Service;
  index: number;
  total: number;
  activeFloat: any;
  isActive: boolean;
  radius: number;
  windowW: number;
  onSelect: (s: Service) => void;
}) {
  const angleStep = 360 / total;

  const cardAngleDeg = useTransform(activeFloat, (a: number) => (index - a) * angleStep);
  const cardAngleRad = useTransform(cardAngleDeg, (d: number) => d * (Math.PI / 180));
  const x = useTransform(cardAngleRad, (r: number) => Math.cos(r) * radius);
  const y = useTransform(cardAngleRad, (r: number) => Math.sin(r) * radius);
  const absDeg = useTransform(cardAngleDeg, (d: number) => {
    let n = ((d % 360) + 360) % 360;
    if (n > 180) n = 360 - n;
    return n;
  });
  const scale = useTransform(absDeg, [0, 55, 110], [1, 0.72, 0.45]);
  const opacity = useTransform(absDeg, [0, 50, 90], [1, 0.35, 0]);
  const zIndex = useTransform(absDeg, (d: number) => Math.round(200 - d));

  const cardWidth = windowW < 640 ? '80vw' : windowW < 1024 ? 420 : 560;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        translateX: x,
        translateY: y,
        scale,
        opacity,
        zIndex,
      }}
    >
      {/* Vertically center the card on the arc point */}
      <motion.div
        style={{ y: '-50%' }}
        onClick={() => isActive && onSelect(service)}
        className="relative overflow-hidden rounded-[36px] border border-border/30 backdrop-blur-xl group"
        whileHover={isActive ? { scale: 1.02 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          style={{
            width: cardWidth,
            background: 'var(--card)',
            cursor: isActive ? 'pointer' : 'default',
            boxShadow: isActive ? `0 0 60px ${service.color}30` : 'none',
          }}
        >
          {/* Color glow */}
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: service.color }}
          />

          <div className="relative z-10 p-8 md:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold px-3 py-1.5 rounded-full"
                style={{ background: `${service.color}15`, color: service.color }}
              >
                0{index + 1}
              </span>
              {service.badge && (
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                  style={{ background: service.color }}
                >
                  {service.badge}
                </span>
              )}
            </div>

            <h2
              className="font-outfit font-black text-foreground leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', letterSpacing: '-0.03em' }}
            >
              {service.title}
            </h2>

            <p className="text-base font-semibold" style={{ color: service.color }}>
              {service.tagline}
            </p>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
              {service.desc}
            </p>

            <div
              className={`flex items-center gap-3 font-bold text-sm transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
              style={{ color: service.color }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${service.color}15` }}
              >
                <ArrowRight size={18} />
              </div>
              <span>Enter Protocol</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Wheel Layout ──────────────────────────────────────────────────────
export default function ServicesList({ services }: { services: Service[] }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState('');
  const [windowW, setWindowW] = useState(0);

  useEffect(() => {
    setWindowW(window.innerWidth);
    const onResize = () => setWindowW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Restore scroll position on back-navigation
  useEffect(() => {
    const saved = sessionStorage.getItem('maverick_services_scroll');
    if (saved) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
      }, 50);
      sessionStorage.removeItem('maverick_services_scroll');
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = services.length;

  // Map scroll → float index. Dead zones at start/end keep first/last anchored.
  const activeFloat = useTransform(scrollYProgress, [0.05, 0.85], [0, total - 1]);

  useMotionValueEvent(activeFloat, 'change', (v) => {
    const idx = Math.round(Math.max(0, Math.min(total - 1, v)));
    setActiveIndex(idx);
  });

  const handleSelect = useCallback(
    (service: Service) => {
      sessionStorage.setItem('maverick_services_scroll', window.scrollY.toString());
      setTransitionColor(service.color);
      setIsTransitioning(true);
      setTimeout(() => router.push(`/services/${service.id}`), 450);
    },
    [router]
  );

  // Radius: pivot at left edge, cards orbit to the right and show near centre
  const radius = windowW > 0 ? (windowW < 768 ? windowW * 0.72 : windowW * 0.5) : 500;

  return (
    <>
      {/* Seamless mesh-gradient transition overlay */}
      <div
        className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-500 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 mesh-gradient" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 55% 50%, ${transitionColor}, transparent 70%)`,
          }}
        />
      </div>

      {/* 500vh scroll container */}
      <div ref={containerRef} style={{ height: '500vh', position: 'relative', width: '100%' }}>
        {/* Sticky full-screen viewport */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Pivot anchor — left edge, vertically centred */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              width: 0,
              height: 0,
            }}
          >
            {/* Decorative dashed arc */}
            {windowW > 0 && (
              <svg
                style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }}
                width={1}
                height={1}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={radius}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="4 14"
                  opacity="0.4"
                />
              </svg>
            )}

            {/* Cards */}
            {services.map((service, i) => (
              <WheelCard
                key={service.id}
                service={service}
                index={i}
                total={total}
                activeFloat={activeFloat}
                isActive={i === activeIndex}
                radius={radius}
                windowW={windowW}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Progress pill dots — bottom centre */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 8,
              zIndex: 50,
            }}
          >
            {services.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeIndex ? 28 : 8,
                  height: 8,
                  borderRadius: 99,
                  backgroundColor: i === activeIndex ? services[activeIndex].color : 'var(--border)',
                  opacity: i === activeIndex ? 1 : 0.4,
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

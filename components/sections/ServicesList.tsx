'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
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

// ─── Single card component (3D Glassmorphism Carousel) ───────────────
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

  // Elliptical orbit radii
  // Spread them out wider on desktop, tighter on mobile
  const xRadius = containerW < 768 ? containerW * 0.45 : containerW * 0.35;
  const zRadius = containerW < 768 ? 200 : 350;

  // Position in 3D space
  const x = useTransform(cardAngleRad, (r: number) => Math.sin(r) * xRadius);
  const z = useTransform(cardAngleRad, (r: number) => Math.cos(r) * zRadius);

  // Scale, Opacity, and Depth based on Z axis
  const scale = useTransform(z, [-zRadius, zRadius], [0.55, 1]);
  const opacity = useTransform(z, [-zRadius, -zRadius * 0.1, zRadius], [0, 0.2, 1]);
  const zIndex = useTransform(z, (val: number) => Math.round(val + 100));

  // Subtle Y-axis rotation based on X position to make cards look slightly inward
  const rotateY = useTransform(x, [-xRadius, xRadius], [12, -12]);

  const cardWidth = containerW < 640 ? Math.min(containerW * 0.85, 340) : containerW < 1024 ? 420 : 520;

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
        perspective: 1200,
        pointerEvents: 'auto', // All cards are clickable to focus them
      }}
    >
      <motion.div
        onClick={() => {
          if (isActive) onSelect(service);
          else onFocus(index);
        }}
        whileHover={isActive ? { scale: 1.03 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div
          className="glass-card"
          style={{
            width: cardWidth,
            cursor: isActive ? 'pointer' : 'pointer',
            borderRadius: 28,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            borderColor: isActive ? service.color : 'var(--glass-border)',
            boxShadow: isActive
              ? `var(--glass-shadow), 0 0 80px ${service.color}35`
              : 'var(--glass-shadow)',
            padding: containerW < 768 ? '28px 24px' : '40px 40px',
          }}
        >
          {/* Ambient color blob behind card */}
          <div
            style={{
              position: 'absolute',
              inset: -1,
              borderRadius: 28,
              background: `radial-gradient(ellipse at 70% 20%, ${service.color}15 0%, transparent 65%)`,
              pointerEvents: 'none',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '6px 14px',
                borderRadius: 99,
                background: `${service.color}15`,
                color: service.color,
                border: `1px solid ${service.color}30`,
              }}
            >
              0{index + 1}
            </span>
            {service.badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: 99,
                  background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                  color: '#fff',
                  boxShadow: `0 2px 12px ${service.color}50`,
                }}
              >
                {service.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--font-outfit, sans-serif)',
              fontWeight: 900,
              fontSize: containerW < 640 ? '1.55rem' : containerW < 1024 ? '1.9rem' : '2.2rem',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--foreground)',
              marginBottom: 12,
            }}
          >
            {service.title}
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: service.color,
              marginBottom: 14,
              lineHeight: 1.5,
            }}
          >
            {service.tagline}
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${service.color}40, transparent)`,
              marginBottom: 16,
              borderRadius: 1,
            }}
          />

          {/* Description */}
          <p
            className="text-muted-foreground"
            style={{
              fontSize: containerW < 768 ? 13 : 14,
              lineHeight: 1.7,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 24,
            }}
          >
            {service.desc}
          </p>

          {/* CTA row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${service.color}15`,
                border: `1px solid ${service.color}40`,
                color: service.color,
                flexShrink: 0,
              }}
            >
              <ArrowRight size={17} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: service.color, letterSpacing: '0.02em' }}>
              Enter Protocol
            </span>
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
  const [transitionColor, setTransitionColor] = useState('');
  const [containerW, setContainerW] = useState(0);

  // Track container width for responsive carousel layout
  useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerW(scrollContainerRef.current.clientWidth);
    }
    const onResize = () => {
      if (scrollContainerRef.current) setContainerW(scrollContainerRef.current.clientWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Map horizontal scroll progress
  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
  });

  // Smooth out the scroll for a buttery 3D feel
  const smoothProgress = useSpring(scrollXProgress, { damping: 24, stiffness: 120, mass: 0.8 });
  const total = services.length;
  const activeFloat = useTransform(smoothProgress, [0, 1], [0, total - 1]);

  useMotionValueEvent(activeFloat, 'change', (v) => {
    const idx = Math.round(Math.max(0, Math.min(total - 1, v)));
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  const handleSelect = useCallback(
    (service: Service) => {
      setTransitionColor(service.color);
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

  // Intercept vertical scroll and translate to horizontal scroll
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isAtStart = el.scrollLeft <= 0;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const isAtEnd = el.scrollLeft >= maxScroll - 1;

        // Escape conditions
        if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
          return;
        }

        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [containerW]);

  // Initial render guard to prevent 0-width calculations
  if (containerW === 0) {
    return <div ref={scrollContainerRef} style={{ width: '100%', height: '100vh' }} />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `
      }} />

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
            background: `radial-gradient(circle at 50% 50%, ${transitionColor}, transparent 70%)`,
          }}
        />
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar"
        style={{
          width: '100%',
          height: '100vh',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          position: 'relative',
        }}
      >
        <div style={{ width: `${total * 100}%`, height: '100%', position: 'relative' }}>
          
          {/* Snap zones defining scroll width */}
          <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            {services.map((_, i) => (
              <div key={i} style={{ flexShrink: 0, width: containerW, height: '100%', scrollSnapAlign: 'center' }} />
            ))}
          </div>

          {/* Sticky Visual Carousel */}
          <div
            style={{
              position: 'sticky',
              left: 0,
              top: 0,
              width: containerW,
              height: '100vh',
              marginTop: '-100vh', // Overlay exactly over snap zones
              pointerEvents: 'none', // Allow scrolling background
              overflow: 'hidden',
            }}
          >
            {/* Center Pivot */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
              {/* Decorative dashed background arc */}
              <svg
                style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
                width={containerW < 768 ? containerW * 0.9 : containerW * 0.7}
                height={containerW < 768 ? 400 : 700}
              >
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx={containerW < 768 ? containerW * 0.45 : containerW * 0.35}
                  ry={containerW < 768 ? 200 : 350}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="4 14"
                  opacity="0.3"
                />
              </svg>

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

            {/* Bottom progress dots */}
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
                zIndex: 50,
                pointerEvents: 'auto',
              }}
            >
              {services.map((_, i) => (
                <div
                  key={i}
                  onClick={() => handleFocus(i)}
                  style={{
                    width: i === activeIndex ? 28 : 7,
                    height: 7,
                    borderRadius: 99,
                    backgroundColor: i === activeIndex ? services[activeIndex].color : 'var(--border)',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    boxShadow: i === activeIndex ? `0 0 10px ${services[activeIndex].color}80` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

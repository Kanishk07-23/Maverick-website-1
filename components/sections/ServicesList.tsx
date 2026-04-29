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

// ─── Single card component (Vertical/Portrait 3D Carousel) ───────────
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

  // Cards rotate on Y axis to remain tangent to the wheel (true 3D wheel effect)
  const rotateY = useTransform(cardAngleDeg, (d: number) => -d);

  // Scale down and fade out as they go to the back
  const scale = useTransform(z, [-zRadius, 0, zRadius], [0.65, 0.8, 1]);
  const opacity = useTransform(z, [-zRadius, -zRadius * 0.1, zRadius * 0.5, zRadius], [0, 0, 0.5, 1]);
  const zIndex = useTransform(z, (val: number) => Math.round(val + 1000));

  // Vertical (Portrait) Card Dimensions
  const cardWidth = containerW < 640 ? 280 : 340;
  const cardHeight = containerW < 640 ? 400 : 480;

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
        pointerEvents: 'auto', // Allow clicking any visible card
      }}
    >
      <motion.div
        onClick={() => {
          if (isActive) onSelect(service);
          else onFocus(index);
        }}
        whileHover={isActive ? { scale: 1.02, y: -4 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div
          className="glass-card flex flex-col"
          style={{
            width: cardWidth,
            height: cardHeight,
            cursor: isActive ? 'pointer' : 'pointer',
            borderRadius: 24,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            borderColor: isActive ? service.color : 'var(--glass-border)',
            boxShadow: isActive
              ? `var(--glass-shadow), 0 0 60px ${service.color}25`
              : 'var(--glass-shadow)',
            padding: containerW < 768 ? '24px' : '32px',
          }}
        >
          {/* Ambient color blob behind card */}
          <div
            style={{
              position: 'absolute',
              inset: -1,
              borderRadius: 24,
              background: `radial-gradient(ellipse at 50% 20%, ${service.color}15 0%, transparent 60%)`,
              pointerEvents: 'none',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '4px 12px',
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
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                    color: '#fff',
                    boxShadow: `0 2px 8px ${service.color}50`,
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
                fontSize: '1.75rem',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--foreground)',
                marginBottom: 10,
              }}
            >
              {service.title}
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: service.color,
                marginBottom: 14,
                lineHeight: 1.4,
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
                flexShrink: 0,
              }}
            />

            {/* Description */}
            <p
              className="text-muted-foreground"
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {service.desc}
            </p>
          </div>

          {/* CTA row mapped to bottom */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 'auto',
              paddingTop: 16,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
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
              <ArrowRight size={16} />
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
      // Force scroll to start on mount to prevent showing 6th card first due to browser state
      scrollContainerRef.current.scrollLeft = 0;
    }
    const onResize = () => {
      if (scrollContainerRef.current) setContainerW(scrollContainerRef.current.clientWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Map horizontal scroll progress natively
  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
  });

  // Smooth out the scroll for a buttery physical wheel feel
  const smoothProgress = useSpring(scrollXProgress, { damping: 20, stiffness: 90, mass: 0.6 });
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

  // Intercept vertical scroll and translate to native horizontal scroll
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If the scroll is predominantly vertical
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isAtStart = el.scrollLeft <= 0;
        const maxScroll = el.scrollWidth - el.clientWidth;
        // Handle floating point math safely
        const isAtEnd = Math.ceil(el.scrollLeft) >= maxScroll;

        // Escape conditions - let the user naturally scroll down/up the rest of the webpage
        if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
          return;
        }

        // Prevent vertical page scroll, convert to horizontal container scroll
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [containerW]);

  // Initial render guard to prevent 0-width layout bugs
  if (containerW === 0) {
    return <div ref={scrollContainerRef} style={{ width: '100%', height: '100vh' }} />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: ".hide-scrollbar::-webkit-scrollbar { display: none; }\n.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }"
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

      {/* Robust Horizontal Scroll Container using Flex layout for sticky stability */}
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
        }}
      >
        {/* 
          1. Sticky Visual Overlay (Acts as Snap Point 0)
          This flex child is exactly 1 viewport wide. It stays in view via 'sticky',
          and its width counts towards the first snap point.
        */}
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
            perspective: 1600, // 3D depth applied here!
          }}
        >
          {/* Decorative dashed background arc */}
          <svg
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
            width={containerW < 768 ? containerW * 0.9 : containerW * 0.75}
            height={containerW < 768 ? 500 : 800}
          >
            <ellipse
              cx="50%"
              cy="50%"
              rx={containerW < 768 ? containerW * 0.42 : containerW * 0.35}
              ry={containerW < 768 ? 250 : 400}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 14"
              opacity="0.25"
            />
          </svg>

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

        {/* 
          2. Spacers for the remaining cards (Snap Points 1 through N) 
          These push the total scroll width to exactly N viewports.
        */}
        {services.slice(1).map((_, i) => (
          <div
            key={i + 1}
            style={{
              width: containerW,
              height: '100vh',
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          />
        ))}
      </div>
    </>
  );
}

'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
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

// ─── Single card component ────────────────────────────────────────────────────
function WheelCard({
  service,
  index,
  total,
  activeFloat,
  isActive,
  radius,
  windowW,
  pivotX,
  onSelect,
}: {
  service: Service;
  index: number;
  total: number;
  activeFloat: any;
  isActive: boolean;
  radius: number;
  windowW: number;
  pivotX: number;
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

  const scale = useTransform(absDeg, [0, 55, 110], [1, 0.68, 0.42]);
  const opacity = useTransform(absDeg, [0, 50, 85], [1, 0.3, 0]);
  const zIndex = useTransform(absDeg, (d: number) => Math.round(200 - d));
  // Slight 3-D tilt: cards curving away tilt on Y axis
  const rotateY = useTransform(cardAngleDeg, [-60, 0, 60], [18, 0, -18]);

  const cardWidth = windowW < 640 ? Math.min(windowW * 0.82, 360) : windowW < 1024 ? 420 : 520;

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
        perspective: 1200,
      }}
    >
      {/* Vertically centre the card on the arc point */}
      <motion.div
        style={{ y: '-50%', rotateY }}
        onClick={() => isActive && onSelect(service)}
        whileHover={isActive ? { scale: 1.03 } : {}}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        {/*
          ── 3-D Glassmorphism Card ──────────────────────────────────────────
          Dark: deep translucent glass with vivid glow
          Light: frosted white glass with subtle brand tint
        */}
        <div
          style={{
            width: cardWidth,
            cursor: isActive ? 'pointer' : 'default',
            borderRadius: 28,
            position: 'relative',
            transformStyle: 'preserve-3d',
            // Multi-layer glass look
            background: `
              linear-gradient(
                135deg,
                rgba(255,255,255,0.09) 0%,
                rgba(255,255,255,0.04) 50%,
                rgba(255,255,255,0.01) 100%
              )
            `,
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: isActive
              ? `
                  0 0 0 1px rgba(255,255,255,0.08),
                  0 8px 32px rgba(0,0,0,0.45),
                  0 32px 64px rgba(0,0,0,0.35),
                  0 0 80px ${service.color}28,
                  inset 0 1px 0 rgba(255,255,255,0.15),
                  inset 0 -1px 0 rgba(0,0,0,0.2)
                `
              : `
                  0 4px 16px rgba(0,0,0,0.3),
                  inset 0 1px 0 rgba(255,255,255,0.08)
                `,
          }}
        >
          {/* Ambient colour glow blob behind card */}
          <div
            style={{
              position: 'absolute',
              inset: -1,
              borderRadius: 28,
              background: `radial-gradient(ellipse at 70% 20%, ${service.color}22 0%, transparent 65%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Top-edge specular highlight — makes it feel like glass */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              borderRadius: '0 0 50% 50%',
              pointerEvents: 'none',
            }}
          />

          {/* Card content */}
          <div style={{ position: 'relative', zIndex: 2, padding: windowW < 768 ? '28px 24px' : '40px 40px' }}>
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
                  background: `${service.color}20`,
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
                fontSize: windowW < 640 ? '1.55rem' : windowW < 1024 ? '1.9rem' : '2.2rem',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'rgba(255,255,255,0.95)',
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
              style={{
                fontSize: windowW < 768 ? 13 : 14,
                color: 'rgba(255,255,255,0.60)',
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
                  background: `${service.color}25`,
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
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Wheel Layout ────────────────────────────────────────────────────────
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

  // ── Layout geometry ──────────────────────────────────────────────────────
  // Radius of the orbit circle
  const radius = windowW > 0 ? (windowW < 768 ? windowW * 0.72 : windowW * 0.48) : 500;

  // Card width (same formula as in WheelCard)
  const cardWidth = windowW < 640 ? Math.min(windowW * 0.82, 360) : windowW < 1024 ? 420 : 520;

  // The "front" position is at angle=0 → cos(0)=1, so x_offset_from_pivot = radius.
  // We want the centre of that card to sit at 55% of the screen width.
  // pivot_x + radius - cardWidth/2 = targetX  →  pivot_x = targetX - radius + cardWidth/2
  const targetX = windowW * 0.55; // where we want the card's left edge centre
  const pivotX = windowW > 0 ? targetX - radius + cardWidth / 2 : 0;

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
          {/* Pivot anchor — computed X so front card is screen-centred, vertically centred */}
          <div
            style={{
              position: 'absolute',
              left: pivotX,
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
                  opacity="0.25"
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
                pivotX={pivotX}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Right-side scroll hint / index indicator */}
          <div
            style={{
              position: 'absolute',
              right: 28,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              zIndex: 60,
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: i === activeIndex ? 28 : 6,
                  borderRadius: 99,
                  backgroundColor: i === activeIndex ? s.color : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: i === activeIndex ? `0 0 12px ${s.color}80` : 'none',
                }}
              />
            ))}
          </div>

          {/* Bottom progress dots */}
          <div
            style={{
              position: 'absolute',
              bottom: 36,
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
                  width: i === activeIndex ? 28 : 7,
                  height: 7,
                  borderRadius: 99,
                  backgroundColor:
                    i === activeIndex ? services[activeIndex].color : 'rgba(255,255,255,0.18)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: i === activeIndex ? `0 0 10px ${services[activeIndex].color}80` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

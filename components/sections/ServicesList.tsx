'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
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

// ─── Individual card ─────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  offset,
  absOffset,
  onClick,
  onFlipDone,
  isFlipping,
}: {
  service: Service;
  index: number;
  offset: number;
  absOffset: number;
  onClick: () => void;
  onFlipDone: () => void;
  isFlipping: boolean;
}) {
  const router = useRouter();
  const isCenter = offset === 0;
  const visible = absOffset <= 1;

  const rotateY = useMotionValue(0);
  const frontOpacity = useTransform(rotateY, [-180, -91, -90, 0], [0, 0, 1, 1]);
  const backOpacity  = useTransform(rotateY, [-180, -91, -90, 0], [1, 1, 0, 0]);

  useEffect(() => {
    if (isFlipping && isCenter) {
      animate(rotateY, -180, {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
        onComplete: () => {
          onFlipDone();
          router.push(`/services/${service.id}`);
        },
      });
    }
    if (!isFlipping) {
      animate(rotateY, 0, { duration: 0.4 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipping]);

  if (!visible) return null;

  const cardHeight = isCenter ? 520 : 440;

  return (
    <motion.div
      animate={{
        x: `${offset * 64}%`,
        scale: isCenter ? 1 : 0.82,
        opacity: absOffset === 0 ? 1 : 0.5,
        zIndex: isCenter ? 10 : 5 - absOffset,
      }}
      transition={{ duration: 0.5, ease: [0.34, 1.1, 0.64, 1] }}
      className="absolute w-full cursor-pointer"
      style={{ perspectiveOrigin: 'center center' }}
      onClick={isCenter ? onClick : undefined}
    >
      {/* 3D flip wrapper */}
      <div style={{ perspective: 1400 }}>
        <motion.div
          style={{ rotateY, transformStyle: 'preserve-3d', position: 'relative', minHeight: cardHeight }}
        >
          {/* FRONT */}
          <motion.div
            style={{
              opacity: frontOpacity as any,
              backfaceVisibility: 'hidden' as any,
              minHeight: cardHeight,
              background: 'var(--card)',
              boxShadow: isCenter
                ? `0 32px 80px rgba(0,0,0,0.18), 0 0 48px ${service.color}25`
                : undefined,
              filter: isCenter ? undefined : 'brightness(0.85)',
            }}
            className="relative rounded-[28px] overflow-hidden border border-border/50"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: service.color }} />

            {/* Background radial glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] pointer-events-none"
              style={{ backgroundColor: service.color, opacity: isCenter ? 0.18 : 0.1 }}
            />

            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
              {/* Badge row */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${service.color}18`, color: service.color }}
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

              {/* Title */}
              <h2
                className="font-outfit font-black text-foreground leading-tight mb-2"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', letterSpacing: '-0.03em' }}
              >
                {service.title}
              </h2>

              {/* Tagline */}
              <p className="text-sm font-semibold mb-5" style={{ color: service.color }}>
                {service.tagline}
              </p>

              {/* Desc */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                {service.desc}
              </p>

              {/* Features — center only */}
              {isCenter && (
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {service.features.slice(0, 4).map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <Check size={10} style={{ color: service.color }} strokeWidth={3} />
                      </div>
                      <span className="text-muted-foreground text-xs leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA hint */}
              {isCenter && (
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: service.color }}>
                  <ArrowRight size={15} />
                  <span>Click to flip & explore</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* BACK — gradient reveal */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              inset: 0,
              borderRadius: 28,
              minHeight: cardHeight,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                opacity: backOpacity as any,
                background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}99 100%)`,
                minHeight: cardHeight,
              }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="text-white text-center px-8">
                <div className="text-7xl font-black font-outfit mb-4 tracking-tight opacity-95">
                  {service.title.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="text-white/70 text-base font-medium">Taking you there…</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Carousel ───────────────────────────────────────────────────────────
export default function ServicesList({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const total = services.length;

  const prev = useCallback(() => {
    if (flippingIndex !== null) return;
    setActiveIndex(i => (i - 1 + total) % total);
  }, [total, flippingIndex]);

  const next = useCallback(() => {
    if (flippingIndex !== null) return;
    setActiveIndex(i => (i + 1) % total);
  }, [total, flippingIndex]);

  // Horizontal wheel scroll
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      if (wheelTimer.current) return; // debounce
      if (e.deltaX > 25) next();
      else if (e.deltaX < -25) prev();
      wheelTimer.current = setTimeout(() => { wheelTimer.current = null; }, 600);
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => {
      window.removeEventListener('wheel', handler);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [next, prev]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const handleCardClick = () => {
    if (flippingIndex !== null) return;
    setFlippingIndex(activeIndex);
  };

  return (
    <div className="relative w-full select-none">
      {/* Instruction */}
      <div className="flex justify-center mb-10">
        <span className="text-xs text-muted-foreground px-5 py-2.5 glass-card rounded-full border border-border/40 font-medium tracking-wide">
          ← Scroll or use arrows to browse · Click center to explore →
        </span>
      </div>

      {/* Carousel stage */}
      <div
        className="relative mx-auto"
        style={{ height: 560, maxWidth: 680, perspective: '1200px', perspectiveOrigin: '50% 50%' }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        }}
      >
        {services.map((service, i) => {
          const raw = (i - activeIndex + total) % total;
          const offset = raw > total / 2 ? raw - total : raw;
          const absOffset = Math.abs(offset);

          return (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              offset={offset}
              absOffset={absOffset}
              onClick={handleCardClick}
              onFlipDone={() => setFlippingIndex(null)}
              isFlipping={flippingIndex === i}
            />
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {services.map((s, i) => (
          <button
            key={i}
            onClick={() => { if (flippingIndex === null) setActiveIndex(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? 32 : 8,
              height: 8,
              backgroundColor: i === activeIndex ? services[activeIndex].color : 'var(--border)',
              opacity: i === activeIndex ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-5 mt-6">
        {[{ dir: 'prev', fn: prev, rotate: true }, { dir: 'next', fn: next, rotate: false }].map(({ dir, fn, rotate }) => (
          <button
            key={dir}
            onClick={fn}
            className="w-11 h-11 rounded-full glass-card border border-border/50 flex items-center justify-center hover:border-[var(--brand-purple)]/60 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ArrowRight size={17} className={rotate ? 'rotate-180' : ''} />
          </button>
        ))}
      </div>
    </div>
  );
}

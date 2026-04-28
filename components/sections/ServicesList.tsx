'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveCardTransition } from '@/lib/cardTransition';
import { useTheme } from 'next-themes';

interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  color: string;
  badge?: string;
}

// ─── Individual card ──────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  offset,
  absOffset,
  onNavigate,
}: {
  service: Service;
  index: number;
  offset: number;
  absOffset: number;
  onNavigate: (el: HTMLDivElement) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCenter = offset === 0;
  const visible = absOffset <= 1;

  if (!visible) return null;

  const cardHeight = isCenter ? 520 : 430;

  const handleClick = () => {
    if (!isCenter || !cardRef.current) return;
    onNavigate(cardRef.current);
  };

  return (
    <motion.div
      animate={{
        x: `${offset * 62}%`,
        scale: isCenter ? 1 : 0.80,
        opacity: absOffset === 0 ? 1 : 0.45,
        zIndex: isCenter ? 10 : 5 - absOffset,
        filter: isCenter ? 'brightness(1)' : 'brightness(0.7)',
      }}
      transition={{ duration: 0.48, ease: [0.34, 1.1, 0.64, 1] }}
      className="absolute w-full"
      style={{ cursor: isCenter ? 'pointer' : 'default' }}
      onClick={handleClick}
    >
      <div
        ref={cardRef}
        style={{
          minHeight: cardHeight,
          borderRadius: 28,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: isCenter
            ? `0 24px 64px rgba(0,0,0,0.15), 0 0 40px ${service.color}18`
            : undefined,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: service.color }} />

        {/* Radial glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ backgroundColor: service.color, opacity: isCenter ? 0.15 : 0.07 }}
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

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
            {service.desc}
          </p>

          {/* Features — center card only */}
          {isCenter && (
            <div className="grid grid-cols-2 gap-2.5 mb-7">
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

          {/* CTA indicator */}
          {isCenter && (
            <div
              className="group flex items-center gap-2 text-sm font-bold mt-auto"
              style={{ color: service.color }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${service.color}18` }}
              >
                <ArrowRight size={14} />
              </div>
              <span>Tap to explore</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Carousel ────────────────────────────────────────────────────────────
export default function ServicesList({ services }: { services: Service[] }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = services.length;

  const prev = useCallback(() => setActiveIndex(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex(i => (i + 1) % total), [total]);

  // Horizontal wheel
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelTimer.current) return;
      if (e.deltaX > 25) next();
      else if (e.deltaX < -25) prev();
      wheelTimer.current = setTimeout(() => { wheelTimer.current = null; }, 550);
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => { window.removeEventListener('wheel', handler); if (wheelTimer.current) clearTimeout(wheelTimer.current); };
  }, [next, prev]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const handleNavigate = (cardEl: HTMLDivElement) => {
    const rect = cardEl.getBoundingClientRect();
    saveCardTransition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      color: services[activeIndex].color,
    });
    router.push(`/services/${services[activeIndex].id}`);
  };

  return (
    <div className="relative w-full select-none">
      {/* Hint pill */}
      <div className="flex justify-center mb-10">
        <span className="text-xs text-muted-foreground px-5 py-2.5 glass-card rounded-full border border-border/40 font-medium tracking-wide">
          ← Scroll horizontally or use arrows to browse · Click center to explore →
        </span>
      </div>

      {/* Stage */}
      <div
        className="relative mx-auto"
        style={{ height: 560, maxWidth: 680 }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        }}
      >
        {services.map((service, i) => {
          const raw = (i - activeIndex + total) % total;
          const offset = raw > total / 2 ? raw - total : raw;
          return (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              offset={offset}
              absOffset={Math.abs(offset)}
              onNavigate={handleNavigate}
            />
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {services.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
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
        {([['prev', prev, true], ['next', next, false]] as const).map(([dir, fn, rotate]) => (
          <button
            key={dir}
            onClick={() => fn()}
            className="w-11 h-11 rounded-full glass-card border border-border/50 flex items-center justify-center hover:border-[var(--brand-purple)]/60 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ArrowRight size={17} className={rotate ? 'rotate-180' : ''} />
          </button>
        ))}
      </div>
    </div>
  );
}

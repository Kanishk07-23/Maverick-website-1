'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// ─── Animated counter ───────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });
    return controls.stop;
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      <span className="text-[var(--brand-purple)]">{suffix}</span>
    </span>
  );
}

// ─── Stat Data ──────────────────────────────────────────────────────────────
const stats = [
  { id: 'brands', num: 40, suffix: '+', label: 'Brands Scaled', desc: 'Across India, UAE, USA & UK', delay: 0.1 },
  { id: 'views', num: 15, suffix: 'M+', label: 'Organic Views', desc: 'Through SEO & social media', delay: 0.2 },
  { id: 'roi', num: 200, suffix: '%+', label: 'Average ROI', desc: 'From performance campaigns', delay: 0.3 },
  { id: 'years', num: 5, suffix: '+', label: 'Years Experience', desc: 'As a digital marketing firm', delay: 0.4 },
];

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: stat.delay, ease: [0.34, 1.2, 0.64, 1] }}
      className="group relative rounded-3xl overflow-hidden border border-border/40 glass-card p-8 flex flex-col justify-end min-h-[220px]"
    >
      {/* Background glow on hover */}
      <div 
        className="absolute -inset-4 bg-gradient-to-br from-[var(--brand-purple)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl"
      />

      {/* Text content */}
      <div className="relative z-10">
        <div
          className="font-outfit font-black text-foreground leading-none mb-3"
          style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)' }}
        >
          <AnimatedNumber target={stat.num} suffix={stat.suffix} />
        </div>
        <div className="font-bold text-lg text-foreground mb-1">{stat.label}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</div>
      </div>

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.3)' }}
      />
    </motion.div>
  );
}

export default function Stats3DGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

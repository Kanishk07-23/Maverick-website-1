'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/MagneticButton';
import { ArrowRight } from 'lucide-react';

// Dynamically import 3D stats to keep SSR clean
const Stats3DGrid = dynamic(() => import('@/components/three/Stats3DGrid'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-border/40 glass-card animate-pulse"
          style={{ minHeight: 280 }}
        />
      ))}
    </div>
  ),
});

export default function ResultsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      className="relative w-full py-28 md:py-36 bg-transparent overflow-hidden"
      id="results"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-[0.08] dark:opacity-[0.12] blur-[100px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--brand-purple) 0%, var(--brand-blue) 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6">
            Proven Impact
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-outfit font-black text-foreground leading-none"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}
            >
              Global Scale.<br />
              <span className="gradient-text">Absolute Precision.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed md:text-right">
              Real numbers from real campaigns — no vanity metrics, just bottom-line impact.
            </p>
          </div>
        </motion.div>

        {/* 3D Stats Grid */}
        <Stats3DGrid />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <MagneticButton href="/contact">
            <span
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-white text-base"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Get Your Free Strategy Call
              <ArrowRight size={18} />
            </span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}

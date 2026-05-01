'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { SplineScene } from '@/components/SplineScene';

const stats = [
  { value: '40+', label: 'Brands Scaled' },
  { value: '15M+', label: 'Organic Views' },
  { value: '2.5X', label: 'Average ROI' },
  { value: '₹4Cr+', label: 'Ad Spend Managed' },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 md:py-48 bg-transparent border-t border-[var(--border)]" id="results">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10" ref={ref}>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-24 md:mb-32">
          <div className="max-w-2xl flex-1">
            <motion.span
              className="label-sm block mb-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Performance Metrics
            </motion.span>
            <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               className="font-outfit font-black text-[var(--foreground)] uppercase leading-none tracking-tighter"
               style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Proven Growth<br />
              <span className="brutalist-highlight px-2 mt-2">Protocols.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            className="flex-1 w-full h-[400px] lg:h-[500px] relative mt-10 lg:mt-0 glass-card rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <SplineScene 
              scene="https://prod.spline.design/kZcbCRc4-r4uJ-90/scene.splinecode" 
              className="w-full h-full"
            />
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none">
              <div className="bg-[var(--background)]/80 backdrop-blur-md px-4 py-2 border border-[var(--border)] rounded-full">
                <p className="label-sm opacity-100 uppercase tracking-[0.2em] text-[var(--foreground)]">
                  Verified Success Logs {'//'} 2024
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[var(--border)]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="py-16 md:py-24 border-b md:border-b-0 md:border-r border-[var(--border)] last:border-r-0 lg:[&:nth-child(2)]:border-r flex flex-col items-center justify-center text-center"
            >
              <div className="font-outfit font-black text-[var(--foreground)] leading-none tracking-tighter mb-4"
                   style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
                {stat.value}
              </div>
              <div className="label-sm opacity-50 uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-24 border-t border-[var(--border)] pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-12"
        >
          <div className="max-w-xl">
             <p className="text-[var(--muted-foreground)] text-xl leading-tight font-medium">
                We optimize for the only metric that matters: net-profit growth. No fluff, no excuses. Just aggressive scaling.
             </p>
          </div>
          <Link
            href="/contact"
            className="px-10 py-5 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest hover:scale-105 transition-transform btn-magnetic"
          >
            Initiate Growth Protocol →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

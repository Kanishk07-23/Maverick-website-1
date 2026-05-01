'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

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

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 md:mb-32">
          <div className="max-w-2xl">
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
          <p className="label-sm opacity-50 uppercase tracking-[0.2em] md:text-right">
            Verified Success Logs {'//'} 2024 Archive
          </p>
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

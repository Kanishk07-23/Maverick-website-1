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
          
          {/* Premium CSS-animated visual — replaces Spline 3D (was crashing in production) */}
          <motion.div 
            className="flex-1 w-full h-[400px] lg:h-[500px] relative mt-10 lg:mt-0 glass-card rounded-2xl overflow-hidden border border-[var(--border)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Animated grid background */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }} />

            {/* Floating orbs */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central orb */}
              <motion.div
                className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(79,70,229,0.1) 50%, transparent 70%)',
                  filter: 'blur(1px)',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Inner core */}
              <motion.div
                className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[var(--brand-purple)]"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
                  boxShadow: '0 0 40px rgba(124,58,237,0.3), inset 0 0 20px rgba(124,58,237,0.1)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Orbit ring 1 */}
              <motion.div
                className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-[var(--brand-purple)]/20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--brand-purple)] shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
              </motion.div>
              {/* Orbit ring 2 */}
              <motion.div
                className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-[var(--brand-purple)]/10"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--brand-purple)]/60 shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--brand-purple)]/40 shadow-[0_0_8px_rgba(124,58,237,0.3)]" />
              </motion.div>
              {/* Center icon */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                  <span className="text-white text-2xl md:text-3xl font-black">M</span>
                </div>
                <p className="label-sm opacity-80 uppercase tracking-[0.2em] text-[var(--foreground)] text-xs">
                  Growth Engine
                </p>
              </div>
            </div>

            {/* Scan line animation */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-purple)]/30 to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
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

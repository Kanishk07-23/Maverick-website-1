'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import InteractiveRobot from '@/components/InteractiveRobot';
import { Magnetic } from '@/components/ui/Magnetic';

const stats = [
  { value: '40+', label: 'Strategic Partners' },
  { value: '15M+', label: 'Organic Scale' },
  { value: '2.5X', label: 'Revenue Yield' },
  { value: '₹4Cr+', label: 'Managed Assets' },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-48 bg-transparent" id="results">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10" ref={ref}>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-24 mb-48">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <span className="label-sm tracking-[0.3em] uppercase opacity-40 mb-8 block">Logs // Performance Data</span>
              <h2 className="font-outfit font-black text-[var(--foreground)] uppercase leading-none tracking-tighter"
                  style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
                PROVEN<br />
                <span className="text-[var(--brand-purple)]">YIELDS.</span>
              </h2>
              <p className="mt-8 text-xl text-[var(--muted-foreground)] max-w-md font-light leading-relaxed">
                Aggressive scaling protocols engineered to convert attention into liquid revenue.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-1 w-full h-[500px] lg:h-[600px] relative rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Stable Interactive 3D Robot */}
            <div className="absolute inset-0 z-0">
              <Magnetic strength={0.2}>
                <InteractiveRobot />
              </Magnetic>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
              <div className="bg-black/40 backdrop-blur-md px-6 py-3 border border-white/10 rounded-full">
                <p className="label-sm tracking-[0.2em] uppercase text-white font-bold">
                  Verified Success Logs // 2025
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col gap-4 border-l border-white/5 pl-8 hover:border-[var(--brand-purple)] transition-colors duration-500"
            >
              <div className="font-outfit font-black text-[var(--foreground)] leading-none tracking-tighter"
                   style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}>
                {stat.value}
              </div>
              <div className="label-sm opacity-40 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

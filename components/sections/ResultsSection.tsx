'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { value: '40+', label: 'Brands Scaled' },
  { value: '15M+', label: 'Organic Views' },
  { value: '200%+', label: 'Average ROI' },
  { value: '₹4Cr+', label: 'Ad Spend Managed' },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 md:py-36 bg-[var(--background)] border-t border-[var(--border)]" id="results">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10" ref={ref}>

        {/* Label */}
        <motion.span
          className="label-sm block mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Proven Impact
        </motion.span>

        {/* Stats grid — Exoape big numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="py-10 md:py-16 px-0 border-b border-r border-[var(--border)] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <div
                className="font-outfit font-black text-[var(--foreground)] stat-number mb-3"
              >
                {stat.value}
              </div>
              <div className="label-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between border-t border-[var(--border)] pt-10"
        >
          <p className="text-[var(--muted-foreground)] text-base md:text-lg max-w-md leading-relaxed">
            Real numbers from real campaigns. No vanity metrics, just bottom-line impact.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white btn-magnetic flex-shrink-0"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Get Your Free Strategy Call →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

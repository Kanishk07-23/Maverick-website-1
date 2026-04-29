'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      className="relative py-32 md:py-56 border-t border-[var(--border)] bg-[var(--background)] overflow-hidden"
      id="cta"
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.span
          className="label-sm block mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Final Directive
        </motion.span>

        <motion.h2
          className="font-outfit font-black text-[var(--foreground)] uppercase leading-none mb-16 md:mb-24 tracking-tighter"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 12rem)', lineHeight: 0.85 }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Scale Your<br />
          <span className="text-[var(--muted-foreground)]">Vision.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 border-t border-[var(--border)] pt-12"
        >
          <div className="max-w-md">
            <p className="text-[var(--muted-foreground)] text-xl font-medium leading-tight">
              Initiate a 30-min strategy audit. No commitment. Just direct intel on how to dominate your category.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6">
            <Link
              href="/contact"
              className="px-12 py-6 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic shadow-2xl"
            >
              Book Direct Call →
            </Link>
            <a
              href="mailto:maverickdigitals18@gmail.com"
              className="label-sm opacity-50 hover:opacity-100 transition-opacity border-b border-current"
            >
              maverickdigitals18@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

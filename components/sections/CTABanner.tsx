'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      className="relative py-28 md:py-36 border-t border-[var(--border)] bg-[var(--background)] overflow-hidden"
      id="cta"
      ref={ref}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.span
          className="label-sm block mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Talk
        </motion.span>

        {/* Big question headline */}
        <motion.h2
          className="font-outfit font-black text-[var(--foreground)] leading-none mb-12 md:mb-16"
          style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          Ready to Grow<br />
          <span className="gradient-text">Your Brand?</span>
        </motion.h2>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between border-t border-[var(--border)] pt-10"
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-[var(--muted-foreground)] text-base">
              Free 30-min strategy call · Custom growth roadmap · No commitment
            </p>
            <a
              href="mailto:maverickdigitals18@gmail.com"
              id="cta-email-link"
              className="text-[var(--foreground)] text-sm link-underline"
            >
              maverickdigitals18@gmail.com
            </a>
          </div>
          <Link
            href="/contact"
            id="cta-book-call"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white btn-magnetic flex-shrink-0"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Book Free Strategy Call →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

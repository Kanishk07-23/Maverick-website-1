'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  // Parallax: headline moves up slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Stagger words of headline
  const wordVars: Variants = {
    hidden: { y: '110%' },
    show: (i: number) => ({
      y: '0%',
      transition: {
        duration: 1.0,
        delay: 0.05 * i,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.7 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  // Headline broken into lines and words
  const line1 = ['We', 'Scale'];
  const line2 = ['Brands.'];

  return (
    <section
      ref={sectionRef}
      className="relative h-safe-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--background)]"
      id="home"
    >
      {/* Top row — label + availability */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-24 md:pt-28">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="label-sm"
        >
          Mumbai-Based Growth Partners
        </motion.span>
        <motion.span
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="label-sm hidden md:block"
        >
          Open to New Projects ↗
        </motion.span>
      </div>

      {/* Center — Massive headline */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-6 md:px-10 flex-1 flex flex-col justify-center"
      >
        <motion.h1
          initial="hidden"
          animate="show"
          className="font-outfit font-black text-[var(--foreground)] uppercase leading-none select-none"
          style={{ fontSize: 'clamp(4.5rem, 14vw, 14rem)', letterSpacing: '-0.04em', lineHeight: 0.92 }}
        >
          {/* Line 1 */}
          <div className="flex flex-wrap gap-x-[0.2em] overflow-hidden">
            {line1.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  custom={i}
                  variants={wordVars}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Line 2 — gradient accent word */}
          <div className="flex flex-wrap gap-x-[0.2em] overflow-hidden">
            {line2.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  custom={line1.length + i}
                  variants={wordVars}
                  className="inline-block gradient-text"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.h1>

        {/* Subtext — appears after headline */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 md:mt-10 text-[var(--muted-foreground)] text-base md:text-lg max-w-md leading-relaxed font-medium"
        >
          Data-driven architecture with aggressive creative execution.
          We violently scale your revenue, not your vanity metrics.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 md:mt-10 flex items-center gap-6"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white btn-magnetic"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Start Your Journey →
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-[var(--muted-foreground)] link-underline hover:text-[var(--foreground)] transition-colors"
          >
            View our work
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom row — scroll hint + stat */}
      <div className="relative z-10 px-6 md:px-10 pb-8 md:pb-10 flex items-end justify-between">
        {/* Scroll indicator */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3"
        >
          <div className="w-px h-12 overflow-hidden relative">
            <div className="scroll-line absolute inset-0 w-full bg-[var(--foreground)]" />
          </div>
          <span className="label-sm">Scroll</span>
        </motion.div>

        {/* Stat */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-right hidden md:block"
        >
          <div className="font-outfit font-black text-[var(--foreground)]" style={{ fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
            40+
          </div>
          <div className="label-sm mt-1">Brands Scaled</div>
        </motion.div>
      </div>

      {/* Thin horizontal rule at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border)]" />
    </section>
  );
}

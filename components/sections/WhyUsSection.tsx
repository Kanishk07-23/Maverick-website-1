'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const differentiators = [
  {
    id: 'performance',
    num: '01',
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results that move the needle.',
    stat: '200%+',
    statLabel: 'Average ROI',
  },
  {
    id: 'data',
    num: '02',
    title: 'Data-Informed Creativity',
    desc: 'We blend creative storytelling with data insights to create campaigns that resonate and convert simultaneously.',
    stat: '15M+',
    statLabel: 'Organic Views',
  },
  {
    id: 'founder',
    num: '03',
    title: 'Founder-Led',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every single step.',
    stat: '100%',
    statLabel: 'Accountability',
  },
  {
    id: 'e2e',
    num: '04',
    title: 'End-to-End Capability',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team. No outsourcing.',
    stat: '40+',
    statLabel: 'Brands Scaled',
  },
];

export default function WhyUsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 md:py-36 bg-[var(--background)] border-t border-[var(--border)]" id="why-us">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header row */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="label-sm block mb-5">Why Maverick</span>
            <h2
              className="font-outfit font-black text-[var(--foreground)] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', letterSpacing: '-0.04em' }}
            >
              Why We Are<br />Different.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--muted-foreground)] text-base md:text-lg max-w-xs leading-relaxed md:text-right"
          >
            We&apos;re not a standard agency. We are a high-output growth team. No vanity metrics, just pure bottom-line impact.
          </motion.p>
        </div>

        {/* Differentiators — Exoape row layout */}
        <div>
          {differentiators.map((d, i) => (
            <DiffRow key={d.id} diff={d} index={i} />
          ))}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
  );
}

function DiffRow({ diff, index }: { diff: typeof differentiators[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="border-t border-[var(--border)] py-10 md:py-12 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 items-start md:items-center"
    >
      {/* Number */}
      <span className="label-sm">{diff.num}</span>

      {/* Text */}
      <div>
        <h3
          className="font-outfit font-black text-[var(--foreground)] mb-3"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          {diff.title}
        </h3>
        <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-xl">
          {diff.desc}
        </p>
      </div>

      {/* Stat — big number right aligned */}
      <div className="md:text-right">
        <div
          className="font-outfit font-black text-[var(--foreground)] leading-none"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}
        >
          {diff.stat}
        </div>
        <div className="label-sm mt-1">{diff.statLabel}</div>
      </div>
    </motion.div>
  );
}

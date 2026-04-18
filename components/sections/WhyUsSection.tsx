'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const differentiators = [
  {
    id: 'performance',
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results.',
    stat: '200%+',
    statLabel: 'Average ROI',
  },
  {
    id: 'data',
    title: 'Data-Informed Creativity',
    desc: 'We blend creative storytelling with data insights to create campaigns that resonate and convert simultaneously.',
    stat: '15M+',
    statLabel: 'Organic Views',
  },
  {
    id: 'founder',
    title: 'Founder-Led Approach',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every step.',
    stat: '100%',
    statLabel: 'Accountability',
  },
  {
    id: 'e2e',
    title: 'End-to-End Capability',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team.',
    stat: '40+',
    statLabel: 'Brands Scaled',
  },
];

export default function WhyUsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 md:py-36 bg-[var(--background)]" id="why-us">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Two column layout: sticky text left, cards right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left — Sticky heading */}
          <div className="lg:w-5/12">
            <div className="lg:sticky lg:top-32">
              <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6">
                  Why Maverick
                </span>
                <h2
                  className="font-outfit font-black text-foreground mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                >
                  Why We Are<br />
                  <span className="gradient-text">Different.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We&apos;re not a standard agency. We are a high-output growth team based in Mumbai. No vanity metrics, just pure bottom-line impact.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right — Clean cards, no icons */}
          <div className="lg:w-7/12 flex flex-col gap-6">
            {differentiators.map((d, i) => {
              return <DiffCard key={d.id} diff={d} index={i} />;
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function DiffCard({ diff, index }: { diff: typeof differentiators[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative rounded-3xl p-8 md:p-10 border transition-all duration-300 hover:border-[var(--brand-purple)]/30"
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
        backdropFilter: 'blur(16px) saturate(1.8)',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-outfit font-bold text-foreground text-xl md:text-2xl mb-3" style={{ letterSpacing: '-0.01em' }}>
            {diff.title}
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed">
            {diff.desc}
          </p>
        </div>

        {/* Stat — clean typography only, no icons */}
        <div className="flex-shrink-0 md:text-right">
          <div
            className="font-outfit font-black gradient-text leading-none"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}
          >
            {diff.stat}
          </div>
          <div className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1">
            {diff.statLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

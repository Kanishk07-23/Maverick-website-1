'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const differentiators = [
  {
    id: 'performance',
    num: '01',
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results that move the needle.',
    stat: '2.5X',
    statLabel: 'Average ROI',
  },
  {
    id: 'data',
    num: '02',
    title: 'Data Architecture',
    desc: 'We blend creative storytelling with technical data insights to create campaigns that resonate and convert simultaneously.',
    stat: '15M+',
    statLabel: 'Organic Views',
  },
  {
    id: 'founder',
    num: '03',
    title: 'Founder-Led',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every single step.',
    stat: '100%',
    statLabel: 'Direct Access',
  },
  {
    id: 'e2e',
    num: '04',
    title: 'Integrated Cell',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team. No outsourcing.',
    stat: '40+',
    statLabel: 'Brands Scaled',
  },
];

export default function WhyUsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 md:py-48 bg-[var(--background)] border-t border-[var(--border)]" id="why-us">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-sm block mb-8">Competitive Edge</span>
            <h2
              className="font-outfit font-black text-[var(--foreground)] uppercase leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}
            >
              Why We Are<br />
              <span className="brutalist-highlight px-2 mt-2">Different.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-sm leading-tight font-medium md:text-right"
          >
            We are not a standard agency. We are a high-output growth protocol. No vanity, just pure bottom-line impact.
          </motion.p>
        </div>

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
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border-t border-[var(--border)] py-16 md:py-20 grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-10 items-start md:items-center group"
    >
      <span className="label-sm opacity-50 block mb-4 md:mb-0">[{diff.num}]</span>

      <div className="max-w-2xl">
        <h3
          className="font-outfit font-black text-[var(--foreground)] uppercase mb-6 tracking-tighter leading-none"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
        >
          {diff.title}
        </h3>
        <p className="text-[var(--muted-foreground)] text-lg md:text-xl leading-snug font-medium max-w-lg">
          {diff.desc}
        </p>
      </div>

      <div className="md:text-right border-l md:border-l-0 md:border-r border-[var(--border)] pl-10 md:pl-0 md:pr-10">
        <div
          className="font-outfit font-black text-[var(--foreground)] leading-none tracking-tighter"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {diff.stat}
        </div>
        <div className="label-sm opacity-50 uppercase mt-2">{diff.statLabel}</div>
      </div>
    </motion.div>
  );
}

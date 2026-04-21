'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We map out every opportunity and gap in your digital presence before touching a single deliverable. Deep data diving to find leverage points.',
    color: '#8b5cf6'
  },
  {
    num: '02',
    title: 'Growth Architecture',
    desc: 'Building a tailored growth roadmap with clear KPIs. We design the funnels, select the channels, and align every action with revenue targets.',
    color: '#3b82f6'
  },
  {
    num: '03',
    title: 'Asset Production',
    desc: 'Our creative team engineers high-performing assets—from ad creatives to landing pages—optimized explicitly for conversion.',
    color: '#d946ef'
  },
  {
    num: '04',
    title: 'Live Execution',
    desc: 'Surgical deployment across all selected platforms. We manage pacing, bidding, and delivery to ensure maximum capital efficiency.',
    color: '#10b981'
  },
  {
    num: '05',
    title: 'Scale & Optimize',
    desc: 'Relentless iteration. We analyze the data, kill the losers, and pour fuel into the winning campaigns until your growth curve goes vertical.',
    color: '#f59e0b'
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Single shared scroll listener — passed down to each step as a prop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section className="bg-[var(--background)] py-32 relative overflow-hidden" id="process" ref={containerRef}>

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--brand-purple) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center mb-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6"
        >
          The Matrix
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-outfit font-black text-foreground leading-none mb-6"
          style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
        >
          Execution<br />
          <span className="gradient-text">Algorithm.</span>
        </motion.h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">

        {/* Background Track Line */}
        <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border transform md:-translate-x-1/2" />

        {/* Animated Glow Line — driven by the shared scrollYProgress */}
        <motion.div
          className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[4px] rounded-full transform md:-translate-x-1/2 z-0"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--brand-purple), var(--brand-blue), transparent)',
            scaleY: scrollYProgress,
            originY: 0,
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)'
          }}
        />

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <ProcessStep
              key={step.num}
              step={step}
              index={index}
              isEven={isEven}
              // Pass shared scroll progress — no extra useScroll per step
              sectionScrollYProgress={scrollYProgress}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isEven,
  sectionScrollYProgress,
}: {
  step: typeof steps[0];
  index: number;
  isEven: boolean;
  sectionScrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Each step still derives its own per-step scroll range from the shared progress
  const stepCount = steps.length;
  const rangeStart = index / stepCount;
  const rangeEnd = (index + 1) / stepCount;

  const scale = useTransform(sectionScrollYProgress, [rangeStart, (rangeStart + rangeEnd) / 2, rangeEnd], [0.8, 1.2, 1]);
  const opacity = useTransform(sectionScrollYProgress, [rangeStart, rangeStart + 0.05, rangeEnd - 0.05, rangeEnd], [0.3, 1, 1, 0.3]);
  const colorFilter = useTransform(sectionScrollYProgress, [rangeStart, (rangeStart + rangeEnd) / 2], ['grayscale(100%)', 'grayscale(0%)']);

  return (
    <div className={`relative flex items-center justify-between flex-col md:flex-row w-full my-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`} ref={ref}>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-[45%]" />

      {/* Central Node */}
      <div className="absolute left-[14px] md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--background)] border-4"
          style={{ scale, opacity, filter: colorFilter, borderColor: step.color, boxShadow: `0 0 20px ${step.color}60` }}
        >
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: step.color }} />
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] pl-20 md:pl-0 relative ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-card p-8 rounded-3xl border border-border/40 hover:border-purple-500/30 transition-colors group relative overflow-hidden"
        >
          {/* Subtle geometric gradient on hover */}
          <div className="absolute -inset-20 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rotate-12" />

          <div className={`text-6xl font-black font-outfit opacity-10 absolute top-4 ${isEven ? 'md:right-6 right-6' : 'left-6'} pointer-events-none text-foreground select-none`}>
            {step.num}
          </div>

          <h3 className="text-2xl font-bold font-outfit text-foreground mb-4 relative z-10">{step.title}</h3>
          <p className="text-muted-foreground text-lg relative z-10">{step.desc}</p>
        </motion.div>
      </div>
    </div>
  );
}

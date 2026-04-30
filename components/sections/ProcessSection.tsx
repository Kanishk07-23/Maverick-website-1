'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We map out every opportunity and gap in your digital presence before touching a single deliverable. Deep data diving to find leverage points.',
  },
  {
    num: '02',
    title: 'Growth Architecture',
    desc: 'Building a tailored growth roadmap with clear KPIs. We design the funnels, select the channels, and align every action with revenue targets.',
  },
  {
    num: '03',
    title: 'Asset Production',
    desc: 'Our creative team engineers high-performing assets—from ad creatives to landing pages—optimized explicitly for conversion.',
  },
  {
    num: '04',
    title: 'Live Execution',
    desc: 'Surgical deployment across all selected platforms. We manage pacing, bidding, and delivery to ensure maximum capital efficiency.',
  },
  {
    num: '05',
    title: 'Scale & Optimize',
    desc: 'Relentless iteration. We analyze the data, kill the losers, and pour fuel into the winning campaigns until your growth curve goes vertical.',
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section className="bg-[var(--background)] py-28 md:py-40 relative overflow-hidden border-t border-[var(--border)]" id="process" ref={containerRef}>
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-24 md:mb-32">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-sm block mb-8"
        >
          Operational Protocol
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-outfit font-black text-[var(--foreground)] leading-none uppercase"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 8rem)', letterSpacing: '-0.04em' }}
        >
          Execution<br />
          <span className="brutalist-highlight px-2 mt-2">Algorithm.</span>
        </motion.h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative">
        {/* Central Vertical Line */}
        <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--brand-purple)] to-transparent transform md:-translate-x-1/2" />

        <div className="flex flex-col gap-24 md:gap-40">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.num}
              step={step}
              index={index}
              totalSteps={steps.length}
              sectionScrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  totalSteps,
  sectionScrollYProgress,
}: {
  step: typeof steps[0];
  index: number;
  totalSteps: number;
  sectionScrollYProgress: any;
}) {
  const isEven = index % 2 === 0;
  
  // Calculate specific step activation based on shared scroll
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  
  const opacity = useTransform(sectionScrollYProgress, [start, start + 0.1, end - 0.1, end], [0.2, 1, 1, 0.2]);
  const scale = useTransform(sectionScrollYProgress, [start, start + 0.1, end - 0.1, end], [0.95, 1, 1, 0.95]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className={`relative flex flex-col md:flex-row w-full items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Node Dot */}
      <div className="absolute left-[34px] md:left-1/2 top-0 md:top-auto transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-[var(--brand-purple)] z-10 shadow-[0_0_10px_var(--brand-purple)]" />

      {/* Spacer */}
      <div className="hidden md:block w-1/2" />

      {/* Content */}
      <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pl-20' : 'md:pr-20 md:text-right'}`}>
        <div className="max-w-md">
          <span className="label-sm opacity-50 block mb-6">Step {step.num}</span>
          <h3 className="font-outfit font-black text-[var(--foreground)] uppercase mb-6 tracking-tighter leading-none"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
            {step.title}
          </h3>
          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed font-medium">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

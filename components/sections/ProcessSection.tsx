'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SearchCheck, Lightbulb, Hammer, Rocket, BarChart2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Deep-dive into your brand, goals, market, and competition. We map out every opportunity and gap before touching a single deliverable.',
    icon: SearchCheck,
    gradient: 'from-violet-600 to-purple-700',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    accentColor: '#8b5cf6',
    tags: ['Brand Audit', 'Market Research', 'Competitor Analysis'],
  },
  {
    step: '02',
    title: 'Strategize',
    desc: 'Build a tailored growth roadmap with clear KPIs and milestones. We align every action with your revenue targets — nothing extraneous.',
    icon: Lightbulb,
    gradient: 'from-blue-600 to-cyan-600',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    accentColor: '#3b82f6',
    tags: ['KPI Setting', 'Channel Strategy', 'Growth Roadmap'],
  },
  {
    step: '03',
    title: 'Create',
    desc: 'Produce high-quality assets, content and campaigns. Our creative team builds everything in-house — zero outsourcing, full control.',
    icon: Hammer,
    gradient: 'from-fuchsia-600 to-pink-600',
    glowColor: 'rgba(217, 70, 239, 0.6)',
    accentColor: '#d946ef',
    tags: ['Content Production', 'Ad Creatives', 'Web Assets'],
  },
  {
    step: '04',
    title: 'Execute',
    desc: 'Launch with precision across channels — on time, every time. We manage every detail so you can focus on running your business.',
    icon: Rocket,
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    accentColor: '#10b981',
    tags: ['Campaign Launch', 'Platform Management', 'Real-time Tracking'],
  },
  {
    step: '05',
    title: 'Scale',
    desc: 'Analyze, optimize and double down on what\'s working. We iterate relentlessly until your growth curve is pointing permanently upward.',
    icon: BarChart2,
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    accentColor: '#f59e0b',
    tags: ['Data Analysis', 'CRO', 'Growth Scaling'],
  },
];

function StepCard({ step, index, isLast }: { step: typeof steps[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col md:flex-row items-start gap-0 relative"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center mr-8 flex-shrink-0">
        {/* Step node */}
        <div className="relative">
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full blur-md"
            style={{ background: step.glowColor }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          />
          {/* Node */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg z-10`}
          >
            <Icon size={26} className="text-white" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-[2px] mt-3 rounded-full origin-top flex-shrink-0"
            style={{
              background: `linear-gradient(to bottom, ${step.accentColor}, transparent)`,
              height: '120px',
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="group relative flex-1 mb-12 rounded-3xl overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Card glow on hover */}
        <motion.div
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{ background: step.glowColor }}
        />

        <div
          className="relative p-8 rounded-3xl border"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
            backdropFilter: 'blur(20px) saturate(1.8)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          {/* Gradient tint on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl`}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.04 }}
            transition={{ duration: 0.4 }}
          />

          {/* Step number — massive background watermark */}
          <div
            className="absolute top-4 right-6 font-outfit font-black opacity-[0.04] select-none pointer-events-none leading-none"
            style={{ fontSize: '6rem', color: step.accentColor }}
          >
            {step.step}
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  color: step.accentColor,
                  background: `${step.accentColor}18`,
                  border: `1px solid ${step.accentColor}30`,
                }}
              >
                Step {step.step}
              </span>
            </div>

            <h3 className="font-outfit font-black text-foreground text-3xl mb-4 leading-tight"
              style={{ letterSpacing: '-0.02em' }}>
              {step.title}
            </h3>

            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {step.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full text-foreground/70"
                  style={{
                    background: 'var(--muted)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.gradient} rounded-b-3xl`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="section-padding relative overflow-hidden" id="process">
      {/* Section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--section-alt-bg)' }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[160px] opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, var(--brand-purple) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6"
          >
            How We Work
          </motion.span>

          <h2
            className="font-outfit font-black text-foreground mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Our 5-Step{' '}
            <span className="gradient-text">Growth Process</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            A proven execution system built to deliver measurable returns at every stage of growth.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

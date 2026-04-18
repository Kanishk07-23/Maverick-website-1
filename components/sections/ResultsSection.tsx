'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { Rocket, Eye, TrendingUp, Zap, Globe, Award, BarChart3 } from 'lucide-react';


const stats = [
  {
    id: 'brands',
    num: 40,
    suffix: '+',
    label: 'Brands Scaled',
    desc: 'Across India, UAE, USA, & UK',
    icon: Rocket,
    gradient: 'from-violet-600 to-purple-700',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    accentColor: '#8b5cf6',
  },
  {
    id: 'views',
    num: 15,
    suffix: 'M+',
    label: 'Organic Views',
    desc: 'Through SEO & social media management',
    icon: Eye,
    gradient: 'from-blue-600 to-cyan-600',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    accentColor: '#3b82f6',
  },
  {
    id: 'roi',
    num: 200,
    suffix: '%+',
    label: 'Average ROI',
    desc: 'From performance marketing campaigns',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    accentColor: '#10b981',
  },
  {
    id: 'years',
    num: 5,
    suffix: '+',
    label: 'Years Experience',
    desc: 'As a digital marketing company',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    accentColor: '#f59e0b',
  },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });

    return controls.stop;
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      <span className="gradient-text">{suffix}</span>
    </span>
  );
}

function StatCard({
  stat, index,
}: {
  stat: typeof stats[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
      id={`stat-${stat.id}`}
    >
      {/* Card hover glow */}
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: stat.glowColor }}
      />

      {/* Card */}
      <div
        className="relative h-full rounded-3xl p-7 flex flex-col gap-5 overflow-hidden border"
        style={{
          background: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        {/* Hover background tint */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-3xl`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Animated border highlight on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${stat.accentColor}20, transparent 60%)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon — premium floating style */}
        <div className="relative z-10 w-fit">
          {/* Icon glow */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} blur-md`}
            initial={{ opacity: 0.6, scale: 0.9 }}
            whileHover={{ opacity: 1, scale: 1.3 }}
            transition={{ duration: 0.4 }}
          />
          {/* Icon ring */}
          <div
            className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon size={24} className="text-white" strokeWidth={1.5} />
          </div>
          {/* Tiny orbit dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background"
            style={{ background: stat.accentColor }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Number */}
        <div className="relative z-10">
          <div
            className="font-outfit font-black text-foreground leading-none"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}
          >
            <AnimatedNumber target={stat.num} suffix={stat.suffix} />
          </div>
        </div>

        {/* Labels */}
        <div className="relative z-10">
          <div className="text-foreground font-bold text-lg mb-1">{stat.label}</div>
          <div className="text-muted-foreground text-sm leading-relaxed">{stat.desc}</div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient} rounded-b-3xl`}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export default function ResultsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="section-padding relative overflow-hidden" id="results">

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6"
          >
            Proven Impact
          </motion.span>

          <h2
            className="font-outfit font-black text-foreground mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Proven Digital{' '}
            <span className="gradient-text">Marketing Results</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Real results delivered for growth-focused businesses across industries and borders.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <StatCard key={s.id} stat={s} index={idx} />
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <div
            className="glass-card rounded-2xl p-1 border border-border/50 overflow-hidden"
            style={{ boxShadow: 'var(--card-shadow)' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-0 divide-y md:divide-y-0 md:divide-x divide-border/40">
              {[
                { icon: Globe, label: 'Global Reach', sub: 'India · UAE · USA · UK · Australia' },
                { icon: Award, label: 'Founder-Led', sub: 'Direct involvement in every project' },
                { icon: BarChart3, label: 'Data-Informed', sub: 'Creativity backed by analytics' },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div key={label} className="flex items-center gap-4 px-8 py-5 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--gradient-brand)' }}
                  >
                    <Icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-foreground font-semibold text-sm">{label}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
              <div className="px-8 py-5">
                <MagneticButton href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                    style={{ background: 'var(--gradient-brand)' }}
                  >
                    Get Free Audit →
                  </motion.span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

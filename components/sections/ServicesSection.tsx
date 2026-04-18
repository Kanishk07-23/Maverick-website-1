'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Search, Sparkles, Presentation, Cpu, LineChart } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

const services = [
  {
    id: 'perf', title: 'Performance Marketing', icon: TrendingUp,
    desc: 'Data-driven ad campaigns on Meta & Google designed purely for massive ROI. We do not care about clicks, we care about actual revenue.',
    href: '/services/performance-marketing',
    gradient: 'from-violet-600 via-purple-600 to-blue-600',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    size: 'large', // spans 2 cols on desktop
    tag: 'Most Impactful',
  },
  {
    id: 'seo', title: 'SEO & SEM', icon: Search,
    desc: 'Dominate search engines. We reconstruct your digital architecture so high-intent customers find you exactly when they are ready to buy.',
    href: '/services/seo-sem',
    gradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    size: 'normal',
    tag: null,
  },
  {
    id: 'social', title: 'Social Media', icon: Sparkles,
    desc: 'Transform your brand pages into magnetic community hubs. 15M+ organic views generated for our clients.',
    href: '/services/social-media',
    gradient: 'from-fuchsia-600 via-pink-500 to-rose-500',
    glowColor: 'rgba(217, 70, 239, 0.35)',
    size: 'normal',
    tag: null,
  },
  {
    id: 'brand', title: 'Elite Branding', icon: Presentation,
    desc: 'We craft distinct visual and narrative identities that command higher prices in the marketplace.',
    href: '/services/branding-strategy',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    size: 'normal',
    tag: null,
  },
  {
    id: 'web', title: 'High-Conversion Web Dev', icon: Cpu,
    desc: 'Lightning-fast web experiences engineered specifically to sell.',
    href: '/services/web-dev',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    size: 'large',
    tag: null,
  },
  {
    id: 'personal', title: 'Founder Branding', icon: LineChart,
    desc: 'Scale your personal brand on LinkedIn and Twitter to open high-level B2B opportunities.',
    href: '/services/personal-branding',
    gradient: 'from-rose-600 via-pink-500 to-fuchsia-600',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    size: 'normal',
    tag: null,
  },
];

function BorderBeam({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, transparent 120deg)`,
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
        }}
      />
      <div
        className="absolute inset-[1px] rounded-[calc(2rem-1px)]"
        style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)' }}
      />
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = service.icon;

  const isLarge = service.size === 'large';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative ${isLarge ? 'md:col-span-2' : ''}`}
    >
      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: service.glowColor }}
      />

      {/* Card */}
      <div
        className="relative h-full rounded-[2rem] border p-8 flex flex-col justify-between overflow-hidden cursor-pointer"
        style={{
          background: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          boxShadow: 'var(--glass-shadow)',
          minHeight: isLarge ? '240px' : '300px',
        }}
      >
        {/* Animated border */}
        <BorderBeam color={service.glowColor} />

        {/* Background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-[2rem]`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.04 }}
          transition={{ duration: 0.4 }}
        />

        {/* Top row */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            {/* Icon container with animated glow */}
            <div className="relative">
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} blur-md`}
                initial={{ opacity: 0.4, scale: 0.8 }}
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                <Icon size={26} className="text-white" strokeWidth={1.5} />
              </div>
            </div>

            {service.tag && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ background: 'var(--gradient-brand)' }}>
                {service.tag}
              </span>
            )}
          </div>

          <h3 className={`font-outfit font-bold text-foreground mb-3 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>
            {service.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {service.desc}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 mt-6 pt-6 border-t border-border/40">
          <MagneticButton href={service.href}>
            <motion.div
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              whileHover={{ x: 2 }}
            >
              Explore Protocol
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-32 bg-[var(--background)] overflow-hidden" id="services">

      {/* Ambient mesh glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, var(--brand-purple) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, var(--brand-blue) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6"
          >
            Our Protocol
          </motion.span>

          <h2 className="font-outfit font-black text-foreground leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}>
            We Engineer<br />
            <span className="gradient-text">Growth.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl font-medium leading-relaxed">
            The precise execution frameworks we use to violently scale our partners&apos; revenue and market share.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Final CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <div className="relative rounded-[2rem] overflow-hidden p-[1px]"
            style={{ background: 'var(--gradient-brand)' }}>
            <div className="rounded-[calc(2rem-1px)] p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-8"
              style={{ background: 'var(--background)' }}>
              {/* Subtle inner glow */}
              <div className="absolute inset-0 opacity-5 rounded-[calc(2rem-1px)]"
                style={{ background: 'var(--gradient-brand)' }} />

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-4xl font-bold font-outfit text-foreground mb-2">
                  Don&apos;t see what you need?
                </h3>
                <p className="text-muted-foreground text-lg">
                  We build custom strategic protocols for unique brands.
                </p>
              </div>

              <MagneticButton href="/contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base whitespace-nowrap overflow-hidden"
                  style={{ background: 'var(--gradient-brand)' }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Let&apos;s Build
                    <ArrowRight size={18} />
                  </span>
                </motion.span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

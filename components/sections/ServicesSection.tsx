'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import Link from 'next/link';

const services = [
  {
    id: 'perf',
    title: 'Performance Marketing',
    desc: 'Data-driven ad campaigns on Meta & Google designed purely for massive ROI. We do not care about clicks, we care about actual revenue.',
    href: '/services/performance-marketing',
    accent: '#8b5cf6',
  },
  {
    id: 'seo',
    title: 'SEO & SEM',
    desc: 'Dominate search engines. We reconstruct your digital architecture so high-intent customers find you exactly when they are ready to buy.',
    href: '/services/seo-sem',
    accent: '#3b82f6',
  },
  {
    id: 'social',
    title: 'Social Media Dynamics',
    desc: 'We transform boring brand pages into magnetic community hubs. 15M+ organic views generated for our clients so far.',
    href: '/services/social-media',
    accent: '#d946ef',
  },
  {
    id: 'brand',
    title: 'Elite Branding',
    desc: 'Your brand is not just a logo. We craft distinct visual and narrative identities that command higher prices in the marketplace.',
    href: '/services/branding-strategy',
    accent: '#10b981',
  },
  {
    id: 'web',
    title: 'High-Conversion Web Dev',
    desc: 'Beautiful websites are useless if they don\'t convert. We build lightning-fast web experiences engineered specifically to sell.',
    href: '/services/web-dev',
    accent: '#f59e0b',
  },
  {
    id: 'personal',
    title: 'Founder Branding',
    desc: 'People buy from people. We scale your personal brand on LinkedIn and Twitter to open high-level B2B opportunities.',
    href: '/services/personal-branding',
    accent: '#f43f5e',
  },
];

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={service.href} className="block group">
        <div
          className="relative py-10 md:py-12 border-b transition-colors duration-300"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Full-width hover fill */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mx-6"
            style={{
              background: `linear-gradient(90deg, ${service.accent}08 0%, ${service.accent}04 50%, transparent 100%)`,
            }}
          />

          <div className="relative z-10 flex items-center justify-between gap-6">
            {/* Left: number + title */}
            <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
              <span
                className="text-sm font-mono font-medium flex-shrink-0 w-8"
                style={{ color: service.accent }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex-1 min-w-0">
                <h3 className="font-outfit font-bold text-foreground text-2xl md:text-4xl lg:text-5xl leading-tight group-hover:translate-x-2 transition-transform duration-300"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {service.title}
                </h3>

                {/* Description — visible on hover (desktop) or always on mobile */}
                <div className="mt-3 md:mt-0 md:max-h-0 md:group-hover:max-h-24 md:overflow-hidden md:transition-all md:duration-500 md:ease-out">
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl md:pt-4">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: arrow */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${service.accent}15`, color: service.accent }}
              >
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

          {/* Accent line on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] origin-left"
            style={{ backgroundColor: service.accent, scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 md:py-36 bg-[var(--background)]" id="services">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6">
            Our Protocol
          </span>
          <h2
            className="font-outfit font-black text-foreground leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            We Engineer<br />
            <span className="gradient-text">Growth.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl font-medium leading-relaxed">
            The precise execution frameworks we use to violently scale our partners&apos; revenue and market share.
          </p>
        </motion.div>

        {/* Service List — clean expandable rows */}
        <div>
          {services.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between"
        >
          <p className="text-muted-foreground text-lg max-w-md">
            Don&apos;t see what you need? We build custom strategic protocols for unique brands.
          </p>
          <MagneticButton href="/contact">
            <span
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Let&apos;s Build <ArrowRight size={18} />
            </span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}

'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 'perf',
    num: '01',
    title: 'Performance Marketing',
    desc: 'Data-driven ad campaigns on Meta & Google designed purely for massive ROI. We don\'t care about clicks — we care about actual revenue.',
    href: '/services/performance-marketing',
  },
  {
    id: 'seo',
    num: '02',
    title: 'SEO & SEM',
    desc: 'Dominate search engines. We reconstruct your digital architecture so high-intent customers find you exactly when they\'re ready to buy.',
    href: '/services/seo-sem',
  },
  {
    id: 'social',
    num: '03',
    title: 'Social Media',
    desc: 'We transform boring brand pages into magnetic community hubs. 15M+ organic views generated for our clients so far.',
    href: '/services/social-media',
  },
  {
    id: 'brand',
    num: '04',
    title: 'Branding & Strategy',
    desc: 'Your brand is not just a logo. We craft distinct visual and narrative identities that command higher prices in the marketplace.',
    href: '/services/branding-strategy',
  },
  {
    id: 'web',
    num: '05',
    title: 'Web & App Development',
    desc: 'Beautiful websites are useless if they don\'t convert. We build lightning-fast web experiences engineered specifically to sell.',
    href: '/services/web-dev',
  },
  {
    id: 'personal',
    num: '06',
    title: 'Personal Branding',
    desc: 'People buy from people. We scale your personal brand on LinkedIn and Twitter to open high-level B2B opportunities.',
    href: '/services/personal-branding',
  },
];

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Link
        href={service.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block group"
      >
        <div className="relative py-7 md:py-8 border-t border-[var(--border)] overflow-hidden">
          {/* Hover fill — subtle */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ background: 'var(--muted)' }}
          />

          <div className="relative z-10 flex items-start gap-6 md:gap-10 md:items-center">
            {/* Number */}
            <span
              className="label-sm flex-shrink-0 pt-1 md:pt-0 tabular-nums"
              style={{ minWidth: 28 }}
            >
              {service.num}
            </span>

            {/* Title + desc */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3
                  className="font-outfit font-black text-[var(--foreground)] transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    transform: hovered ? 'translateX(8px)' : 'translateX(0)',
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {service.title}
                </h3>
                {/* Arrow */}
                <span
                  className="text-[var(--muted-foreground)] text-xl flex-shrink-0 transition-all duration-300"
                  style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'translateX(0) rotate(-45deg)' : 'translateX(-8px) rotate(-45deg)',
                  }}
                >
                  ↗
                </span>
              </div>

              {/* Description — expands on hover on desktop, always visible on mobile */}
              <div
                style={{
                  maxHeight: hovered ? 80 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  opacity: hovered ? 1 : 0,
                }}
                className="hidden md:block"
              >
                <p className="text-[var(--muted-foreground)] text-base leading-relaxed pt-3 max-w-2xl">
                  {service.desc}
                </p>
              </div>

              {/* Always visible on mobile */}
              <p className="md:hidden text-[var(--muted-foreground)] text-sm leading-relaxed pt-2">
                {service.desc}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 md:py-36 bg-[var(--background)]" id="services">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="label-sm block mb-5">Our Protocol</span>
            <h2
              className="font-outfit font-black text-[var(--foreground)] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', letterSpacing: '-0.04em' }}
            >
              We Engineer<br />Growth.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[var(--muted-foreground)] text-base md:text-lg max-w-sm leading-relaxed md:text-right"
          >
            Six specialized service pillars — each engineered for maximum bottom-line impact.
          </motion.p>
        </div>

        {/* Service Rows */}
        <div>
          {services.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
          {/* Bottom border */}
          <div className="border-t border-[var(--border)]" />
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between"
        >
          <p className="text-[var(--muted-foreground)] text-base max-w-sm">
            Don&apos;t see what you need? We build custom strategic protocols for unique brands.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white btn-magnetic flex-shrink-0"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Let&apos;s Build →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

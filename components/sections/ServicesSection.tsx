'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 'performance-marketing',
    num: '01',
    title: 'Performance Marketing',
    desc: 'Data-driven ad campaigns on Meta & Google designed purely for massive ROI. We don\'t care about clicks — we care about actual revenue.',
  },
  {
    id: 'seo-sem',
    num: '02',
    title: 'SEO & SEM',
    desc: 'Dominate search engines. We reconstruct your digital architecture so high-intent customers find you exactly when they\'re ready to buy.',
  },
  {
    id: 'social-media',
    num: '03',
    title: 'Social Media',
    desc: 'We transform boring brand pages into magnetic community hubs. 15M+ organic views generated for our clients so far.',
  },
  {
    id: 'branding-strategy',
    num: '04',
    title: 'Brand Identity',
    desc: 'Your brand is not just a logo. We craft distinct visual and narrative identities that command higher prices in the marketplace.',
  },
  {
    id: 'web-dev',
    num: '05',
    title: 'Web & App Dev',
    desc: 'Beautiful websites are useless if they don\'t convert. We build lightning-fast web experiences engineered specifically to sell.',
  },
  {
    id: 'personal-branding',
    num: '06',
    title: 'Personal Branding',
    desc: 'People buy from people. We scale your personal brand on LinkedIn and Twitter to open high-level B2B opportunities.',
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
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link
        href={`/services/${service.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block group relative border-t border-[var(--border)] overflow-hidden transition-colors hover:bg-[var(--inverted-bg)] hover:text-[var(--inverted-text)]"
      >
        <div className="relative py-12 md:py-20 px-6 md:px-10 z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-24">
          <div className="flex items-center gap-10 md:gap-20">
            <span className="label-sm opacity-50 block md:w-12">[{service.num}]</span>
            <h3 className="font-outfit font-black text-[var(--foreground)] group-hover:text-[var(--inverted-text)] uppercase tracking-tighter transition-colors"
                style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', lineHeight: 0.9 }}>
              {service.title}
            </h3>
          </div>
          
          <div className="md:max-w-md md:text-right flex flex-col md:items-end">
            <p className="text-[var(--muted-foreground)] group-hover:text-[var(--inverted-text)] opacity-70 text-lg md:text-xl font-medium leading-snug mb-6 transition-colors">
              {service.desc}
            </p>
            <span className="label-sm uppercase tracking-[0.2em] transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
              Explore Protocol →
            </span>
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
    <section className="relative py-32 md:py-56 bg-transparent border-t border-[var(--border)]" id="services">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="px-6 md:px-10 mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-sm block mb-8">Operational Matrix</span>
            <h2
              className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 10vw, 11rem)' }}
            >
              We Engineer<br />
              <span className="brutalist-highlight px-2">Growth.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[var(--muted-foreground)] text-xl md:text-2xl max-w-sm leading-tight font-medium md:text-right"
          >
            Six specialized pillars — each engineered for maximum capital efficiency.
          </motion.p>
        </div>

        {/* Service Rows */}
        <div className="border-b border-[var(--border)]">
          {services.map((service, index) => (
            <ServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-xl text-center md:text-left">
             <p className="text-[var(--muted-foreground)] text-xl leading-tight font-medium">
                Don&apos;t see your specific requirement? We architect custom protocols for unique market challenges.
             </p>
          </div>
          <Link
            href="/contact"
            className="px-12 py-6 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
          >
            Start Strategy →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

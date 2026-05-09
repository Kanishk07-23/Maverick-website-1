'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { 
  TrendingUp, 
  Search, 
  Share2, 
  Zap, 
  Code, 
  User 
} from 'lucide-react';
import { GridBackground } from '@/components/ui/GridBackground';

const services = [
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    desc: 'Data-driven ad campaigns designed purely for massive ROI. We focus on actual revenue, not just clicks.',
    icon: <TrendingUp className="h-4 w-4 text-[var(--brand-purple)]" />,
    className: "md:col-span-2",
  },
  {
    id: 'seo-sem',
    title: 'SEO & SEM',
    desc: 'Dominate search results and capture high-intent traffic.',
    icon: <Search className="h-4 w-4 text-[var(--brand-blue)]" />,
    className: "md:col-span-1",
  },
  {
    id: 'social-media',
    title: 'Social Media',
    desc: 'Transform brand pages into magnetic community hubs with 15M+ organic views.',
    icon: <Share2 className="h-4 w-4 text-[var(--brand-violet)]" />,
    className: "md:col-span-1",
  },
  {
    id: 'branding-strategy',
    title: 'Brand Identity',
    desc: 'Distinct visual and narrative identities that command higher prices.',
    icon: <Zap className="h-4 w-4 text-[var(--brand-lavender)]" />,
    className: "md:col-span-2",
  },
  {
    id: 'web-dev',
    title: 'Web & App Dev',
    desc: 'Lightning-fast web experiences engineered specifically to sell.',
    icon: <Code className="h-4 w-4 text-[var(--brand-purple)]" />,
    className: "md:col-span-2",
  },
  {
    id: 'personal-branding',
    title: 'Personal Branding',
    desc: 'Scale your influence on LinkedIn and Twitter for B2B opportunities.',
    icon: <User className="h-4 w-4 text-[var(--brand-blue)]" />,
    className: "md:col-span-1",
  },
];

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-32 md:py-56 bg-transparent border-t border-[var(--border)] overflow-hidden" id="services">
      <GridBackground className="opacity-20" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={headerRef} className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-sm block mb-8">Operational Matrix</span>
            <h2
              className="font-outfit font-black text-[var(--foreground)] gradient-heading uppercase leading-[0.85] tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
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

        {/* Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto">
          {services.map((service, i) => (
            <Link key={service.id} href={`/services/${service.id}`} className={service.className}>
              <BentoGridItem
                title={service.title}
                description={service.desc}
                header={<div className="flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[var(--muted)] to-[var(--card)]/50 border border-[var(--border)] group-hover/bento:scale-[1.02] transition-transform duration-300" />}
                icon={service.icon}
                className="h-full"
              />
            </Link>
          ))}
        </BentoGrid>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 flex flex-col md:flex-row items-center justify-between gap-12"
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

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

const services = [
  {
    id: 'performance-marketing',
    title: 'PERFORMANCE',
    desc: 'Data-driven growth protocols designed for massive capital efficiency.',
    icon: <TrendingUp className="h-4 w-4 text-[var(--brand-purple)]" />,
    className: "md:col-span-2",
  },
  {
    id: 'seo-sem',
    title: 'ORGANIC',
    desc: 'Capture intent and dominate the search landscape.',
    icon: <Search className="h-4 w-4 text-[var(--brand-blue)]" />,
    className: "md:col-span-1",
  },
  {
    id: 'social-media',
    title: 'VIRAL',
    desc: '15M+ organic impressions. We build community hubs, not just pages.',
    icon: <Share2 className="h-4 w-4 text-[var(--brand-violet)]" />,
    className: "md:col-span-1",
  },
  {
    id: 'branding-strategy',
    title: 'IDENTITY',
    desc: 'Visual narratives that command premium market authority.',
    icon: <Zap className="h-4 w-4 text-[var(--brand-purple)]" />,
    className: "md:col-span-2",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-48 bg-transparent" id="services">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10" ref={containerRef}>
        
        {/* Header */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="label-sm tracking-[0.3em] uppercase opacity-40 mb-8 block">Services // Core Matrix</span>
            <h2 className="font-outfit font-black text-[var(--foreground)] uppercase leading-none tracking-tighter"
                style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}>
              THE GROWTH<br />
              <span className="text-[var(--brand-purple)]">ARCHITECTURE.</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-full">
          {services.map((service, i) => (
            <Link key={service.id} href={`/services/${service.id}`} className={service.className}>
              <BentoGridItem
                title={service.title}
                description={service.desc}
                header={
                  <div className="flex-1 w-full h-full min-h-[12rem] rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 group-hover/bento:border-[var(--brand-purple)]/30 transition-colors duration-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm">
                      {service.icon}
                    </div>
                  </div>
                }
                className="h-full bg-white/[0.02] backdrop-blur-md border-white/5"
              />
            </Link>
          ))}
        </BentoGrid>

        {/* Explore Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-end"
        >
          <Link href="/services" className="group flex items-center gap-4 label-sm tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">
            Explore All Capabilities
            <div className="w-12 h-px bg-[var(--foreground)] scale-x-50 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

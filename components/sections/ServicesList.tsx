'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  color: string;
  badge?: string;
}

export default function ServicesList({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {services.map((service, index) => (
        <ServiceAccordionItem
          key={service.id}
          service={service}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

function ServiceAccordionItem({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      id={`service-${service.id}`}
    >
      {/* Clickable header row */}
      <button
        onClick={onToggle}
        className="w-full text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div
          className="relative py-8 md:py-10 border-b flex items-center justify-between gap-6 transition-colors duration-300"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Hover fill */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 -mx-6 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${service.color}08 0%, ${service.color}04 50%, transparent 100%)`,
            }}
          />

          <div className="relative z-10 flex items-center gap-6 md:gap-10 flex-1 min-w-0">
            {/* Number */}
            <span
              className="text-sm font-mono font-medium flex-shrink-0 w-8 transition-colors duration-300"
              style={{ color: isOpen ? service.color : 'var(--muted-foreground)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Title + badge */}
            <div className="flex items-center gap-4 flex-wrap">
              <h2
                className="font-outfit font-bold text-foreground text-2xl md:text-3xl lg:text-4xl leading-tight group-hover:translate-x-1 transition-transform duration-300"
                style={{ letterSpacing: '-0.02em' }}
              >
                {service.title}
              </h2>
              {service.badge && (
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white flex-shrink-0"
                  style={{ background: service.color }}
                >
                  {service.badge}
                </span>
              )}
            </div>
          </div>

          {/* Tagline — desktop only */}
          <p className="hidden lg:block text-muted-foreground text-sm max-w-xs text-right flex-shrink-0 relative z-10">
            {service.tagline}
          </p>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0 relative z-10"
          >
            <ChevronDown size={22} className="text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="py-10 md:py-14 pl-14 md:pl-[72px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left: description + CTA */}
                <div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: service.color }}
                  >
                    View Full Service <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Right: features list */}
                <div>
                  <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-5 opacity-60">
                    What&apos;s Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, fi) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: fi * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}18` }}
                        >
                          <Check size={12} style={{ color: service.color }} strokeWidth={2.5} />
                        </div>
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
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
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} className="relative mt-20">
      {services.map((service, index) => {
        const targetScale = 1 - ((services.length - index) * 0.05);
        return (
          <StickyServiceCard
            key={service.id}
            service={service}
            index={index}
            progress={scrollYProgress}
            range={[index * (1 / services.length), (index + 1) * (1 / services.length)]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function StickyServiceCard({ 
  service, 
  index, 
  progress, 
  range, 
  targetScale 
}: { 
  service: Service; 
  index: number; 
  progress: any; 
  range: [number, number];
  targetScale: number;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen sticky top-0 flex items-center justify-center">
        <motion.div
        style={{ 
          scale,
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          top: `calc(-5% + ${index * 25}px)`,
          boxShadow: isDark 
            ? `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${service.color}15` 
            : `0 20px 50px rgba(0,0,0,0.1), 0 0 20px ${service.color}10`
        }}
        className="relative w-full h-[500px] md:h-[600px] rounded-[40px] border overflow-hidden p-8 md:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
      >
        {/* Background glow */}
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 blur-[100px] rounded-full pointer-events-none"
          style={{ backgroundColor: service.color }}
        />

        {/* Left: Content */}
        <div className="flex-1 z-10">
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="text-sm font-mono font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: `${service.color}15`, color: service.color }}
            >
              0{index + 1}
            </span>
            {service.badge && (
              <span 
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                style={{ background: service.color }}
              >
                {service.badge}
              </span>
            )}
          </div>

          <h2 className="font-outfit font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            {service.title}
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            {service.desc}
          </p>

          <Link
            href={`/services/${service.id}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white transition-all hover:scale-105"
            style={{ backgroundColor: service.color }}
          >
            Explore Service <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right: Features Grid */}
        <div className="flex-1 z-10 w-full lg:w-auto">
          <div className="bg-muted/30 rounded-3xl p-8 border border-border/40">
            <h3 className="text-foreground font-bold text-sm uppercase tracking-widest mb-8 opacity-60">
              Protocol Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.features.map((feature, fi) => (
                <div key={fi} className="flex items-start gap-4">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <Check size={14} style={{ color: service.color }} strokeWidth={3} />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

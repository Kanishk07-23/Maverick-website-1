'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const differentiators = [
  {
    id: 'performance',
    icon: '📊',
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results.',
    stat: '200%+', color: 'from-[var(--brand-purple)] to-blue-500'
  },
  {
    id: 'data',
    icon: '🧠',
    title: 'Data-Informed Creativity',
    desc: 'We blend creative storytelling with data insights to create campaigns that resonate and convert simultaneously.',
    stat: '15M+', color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'founder',
    icon: '🤝',
    title: 'Founder-Led Approach',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every step.',
    stat: '100%', color: 'from-violet-500 to-purple-500'
  },
  {
    id: 'e2e',
    icon: '⚡',
    title: 'End-to-End Capability',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team.',
    stat: '40+', color: 'from-[var(--brand-purple)] to-pink-500'
  },
];

export default function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative pb-32 pt-20 bg-[var(--background)]" id="why-us" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-20">
        
        {/* Left fixed tracking text */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-40">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 text-muted-foreground mb-6">
              Why Maverick
            </span>
            <h2 className="font-outfit font-bold text-foreground mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Why We Are <br/>
              <span className="gradient-text">Different.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We&apos;re not a standard agency. We are a high-output growth team based in Mumbai. No vanity metrics, just pure bottom-line impact.
            </p>
          </div>
        </div>

        {/* Right stacking cards */}
        <div className="lg:w-2/3 flex flex-col gap-8 relative mt-10 lg:mt-0">
          {differentiators.map((d, i) => {
            // Calculate a slight top margin for each card so they stack visibly
            const stickyTop = `calc(8rem + ${i * 40}px)`;
            
            return (
              <div 
                key={d.id} 
                className="sticky shadow-2xl glass-card rounded-3xl p-10 border border-border/50 flex flex-col md:flex-row gap-8 items-center origin-top transition-all duration-500"
                style={{ top: stickyTop, zIndex: i }}
              >
                {/* Big Stat Background / Side */}
                <div className={`flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br ${d.color} flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden`}>
                  <div className="text-5xl md:text-6xl mb-2">{d.icon}</div>
                  <div className="text-3xl font-black font-outfit">{d.stat}</div>
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">{d.title}</h3>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    id: 'brands',
    num: 40,
    suffix: '+',
    label: 'Brands Scaled',
    desc: 'Across India, UAE, USA, & UK',
    icon: '🚀',
  },
  {
    id: 'views',
    num: 15,
    suffix: 'M+',
    label: 'Organic Views',
    desc: 'Through SEO & social media management',
    icon: '👁️',
  },
  {
    id: 'roi',
    num: 200,
    suffix: '%+',
    label: 'Average ROI',
    desc: 'From performance marketing campaigns',
    icon: '📈',
  },
  {
    id: 'years',
    num: 5,
    suffix: '+',
    label: 'Years Experience',
    desc: 'As a digital marketing company',
    icon: '⚡',
  },
];

function CounterCard({ num, suffix, label, desc, icon, id }: typeof stats[0]) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div
      ref={ref}
      className="group gradient-border glass-card rounded-2xl p-8 hover:bg-muted transition-all duration-500 hover:scale-105 hover:-translate-y-1"
      id={`stat-${id}`}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <div className="font-outfit font-bold text-foreground mb-2"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
        {count}
        <span className="gradient-text">{suffix}</span>
      </div>
      <div className="text-foreground font-semibold text-lg mb-1">{label}</div>
      <div className="text-muted-foreground text-sm">{desc}</div>
    </div>
  );
}

export default function ResultsSection() {
  return (
    <section className="section-padding relative overflow-hidden" id="results">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 shadow-sm mb-4">
            Proven Impact
          </span>
          <h2 className="font-outfit font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
            Proven Digital{' '}
            <span className="gradient-text">Marketing Results</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-medium">
            Real results delivered for growth-focused businesses across industries and borders.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <CounterCard key={s.id} {...s} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 glass-card rounded-2xl p-6 border border-border flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-brand)' }}>
              <span className="text-foreground text-lg">🌍</span>
            </div>
            <div>
              <div className="text-foreground font-semibold text-sm">Global Reach</div>
              <div className="text-muted-foreground text-xs">India · UAE · USA · UK · Australia</div>
            </div>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-brand)' }}>
              <span className="text-foreground text-lg">🏆</span>
            </div>
            <div>
              <div className="text-foreground font-semibold text-sm">Founder-Led</div>
              <div className="text-muted-foreground text-xs">Direct involvement in every project</div>
            </div>
          </div>
          <div className="w-px h-12 bg-border hidden md:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-brand)' }}>
              <span className="text-foreground text-lg">📊</span>
            </div>
            <div>
              <div className="text-foreground font-semibold text-sm">Data-Informed</div>
              <div className="text-muted-foreground text-xs">Creativity backed by analytics</div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="/contact" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'var(--gradient-brand)' }}>
              Get Your Free Audit →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

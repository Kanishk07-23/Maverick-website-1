'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

const words = ['Strategy.', 'Data.', 'Results.'];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          '[data-hero-animate]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
        );
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient"
      id="home"
      aria-label="Digital Marketing Agency Hero"
    >
      {/* WebGL Background */}
      <HeroCanvas />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(10,10,20,0.85) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div data-hero-animate className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Mumbai-Based Digital Marketing Agency</span>
          </div>

          <h1 data-hero-animate className="font-grotesk font-bold text-white leading-[1.05] mb-6 flex flex-col md:block"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
            Digital Marketing<br className="hidden md:block" />
            Agency in{' '}
            <span className="inline-grid [grid-template-areas:'stack'] relative" style={{ minWidth: '220px' }}>
              {words.map((word, i) => {
                const isActive = i === wordIdx;
                return (
                  <span
                    key={word}
                    className="gradient-text [grid-area:stack] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.95)',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          </h1>

          {/* Sub */}
          <p data-hero-animate className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            We are a premier digital marketing company in India, helping ambitious brands scale through SEO, performance marketing, social media, and web development. Blending creativity and data to drive measurable ROI.
          </p>

          {/* CTAs */}
          <div data-hero-animate className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-base glow-purple btn-magnetic"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Start Your Growth Journey
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="/services"
              id="hero-cta-secondary"
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white/80 text-base glass-card border border-white/10 overflow-hidden btn-magnetic"
              style={{ transition: 'color 0.25s ease' }}
            >
              {/* Hover fill effect */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.10) 100%)',
                  transition: 'opacity 0.3s ease',
                }}
              />
              <span className="relative group-hover:text-white transition-colors duration-250">View Our Services</span>
              <ArrowRight
                size={16}
                className="relative opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
              />
            </Link>
          </div>

          {/* Stats Row */}
          <div data-hero-animate className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/8">
            {[
              { num: '40+', label: 'Brands Scaled Globally' },
              { num: '15M+', label: 'Organic Search Views' },
              { num: '200%+', label: 'Average Marketing ROI' },
              { num: '5+', label: 'Countries Served' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-grotesk font-bold text-3xl md:text-4xl gradient-text">{s.num}</span>
                <span className="text-white/50 text-sm mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/50 animate-bounce" />
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden mesh-gradient pb-20"
      id="home"
    >
      <HeroCanvas />

      {/* Radical Typography Masking Layer (A 'Billion Dollar' UX Trick) */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-[var(--background)]"
        style={{
          WebkitMaskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
        }}
      >
        <h1 className="font-outfit font-black text-center mix-blend-difference"
            style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', lineHeight: 0.85, letterSpacing: '-0.04em', color: 'var(--brand-purple)' }}>
          WE SCALE<br />
          <span className="text-white">BRANDS.</span>
        </h1>
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-10 border border-border/40 shadow-sm backdrop-blur-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-purple)] animate-pulse" />
            <span className="text-sm font-semibold tracking-widest uppercase">Mumbai-Based Growth Partners</span>
          </div>

          <h1 className="font-outfit font-bold text-foreground leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}>
            Attention Into <br />
            <span className="gradient-text">Revenue.</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
            We are a high-end digital marketing company helping bold founders scale through elite SEO, performance marketing, and branding.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton href="/contact">
              <span className="flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-white text-lg shadow-[var(--premium-shadow)]"
                    style={{ background: 'var(--gradient-brand)' }}>
                Start Your Journey
                <ArrowRight size={20} />
              </span>
            </MagneticButton>

            <MagneticButton href="/services">
              <span className="flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-foreground text-lg glass-card border border-border hover:bg-muted transition-colors">
                View Protocol
                <ArrowRight size={20} />
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <span className="text-foreground text-xs tracking-[0.3em] font-medium uppercase">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent" />
      </motion.div>
    </section>
  );
}

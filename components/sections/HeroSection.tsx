'use client';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

// Removed HeroCanvas as we use Global3DBackground

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch/coarse pointer — disable mouse-driven parallax on touch devices
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Scroll parallax — disabled on touch for performance
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', isTouch ? '20%' : '60%']);

  // Mouse spring — only active on pointer devices
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const mouseX = useSpring(mouseXRaw, springConfig);
  const mouseY = useSpring(mouseYRaw, springConfig);

  useEffect(() => {
    if (isTouch) return; // Skip on touch devices — no mouse
    let rafPending = false;
    let latestX = 0;
    let latestY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      latestX = (e.clientX / innerWidth) * 2 - 1;
      latestY = (e.clientY / innerHeight) * 2 - 1;

      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          mouseXRaw.set(latestX);
          mouseYRaw.set(latestY);
          rafPending = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch, mouseXRaw, mouseYRaw]);

  // 3D transforms — zero on touch to save GPU
  const rotateX = useTransform(mouseY, [-1, 1], isTouch ? [0, 0] : [10, -10]);
  const rotateY = useTransform(mouseX, [-1, 1], isTouch ? [0, 0] : [-10, 10]);
  const layer1X = useTransform(mouseX, [-1, 1], isTouch ? [0, 0] : [-20, 20]);
  const layer1Y = useTransform(mouseY, [-1, 1], isTouch ? [0, 0] : [-20, 20]);
  const layer2X = useTransform(mouseX, [-1, 1], isTouch ? [0, 0] : [30, -30]);
  const layer2Y = useTransform(mouseY, [-1, 1], isTouch ? [0, 0] : [30, -30]);
  const layer1XInv = useTransform(layer1X, v => -v);
  const layer1YInv = useTransform(layer1Y, v => -v);

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    }
  };

  const wordVars: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 15, stiffness: 100 }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-safe-screen w-full flex items-center justify-center overflow-hidden mesh-gradient pb-20"
      id="home"
      style={{ perspective: isTouch ? 'none' : '1000px' }}
    >

      {/* Reactive Ambient Glow — reduced on mobile */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          x: layer2X,
          y: layer2Y,
          background: 'radial-gradient(circle 600px at center, var(--brand-purple) 0%, transparent 60%)'
        }}
      />

      <motion.div
        style={{ y: textY, rotateX, rotateY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-8 sm:mb-10 border border-border/40 shadow-sm">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--brand-purple)] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">Mumbai-Based Growth Partners</span>
          </div>
        </motion.div>

        {/* Headline — reduced rotateX on mobile for perf */}
        <motion.h1
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="font-outfit font-black text-foreground leading-[0.95] mb-6 sm:mb-8 uppercase flex flex-col items-center overflow-visible"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}
        >
          <motion.div className="flex overflow-hidden" style={{ x: layer1X, y: layer1Y }}>
            {['W', 'e', '\u00A0', 'S', 'c', 'a', 'l', 'e'].map((l, i) => (
              <motion.span key={i} variants={wordVars} className="inline-block origin-bottom">{l}</motion.span>
            ))}
          </motion.div>

          <motion.div className="flex overflow-hidden relative" style={{ x: layer1XInv, y: layer1YInv }}>
            <span className="absolute inset-0 bg-[var(--brand-purple)] blur-3xl opacity-30 pointer-events-none mix-blend-screen" />
            {['B', 'r', 'a', 'n', 'd', 's', '.'].map((l, i) => (
              <motion.span key={i} variants={wordVars} className="inline-block origin-bottom gradient-text z-10 relative">{l}</motion.span>
            ))}
          </motion.div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-muted-foreground text-base sm:text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 font-medium px-2"
        >
          We combine data-driven architecture with aggressive creative execution to violently scale your revenue.
        </motion.p>

        {/* CTAs — stack vertically on very small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col xs:flex-row flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-lg mx-auto"
        >
          <MagneticButton href="/contact">
            <span
              className="flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-semibold text-white text-base sm:text-lg w-full justify-center"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Start Your Journey
              <ArrowRight size={18} />
            </span>
          </MagneticButton>

          <MagneticButton href="/services">
            <span className="flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-5 rounded-full font-semibold text-foreground text-base sm:text-lg glass-card border border-border w-full justify-center">
              View Protocol
              <ArrowRight size={18} />
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — hidden on very short screens */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 sm:gap-3 hidden sm:flex"
        aria-hidden="true"
      >
        <span className="text-foreground text-xs tracking-[0.3em] font-medium uppercase">Explore Depth</span>
        <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-[var(--brand-purple)] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

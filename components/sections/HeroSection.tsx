'use client';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Native Scroll Tracking for Parallax Backgrounds
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Spring-smoothed mouse tracking for deep kinetic UI
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse between -1 and 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform normalized mouse into rotation and translation values for 3D depth
  const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);
  
  const layer1X = useTransform(mouseX, [-1, 1], [-20, 20]);
  const layer1Y = useTransform(mouseY, [-1, 1], [-20, 20]);

  const layer2X = useTransform(mouseX, [-1, 1], [30, -30]);
  const layer2Y = useTransform(mouseY, [-1, 1], [30, -30]);

  // Kinetic Text Entrance variables
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const wordVars: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90, filter: 'blur(10px)' },
    show: { 
      opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 15, stiffness: 100 }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden mesh-gradient pb-20"
      id="home"
      style={{ perspective: '1000px' }}
    >
      <HeroCanvas />

      {/* Reactive Ambient Glow Repelling Mouse */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          x: layer2X, 
          y: layer2Y,
          background: 'radial-gradient(circle 600px at center, var(--brand-purple) 0%, transparent 60%)'
        }}
      />

      <motion.div 
        style={{ y: textY, opacity, rotateX, rotateY }} 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 flex flex-col items-center text-center transform-style-3d"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-10 border border-border/40 shadow-sm backdrop-blur-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-purple)] animate-pulse" />
            <span className="text-sm font-semibold tracking-widest uppercase">Mumbai-Based Growth Partners</span>
          </div>
        </motion.div>

        {/* Kinetic Shatter Headline */}
        <motion.h1 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="font-outfit font-black text-foreground leading-[0.95] mb-8 uppercase flex flex-col items-center overflow-visible"
          style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}
        >
          <motion.div className="flex overflow-hidden" style={{ x: layer1X, y: layer1Y }}>
            {['W', 'e', '\u00A0', 'S', 'c', 'a', 'l', 'e'].map((l, i) => (
              <motion.span key={i} variants={wordVars} className="inline-block origin-bottom">{l}</motion.span>
            ))}
          </motion.div>
          
          <motion.div className="flex overflow-hidden relative" style={{ x: useTransform(layer1X, v => -v), y: useTransform(layer1Y, v => -v) }}>
            {/* The brand-colored block beneath */}
            <span className="absolute inset-0 bg-[var(--brand-purple)] blur-3xl opacity-30 pointer-events-none mix-blend-screen" />
            {['B', 'r', 'a', 'n', 'd', 's', '.'].map((l, i) => (
              <motion.span key={i} variants={wordVars} className="inline-block origin-bottom gradient-text z-10 relative">{l}</motion.span>
            ))}
          </motion.div>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-muted-foreground text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
          We combine data-driven architecture with aggressive creative execution to violently scale your revenue.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6">
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <span className="text-foreground text-xs tracking-[0.3em] font-medium uppercase">Explore Depth</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--brand-purple)] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

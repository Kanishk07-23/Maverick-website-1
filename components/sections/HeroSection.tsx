'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import { ShinyText } from '@/components/ui/ShinyText';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const wordVars: Variants = {
    hidden: { y: '110%', opacity: 0 },
    show: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.1 * i,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const line1 = ['We', 'Scale'];
  const line2 = ['Brands.'];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent"
      id="home"
    >
      <GridBackground className="opacity-40" />
      
      {/* Structural Borders & Creative Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-[var(--border)] opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--border)]" />
      
      {/* Brand Spine */}
      <div className="absolute top-0 left-[2.5vw] w-px h-full bg-gradient-to-b from-transparent via-[var(--brand-purple)] to-transparent opacity-20 hidden md:block" />
      <div className="absolute top-1/2 left-[2.5vw] -translate-y-1/2 w-3 h-3 bg-[var(--brand-purple)] rounded-full blur-[2px] luminous-glow hidden md:block" />
      
      {/* Top Meta */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-32 md:pt-40">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="label-sm px-3 py-1 border border-[var(--border)] rounded-full bg-[var(--card)]/50 backdrop-blur-sm"
        >
          <ShinyText>[ Status: Strategic Growth Partners ]</ShinyText>
        </motion.span>
        <motion.span
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="label-sm hidden md:block opacity-50"
        >
          Based in Mumbai {'//'} Operating Globally
        </motion.span>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-6 md:px-10 flex-1 flex flex-col justify-center"
      >
        <motion.h1
          initial="hidden"
          animate="show"
          className="font-outfit font-black text-[var(--foreground)] gradient-heading uppercase select-none tracking-tighter"
          style={{ fontSize: 'clamp(2.5rem, 13vw, 16rem)', lineHeight: 0.85 }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-x-[0.2em]">
              {line1.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVars}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-x-[0.2em]">
              {line2.map((word, i) => (
                <motion.span
                  key={i}
                  custom={line1.length + i}
                  variants={wordVars}
                  className="inline-block brutalist-highlight"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.h1>

        <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-start gap-12 md:gap-24 border-t border-[var(--border)] pt-12">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[var(--muted-foreground)] text-xl md:text-2xl max-w-xl leading-tight font-medium"
          >
            Aggressive creative execution meet technical data architecture. We build unbreakable revenue engines for brands that refuse to be ignored.
          </motion.p>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] text-sm md:text-base font-black uppercase tracking-[0.15em] hover:scale-105 transition-transform btn-magnetic"
            >
              Initiate Discovery <ArrowRight size={18} className="inline" />
            </Link>
            <Link
              href="/services"
              className="label-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              View Prototypes <span className="text-xs">↘</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Meta */}
      <div className="relative z-10 px-6 md:px-10 pb-12 flex items-end justify-between">
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-4"
        >
          <div className="w-px h-16 bg-[var(--border)] relative overflow-hidden">
             <motion.div 
              animate={{ y: ['-100%', '100%'] }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-full bg-[var(--foreground)]"
             />
          </div>
          <span className="label-sm uppercase tracking-[0.2em] opacity-50">Protocol</span>
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-right hidden md:block border-l border-[var(--border)] pl-10"
        >
          <div className="font-outfit font-black text-[var(--foreground)] text-5xl tracking-tighter leading-none">
            40+
          </div>
          <div className="label-sm mt-2 opacity-50 uppercase">Network Partners</div>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="square" 
      strokeLinejoin="miter" 
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

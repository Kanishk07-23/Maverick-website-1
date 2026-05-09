'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import { ShinyText } from '@/components/ui/ShinyText';
import { Magnetic } from '@/components/ui/Magnetic';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        delay: 0.2 + i * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      },
    }),
  };

  const titleWords = ['MAVERICK', 'DIGITALS'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent pt-32 pb-20 px-6"
      id="home"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-[1400px] flex flex-col items-center"
      >
        {/* Status Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <div className="px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-md flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--brand-purple)] animate-pulse shadow-[0_0_10px_var(--brand-purple)]" />
            <span className="label-sm tracking-[0.2em] uppercase opacity-80">
              <ShinyText>Operational Protocol 2025</ShinyText>
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <div className="text-center mb-16">
          <motion.h1
            initial="hidden"
            animate="show"
            className="font-outfit font-black text-[var(--foreground)] uppercase tracking-[-0.05em] leading-[0.8]"
            style={{ fontSize: 'clamp(4rem, 15vw, 18rem)' }}
          >
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-hidden py-4">
                <motion.span
                  custom={i + 1}
                  variants={fadeUp}
                  className="block"
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.h1>
          
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 text-xl md:text-2xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed font-light px-4"
          >
            We don&apos;t just run ads. We architect digital dominance through high-frequency performance marketing and technical storytelling.
          </motion.p>
        </div>

        {/* CTA Section */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          <Magnetic strength={0.4}>
            <Link
              href="/contact"
              className="group relative px-12 py-6 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-[var(--brand-purple)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Initiate Project →
              </span>
            </Link>
          </Magnetic>

          <div className="flex items-center gap-8 opacity-40">
            {['Strategy', 'Performance', 'Scale'].map((text, i) => (
              <span key={i} className="label-sm uppercase tracking-widest text-[10px]">
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-[var(--brand-purple)] to-transparent opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-[var(--brand-cyan)] to-transparent opacity-50" />
    </section>
  );
}

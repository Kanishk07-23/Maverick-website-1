'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { Canvas } from '@react-three/fiber';
import GlobeComponent from '@/components/three/GlobeComponent';

const stats = [
  {
    id: 'brands',
    num: 40,
    suffix: '+',
    label: 'Brands Scaled',
    desc: 'Across India, UAE, USA, & UK',
    position: 'top-10 left-4 md:top-20 md:left-10',
    delay: 0.1,
  },
  {
    id: 'views',
    num: 15,
    suffix: 'M+',
    label: 'Organic Views',
    desc: 'Through SEO & social media',
    position: 'bottom-10 left-4 md:bottom-20 md:left-20',
    delay: 0.3,
  },
  {
    id: 'roi',
    num: 200,
    suffix: '%+',
    label: 'Average ROI',
    desc: 'From performance campaigns',
    position: 'top-32 right-4 md:top-20 md:right-10',
    delay: 0.5,
  },
  {
    id: 'years',
    num: 5,
    suffix: '+',
    label: 'Years Experience',
    desc: 'As a digital marketing firm',
    position: 'bottom-32 right-4 md:bottom-20 md:right-20',
    delay: 0.7,
  },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });

    return controls.stop;
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      <span className="text-[var(--brand-purple)]">{suffix}</span>
    </span>
  );
}

export default function ResultsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative w-full h-[120vh] min-h-[800px] overflow-hidden bg-[var(--background)] flex items-center justify-center" id="results">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none">
         <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <GlobeComponent />
         </Canvas>
      </div>

      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full h-full pt-32 pb-20 px-6 flex flex-col justify-between">

        {/* Central Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="bg-[var(--background)]/80 backdrop-blur-3xl px-8 py-6 rounded-[3rem] border border-border/20 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(109,40,217,0.15)] inline-flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-foreground bg-[var(--brand-purple)] mb-4">
              Proven Impact
            </span>
            <h2 className="font-outfit font-black text-foreground" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em' }}>
              Global Scale.<br />
              <span className="gradient-text">Absolute Precision.</span>
            </h2>
          </div>
        </motion.div>

        {/* Floating Stat Nodes */}
        <div className="relative w-full h-full max-w-6xl mx-auto inset-0 font-outfit">
           {stats.map((stat, i) => (
             <motion.div
               key={stat.id}
               initial={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
               whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               viewport={{ once: true, margin: '-50px' }}
               transition={{ duration: 0.8, delay: stat.delay, ease: [0.34, 1.56, 0.64, 1] }}
               className={`absolute ${stat.position} glass-card border border-border/30 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-xl w-64 md:w-72`}
             >
                <div className="font-black text-foreground leading-none mb-2" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                  <AnimatedNumber target={stat.num} suffix={stat.suffix} />
                </div>
                <div className="font-bold text-base md:text-lg text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}

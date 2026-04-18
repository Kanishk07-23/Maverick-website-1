'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from '@/components/MagneticButton';
import { ArrowRight } from 'lucide-react';

const content = [
  {
    id: 'performance',
    title: 'Performance Marketing',
    description:
      'Data-driven ad campaigns on Meta & Google designed purely for massive ROI. We build scalable models that directly impact your bottom line. Impressions and clicks are vanity metrics; we care about revenue.',
    image: '/assets/service_performance.png',
  },
  {
    id: 'web',
    title: 'High-Conversion Web Architecture',
    description:
      'Beautiful websites are useless if they don\'t convert. Using the latest WebGL and React frameworks, we engineer lightning-fast digital experiences that act as your most ruthless, 24/7 salesperson.',
    image: '/assets/service_web.png',
  },
  {
    id: 'brand',
    title: 'Elite Brand Strategy',
    description:
      'Your brand is the premium you can charge over your competitors. We craft distinct visual and narrative identities, transforming commodities into luxury entities that command higher prices in the marketplace.',
    image: '/assets/service_brand.png',
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cardsLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardsLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <section className="bg-[var(--background)] py-0 relative w-full" id="services">
      {/* Container providing the scroll height. Since there are 3 items, making it 300vh allows enough scrolling space. */}
      <div className="relative h-[300vh]" ref={containerRef}>
        
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          
          <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 h-full py-20 lg:py-0 items-center">
            
            {/* Left Content Column */}
            <div className="relative flex flex-col justify-center h-full">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6"
                >
                  Core Operations
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-outfit font-black text-foreground leading-none mb-10 lg:mb-20"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
                >
                  We Engineer<br />
                  <span className="gradient-text">Growth.</span>
                </motion.h2>
              </div>

              {content.map((item, index) => (
                <div key={item.title} className="relative mt-20 lg:mt-32 pb-32">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                      scale: activeCard === index ? 1 : 0.95,
                      filter: activeCard === index ? 'blur(0px)' : 'blur(2px)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold font-outfit text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-md">
                      {item.description}
                    </p>
                    
                    <div className="mt-8">
                       <MagneticButton href={`/services`}>
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[var(--brand-purple)] transition-colors duration-300">
                          Explore Protocol <ArrowRight size={16} />
                        </div>
                      </MagneticButton>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Right Visual Column */}
            <div className="hidden lg:block relative h-[60vh] w-full rounded-[2rem] overflow-hidden glass-card border border-border/40" style={{ boxShadow: 'var(--glass-shadow)' }}>
              {content.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    scale: activeCard === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover"
                     priority={index === 0}
                   />
                   {/* Gradient Overlay for blending */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-40 mix-blend-overlay"></div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
      
      {/* Mobile Visual Cards (Visible only on small screens below the text) */}
      <div className="lg:hidden px-6 pb-32 space-y-10">
         {content.map((item, index) => (
             <div key={item.id} className="relative h-[400px] w-full rounded-[2rem] overflow-hidden glass-card border border-border/40 shadow-lg">
                <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover"
                   />
             </div>
         ))}
      </div>
    </section>
  );
}

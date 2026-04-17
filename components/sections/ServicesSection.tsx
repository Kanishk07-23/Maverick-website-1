'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Presentation, Search, LineChart, Cpu } from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';

const services = [
  {
    id: 'perf',title: 'Performance Marketing',icon: <TrendingUp size={32} />,
    desc: 'Data-driven ad campaigns on Meta & Google designed purely for massive ROI. We do not care about clicks, we care about actual revenue.',
    href: '/services/performance-marketing', color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'seo', title: 'SEO & SEM', icon: <Search size={32} />,
    desc: 'Dominate search engines. We reconstruct your digital architecture so high-intent customers find you exactly when they are ready to buy.',
    href: '/services/seo-sem', color: 'from-purple-500 to-violet-500'
  },
  {
    id: 'social', title: 'Social Media Dynamics', icon: <Sparkles size={32} />,
    desc: 'We transform boring brand pages into magnetic community hubs. 15M+ organic views generated for our clients so far.',
    href: '/services/social-media', color: 'from-fuchsia-500 to-pink-500'
  },
  {
    id: 'brand', title: 'Elite Branding', icon: <Presentation size={32} />,
    desc: 'Your brand is not just a logo. We craft distinct visual and narrative identities that command higher prices in the marketplace.',
    href: '/services/branding-strategy', color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'web', title: 'High-Conversion Web Dev', icon: <Cpu size={32} />,
    desc: 'Beautiful websites are useless if they don’t convert. We build lightning-fast web experiences engineered specifically to sell.',
    href: '/services/web-dev', color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'personal', title: 'Founder Branding', icon: <LineChart size={32} />,
    desc: 'People buy from people. We scale your personal brand on LinkedIn and Twitter to open high-level B2B opportunities.',
    href: '/services/personal-branding', color: 'from-rose-500 to-red-500'
  }
];

export default function ServicesSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this massive container
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Map the vertical scroll progress into a horizontal translation.
  // Move elements across the viewport. -90% so the last card becomes fully visible.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[var(--background)]" id="services">
      {/* Sticky container that stays on screen while scrolling vertically */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[120px] opacity-20 pointer-events-none"
             style={{ background: 'radial-gradient(circle, var(--brand-purple) 0%, transparent 70%)' }} />

        {/* Header - Fixed to left side */}
        <div className="w-full px-6 md:px-20 mb-12 relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-4">
              Our Protocol
            </span>
            <h2 className="font-outfit font-bold text-foreground leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
              We Engineer<br/>
              <span className="gradient-text">Growth.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-sm font-medium">
            Scroll horizontally to explore the precise mechanisms we use to scale brands.
          </p>
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-20 relative z-20 pb-10">
          {services.map((service) => (
            <div key={service.id} 
                 className="relative w-[85vw] md:w-[450px] h-[500px] flex-shrink-0 glass-card rounded-[2.5rem] border border-border/50 p-10 flex flex-col justify-between group overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[var(--card-shadow-hover)]">
              
              {/* Card Background Gradient effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              {/* Top half */}
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold font-outfit text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Bottom CTAs */}
              <div className="relative z-10 pt-8 border-t border-border/50 mt-auto flex items-center justify-between">
                <MagneticButton href={service.href}>
                  <div className="flex items-center gap-3 text-foreground font-semibold group-hover:text-[var(--brand-purple)] transition-colors">
                    Explore Protocol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </MagneticButton>
              </div>
            </div>
          ))}

          {/* Final CTA Card inside the track */}
          <div className="relative w-[85vw] md:w-[450px] h-[500px] flex-shrink-0 rounded-[2.5rem] bg-[var(--foreground)] p-10 flex flex-col justify-center items-center text-center">
             <h3 className="text-4xl font-bold font-outfit text-background mb-4">Don&apos;t see what you need?</h3>
             <p className="text-muted/60 text-lg mb-10">We build custom strategic protocols for unique brands.</p>
             <MagneticButton href="/contact">
               <span className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-lg bg-[var(--brand-purple)]" style={{ background: 'var(--gradient-brand)' }}>
                  Let&apos;s Build
                  <ArrowRight size={20} />
               </span>
             </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const founders = [
  {
    id: 'muskan',
    name: 'Muskan Rathod',
    role: 'Brand Architecture',
    color: '#8b5cf6', // purple
    img: '/images/founders/founder-muskan.jpg',
    philosophy: 'Deciphering consumer psychology through narrative. Engineering identities that stick in the subconscious.',
    specs: [
      ['Focus', 'Narrative Integrity'],
      ['Output', 'Market Dominance'],
      ['Logic', 'Human Psychology']
    ]
  },
  {
    id: 'dhaval',
    name: 'Dhaval Shah',
    role: 'Systems Engineering',
    color: '#3b82f6', // blue
    img: '/images/founders/founder-dhaval.jpg',
    philosophy: 'Building unbreakable structures that convert attention into measurable velocity and scaling systems.',
    specs: [
      ['Focus', 'Technical Precision'],
      ['Output', 'Growth Velocity'],
      ['Logic', 'Algorithmic Scale']
    ]
  },
];

export default function TeamPage() {
  const [hoveredLeader, setHoveredLeader] = useState<string | null>(null);

  return (
    <div className="bg-[var(--background)] min-h-screen relative flex items-center justify-center overflow-hidden font-outfit selection:bg-foreground selection:text-background">
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Dynamic Backgrounds */}
      <AnimatePresence>
        {hoveredLeader === 'muskan' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[120px]" />
          </motion.div>
        )}
        {hoveredLeader === 'dhaval' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[90rem] mx-auto px-6 py-32 md:py-0 relative z-10">
        
        {/* Minimalist Manifesto Header */}
        <div className="flex justify-between items-end mb-24 md:mb-32">
          <div className="max-w-md">
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-muted-foreground mb-4 block">
              [ Internal Structure ]
            </span>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-light">
              Maverick is the convergence of psychological brand architecture and unbreakable technical systems. We eliminated the layers. You don&apos;t talk to account managers; you talk directly to the architects building your future.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-muted-foreground block">
              Status
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Direct Access
            </span>
          </div>
        </div>

        {/* The Blueprint Layout */}
        <div className="grid md:grid-cols-2 border-t border-border/50 relative">
          
          {/* Vertical Separator */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border/50 -translate-x-1/2" />

          {founders.map((founder, index) => (
            <div 
              key={founder.id}
              className={`relative py-16 md:py-24 group transition-all duration-700 ${index === 0 ? 'md:pr-24 border-b md:border-b-0 border-border/50' : 'md:pl-24'}`}
              onMouseEnter={() => setHoveredLeader(founder.id)}
              onMouseLeave={() => setHoveredLeader(null)}
            >
              {/* Image Reveal (The Whisper) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div 
                  className={`w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-1000 ease-out flex items-center justify-center`}
                >
                  {/* We use a highly masked, subtle image */}
                  <div className="w-[60%] md:w-[70%] aspect-square rounded-full blur-2xl relative">
                    <img 
                      src={founder.img} 
                      alt="" 
                      className="w-full h-full object-cover mix-blend-luminosity grayscale"
                    />
                  </div>
                </motion.div>
                
                {/* Clean Image Mask on Hover */}
                 <div className={`absolute top-1/2 -translate-y-1/2 ${index === 0 ? 'right-0 md:right-32 translate-x-1/2' : 'left-0 md:left-32 -translate-x-1/2'} w-32 md:w-64 aspect-[3/4] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-[0.16,1,0.3,1] overflow-hidden  z-[1]`}>
                    <img src={founder.img} alt={founder.name} className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                 </div>
              </div>

              {/* Content Foreground */}
              <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-2">
                <div className="pb-8 mb-8 border-b border-border/20 flex items-center justify-between">
                  <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground transition-colors duration-500 group-hover:text-foreground">
                    {founder.name}
                  </h2>
                  <ArrowUpRight size={24} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: founder.color }} />
                </div>
                
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-medium text-muted-foreground mb-8 block transition-colors duration-500" style={{ color: hoveredLeader === founder.id ? founder.color : ''}}>
                  {founder.role}
                </h3>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light mb-12 max-w-sm">
                  {founder.philosophy}
                </p>

                {/* Spec Sheet Style Info */}
                <div className="space-y-4">
                  {founder.specs.map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center text-xs border-b border-border/10 pb-2">
                      <span className="uppercase tracking-widest text-muted-foreground/60">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
        
        {/* Bottom CTA */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-border/50 flex justify-between items-center text-xs uppercase tracking-widest font-medium">
          <span className="text-muted-foreground">The Unit</span>
          <Link href="/contact" className="hover:text-purple-500 transition-colors flex items-center gap-2 group">
            Initiate Contact
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}

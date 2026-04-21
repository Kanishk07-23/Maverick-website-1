'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Mail, ArrowRight, Zap, Target, Brain, Code, Terminal, Palette, PenTool } from 'lucide-react';
import Link from 'next/link';

const founders = [
  {
    id: 'muskan',
    name: 'Muskan Rathod',
    role: 'The Brand Architect',
    bio: 'Deciphering consumer psychology through narrative. Muskan engineers brand identities that don\'t just look good—they stick in the subconscious.',
    specialties: ['Strategy', 'Storytelling', 'Psychology', 'Branding'],
    stats: [
      { label: 'Creative Depth', value: 98, icon: <Palette size={14} /> },
      { label: 'Growth Velocity', value: 92, icon: <Zap size={14} /> },
      { label: 'Narrative ROI', value: 95, icon: <PenTool size={14} /> },
    ],
    avatar: 'M',
    color: '#8b5cf6', // purple
    img: '/images/founders/founder-muskan.jpg',
  },
  {
    id: 'dhaval',
    name: 'Dhaval Shah',
    role: 'The Tech Alchemist',
    bio: 'Building the unbreakable systems that turn attention into conversion. Dhaval bridges the gap between high-level performance marketing and deep code.',
    specialties: ['Performance', 'Systems', 'Node.js', 'Scaling'],
    stats: [
      { label: 'Technical SEO', value: 99, icon: <Terminal size={14} /> },
      { label: 'System Logic', value: 96, icon: <Code size={14} /> },
      { label: 'Data Mining', value: 94, icon: <Brain size={14} /> },
    ],
    avatar: 'D',
    color: '#3b82f6', // blue
    img: '/images/founders/founder-dhaval.jpg',
  },
];

export default function TeamPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="bg-[var(--background)] min-h-screen pt-20">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Header */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="font-mono text-sm tracking-[0.4em] text-purple-500 uppercase mb-6 block">
              [ Leadership Unit ]
            </span>
            <h1 className="font-outfit font-black text-foreground leading-[1] uppercase mb-8"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
              The Minds Behind<br />
              <span className="gradient-text italic">The Machine.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
              We don&apos;t hire account managers. You work directly with the founders who have skin in the game and code in their blood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Split-View: Bespoke Interactive Layout */}
      <section className="h-auto md:h-[90vh] min-h-[700px] w-full flex flex-col md:flex-row border-y border-border overflow-hidden">
        {founders.map((f, i) => (
          <motion.div
            key={f.id}
            onMouseEnter={() => setHoveredId(f.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="flex-1 relative group cursor-default overflow-hidden border-b md:border-b-0 md:border-r last:border-r-0 border-border transition-[flex] duration-700 ease-out"
            style={{ 
              flex: hoveredId === f.id ? 1.6 : hoveredId === null ? 1 : 0.6 
            }}
          >
            {/* Background Image / Placeholder with subtle zoom */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-neutral-900/60 z-10 transition-opacity group-hover:opacity-40" />
               <div  className="w-full h-full bg-muted flex items-center justify-center text-[20vw] font-black text-white/5 select-none">
                 {f.avatar}
               </div>
               {/* Grayscale overlay that colors on hover */}
               <img 
                 src={f.img} 
                 className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                 alt={f.name}
               />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full p-8 md:p-16 flex flex-col justify-end overflow-hidden">
                <motion.div 
                   animate={{ y: hoveredId === f.id ? 0 : 20 }}
                   className="relative flex flex-col h-full justify-end"
                >
                    {/* Header: Vertical Name on non-hovered Desktop */}
                    <div className={`hidden md:block absolute top-0 left-0 transition-opacity duration-500 ${hoveredId === f.id ? 'opacity-0' : 'opacity-100'}`}>
                       <span className="font-outfit font-black text-6xl text-white/30 uppercase vertical-text origin-top-left -rotate-90">
                         {f.name.split(' ')[0]}
                       </span>
                    </div>

                    <div className="max-w-xl">
                        <span className="font-mono text-xs text-white/60 tracking-widest uppercase mb-4 block" style={{ color: f.color }}>
                          {f.role}
                        </span>
                        <h2 className="font-outfit font-black text-5xl md:text-7xl text-white mb-6 uppercase leading-none">
                          {f.name}
                        </h2>
                        
                        {/* Expanded details visible on hover */}
                        <AnimatePresence>
                          { (hoveredId === f.id || hoveredId === null) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                               <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
                                 {f.bio}
                               </p>

                               {/* Dynamic Stat Meters: Custom Bespoke Visuals */}
                               <div className="space-y-6 mb-10">
                                  {f.stats.map((s, si) => (
                                    <div key={s.label}>
                                       <div className="flex items-center justify-between text-white/60 text-xs uppercase tracking-tighter mb-2">
                                         <span className="flex items-center gap-2">{s.icon} {s.label}</span>
                                         <span>{s.value}%</span>
                                       </div>
                                       <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                                          <motion.div 
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: s.value / 100 }}
                                            transition={{ duration: 1, delay: 0.5 + si * 0.1 }}
                                            className="h-full bg-white origin-left"
                                          />
                                       </div>
                                    </div>
                                  ))}
                               </div>

                               <div className="flex gap-6">
                                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                    <Linkedin size={18} />
                                  </a>
                                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                    <Mail size={18} />
                                  </a>
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Operating Principles: Oversized Typographic Stats */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                 <h2 className="font-outfit font-black text-6xl md:text-8xl leading-none uppercase mb-8">
                   No <br />
                   <span className="gradient-text italic">Middlemen.</span>
                 </h2>
                 <p className="text-muted-foreground text-xl leading-relaxed">
                   When you hire Maverick, you don&apos;t get a junior account executive. You get us. We bridge the gap between vision and execution with direct engineering and brand depth.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Success Rate', val: '94%', sub: 'Retained Growth' },
                   { label: 'Agency Bloat', val: '00%', sub: 'Pure Output' },
                   { label: 'Direct ROI', val: '2.5x', sub: 'Average Multiplier' },
                   { label: 'Founders', val: '02', sub: 'The Core Unit' },
                 ].map((stat, i) => (
                   <div key={stat.label} className="p-8 border border-border rounded-xl group hover:border-purple-500/40 transition-colors">
                      <div className="font-outfit font-black text-5xl mb-2 gradient-text group-hover:scale-110 origin-left transition-transform">
                        {stat.val}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-xs text-muted-foreground font-medium">{stat.sub}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-foreground text-background dark:bg-muted dark:text-foreground">
        <div className="max-w-4xl mx-auto">
           <h2 className="font-outfit font-black text-5xl md:text-7xl uppercase mb-8 leading-none">
             Partner with <br />
             <span className="gradient-text italic">Command.</span>
           </h2>
           <Link href="/contact" className="inline-flex items-center gap-4 group">
             <span className="text-2xl font-mono uppercase tracking-[0.2em] group-hover:translate-x-3 transition-transform">Book Strategy Call</span>
             <ArrowRight size={32} className="text-purple-500 group-hover:rotate-45 transition-transform" />
           </Link>
        </div>
      </section>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-lr;
          text-orientation: mixed;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

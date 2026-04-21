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
    qualifications: [
      { label: 'Creative Depth', desc: 'Brand psychology & identity', icon: <Palette size={14} /> },
      { label: 'Growth Velocity', desc: 'Accelerating market share', icon: <Zap size={14} /> },
      { label: 'Narrative ROI', desc: 'Storytelling that converts', icon: <PenTool size={14} /> },
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
    qualifications: [
      { label: 'Technical SEO', desc: 'Deep architectural optimization', icon: <Terminal size={14} /> },
      { label: 'System Logic', desc: 'Unbreakable conversion systems', icon: <Code size={14} /> },
      { label: 'Data Mining', desc: 'Advanced analytics & tracking', icon: <Brain size={14} /> },
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
            <span className="font-semibold text-xs tracking-widest text-purple-500 uppercase mb-6 block">
              [ Leadership Unit ]
            </span>
            <h1 className="font-outfit font-bold text-foreground leading-[1] mb-8"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
              The Minds Behind<br />
              <span className="gradient-text">The Machine.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
              We don&apos;t hire account managers. You work directly with the founders who have skin in the game and code in their blood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Editorial Stack */}
      <div className="flex flex-col w-full border-t border-border">
        {founders.map((f, i) => (
          <section key={f.id} className="w-full py-24 md:py-32 px-6 border-b border-border last:border-b-0">
             <div className={`max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                   <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl group">
                     {/* Static portrait with subtle zoom on hover */}
                     <img 
                       src={f.img} 
                       alt={f.name}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                   </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                   <span className="font-semibold text-xs tracking-widest text-purple-500 uppercase mb-4 block" style={{ color: f.color }}>
                      {f.role}
                   </span>
                   <h2 className="font-outfit font-bold text-5xl md:text-7xl text-foreground mb-8 leading-tight">
                      {f.name}
                   </h2>
                   <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12">
                      {f.bio}
                   </p>

                   {/* Qualifications List - Cleaned up for light/dark mode */}
                   <div className="space-y-6 mb-12">
                      {f.qualifications.map((q) => (
                        <div key={q.label} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                           <div className="flex items-center gap-3 text-foreground font-semibold mb-2">
                             <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center" style={{ color: f.color }}>
                               {q.icon}
                             </div>
                             {q.label}
                           </div>
                           <div className="text-muted-foreground text-sm ml-11">
                              {q.desc}
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors">
                        <Linkedin size={18} />
                      </a>
                      <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors">
                        <Mail size={18} />
                      </a>
                   </div>
                </div>

             </div>
          </section>
        ))}
      </div>

      {/* Operating Principles: Oversized Typographic Stats */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                 <h2 className="font-outfit font-bold text-5xl md:text-7xl leading-none mb-8">
                   No <br />
                   <span className="gradient-text">Middlemen.</span>
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
                      <div className="font-outfit font-bold text-5xl mb-2 gradient-text transition-transform">
                        {stat.val}
                      </div>
                      <div className="font-semibold text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-xs text-muted-foreground font-medium">{stat.sub}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-muted">
        <div className="max-w-4xl mx-auto">
           <h2 className="font-outfit font-bold text-4xl md:text-6xl mb-8 leading-none">
             Partner with <br />
             <span className="gradient-text">Command.</span>
           </h2>
           <Link href="/contact" className="inline-flex items-center gap-4 group">
             <span className="text-xl font-bold uppercase tracking-widest group-hover:translate-x-3 transition-transform">Book Strategy Call</span>
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

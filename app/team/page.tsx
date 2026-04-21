'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ArrowRight, Zap, Target, Brain, Code, Terminal, Palette, PenTool, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const founders = [
  {
    id: 'muskan',
    name: 'Muskan Rathod',
    role: 'The Brand Architect',
    bio: 'Deciphering consumer psychology through narrative. Muskan engineers brand identities that don\'t just look good—they stick in the subconscious.',
    specialties: ['Strategy', 'Storytelling', 'Psychology'],
    qualifications: [
      { label: 'Creative Depth', desc: 'Brand psychology & identity', icon: <Palette size={16} /> },
      { label: 'Growth Velocity', desc: 'Accelerating market share', icon: <Zap size={16} /> },
      { label: 'Narrative ROI', desc: 'Storytelling that converts', icon: <PenTool size={16} /> },
    ],
    color: '#8b5cf6', // purple
    img: '/images/founders/founder-muskan.jpg',
    alignment: 'left'
  },
  {
    id: 'dhaval',
    name: 'Dhaval Shah',
    role: 'The Tech Alchemist',
    bio: 'Building the unbreakable systems that turn attention into conversion. Dhaval bridges the gap between performance marketing and deep code.',
    specialties: ['Performance', 'Systems', 'Scaling'],
    qualifications: [
      { label: 'Technical SEO', desc: 'Deep architectural optimization', icon: <Terminal size={16} /> },
      { label: 'System Logic', desc: 'Unbreakable conversion systems', icon: <Code size={16} /> },
      { label: 'Data Mining', desc: 'Advanced analytics & tracking', icon: <Brain size={16} /> },
    ],
    color: '#3b82f6', // blue
    img: '/images/founders/founder-dhaval.jpg',
    alignment: 'right'
  },
];

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-[var(--background)] min-h-screen selection:bg-purple-500/30">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 1. HERO - Minimalist Command */}
      <section className="relative h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-3 py-1 rounded-full border border-border bg-muted/50 text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-muted-foreground">
              [ Internal Structure 02 ]
            </span>
            <h1 className="font-outfit font-bold text-foreground leading-[0.9] mb-8"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)', letterSpacing: '-0.05em' }}>
              The <span className="gradient-text">Command</span><br />
              Centre.
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
              We eliminated the layers. You don&apos;t talk to account managers; you talk to the architects building your future.
            </p>
          </motion.div>
        </div>
        
        {/* Subtle Background Typography */}
        <div className="absolute top-1/2 right-[-5%] translate-y-[-50%] pointer-events-none select-none overflow-hidden">
          <motion.span 
            className="text-[20vw] font-outfit font-black text-foreground/[0.02] whitespace-nowrap uppercase leading-none block"
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            Maverick Maverick Maverick
          </motion.span>
        </div>
      </section>

      {/* 2. THE DUAL CORE - Interactive Split */}
      <div ref={containerRef} className="relative">
        {founders.map((f, i) => (
          <FounderSection key={f.id} founder={f} index={i} />
        ))}
      </div>

      {/* 3. THE SYNC - Intersection of Minds */}
      <section className="py-32 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Engineering', val: '01', desc: 'Technical Alchemy' },
                  { label: 'Branding', val: '01', desc: 'Narrative Depth' },
                  { label: 'Intersections', val: '∞', desc: 'Shared Vision' },
                  { label: 'Middlemen', val: '00', desc: 'Pure Access' },
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 bg-background border border-border rounded-2xl hover:border-purple-500/30 transition-colors group"
                  >
                    <div className="text-4xl font-outfit font-bold mb-2 group-hover:gradient-text transition-all duration-300">
                      {item.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">{item.label}</div>
                    <div className="text-xs text-muted-foreground/60">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-outfit font-bold text-5xl md:text-7xl leading-[1.1] mb-8">
                Where <span className="text-purple-500">Logic</span> <br />
                Meets <span className="text-blue-500">Lustre.</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed mb-8">
                Execution is nothing without vision, and vision is a hallucination without technical precision. We don&apos;t just bridge the gap; we inhabit it.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Direct Strategy', 'Deep Development', 'Identity Architecture', 'ROI Optimization'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-border text-xs font-semibold bg-background/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA - The Unit */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-outfit font-bold text-5xl md:text-8xl mb-12 leading-[0.9] tracking-tighter">
            Build with the<br />
            <span className="gradient-text">Originals.</span>
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-6 group">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-purple-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/5 transition-all duration-500">
                <ArrowRight size={32} className="group-hover:rotate-[-45deg] transition-transform duration-500" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-1">Status: Available</div>
              <div className="text-2xl font-bold font-outfit uppercase">Initiate Contact</div>
            </div>
          </Link>
        </div>
        
        {/* Decorative backdrop */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </section>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(to right, #8b5cf6, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}

function FounderSection({ founder, index }: { founder: any, index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -2 : 2, 0, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [isMobile ? 20 : 100, 0, isMobile ? -20 : -100]);

  return (
    <section 
      ref={sectionRef}
      className={`min-h-[80vh] lg:min-h-screen flex items-center px-6 py-20 lg:py-24 relative overflow-hidden border-b border-border last:border-b-0`}
    >
      <div className={`max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 md:gap-24 items-center ${founder.alignment === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* IMAGE SIDE */}
        <div className={`relative ${founder.alignment === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
          <motion.div 
            style={{ scale: imageScale, rotate: imageRotate }}
            className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl group"
          >
            {/* Overlay for depth */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            
            <img 
              src={founder.img} 
              alt={founder.name}
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
            />

            {/* Float Label */}
            <div className="absolute bottom-8 left-8 z-20">
              <span className="px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                {founder.role}
              </span>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className={`absolute -z-10 top-1/2 transform -translate-y-1/2 w-full aspect-square bg-gradient-to-tr ${founder.id === 'muskan' ? 'from-purple-500/10' : 'from-blue-500/10'} to-transparent rounded-full blur-3xl opacity-50`} />
        </div>

        {/* CONTENT SIDE */}
        <div className={`${founder.alignment === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
          <motion.div style={{ y: contentY }}>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground mb-6 block">
              [ Founder 0{index + 1} ]
            </span>
            <h2 className="font-outfit font-bold text-6xl md:text-8xl text-foreground mb-8 cursor-default">
              {founder.name}
               <span className="block h-1 w-20 mt-4 bg-gradient-to-r from-purple-500 to-blue-500" />
            </h2>
            
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed mb-12 font-light">
               {founder.bio}
            </p>

            <div className="space-y-4 mb-12">
               {founder.qualifications.map((q: any) => (
                 <div key={q.label} className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-border hover:bg-muted/50 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted group-hover:bg-background transition-colors" style={{ color: founder.color }}>
                      {q.icon}
                    </div>
                    <div>
                      <h4 className="font-outfit font-bold text-foreground text-lg uppercase tracking-tight">{q.label}</h4>
                      <p className="text-muted-foreground text-sm">{q.desc}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex gap-4">
               <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-500 group">
                 <Linkedin size={20} className="group-hover:scale-110" />
               </a>
               <a href="#" className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-500 group">
                 <Mail size={20} className="group-hover:scale-110" />
               </a>
               <button className="flex-1 rounded-full border border-border px-8 font-outfit font-bold uppercase tracking-widest text-xs flex items-center justify-between group hover:border-foreground/50 transition-all">
                  Get in touch
                  <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

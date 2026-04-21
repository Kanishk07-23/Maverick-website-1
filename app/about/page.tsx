'use client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, TrendingUp, Cpu, MapPin } from 'lucide-react';
import { useRef } from 'react';

const values = [
  {
    num: '01',
    title: 'Precision Performance',
    desc: 'We treat your marketing budget like our own. No fluff, no "awareness" campaigns without a conversion path.',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'var(--brand-purple)'
  },
  {
    num: '02',
    title: 'Data Architecture',
    desc: 'Creativity without data is just art. We build technical backbones that support your growth strategy.',
    icon: <Cpu className="w-5 h-5" />,
    color: 'var(--brand-blue)'
  },
  {
    num: '03',
    title: 'Founder Depth',
    desc: 'Direct access to the architects of your success. We don\'t outsource your vision to juniors.',
    icon: <Globe className="w-5 h-5" />,
    color: 'var(--brand-violet)'
  },
];

const markets = [
  { country: 'India', desc: 'Central Command' },
  { country: 'UAE', desc: 'Middle East Strategy' },
  { country: 'USA', desc: 'Global Scaling' },
  { country: 'UK', desc: 'European Markets' },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-[var(--background)] min-h-screen selection:bg-purple-500/30" ref={containerRef}>
      
      {/* Noise Overlay (Physical Paper Feel) */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero: Asymmetrical Magazine Style */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          <div className="lg:col-span-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[var(--brand-purple)] font-mono text-sm tracking-widest uppercase mb-6 block">
                [ Protocol: Maverick ]
              </span>
              <h1 className="font-outfit font-black text-foreground leading-[0.85] uppercase mb-8"
                  style={{ fontSize: 'clamp(3.5rem, 12vw, 12rem)', letterSpacing: '-0.05em' }}>
                We Build<br />
                <span className="gradient-text italic">Legends.</span>
              </h1>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:mb-12">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-xl md:text-2xl leading-tight font-medium border-l-2 border-border pl-8 py-2">
              Based in Mumbai, operating globally. We are an elite performance cell for brands that refuse to be ignored.
            </motion.p>
          </div>
        </div>

        {/* Floating Asymmetrical Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/5 to-transparent -z-10" />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 200]) }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-[120px] bg-purple-500/10 pointer-events-none" 
        />
      </section>

      {/* The Story: Overlapping Blocks */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Background Text watermark */}
            <div className="absolute -top-12 -left-8 text-[12vw] font-black text-foreground opacity-[0.03] select-none pointer-events-none uppercase">
              Provenance
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-2xl relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent z-10" />
                   <img 
                    src="https://www.maverickdigitals.co.in/founder-muskan.jpg" 
                    alt="Maverick Origin" 
                    className="w-full h-full object-cover grayscale contrast-125"
                   />
                   <div className="absolute bottom-8 left-8 z-20">
                     <span className="text-white font-mono text-xs uppercase tracking-tighter bg-purple-600 px-3 py-1 mb-2 inline-block">Established 2019</span>
                     <h3 className="text-white font-outfit font-bold text-3xl italic">The Creative Pulse.</h3>
                   </div>
                </div>
              </motion.div>

              <div className="relative">
                <h2 className="font-outfit font-black text-foreground text-5xl mb-8 leading-none uppercase">
                  Born from <br />
                  <span className="gradient-text italic">Inefficiency.</span>
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-lg">
                  <p>
                    Maverick Digitals wasn&apos;t built in a boardroom. It was built in the trenches of failing marketing funnels and generic agency reports that delivered &quot;impressions&quot; instead of income.
                  </p>
                  <p>
                    Founded by <strong>Muskan Rathod</strong> and <strong>Dhaval Shah</strong>, we combined brand psychology with technical engineering to create a agency that operates like a software startup: lean, aggressive, and data-obsessed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values: Asymmetrical High-Contrast Grid */}
      <section className="py-32 px-6 bg-foreground text-background dark:bg-muted dark:text-foreground relative">
        <div className="max-w-7xl mx-auto">
           <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="font-outfit font-black text-6xl md:text-8xl leading-none uppercase m-0">
                Core<br />
                <span className="gradient-text text-purple-400">Directives.</span>
              </h2>
              <p className="max-w-sm text-muted-foreground font-medium text-lg border-l border-zinc-700 pl-6">
                Our operational principles. No templates. No safety nets. Just growth.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-1px bg-zinc-800 border border-zinc-800">
             {values.map((v, i) => (
               <motion.div 
                key={v.num}
                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                className="bg-foreground dark:bg-muted p-12 relative group overflow-hidden transition-colors"
               >
                 <span className="text-sm font-mono text-purple-400 mb-8 block">[{v.num}]</span>
                 <h3 className="text-3xl font-bold font-outfit mb-4 uppercase">{v.title}</h3>
                 <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                 <div className="absolute bottom-0 right-0 p-8 opacity-10 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                   {v.icon}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* The Horizon: Horizontal Market Map */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.5em] text-muted-foreground whitespace-nowrap">Global Footprint</span>
            <div className="h-[1px] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {markets.map((m, i) => (
              <motion.div 
                key={m.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={16} className="text-purple-500 group-hover:scale-125 transition-transform" />
                  <span className="font-mono text-lg font-bold">{m.country}</span>
                </div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Floating Magazine Endnote */}
      <section className="py-48 px-6 text-center relative">
         {/* Abstract background graphics */}
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none overflow-hidden">
            <span className="text-[40vw] font-black leading-none uppercase transform rotate-12">Maverick</span>
         </div>

         <div className="max-w-3xl mx-auto relative z-10">
            <motion.h2 
              whileInView={{ scale: [0.95, 1.05, 1] }} 
              className="font-outfit font-black text-6xl md:text-8xl leading-none uppercase mb-12 italic"
            >
              Start the<br />
              <span className="gradient-text">Uprising.</span>
            </motion.h2>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-foreground text-background dark:bg-white dark:text-black font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Collaborate <ArrowRight size={20} />
            </Link>
         </div>
      </section>

    </div>
  );
}

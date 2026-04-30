'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const values = [
  {
    num: '01',
    title: 'Precision Performance',
    desc: 'We treat your marketing budget like our own. No fluff, no "awareness" campaigns without a conversion path.',
  },
  {
    num: '02',
    title: 'Data Architecture',
    desc: 'Creativity without data is just art. We build technical backbones that support your growth strategy.',
  },
  {
    num: '03',
    title: 'Founder Depth',
    desc: 'Direct access to the architects of your success. We don\'t outsource your vision to juniors.',
  },
];

const markets = [
  { country: 'India', desc: 'Central Command' },
  { country: 'UAE', desc: 'Middle East Strategy' },
  { country: 'USA', desc: 'Global Scaling' },
  { country: 'UK', desc: 'European Markets' },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      
      {/* Editorial Hero */}
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-sm block mb-10">[ Protocol: Maverick ]</span>
            <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 13rem)', letterSpacing: '-0.06em' }}>
              We Build<br />
              <span className="brutalist-highlight px-4">Legends.</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-tight font-medium max-w-xl">
              Based in Mumbai, operating globally. We are an elite performance cell for brands that refuse to be ignored.
            </p>
            <div className="label-sm uppercase tracking-[0.2em] opacity-50">
              Est. 2024 {'//'} Growth Protocol
            </div>
          </div>
        </div>
      </section>

      {/* The Origin */}
      <section className="py-24 md:py-40 px-6 md:px-10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              className="sticky top-40"
            >
              <span className="label-sm block mb-8">Provenance</span>
              <h2 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.9] m-0"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.05em' }}>
                The Maverick <br />
                <span className="brutalist-highlight px-2">Origin.</span>
              </h2>
            </motion.div>

            <div className="space-y-12 text-[var(--muted-foreground)] text-xl leading-relaxed max-w-xl">
              <p>
                Maverick Digitals was forged with a singular mission: to provide strategy and execution that translate directly to measurable ROI. We discard generic agency templates in favor of bespoke, aggressive growth models.
              </p>
              <p>
                Co-founded by Muskan Rathod and Dhaval Shah, the agency operates at the intersection of consumer psychology and technical systems. We combine brand storytelling with data architecture to build unbreakable revenue engines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directives */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-[var(--border)] bg-[var(--foreground)] text-[var(--background)]">
        <div className="max-w-[1400px] mx-auto">
           <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="font-outfit font-black text-6xl md:text-9xl leading-none m-0 uppercase tracking-tighter">
                Core<br />
                Directives.
              </h2>
              <p className="max-w-sm font-medium text-lg md:text-xl opacity-70">
                Our operational principles. No templates. No safety nets. Just growth.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-px bg-[var(--background)]/20 border-t border-b border-[var(--background)]/20">
             {values.map((v, i) => (
               <div 
                key={v.num}
                className="py-16 md:py-24 pr-8 md:pr-12"
               >
                 <span className="label-sm mb-10 block opacity-50">[{v.num}]</span>
                 <h3 className="text-3xl md:text-4xl font-black font-outfit mb-6 uppercase tracking-tight">{v.title}</h3>
                 <p className="text-lg opacity-70 leading-relaxed max-w-xs">{v.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-32 md:py-48 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-24">
            <span className="label-sm">Global Footprint</span>
            <div className="h-px flex-1 bg-[var(--border)] hidden md:block" />
            <span className="label-sm opacity-50">Operational Centers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
            {markets.map((m, i) => (
              <div key={m.country} className="group">
                <div className="flex items-center gap-4 mb-6 border-b border-[var(--border)] pb-4">
                  <MapPin size={16} className="text-[var(--foreground)]" />
                  <span className="font-outfit font-black text-2xl uppercase tracking-tighter">{m.country}</span>
                </div>
                <p className="label-sm opacity-50 uppercase">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-56 px-6 md:px-10 text-center border-t border-[var(--border)]">
         <div className="max-w-5xl mx-auto">
            <span className="label-sm block mb-12">Contact Protocol</span>
            <h2 className="font-outfit font-black leading-[0.9] uppercase mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}>
              Start the<br />
              <span className="brutalist-highlight px-4">Uprising.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
            >
              Collaborate <ArrowRight size={20} />
            </Link>
         </div>
      </section>

    </div>
  );
}

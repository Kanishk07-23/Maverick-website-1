'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const founders = [
  {
    id: 'muskan',
    name: 'Muskan Rathod',
    role: 'The Brand Architect',
    image: '/images/founders/founder-muskan.jpg',
    bio: "Deciphering consumer psychology through narrative. Muskan engineers brand identities that don't just look good — they stick in the subconscious. Her approach fuses behavioural insight with visual storytelling to build brands that compound in value over time.",
    stats: [
      { label: 'Discipline', value: 'Brand Psychology' },
      { label: 'Approach', value: 'Narrative-Led' },
      { label: 'Output', value: 'Conversion' },
    ],
    linkedin: 'https://www.linkedin.com/in/muskanrathod/',
    email: 'muskan.maverickdigitals@gmail.com',
  },
  {
    id: 'dhaval',
    name: 'Dhaval Shah',
    role: 'The Systems Engineer',
    image: '/images/founders/founder-dhaval.jpg',
    bio: "Building the unbreakable systems that turn attention into conversion. Dhaval bridges the gap between high-level performance marketing and deep code, engineering pipelines that scale revenue while keeping acquisition costs sharp.",
    stats: [
      { label: 'Discipline', value: 'Technical SEO' },
      { label: 'Approach', value: 'Data-Driven' },
      { label: 'Output', value: 'Scalable Systems' },
    ],
    linkedin: null,
    email: 'dhaval.maverickdigitals@gmail.com',
  }
];

export default function TeamPage() {
  const [hoveredFounder, setHoveredFounder] = useState<number | null>(null);

  return (
    <div className="">
      
      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-sm block mb-10">Leadership Protocol</span>
            <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 10vw, 11rem)' }}>
              Two Founders.<br />
              <span className="brutalist-highlight px-4 mt-2">Zero Layers.</span>
            </h1>
          </motion.div>
          <div className="max-w-2xl border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-relaxed font-medium">
              No account managers, no junior executives. You get the architects — the ones who stake their reputation on every project.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Spread */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          {founders.map((founder, i) => (
            <div key={founder.id} className="flex-1 group">
              <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-[var(--border)]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
              
              <div className="mt-12">
                <div className="flex items-center justify-between mb-8">
                  <span className="label-sm opacity-50 uppercase tracking-[0.2em]">{founder.role}</span>
                  <div className="flex gap-4">
                    {founder.linkedin && (
                      <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--muted-foreground)] transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                    <a href={`mailto:${founder.email}`} className="hover:text-[var(--muted-foreground)] transition-colors">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
                
                <h2 className="font-outfit font-black text-4xl md:text-6xl uppercase mb-8 tracking-tighter">
                  {founder.name}
                </h2>
                
                <p className="text-[var(--muted-foreground)] text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
                  {founder.bio}
                </p>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--border)]">
                  {founder.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="label-sm opacity-40 mb-2">{stat.label}</div>
                      <div className="text-sm font-black uppercase tracking-tight">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-56 px-6 md:px-10 text-center border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <span className="label-sm block mb-12">Collaborate</span>
          <h2 className="font-outfit font-black leading-[0.9] uppercase mb-16 tracking-tighter"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 8.5rem)' }}>
            Work with <br />
            <span className="brutalist-highlight px-4 mt-2">The Originals.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
          >
            Direct Protocol <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

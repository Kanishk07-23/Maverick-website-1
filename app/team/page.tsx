'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const founders = [
  {
    id: 'muskan',
    name: 'Muskan Rathod',
    role: 'The Brand Architect',
    image: '/images/founders/founder-muskan.jpg',
    bio: "Deciphering consumer psychology through narrative. Muskan engineers brand identities that don't just look good — they stick in the subconscious. Her approach fuses behavioural insight with visual storytelling to build brands that compound in value over time.",
    stats: [
      { label: 'Discipline', value: 'Brand Psychology' },
      { label: 'Approach', value: 'Narrative-Led Growth' },
      { label: 'Output', value: 'Conversion Storytelling' },
    ],
    color: 'var(--brand-purple)',
  },
  {
    id: 'dhaval',
    name: 'Dhaval Shah',
    role: 'The Systems Engineer',
    image: '/images/founders/founder-dhaval.jpg',
    bio: "Building the unbreakable systems that turn attention into conversion. Dhaval bridges the gap between high-level performance marketing and deep code, engineering pipelines that scale revenue while keeping acquisition costs sharp.",
    stats: [
      { label: 'Discipline', value: 'Technical SEO' },
      { label: 'Approach', value: 'Data-Driven Precision' },
      { label: 'Output', value: 'Scalable Growth Systems' },
    ],
    color: 'var(--brand-blue)',
  }
];

export default function TeamPage() {
  const [hoveredFounder, setHoveredFounder] = useState<number | null>(null);

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Team Hero">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl flex flex-col items-center"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-foreground glass-card border border-border mb-6"
            >
              The Core Unit
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              Two Founders. <br/><span className="gradient-text">Zero Layers.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl"
            >
              No account managers, no junior executives. When you partner with
              Maverick, you get the architects — the ones who built it, run it,
              and stake their reputation on every project.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── INTERACTIVE DUAL FOUNDERS SPREAD ── */}
      <section className="pb-24 relative overflow-hidden" aria-label="Founders">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6">
          {/* On mobile: vertical stack with natural height. On desktop: horizontal spread at 85vh */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:h-[85vh] lg:min-h-[600px]">
            {founders.map((founder, i) => {
              const isHovered = hoveredFounder === i;
              const isOtherHovered = hoveredFounder !== null && hoveredFounder !== i;

              return (
                <motion.div
                  key={founder.id}
                  className="relative rounded-[2rem] overflow-hidden cursor-pointer group flex-1 min-h-[60vw] sm:min-h-[400px] lg:min-h-0 lg:h-full border border-border/50"
                  animate={{
                    flex: hoveredFounder === null ? 1 : isHovered ? 1.6 : 0.8
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredFounder(i)}
                  onMouseLeave={() => setHoveredFounder(null)}
                  onClick={() => setHoveredFounder(isHovered ? null : i)}
                >
                  {/* Background Image */}
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top md:object-center transition-transform duration-[1.5s] group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Gradients for text readability & premium feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000"
                    style={{ background: `radial-gradient(circle at bottom, ${founder.color}, transparent 60%)` }}
                  />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-5 sm:p-8 md:p-10 flex flex-col justify-end z-10">
                    <motion.div
                      animate={{
                        y: isHovered ? 0 : 0,
                        opacity: isOtherHovered ? 0.4 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-full"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-4">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: founder.color }} />
                        <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-white/90">
                          {founder.role}
                        </span>
                      </div>
                      
                      <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-outfit font-bold mb-3 sm:mb-5 tracking-tight leading-tight">
                        {founder.name}
                      </h3>

                      {/* Compact stats — always visible on mobile, full layout on desktop */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-6 lg:hidden">
                        {founder.stats.slice(1).map(stat => (
                          <div key={stat.label} className="border-l-2 pl-2 sm:pl-3 py-0.5" style={{ borderColor: `${founder.color}80` }}>
                            <div className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/60 mb-0.5 font-medium">{stat.label}</div>
                            <div className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">{stat.value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 sm:gap-3 mb-1 lg:hidden">
                        <a href="#" aria-label={`${founder.name} on LinkedIn`} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-300 hover:bg-white/10">
                          <Linkedin size={16} />
                        </a>
                        <a href="#" aria-label={`Email ${founder.name}`} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-300 hover:bg-white/10">
                          <Mail size={16} />
                        </a>
                      </div>

                      {/* Full bio + stats + links — desktop hover-reveal only */}
                      <motion.div
                        className="overflow-hidden hidden lg:block"
                        initial={false}
                        animate={{ 
                          height: hoveredFounder === null ? 'auto' : isHovered ? 'auto' : '0px',
                          opacity: hoveredFounder === null ? 0.8 : isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mb-6">
                          {founder.bio}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {founder.stats.map(stat => (
                            <div key={stat.label} className="border-l-2 pl-4 py-1" style={{ borderColor: `${founder.color}60` }}>
                              <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1 font-medium">{stat.label}</div>
                              <div className="text-sm md:text-base font-semibold text-white/90">{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <a href="#" aria-label={`${founder.name} on LinkedIn`} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-300 hover:bg-white/10 glass-card">
                            <Linkedin size={20} />
                          </a>
                          <a href="#" aria-label={`Email ${founder.name}`} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-300 hover:bg-white/10 glass-card">
                            <Mail size={20} />
                          </a>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SHARED PHILOSOPHY ── */}
      <section className="section-padding section-alt relative" aria-label="Philosophy">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-5 gap-16 items-center"
          >
            <motion.div variants={fadeUp} custom={0} className="lg:col-span-3">
              <h2
                className="font-outfit font-bold text-foreground leading-tight mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                One unit. <br/><span className="gradient-text">No middlemen.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Brand without tech is noise. Tech without brand is invisible.
                Maverick exists at the intersection — where psychological depth
                meets algorithmic precision — to build growth machines that
                actually compound.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                When you hire us, you get the people whose names are on the door.
                Every strategy call, every creative review, every technical
                decision — it goes through the founders who built this from
                scratch and bet their careers on making it work for you.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '94%', label: 'Client Retention' },
                  { val: '2.5×', label: 'Average ROI' },
                  { val: '02', label: 'Decision Makers' },
                  { val: '00', label: 'Account Managers' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="card-elevated p-8 text-center rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md"
                  >
                    <div className="font-outfit font-bold text-4xl gradient-text mb-2">
                      {stat.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding text-center" aria-label="Contact CTA">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Ready to work with <span className="gradient-text">the originals?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-muted-foreground text-xl mb-10 leading-relaxed"
            >
              Skip the sales funnel. Book a direct strategy call with the
              founders and find out what Maverick can do for your brand.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] btn-magnetic text-lg"
                style={{ background: 'var(--gradient-brand)' }}
              >
                Book a Strategy Call <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

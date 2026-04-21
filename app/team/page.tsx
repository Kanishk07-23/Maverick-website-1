'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TeamPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Team Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-[var(--brand-purple)]/20 mb-6"
            >
              The Core Unit
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Two Founders. <span className="gradient-text">Zero Layers.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground text-xl leading-relaxed"
            >
              No account managers, no junior executives. When you partner with
              Maverick, you get the architects — the ones who built it, run it,
              and stake their reputation on every project.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── EDITORIAL SPREAD ── */}
      <section ref={parallaxRef} className="section-padding relative overflow-hidden" aria-label="Founders">
        <div className="max-w-7xl mx-auto">
          {/* The Asymmetric Photo Grid — images are CONTAINED, never overlap text */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-28">
            {/* Muskan — larger, offset up */}
            <motion.div
              style={{ y: y1 }}
              className="md:col-span-7 relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
                <img
                  src="/images/founders/founder-muskan.jpg"
                  alt="Muskan Rathod — Co-Founder, Maverick Digitals"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-semibold block mb-1">
                    Co-Founder
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-outfit font-bold">
                    Muskan Rathod
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Dhaval — smaller, offset down for asymmetry */}
            <motion.div
              style={{ y: y2 }}
              className="md:col-span-5 md:mt-24"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
                <img
                  src="/images/founders/founder-dhaval.jpg"
                  alt="Dhaval Shah — Co-Founder, Maverick Digitals"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-semibold block mb-1">
                    Co-Founder
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-outfit font-bold">
                    Dhaval Shah
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* The Convergence Strip — a thin visual tie between them */}
          <div className="section-divider mb-20 md:mb-28" />

          {/* Bio Grid — clean, contained, no overlap */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Muskan Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[var(--brand-purple)]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                    The Brand Architect
                  </span>
                </div>
                <h2 className="font-outfit font-bold text-foreground text-3xl md:text-4xl mb-6">
                  Muskan Rathod
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Deciphering consumer psychology through narrative. Muskan
                  engineers brand identities that don&apos;t just look good — they
                  stick in the subconscious. Her approach fuses behavioural
                  insight with visual storytelling to build brands that compound
                  in value over time.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="space-y-3 mb-8">
                {[
                  ['Discipline', 'Brand Psychology & Identity'],
                  ['Approach', 'Narrative-Led Growth'],
                  ['Output', 'Conversion-Optimised Storytelling'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline py-3 border-b border-border/50"
                  >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} custom={2} className="flex gap-3">
                <a
                  href="#"
                  aria-label="Muskan on LinkedIn"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  aria-label="Email Muskan"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Mail size={16} />
                </a>
              </motion.div>
            </motion.div>

            {/* Dhaval Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                    The Systems Engineer
                  </span>
                </div>
                <h2 className="font-outfit font-bold text-foreground text-3xl md:text-4xl mb-6">
                  Dhaval Shah
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Building the unbreakable systems that turn attention into
                  conversion. Dhaval bridges the gap between high-level
                  performance marketing and deep code, engineering pipelines that
                  scale revenue while keeping acquisition costs sharp.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="space-y-3 mb-8">
                {[
                  ['Discipline', 'Technical SEO & Architecture'],
                  ['Approach', 'Data-Driven Precision'],
                  ['Output', 'Scalable Growth Systems'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline py-3 border-b border-border/50"
                  >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} custom={2} className="flex gap-3">
                <a
                  href="#"
                  aria-label="Dhaval on LinkedIn"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  aria-label="Email Dhaval"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <Mail size={16} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHARED PHILOSOPHY ── */}
      <section className="section-padding section-alt" aria-label="Philosophy">
        <div className="max-w-7xl mx-auto">
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
                One unit. <span className="gradient-text">No middlemen.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Brand without tech is noise. Tech without brand is invisible.
                Maverick exists at the intersection — where psychological depth
                meets algorithmic precision — to build growth machines that
                actually compound.
              </p>
              <p className="text-muted-foreground leading-relaxed">
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
                    className="card-elevated p-6 text-center"
                  >
                    <div className="font-outfit font-bold text-3xl gradient-text mb-1">
                      {stat.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
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
              className="text-muted-foreground text-lg mb-10 leading-relaxed"
            >
              Skip the sales funnel. Book a direct strategy call with the
              founders and find out what Maverick can do for your brand.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 btn-magnetic"
                style={{ background: 'var(--gradient-brand)' }}
              >
                Book a Strategy Call <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

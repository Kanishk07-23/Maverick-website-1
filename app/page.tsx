'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  type Variants,
  type Transition,
} from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';

// Lazy-load the heavy 3D scene — SSR off
const SpineScene = dynamic(() => import('@/components/three/SpineScene'), {
  ssr: false,
  loading: () => null,
});

/* ─── DATA ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  { num: '01', title: 'PERFORMANCE\nMARKETING', desc: 'Data-driven campaigns engineered purely for ROI. Every rupee tracked, every conversion owned.', side: 'left' },
  { num: '02', title: 'SEO &\nORGANIC', desc: 'Dominate search, capture intent. Technical SEO and content at scale.', side: 'right' },
  { num: '03', title: 'SOCIAL\nMEDIA', desc: '15M+ organic views. We build audiences that actually convert.', side: 'left' },
  { num: '04', title: 'BRAND\nIDENTITY', desc: 'Visual systems that command premium pricing and instant recall.', side: 'right' },
  { num: '05', title: 'WEB\nDEVELOPMENT', desc: 'Conversion-engineered web experiences. Fast, ruthless, beautiful.', side: 'left' },
  { num: '06', title: 'PERSONAL\nBRANDING', desc: 'Scale founder influence. LinkedIn authority that generates real B2B pipeline.', side: 'right' },
];

const STATS = [
  { value: '40+', label: 'Brands Scaled' },
  { value: '15M+', label: 'Organic Views' },
  { value: '2.5×', label: 'Average ROI' },
  { value: '₹4Cr+', label: 'Ad Spend Managed' },
];

/* ─── VARIANTS ──────────────────────────────────────────────── */

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1, delay: i * 0.1, ease: easeOut } as Transition,
  }),
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOut } as Transition },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeOut } as Transition },
};

/* ─── HELPERS ───────────────────────────────────────────────── */

function InView({ children, variants = fadeUp, custom = 0 }: {
  children: React.ReactNode;
  variants?: Variants;
  custom?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} custom={custom} variants={variants} initial="hidden" animate={inView ? 'show' : 'hidden'}>
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-10">{children}</p>;
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #3b82f6)' }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-5 pointer-events-none">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: easeOut }}
          className="pointer-events-auto w-full max-w-[1300px]"
        >
          <div className={`flex items-center justify-between px-6 h-[60px] rounded-full transition-all duration-500 ${scrolled ? 'bg-black/70 backdrop-blur-2xl border border-white/[0.07]' : ''}`}>
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-7 h-7 relative flex-shrink-0 transition-transform duration-500 group-hover:rotate-12">
                <Image src="/assets/logo.png" alt="Maverick" fill className="object-contain invert" priority />
              </div>
              <span className="font-semibold text-white text-[11px] tracking-[0.3em] uppercase">Maverick</span>
            </a>

            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300">
                Let&apos;s Talk
              </a>
              <button className="md:hidden text-white/50 hover:text-white" onClick={() => setOpen(!open)}>
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-8">
              {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((l, i) => (
                <motion.a
                  key={l.href} href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-white font-black text-5xl uppercase tracking-tighter leading-none hover:text-[#8b5cf6] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} id="home" className="relative flex items-center min-h-screen overflow-hidden">
      <motion.div style={{ opacity, y }} className="relative z-10 w-full px-8 md:px-16 pt-36 pb-24 max-w-[1400px] mx-auto">
        {/* Live status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b5cf6]" />
          </span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
            Mumbai HQ — Growth Protocols Active
          </span>
        </motion.div>

        {/* Giant headline */}
        <div className="overflow-hidden mb-2">
          {['WE', 'SCALE', 'BRANDS.'].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: easeOut }}
                className={`block font-black uppercase leading-[0.85] tracking-[-0.04em] ${i === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#3b82f6]' : 'text-white'}`}
                style={{ fontSize: 'clamp(5rem, 16vw, 17rem)' }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Sub row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-14 flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-white/[0.07] pt-10"
        >
          <p className="text-white/40 text-lg max-w-md leading-relaxed font-light">
            Aggressive creative execution meets technical data architecture. We build unbreakable revenue engines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300">
              Start a Project <ArrowUpRight size={13} />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/50 font-bold text-[10px] tracking-[0.2em] uppercase hover:border-[#8b5cf6] hover:text-white transition-colors duration-300">
              Our Services
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── SPIRAL SPINE SECTION ───────────────────────────────────── */
/* 
 * This is the core visual. A fixed 3D canvas fills the background 
 * during the services section scroll. HTML cards appear on alternating 
 * sides timed with scroll position, replicating the reel's spiral effect.
 */

function SpiralSpineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  return (
    <section ref={containerRef} id="services" className="relative">
      {/* 3D Canvas — sticky for the entire scroll height of this section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <SpineScene scrollYProgress={scrollYProgress} />
      </div>

      {/* HTML content panels — they scroll OVER the sticky canvas */}
      <div className="relative" style={{ zIndex: 10, marginTop: '-100vh' }}>

        {/* Section label — centered at top */}
        <div className="flex justify-center items-center h-screen">
          <InView>
            <div className="text-center px-6">
              <Label>Services // Core Matrix</Label>
              <h2
                className="font-black uppercase tracking-[-0.04em] text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
              >
                THE GROWTH<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]">
                  ARCHITECTURE.
                </span>
              </h2>
            </div>
          </InView>
        </div>

        {/* Spiraling service cards — alternating left/right */}
        {SERVICES.map((s, i) => (
          <div key={i} className="flex items-center h-screen px-8 md:px-16 max-w-[1400px] mx-auto">
            <div className={`w-full flex ${s.side === 'left' ? 'justify-start' : 'justify-end'}`}>
              <InView variants={s.side === 'left' ? slideLeft : slideRight}>
                <div
                  className="relative max-w-xs md:max-w-sm p-8 rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-xl overflow-hidden group hover:border-[#8b5cf6]/40 transition-colors duration-500"
                  style={{ boxShadow: '0 0 40px rgba(139,92,246,0.07)' }}
                >
                  {/* Subtle glow top corner */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#8b5cf6] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500" />

                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#8b5cf6] mb-6">{s.num}</p>
                  <h3
                    className="font-black uppercase text-white leading-none tracking-tight mb-6 whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-8 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-white/20 group-hover:text-[#8b5cf6] transition-colors duration-300">
                    Explore <ArrowUpRight size={11} />
                  </div>
                </div>
              </InView>
            </div>
          </div>
        ))}

        {/* Extra height to let the scroll breathe */}
        <div className="h-screen" />
      </div>
    </section>
  );
}

/* ─── STAT CARD ─────────────────────────────────────────────── */

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="p-12 border-r border-b lg:border-b-0 border-white/[0.06] last:border-r-0 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors duration-500"
    >
      <div className="font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
        {value}
      </div>
      <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">{label}</div>
    </motion.div>
  );
}

/* ─── STATS SECTION ─────────────────────────────────────────── */

function StatsSection() {
  return (
    <section id="about" className="relative py-48 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-20 mb-24">
          <InView>
            <Label>Logs // Proof of Work</Label>
            <h2
              className="font-black uppercase tracking-[-0.04em] text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
            >
              PROVEN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]">YIELDS.</span>
            </h2>
          </InView>
          <InView custom={2}>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed">
              Real brands. Real campaigns. Real results. No inflated metrics, no fluff.
            </p>
          </InView>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.06]">
          {STATS.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION ───────────────────────────────────────────── */

function CTASection() {
  return (
    <section id="contact" className="relative py-48 border-t border-white/[0.06] overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 text-center">
        <InView>
          <Label>Ready // Let&apos;s Build</Label>
          <h2
            className="font-black uppercase tracking-[-0.04em] text-white leading-none mb-8"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 11rem)' }}
          >
            START YOUR<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]">PROJECT.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto mb-16 leading-relaxed">
            Tell us where you want to be. We&apos;ll architect the protocol to get you there.
          </p>
        </InView>
        <InView custom={2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="mailto:maverickdigitals18@gmail.com" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#8b5cf6] hover:text-white transition-colors duration-300">
              maverickdigitals18@gmail.com <ArrowUpRight size={14} />
            </a>
            <a href="https://wa.me/919619818332" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/15 text-white/50 font-bold text-[10px] tracking-[0.2em] uppercase hover:border-[#8b5cf6] hover:text-white transition-colors duration-300">
              WhatsApp Us
            </a>
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();
  const footerLinks = ['Performance Marketing', 'SEO & SEM', 'Social Media', 'Brand Identity', 'Web Dev', 'Personal Branding'];

  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="py-24 border-b border-white/[0.06]">
          <h2
            className="font-black uppercase tracking-[-0.04em] text-white leading-none"
            style={{ fontSize: 'clamp(4rem, 13vw, 13rem)' }}
          >
            THE FUTURE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]">IS MAVERICK.</span>
          </h2>
        </div>

        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-16 border-b border-white/[0.06]">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-6">Contact</p>
            <a href="mailto:maverickdigitals18@gmail.com" className="text-[10px] tracking-wider text-white/50 hover:text-white transition-colors block mb-3 uppercase">maverickdigitals18@gmail.com</a>
            <a href="tel:+919619818332" className="text-[10px] tracking-wider text-white/50 hover:text-white transition-colors block uppercase">+91 96198 18332</a>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-6">Services</p>
            {footerLinks.map((l) => <p key={l} className="text-[10px] tracking-wider text-white/30 hover:text-white transition-colors mb-2 uppercase cursor-pointer">{l}</p>)}
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-6">Navigate</p>
            {NAV_LINKS.map((l) => <a key={l.href} href={l.href} className="block text-[10px] tracking-wider text-white/30 hover:text-white transition-colors mb-2 uppercase">{l.label}</a>)}
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-6">Social</p>
            {['Instagram', 'LinkedIn', 'Twitter'].map((s) => <p key={s} className="text-[10px] tracking-wider text-white/30 hover:text-white transition-colors mb-2 uppercase cursor-pointer">{s}</p>)}
          </div>
        </div>

        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/15">© {year} Maverick Digitals. All Rights Reserved.</p>
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/15">Mumbai, India — Global Operations</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <SpiralSpineSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

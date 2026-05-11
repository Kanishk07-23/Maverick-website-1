'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect, Suspense } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  useInView, AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';

/* ── Dynamically imported 3D scenes (no SSR — they need WebGL) ── */
const HeroScene = dynamic(
  () => import('@/components/three/SpineScene').then(m => ({ default: m.HeroScene })),
  { ssr: false, loading: () => null }
);
const SpineScene = dynamic(
  () => import('@/components/three/SpineScene'),
  { ssr: false, loading: () => null }
);

/* ─── DATA ─────────────────────────────────────────────── */
const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  { num: '01', title: 'PERFORMANCE\nMARKETING', desc: 'Data-driven campaigns engineered purely for ROI. Every rupee tracked, every conversion owned.' },
  { num: '02', title: 'SEO &\nORGANIC', desc: 'Dominate search, capture intent. Technical SEO and content at scale.' },
  { num: '03', title: 'SOCIAL\nMEDIA', desc: '15M+ organic views. We build audiences that actually convert.' },
  { num: '04', title: 'BRAND\nIDENTITY', desc: 'Visual systems that command premium pricing and instant recall.' },
  { num: '05', title: 'WEB\nDEVELOPMENT', desc: 'Conversion-engineered web experiences. Fast, ruthless, beautiful.' },
  { num: '06', title: 'PERSONAL\nBRANDING', desc: 'Scale founder influence. LinkedIn authority that generates real B2B pipeline.' },
];

const STATS = [
  { value: '40+', label: 'Brands Scaled' },
  { value: '15M+', label: 'Organic Views' },
  { value: '2.5×', label: 'Average ROI' },
  { value: '₹4Cr+', label: 'Ad Spend Managed' },
];

/* ─── HELPERS ───────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="p-10 border-r border-b lg:border-b-0 border-white/[0.06] last:border-r-0 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-500">
      <div className="font-black text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(2.5rem,5vw,5rem)' }}>{value}</div>
      <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">{label}</div>
    </motion.div>
  );
}

/* ─── NAVBAR ────────────────────────────────────────────── */
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
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg,#f59e0b,#fcd34d,#8b5cf6)' }} />
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-5 pointer-events-none">
        <motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease }}
          className="pointer-events-auto w-full max-w-[1300px]">
          <div className={`flex items-center justify-between px-6 h-[60px] rounded-full transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border border-white/[0.07]' : ''}`}>
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-7 h-7 relative flex-shrink-0 transition-transform duration-500 group-hover:rotate-12">
                <Image src="/assets/logo.png" alt="Maverick" fill className="object-contain invert" priority />
              </div>
              <span className="font-bold text-white text-[11px] tracking-[0.3em] uppercase">Maverick</span>
            </a>
            <nav className="hidden md:flex items-center gap-10">
              {NAV.map(l => (
                <a key={l.href} href={l.href} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors">{l.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f59e0b] text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#fcd34d] transition-colors duration-300">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-10">
            <nav className="flex flex-col gap-8">
              {[{ label: 'Home', href: '/' }, ...NAV].map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-white font-black text-5xl uppercase tracking-tighter leading-none hover:text-[#f59e0b] transition-colors">
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

/* ─── HERO ──────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const helixOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const helixScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0.3, 0.7], [60, 0]);

  return (
    <section ref={ref} id="home" className="relative" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Gold Helix — full screen, fades as scroll progresses */}
        <motion.div className="absolute inset-0 z-10" style={{ opacity: helixOpacity, scale: helixScale }}>
          <HeroScene scrollProgress={scrollYProgress} />
        </motion.div>

        {/* Radial glow behind helix */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />

        {/* Hero text — fades IN as helix fades out (only after mount to avoid hydration mismatch) */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 max-w-[1400px] mx-auto"
          style={mounted ? { opacity: textOpacity, y: textY } : { opacity: 1, y: 0 }}>

          <motion.div className="flex items-center gap-3 mb-14">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-[#f59e0b] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#f59e0b]" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
              Mumbai HQ — Growth Protocols Active
            </span>
          </motion.div>

          <div>
            {['WE', 'SCALE', 'BRANDS.'].map((word, i) => (
              <div key={i} style={{
                fontSize: 'clamp(4.5rem,14vw,16rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: i === 2 ? 'transparent' : 'white',
                background: i === 2 ? 'linear-gradient(135deg,#f59e0b,#fcd34d)' : undefined,
                WebkitBackgroundClip: i === 2 ? 'text' : undefined,
                WebkitTextFillColor: i === 2 ? 'transparent' : undefined,
                backgroundClip: i === 2 ? 'text' : undefined,
              }}>
                {word}
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-white/[0.07] pt-10">
            <p className="text-white/40 text-lg max-w-md leading-relaxed font-light">
              Aggressive creative meets data architecture. We build unbreakable revenue engines for brands that refuse to be ignored.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f59e0b] text-black font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#fcd34d] transition-colors duration-300">
                Start a Project <ArrowUpRight size={13} />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/50 font-bold text-[10px] tracking-[0.2em] uppercase hover:border-[#f59e0b] hover:text-white transition-colors duration-300">
                Our Services
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={mounted ? { opacity: helixOpacity } : { opacity: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-[#f59e0b] to-transparent" />
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#f59e0b]/40">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── SPIRAL SPINE SECTION ──────────────────────────────── */
function SpiralSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  const SERVICE_COUNT = SERVICES.length;
  const TOTAL = (SERVICE_COUNT + 2) * 100; // vh

  return (
    <section ref={containerRef} id="services" style={{ height: `${TOTAL}vh` }} className="relative">

      {/* Sticky 3D spine canvas */}
      <div className="sticky top-0 h-screen pointer-events-none" style={{ zIndex: 1 }}>
        <SpineScene scrollYProgress={scrollYProgress} />
      </div>

      {/* HTML overlay — scrolls over canvas */}
      <div className="relative" style={{ marginTop: '-100vh', zIndex: 10 }}>

        {/* Section title screen */}
        <div className="h-screen flex items-center justify-center">
          <Reveal>
            <div className="text-center px-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f59e0b]/60 mb-8">Services // Core Matrix</p>
              <h2 className="font-black uppercase tracking-[-0.04em] text-white leading-none"
                style={{ fontSize: 'clamp(3rem,9vw,9rem)' }}>
                THE GROWTH<br />
                <span style={{
                  background: 'linear-gradient(135deg,#f59e0b,#fcd34d)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>ARCHITECTURE.</span>
              </h2>
            </div>
          </Reveal>
        </div>

        {/* Spiral cards */}
        {SERVICES.map((s, i) => (
          <SpiralCard key={i} service={s} index={i} total={SERVICE_COUNT} scrollYProgress={scrollYProgress} />
        ))}

        {/* Exit screen */}
        <div className="h-screen" />
      </div>
    </section>
  );
}

/* Each card orbits the central spine in 3D via CSS transforms */
function SpiralCard({
  service, index, total, scrollYProgress
}: {
  service: typeof SERVICES[0];
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const cardStart = (index + 1) / (total + 2);
  const cardPeak  = (index + 1.5) / (total + 2);
  const cardEnd   = (index + 2) / (total + 2);

  const rotateY = useTransform(
    scrollYProgress,
    [cardStart, cardPeak, cardEnd],
    [index % 2 === 0 ? 90 : -90, 0, index % 2 === 0 ? -90 : 90]
  );
  const opacity = useTransform(scrollYProgress, [cardStart, cardStart + 0.05, cardEnd - 0.05, cardEnd], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [cardStart, cardPeak, cardEnd], [0.7, 1, 0.7]);

  const isLeft = index % 2 === 0;

  return (
    <div className="h-screen flex items-center" style={{ perspective: '1200px' }}>
      <div className={`w-full flex ${isLeft ? 'justify-start pl-12 md:pl-32' : 'justify-end pr-12 md:pr-32'}`}>
        <motion.div
          style={{ rotateY, opacity, scale, transformStyle: 'preserve-3d' }}
          className="max-w-[340px] p-8 rounded-2xl border border-[#f59e0b]/20 bg-black/70 backdrop-blur-xl relative overflow-hidden group">

          {/* Card glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-15 blur-3xl"
            style={{ background: '#f59e0b' }} />

          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#f59e0b] mb-5">{service.num}</p>
          <h3 className="font-black uppercase text-white leading-none tracking-tight mb-5 whitespace-pre-line"
            style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>
            {service.title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
          <div className="mt-7 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-[#f59e0b]/30 group-hover:text-[#f59e0b] transition-colors duration-300">
            Explore <ArrowUpRight size={11} />
          </div>

          {/* Gold border line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── STATS ─────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section id="about" className="py-48 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-20 mb-20">
          <Reveal>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f59e0b]/60 mb-8">Logs // Proof of Work</p>
            <h2 className="font-black uppercase tracking-[-0.04em] text-white leading-none"
              style={{ fontSize: 'clamp(3rem,9vw,9rem)' }}>
              PROVEN<br />
              <span style={{ background: 'linear-gradient(135deg,#f59e0b,#fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                YIELDS.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed">
              Real brands. Real campaigns. Real results. No inflated metrics.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.06]">
          {STATS.map((s, i) => <StatCard key={i} value={s.value} label={s.label} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="contact" className="relative py-48 border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 text-center">
        <Reveal>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f59e0b]/60 mb-8">Ready // Let&apos;s Build</p>
          <h2 className="font-black uppercase tracking-[-0.04em] text-white leading-none mb-8"
            style={{ fontSize: 'clamp(3.5rem,10vw,11rem)' }}>
            START YOUR<br />
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              PROJECT.
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto mb-16 leading-relaxed">
            Tell us where you want to be. We&apos;ll architect the protocol to get you there.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="mailto:maverickdigitals18@gmail.com" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#f59e0b] text-black font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#fcd34d] transition-colors duration-300">
              maverickdigitals18@gmail.com <ArrowUpRight size={14} />
            </a>
            <a href="https://wa.me/919619818332" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/15 text-white/50 font-bold text-[10px] tracking-[0.2em] uppercase hover:border-[#f59e0b] hover:text-white transition-colors duration-300">
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="py-24 border-b border-white/[0.06]">
          <h2 className="font-black uppercase tracking-[-0.04em] text-white leading-none"
            style={{ fontSize: 'clamp(4rem,13vw,13rem)' }}>
            THE FUTURE<br />
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              IS MAVERICK.
            </span>
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
            {SERVICES.map(s => <p key={s.num} className="text-[10px] tracking-wider text-white/30 hover:text-white transition-colors mb-2 uppercase cursor-pointer">{s.title.replace('\n', ' ')}</p>)}
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-6">Navigate</p>
            {NAV.map(l => <a key={l.href} href={l.href} className="block text-[10px] tracking-wider text-white/30 hover:text-white transition-colors mb-2 uppercase">{l.label}</a>)}
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-white/25 mb-6">Social</p>
            {['Instagram', 'LinkedIn', 'Twitter'].map(s => <p key={s} className="text-[10px] tracking-wider text-white/30 hover:text-white transition-colors mb-2 uppercase cursor-pointer">{s}</p>)}
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

/* ─── PAGE ROOT ───────────────────────────────────────────── */
export default function HomeClient() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <SpiralSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

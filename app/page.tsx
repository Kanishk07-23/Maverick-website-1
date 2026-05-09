'use client';

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
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';

/* ─── DATA ──────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    num: '01',
    title: 'Performance\nMarketing',
    desc: 'Data-driven paid campaigns engineered for maximum ROI. Every rupee tracked, every conversion optimised.',
    tags: ['Meta Ads', 'Google Ads', 'Attribution'],
  },
  {
    num: '02',
    title: 'SEO &\nOrganic',
    desc: 'Dominate search results and capture high-intent traffic. Technical SEO + content at scale.',
    tags: ['Technical SEO', 'Content', 'Link Building'],
  },
  {
    num: '03',
    title: 'Social\nMedia',
    desc: '15M+ organic views generated. We build communities that convert.',
    tags: ['Instagram', 'LinkedIn', 'YouTube'],
  },
  {
    num: '04',
    title: 'Brand\nIdentity',
    desc: 'Visual and narrative systems that command premium pricing and instant recognition.',
    tags: ['Strategy', 'Design', 'Positioning'],
  },
  {
    num: '05',
    title: 'Web\nDevelopment',
    desc: 'Conversion-focused web experiences. Fast, beautiful, and engineered to sell.',
    tags: ['Next.js', 'UI/UX', 'CRO'],
  },
  {
    num: '06',
    title: 'Personal\nBranding',
    desc: 'Scale founder influence on LinkedIn and beyond for B2B growth.',
    tags: ['LinkedIn', 'Content Strategy', 'Authority'],
  },
];

const STATS = [
  { value: '40+', label: 'Brands Scaled' },
  { value: '15M+', label: 'Organic Views' },
  { value: '2.5×', label: 'Average ROI' },
  { value: '₹4Cr+', label: 'Ad Spend Managed' },
];

const PROCESS = [
  { num: '01', title: 'Discovery', desc: 'Deep dive into your market, audience, and competitive landscape.' },
  { num: '02', title: 'Strategy', desc: 'Custom growth protocol engineered for your specific revenue targets.' },
  { num: '03', title: 'Execution', desc: 'Relentless, data-led execution across every chosen channel.' },
  { num: '04', title: 'Scale', desc: 'We double down on what wins and ruthlessly cut what doesn\'t.' },
];

/* ─── ANIMATION VARIANTS ─────────────────────────────────── */

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: easeOut } as Transition,
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.06, ease: 'easeOut' } as Transition,
  }),
};

/* ─── SUB-COMPONENTS ─────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="t-label inline-block mb-12 opacity-40">
      {children}
    </span>
  );
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Progress beam */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #3b82f6)',
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-5 pointer-events-none">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full max-w-[1300px]"
        >
          <div
            className={`flex items-center justify-between px-6 h-[60px] rounded-full transition-all duration-500 ${
              scrolled ? 'bg-black/80 backdrop-blur-2xl border border-white/8' : ''
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-7 h-7 relative flex-shrink-0 transition-transform duration-500 group-hover:rotate-12">
                <Image src="/assets/logo.png" alt="Maverick Digitals" fill className="object-contain invert" priority />
              </div>
              <span className="font-heading font-black text-white text-xs tracking-[0.25em] uppercase">
                Maverick
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="t-label opacity-40 hover:opacity-100 transition-opacity underline-anim"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-5">
              <a
                href="#contact"
                className="hidden md:inline-flex btn-primary text-[10px] px-5 py-2.5"
              >
                Let&apos;s Talk
              </a>
              <button
                className="md:hidden text-white/60 hover:text-white transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-8">
              {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-heading font-black text-white text-5xl uppercase tracking-tighter leading-none hover:text-[var(--accent)] transition-colors"
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

/* ─── HERO SECTION ───────────────────────────────────────── */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const words = ['WE', 'SCALE', 'BRANDS.'];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="home">

      {/* Background glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div style={{ opacity, y }} className="container relative z-10 pt-40 pb-32">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-20"
        >
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_12px_var(--accent)]" />
          <span className="t-label">Mumbai HQ — Operating Globally</span>
        </motion.div>

        {/* Giant headline */}
        <h1 className="overflow-hidden">
          {words.map((word, wi) => (
            <div key={wi} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: wi * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`t-hero block ${wi === words.length - 1 ? 'accent-text' : 'text-white'}`}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-white/8 pt-10"
        >
          <p className="t-body max-w-md">
            Aggressive creative execution meets technical data architecture. We build unbreakable revenue engines for brands that refuse to be ignored.
          </p>
          <div className="flex flex-col gap-4">
            <a href="#contact" className="btn-primary">
              Start a Project <ArrowUpRight size={14} />
            </a>
            <a href="#services" className="t-label opacity-40 hover:opacity-100 transition-opacity self-end">
              View Services ↓
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-16 bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── MARQUEE STRIP ──────────────────────────────────────── */

function MarqueeStrip() {
  const items = ['Performance Marketing', 'SEO & SEM', 'Social Media', 'Brand Identity', 'Web Development', 'Personal Branding', 'Content Strategy', 'Paid Media'];
  const doubled = [...items, ...items];
  return (
    <div className="relative border-y border-white/8 py-5 overflow-hidden bg-black">
      <div className="flex overflow-hidden">
        <div className="marquee-track whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="t-label inline-flex items-center gap-6 opacity-30">
              {item}
              <span className="w-1 h-1 rounded-full bg-[var(--accent)] inline-block" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── STATS SECTION ──────────────────────────────────────── */

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section border-b border-white/8" id="about">
      <div className="container" ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-20 mb-24">
          <RevealBlock>
            <SectionLabel>Logs // Proof of Work</SectionLabel>
            <h2 className="t-display text-white">
              PROVEN<br />
              <span className="accent-text">YIELDS.</span>
            </h2>
          </RevealBlock>
          <RevealBlock delay={2}>
            <p className="t-body max-w-sm">
              Every number is a real brand, a real campaign, a real result. No inflated metrics. No fluff.
            </p>
          </RevealBlock>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="py-16 px-10 border border-white/5 flex flex-col gap-4 hover:bg-white/[0.02] hover:border-[var(--accent-border)] transition-all duration-500"
            >
              <div
                className="font-heading font-black text-white leading-none tracking-tighter"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
              >
                {s.value}
              </div>
              <div className="t-label opacity-30">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES SECTION ───────────────────────────────────── */

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="services">
      <div className="container" ref={ref}>
        <RevealBlock>
          <SectionLabel>Services // Core Matrix</SectionLabel>
          <h2 className="t-display text-white mb-24">
            THE GROWTH<br />
            <span className="accent-text">ARCHITECTURE.</span>
          </h2>
        </RevealBlock>

        <div className="divide-y divide-white/8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              custom={i * 0.5}
              variants={fadeIn}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 cursor-pointer hover:bg-white/[0.02] px-6 -mx-6 transition-all duration-500 rounded-2xl"
            >
              {/* Number */}
              <div className="md:col-span-1 t-label opacity-20 group-hover:opacity-60 transition-opacity pt-1">
                {s.num}
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3
                  className="font-heading font-black text-white uppercase leading-none tracking-tighter group-hover:accent-text transition-all duration-500"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', whiteSpace: 'pre-line' }}
                >
                  {s.title}
                </h3>
              </div>

              {/* Desc */}
              <div className="md:col-span-5">
                <p className="t-body">{s.desc}</p>
              </div>

              {/* Tags + Arrow */}
              <div className="md:col-span-2 flex flex-col items-start md:items-end gap-3">
                <ArrowUpRight
                  size={20}
                  className="text-white/20 group-hover:text-[var(--accent)] transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transform transition-transform"
                />
                <div className="flex flex-wrap gap-2 justify-end">
                  {s.tags.map((t) => (
                    <span key={t} className="t-label text-[8px] px-2 py-1 rounded-full border border-white/10 opacity-40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS SECTION ────────────────────────────────────── */

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section border-t border-white/8 bg-[var(--bg-2)]" id="work">
      <div className="container" ref={ref}>
        <RevealBlock>
          <SectionLabel>Protocol // How We Work</SectionLabel>
          <h2 className="t-display text-white mb-24">
            THE<br />
            <span className="accent-text">PROCESS.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/8">
          {PROCESS.map((p, i) => (
            <motion.div
              key={i}
              custom={i * 0.5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="p-12 border-r border-white/8 last:border-r-0 md:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r hover:bg-white/[0.03] transition-colors duration-500 flex flex-col gap-8"
            >
              <span className="t-label opacity-20">{p.num}</span>
              <h3 className="font-heading font-black text-white text-3xl uppercase tracking-tighter leading-none">
                {p.title}
              </h3>
              <p className="t-body text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION ────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section border-t border-white/8 overflow-hidden" id="contact">
      <div className="container relative">
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <RevealBlock>
            <SectionLabel>Ready // Let&apos;s Build</SectionLabel>
            <h2 className="t-display text-white mb-8">
              START YOUR<br />
              <span className="accent-text">PROJECT.</span>
            </h2>
            <p className="t-body max-w-md mx-auto mb-16">
              Tell us where you want to be. We&apos;ll build the protocol to get you there.
            </p>
          </RevealBlock>

          <RevealBlock delay={2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:maverickdigitals18@gmail.com" className="btn-primary text-xs px-10 py-4">
                maverickdigitals18@gmail.com <ArrowUpRight size={14} />
              </a>
              <a href="https://wa.me/919619818332" className="btn-ghost text-xs px-10 py-4">
                WhatsApp Us
              </a>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[var(--bg)]">
      <div className="container">
        {/* Big footer brand */}
        <div className="py-24 border-b border-white/8">
          <h2
            className="font-heading font-black text-white uppercase leading-none tracking-tighter"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
          >
            THE FUTURE<br />
            <span className="accent-text">IS MAVERICK.</span>
          </h2>
        </div>

        {/* Links grid */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-16">
          <div>
            <p className="t-label mb-6 opacity-40">Contact</p>
            <a href="mailto:maverickdigitals18@gmail.com" className="t-label opacity-60 hover:opacity-100 transition-opacity block mb-3">
              maverickdigitals18@gmail.com
            </a>
            <a href="tel:+919619818332" className="t-label opacity-60 hover:opacity-100 transition-opacity block">
              +91 96198 18332
            </a>
          </div>
          <div>
            <p className="t-label mb-6 opacity-40">Services</p>
            {['Performance Marketing', 'SEO & SEM', 'Social Media', 'Branding', 'Web Dev'].map((s) => (
              <p key={s} className="t-label opacity-40 hover:opacity-100 transition-opacity mb-2 cursor-pointer">{s}</p>
            ))}
          </div>
          <div>
            <p className="t-label mb-6 opacity-40">Navigate</p>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="block t-label opacity-40 hover:opacity-100 transition-opacity mb-2">{l.label}</a>
            ))}
          </div>
          <div>
            <p className="t-label mb-6 opacity-40">Social</p>
            {['Instagram', 'LinkedIn', 'Twitter'].map((s) => (
              <p key={s} className="t-label opacity-40 hover:opacity-100 transition-opacity mb-2 cursor-pointer">{s}</p>
            ))}
            <div className="mt-8 flex items-center gap-3">
              <div className="w-6 h-6 relative flex-shrink-0">
                <Image src="/assets/logo.png" alt="Logo" fill className="object-contain invert" />
              </div>
              <span className="font-heading font-black text-white text-xs tracking-widest uppercase">Maverick</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="t-label opacity-20">© {year} Maverick Digitals. All rights reserved.</p>
          <p className="t-label opacity-20">Mumbai, India — Global Operations</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ASSEMBLY ──────────────────────────────────────── */

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </main>
  );
}

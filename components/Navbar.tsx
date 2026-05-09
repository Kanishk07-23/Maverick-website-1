'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Magnetic } from './ui/Magnetic';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={clsx(
            'w-full max-w-[1400px] h-16 rounded-full flex items-center justify-between px-6 transition-all duration-500 pointer-events-auto overflow-hidden relative',
            scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl' : 'bg-transparent'
          )}
        >
          {/* Scroll Beam */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--brand-purple)] via-[var(--brand-blue)] to-[var(--brand-purple)] origin-left z-50 opacity-60"
            style={{ scaleX }}
          />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-10" id="nav-logo">
            <div className="w-8 h-8 relative flex-shrink-0 transition-transform duration-500 group-hover:rotate-12">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
            <span className="font-outfit font-black text-white text-xs tracking-[0.2em] uppercase">
              Maverick
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-sm text-white/50 hover:text-white transition-colors uppercase tracking-[0.15em] relative group"
                id={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-6 z-10">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Magnetic strength={0.2}>
              <Link
                href="/contact"
                className="px-6 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--brand-purple)] hover:text-white transition-colors"
              >
                Initiate
              </Link>
            </Magnetic>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-white focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col pt-32 px-10"
          >
            <nav className="flex flex-col gap-6">
              {[{ label: 'Home', href: '/' }, ...links, { label: 'Contact', href: '/contact' }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-outfit font-black text-white text-4xl uppercase tracking-tighter"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

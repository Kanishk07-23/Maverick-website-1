'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          scrolled ? 'bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] py-4' : 'bg-transparent py-8'
        )}
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-purple)] to-transparent opacity-50" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group z-10" id="nav-logo">
            <div className="w-10 h-10 relative flex-shrink-0 transition-transform duration-500 group-hover:rotate-12">
              <Image
                src="/assets/logo.png"
                alt="Maverick Digitals Logo"
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-black text-[var(--foreground)] text-sm tracking-tighter uppercase leading-none">
                Maverick
              </span>
              <span className="label-sm opacity-50 text-[10px] uppercase tracking-[0.2em] leading-none mt-1">
                Digitals
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-sm text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity uppercase tracking-[0.2em] relative group"
                id={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--foreground)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-6 z-10">
            <div>
               <ThemeToggle />
            </div>
            <Link
              href="/contact"
              id="nav-cta"
              className="hidden lg:inline-flex px-8 py-3 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] text-xs font-black uppercase tracking-[0.12em] hover:scale-105 transition-transform btn-magnetic"
            >
              Initiate →
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[var(--foreground)] focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              id="nav-menu-toggle"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--background)] backdrop-blur-2xl flex flex-col pt-32"
          >
            <div className="flex-1 flex flex-col justify-center px-8 pb-20">
              <nav className="flex flex-col gap-4">
                {[{ label: 'Home', href: '/' }, ...links, { label: 'Contact', href: '/contact' }].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block font-outfit font-black text-[var(--foreground)] uppercase leading-none tracking-tighter"
                      style={{ fontSize: 'clamp(2.5rem, 12vw, 6rem)' }}
                    >
                      {l.label} <span className="text-[var(--muted-foreground)] opacity-20">{'//'}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-[var(--border)] flex items-center justify-between">
                <div className="label-sm opacity-50 uppercase tracking-widest">Mumbai // Global</div>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

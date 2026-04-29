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

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-[var(--background)] border-b border-[var(--border)]' : 'bg-transparent'
        )}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-10" id="nav-logo">
            <div className="w-8 h-8 relative flex-shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Maverick Digitals Logo"
                fill
                className="object-contain dark:invert dark:brightness-200"
                priority
              />
            </div>
            <span className="font-outfit font-bold text-foreground text-xs tracking-[0.18em] uppercase hidden sm:block">
              Maverick Digitals
            </span>
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 link-underline"
                id={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right — CTA + Theme */}
          <div className="flex items-center gap-4 z-10">
            <ThemeToggle />
            <Link
              href="/contact"
              id="nav-cta"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full label-sm font-semibold text-white btn-magnetic"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Get Started →
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[var(--foreground)] focus:outline-none"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              id="nav-menu-toggle"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8 py-20">
              {/* Big editorial nav links */}
              <nav className="flex flex-col gap-2">
                {[{ label: 'Home', href: '/' }, ...links, { label: 'Contact', href: '/contact' }].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block font-outfit font-black text-[var(--foreground)] hover:text-[var(--brand-purple)] transition-colors duration-200"
                      style={{ fontSize: 'clamp(2.5rem, 9vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex items-center justify-between"
              >
                <span className="label-sm text-[var(--muted-foreground)]">Mumbai, India</span>
                <span className="label-sm text-[var(--muted-foreground)]">© 2025 Maverick Digitals</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    subLinks: [
      { label: 'Personal Branding', href: '/services/personal-branding' },
      { label: 'Social Media', href: '/services/social-media' },
      { label: 'Web Development', href: '/services/web-dev' },
      { label: 'SEO & SEM', href: '/services/seo-sem' },
      { label: 'Performance Marketing', href: '/services/performance-marketing' },
      { label: 'Branding & Strategy', href: '/services/branding-strategy' },
    ],
  },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass-card border-b border-border py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="nav-logo">
          <div className="w-10 h-10 relative">
            <Image
              src="/assets/logo.png"
              alt="Maverick Digitals Logo"
              fill
              className="object-contain transition-all duration-300 dark:invert dark:brightness-200"
              priority
            />
          </div>
          <span className="font-outfit font-bold text-foreground text-sm tracking-widest uppercase hidden sm:block">
            Maverick Digitals
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            l.subLinks ? (
              <div key={l.href} className="relative group">
                <Link
                  href={l.href}
                  className="nav-link text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200 font-jakarta py-2"
                  id={`nav-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 glass-card border border-border rounded-xl p-2 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  {l.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg text-sm transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200 font-jakarta"
                id={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </Link>
            )
          ))}
        </nav>

        {/* CTA & ThemeToggle */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/contact"
            id="nav-cta"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white btn-magnetic shadow-[var(--premium-shadow)]"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Get Started
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-250" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="p-2 text-foreground/80 focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            id="nav-menu-toggle"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'lg:hidden absolute top-full left-0 right-0 glass-card border-t border-border transition-all duration-300',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-4 h-[80vh] overflow-y-auto">
          {links.map((l) => (
            <div key={l.href}>
              <Link
                href={l.href}
                className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors block"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
              {l.subLinks && (
                <div className="flex flex-col gap-3 mt-3 pl-4 border-l border-border">
                  {l.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center px-5 py-3 rounded-full text-sm font-semibold text-white btn-magnetic"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Get Started →
          </Link>
        </nav>
      </div>
    </header>
  );
}

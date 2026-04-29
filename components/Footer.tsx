'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';

const services = [
  { label: 'Personal Branding', href: '/services/personal-branding' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'Web Development', href: '/services/web-dev' },
  { label: 'SEO & SEM', href: '/services/seo-sem' },
  { label: 'Performance Marketing', href: '/services/performance-marketing' },
  { label: 'Branding & Strategy', href: '/services/branding-strategy' },
];

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Big CTA headline — Exoape style */}
        <div className="py-20 md:py-28 border-b border-[var(--border)]">
          <span className="label-sm block mb-8">Ready to grow?</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2
              className="font-outfit font-black text-[var(--foreground)] leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
            >
              Let&apos;s Build<br />
              <span className="gradient-text">Together.</span>
            </h2>
            <div className="flex-shrink-0 pb-2">
              <Link
                href="/contact"
                id="footer-cta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white btn-magnetic"
                style={{ background: 'var(--gradient-brand)' }}
              >
                Book Free Strategy Call →
              </Link>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5" aria-label="Maverick Digitals Home">
              <div className="w-8 h-8 relative">
                <Image
                  src="/assets/logo.png"
                  alt="Maverick Digitals"
                  fill
                  className="object-contain dark:invert dark:brightness-200"
                />
              </div>
              <span className="font-outfit font-bold text-[var(--foreground)] text-xs tracking-[0.15em] uppercase">
                Maverick Digitals
              </span>
            </Link>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:maverickdigitals18@gmail.com"
                className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm transition-colors link-underline"
                id="footer-email"
              >
                <Mail size={13} />
                maverickdigitals18@gmail.com
              </a>
              <span className="flex items-center gap-2 text-[var(--muted-foreground)] text-sm">
                <MapPin size={13} />
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="label-sm text-[var(--foreground)] mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm transition-colors link-underline"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="label-sm text-[var(--foreground)] mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm transition-colors link-underline"
                    id={`footer-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="label-sm text-[var(--foreground)] mb-5">Active In</h4>
            <ul className="flex flex-col gap-3 text-[var(--muted-foreground)] text-sm">
              {['India', 'UAE', 'USA', 'UK', 'Australia'].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[var(--muted-foreground)] text-xs">
            © {year} Maverick Digitals. All rights reserved.
          </p>
          <p className="text-[var(--muted-foreground)] text-xs">
            Designed with precision. Built for growth.
          </p>
        </div>
      </div>
    </footer>
  );
}

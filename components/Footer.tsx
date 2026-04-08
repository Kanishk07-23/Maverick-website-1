'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

const services = [
  'Personal Branding',
  'Social Media Management',
  'Website & App Development',
  'SEO & SEM',
  'Performance Marketing',
  'Branding & Strategy',
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#07070F]">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 relative">
                <Image
                  src="/assets/logo.png"
                  alt="Maverick Digitals"
                  fill
                  className="object-contain filter invert brightness-200"
                />
              </div>
              <span className="font-grotesk font-bold text-white text-sm tracking-widest uppercase">
                Maverick Digitals
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion
              strategy, storytelling, and execution.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:maverickdigitals18@gmail.com"
                className="flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors"
                id="footer-email"
              >
                <Mail size={14} />
                maverickdigitals18@gmail.com
              </a>
              <span className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={14} />
                Mumbai, Maharashtra, India
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Our Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-white/50 hover:text-white/80 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:bg-purple-400 transition-colors" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white/80 text-sm transition-colors flex items-center gap-2 group"
                    id={`footer-${l.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:bg-purple-400 transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Start Growing</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Ready to turn attention into revenue? Let&apos;s build something remarkable together.
            </p>
            <Link
              href="/contact"
              id="footer-cta"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 glow-purple"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Book Free Strategy Call
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {year} Maverick Digitals. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Active in India &bull; UAE &bull; USA &bull; UK &bull; Australia
          </p>
        </div>
      </div>
    </footer>
  );
}

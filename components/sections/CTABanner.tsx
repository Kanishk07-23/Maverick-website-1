'use client';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';

export default function CTABanner() {
  return (
    <section className="section-padding relative overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.10) 100%)' }} />
      <div className="absolute inset-0 border-y border-purple-500/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />

      <Reveal direction="up" className="max-w-5xl mx-auto relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 shadow-sm mb-6">
          Let&apos;s Talk
        </span>

        <h2 className="font-outfit font-bold text-foreground mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          Ready to Grow Your{' '}
          <span className="gradient-text">Brand?</span>
        </h2>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 font-medium">
          Get a free digital marketing strategy consultation with our Mumbai-based team. We&apos;ll discuss how our SEO, performance marketing, and branding services can scale your business.
        </p>

        {/* Checklist */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {['Free 30-min strategy call', 'Custom growth roadmap', 'No commitment required'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
              <CheckCircle2 size={16} className="text-[var(--brand-purple)] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <MagneticButton as="div" className="inline-block mb-6">
          <Link
            href="/contact"
            id="cta-book-call"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.35)] text-lg"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Book a Free Strategy Call
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </MagneticButton>

        {/* Secondary action */}
        <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm">
          <span>Or reach us directly at</span>
          <a
            href="mailto:maverickdigitals18@gmail.com"
            id="cta-email-link"
            className="text-[var(--brand-purple)] hover:opacity-80 font-medium transition-opacity"
          >
            maverickdigitals18@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}

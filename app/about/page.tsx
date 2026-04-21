import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Maverick Digitals | Digital Marketing Team Mumbai',
  description:
    'Learn about Maverick Digitals — a Mumbai-based performance marketing and SEO agency co-founded by Muskan Rathod and Dhaval Shah. We focus on measurable SEO & ads ROI.',
};

const values = [
  {
    num: '01',
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results.',
  },
  {
    num: '02',
    title: 'Data-Informed Creativity',
    desc: 'We blend creative storytelling with data insights to create campaigns that resonate and convert.',
  },
  {
    num: '03',
    title: 'Founder-Led Approach',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every step.',
  },
  {
    num: '04',
    title: 'End-to-End Capability',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team.',
  },
];

const industries = [
  'E-Commerce',
  'SaaS & Tech',
  'Real Estate',
  'Healthcare',
  'Finance',
  'Education',
  'F&B',
  'Fashion',
];

const markets = [
  { country: 'India', desc: 'Primary market & HQ' },
  { country: 'UAE', desc: 'Middle East presence' },
  { country: 'USA', desc: 'North America clients' },
  { country: 'UK', desc: 'European reach' },
  { country: 'Australia', desc: 'APAC expansion' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient relative overflow-hidden">
        <div
          className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] border border-[var(--brand-purple)]/20 mb-6"
              style={{ background: 'var(--card)', boxShadow: 'var(--card-shadow)' }}>
              Our Story
            </span>
            <h1
              className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              About Maverick{' '}
              <span className="gradient-text">Digitals</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              Maverick Digitals is a Mumbai-based performance-driven digital marketing agency helping ambitious brands scale through
              high-conversion SEO, social media strategy, and web development. We blend creativity, psychology, and data to drive
              measurable business outcomes — not just vanity metrics.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--gradient-brand)', boxShadow: '0 4px 20px rgba(109,40,217,0.3)' }}
            >
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission + Origin — two column editorial */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-outfit font-bold text-foreground text-4xl mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                To deliver performance-driven digital marketing solutions that combine creativity, technology, and data
                to help brands scale profitably and sustainably.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We partner with growth-focused businesses across industries — any business that wants to build authority
                and convert attention into consistent, scalable revenue.
              </p>
            </div>

            {/* Origin block — card-elevated (no backdrop-filter needed here) */}
            <div className="card-elevated rounded-3xl p-8">
              <div className="text-sm text-[var(--brand-purple)] font-semibold uppercase tracking-wider mb-6">Our Origin</div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Maverick Digitals was co-founded by <strong className="text-foreground">Muskan Rathod</strong> and{' '}
                <strong className="text-foreground">Dhaval Shah</strong>, bringing together expertise in brand strategy and
                technical innovation.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Muskan&apos;s background in storytelling and brand psychology, combined with Dhaval&apos;s engineering depth in
                scalable web platforms, created an agency that operates at the intersection of art and data — a rare
                combination that consistently delivers results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — sticky two-column, no icons (mirrors WhyUsSection) */}
      <section className="py-28 md:py-36" style={{ background: 'var(--section-alt-bg)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Left — sticky heading */}
            <div className="lg:w-5/12">
              <div className="lg:sticky lg:top-32">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] border border-[var(--border)]/40 mb-6"
                  style={{ background: 'var(--card)', boxShadow: 'var(--card-shadow)' }}>
                  Our Principles
                </span>
                <h2
                  className="font-outfit font-black text-foreground mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
                >
                  The Values That{' '}
                  <br />
                  <span className="gradient-text">Guide Us.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Four principles that shape every decision we make and every result we deliver.
                </p>
              </div>
            </div>

            {/* Right — numbered value cards, no icons */}
            <div className="lg:w-7/12 flex flex-col gap-6">
              {values.map((v) => (
                <div
                  key={v.num}
                  className="relative rounded-3xl p-6 sm:p-8 md:p-10 border transition-all duration-300 hover:border-[var(--brand-purple)]/30"
                  style={{
                    background: 'var(--card)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  {/* Ghost number watermark */}
                  <div
                    className="absolute top-4 right-6 font-outfit font-black opacity-[0.07] select-none pointer-events-none text-foreground"
                    style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
                  >
                    {v.num}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-outfit font-bold text-foreground text-xl md:text-2xl mb-3"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        {v.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{v.desc}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className="font-outfit font-black gradient-text leading-none"
                        style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.04em' }}
                      >
                        {v.num}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries — editorial inline tag list, no cards */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] border border-[var(--border)]/40 mb-6"
                style={{ background: 'var(--card)', boxShadow: 'var(--card-shadow)' }}>
                Verticals
              </span>
              <h2
                className="font-outfit font-bold text-foreground mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}
              >
                Industries We{' '}
                <span className="gradient-text">Serve</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;ve built growth engines across a wide range of sectors. Whatever your industry, if you want measurable scale — we&apos;re built for it.
              </p>
            </div>

            {/* Industry tags — lightweight, no glass */}
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground border border-[var(--border)] transition-all duration-200 hover:border-[var(--brand-purple)]/50 hover:text-[var(--brand-purple)]"
                  style={{ background: 'var(--card)' }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach — numbered list layout, no cards */}
      <section className="section-padding" style={{ background: 'var(--section-alt-bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] border border-[var(--border)]/40 mb-6"
                style={{ background: 'var(--card)', boxShadow: 'var(--card-shadow)' }}>
                Global Presence
              </span>
              <h2
                className="font-outfit font-black text-foreground mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}
              >
                Active in{' '}
                <span className="gradient-text">5 Countries</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                From Mumbai to Manhattan — Maverick Digitals operates across markets where ambitious brands need to grow.
              </p>
            </div>

            {/* Numbered market list */}
            <div className="flex flex-col">
              {markets.map((m, i) => (
                <div
                  key={m.country}
                  className="flex items-center justify-between py-6 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {/* Number */}
                  <span
                    className="font-mono font-medium text-sm flex-shrink-0 w-8"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Country name */}
                  <div className="flex-1 px-6">
                    <div className="font-outfit font-bold text-foreground text-xl md:text-2xl" style={{ letterSpacing: '-0.01em' }}>
                      {m.country}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-muted-foreground text-sm text-right flex-shrink-0">
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-outfit font-bold text-foreground text-4xl mb-4">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Remarkable</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Ready to partner with a team that has skin in the game?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all"
            style={{ background: 'var(--gradient-brand)', boxShadow: '0 4px 20px rgba(109,40,217,0.3)' }}
          >
            Start a Conversation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Muskan Rathod',
              jobTitle: 'Co-Founder',
              worksFor: {
                '@type': 'Organization',
                name: 'Maverick Digitals'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dhaval Shah',
              jobTitle: 'Co-Founder',
              worksFor: {
                '@type': 'Organization',
                name: 'Maverick Digitals'
              }
            }
          ]),
        }}
      />
    </div>
  );
}

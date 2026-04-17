import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Target, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Maverick Digitals | Digital Marketing Team Mumbai',
  description:
    'Learn about Maverick Digitals — a Mumbai-based performance marketing and SEO agency co-founded by Muskan Rathod and Dhaval Shah. We focus on measurable SEO & ads ROI.',
};

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Performance-Driven',
    desc: 'We focus on measurable outcomes, not vanity metrics. Every strategy is designed to deliver real business results.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Data-Informed Creativity',
    desc: 'We blend creative storytelling with data insights to create campaigns that resonate and convert.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Founder-Led Approach',
    desc: 'Our founders are directly involved in every project, ensuring quality and accountability at every step.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'End-to-End Capability',
    desc: 'From strategy to execution, we handle everything in-house with our lean, high-output team.',
  },
];

const industries = [
  { label: 'E-Commerce', icon: '🛍️' },
  { label: 'SaaS & Tech', icon: '💻' },
  { label: 'Real Estate', icon: '🏢' },
  { label: 'Healthcare', icon: '🏥' },
  { label: 'Finance', icon: '📈' },
  { label: 'Education', icon: '🎓' },
  { label: 'F&B', icon: '🍽️' },
  { label: 'Fashion', icon: '👗' },
];

const markets = [
  { country: 'India', flag: '🇮🇳', desc: 'Primary market & HQ' },
  { country: 'UAE', flag: '🇦🇪', desc: 'Middle East presence' },
  { country: 'USA', flag: '🇺🇸', desc: 'North America clients' },
  { country: 'UK', flag: '🇬🇧', desc: 'European reach' },
  { country: 'Australia', flag: '🇦🇺', desc: 'APAC expansion' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-6">
              Our Story
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground transition-all duration-300 hover:scale-105 shadow-[var(--premium-shadow)]"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission + Story */}
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
            <div className="glass-card rounded-3xl p-8 border border-border">
              <div className="text-sm text-purple-400 font-semibold uppercase tracking-wider mb-6">Our Origin</div>
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

      {/* Values */}
      <section className="section-padding" style={{ background: 'rgba(15,15,35,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-4">
              Our Principles
            </span>
            <h2 className="font-outfit font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              The Values That{' '}
              <span className="gradient-text">Guide Us</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card rounded-2xl p-6 border border-border hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-purple-400"
                  style={{ background: 'rgba(124,58,237,0.15)' }}>
                  {v.icon}
                </div>
                <h3 className="text-foreground font-outfit font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Industries We{' '}
              <span className="gradient-text">Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="glass-card rounded-2xl p-5 text-center border border-border hover:border-purple-500/30 transition-all duration-200 hover:scale-[1.04]"
              >
                <div className="text-3xl mb-2">{ind.icon}</div>
                <div className="text-muted-foreground text-sm font-medium">{ind.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-padding" style={{ background: 'rgba(15,15,35,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-4">
              Global Presence
            </span>
            <h2 className="font-outfit font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Active in{' '}
              <span className="gradient-text">5 Countries</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {markets.map((m) => (
              <div
                key={m.country}
                className="glass-card rounded-2xl px-6 py-4 border border-border flex items-center gap-3 hover:border-purple-500/30 transition-all duration-200"
              >
                <span className="text-3xl">{m.flag}</span>
                <div>
                  <div className="text-foreground font-semibold text-sm">{m.country}</div>
                  <div className="text-muted-foreground text-xs">{m.desc}</div>
                </div>
              </div>
            ))}
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground hover:scale-105 transition-all shadow-[var(--premium-shadow)]"
            style={{ background: 'var(--gradient-brand)' }}
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top Branding Agency Mumbai | Brand Strategy Consultants',
  description: 'Elevate your business with Maverick Digitals, a top branding agency in Mumbai. We provide brand identity design, messaging frameworks, and go-to-market strategies.',
  keywords: ['branding agency mumbai', 'brand strategy consultant', 'brand identity design', 'go-to-market strategy india', 'rebranding experts', 'brand positioning'],
};

const faqs = [
  {
    q: 'What is the difference between a brand and a logo?',
    a: 'A logo is merely the visual symbol of your company. Your brand, however, is the holistic perception people have of your business. It encompasses your messaging, your customer service, your visual identity, your values, and the emotional connection you build with your audience.'
  },
  {
    q: 'When should a company consider rebranding?',
    a: 'You should consider rebranding if your target audience has shifted, if your visual identity feels heavily outdated next to competitors, if you are pivoting your core product offering, or if you are expanding into significantly different international markets where your current messaging falls flat.'
  },
  {
    q: 'Do you create Brand Guidelines?',
    a: 'Yes. For every comprehensive branding project, we deliver an extensive Brand Guidelines document (or Brand Book). This covers logo usage rules, typography, color palettes, tone of voice, and visual layout principles to ensure consistency across all your future marketing materials.'
  },
  {
    q: 'What is a Go-to-Market (GTM) Strategy?',
    a: 'A GTM strategy is an action plan specifying how a company will reach target customers and achieve competitive advantage when launching a new product or entering a new market. We help define your pricing, marketing channels, sales strategy, and launch roadmap.'
  }
];

export default function BrandingStrategyPage() {
  return (
    <div className="pt-20">
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Branding Strategy Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#7C3AED] glass-card border border-[#7C3AED]/20 mb-6">
              Identity & Positioning
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Expert <span className="gradient-text">Branding & Strategy</span> Agency in Mumbai
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              We design identities that captivate and strategies that dominate. From visual design to comprehensive go-to-market roadmaps, we build brands that are impossible to ignore.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground transition-all duration-300 hover:scale-105" style={{ background: 'var(--gradient-brand)' }}>
              Schedule a Brand Audit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-outfit font-bold text-foreground text-3xl mb-6">Building Brands That Command Premium Pricing</h2>
              <article className="prose prose-invert max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  In a commoditized market, the brand with the clearest positioning wins. Branding is not just about looking pretty; it&apos;s a strategic psychological exercise in controlling how your audience perceives your value. Strong brands don&apos;t compete on price; they compete on trust.
                </p>
                <p className="leading-relaxed mb-6">
                  As an elite <strong>branding agency in Mumbai</strong>, Maverick Digitals takes a deeply analytical approach to creativity. We conduct rigorous market research and competitor analysis to find white space in your industry. We then craft a cohesive visual and verbal identity that distinctly occupies that space.
                </p>
                <p className="leading-relaxed">
                  Whether you are a startup needing a powerful launch pad via a precise Go-to-Market strategy, or a legacy business requiring a modern brand refresh, we architect frameworks that scale globally.
                </p>
              </article>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Our Branding Services</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Visual Brand Identity (Logo, Colors, Typography)',
                  'Messaging Architecture & Tone of Voice',
                  'Comprehensive Brand Guidelines Book',
                  'Go-to-Market (GTM) Strategy & Execution',
                  'Competitor Analysis & Brand Positioning',
                  'Corporate Rebranding & Refresh'
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-foreground text-3xl mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-2xl border border-border group overflow-hidden">
                <summary className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer font-medium text-foreground select-none">
                  {faq.q}
                  <span className="text-purple-400 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Brand Strategy and Design',
            provider: {
              '@type': 'Organization',
              name: 'Maverick Digitals',
              url: 'https://www.maverickdigitals.co.in'
            },
            areaServed: ['India', 'USA', 'UAE', 'UK', 'Australia'],
            offers: {
              '@type': 'Offer',
              description: 'Brand identity, messaging frameworks, and GTM strategies.'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maverickdigitals.co.in/' },
              { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.maverickdigitals.co.in/services' },
              { '@type': 'ListItem', position: 3, name: 'Branding & Strategy', item: 'https://www.maverickdigitals.co.in/services/branding-strategy' }
            ]
          }
        ])
      }} />
    </div>
  );
}

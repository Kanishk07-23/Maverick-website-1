import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Performance Marketing Agency India | Paid Ads Experts',
  description: 'Top performance marketing agency in Mumbai. Maximize your ROAS with data-driven Meta and Google Ads campaigns designed to scale your revenue predictably.',
  keywords: ['performance marketing agency india', 'paid advertising agency', 'meta ads management', 'google ads ROAS', 'conversion rate optimization', 'ROI marketing'],
};

const faqs = [
  {
    q: 'How is performance marketing different from traditional advertising?',
    a: 'Traditional advertising focuses on broad reach and brand awareness, making it difficult to track exact returns. Performance marketing, on the other hand, is highly measurable. You only pay for specific actions (clicks, leads, or sales), allowing us to track your Return On Ad Spend (ROAS) down to the penny and optimize campaigns in real-time.'
  },
  {
    q: 'What ad platforms do you specialize in?',
    a: 'We specialize in the platforms that drive the highest intent and conversion rates: Meta (Facebook & Instagram) and Google (Search, Performance Max, Display, and YouTube). We also run targeted B2B campaigns on LinkedIn Ads depending on your customer profile.'
  },
  {
    q: 'How much ad spend do I need to start?',
    a: 'While we work with various budgets, we generally recommend a minimum monthly ad spend of $2,000 (or equivalent INR) to allow the algorithms enough data to optimize efficiently. Contact us for a custom audit of your current ad account.'
  },
  {
    q: 'Will you create the ad creatives (images/videos) as well?',
    a: 'Yes! A successful ad campaign requires compelling creative just as much as precise targeting. Our in-house design and copywriting team creates multiple variations of ad creative for rigorous A/B testing.'
  }
];

export default function PerformanceMarketingPage() {
  return (
    <div className="pt-20">
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Performance Marketing Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1D4ED8] glass-card border border-[#1D4ED8]/20 mb-6">
              Paid Acquisition
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Data-Driven <span className="gradient-text">Performance Marketing</span> Agency
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              Stop burning money on trial and error. We build highly profitable Meta and Google advertising funnels designed to maximize your Return on Ad Spend (ROAS) and deliver predictable revenue at scale.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground transition-all duration-300 hover:scale-105" style={{ background: 'var(--gradient-brand)' }}>
              Get a Free Ad Account Audit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-outfit font-bold text-foreground text-3xl mb-6">What makes our Performance Marketing different?</h2>
              <article className="prose prose-invert max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Most agencies launch a few ads, wait and hope. At Maverick Digitals, we treat performance marketing as a rigorous science. We map the entire customer journey from the first impression to the final checkout, relentlessly testing creative, copy, and audience variables.
                </p>
                <p className="leading-relaxed mb-6">
                  As an elite <strong>performance marketing agency in India</strong>, our philosophy is simple: ROI first, always. We specialize in building sophisticated full-funnel strategies—using top-of-funnel video creatives to capture cheap attention, and highly personalized retargeting to squeeze maximum conversions from your traffic.
                </p>
                <p className="leading-relaxed">
                  We don&apos;t settle for &quot;industry average&quot; click-through rates. We dive heavily into Conversion Rate Optimization (CRO), ensuring that the traffic we buy doesn&apos;t bounce, but actually converts on your landing pages.
                </p>
              </article>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Campaign Offerings</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Meta Ads (Facebook & IG) Strategy',
                  'Google Search & Performance Max Campaigns',
                  'Full-Funnel Architecture & Retargeting',
                  'High-Converting Ad Copy & Creative Design',
                  'Landing Page & Conversion Rate Optimization',
                  'Real-Time ROAS Tracking & Dashboards'
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#1D4ED8] flex-shrink-0 mt-0.5" />
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
            name: 'Performance Marketing & Paid Ads',
            provider: {
              '@type': 'Organization',
              name: 'Maverick Digitals',
              url: 'https://www.maverickdigitals.co.in'
            },
            areaServed: ['India', 'USA', 'UAE', 'UK', 'Australia'],
            offers: {
              '@type': 'Offer',
              description: 'Meta and Google Ads management for e-commerce and B2B.'
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
              { '@type': 'ListItem', position: 3, name: 'Performance Marketing', item: 'https://www.maverickdigitals.co.in/services/performance-marketing' }
            ]
          }
        ])
      }} />
    </div>
  );
}

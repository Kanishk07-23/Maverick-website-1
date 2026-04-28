import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ServicePageReveal from '@/components/ServicePageReveal';

export const metadata: Metadata = {
  title: 'Personal Branding Agency India | Maverick Digitals',
  description: 'Top personal branding agency for founders and executives in India. Build thought leadership on LinkedIn and Twitter with our expert team.',
  keywords: ['personal branding agency', 'personal brand consultant India', 'founder branding', 'LinkedIn personal branding', 'thought leadership', 'executive branding'],
};

const faqs = [
  {
    q: 'What is personal branding and why do founders need it?',
    a: 'Personal branding is the intentional process of establishing and promoting your unique value, expertise, and reputation. For founders and executives, a strong personal brand acts as a magnet for investors, top talent, and enterprise clients, significantly reducing customer acquisition costs while building long-term trust.'
  },
  {
    q: 'How long does it take to see results from personal branding?',
    a: 'While you may see an initial spike in engagement within the first 30 days, building a meaningful personal brand is a long-term play. We typically tell our clients to expect compounding results—in terms of inbound leads and authority—between months 3 and 6.'
  },
  {
    q: 'What platforms do you focus on for personal branding?',
    a: 'We primarily focus on LinkedIn and X (formerly Twitter) for B2B founders and executives, as these platforms offer the highest ROI for professional networking and thought leadership. Depending on your industry, we may also incorporate YouTube or Instagram.'
  },
  {
    q: 'Do I have to write all the content myself?',
    a: 'Not at all. Our team handles the heavy lifting, including strategy, content calendar creation, and ghostwriting. We conduct brief weekly interviews with you to extract your unique insights, ensuring every piece of content sounds authentically like you.'
  }
];

export default function PersonalBrandingPage() {
  return (
    <div className="pt-20">
      <ServicePageReveal color="#7C3AED" />
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Personal Branding Service Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#7C3AED] glass-card border border-[#7C3AED]/20 mb-6">
              Executive Branding
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Premier <span className="gradient-text">Personal Branding</span> Agency in India
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              Build an undeniable online presence that attracts opportunities, builds trust, and converts followers into customers. We position founders and creators as the most trusted authorities in their industry.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground transition-all duration-300 hover:scale-105" style={{ background: 'var(--gradient-brand)' }}>
              Get Your Brand Strategy <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-outfit font-bold text-foreground text-3xl mb-6">What is Personal Branding?</h2>
              <article className="prose prose-invert max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  In today&apos;s digital-first economy, people do business with people they trust. <strong>Personal branding</strong> is the strategic process of shaping your public narrative to establish thought leadership, communicate your unique value proposition, and build lasting credibility.
                </p>
                <p className="leading-relaxed mb-6">
                  For CEOs, founders, and industry leaders in India and globally, a powerful personal brand is no longer optional—it is a critical business asset. While corporate marketing teams push product features, an effective personal branding strategy leverages your authentic experience to build emotional connections with your target audience.
                </p>
                <p className="leading-relaxed">
                  At <strong>Maverick Digitals</strong>, our personal branding consultants specialize in transforming your raw expertise into a compelling, multi-platform presence that drives tangible business outcomes.
                </p>
              </article>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Key Deliverables</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Comprehensive Brand Strategy & Positioning',
                  'LinkedIn & X (Twitter) Profile Optimization',
                  'Monthly Content Calendar & Ideation',
                  'Premium Ghostwriting & Copywriting',
                  'Engagement & Community Management',
                  'Monthly Growth Analytics & Adjustments'
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
            name: 'Personal Branding Services',
            provider: {
              '@type': 'Organization',
              name: 'Maverick Digitals',
              url: 'https://www.maverickdigitals.co.in'
            },
            areaServed: ['India', 'USA', 'UAE', 'UK', 'Australia'],
            offers: {
              '@type': 'Offer',
              description: 'Executive branding, thought leadership, and ghostwriting services'
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
              { '@type': 'ListItem', position: 3, name: 'Personal Branding', item: 'https://www.maverickdigitals.co.in/services/personal-branding' }
            ]
          }
        ])
      }} />
    </div>
  );
}

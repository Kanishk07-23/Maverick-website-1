import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Development Company Mumbai | Maverick Digitals',
  description: 'Leading web design and development agency in Mumbai. We build fast, responsive, and SEO-optimized custom websites and e-commerce platforms.',
  keywords: ['website development company mumbai', 'web design agency india', 'ecommerce development', 'custom web apps', 'next.js development india', 'shopify developers mumbai'],
};

const faqs = [
  {
    q: 'Do you build custom websites or use templates?',
    a: 'We specialize in custom web development. While templates can be a cheap starting point, they are notoriously slow and lack the flexibility growing brands need. We build custom frontends (using modern stacks like Next.js and React) tailored exactly to your brand guidelines and user experience requirements.'
  },
  {
    q: 'How long does it take to develop a new website?',
    a: 'A standard marketing website or corporate portal typically takes 4–6 weeks from design approval to launch. Complex e-commerce platforms or custom web applications can take 8–12 weeks. We establish clear timelines during our initial discovery phase.'
  },
  {
    q: 'Will my new website be optimized for SEO?',
    a: 'Absolutely. Web development and technical SEO go hand-in-hand. We build platforms with clean HTML semantics, lightning-fast load times (optimizing Core Web Vitals), proper heading structures, and schema markup integration right out of the box.'
  },
  {
    q: 'Do you offer ongoing website maintenance and support?',
    a: 'Yes! Launching a site is just the beginning. We offer retainer packages for ongoing bug fixes, performance monitoring, content updates, and continuous conversion rate optimization (CRO) to ensure your platform remains secure and high-performing.'
  }
];

export default function WebDevPage() {
  return (
    <div className="pt-20">
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Web Development Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#4F46E5] glass-card border border-[#4F46E5]/20 mb-6">
              Web & App Development
            </span>
            <h1 className="font-grotesk font-bold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Premium <span className="gradient-text">Website Development</span> Company in Mumbai
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Your website is your 24/7 salesperson. We engineer high-performance, conversion-optimized digital products that don&apos;t just look good—they generate measurable revenue.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105" style={{ background: 'var(--gradient-brand)' }}>
              Start Your Web Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-grotesk font-bold text-white text-3xl mb-6">Why Invest in Custom Web Development?</h2>
              <article className="prose prose-invert max-w-none text-white/60">
                <p className="text-lg leading-relaxed mb-6">
                  A slow, generic website actively loses you money. In an era of short attention spans and fierce competition, your digital storefront needs to instantly communicate trust, load in milliseconds, and guide users effortlessly toward a conversion.
                </p>
                <p className="leading-relaxed mb-6">
                  As a top-tier <strong>web development agency in Mumbai</strong>, we build bespoke digital experiences. We eschew bloated themes in favor of modern Javascript frameworks (React, Next.js) and headless CMS architectures (Sanity, WordPress Headless, Shopify Plus).
                </p>
                <p className="leading-relaxed">
                  Whether you need a dynamic corporate portal or a scalable e-commerce infrastructure, our engineering team ensures your platform satisfies both user expectations and Google&apos;s stringent Core Web Vitals.
                </p>
              </article>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-white/8">
              <h3 className="text-xl font-bold text-white mb-6">Our Development Expertise</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Custom Web Design & UX/UI Prototyping',
                  'E-commerce Solutions (Shopify & Custom)',
                  'Next.js & React Frontend Development',
                  'Technical SEO & Core Web Vitals Optimization',
                  'CMS Integration (Headless & Traditional)',
                  'Mobile App Development (iOS & Android)'
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#4F46E5] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0F0F23]/50" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-grotesk font-bold text-white text-3xl mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-2xl border border-white/8 group overflow-hidden">
                <summary className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer font-medium text-white select-none">
                  {faq.q}
                  <span className="text-purple-400 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
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
            name: 'Website & App Development',
            provider: {
              '@type': 'Organization',
              name: 'Maverick Digitals',
              url: 'https://www.maverickdigitals.co.in'
            },
            areaServed: ['India', 'USA', 'UAE', 'UK', 'Australia'],
            offers: {
              '@type': 'Offer',
              description: 'Custom Next.js web development, e-commerce, and mobile app creation.'
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
              { '@type': 'ListItem', position: 3, name: 'Web Development', item: 'https://www.maverickdigitals.co.in/services/web-dev' }
            ]
          }
        ])
      }} />
    </div>
  );
}

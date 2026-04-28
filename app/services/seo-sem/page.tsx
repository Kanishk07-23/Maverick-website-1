import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Top SEO Agency Mumbai | Search Engine Optimization India',
  description: 'Leading SEO & SEM agency in Mumbai. We drive qualified organic traffic and high-ROI Google Ads campaigns. Dominate search results with Maverick Digitals.',
  keywords: ['SEO agency mumbai', 'search engine optimization india', 'google ads management', 'local SEO expert', 'technical SEO audit', 'SEM agency'],
};

const faqs = [
  {
    q: 'What is the difference between SEO and SEM?',
    a: 'SEO (Search Engine Optimization) focuses on earning unpaid, organic traffic by optimizing your website\'s technical health and content. SEM (Search Engine Marketing) involves buying traffic through paid advertising, like Google Ads. We typically recommend a strategy that combines both for short-term revenue and long-term sustainability.'
  },
  {
    q: 'How long does SEO take to produce results?',
    a: 'SEO is a compounding marketing channel. While technical fixes and local SEO optimization can yield minor traffic boosts in the first 30 days, substantial ranking improvements for competitive keywords generally take 3 to 6 months of consistent content creation and link-building.'
  },
  {
    q: 'Do you guarantee a Number 1 ranking on Google?',
    a: 'No reputable SEO agency can guarantee a #1 ranking, as Google\'s algorithms change constantly and are outside anyone\'s direct control. What we guarantee is a data-driven strategy leveraging industry best practices that will significantly improve your overall search visibility and organic traffic.'
  },
  {
    q: 'Do you offer local SEO for businesses with physical stores?',
    a: 'Yes. Local SEO is highly effective for brick-and-mortar businesses. We optimize your Google Business Profile (GBP), build local citations, and create hyper-localized content to ensure you dominate "near me" search queries in your target geographic areas.'
  }
];

export default function SeoSemPage() {
  return (
    <div className="pt-20">
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="SEO and SEM Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#2563EB] glass-card border border-[#2563EB]/20 mb-6">
              Search Excellence
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Top <span className="gradient-text">SEO & SEM Agency</span> in Mumbai
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              Be found exactly when your customers are ready to buy. Our comprehensive search intent strategies—encompassing technical SEO and Google Ads—turn search volume into consistent revenue.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground transition-all duration-300 hover:scale-105" style={{ background: 'var(--gradient-brand)' }}>
              Get a Free SEO Audit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-outfit font-bold text-foreground text-3xl mb-6">Why Your Business Needs SEO & SEM</h2>
              <article className="prose prose-invert max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Search Engine Optimization is the foundation of digital stability. Unlike paid ads that stop generating leads the moment you stop paying, organic search provides compounding returns and long-term brand authority.
                </p>
                <p className="leading-relaxed mb-6">
                  However, modern SEO requires far more than stuffing keywords. It demands technically sound website architecture, fast load times, and exceptionally helpful content perfectly mapped to user intent. As a leading <strong>SEO agency in Mumbai</strong>, we utilize generative engine optimization (GEO) and answer engine optimization (AEO) to ensure your brand thrives in the AI search era.
                </p>
                <p className="leading-relaxed">
                  Complementing our organic efforts, our SEM team deploys hyper-targeted Google search and display campaigns, allowing you to capture high-intent buyers immediately while your organic rankings climb.
                </p>
              </article>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Our Search Services</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'In-Depth Technical SEO Audits',
                  'Keyword Strategy & Content Mapping',
                  'On-Page & Off-Page Optimization',
                  'Google Ads (Search & Display) Management',
                  'Local SEO & Google Business Profile Setup',
                  'Transparent Monthly Traffic & Ranking Reports'
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
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
            name: 'SEO & SEM Marketing',
            provider: {
              '@type': 'Organization',
              name: 'Maverick Digitals',
              url: 'https://www.maverickdigitals.co.in'
            },
            areaServed: ['India', 'USA', 'UAE', 'UK', 'Australia'],
            offers: {
              '@type': 'Offer',
              description: 'Technical SEO, organic search tracking, and Google ads management.'
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
              { '@type': 'ListItem', position: 3, name: 'SEO & SEM', item: 'https://www.maverickdigitals.co.in/services/seo-sem' }
            ]
          }
        ])
      }} />
    </div>
  );
}

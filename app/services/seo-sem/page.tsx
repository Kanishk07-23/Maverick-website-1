import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEO & SEM Agency Mumbai | Maverick Digitals',
  description: 'Keyword strategy, technical optimization, Google Ads, and inbound lead engines designed to dominate search results.',
};

const offerings = [
  {
    title: 'Technical SEO',
    desc: 'Deep architecture optimization to ensure search engines crawl and index your site with zero friction.'
  },
  {
    title: 'Content Authority',
    desc: 'Strategic keyword mapping and high-quality content production to dominate top-of-funnel search intent.'
  },
  {
    title: 'SEM & Search Ads',
    desc: 'Precision-targeted Google Ads campaigns that capture customers at the exact moment of purchase intent.'
  },
  {
    title: 'Local Dominance',
    desc: 'Bespoke local SEO strategies to ensure you own your geographic market and Google Business Profile.'
  }
];

export default function SEOSemPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <span className="label-sm block mb-10">[ Service Protocol 04 ]</span>
          <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 10vw, 11rem)' }}>
            SEO &<br />
            <span className="text-[var(--muted-foreground)]">SEM.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-tight font-medium max-w-xl">
              Visibility is vanity. Authority is sanity. We build search engines that convert high-intent traffic into predictable revenue.
            </p>
            <div className="label-sm uppercase tracking-[0.2em] opacity-50">
              Search Authority {'//'} Inbound Engines
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
            {offerings.map((item, i) => (
              <div key={item.title} className="bg-[var(--background)] p-12 md:p-20 group hover:bg-[var(--inverted-bg)] hover:text-[var(--inverted-text)] transition-colors duration-700">
                <span className="label-sm block mb-10 opacity-50">Capability 0{i+1}</span>
                <h3 className="text-3xl md:text-5xl font-black font-outfit uppercase tracking-tighter mb-8 leading-none">
                  {item.title}
                </h3>
                <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-56 px-6 md:px-10 text-center border-t border-[var(--border)]">
         <div className="max-w-5xl mx-auto">
            <span className="label-sm block mb-12">Search Request</span>
            <h2 className="font-outfit font-black leading-[0.9] uppercase mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}>
              Dominate the<br />
              <span className="text-[var(--muted-foreground)]">Results.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
            >
              Start Optimization <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Performance Marketing Agency | Maverick Digitals',
  description: 'Maximize your ROAS with data-driven Meta and Google Ads campaigns designed to scale your revenue predictably.',
};

const offerings = [
  {
    title: 'Meta Ads Strategy',
    desc: 'High-converting funnels on Facebook & Instagram using psychological triggers and dynamic creative optimization.'
  },
  {
    title: 'Google Ad Architecture',
    desc: 'Search, Performance Max, and YouTube campaigns engineered to capture high-intent demand at the lowest cost.'
  },
  {
    title: 'ROAS Engineering',
    desc: 'Deep funnel tracking and real-time dashboards to ensure every rupee spent translates to measurable revenue.'
  },
  {
    title: 'Creative Intelligence',
    desc: 'Data-informed ad creatives designed to break the scroll and force engagement.'
  }
];

const faqs = [
  {
    q: 'How is performance marketing different from traditional advertising?',
    a: 'Traditional advertising focuses on broad reach. Performance marketing is highly measurable—you pay for specific actions like leads or sales, allowing us to track ROI down to the penny.'
  },
  {
    q: 'What ad platforms do you specialize in?',
    a: 'We dominate Meta (FB/IG) and Google (Search, PMax, YouTube). We also run specialized B2B campaigns on LinkedIn.'
  },
  {
    q: 'What is the minimum budget?',
    a: 'We generally recommend a minimum ad spend of ₹1.5L/month to allow for effective algorithmic learning and optimization.'
  }
];

export default function PerformanceMarketingPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* Editorial Hero */}
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <span className="label-sm block mb-10">[ Service Protocol 01 ]</span>
          <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 10vw, 11rem)' }}>
            Performance<br />
            <span className="text-[var(--muted-foreground)]">Marketing.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-tight font-medium max-w-xl">
              Stop burning money on trial and error. We build highly profitable advertising funnels designed for predictable revenue at scale.
            </p>
            <div className="label-sm uppercase tracking-[0.2em] opacity-50">
              ROI-First Strategy {'//'} Data Precision
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
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

      {/* FAQ */}
      <section className="py-24 md:py-40 px-6 md:px-10 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <span className="label-sm block mb-16 text-center">Intel / FAQ</span>
          <div className="space-y-1">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-[var(--border)] py-8 cursor-pointer">
                <summary className="flex items-center justify-between list-none">
                  <h4 className="text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter transition-all duration-300 group-hover:pl-4">
                    {faq.q}
                  </h4>
                  <ArrowRight size={24} className="transform group-open:rotate-90 transition-transform duration-500" />
                </summary>
                <div className="mt-8 text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl px-4 border-l-2 border-[var(--foreground)]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-56 px-6 md:px-10 text-center border-t border-[var(--border)]">
         <div className="max-w-5xl mx-auto">
            <span className="label-sm block mb-12">Growth Request</span>
            <h2 className="font-outfit font-black leading-[0.9] uppercase mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}>
              Scale Your<br />
              <span className="text-[var(--muted-foreground)]">Ad Spend.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
            >
              Request Audit <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
}

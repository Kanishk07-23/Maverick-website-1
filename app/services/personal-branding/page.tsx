import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Personal Branding for Founders | Maverick Digitals',
  description: 'Strategy, ghostwriting, and content systems for founders & creators to build authority and trust.',
};

const offerings = [
  {
    title: 'Ghostwriting',
    desc: 'Bespoke long-form content for LinkedIn and X that sounds exactly like you, only more refined.'
  },
  {
    title: 'Content Systems',
    desc: 'Scalable production engines that turn your raw ideas into a month of high-impact distribution.'
  },
  {
    title: 'Trust Architecture',
    desc: 'Strategic positioning that turns followers into high-ticket clients and B2B opportunities.'
  },
  {
    title: 'Network Expansion',
    desc: 'Aggressive growth tactics to place your profile in front of the world\'s most influential decision makers.'
  }
];

export default function PersonalBrandingPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <span className="label-sm block mb-10">[ Service Protocol 03 ]</span>
          <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(1.8rem, 8vw, 11rem)' }}>
            Personal<br />
            <span className="text-[var(--muted-foreground)]">Branding.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-tight font-medium max-w-xl">
              People buy from people. We scale your personal authority to open doors that traditional marketing cannot reach.
            </p>
            <div className="label-sm uppercase tracking-[0.2em] opacity-50">
              Authority Scaling {'//'} Content Ghostwriting
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
            <span className="label-sm block mb-12">Influence Request</span>
            <h2 className="font-outfit font-black leading-[0.9] uppercase mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 8vw, 10rem)' }}>
              Own Your<br />
              <span className="text-[var(--muted-foreground)]">Narrative.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
            >
              Scale Your Voice <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
}

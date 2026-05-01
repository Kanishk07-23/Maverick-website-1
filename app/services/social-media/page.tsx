import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Social Media Management Agency | Maverick Digitals',
  description: 'Done-for-you content, organic growth, and viral community hubs engineered for high-growth brands.',
};

const offerings = [
  {
    title: 'Content Production',
    desc: 'High-fidelity video and visual assets designed specifically to trigger platform algorithms and stop the scroll.'
  },
  {
    title: 'Community Scaling',
    desc: 'Proactive engagement strategies that turn passive followers into a loud, loyal army of brand advocates.'
  },
  {
    title: 'Platform Strategy',
    desc: 'Bespoke roadmaps for Instagram, LinkedIn, and X, ensuring your brand story is told correctly on every channel.'
  },
  {
    title: 'Viral Engineering',
    desc: 'Technical analysis of trending patterns to inject your brand into the cultural conversation with precision.'
  }
];

export default function SocialMediaPage() {
  return (
    <div className="">
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <span className="label-sm block mb-10">[ Service Protocol 05 ]</span>
          <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(1.8rem, 8vw, 11rem)' }}>
            Social<br />
            <span className="text-[var(--muted-foreground)]">Media.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-tight font-medium max-w-xl">
              Attention is the new currency. We build magnetic digital hubs that capture it, hold it, and convert it into brand equity.
            </p>
            <div className="label-sm uppercase tracking-[0.2em] opacity-50">
              Community Growth {'//'} Content Velocity
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
            {offerings.map((item, i) => (
              <div key={item.title} className=" p-12 md:p-20 group hover:bg-[var(--inverted-bg)] hover:text-[var(--inverted-text)] transition-colors duration-700">
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
            <span className="label-sm block mb-12">Social Request</span>
            <h2 className="font-outfit font-black leading-[0.9] uppercase mb-16 tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 8vw, 10rem)' }}>
              Capture the<br />
              <span className="text-[var(--muted-foreground)]">Spotlight.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-bold uppercase tracking-widest text-lg hover:scale-105 transition-transform btn-magnetic"
            >
              Start Creating <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
}

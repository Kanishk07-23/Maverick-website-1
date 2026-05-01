'use client';
import { Plus } from 'lucide-react';

const CLIENTS: Array<{
  id: string;
  name: string;
  logo?: string;
}> = [
  // { id: '1', name: 'Example Brand', logo: '/images/client-logo.png' },
];

export default function ClientsSection() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-24 md:py-32 bg-transparent border-t border-[var(--border)]" id="clients">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <span className="label-sm block mb-8">Client Ecosystem</span>
            <h2 className="font-outfit font-black text-[var(--foreground)] uppercase leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.04em' }}>
              Trusted by the<br />
              <span className="text-[var(--muted-foreground)]">Category Leaders.</span>
            </h2>
          </div>
          <div className="label-sm opacity-50 uppercase tracking-[0.2em] md:text-right">
            40+ Global Partnerships<br />
            India {'//'} UAE {'//'} USA {'//'} UK
          </div>
        </div>

        {CLIENTS.length === 0 ? (
          <div className="py-20 border border-dashed border-[var(--border)] flex flex-col items-center justify-center grayscale opacity-50">
             <Plus className="mb-4 opacity-20" size={32} />
             <p className="label-sm">No Active Partnerships Tracked</p>
          </div>
        ) : (
          <div className="relative overflow-hidden group">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--background)] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--background)] to-transparent" />

            <div className="flex animate-marquee whitespace-nowrap gap-12 md:gap-24 items-center">
              {doubled.map((c, i) => (
                <div key={`${c.id}-${i}`} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} className="h-10 md:h-12 w-auto object-contain" />
                  ) : (
                    <span className="font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter">{c.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

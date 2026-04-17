/* -------------------------------------------------------
   Client Logos Section — Admin-Fillable
   To add company logos, insert objects into the CLIENTS array:
     { id, name, logo }  (logo = path to /public/images/)
   -------------------------------------------------------*/
'use client';
import { Plus } from 'lucide-react';
import Reveal from '@/components/Reveal';

// =============================================
// ADMIN: ADD CLIENT LOGOS HERE
// =============================================
const CLIENTS: Array<{
  id: string;
  name: string;
  logo?: string; // path relative to /public, e.g. '/images/client-logo.png'
}> = [
  // Example (uncomment to use):
  // { id: '1', name: 'TechCorp', logo: '/images/client-techcorp.png' },
  // { id: '2', name: 'StartupXYZ', logo: '/images/client-startupxyz.png' },
];
// =============================================

const EMPTY_STATE = () => (
  <div className="flex flex-col items-center justify-center py-16 px-6 glass-card rounded-2xl border border-dashed border-border">
    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
      style={{ background: 'rgba(124,58,237,0.12)' }}>
      <Plus size={22} className="text-[var(--brand-purple)]" />
    </div>
    <p className="text-muted-foreground text-sm text-center max-w-xs">
      Client logos will appear here. Add entries to the <code className="text-[var(--brand-purple)]">CLIENTS</code> array in <code className="text-[var(--brand-purple)]">ClientsSection.tsx</code>.
    </p>
  </div>
);

export default function ClientsSection() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-20 relative border-y border-border" id="clients">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 text-muted-foreground mb-4">
              Trusted By
            </span>
            <h2 className="font-outfit font-bold text-foreground mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              Brands We&apos;ve Helped{' '}
              <span className="gradient-text">Scale</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              40+ companies across India, UAE, USA, UK & Australia
            </p>
          </div>
        </Reveal>

        {CLIENTS.length === 0 ? (
          <EMPTY_STATE />
        ) : (
          <div className="marquee-container relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
              style={{ background: 'linear-gradient(to right, var(--brand-dark), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10"
              style={{ background: 'linear-gradient(to left, var(--brand-dark), transparent)' }} />

            <div className="marquee-track">
              {doubled.map((c, i) => (
                <div
                  key={`${c.id}-${i}`}
                  className="flex-shrink-0 glass-card rounded-xl px-8 py-4 border border-border flex items-center gap-3 hover:border-purple-500/30 transition-colors"
                >
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} className="h-8 object-contain filter brightness-75 hover:brightness-100 transition-all" />
                  ) : (
                    <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">{c.name}</span>
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

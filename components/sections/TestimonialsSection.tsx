/* -------------------------------------------------------
   Testimonials Section — Admin-Fillable
   To add testimonials, insert objects into the TESTIMONIALS
   array below. Each object should have:
     { id, name, role, company, quote, rating, avatar }
   -------------------------------------------------------*/
'use client';
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// =============================================
// ADMIN: ADD TESTIMONIALS HERE
// =============================================
const TESTIMONIALS: Array<{
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar?: string;
}> = [
  // Example (remove the comment slashes below to activate):
  // {
  //   id: '1',
  //   name: 'Rajesh Kumar',
  //   role: 'CEO',
  //   company: 'TechCorp India',
  //   quote: 'Maverick Digitals transformed our online presence. Our revenue doubled in 6 months.',
  //   rating: 5,
  //   avatar: '/images/testimonial-1.jpg',
  // },
];
// =============================================

const EMPTY_STATE = () => (
  <div className="flex flex-col items-center justify-center py-24 px-6 glass-card rounded-3xl border border-border">
    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
      style={{ background: 'rgba(124,58,237,0.15)' }}>
      <Plus size={28} className="text-[var(--brand-purple)]" />
    </div>
    <h3 className="text-foreground font-outfit font-bold text-xl mb-2">Client Testimonials</h3>
    <p className="text-muted-foreground text-sm text-center max-w-xs">
      Testimonials from happy clients will appear here. Add entries to the <code className="text-[var(--brand-purple)]">TESTIMONIALS</code> array in <code className="text-[var(--brand-purple)]">TestimonialsSection.tsx</code>.
    </p>
  </div>
);

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="section-padding relative" id="testimonials">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 text-muted-foreground mb-4">
            Client Love
          </span>
          <h2 className="font-outfit font-bold text-foreground mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real words from real businesses we&apos;ve helped scale.
          </p>
        </div>

        {TESTIMONIALS.length === 0 ? (
          <EMPTY_STATE />
        ) : (
          <div className="relative">
            {/* Cards */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="min-w-full glass-card rounded-3xl p-10 md:p-14 border border-border"
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={18} fill="#7C3AED" className="text-purple-500" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground0 text-xl md:text-2xl leading-relaxed font-light mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      {t.avatar && (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                        />
                      )}
                      <div>
                        <div className="text-foreground font-semibold">{t.name}</div>
                        <div className="text-muted-foreground text-sm">{t.role} · {t.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            {TESTIMONIALS.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prev} className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-purple-500/50 border border-border transition-colors" id="testimonial-prev">
                  <ChevronLeft size={18} className="text-muted-foreground" />
                </button>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-purple-500 w-6' : 'bg-muted'}`}
                  />
                ))}
                <button onClick={next} className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-purple-500/50 border border-border transition-colors" id="testimonial-next">
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

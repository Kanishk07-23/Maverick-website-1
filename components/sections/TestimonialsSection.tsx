'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS: Array<{
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar?: string;
}> = [
  // {
  //   id: '1',
  //   name: 'Rajesh Kumar',
  //   role: 'CEO',
  //   company: 'TechCorp India',
  //   quote: 'Maverick Digitals transformed our online presence. Our revenue doubled in 6 months.',
  //   rating: 5,
  // },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-32 md:py-48 bg-transparent border-t border-[var(--border)] overflow-hidden" id="testimonials">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="mb-24 md:mb-32">
          <span className="label-sm block mb-8">Proof of Protocol</span>
          <h2 className="font-outfit font-black text-[var(--foreground)] gradient-heading uppercase leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em' }}>
            Voice of the<br />
            <span className="text-[var(--muted-foreground)]">Network.</span>
          </h2>
        </div>

        {TESTIMONIALS.length === 0 ? (
          <div className="py-32 border-t border-b border-[var(--border)] flex flex-col items-center justify-center grayscale opacity-40">
             <Plus className="mb-6 opacity-20" size={40} />
             <p className="label-sm uppercase tracking-[0.2em]">Intel Pending / No Verified Logs</p>
          </div>
        ) : (
          <div className="relative">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <blockquote className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.95] tracking-tighter"
                      style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
                      &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                    </blockquote>
                    
                    <div className="mt-12 flex items-center gap-6 border-t border-[var(--border)] pt-10">
                      <div>
                        <div className="font-outfit font-black text-2xl uppercase tracking-tighter text-[var(--foreground)]">
                          {TESTIMONIALS[current].name}
                        </div>
                        <div className="label-sm opacity-50 uppercase mt-2">
                          {TESTIMONIALS[current].role} {'//'} {TESTIMONIALS[current].company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-4 border-l border-[var(--border)] pl-12 hidden lg:flex">
                <button onClick={prev} className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--inverted-bg)] hover:text-[var(--inverted-text)] transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <div className="label-sm font-black py-4">
                  0{current + 1} / 0{TESTIMONIALS.length}
                </div>
                <button onClick={next} className="w-16 h-16 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--inverted-bg)] hover:text-[var(--inverted-text)] transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-6 mt-16 lg:hidden">
                <button onClick={prev} className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center">
                  <ChevronLeft size={20} />
                </button>
                <div className="label-sm font-black">
                  0{current + 1} / 0{TESTIMONIALS.length}
                </div>
                <button onClick={next} className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center">
                  <ChevronRight size={20} />
                </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

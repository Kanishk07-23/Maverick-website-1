'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type FormData = z.infer<typeof schema>;

export default function CTABanner() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // TODO: connect to backend / email service
    await new Promise((r) => setTimeout(r, 1000));
    console.log('CTA form submission:', data);
    setSubmitted(true);
  };

  return (
    <section className="section-padding relative overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.10) 100%)' }} />
      <div className="absolute inset-0 border-y border-purple-500/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />

      <Reveal direction="up" className="max-w-5xl mx-auto relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 shadow-sm mb-6">
          Let&apos;s Talk
        </span>

        <h2 className="font-outfit font-bold text-foreground mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          Ready to Grow Your{' '}
          <span className="gradient-text">Brand?</span>
        </h2>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 font-medium">
          Get a free digital marketing strategy consultation with our Mumbai-based team. We&apos;ll discuss how our SEO, performance marketing, and branding services can scale your business.
        </p>

        {/* Checklist */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {['Free 30-min strategy call', 'Custom growth roadmap', 'No commitment required'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
              <CheckCircle2 size={16} className="text-[var(--brand-purple)] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="glass-card rounded-2xl p-8 border border-green-500/20 flex flex-col items-center gap-3 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(34,197,94,0.15)' }}>
              <CheckCircle2 size={28} className="text-green-400" />
            </div>
            <h3 className="text-foreground font-semibold text-xl">Got it! We&apos;ll be in touch soon 🚀</h3>
            <p className="text-muted-foreground text-sm">Check your inbox — we usually reply within 24 hours.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card rounded-2xl p-6 border border-border/60 shadow-sm max-w-2xl mx-auto"
            id="cta-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  {...register('name')}
                  placeholder="Your Name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  id="cta-name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email Address"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  id="cta-email"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  {...register('phone')}
                  placeholder="Phone Number"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  id="cta-phone"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>
            <MagneticButton as="button" type="submit" disabled={isSubmitting} className="w-full">
              <span id="cta-submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group-hover:brightness-110" style={{ background: 'var(--gradient-brand)' }}>
                {isSubmitting ? 'Sending...' : 'Get Free Strategy Call'}
                {!isSubmitting && <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />}
              </span>
            </MagneticButton>
          </form>
        )}

        {/* Or contact directly */}
        <div className="mt-6 flex items-center justify-center gap-3 text-muted-foreground text-sm">
          <span>Or reach us directly at</span>
          <a href="mailto:maverickdigitals18@gmail.com"
            className="text-[var(--brand-purple)] hover:opacity-80 font-medium transition-opacity">
            maverickdigitals18@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}

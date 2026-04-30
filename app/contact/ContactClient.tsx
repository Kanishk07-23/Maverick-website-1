'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

const schema = z.object({
  fullName: z.string().min(2, 'Full name required').max(80),
  email: z.string().email('Valid email required').max(254),
  phone: z.string().min(7, 'Valid phone required').max(20),
  company: z.string().max(100).optional(),
  service: z.string().min(1, 'Please select a protocol'),
  message: z.string().min(20, 'Tell us more (min 20 chars)').max(2000),
  website: z.string().optional(),
});

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

type FormData = z.infer<typeof schema>;

const services = [
  'Personal Branding',
  'Social Media Management',
  'Website & App Development',
  'SEO & SEM',
  'Performance Marketing',
  'Branding & Strategy',
  'Not Sure Yet',
];

const roadmap = [
  { id: '01', title: 'Intake', desc: 'Protocol audit & data diving.' },
  { id: '02', title: 'Strategy', desc: 'Bespoke roadmap architecture.' },
  { id: '03', title: 'Execution', desc: 'Surgical deployment & scaling.' },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileExpired, setTurnstileExpired] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    if (!turnstileToken || turnstileExpired) {
      setSubmitError('Please wait for security verification.');
      turnstileRef.current?.reset();
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError('Transmission failed. Please try again or email us.');
    }
  };

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Editorial Header */}
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-sm block mb-10">[ Protocol Initialization ]</span>
            <h1 className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
                style={{ fontSize: 'clamp(3.5rem, 11vw, 13rem)' }}>
              Start the<br />
              <span className="text-[var(--muted-foreground)]">Uprising.</span>
            </h1>
          </motion.div>
          <div className="max-w-2xl border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-relaxed font-medium">
              Ready to scale? Connect with our strategic architects. No salespeople, no account managers. Just direct execution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Intel */}
          <div className="lg:col-span-4 border-r border-[var(--border)] pr-12 hidden lg:block">
            <div className="sticky top-40 space-y-24">
              <div>
                <span className="label-sm block mb-12">Operational Flow</span>
                <div className="space-y-12">
                  {roadmap.map((step) => (
                    <div key={step.id} className="group">
                      <div className="label-sm opacity-30 mb-4 group-hover:opacity-100 transition-opacity">[{step.id}]</div>
                      <h3 className="font-outfit font-black text-2xl uppercase tracking-tighter mb-2">{step.title}</h3>
                      <p className="label-sm opacity-50 uppercase">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-12 border-t border-[var(--border)]">
                 <span className="label-sm block mb-8">Direct Access</span>
                 <div className="space-y-4">
                    <p className="font-outfit font-black text-xl uppercase tracking-tighter">maverickdigitals18@gmail.com</p>
                    <p className="label-sm opacity-50 uppercase">Mumbai HQ // Global Operations</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Intake Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center border border-[var(--border)]">
                  <CheckCircle2 size={64} className="mx-auto mb-10 opacity-20" />
                  <h2 className="font-outfit font-black text-5xl uppercase tracking-tighter mb-6">Transmission Received</h2>
                  <p className="label-sm opacity-50 uppercase max-w-sm mx-auto">Strategic audit in progress. Response expected within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 md:space-y-20">
                  <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                    <div className="relative border-b border-[var(--border)] focus-within:border-[var(--foreground)] transition-colors">
                      <label className="label-sm opacity-50 uppercase mb-4 block">Identity</label>
                      <input {...register('fullName')} className="w-full bg-transparent py-4 font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter focus:outline-none placeholder:opacity-10" placeholder="John Wick" />
                    </div>
                    <div className="relative border-b border-[var(--border)] focus-within:border-[var(--foreground)] transition-colors">
                      <label className="label-sm opacity-50 uppercase mb-4 block">Node / Email</label>
                      <input {...register('email')} className="w-full bg-transparent py-4 font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter focus:outline-none placeholder:opacity-10" placeholder="john@wick.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                    <div className="relative border-b border-[var(--border)] focus-within:border-[var(--foreground)] transition-colors">
                      <label className="label-sm opacity-50 uppercase mb-4 block">Tactical / Phone</label>
                      <input {...register('phone')} className="w-full bg-transparent py-4 font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter focus:outline-none placeholder:opacity-10" placeholder="+91 XXX" />
                    </div>
                    <div className="relative border-b border-[var(--border)] focus-within:border-[var(--foreground)] transition-colors">
                      <label className="label-sm opacity-50 uppercase mb-4 block">Protocol Selection</label>
                      <select {...register('service')} className="w-full bg-transparent py-4 font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter focus:outline-none appearance-none cursor-pointer">
                        <option value="" className="bg-[var(--background)]">Select Protocol</option>
                        {services.map(s => <option key={s} value={s} className="bg-[var(--background)]">{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="relative border-b border-[var(--border)] focus-within:border-[var(--foreground)] transition-colors">
                    <label className="label-sm opacity-50 uppercase mb-4 block">Objective Description</label>
                    <textarea {...register('message')} rows={1} className="w-full bg-transparent py-4 font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter focus:outline-none placeholder:opacity-10 resize-none overflow-hidden" placeholder="Describe the Target..." />
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-4 text-red-500 label-sm uppercase font-black">
                      <AlertTriangle size={20} /> {submitError}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-4">
                      <ShieldCheck className="opacity-20" size={24} />
                      <Turnstile 
                        ref={turnstileRef} 
                        siteKey={TURNSTILE_SITE_KEY} 
                        onSuccess={setTurnstileToken} 
                        onExpire={() => setTurnstileToken(null)}
                        options={{ theme: 'auto', size: 'compact' }}
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full md:w-auto px-16 py-8 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] font-black uppercase tracking-widest text-xl hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Establish Connection'}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

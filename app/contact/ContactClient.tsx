'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Clock, CheckCircle2, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a protocol'),
  message: z.string().min(20, 'Tell us more (min 20 chars)'),
});

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
  { id: '02', title: 'Strategy', desc: 'Bespoke growth roadmap architecture.' },
  { id: '03', title: 'Execution', desc: 'Surgical deployment & scaling.' },
];

const faqs = [
  {
    q: 'How do we begin?',
    a: 'We start with a high-bandwidth strategy call to audit your current trajectory and identify leverage points.',
  },
  {
    q: 'What about ROI?',
    a: 'We only track business outcomes. Impressions are vanity; revenue is sanity.',
  },
  {
    q: 'Direct access?',
    a: 'Always. You communicate directly with the founders, not an intern or account manager.',
  },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Maverick Intake:', data);
    setSubmitted(true);
  };

  return (
    <div className="bg-[var(--background)] min-h-screen pt-32 pb-24 selection:bg-purple-500/30">
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Left Column: Asymmetrical Heading & Roadmap */}
        <div className="lg:col-span-5">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
           >
              <span className="font-semibold text-xs tracking-widest text-purple-500 uppercase mb-8 block">
                [ Intake Portal ]
              </span>
              <h1 className="font-outfit font-bold text-foreground leading-[0.9] mb-12"
                  style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', letterSpacing: '-0.04em' }}>
                Initiate<br />
                <span className="gradient-text">Protocol.</span>
              </h1>

              {/* The "Roadmap to Scale" - Bespoke visual */}
              <div className="space-y-12 relative">
                 <div className="absolute left-4 top-4 bottom-4 w-[1px] bg-border z-0" />
                 {roadmap.map((step, i) => (
                   <motion.div 
                    key={step.id}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="relative z-10 flex items-start gap-8 group"
                   >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs border transition-all duration-500 ${hoveredStep === i ? 'bg-purple-500 border-purple-500 text-white scale-125' : 'bg-[var(--background)] border-border text-muted-foreground'}`}>
                        {step.id}
                      </div>
                      <div>
                         <h3 className="font-outfit font-bold text-xl uppercase mb-1 group-hover:text-purple-500 transition-colors">{step.title}</h3>
                         <p className="text-muted-foreground text-sm max-w-[200px]">{step.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>

              {/* Unique contact accents */}
              <div className="mt-24 pt-12 border-t border-border">
                 <div className="flex flex-col gap-6 font-semibold text-xs uppercase tracking-widest text-muted-foreground">
                    <div className="flex items-center gap-4">
                       <Mail size={12} className="text-purple-500" /> maverickdigitals18@gmail.com
                    </div>
                    <div className="flex items-center gap-4">
                       <MapPin size={12} className="text-purple-500" /> Mumbai / Global
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Right Column: The "Intake Portal" Form */}
        <div className="lg:col-span-7">
           <AnimatePresence mode="wait">
             {submitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full flex flex-col items-center justify-center py-20 px-8 text-center bg-muted rounded-3xl border border-border"
               >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h2 className="font-outfit font-black text-4xl uppercase mb-4">Transmission Received</h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                    Strategic architects are auditing your request. Expect a response within 24 operational hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="font-semibold text-xs uppercase tracking-widest text-purple-500 hover:opacity-70 transition-opacity">
                    Send another transmission
                  </button>
               </motion.div>
             ) : (
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                     <Sparkles size={120} />
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10 text-foreground">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="group relative">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-purple-500">Identity</label>
                          <input {...register('fullName')} className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-purple-500 transition-colors font-medium placeholder:text-muted-foreground/30 px-0 rounded-none h-auto text-foreground" placeholder="John Wick" />
                          {errors.fullName && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.fullName.message}</span>}
                       </div>
                       <div className="group relative">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-purple-500">Transmission Node</label>
                          <input {...register('email')} className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-purple-500 transition-colors font-medium placeholder:text-muted-foreground/30 px-0 rounded-none h-auto text-foreground" placeholder="john@continental.com" />
                          {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.email.message}</span>}
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="group relative">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-purple-500">Tactical Direct</label>
                          <input {...register('phone')} className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-purple-500 transition-colors font-medium placeholder:text-muted-foreground/30 px-0 rounded-none h-auto text-foreground" placeholder="+91 XXXX XXXX" />
                          {errors.phone && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.phone.message}</span>}
                       </div>
                       <div className="group relative">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-purple-500">Organization</label>
                          <input {...register('company')} className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-purple-500 transition-colors font-medium placeholder:text-muted-foreground/30 px-0 rounded-none h-auto text-foreground" placeholder="Continental Inc." />
                       </div>
                    </div>

                    <div className="group relative">
                       <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-purple-500">Protocol Selection</label>
                       <select {...register('service')} className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-purple-500 transition-colors font-medium appearance-none cursor-pointer px-0 rounded-none h-auto text-foreground">
                          <option value="" className="text-foreground bg-background">Select Protocol...</option>
                          {services.map(s => <option key={s} value={s} className="text-foreground bg-background">{s}</option>)}
                       </select>
                    </div>

                    <div className="group relative">
                       <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block transition-colors group-focus-within:text-purple-500">Objective Description</label>
                       <textarea {...register('message')} rows={4} className="w-full bg-transparent border-b-2 border-border py-4 outline-none focus:border-purple-500 transition-colors font-medium resize-none placeholder:text-muted-foreground/30 px-0 rounded-none h-auto text-foreground" placeholder="Tell us about the target goal..." />
                       {errors.message && <span className="text-[10px] text-red-500 font-semibold mt-1 block">{errors.message.message}</span>}
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 rounded-2xl text-white font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[0.98] active:scale-95 transition-all disabled:opacity-50 mt-12 shadow-xl btn-magnetic"
                      style={{ background: 'var(--gradient-brand)' }}
                    >
                      {isSubmitting ? 'Transmitting...' : 'Establish Connection'}
                      <ChevronRight size={20} className="text-purple-500" />
                    </button>
                  </form>
               </motion.div>
             )}
           </AnimatePresence>

           {/* Magazine-Style FAQ Sidebar/Bottom section */}
           <div className="mt-20">
              <div className="grid md:grid-cols-3 gap-8">
                 {faqs.map(faq => (
                   <div key={faq.q} className="group cursor-default">
                      <h4 className="font-outfit font-bold text-foreground text-sm uppercase mb-3 flex items-center gap-2 group-hover:text-purple-500 transition-colors">
                         <span className="w-1 h-3 bg-purple-500 block" /> {faq.q}
                      </h4>
                      <p className="text-muted-foreground text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {faq.a}
                      </p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

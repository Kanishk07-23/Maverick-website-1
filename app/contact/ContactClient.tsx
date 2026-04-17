'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, MessageCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(20, 'Please tell us a bit more (min 20 characters)'),
});

type FormData = z.infer<typeof schema>;

const services = [
  'Personal Branding',
  'Social Media Management',
  'Website & App Development',
  'SEO & SEM',
  'Performance Marketing',
  'Branding & Strategy',
  'Multiple Services',
  'Not Sure Yet',
];

const faqs = [
  {
    q: 'How does Maverick Digitals approach a new client?',
    a: 'We begin with a free 30-minute strategy consultation to understand your business, goals, and current marketing situation. From there, we build a tailored roadmap — no templates, no generic packages.',
  },
  {
    q: 'What industries does Maverick Digitals specialize in?',
    a: 'We serve growth-focused businesses across e-commerce, SaaS, real estate, healthcare, finance, education, F&B, and fashion. Our frameworks adapt to your specific industry dynamics and audience behaviour.',
  },
  {
    q: 'How long before I see results from digital marketing?',
    a: 'Performance marketing (Meta/Google Ads) typically shows measurable results within 2–4 weeks. SEO takes 3–6 months for significant ranking improvements. Social media and personal branding build momentum over 60–90 days.',
  },
  {
    q: 'Do you offer monthly retainer contracts or project-based work?',
    a: 'We offer both. Most clients prefer monthly retainers for ongoing services like social media management and performance marketing. For web development or brand projects, we work on a fixed-scope project basis.',
  },
  {
    q: 'How is Maverick Digitals different from other agencies?',
    a: 'The founder-led model is our biggest differentiator. Muskan and Dhaval are directly involved in every account — you\'ll never be handed off to a junior team. We also measure success only by business outcomes, never vanity metrics.',
  },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Contact form:', data);
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-6">
              Get In Touch
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              Contact Our Digital{' '}
              <span className="gradient-text">Marketing Agency</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Ready to turn attention into revenue? Book your free digital marketing strategy consultation with our Mumbai team and discover
              exactly how Maverick Digitals can help your business scale.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="font-outfit font-bold text-foreground text-2xl mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="glass-card rounded-3xl p-12 border border-green-500/20 flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.15)' }}>
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-foreground font-outfit font-bold text-2xl">Message Received!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. We&apos;ll review your details and get back to you within 24 hours.
                  </p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-foreground text-sm font-semibold mt-2"
                    style={{ background: '#25D366' }}>
                    <MessageCircle size={16} />
                    Or chat on WhatsApp now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" id="contact-form">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-muted-foreground text-sm mb-1.5 block" htmlFor="contact-fullname">Full Name *</label>
                      <input {...register('fullName')} id="contact-fullname" placeholder="John Doe"
                        className={`form-input ${errors.fullName ? 'error' : ''}`} />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="text-muted-foreground text-sm mb-1.5 block" htmlFor="contact-email">Email Address *</label>
                      <input {...register('email')} type="email" id="contact-email" placeholder="john@company.com"
                        className={`form-input ${errors.email ? 'error' : ''}`} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-muted-foreground text-sm mb-1.5 block" htmlFor="contact-phone">Phone Number *</label>
                      <input {...register('phone')} id="contact-phone" placeholder="+91 98765 43210"
                        className={`form-input ${errors.phone ? 'error' : ''}`} />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="text-muted-foreground text-sm mb-1.5 block" htmlFor="contact-company">Company Name</label>
                      <input {...register('company')} id="contact-company" placeholder="Your Company"
                        className="form-input" />
                    </div>
                  </div>

                  <div>
                    <label className="text-muted-foreground text-sm mb-1.5 block" htmlFor="contact-service">Service Interested In *</label>
                    <select {...register('service')} id="contact-service"
                      className={`form-input ${errors.service ? 'error' : ''}`}>
                      <option value="" style={{ background: '#0F0F23' }}>Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: '#0F0F23' }}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  <div>
                    <label className="text-muted-foreground text-sm mb-1.5 block" htmlFor="contact-message">Tell Us About Your Project *</label>
                    <textarea {...register('message')} id="contact-message" rows={5}
                      placeholder="What are your goals? What's your current biggest marketing challenge? Any budget range in mind?"
                      className={`form-input resize-none ${errors.message ? 'error' : ''}`} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} id="contact-submit"
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-foreground transition-all hover:scale-[1.02] disabled:opacity-60"
                    style={{ background: 'var(--gradient-brand)' }}>
                    {isSubmitting ? 'Sending Your Message...' : 'Send Message & Book Strategy Call'}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Contact Info */}
              <div className="glass-card rounded-2xl p-6 border border-border">
                <h3 className="text-foreground font-outfit font-bold text-lg mb-5">Contact Info</h3>
                <div className="flex flex-col gap-4">
                  <a href="mailto:maverickdigitals18@gmail.com" id="contact-email-link"
                    className="flex items-start gap-3 group">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(124,58,237,0.15)' }}>
                      <Mail size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">Email</div>
                      <div className="text-foreground text-sm group-hover:text-purple-300 transition-colors">
                        maverickdigitals18@gmail.com
                      </div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(124,58,237,0.15)' }}>
                      <MapPin size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">Location</div>
                      <div className="text-foreground text-sm">Mumbai, Maharashtra, India</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(124,58,237,0.15)' }}>
                      <Clock size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-0.5">Response Time</div>
                      <div className="text-foreground text-sm">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210?text=Hi%20Maverick%20Digitals!%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp"
                className="glass-card rounded-2xl p-6 border border-green-500/20 flex items-center gap-4 hover:border-green-500/40 transition-all hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(37,211,102,0.15)' }}>
                  <MessageCircle size={22} className="text-green-400" />
                </div>
                <div>
                  <div className="text-foreground font-semibold text-sm">Chat on WhatsApp</div>
                  <div className="text-muted-foreground text-xs">Usually responds in minutes</div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground ml-auto" />
              </a>

              {/* Why Us Quick */}
              <div className="glass-card rounded-2xl p-6 border border-border">
                <h4 className="text-foreground font-semibold text-sm mb-4">Why Choose Maverick Digitals?</h4>
                <div className="flex flex-col gap-3">
                  {[
                    '15M+ organic views delivered',
                    '200%+ average ROI',
                    '40+ brands successfully scaled',
                    'Founder-led, direct involvement',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-muted-foreground text-xs">
                      <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: 'rgba(15,15,35,0.5)' }} id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-4">
              FAQ
            </span>
            <h2 className="font-outfit font-bold text-foreground text-3xl mb-4">
              Common{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                >
                  <span className="text-foreground font-medium text-sm leading-relaxed">{faq.q}</span>
                  <span className={`text-purple-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              name: 'Contact Maverick Digitals',
              description: 'Contact our digital marketing agency in Mumbai'
            }
          ]),
        }} />
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Smartphone, Monitor, Search, Target, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | Maverick Digitals',
  description:
    'Full-stack digital marketing agency in Mumbai. We offer personal branding, social media, web development, SEO/SEM, and performance marketing to scale your business.',
};

const services = [
  {
    id: 'personal-branding',
    icon: <Sparkles size={40} className="text-purple-400" />,
    title: 'Personal Branding',
    tagline: 'Strategy, ghostwriting, content systems for founders & creators',
    desc: "Build an undeniable online presence that attracts opportunities, builds trust, and converts followers into customers. We position you as the most trusted authority in your industry.",
    features: [
      'Brand Strategy Development & Positioning',
      'Content Creation & Long-form Ghostwriting',
      'Thought Leadership Content Calendar',
      'LinkedIn & X (Twitter) Growth Strategy',
      'Social Media Presence Audit & Optimization',
      'Personal Brand Style Guide',
    ],
    color: '#7C3AED',
    badge: 'Most Popular',
  },
  {
    id: 'social-media',
    icon: <Smartphone size={40} className="text-purple-400" />,
    title: 'Social Media Management',
    tagline: 'Done-for-you content, growth, and analytics across platforms',
    desc: 'Stop spending hours on social media with little to show for it. We create, publish and optimize content across all major platforms so you can focus on running your business.',
    features: [
      'Monthly Content Planning & Calendar',
      'Original Creative Content Production',
      'Community Management & Engagement',
      'Platform Growth Strategy',
      'Monthly Analytics & Performance Reporting',
      'Multi-Platform Scheduling & Publishing',
    ],
    color: '#6D28D9',
  },
  {
    id: 'web-dev',
    icon: <Monitor size={40} className="text-purple-400" />,
    title: 'Website & App Development',
    tagline: 'High-performance sites, e-commerce, and custom web apps',
    desc: "Your website is your 24/7 salesperson. We build fast, beautiful, conversion-optimized digital products that don't just look good — they generate revenue.",
    features: [
      'Custom Web Design & Development',
      'E-commerce Store (Shopify / Custom)',
      'Mobile App Development (iOS & Android)',
      'Performance Optimization & Core Web Vitals',
      'CMS Integration (Headless or Traditional)',
      'SEO-Ready Architecture',
    ],
    color: '#4F46E5',
  },
  {
    id: 'seo-sem',
    icon: <Search size={40} className="text-purple-400" />,
    title: 'SEO & SEM',
    tagline: 'Keyword strategy, optimization, Google Ads, and inbound lead engines',
    desc: 'Get found when your customers are searching. Our technical SEO and search advertising strategies drive qualified traffic that converts into real revenue.',
    features: [
      'Technical SEO Audit & Remediation',
      'Keyword Research & Competitive Analysis',
      'On-Page & Off-Page Optimization',
      'Google Ads Campaign Management',
      'Local SEO Optimization & GBP Setup',
      'Monthly Ranking & Traffic Reports',
    ],
    color: '#2563EB',
  },
  {
    id: 'performance-marketing',
    icon: <Target size={40} className="text-purple-400" />,
    title: 'Performance Marketing',
    tagline: 'ROI-first Meta & Google campaigns with funnel-driven execution',
    desc: 'Stop guessing and start knowing your ROAS. We build data-driven paid advertising campaigns with clear targeting, compelling creatives, and relentless optimization.',
    features: [
      'Meta Ads (Facebook & Instagram) Management',
      'Google Ads (Search, Display, YouTube)',
      'Full-Funnel Strategy & Audience Targeting',
      'Ad Creative & Copywriting',
      'Conversion Rate Optimization (CRO)',
      'Real-Time ROI Tracking & Dashboards',
    ],
    color: '#1D4ED8',
  },
  {
    id: 'branding-strategy',
    icon: <Palette size={40} className="text-purple-400" />,
    title: 'Branding & Strategy',
    tagline: 'Identity, messaging, GTM launches, and positioning frameworks',
    desc: 'Your brand is more than a logo. We build complete brand identities — from visual design and messaging to go-to-market strategy — that create lasting impressions.',
    features: [
      'Brand Identity Design (Logo, Colors, Typography)',
      'Messaging Framework & Brand Voice',
      'Go-to-Market (GTM) Launch Strategy',
      'Competitive Positioning Framework',
      'Brand Style & Usage Guidelines',
      'Rebranding & Brand Refresh',
    ],
    color: '#7C3AED',
  },
];

const process = [
  { step: '01', title: 'Discover', desc: 'Deep-dive into your brand, goals, market, and competition.' },
  { step: '02', title: 'Strategize', desc: 'Build a tailored growth roadmap with clear KPIs and milestones.' },
  { step: '03', title: 'Create', desc: 'Produce high-quality assets, content and campaigns.' },
  { step: '04', title: 'Execute', desc: 'Launch with precision across channels — on time, every time.' },
  { step: '05', title: 'Scale', desc: 'Analyze, optimize and double down on what\'s working.' },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-6">
              What We Do
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              End-to-End{' '}
              <span className="gradient-text">Digital Solutions</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Six specialized service pillars designed to work individually or as a fully integrated growth system.
              Every service is delivered with a founder-led, performance-first mindset.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-16">
            {services.map((s, idx) => (
              <div
                key={s.id}
                id={`service-${s.id}`}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Copy */}
                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                  {s.badge && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-foreground mb-4"
                      style={{ background: 'var(--gradient-brand)' }}>
                      {s.badge}
                    </span>
                  )}
                  <div className="mb-4">{s.icon}</div>
                  <h2 className="font-outfit font-bold text-foreground text-3xl mb-2">{s.title}</h2>
                  <p className="text-purple-400 text-sm font-medium mb-4">{s.tagline}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/services/${s.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-foreground transition-all hover:scale-105"
                      style={{ background: 'var(--gradient-brand)' }}
                    >
                      View Service <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Feature card */}
                <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div
                    className="glass-card rounded-2xl p-8 border"
                    style={{ borderColor: `${s.color}30` }}
                  >
                    <h3 className="text-foreground font-semibold text-lg mb-5">What&apos;s Included</h3>
                    <div className="flex flex-col gap-3">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                          <span className="text-muted-foreground text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding" style={{ background: 'rgba(15,15,35,0.6)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-4">
              How We Work
            </span>
            <h2 className="font-outfit font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Our 5-Step{' '}
              <span className="gradient-text">Growth Process</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-20 hidden md:block" />
            {process.map((p) => (
              <div key={p.step} className="flex-1 glass-card rounded-2xl p-6 border border-border text-center relative">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-outfit font-bold text-lg text-foreground"
                  style={{ background: 'var(--gradient-brand)' }}
                >
                  {p.step}
                </div>
                <h3 className="text-foreground font-outfit font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-outfit font-bold text-foreground text-4xl mb-4">
            Ready to Discuss Your{' '}
            <span className="gradient-text">Project?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Book a free 30-minute strategy consultation with our founders.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground hover:scale-105 transition-all shadow-[var(--premium-shadow)]"
            style={{ background: 'var(--gradient-brand)' }}
          >
            Book Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Maverick Digitals Services',
              itemListElement: services.map((s, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: s.title,
                description: s.desc,
                url: `https://www.maverickdigitals.co.in/services/${s.id}`
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.maverickdigitals.co.in/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Services',
                  item: 'https://www.maverickdigitals.co.in/services'
                }
              ]
            }
          ]),
        }}
      />
    </div>
  );
}

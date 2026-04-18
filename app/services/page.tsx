import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesList from '@/components/sections/ServicesList';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | Maverick Digitals',
  description:
    'Full-stack digital marketing agency in Mumbai. We offer personal branding, social media, web development, SEO/SEM, and performance marketing to scale your business.',
};

const services = [
  {
    id: 'personal-branding',
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
    title: 'Website & App Development',
    tagline: 'High-performance sites, e-commerce, and custom web apps',
    desc: "Your website is your 24/7 salesperson. We build fast, beautiful, conversion-optimized digital products that don&apos;t just look good — they generate revenue.",
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

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 mb-6">
              What We Do
            </span>
            <h1 className="font-outfit font-black text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}>
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

      {/* Services — interactive accordion list */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ServicesList services={services} />
        </div>
      </section>

      <ProcessSection />

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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all"
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

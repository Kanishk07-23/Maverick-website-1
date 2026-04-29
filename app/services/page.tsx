import type { Metadata } from 'next';
import Link from 'next/link';
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
    tagline: 'Strategy, ghostwriting, content systems for founders',
    desc: "Build an undeniable online presence that attracts opportunities, builds trust, and converts followers into customers. We position you as the most trusted authority in your industry.",
    features: [
      'Brand Strategy Development & Positioning',
      'Content Creation & Long-form Ghostwriting',
      'Thought Leadership Content Calendar',
      'LinkedIn & X (Twitter) Growth Strategy',
      'Social Media Presence Audit & Optimization',
      'Personal Brand Style Guide',
    ],
    color: '#000000',
    badge: 'Popular',
  },
  {
    id: 'social-media',
    title: 'Social Media',
    tagline: 'Done-for-you content, growth, and analytics',
    desc: 'Stop spending hours on social media with little to show for it. We create, publish and optimize content across all major platforms so you can focus on running your business.',
    features: [
      'Monthly Content Planning & Calendar',
      'Original Creative Content Production',
      'Community Management & Engagement',
      'Platform Growth Strategy',
      'Monthly Analytics & Performance Reporting',
      'Multi-Platform Scheduling & Publishing',
    ],
    color: '#000000',
  },
  {
    id: 'web-dev',
    title: 'Web & App Dev',
    tagline: 'High-performance sites and custom web apps',
    desc: "Your website is your 24/7 salesperson. We build fast, beautiful, conversion-optimized digital products that don't just look good — they generate revenue.",
    features: [
      'Custom Web Design & Development',
      'E-commerce Store (Shopify / Custom)',
      'Mobile App Development (iOS & Android)',
      'Performance Optimization & Core Web Vitals',
      'CMS Integration (Headless or Traditional)',
      'SEO-Ready Architecture',
    ],
    color: '#000000',
  },
  {
    id: 'seo-sem',
    title: 'SEO & SEM',
    tagline: 'Search optimization and inbound lead engines',
    desc: 'Get found when your customers are searching. Our technical SEO and search advertising strategies drive qualified traffic that converts into real revenue.',
    features: [
      'Technical SEO Audit & Remediation',
      'Keyword Research & Competitive Analysis',
      'On-Page & Off-Page Optimization',
      'Google Ads Campaign Management',
      'Local SEO Optimization & GBP Setup',
      'Monthly Ranking & Traffic Reports',
    ],
    color: '#000000',
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    tagline: 'ROI-first Meta & Google campaigns',
    desc: 'Stop guessing and start knowing your ROAS. We build data-driven paid advertising campaigns with clear targeting, compelling creatives, and relentless optimization.',
    features: [
      'Meta Ads (Facebook & Instagram) Management',
      'Google Ads (Search, Display, YouTube)',
      'Full-Funnel Strategy & Audience Targeting',
      'Ad Creative & Copywriting',
      'Conversion Rate Optimization (CRO)',
      'Real-Time ROI Tracking & Dashboards',
    ],
    color: '#000000',
  },
  {
    id: 'branding-strategy',
    title: 'Brand Identity',
    tagline: 'Visual messaging, GTM launches, and positioning',
    desc: 'Your brand is more than a logo. We build complete brand identities — from visual design and messaging to go-to-market strategy — that create lasting impressions.',
    features: [
      'Brand Identity Design (Logo, Colors, Typography)',
      'Messaging Framework & Brand Voice',
      'Go-to-Market (GTM) Launch Strategy',
      'Competitive Positioning Framework',
      'Brand Style & Usage Guidelines',
      'Rebranding & Brand Refresh',
    ],
    color: '#000000',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* Editorial Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 relative overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-5xl">
            <span className="label-sm block mb-8">Capabilities</span>
            <h1 className="font-outfit font-black text-[var(--foreground)] uppercase"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '-0.04em', lineHeight: 0.9 }}>
              Engineering<br />
              <span className="text-[var(--muted-foreground)]">Growth.</span>
            </h1>
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-8 md:gap-24 border-t border-[var(--border)] pt-10">
              <p className="text-[var(--muted-foreground)] text-lg md:text-xl leading-relaxed flex-1 font-medium">
                Six specialized service pillars designed to work individually or as a fully integrated growth system.
                Zero fluff. Just aggressive execution.
              </p>
              <div className="flex-1 flex items-start gap-4 text-sm font-bold text-[var(--foreground)] uppercase tracking-widest">
                [ Protocol Active ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — Brutalist 3D Carousel */}
      <section className="relative overflow-visible bg-[var(--background)]">
        <ServicesList services={services} />
      </section>

      <ProcessSection />

      {/* Massive CTA */}
      <section className="py-32 md:py-48 text-center border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center">
          <span className="label-sm mb-10">Next Steps</span>
          <h2 className="font-outfit font-black text-[var(--foreground)] uppercase mb-16"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.04em', lineHeight: 0.9 }}>
            Initiate<br />
            <span className="text-[var(--muted-foreground)]">Protocol.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-base font-semibold text-white btn-magnetic"
            style={{ background: 'var(--foreground)', color: 'var(--background)' }}
          >
            Book Free Strategy Call →
          </Link>
        </div>
      </section>
    </div>
  );
}

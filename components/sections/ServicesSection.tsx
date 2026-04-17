'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Reveal from '@/components/Reveal';

const services = [
  {
    id: 'personal-branding',
    icon: '✨',
    title: 'Personal Branding',
    tagline: 'Build authority. Command attention.',
    desc: 'Strategy, ghostwriting, content systems for founders & creators who want to become the most trusted voice in their industry.',
    features: [
      'Brand Strategy Development',
      'Content Creation & Ghostwriting',
      'Thought Leadership Positioning',
      'Social Media Presence',
    ],
    color: '#7C3AED',
  },
  {
    id: 'social-media',
    icon: '📱',
    title: 'Social Media Management',
    tagline: 'Done-for-you growth across platforms.',
    desc: 'Content planning, creation, community management and analytics — we handle it all, end to end, while you focus on running your business.',
    features: ['Content Planning & Creation', 'Community Management', 'Growth Strategy', 'Analytics & Reporting'],
    color: '#6D28D9',
  },
  {
    id: 'web-dev',
    icon: '💻',
    title: 'Website & App Development',
    tagline: 'High-performance digital products.',
    desc: 'Custom websites, e-commerce platforms and mobile apps engineered for speed, conversion and scale.',
    features: ['Custom Web Development', 'E-commerce Solutions', 'Mobile App Development', 'Performance Optimization'],
    color: '#4F46E5',
  },
  {
    id: 'seo-sem',
    icon: '🔍',
    title: 'SEO & SEM',
    tagline: 'Dominate search results.',
    desc: 'Keyword strategy, technical SEO, Google Ads and local SEO that turns search intent into qualified leads and consistent revenue.',
    features: ['Technical SEO Audit', 'Keyword Research & Strategy', 'Google Ads Management', 'Local SEO Optimization'],
    color: '#2563EB',
  },
  {
    id: 'performance-marketing',
    icon: '🎯',
    title: 'Performance Marketing',
    tagline: 'ROI-first campaigns, always.',
    desc: 'Meta & Google advertising with funnel-driven execution designed to maximise ROAS and deliver predictable, scalable revenue.',
    features: ['Meta Ads Management', 'Google Ads Campaigns', 'Conversion Optimization', 'ROI Tracking & Analysis'],
    color: '#1D4ED8',
  },
  {
    id: 'branding-strategy',
    icon: '🎨',
    title: 'Branding & Strategy',
    tagline: 'Positioning that wins markets.',
    desc: 'Brand identity, messaging frameworks, go-to-market launches and positioning strategies that make your brand impossible to ignore.',
    features: ['Brand Identity Design', 'Messaging Framework', 'Go-to-Market Strategy', 'Brand Guidelines'],
    color: '#7C3AED',
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Link
      href={`/services/${service.id}`}
      className="service-card h-72 cursor-pointer block"
      id={`service-card-${service.id}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: '1000px' }}
    >
      <div className={`service-card-inner w-full h-full rounded-2xl ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front */}
        <div className="service-card-front glass-card rounded-2xl p-6 flex flex-col border border-border hover:border-purple-500/30 transition-colors">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
            style={{ background: `${service.color}22` }}
          >
            {service.icon}
          </div>
          <h3 className="text-foreground font-outfit font-bold text-xl mb-2">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.tagline}</p>
          <div className="mt-auto flex items-center gap-1.5 text-[var(--brand-purple)] text-sm font-medium">
            <span>Learn more</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Back */}
        <div
          className="service-card-back rounded-2xl p-6 flex flex-col border"
          style={{
            background: `linear-gradient(135deg, ${service.color}20, ${service.color}0A)`,
            borderColor: `${service.color}40`,
          }}
        >
          <h3 className="text-foreground font-outfit font-bold text-lg mb-3">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
          <ul className="flex flex-col gap-1.5 mt-auto">
            {service.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground text-xs">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: service.color }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section className="section-padding" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--brand-purple)] glass-card border border-border/40 text-muted-foreground mb-4">
              What We Do
            </span>
            <h2 className="font-outfit font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Growth-Focused{' '}
              <span className="gradient-text">Digital Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Designed to scale your business profitably and sustainably — hover any card to explore.
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s, idx) => (
            <Reveal key={s.id} delay={0.1 * idx}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            id="services-view-all"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground glass-card border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:scale-105"
          >
            Explore All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

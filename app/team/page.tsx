'use client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Linkedin, Mail, Target, Brain, Users, Zap } from 'lucide-react';
import { useState } from 'react';

const founders = [
  {
    id: 'muskan',
    name: 'Muskan Rathod',
    role: 'Founder',
    bio: 'Brand strategist & growth marketer, expert in storytelling, personal branding, and scaling businesses with digital-first positioning. Muskan brings the creative side — she understands consumer psychology deeply and translates it into campaigns that convert.',
    specialties: ['Brand Strategy', 'Content Creation', 'Growth Marketing', 'Personal Branding', 'Storytelling'],
    email: 'maverickdigitals18@gmail.com',
    linkedin: '#',
    color: '#7C3AED',
    img: 'https://www.maverickdigitals.co.in/founder-muskan.jpg',
  },
  {
    id: 'dhaval',
    name: 'Dhaval Shah',
    role: 'Co-Founder',
    bio: 'Tech innovator with 5+ years in scalable web and app development, specializing in building conversion-optimized digital platforms. Dhaval architects the technical backbone that makes performance marketing campaigns truly scale.',
    specialties: ['Web Development', 'App Development', 'Technical SEO', 'Performance Optimization', 'Conversion Rate Optimization'],
    email: 'maverickdigitals18@gmail.com',
    linkedin: '#',
    color: '#2563EB',
    img: 'https://www.maverickdigitals.co.in/founder-dhaval.jpg',
  },
];

const values = [
  { icon: <Target size={32} />, title: 'Performance-Driven', desc: 'Measurable results over vanity metrics, always.' },
  { icon: <Brain size={32} />, title: 'Data-Informed', desc: 'Every decision backed by analytics and insights.' },
  { icon: <Users size={32} />, title: 'Founder-Led', desc: 'Senior attention on every single project.' },
  { icon: <Zap size={32} />, title: 'End-to-End', desc: 'One team. Complete capability.' },
];

function FounderCard({ founder }: { founder: typeof founders[0] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on touch devices to save processing power and avoid jitter
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease',
      }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-border hover:border-purple-500/20 cursor-default"
      id={`founder-${founder.id}`}
    >
      {/* Photo */}
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2"
        style={{ borderColor: `${founder.color}40` }}>
        <div
          className="w-full h-full flex items-center justify-center text-4xl font-outfit font-bold text-foreground"
          style={{ background: `linear-gradient(135deg, ${founder.color}40, ${founder.color}20)` }}
        >
          {founder.name[0]}
        </div>
      </div>

      {/* Info */}
      <div className="mb-1">
        <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ color: founder.color, background: `${founder.color}15` }}>
          {founder.role}
        </span>
      </div>
      <h3 className="font-outfit font-bold text-foreground text-2xl mt-3 mb-3">{founder.name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{founder.bio}</p>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-6">
        {founder.specialties.map((s) => (
          <span key={s} className="text-xs px-2.5 py-1 rounded-full text-muted-foreground glass-card border border-border">
            {s}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <a href={`mailto:${founder.email}`} id={`founder-${founder.id}-email`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-muted-foreground0 transition-colors">
          <Mail size={15} /> Email
        </a>
        <a href={founder.linkedin} id={`founder-${founder.id}-linkedin`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-muted-foreground0 transition-colors">
          <Linkedin size={15} /> LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-6">
              The Team
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              Visionary Leaders,{' '}
              <span className="gradient-text">Real Results</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              The people behind Maverick Digitals. A lean, high-output team combining strategic expertise with technical
              innovation — and always directly involved in your success.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-outfit font-bold text-foreground mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}>
              Meet the{' '}
              <span className="gradient-text">Founders</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              At Maverick Digitals, the founders are directly involved in every project. No account managers.
              No middlemen. Just experts with skin in the game.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f) => (
              <FounderCard key={f.id} founder={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'rgba(15,15,35,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit font-bold text-foreground text-3xl mb-4">
              The Maverick{' '}
              <span className="gradient-text">Promise</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              These aren&apos;t just values on a slide — they&apos;re the operating principles that define how we work every day.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title}
                className="glass-card rounded-2xl p-6 border border-border hover:border-purple-500/30 transition-all hover:scale-[1.03] text-center">
                <div className="text-purple-400 flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-foreground font-outfit font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-outfit font-bold text-foreground text-4xl mb-4">
            Work With{' '}
            <span className="gradient-text">Our Founders</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get direct access to Muskan and Dhaval on your very first call.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-foreground hover:scale-105 transition-all shadow-[var(--premium-shadow)]"
            style={{ background: 'var(--gradient-brand)' }}>
            Book a Strategy Call <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(founders.map(f => ({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: f.name,
          jobTitle: f.role,
          worksFor: { '@type': 'Organization', name: 'Maverick Digitals' },
          email: f.email,
        }))),
      }} />
    </div>
  );
}

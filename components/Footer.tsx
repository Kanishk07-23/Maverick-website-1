'use client';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { label: 'Personal Branding', href: '/services/personal-branding' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'Web Development', href: '/services/web-dev' },
  { label: 'SEO & SEM', href: '/services/seo-sem' },
  { label: 'Performance', href: '/services/performance-marketing' },
  { label: 'Identity', href: '/services/branding-strategy' },
];

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Big Footer Brand */}
        <div className="mb-48">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
            <div>
              <Link href="/" className="flex items-center gap-4 group mb-12">
                <div className="w-10 h-10 relative transition-transform duration-500 group-hover:rotate-12">
                  <Image
                    src="/assets/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain dark:invert"
                    priority
                  />
                </div>
                <span className="font-outfit font-black text-white text-sm tracking-[0.3em] uppercase">
                  Maverick
                </span>
              </Link>
              <h2 className="font-outfit font-black text-white uppercase leading-none tracking-tighter"
                  style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}>
                THE FUTURE<br />
                <span className="text-[var(--brand-purple)]">IS MAVERICK.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-24 py-24 border-t border-white/5">
          <div className="col-span-2 lg:col-span-1">
             <span className="label-sm block mb-8 opacity-40 uppercase tracking-widest">Connect</span>
             <a href="mailto:maverickdigitals18@gmail.com" className="font-outfit font-black text-2xl uppercase tracking-tighter text-white hover:text-[var(--brand-purple)] transition-colors">
                maverickdigitals18@gmail.com
             </a>
             <div className="mt-8 flex gap-6">
                {['LinkedIn', 'Instagram', 'Twitter'].map(s => (
                  <a key={s} href="#" className="label-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest text-[10px]">{s}</a>
                ))}
             </div>
          </div>

          <div className="hidden lg:block">
            <span className="label-sm block mb-8 opacity-40 uppercase tracking-widest">Capabilities</span>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="label-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-[0.2em] text-[10px]">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <span className="label-sm block mb-8 opacity-40 uppercase tracking-widest">Navigation</span>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="label-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-[0.2em] text-[10px]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1 lg:text-right">
            <span className="label-sm block mb-8 opacity-40 uppercase tracking-widest">HQ</span>
            <p className="label-sm text-white/60 leading-relaxed uppercase tracking-widest text-[10px]">
              Mumbai, India<br />
              Global Operations<br />
              Digital Excellence
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="label-sm opacity-20 uppercase tracking-[0.3em] text-[8px]">
            © {year} Maverick Digitals Network // All Protocols Reserved
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms'].map(t => (
              <span key={t} className="label-sm opacity-20 uppercase tracking-[0.3em] text-[8px] cursor-pointer hover:opacity-100 transition-opacity">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

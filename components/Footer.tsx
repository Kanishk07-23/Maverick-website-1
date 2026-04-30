'use client';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  { label: 'Personal Branding', href: '/services/personal-branding' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'Web Development', href: '/services/web-dev' },
  { label: 'SEO & SEM', href: '/services/seo-sem' },
  { label: 'Performance Marketing', href: '/services/performance-marketing' },
  { label: 'Branding & Strategy', href: '/services/branding-strategy' },
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
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Big Footer Brand */}
        <div className="mb-24 md:mb-40">
           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
              <div>
                <Link href="/" className="flex items-center gap-4 group mb-10">
                  <div className="w-12 h-12 relative transition-transform duration-500 group-hover:rotate-12">
                    <Image
                      src="/assets/logo.png"
                      alt="Maverick Digitals Logo"
                      fill
                      className="object-contain dark:invert"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-outfit font-black text-[var(--foreground)] text-xl tracking-tighter uppercase leading-none">
                      Maverick
                    </span>
                    <span className="label-sm opacity-50 text-xs uppercase tracking-[0.2em] leading-none mt-1">
                      Digitals
                    </span>
                  </div>
                </Link>
                <h2 className="font-outfit font-black text-[var(--foreground)] uppercase leading-none tracking-tighter"
                    style={{ fontSize: 'clamp(3rem, 10vw, 11rem)', lineHeight: 0.85 }}>
                  Let&apos;s Build<br />
                  <span className="text-[var(--muted-foreground)]">Legends.</span>
                </h2>
              </div>
              <div className="flex flex-col md:items-end gap-6">
                <Link
                  href="/contact"
                  className="px-10 py-5 rounded-full bg-[var(--inverted-bg)] text-[var(--inverted-text)] label-sm font-black uppercase tracking-widest hover:scale-105 transition-transform btn-magnetic"
                >
                  Initiate Project →
                </Link>
                <div className="label-sm opacity-50 uppercase text-right hidden md:block">
                  Mumbai {'//'} Global HQ<br />
                  Growth Protocols Active
                </div>
              </div>
           </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 border-t border-[var(--border)] pt-16">
          <div className="col-span-2 md:col-span-4">
             <span className="label-sm block mb-8 opacity-50 uppercase">Network Intake</span>
             <a href="mailto:maverickdigitals18@gmail.com" className="font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter hover:text-[var(--muted-foreground)] transition-colors break-words">
                maverickdigitals18@gmail.com
             </a>
             <div className="mt-8 flex gap-4">
                {['LinkedIn', 'Instagram', 'Twitter'].map(s => (
                  <a key={s} href="#" className="label-sm opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest">{s}</a>
                ))}
             </div>
          </div>

          <div className="md:col-span-3">
            <span className="label-sm block mb-8 opacity-50 uppercase">Services</span>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="label-sm opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <span className="label-sm block mb-8 opacity-50 uppercase">Navigation</span>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="label-sm opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:text-right">
            <span className="label-sm block mb-8 opacity-50 uppercase">Regional Nodes</span>
            <ul className="space-y-4">
              {['India HQ', 'UAE Operations', 'USA Strategic', 'UK / EU Hub', 'Australia'].map((c) => (
                <li key={c} className="label-sm opacity-50 uppercase tracking-widest">{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="label-sm opacity-30 uppercase tracking-[0.2em]">
            © {year} Maverick Digitals Network
          </p>
          <div className="flex gap-12">
            <span className="label-sm opacity-30 uppercase tracking-[0.2em]">Privacy Protocol</span>
            <span className="label-sm opacity-30 uppercase tracking-[0.2em]">Terms of Engagement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

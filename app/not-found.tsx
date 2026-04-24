import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * not-found.tsx — Custom 404 page.
 *
 * Security note: Default Next.js 404 pages expose framework version info.
 * This page shows nothing about the server environment.
 */
export const metadata: Metadata = {
  title: '404 — Page Not Found | Maverick Digitals',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
      <div className="max-w-lg w-full text-center">

        {/* Large 404 number */}
        <p
          className="font-outfit font-black text-border select-none pointer-events-none"
          style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', lineHeight: 1, letterSpacing: '-0.06em' }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="-mt-8 relative z-10">
          <h1
            className="font-outfit font-black text-foreground mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
          >
            Page not found.
          </h1>
          <p className="text-muted-foreground text-base mb-10 max-w-sm mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[0.97] active:scale-95 shadow-lg"
              style={{ background: 'var(--gradient-brand)' }}
            >
              Take me home
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-border text-foreground hover:bg-muted transition-all"
            >
              Contact us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

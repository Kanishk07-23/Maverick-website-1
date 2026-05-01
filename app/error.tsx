'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * error.tsx — Caught error boundary for the app directory.
 *
 * Security note: This page intentionally shows NO technical details
 * about the error (no stack traces, no error messages, no component paths).
 * All error information is logged server-side only.
 *
 * 'use client' is required by Next.js for error boundaries.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the actual error server-side (not exposed to the browser)
    // In production you would pipe this to an observability service (Sentry, etc.)
    console.error('[App Error]', error.digest ?? 'no-digest');
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center  px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={36} className="text-red-500" />
        </div>

        {/* Heading */}
        <h1
          className="font-outfit font-black text-foreground mb-4 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}
        >
          Something went{' '}
          <span className="gradient-text">wrong.</span>
        </h1>

        {/* Safe description — no technical details */}
        <p className="text-muted-foreground text-base mb-10 max-w-xs mx-auto leading-relaxed">
          An unexpected error occurred. Our team has been notified.
          {error.digest ? (
            <span className="block mt-2 font-mono text-xs text-muted-foreground/50">
              Ref: {error.digest}
            </span>
          ) : null}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[0.97] active:scale-95 shadow-lg"
            style={{ background: 'var(--gradient-brand)' }}
          >
            <RefreshCw size={15} />
            Try again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border text-foreground hover:bg-muted transition-all"
          >
            <ArrowLeft size={15} />
            Go home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

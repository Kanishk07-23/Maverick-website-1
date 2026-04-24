'use client';

import { motion } from 'framer-motion';
import { AlertOctagon, ArrowLeft, RefreshCw } from 'lucide-react';

/**
 * global-error.tsx — Root-level error boundary.
 *
 * This catches errors in the root layout itself (e.g., ThemeProvider crash).
 * It must render a full HTML document because the root layout is unavailable.
 * Security: No error details exposed. Digest-only reference.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Error — Maverick Digitals</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          fontFamily: 'system-ui, sans-serif',
          color: '#fafafa',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 400, textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
            }}
          >
            <AlertOctagon size={32} color="#ef4444" />
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 16px' }}>
            Critical Error
          </h1>
          <p style={{ color: '#71717a', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            A critical system error occurred. Our team has been notified.
            {error.digest && (
              <span style={{ display: 'block', marginTop: 8, fontSize: 11, fontFamily: 'monospace', color: '#52525b' }}>
                Ref: {error.digest}
              </span>
            )}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 12,
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                border: 'none', cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 12,
                border: '1px solid #27272a', color: '#fafafa',
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

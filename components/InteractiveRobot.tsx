'use client';

import { useState, useEffect } from 'react';

/**
 * InteractiveRobot — Spline 3D Robot via iframe embed.
 *
 * WHY IFRAME instead of @splinetool/react-spline?
 * ────────────────────────────────────────────────
 * 1. The React Spline component creates a WebGL canvas + Web Workers in-process.
 *    Next.js middleware (security headers, CSP) and Vercel's edge runtime block
 *    the worker blob: URLs and WASM fetches, causing silent failures (infinite spinner)
 *    or full-page crashes ("Context Lost").
 *
 * 2. Spline's own viewer (my.spline.design) hosts the WebGL context on THEIR origin,
 *    completely bypassing our CSP, middleware, and CORS restrictions.
 *
 * 3. The iframe is sandboxed: if Spline's WebGL crashes on a weak device, the main
 *    page is 100% unaffected. Zero crash risk for the parent website.
 *
 * This is the same approach used by production sites like Framer, Linear, etc.
 */

export default function InteractiveRobot() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full min-h-[400px] relative flex items-center justify-center overflow-hidden bg-transparent">
      {/* Loading spinner — shown until the iframe fires onLoad */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <iframe
        src="https://my.spline.design/kZDDjO5HuC9GJUM2/"
        frameBorder="0"
        width="100%"
        height="100%"
        style={{
          border: 'none',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
        title="Maverick 3D Robot"
        allow="autoplay; fullscreen"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

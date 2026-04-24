/** @type {import('next').NextConfig} */

// ---------------------------------------------------------------------------
// Security Headers — Maverick Digitals
// ---------------------------------------------------------------------------
// Sources allowed per directive:
//   'self'                           → same-origin assets only
//   fonts.googleapis.com             → Google Fonts CSS
//   fonts.gstatic.com                → Google Fonts font files
//   grainy-gradients…                → noise.svg overlay (ContactClient)
//   challenges.cloudflare.com        → Cloudflare Turnstile script + iframe
//   data:                            → Three.js / WebGL data URIs
//   blob:                            → Three.js worker blobs
//   'unsafe-inline' (style)          → Framer Motion / Tailwind runtime styles
//                                      (removing this breaks animations)
//
// NOTE: 'unsafe-eval' is intentionally EXCLUDED from script-src.
//       Three.js / Framer Motion / GSAP do not require eval().
// ---------------------------------------------------------------------------

const isDev = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://www.maverickdigitals.co.in https://grainy-gradients.vercel.app;
  media-src 'self';
  connect-src 'self' https://challenges.cloudflare.com ${isDev ? 'ws://localhost:* wss://localhost:*' : ''};
  worker-src 'self' blob:;
  frame-src https://challenges.cloudflare.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\n/g, ' ')
  .trim();

const securityHeaders = [
  // Prevent MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Block framing from any origin (clickjacking prevention)
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Force full referrer stripping on cross-origin requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict browser features — deny anything not required
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'interest-cohort=()',
    ].join(', '),
  },
  // XSS filter (legacy IE/Edge — harmless on modern browsers)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // HSTS — enforce HTTPS for 2 years, include subdomains, allow preloading
  // This is also enforced in middleware.ts at the Vercel edge
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Cross-Origin-Opener-Policy — isolates the browsing context from other origins
  // Prevents cross-origin windows from accessing window references (Spectre mitigation)
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  // Cross-Origin-Resource-Policy — prevents other origins from reading our resources
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-site',
  },
  // Disable DNS prefetching — prevents browsers from leaking visited links via DNS
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'off',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
];

const nextConfig = {
  reactStrictMode: true,
  // Remove the X-Powered-By: Next.js header — stops advertising the tech stack
  poweredByHeader: false,
  images: {
    domains: ['www.maverickdigitals.co.in'],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;

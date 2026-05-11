/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

// ---------------------------------------------------------------------------
// Security Headers — Maverick Digitals
// Fixed for Three.js / WebGL Vercel compatibility:
//   - COOP changed from 'same-origin' → 'same-origin-allow-popups'
//     (same-origin broke WebGL SharedArrayBuffer + cross-origin navigation on Vercel)
//   - CORP changed from 'same-site' → 'cross-origin'
//     (same-site blocked Three.js worker blobs loaded from different sub-origins)
//   - blob: added to connect-src and media-src (Three.js worker blobs)
//   - images.remotePatterns replaces deprecated images.domains
// ---------------------------------------------------------------------------
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://challenges.cloudflare.com https://unpkg.com https://prod.spline.design;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://www.maverickdigitals.co.in https://prod.spline.design https://unpkg.com https://raw.githubusercontent.com https://raw.githack.com;
  media-src 'self' blob:;
  connect-src 'self' https://challenges.cloudflare.com https://prod.spline.design https://unpkg.com https://raw.githubusercontent.com https://raw.githack.com https://fonts.gstatic.com https://fonts.googleapis.com blob: ${isDev ? 'ws://localhost:* wss://localhost:*' : ''};
  worker-src 'self' blob: https://unpkg.com https://prod.spline.design;
  frame-src https://challenges.cloudflare.com https://my.spline.design https://prod.spline.design;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\n/g, ' ')
  .trim();

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
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
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // 'same-origin-allow-popups' is safe and doesn't break WebGL or Three.js
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  // 'cross-origin' required for Three.js worker blob: loading
  { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // remotePatterns replaces deprecated `domains` array (Next.js 14+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.maverickdigitals.co.in',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  transpilePackages: ['three'],
  // Optimize large package imports for tree-shaking
  modularizeImports: {
    'lucide-react': { transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}' },
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Long-lived cache for immutable static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

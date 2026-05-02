import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ---------------------------------------------------------------------------
// Edge Security Middleware — Maverick Digitals
// Runs before any route handler at Vercel's edge network.
// ---------------------------------------------------------------------------

// ── 1. BLOCKED PATHS ────────────────────────────────────────────────────────
// Common vulnerability scanner and automated attack targets.
// Blocking these at the edge costs zero Lambda invocations.
const BLOCKED_PATH_PATTERNS: RegExp[] = [
  // WordPress probes
  /\/wp-(?:admin|login|content|includes|json|cron|config)/i,
  // Environment & config file leakage
  /\/\.env/i,
  /\/\.git\//i,
  // PHP exploits
  /\/phpMyAdmin/i,
  /\/phpmyadmin/i,
  /\.php$/i,
  // Shell/config leakage
  /\/\.htaccess/i,
  /\/\.htpasswd/i,
  /\/\.bash_history/i,
  /\/{3,}/,             // path traversal with multiple slashes
  /\.\.\//,            // directory traversal
  // Admin panel probes
  /\/admin(?:\/|$)/i,
  /\/administrator(?:\/|$)/i,
  /\/cgi-bin/i,
  // Common exploit kits
  /\/xmlrpc\.php/i,
  /\/eval-stdin\.php/i,
  /\/vendor\/phpunit/i,
  // Config file probes
  /\/config(?:\.yml|\.json|\.xml|\.ini|\.php)/i,
  // AWS metadata credential theft
  /\/latest\/meta-data/i,
];

// ── 2. BLOCKED USER-AGENTS ───────────────────────────────────────────────────
// Vulnerability scanners, credential stuffing tools, and headless attack bots.
// Legitimate crawlers (Googlebot, Bingbot) are NOT on this list.
const BLOCKED_UA_PATTERNS: RegExp[] = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /nuclei/i,
  /dirbuster/i,
  /gobuster/i,
  /ffuf/i,
  /wfuzz/i,
  /burpsuite/i,
  /owasp/i,
  /acunetix/i,
  /nessus/i,
  /openvas/i,
  /w3af/i,
  /havij/i,
  /hydra/i,
  /python-requests\/[01]\./i, // old python-requests — common in script attacks
  /curl\/[0-6]\./i,           // very old curl — often automated attack scripts
  /scrapy/i,
  /mechanize/i,
  /libwww-perl/i,
];

// ── 3. ALLOWED HTTP METHODS ───────────────────────────────────────────────────
const ALLOWED_METHODS = new Set(['GET', 'POST', 'HEAD', 'OPTIONS']);

// ── 4. ALLOWED ORIGINS FOR API ROUTES ────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://www.maverickdigitals.co.in',
  'https://maverickdigitals.co.in',
  // Allow local dev
  ...(process.env.NODE_ENV === 'development'
    ? ['http://localhost:3000', 'http://127.0.0.1:3000']
    : []),
]);

// ---------------------------------------------------------------------------
// HELPER — Return a terse 403 without leaking server details
// ---------------------------------------------------------------------------
function forbidden() {
  return new NextResponse(null, {
    status: 403,
    headers: {
      'Content-Type': 'text/plain',
      // Never hint at WHY we blocked — attackers adapt based on error messages
      'X-Blocked': '1',
    },
  });
}

// ---------------------------------------------------------------------------
// MAIN MIDDLEWARE
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();
  const ua = request.headers.get('user-agent') ?? '';

  // ── Block suspicious / attack paths ─────────────────────────────────────
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      console.warn(`[Security] Blocked path probe: ${pathname}`);
      return forbidden();
    }
  }

  // ── Block known scanner / exploit User-Agents ────────────────────────────
  /*
  if (!ua || ua.trim() === '') {
    // Zero-UA is almost exclusively automated traffic.
    // Exception: allow Next.js internal prefetch requests (no UA).
    if (!request.headers.get('next-router-prefetch')) {
      console.warn(`[Security] Blocked empty User-Agent on: ${pathname}`);
      return forbidden();
    }
  }
  */

  for (const pattern of BLOCKED_UA_PATTERNS) {
    if (pattern.test(ua)) {
      console.warn(`[Security] Blocked scanner UA: ${ua.slice(0, 80)}`);
      return forbidden();
    }
  }

  // ── Restrict HTTP methods globally ───────────────────────────────────────
  if (!ALLOWED_METHODS.has(method)) {
    return new NextResponse(null, {
      status: 405,
      headers: { Allow: 'GET, POST, HEAD, OPTIONS' },
    });
  }

  // ── Validate Origin on all /api/* requests ───────────────────────────────
  // Browsers always send Origin on cross-origin POSTs.
  // A POST to our API with NO Origin header is a direct scripted request.
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');

    if (method === 'POST' && !origin) {
      console.warn(`[Security] Blocked API POST with no Origin: ${pathname}`);
      return forbidden();
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      console.warn(`[Security] Blocked disallowed origin "${origin}" on ${pathname}`);
      return new NextResponse(null, { status: 403 });
    }
  }

  // ── Pass request through + add HSTS ─────────────────────────────────────
  const response = NextResponse.next();

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload',
    );
  }

  return response;
}

export const config = {
  // Run on all paths except Next.js asset internals and public static files
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|splinecode|glb|gltf|woff2?|ttf|eot|xml|txt)$).*)'],
};

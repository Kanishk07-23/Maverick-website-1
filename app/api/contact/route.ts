import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// 1. SERVER-SIDE SCHEMA — Re-validate everything. Never trust the client.
//    The client schema (ContactClient.tsx) is UX-only. This is the real gate.
// ---------------------------------------------------------------------------
const ContactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name too short')
    .max(80, 'Full name too long')
    .regex(/^[^\<\>\{\}\[\]\\\/\|\^\*\+=\$#@!~`"%&;:?]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Invalid email')
    .max(254, 'Email too long') // RFC 5321 limit
    .toLowerCase(),
  phone: z
    .string()
    .min(7, 'Phone too short')
    .max(20, 'Phone too long')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Phone contains invalid characters'),
  company: z
    .string()
    .max(100, 'Company name too long')
    .optional()
    .or(z.literal('')),
  service: z.enum([
    'Personal Branding',
    'Social Media Management',
    'Website & App Development',
    'SEO & SEM',
    'Performance Marketing',
    'Branding & Strategy',
    'Not Sure Yet',
  ]),
  message: z
    .string()
    .min(20, 'Message too short')
    .max(2000, 'Message too long'),
  // Honeypot field — must be empty. Bots fill all fields; humans leave this blank.
  website: z.string().max(0, 'Bot detected').optional(),
  // Cloudflare Turnstile challenge token — verified server-side
  turnstileToken: z.string().min(1, 'Missing challenge token'),
});

// ---------------------------------------------------------------------------
// 2. IN-MEMORY RATE LIMITER — Sliding window, zero dependencies
//    Limits: 3 submissions per IP per 15 minutes (sufficient for any human).
//    On Vercel (serverless), each function instance holds its own store.
//    This is intentional: stateless per-instance rate limiting is still
//    highly effective against naive bots. For distributed limiting, we'd
//    need Upstash Redis (recommended next step).
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3;

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const entry = rateLimitStore.get(ip) ?? { timestamps: [] };

  // Purge timestamps outside the current window (sliding window)
  entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

  if (entry.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestInWindow = entry.timestamps[0];
    const retryAfterMs = oldestInWindow + RATE_LIMIT_WINDOW_MS - now;
    rateLimitStore.set(ip, entry);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  entry.timestamps.push(now);
  rateLimitStore.set(ip, entry);
  return { allowed: true, retryAfterSeconds: 0 };
}

// Prune stale IPs every 500 requests to prevent memory bloat
let requestCount = 0;
function pruneRateLimitStore() {
  requestCount++;
  if (requestCount % 500 === 0) {
    const windowStart = Date.now() - RATE_LIMIT_WINDOW_MS;
    for (const [ip, entry] of rateLimitStore.entries()) {
      if (entry.timestamps.every((ts) => ts <= windowStart)) {
        rateLimitStore.delete(ip);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 3. CLOUDFLARE TURNSTILE VERIFICATION
//    Every form submission must include a valid Turnstile token.
//    The token is a short-lived cryptographic proof from Cloudflare's servers
//    that the request came from a real browser solving a challenge.
//    Set TURNSTILE_SECRET_KEY in .env.local (never use the public site key here).
// ---------------------------------------------------------------------------
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If the secret key is not configured, skip verification in dev mode
  // but always enforce in production.
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Turnstile] TURNSTILE_SECRET_KEY is not set in production!');
      return false;
    }
    console.warn('[Turnstile] Secret key not set — skipping verification in dev.');
    return true;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    formData.append('remoteip', ip); // Binds token to the submitting IP

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body: formData },
    );

    if (!res.ok) {
      console.error('[Turnstile] Siteverify HTTP error:', res.status);
      return false;
    }

    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };

    if (!data.success) {
      console.warn('[Turnstile] Token invalid. Error codes:', data['error-codes']);
    }

    return data.success === true;
  } catch (err) {
    console.error('[Turnstile] Verification request failed:', err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// 3. IP EXTRACTION — Handles Vercel, Cloudflare, and direct server proxies.
// ---------------------------------------------------------------------------
function getClientIp(request: NextRequest): string {
  // Vercel injects the real IP here
  const vercelIp = request.headers.get('x-real-ip');
  if (vercelIp) return vercelIp;

  // Cloudflare
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;

  // Standard proxy chain — take the first (original) IP only
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }

  // Fallback — unknown
  return 'unknown';
}

// ---------------------------------------------------------------------------
// 4. SANITIZATION — Strip HTML tags and null bytes from all string values
//    to prevent stored XSS if data is ever rendered in an admin panel.
// ---------------------------------------------------------------------------
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')        // strip HTML tags
    .replace(/\0/g, '')             // strip null bytes
    .replace(/[\r\n]{3,}/g, '\n\n') // collapse excessive newlines
    .trim();
}

// ---------------------------------------------------------------------------
// 5. EMAIL TRANSPORT — Nodemailer via Gmail SMTP (App Password)
//    Set these in your .env.local (never commit them):
//      SMTP_USER=maverickdigitals18@gmail.com
//      SMTP_PASS=<16-char Gmail App Password>
//      CONTACT_RECIPIENT=maverickdigitals18@gmail.com
// ---------------------------------------------------------------------------
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Reject connections to servers with invalid certs
    tls: { rejectUnauthorized: true },
  });
}

// ---------------------------------------------------------------------------
// 6. ROUTE HANDLER
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  pruneRateLimitStore();

  // ── Rate Limiting ────────────────────────────────────────────────────────
  const clientIp = getClientIp(request);
  const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSeconds),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
          'X-RateLimit-Window': '900', // 15 minutes in seconds
        },
      },
    );
  }

  // ── Parse Body ───────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  // ── Server-side Validation ───────────────────────────────────────────────
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    // Return field-level errors so the client can display them
    return NextResponse.json(
      { error: 'Validation failed.', fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { fullName, email, phone, company, service, message, website } = parsed.data;

  // ── Honeypot Check ───────────────────────────────────────────────────────
  // `website` is a hidden field rendered in the form. Real users never fill it.
  if (website && website.length > 0) {
    // Silently return 200 so bots don't know they were caught.
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Cloudflare Turnstile Verification ───────────────────────────────────
  // This is the cryptographic wall. Even if a bot passes every other check,
  // it cannot forge a valid Turnstile token without solving Cloudflare's
  // browser challenge (JS execution, fingerprinting, behavioral signals).
  const turnstileValid = await verifyTurnstileToken(parsed.data.turnstileToken, clientIp);
  if (!turnstileValid) {
    return NextResponse.json(
      { error: 'Challenge verification failed. Please refresh and try again.' },
      { status: 400 },
    );
  }

  // ── Content Sanitization ─────────────────────────────────────────────────
  const safeData = {
    fullName: sanitize(fullName),
    email: sanitize(email),
    phone: sanitize(phone),
    company: company ? sanitize(company) : 'N/A',
    service,
    message: sanitize(message),
  };

  // ── Send Email ───────────────────────────────────────────────────────────
  // Only attempt if SMTP credentials are configured (avoids crashing in dev).
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Maverick Digitals Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECIPIENT ?? process.env.SMTP_USER,
        replyTo: safeData.email,
        subject: `[New Lead] ${safeData.service} — ${safeData.fullName}`,
        text: [
          `Name:     ${safeData.fullName}`,
          `Email:    ${safeData.email}`,
          `Phone:    ${safeData.phone}`,
          `Company:  ${safeData.company}`,
          `Service:  ${safeData.service}`,
          ``,
          `Message:`,
          safeData.message,
        ].join('\n'),
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
            <h2 style="margin:0 0 20px;color:#7c3aed;">New Lead — Maverick Digitals</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:90px;">Name</td><td style="padding:8px 0;font-weight:600;">${safeData.fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;">${safeData.email}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;font-weight:600;">${safeData.phone}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Company</td><td style="padding:8px 0;font-weight:600;">${safeData.company}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:8px 0;"><span style="background:#7c3aed;color:#fff;padding:2px 10px;border-radius:999px;font-size:12px;">${safeData.service}</span></td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safeData.message}</div>
          </div>
        `,
      });
    } catch (err) {
      // Log server-side but don't expose SMTP details to the client
      console.error('[Contact API] SMTP error:', err);
      return NextResponse.json(
        { error: 'Failed to send message. Please try emailing us directly.' },
        { status: 500 },
      );
    }
  } else {
    // Dev mode — log to console instead of sending email
    console.log('[Contact API] SMTP not configured. Form data:', safeData);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}

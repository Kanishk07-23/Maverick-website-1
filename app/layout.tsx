import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CustomCursor from '@/components/CustomCursor';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maverickdigitals.co.in'),
  title: {
    default: 'Maverick Digitals — Digital Marketing Agency Mumbai',
    template: '%s | Maverick Digitals',
  },
  description:
    'Maverick Digitals is a performance-driven digital marketing agency in Mumbai. SEO, paid media, social, branding — we build revenue engines.',
  keywords: [
    'digital marketing agency Mumbai',
    'performance marketing India',
    'SEO agency Mumbai',
    'social media management',
    'brand strategy',
  ],
  openGraph: {
    title: 'Maverick Digitals | Turn Attention Into Revenue',
    description: 'Mumbai-based full-stack digital marketing agency.',
    url: 'https://www.maverickdigitals.co.in',
    siteName: 'Maverick Digitals',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maverick Digitals | Turn Attention Into Revenue',
    description: '15M+ organic views. 200%+ average ROI.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={sora.variable}>
      <body>
        <CustomCursor />
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

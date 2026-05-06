import type { Metadata } from 'next';
import { Sora, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import ThemeProvider from '@/components/ThemeProvider';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';


const sora = Sora({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maverickdigitals.co.in'),
  title: {
    default: 'Digital Marketing Agency in Mumbai | Maverick Digitals',
    template: '%s | Maverick Digitals',
  },
  description:
    'Maverick Digitals is a premier digital marketing agency in Mumbai, India. We help ambitious brands scale through SEO, performance marketing, social media, and web development. 200%+ average ROI.',
  keywords: [
    'digital marketing agency Mumbai',
    'digital marketing company India',
    'performance marketing agency',
    'SEO agency Mumbai',
    'social media management Mumbai',
    'personal branding agency',
    'web development company Mumbai',
    'brand strategy consultant',
    'Maverick Digitals',
  ],
  openGraph: {
    title: 'Maverick Digitals | Turn Attention Into Revenue',
    description:
      'A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.',
    url: 'https://www.maverickdigitals.co.in',
    siteName: 'Maverick Digitals',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maverick Digitals — Turn Attention Into Revenue',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maverick Digitals | Turn Attention Into Revenue',
    description: 'Mumbai-based digital marketing agency. 15M+ organic views. 200%+ average ROI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuroraBackground>
            <ScrollProgress />
            <CustomCursor />
            <SmoothScrollProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppWidget />
              <BackToTop />
            </SmoothScrollProvider>
          </AuroraBackground>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Maverick Digitals',
                url: 'https://www.maverickdigitals.co.in',
                logo: 'https://www.maverickdigitals.co.in/assets/logo.png',
                contactPoint: {
                  '@type': 'ContactPoint',
                  email: 'maverickdigitals18@gmail.com',
                  contactType: 'customer service',
                },
                sameAs: [
                  'https://www.linkedin.com/company/maverick-digitals',
                  'https://www.instagram.com/maverickdigitals'
                ]
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Maverick Digitals',
                image: 'https://www.maverickdigitals.co.in/assets/logo.png',
                '@id': 'https://www.maverickdigitals.co.in',
                url: 'https://www.maverickdigitals.co.in',
                telephone: '+919619818332',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Mumbai',
                  addressLocality: 'Mumbai',
                  addressRegion: 'MH',
                  postalCode: '400001',
                  addressCountry: 'IN',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 19.0760,
                  longitude: 72.8777
                },
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday'
                  ],
                  opens: '10:00',
                  closes: '19:00'
                }
              }
            ]),
          }}
        />
      </body>
    </html>
  );
}

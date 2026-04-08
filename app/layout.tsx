import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    default: 'Maverick Digitals | Turn Attention Into Revenue',
    template: '%s | Maverick Digitals',
  },
  description:
    'Maverick Digitals is a Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution. 15M+ organic views. 200%+ average ROI.',
  keywords: [
    'digital marketing agency Mumbai',
    'performance marketing',
    'SEO agency India',
    'social media management',
    'personal branding',
    'web development agency',
    'brand strategy',
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
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
        </SmoothScrollProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mumbai',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN',
              },
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}

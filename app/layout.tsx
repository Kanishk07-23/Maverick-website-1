import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Component as EtheralShadow } from "@/components/ui/etheral-shadow";
import { GlassFilter } from "@/components/ui/liquid-glass";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://maverickdigitals.com"),
  title: "Maverick Digitals | Creative Tech & Performance Agency",
  description: "We build digital experiences that convert. Maverick Digitals is a premium agency specializing in Brand Strategy, UI/UX Design, Web Development, and Performance Growth.",
  keywords: ["Digital Agency", "Web Development", "UI/UX Design", "Performance Marketing", "SEO", "Brand Strategy", "Maverick Digitals"],
  authors: [{ name: "Maverick Digitals" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maverickdigitals.com",
    title: "Maverick Digitals | We Build Digital Experiences That Convert",
    description: "Premium digital agency for UI/UX Design, Development, and Growth.",
    siteName: "Maverick Digitals",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maverick Digitals Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maverick Digitals",
    description: "We build digital experiences that convert.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Maverick Digitals",
              url: "https://maverickdigitals.com",
              logo: "https://maverickdigitals.com/logo.png",
              image: "https://maverickdigitals.com/og-image.jpg",
              description: "We build digital experiences that convert. Maverick Digitals specializes in UI/UX Design, Web Development, SEO, and Performance Marketing.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressCountry: "IN",
              },
              priceRange: "$$",
              sameAs: [
                "https://twitter.com/maverickdigitals",
                "https://linkedin.com/company/maverickdigitals"
              ]
            }),
          }}
        />
        {/* Fixed background — stays behind all content */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <EtheralShadow
            color="rgba(250, 250, 250, 1)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* Page content above the background */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          <GlassFilter />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}

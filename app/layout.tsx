import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

import { GlassFilter } from "@/components/ui/liquid-glass";
import { ShadowOverlay } from "@/components/ui/shadow-overlay";

export const metadata: Metadata = {
  title: "Maverick Digitals | Full-Stack Digital Marketing Agency",
  description: "A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900 antialiased" style={{ background: 'transparent' }}>
        <div style={{ minHeight: '100vh', background: 'transparent' }}>
          <ShadowOverlay color="#f1f5f9" />
          <GlassFilter />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}

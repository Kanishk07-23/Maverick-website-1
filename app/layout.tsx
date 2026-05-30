import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

import { GlassFilter } from "@/components/ui/liquid-glass";
import { Component as EtheralShadow } from "@/components/ui/etheral-shadow";

export const metadata: Metadata = {
  title: "Maverick Digitals | Full-Stack Digital Marketing Agency",
  description: "A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900 antialiased" style={{ background: 'transparent' }}>
        <div style={{ minHeight: '100vh', background: 'transparent' }}>
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
            <EtheralShadow 
              color="rgba(128, 128, 128, 1)"
              animation={{ scale: 100, speed: 90 }}
              noise={{ opacity: 1, scale: 1.2 }}
              sizing="fill"
            />
          </div>
          <GlassFilter />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}

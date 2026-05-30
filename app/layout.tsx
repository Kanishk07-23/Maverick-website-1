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
      <body className="antialiased">
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

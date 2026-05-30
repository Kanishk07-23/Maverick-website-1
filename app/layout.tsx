import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { Component } from "@/components/ui/etheral-shadow";

export const metadata: Metadata = {
  title: "Maverick Digitals | Full-Stack Digital Marketing Agency",
  description: "A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Background — fixed, fills full viewport, sits behind everything */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
          }}
        >
          <Component
            color="rgba(128, 128, 128, 1)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* Page content — sits above the background */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          <GlassFilter />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}

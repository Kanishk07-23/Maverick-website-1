import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { Component } from "@/components/ui/etheral-shadow";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Maverick Digitals | Full-Stack Digital Marketing Agency",
  description: "A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">

        {/* Background layer — fixed, covers full viewport */}
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
          <Component
            color="rgba(128, 128, 128, 1)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
          />
        </div>

        {/* Content layer — sits above the background */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          <GlassFilter />
          <Navigation />
          {children}
        </div>

      </body>
    </html>
  );
}

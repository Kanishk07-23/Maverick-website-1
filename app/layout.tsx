import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { MeshGradientBackground } from "@/components/ui/mesh-gradient-background";

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
          <MeshGradientBackground />
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

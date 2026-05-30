import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { GlassFilter } from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: "Maverick Digitals | Full-Stack Digital Marketing Agency",
  description: "A Mumbai-based full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GlassFilter />
        <Navigation />
        {children}
      </body>
    </html>
  );
}

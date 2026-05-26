"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/liquid-glass";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ProcessSection } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const } 
  }),
};

const Slogan = () => {
  const text = "We Build Digital Experiences That Convert.";
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 14, stiffness: 100 },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter text-gray-900 leading-[1.05] mb-6 md:mb-8 max-w-5xl px-4"
    >
      {words.map((word, index) => (
        <motion.span variants={child} className="mr-[0.25em] pb-2" key={index}>
          {word === "Convert." ? <span className="brand-gradient-text">{word}</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
};



const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const serviceImages = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80", alt: "Personal Branding" },
  { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80", alt: "Social Media" },
  { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80", alt: "App Development" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", alt: "SEO & SEM" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80", alt: "Performance Ads" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80", alt: "Brand Strategy" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80", alt: "Analytics & Growth" },
  { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80", alt: "Content Marketing" },
  { src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80", alt: "Creative Direction" },
  { src: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80", alt: "Campaign Strategy" },
];

export default function HomePage() {
  return (
    <InfiniteGrid>
      <main className="overflow-x-hidden">
        {/* ─── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 text-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center">


          <Slogan />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14 font-medium tracking-tight px-4"
          >
            A full-stack digital marketing agency helping ambitious brands scale through high-conversion strategy, immersive storytelling, and flawless execution.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <GlassButton href="/services" className="w-full sm:w-auto">
              <span className="flex items-center gap-2 text-lg text-gray-900 group-hover:translate-x-1 transition-transform">
                See Our Work <ArrowRight className="w-5 h-5" />
              </span>
            </GlassButton>
            <GlassButton href="/contact" className="w-full sm:w-auto">
              <span className="text-lg">
                Book a Call
              </span>
            </GlassButton>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES STRIP ────────────────────────────── */}
      <PortfolioGallery
        title="Services Built for Growth"
        archiveButton={{ text: "View all services", href: "/services" }}
        images={serviceImages}
        maxHeight={100}
        spacing="-space-x-64 md:-space-x-72"
      />



      {/* ─── PROCESS ────────────────────────────────────── */}
      <ProcessSection />

      {/* ─── TESTIMONIALS ──────────────────────────────── */}
      <TestimonialsSection />

      {/* ─── CTA ────────────────────────────────────────── */}
      <CtaSection />


      {/* ─── FOOTER ────────────────────────────────────── */}
      <footer className="border-t border-gray-200/60 py-16 relative z-10 bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Maverick Digitals Logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <nav className="flex gap-8 text-sm font-semibold text-gray-500">
            {links.map((l) => (
              <Link key={l.path} href={l.path} className="hover:text-gray-900 transition-colors cursor-pointer">{l.name}</Link>
            ))}
          </nav>
          <p className="text-sm font-medium text-gray-400">© 2026 Maverick Digitals. All rights reserved.</p>
        </div>
      </footer>
      </main>
    </InfiniteGrid>
  );
}

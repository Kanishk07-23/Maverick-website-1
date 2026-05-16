"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { Card, CardContent } from "@/components/ui/card";
import { GlassButton } from "@/components/ui/liquid-glass";
import { TestimonialsSection } from "@/components/sections/testimonials";
import Link from "next/link";

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
      className="flex flex-wrap justify-center text-6xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter text-gray-900 leading-[1.05] mb-8 max-w-5xl"
    >
      {words.map((word, index) => (
        <motion.span variants={child} className="mr-[0.25em] pb-2" key={index}>
          {word === "Convert." ? <span className="brand-gradient-text">{word}</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "CEO, NovaTech",
    body: "Maverick rebuilt our entire digital presence in 6 weeks. Our inbound leads doubled. Exceptional team.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director, Bloom Co.",
    body: "The design quality is unmatched. Our bounce rate dropped by 40% within the first month after launch.",
    rating: 5,
  },
  {
    name: "Rohan Kapoor",
    role: "Founder, ShipFast",
    body: "These guys don't just build websites — they build growth engines. Best investment we've made.",
    rating: 5,
  },
];

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function HomePage() {
  return (
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
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-14 font-medium tracking-tight"
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
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">What We Do</p>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Services Built<br />for Growth
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors cursor-pointer group">
              View all services <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProjectShowcase />
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────── */}
      <TestimonialsSection />



      {/* ─── FOOTER ────────────────────────────────────── */}
      <footer className="border-t border-gray-200/60 py-16 relative z-10 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg font-['Poppins']">M</span>
            </div>
            <span className="font-bold text-gray-900 text-xl tracking-tight font-['Poppins']">Maverick Digitals<span className="text-blue-600">.</span></span>
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
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { LiquidMetalLinkButton } from "@/components/ui/liquid-metal-link-button";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ProcessSection } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta";
import Link from "next/link";
import Image from "next/image";


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
      style={{ fontFamily: "'Arapey', serif" }}
      className="flex flex-wrap justify-center text-center text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tighter text-gray-900 leading-[1.05] mb-6 md:mb-8 max-w-5xl px-4"
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

const timelineData = [
  {
    id: 1,
    title: "Brand Strategy",
    date: "Phase 1",
    content: "Defining your brand architecture, positioning, and visual identity to stand out.",
    category: "Strategy",
    icon: FileText,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "UI/UX Design",
    date: "Phase 2",
    content: "Crafting beautiful, high-converting digital experiences and user interfaces.",
    category: "Design",
    icon: Code,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Web Development",
    date: "Phase 3",
    content: "Building scalable, lightning-fast platforms with cutting-edge tech.",
    category: "Development",
    icon: Calendar,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "SEO & Growth",
    date: "Phase 4",
    content: "Driving high-intent organic traffic through search optimization.",
    category: "Growth",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Performance Ads",
    date: "Phase 5",
    content: "Scaling your revenue with laser-focused paid campaigns.",
    category: "Marketing",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export default function HomePage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <main className="overflow-x-hidden">
        {/* ─── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pt-20 pb-16">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col items-center text-center">


          <Slogan />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-col sm:flex-row items-start gap-5 w-full sm:w-auto"
          >
            <LiquidMetalLinkButton label="See Our Work" href="/services" />
            <LiquidMetalLinkButton label="Book a Call" href="/contact" />
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES STRIP ────────────────────────────── */}
      <section className="py-16 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-10 md:mb-16 gap-4 md:gap-6">
            <div>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">What We Do</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Services Built<br />for Growth
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors cursor-pointer group mt-2">
              View all services <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative mt-12 w-full flex justify-center">
            <RadialOrbitalTimeline timelineData={timelineData} />
          </div>
        </div>
      </section>



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
            <Image
              src="/logo.png"
              alt="Maverick Digitals Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-semibold text-gray-500">
            {links.map((l) => (
              <Link key={l.path} href={l.path} className="hover:text-gray-900 transition-colors cursor-pointer">{l.name}</Link>
            ))}
          </nav>
          <p className="text-sm font-medium text-gray-400">© 2026 Maverick Digitals. All rights reserved.</p>
        </div>
      </footer>
      </main>
    </div>
  );
}

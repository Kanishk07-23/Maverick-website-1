"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SkewCards from "@/components/ui/gradient-card-showcase";

const services = [
  {
    title: "Personal Branding",
    desc: "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators to scale their influence.",
    gradientFrom: "#7c3aed",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "Social Media Management",
    desc: "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "Website & App Development",
    desc: "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable and lightning-fast.",
    gradientFrom: "#4dff03",
    gradientTo: "#00d0ff",
    href: "/contact",
  },
  {
    title: "SEO & SEM",
    desc: "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen by high-intent users.",
    gradientFrom: "#059669",
    gradientTo: "#10b981",
    href: "/contact",
  },
  {
    title: "Performance Marketing",
    desc: "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure you get measurable business outcomes.",
    gradientFrom: "#d97706",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "Branding & Strategy",
    desc: "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    gradientFrom: "#db2777",
    gradientTo: "#9333ea",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-950 overflow-x-hidden pt-28">
      {/* ─── Hero Header (Dark Theme) ──────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 text-center z-10">
        {/* Neon Glow Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[300px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-violet-400 font-bold text-xs uppercase tracking-[0.3em] mb-4">
            Our Offerings
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Everything You Need<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              to Grow Online.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mx-auto font-medium">
            We are your premium digital partner. Whether you need a high-performance website, hyper-targeted campaigns, or a compelling personal brand — we execute flawlessly.
          </p>
        </motion.div>
      </section>

      {/* ─── Skewed Gradient Card Showcase ──────────────── */}
      <section className="relative z-10 w-full flex items-center justify-center pb-24">
        <div className="w-full max-w-7xl mx-auto">
          <SkewCards cards={services} />
        </div>
      </section>

      {/* ─── Dark CTA Section ────────────────────────────── */}
      <section className="relative py-28 px-6 text-center overflow-hidden bg-gray-900 border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.3em] mb-5">
            Ready to Accelerate?
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Let's Build Something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Remarkable
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Schedule a free consultation call with our team and let us design a customized hyper-growth plan tailored specifically to your objectives.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:gap-5 hover:shadow-2xl group bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 shadow-lg shadow-purple-500/20"
          >
            Get in Touch
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

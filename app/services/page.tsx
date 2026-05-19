"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const services: FocusRailItem[] = [
  {
    id: 1,
    title: "Personal Branding",
    description: "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators to scale their influence.",
    meta: "Authority • Influence",
    imageSrc: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media Management",
    description: "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    meta: "Growth • Engagement",
    imageSrc: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 3,
    title: "Website & App Development",
    description: "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable and lightning-fast.",
    meta: "Engineering • Performance",
    imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description: "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen by high-intent users.",
    meta: "Search • Visibility",
    imageSrc: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Marketing",
    description: "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure you get measurable business outcomes.",
    meta: "ROI • Analytics",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 6,
    title: "Branding & Strategy",
    description: "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    meta: "Identity • Strategy",
    imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-neutral-950 overflow-x-hidden pt-28">
      {/* ─── Hero Header ──────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] mb-4">
            Our Offerings
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Everything You Need<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              to Grow Online.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mx-auto font-medium">
            We are your premium digital partner. Whether you need a high-performance website, hyper-targeted campaigns, or a compelling personal brand — we execute flawlessly.
          </p>
        </motion.div>
      </section>

      {/* ─── Focus Rail Showcase ──────────────── */}
      <section className="relative z-10 w-full flex items-center justify-center pb-24">
        <FocusRail 
          items={services} 
          autoPlay={false} 
          loop={true} 
        />
      </section>

      {/* ─── CTA Section ────────────────────────────── */}
      <section className="relative py-28 px-6 text-center overflow-hidden bg-neutral-900 border-t border-neutral-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] mb-5">
            Ready to Accelerate?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Let's Build Something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Remarkable
            </span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Schedule a free consultation call with our team and let us design a customized hyper-growth plan tailored specifically to your objectives.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-neutral-950 transition-all duration-300 hover:gap-5 hover:shadow-2xl group bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 shadow-lg shadow-emerald-500/20"
          >
            Get in Touch
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

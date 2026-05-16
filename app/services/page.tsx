"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const services: CardStackItem[] = [
  {
    id: 1,
    title: "Personal Branding",
    description: "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators to scale their influence.",
    imageSrc: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&fit=crop",
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media Management",
    description: "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    imageSrc: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&fit=crop",
    href: "/contact",
  },
  {
    id: 3,
    title: "Website & App Development",
    description: "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable and lightning-fast.",
    imageSrc: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&fit=crop",
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description: "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen by high-intent users.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop",
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Marketing",
    description: "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure you get measurable business outcomes.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
    href: "/contact",
  },
  {
    id: 6,
    title: "Branding & Strategy",
    description: "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    imageSrc: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&fit=crop",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 overflow-x-hidden">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 mx-auto">
            Everything You Need<br />to Grow Online.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto">
            We're a full-stack digital partner. Whether you need a website, more traffic, or a stronger brand — we do it all under one roof.
          </p>
        </motion.div>
      </section>

      {/* Card Stack Display */}
      <section className="w-full pt-10 pb-32 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto">
          <CardStack
            items={services}
            initialIndex={0}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots={false}
          />
        </div>
      </section>


    </main>
  );
}

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
    <main className="min-h-screen bg-[#06080c] overflow-hidden flex flex-col justify-center relative">
      <section className="relative z-10 w-full h-screen flex items-center justify-center pt-20">
        <FocusRail 
          items={services} 
          autoPlay={false} 
          loop={true}
          className="h-full w-full"
        />
      </section>
    </main>
  );
}

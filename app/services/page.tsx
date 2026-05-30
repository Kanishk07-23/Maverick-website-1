"use client";

import SkewCards from "@/components/ui/gradient-card-showcase";

import { LiquidMetalLinkButton } from "@/components/ui/liquid-metal-link-button";


const serviceCards = [
  {
    title: "Brand Strategy",
    desc: "We define your brand architecture, voice, and visual identity to position you as the undeniable authority in your space.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "UI/UX Design",
    desc: "High-converting, immersive interfaces that captivate users and turn visitors into loyal customers.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "Web Development",
    desc: "Lightning-fast, scalable websites and web apps built with cutting-edge technology and pixel-perfect precision.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "SEO & Growth",
    desc: "Data-driven search strategies that drive high-intent organic traffic and compound your digital authority over time.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "Performance Ads",
    desc: "Laser-focused paid campaigns across Google, Meta, and beyond — engineered to maximize ROAS and scale revenue.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
  {
    title: "Social Media",
    desc: "Scroll-stopping content and community management that builds an audience that trusts, engages, and buys.",
    gradientFrom: "#03a9f4",
    gradientTo: "#ff0058",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <main className="min-h-screen">
        {/* Hero Header */}
        <section className="relative pt-24 pb-8 text-center overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-5">
              What We Do
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.05] mb-6">
              Services Built{" "}
              <span className="brand-gradient-text">for Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Every service we offer is engineered to drive measurable results — from first impression to lasting revenue.
            </p>
          </div>
        </section>

        {/* Cards Section */}
        <section className="pb-24">
          <SkewCards cards={serviceCards} />
        </section>

        {/* CTA Strip */}
        <section className="relative py-24 text-center border-t border-gray-200/60 overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Ready to scale your brand?
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Book a free 30-minute strategy call and let&apos;s map out your growth roadmap.
            </p>
            <div className="flex justify-center">
              <LiquidMetalLinkButton label="Book a Free Call" href="/contact" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
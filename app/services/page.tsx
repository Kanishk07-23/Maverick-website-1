"use client";

import SkewCards from "@/components/ui/gradient-card-showcase";

const serviceCards = [
  {
    title: "Brand Strategy",
    desc: "We define your brand architecture, voice, and visual identity to position you as the undeniable authority in your space.",
    gradientFrom: "#9333ea",
    gradientTo: "#2563eb",
    href: "/contact",
  },
  {
    title: "UI/UX Design",
    desc: "High-converting, immersive interfaces that captivate users and turn visitors into loyal customers.",
    gradientFrom: "#06b6d4",
    gradientTo: "#9333ea",
    href: "/contact",
  },
  {
    title: "Web Development",
    desc: "Lightning-fast, scalable websites and web apps built with cutting-edge technology and pixel-perfect precision.",
    gradientFrom: "#10b981",
    gradientTo: "#06b6d4",
    href: "/contact",
  },
  {
    title: "SEO & Growth",
    desc: "Data-driven search strategies that drive high-intent organic traffic and compound your digital authority over time.",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
    href: "/contact",
  },
  {
    title: "Performance Ads",
    desc: "Laser-focused paid campaigns across Google, Meta, and beyond — engineered to maximize ROAS and scale revenue.",
    gradientFrom: "#ec4899",
    gradientTo: "#f59e0b",
    href: "/contact",
  },
  {
    title: "Social Media",
    desc: "Scroll-stopping content and community management that builds an audience that trusts, engages, and buys.",
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] max-w-[900px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-5">
            What We Do
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
            Services Built{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9333ea, #2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for Growth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-medium">
            Every service we offer is engineered to drive measurable results — from first impression to lasting revenue.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="pb-24">
        <SkewCards cards={serviceCards} />
      </section>

      {/* CTA Strip */}
      <section className="relative py-24 text-center border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to scale your brand?
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Book a free 30-minute strategy call and let&apos;s map out your growth roadmap.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #9333ea, #2563eb)",
              boxShadow: "0 0 40px rgba(147, 51, 234, 0.4)",
            }}
          >
            Book a Free Call →
          </a>
        </div>
      </section>
    </div>
  );
}
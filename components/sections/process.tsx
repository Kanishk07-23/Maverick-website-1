"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Lightbulb, Rocket, BarChart2 } from "lucide-react";

/* ─── Glass presets from UI/UX pro max Spatial UI style ─────────── */
const GLASS = {
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
} as const;

const GLASS_TINTED = (hue: string) => ({
  ...GLASS,
  background: `rgba(255,255,255,0.05)`,
  backgroundImage: `linear-gradient(135deg, ${hue}04 0%, rgba(255,255,255,0) 100%)`,
});

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery & Strategy",
    description:
      "We start with a deep-dive into your business, audience, and goals. No templates — just a custom growth blueprint built specifically for you.",
    tag: "Week 1",
    accentFrom: "#9333ea",
    accentTo: "#2563eb",
    hue: "147,51,234",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Creative & Design",
    description:
      "Our designers craft pixel-perfect visuals that convert. Every element is intentional — from colour psychology to micro-animations.",
    tag: "Weeks 2–3",
    accentFrom: "#2563eb",
    accentTo: "#0ea5e9",
    hue: "37,99,235",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Build & Launch",
    description:
      "Engineering-grade execution: blazing-fast, SEO-optimised, and fully accessible. We ship fast without cutting corners.",
    tag: "Weeks 3–5",
    accentFrom: "#9333ea",
    accentTo: "#2563eb",
    hue: "147,51,234",
  },
  {
    number: "04",
    icon: BarChart2,
    title: "Optimise & Scale",
    description:
      "We don't disappear after launch. Ongoing analytics, A/B testing, and performance tuning keep your growth compounding.",
    tag: "Ongoing",
    accentFrom: "#2563eb",
    accentTo: "#9333ea",
    hue: "37,99,235",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 85, damping: 16 } },
};

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Layered glass-friendly background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f4ff 50%, #ffffff 100%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.07) 0%, rgba(37,99,235,0.05) 40%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">How We Work</p>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Our Proven <span className="brand-gradient-text">4-Step Process</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-xs leading-relaxed md:text-right">
            A repeatable system fine-tuned over hundreds of client engagements.
          </p>
        </motion.div>

        {/* Bento process grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="group relative rounded-3xl p-9 overflow-hidden cursor-default"
                style={GLASS_TINTED(step.hue)}
              >
                {/* Depth orb */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none transition-all duration-700 group-hover:scale-125"
                  style={{ background: `radial-gradient(circle, rgba(${step.hue},0.10) 0%, transparent 65%)`, transform: "translate(25%, -25%)" }}
                />

                {/* Ghost number watermark */}
                <span
                  className="absolute bottom-4 right-6 text-[7rem] font-black leading-none select-none pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${step.accentFrom}18, ${step.accentTo}10)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.number}
                </span>

                {/* Inset glass shine */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(255,255,255,0.3)" }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon + tag row */}
                  <div className="flex items-center justify-between mb-7">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${step.accentFrom}20, ${step.accentTo}28)`,
                        border: `1px solid ${step.accentFrom}30`,
                        backdropFilter: "blur(8px)",
                        boxShadow: `0 4px 14px ${step.accentFrom}18`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.accentFrom }} />
                    </div>

                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{
                        background: `${step.accentFrom}12`,
                        border: `1px solid ${step.accentFrom}25`,
                        color: step.accentFrom,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-3 font-['Poppins']">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Bottom gradient accent line on hover */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${step.accentFrom}, ${step.accentTo})` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

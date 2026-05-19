"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

/* ─── Glass helpers ─────────────────────────────────────────────── */
const GLASS_BASE = {
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
} as const;

const GLASS_DARK = {
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  background: "rgba(15, 23, 42, 0.85)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
} as const;

/* ─── Counter ───────────────────────────────────────────────────── */
function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1800;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, value]);

  return <>{count}{suffix}</>;
}

/* ─── Data ──────────────────────────────────────────────────────── */
const STATS = [
  { value: 200, suffix: "+", label: "Clients Served", sub: "Across 12+ industries", icon: Users, accent: "#2563eb" },
  { value: 340, suffix: "%", label: "Average ROI", sub: "Measured across all campaigns", icon: TrendingUp, accent: "#9333ea" },
  { value: 98, suffix: "%", label: "Client Retention", sub: "Long-term partnerships", icon: Award, accent: "#2563eb" },
  { value: 48, suffix: "h", label: "Avg. Turnaround", sub: "Brief to first deliverable", icon: Clock, accent: "#9333ea" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 90, damping: 16 } },
};

/* ─── Component ─────────────────────────────────────────────────── */
export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Ambient depth orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">By The Numbers</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Results That{" "}
            <span className="brand-gradient-text">Speak For Themselves</span>
          </h2>
        </motion.div>

        {/* Bento Grid: [wide hero card] + [2 tall] + [wide bottom] + [1 tall] */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {/* ── Card 1 — Hero wide (spans 2 cols) ─────────────────── */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 relative rounded-3xl p-10 overflow-hidden group cursor-default"
            style={GLASS_DARK}
          >
            {/* Gradient orb inside */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.30) 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#9333ea,#2563eb)", boxShadow: "0 4px 14px rgba(147,51,234,0.35)" }}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Average Campaign ROI</span>
              </div>

              <div>
                <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white leading-none mb-4 font-['Poppins']">
                  <Counter value={340} suffix="%" inView={inView} />
                </div>
                <p className="text-gray-400 text-lg font-medium">Measured across all paid, organic &amp; content campaigns over 3 years.</p>
              </div>
            </div>

            {/* Inset glow border on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(147,51,234,0.4)" }} />
          </motion.div>

          {/* ── Card 2 — Clients Served ────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl p-8 overflow-hidden group cursor-default"
            style={GLASS_BASE}
          >
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />

            <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.10)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">Clients</span>
              </div>
              <div>
                <div className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 font-['Poppins'] brand-gradient-text mb-2">
                  <Counter value={200} suffix="+" inView={inView} />
                </div>
                <p className="text-gray-500 text-sm">Across 12+ industries worldwide</p>
              </div>
            </div>
          </motion.div>

          {/* ── Card 3 — Retention ────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl p-8 overflow-hidden group cursor-default"
            style={GLASS_BASE}
          >
            <div className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.10) 0%, transparent 70%)" }} />

            <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(147,51,234,0.08)", border: "1px solid rgba(147,51,234,0.18)" }}>
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-500 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">Retention</span>
              </div>
              <div>
                <div className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 font-['Poppins'] brand-gradient-text mb-2">
                  <Counter value={98} suffix="%" inView={inView} />
                </div>
                <p className="text-gray-500 text-sm">Long-term partnerships that last</p>
              </div>
            </div>
          </motion.div>

          {/* ── Card 4 — Turnaround wide ──────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 relative rounded-3xl p-8 overflow-hidden group cursor-default"
            style={GLASS_BASE}
          >
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(147,51,234,0.04) 0%, rgba(37,99,235,0.06) 100%)" }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, rgba(147,51,234,0.12), rgba(37,99,235,0.15))", border: "1px solid rgba(147,51,234,0.2)" }}>
                  <Clock className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Average Turnaround</p>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 font-['Poppins'] brand-gradient-text">
                    <Counter value={48} suffix="h" inView={inView} />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">From brief submission to your first deliverable in your inbox — no waiting weeks.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

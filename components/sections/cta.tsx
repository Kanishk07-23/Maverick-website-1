"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const TRUST_BADGES = ["No commitment", "Free strategy session", "Reply within 24 h"];

export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      {/* Page-level background wash */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)" }} />

      {/* Big ambient orbs — these show THROUGH the glass panel */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 65%)", transform: "translate(20%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%)", transform: "translate(-20%, 30%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(147,51,234,0.08) 0%, transparent 70%)" }} />

      <motion.div
        className="relative max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Glassmorphism panel ─────────────────────────────────── */}
        <div
          className="relative rounded-[2rem] p-12 md:p-16 overflow-hidden"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Inner orbs — vivid, sit inside the panel */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(147,51,234,0.22) 0%, transparent 65%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%)", transform: "translate(-25%, 30%)" }} />

          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z' fill='%231A1A2E'/%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Inset shine */}
          <div className="absolute inset-0 rounded-[2rem] pointer-events-none" style={{ boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(255,255,255,0.3)" }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

            {/* ── Left: copy ───────────────────────────────────────── */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">Ready to grow?</p>

              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5 font-['Poppins'] text-gray-900">
                Let&apos;s Build Something{" "}
                <span className="brand-gradient-text">Extraordinary.</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-8">
                Book a free 30-minute strategy call. No fluff, no sales pitch —
                just an honest conversation about how we can help you grow.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 px-4 py-2 rounded-full"
                    style={{
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── Right: CTAs ──────────────────────────────────────── */}
            <motion.div
              className="flex flex-col items-stretch sm:items-center lg:items-end gap-4 flex-shrink-0 w-full sm:w-auto"
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Primary CTA — solid gradient button */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #9333ea, #2563eb)",
                  boxShadow: "0 8px 24px rgba(147,51,234,0.30), inset 1px 1px 0 rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(147,51,234,0.42), inset 1px 1px 0 rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(147,51,234,0.30), inset 1px 1px 0 rgba(255,255,255,0.15)"; }}
              >
                <CalendarDays className="w-5 h-5" />
                Book a Free Call
              </Link>

              {/* Ghost glass secondary CTA */}
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-gray-700 text-base cursor-pointer transition-all duration-300 hover:text-gray-900"
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                Explore our services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

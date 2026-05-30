"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LiquidMetalLinkButton } from "@/components/ui/liquid-metal-link-button";

const TRUST_BADGES = ["No commitment", "Free strategy session", "Reply within 24 h"];

export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      {/* Page-level background wash removed to show global grid */}


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

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

            {/* ── Left: copy ───────────────────────────────────────── */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">Ready to grow?</p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5 font-['Poppins'] text-gray-900">
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
              <LiquidMetalLinkButton label="Book a Free Call" href="/contact" />
              <LiquidMetalLinkButton label="Our Services" href="/services" />
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}


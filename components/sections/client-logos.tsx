"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BRAND_NAMES = [
  "Shopify", "Stripe", "HubSpot", "Notion", "Linear",
  "Vercel", "Figma", "Webflow", "Framer", "Loom",
];

// Triple for seamless infinite loop
const MARQUEE_ITEMS = [...BRAND_NAMES, ...BRAND_NAMES, ...BRAND_NAMES];

export function ClientLogosSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Glass panel background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(40px) saturate(160%)",
          WebkitBackdropFilter: "blur(40px) saturate(160%)",
          background: "rgba(255,255,255,0.55)",
          borderTop: "1px solid rgba(255,255,255,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.7)",
        }}
      />
      {/* Ambient colour wash behind the glass */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(147,51,234,0.06) 0%, rgba(37,99,235,0.08) 100%)",
        }}
      />

      <div className="relative z-10">
        <motion.p
          className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Trusted by brands across industries
        </motion.p>

        {/* Fade masks */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.9), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.9), transparent)" }}
          />

          <motion.div
            className="flex gap-10 items-center w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          >
            {MARQUEE_ITEMS.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 px-7 py-3 rounded-2xl select-none"
                style={{
                  backdropFilter: "blur(12px) saturate(180%)",
                  WebkitBackdropFilter: "blur(12px) saturate(180%)",
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  boxShadow:
                    "0 4px 16px rgba(15,23,42,0.06), inset 1px 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <span
                  className="text-base font-black tracking-tight font-['Poppins']"
                  style={{ color: "#1A1A2E", opacity: 0.45 }}
                >
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

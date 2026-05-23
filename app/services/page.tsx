"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Share2, Smartphone, Search, Target, Layers,
} from "lucide-react";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceCard {
  id: number;
  title: string;
  description: string;
  /** Gradient colors for the top-half stage light  */
  stageGradient: string;
  /** Outer glow color around card border (CSS color) */
  borderGlow: string;
  /** Icon background tint inside hex */
  hexBg: string;
  /** Rendered icon node */
  icon: React.ReactNode;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const servicesData: ServiceCard[] = [
  {
    id: 1,
    title: "Personal Branding",
    description:
      "Build authority and convert attention into revenue. We craft a brand identity that makes you the obvious choice.",
    stageGradient: "linear-gradient(160deg, #c4a35a 0%, #8b6914 30%, #3d2c0a 65%, #0d0d11 100%)",
    borderGlow: "rgba(196,163,90,0.45)",
    hexBg: "rgba(196,163,90,0.18)",
    icon: <Briefcase className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(255,220,120,0.9)]" strokeWidth={1.3} />,
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media",
    description:
      "We handle your social presence end-to-end so you can focus on what matters. Consistent, on-brand, and growth-focused.",
    stageGradient: "linear-gradient(160deg, #a78bfa 0%, #6d28d9 28%, #2e1065 60%, #0d0d11 100%)",
    borderGlow: "rgba(139,92,246,0.5)",
    hexBg: "rgba(139,92,246,0.2)",
    icon: <Share2 className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(167,139,250,0.9)]" strokeWidth={1.3} />,
    href: "/contact",
  },
  {
    id: 3,
    title: "App Development",
    description:
      "We engineer high-performance platforms using modern tech stacks. From MVP to scale, built for speed and reliability.",
    stageGradient: "linear-gradient(160deg, #f9a8d4 0%, #db2777 28%, #7c1149 60%, #0d0d11 100%)",
    borderGlow: "rgba(236,72,153,0.45)",
    hexBg: "rgba(236,72,153,0.18)",
    icon: <Smartphone className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(249,168,212,0.9)]" strokeWidth={1.3} />,
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description:
      "Own your search results. We build sustainable organic and paid traffic systems that compound over time.",
    stageGradient: "linear-gradient(160deg, #6ee7b7 0%, #059669 28%, #064e3b 60%, #0d0d11 100%)",
    borderGlow: "rgba(16,185,129,0.45)",
    hexBg: "rgba(16,185,129,0.18)",
    icon: <Search className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(110,231,183,0.9)]" strokeWidth={1.3} />,
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Ads",
    description:
      "Laser-focused paid campaigns that don't waste your budget. We track every dollar and optimize for return.",
    stageGradient: "linear-gradient(160deg, #fcd34d 0%, #d97706 28%, #78350f 60%, #0d0d11 100%)",
    borderGlow: "rgba(245,158,11,0.45)",
    hexBg: "rgba(245,158,11,0.18)",
    icon: <Target className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(252,211,77,0.9)]" strokeWidth={1.3} />,
    href: "/contact",
  },
  {
    id: 6,
    title: "Brand Strategy",
    description:
      "A brand is a promise. We help you define it and keep it — building a solid foundation for long-term trust.",
    stageGradient: "linear-gradient(160deg, #93c5fd 0%, #2563eb 28%, #1e3a8a 60%, #0d0d11 100%)",
    borderGlow: "rgba(59,130,246,0.45)",
    hexBg: "rgba(59,130,246,0.18)",
    icon: <Layers className="w-9 h-9 text-white drop-shadow-[0_0_12px_rgba(147,197,253,0.9)]" strokeWidth={1.3} />,
    href: "/contact",
  },
];

// ─── Hexagon shape via CSS clip-path ─────────────────────────────────────────
const HEX_CLIP = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

// ─── Stack constants ──────────────────────────────────────────────────────────
const N = servicesData.length;
const STACK_Y = 18;
const SCALE_STEP = 0.045;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<number[]>(servicesData.map((s) => s.id));
  const [dismissingId, setDismissingId] = useState<number | null>(null);

  const busy = useRef(false);
  const lastCycleAt = useRef(0);

  useEffect(() => setMounted(true), []);

  const cycle = useCallback(() => {
    const now = Date.now();
    if (busy.current || now - lastCycleAt.current < 650) return;
    busy.current = true;
    lastCycleAt.current = now;
    const frontId = order[0];
    setDismissingId(frontId);
    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setDismissingId(null);
      setTimeout(() => { busy.current = false; }, 500);
    }, 320);
  }, [order]);

  const reverseCycle = useCallback(() => {
    const now = Date.now();
    if (busy.current || now - lastCycleAt.current < 650) return;
    busy.current = true;
    lastCycleAt.current = now;
    setOrder((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
    setTimeout(() => {
      setDismissingId(null);
      setTimeout(() => { busy.current = false; }, 500);
    }, 20);
  }, []);

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) { e.deltaY > 0 ? cycle() : reverseCycle(); }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [cycle, reverseCycle]);

  // Touch
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 40) cycle(); else if (dy < -40) reverseCycle();
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [cycle, reverseCycle]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") cycle();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") reverseCycle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle, reverseCycle]);

  if (!mounted) return null;

  return (
    <InfiniteGrid>
      <div className="flex w-full h-screen overflow-hidden select-none">

        {/* ── LEFT: Hero text ──────────────────────────────────── */}
        <div className="hidden lg:flex w-[42%] shrink-0 h-full flex-col justify-center px-14 xl:px-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-6 max-w-md">
            <p className="text-blue-500 font-bold text-sm uppercase tracking-widest">
              What We Do
            </p>
            <h1 className="text-5xl xl:text-6xl font-black tracking-tighter text-gray-900 leading-[1.05]">
              Our<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Expertise
              </span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Scroll through our core capabilities. We engineer high-performance
              systems and digital strategies to scale your influence.
            </p>
            <div className="flex items-center gap-3 text-gray-400 text-xs font-semibold tracking-widest uppercase pt-2">
              <span className="w-[1px] h-8 bg-gradient-to-b from-gray-300 to-transparent block" />
              <span>Scroll / Arrow Keys to explore</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Card stack ────────────────────────────────── */}
        <div
          className="w-full lg:w-[58%] h-full flex items-center justify-center overflow-hidden"
          style={{ touchAction: "none" }}
        >
          {/* Mobile header */}
          <div className="absolute top-0 left-0 right-0 lg:hidden px-6 pt-24 pb-4 text-center pointer-events-none z-50">
            <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">What We Do</p>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Expertise</span>
            </h1>
          </div>

          {/* Stack container */}
          <div className="relative" style={{ width: 340, height: 520, perspective: 1200 }}>
            {[...order].reverse().map((id, revIdx) => {
              const pos = order.length - 1 - revIdx;
              const card = servicesData.find((s) => s.id === id)!;
              const isDismissing = dismissingId === id;
              const isFront = pos === 0;

              if (pos > 4) return null;

              return (
                <motion.div
                  key={id}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  style={{ zIndex: isDismissing ? N + 10 : N - pos }}
                  animate={
                    isDismissing
                      ? { y: -150, scale: 0.88, rotate: -5, opacity: 0 }
                      : {
                          y: pos * STACK_Y,
                          scale: 1 - pos * SCALE_STEP,
                          rotate: 0,
                          opacity: pos > 3 ? 0 : 1,
                        }
                  }
                  transition={
                    isDismissing
                      ? { type: "spring", stiffness: 350, damping: 26 }
                      : { type: "spring", stiffness: 180, damping: 18, mass: 1 }
                  }
                  drag={isFront ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, { offset, velocity }) => {
                    if (offset.y < -50 || velocity.y < -500) cycle();
                    else if (offset.y > 50 || velocity.y > 500) reverseCycle();
                  }}
                >
                  {/* ── Card shell ────────────────────────────────── */}
                  <div
                    className="relative w-full h-full rounded-[28px] overflow-hidden flex flex-col"
                    style={{
                      background: "#0d0d11",
                      boxShadow: isFront
                        ? `0 0 0 1px rgba(255,255,255,0.12), 0 0 40px 4px ${card.borderGlow}, 0 30px 60px rgba(0,0,0,0.7)`
                        : "0 0 0 1px rgba(255,255,255,0.07), 0 10px 30px rgba(0,0,0,0.4)",
                    }}
                  >

                    {/* ══ TOP HALF — Gradient Stage Light ═══════════════ */}
                    <div
                      className="relative flex-shrink-0 flex items-center justify-center overflow-hidden"
                      style={{ height: "55%", background: card.stageGradient }}
                    >
                      {/* Soft vignette to merge top stage into card edges */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 85% 90% at 50% 30%, transparent 40%, rgba(13,13,17,0.55) 100%)",
                        }}
                      />

                      {/* Reflective top-center specular highlight */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                        style={{
                          width: "60%",
                          height: "2px",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                          filter: "blur(1px)",
                        }}
                      />

                      {/* ── Glassmorphic Hexagonal Icon Badge ────────── */}
                      <div
                        className="relative z-10 flex items-center justify-center"
                        style={{
                          width: 110,
                          height: 110,
                          clipPath: HEX_CLIP,
                          background: "rgba(255,255,255,0.08)",
                          backdropFilter: "blur(16px) saturate(160%)",
                          WebkitBackdropFilter: "blur(16px) saturate(160%)",
                          boxShadow: `inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.3)`,
                        }}
                      >
                        {/* Inner hex layer for depth */}
                        <div
                          className="absolute flex items-center justify-center"
                          style={{
                            inset: 10,
                            clipPath: HEX_CLIP,
                            background: card.hexBg,
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                          }}
                        />
                        {/* Icon */}
                        <div className="relative z-10">
                          {card.icon}
                        </div>
                      </div>

                      {/* Stage light bleeds downward into bottom half */}
                      <div
                        className="absolute bottom-0 left-0 right-0 pointer-events-none"
                        style={{
                          height: "40px",
                          background: "linear-gradient(to bottom, transparent, #0d0d11)",
                        }}
                      />
                    </div>

                    {/* ══ BOTTOM HALF — Dark Typography Area ════════════ */}
                    <div
                      className="relative flex flex-col flex-1 px-6 pt-5 pb-5"
                      style={{ background: "#0d0d11" }}
                    >
                      {/* Subtle dot matrix texture */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
                          backgroundSize: "4px 4px",
                          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, black 100%)",
                          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, black 100%)",
                        }}
                      />

                      {/* Color accent glow bleeding up from bottom */}
                      <div
                        className="absolute bottom-0 left-0 right-0 pointer-events-none"
                        style={{
                          height: "70px",
                          background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${card.borderGlow.replace("0.45", "0.18")}, transparent 80%)`,
                          opacity: isFront ? 1 : 0,
                          transition: "opacity 0.7s ease",
                        }}
                      />

                      {/* Title */}
                      <h3
                        className="relative z-10 font-bold tracking-tight text-white leading-tight mb-2"
                        style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)" }}
                      >
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="relative z-10 text-[13px] text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                        {card.description}
                      </p>

                      {/* CTA — white pill, matches reference exactly */}
                      <div
                        className="relative z-10 mt-4"
                        style={{
                          opacity: isFront ? 1 : 0,
                          transform: isFront ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.5s ease, transform 0.5s ease",
                          pointerEvents: isFront ? "auto" : "none",
                        }}
                      >
                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            color: "#111",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                          }}
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-xs font-semibold tracking-widest uppercase text-gray-500"
            >
              ↓ Scroll or Swipe
            </motion.div>
          </div>
        </div>
      </div>
    </InfiniteGrid>
  );
}
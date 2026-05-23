"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Share2, Smartphone, Search, Target, Layers } from "lucide-react";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";

// 1. Adjusted Data with distinct Outer (Bottom-Up) and Inner (Top-Down) glows
const servicesData = [
  {
    id: 1,
    title: "Personal Branding",
    description: "Build authority and convert attention into revenue with a solid personal brand.",
    outerGlow: "from-violet-600/30",
    innerGlow: "from-violet-500/25",
    icon: <Briefcase className="w-20 h-20 text-violet-400 drop-shadow-[0_0px_20px_rgba(139,92,246,0.6)]" strokeWidth={1} />,
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media",
    description: "We handle your social presence end-to-end so you can focus on your business.",
    outerGlow: "from-blue-600/30",
    innerGlow: "from-blue-500/25",
    icon: <Share2 className="w-20 h-20 text-blue-400 drop-shadow-[0_0px_20px_rgba(59,130,246,0.6)]" strokeWidth={1} />,
    href: "/contact",
  },
  {
    id: 3,
    title: "App Development",
    description: "We engineer high-performance platforms using modern tech stacks.",
    outerGlow: "from-pink-600/30",
    innerGlow: "from-pink-500/25",
    icon: <Smartphone className="w-20 h-20 text-pink-400 drop-shadow-[0_0px_20px_rgba(236,72,153,0.6)]" strokeWidth={1} />,
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description: "Own your search results. We build sustainable organic and paid traffic systems.",
    outerGlow: "from-emerald-600/30",
    innerGlow: "from-emerald-500/25",
    icon: <Search className="w-20 h-20 text-emerald-400 drop-shadow-[0_0px_20px_rgba(16,185,129,0.6)]" strokeWidth={1} />,
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Ads",
    description: "Laser-focused paid campaigns that don't waste your budget. We track every rupee.",
    outerGlow: "from-amber-600/30",
    innerGlow: "from-amber-500/25",
    icon: <Target className="w-20 h-20 text-amber-400 drop-shadow-[0_0px_20px_rgba(245,158,11,0.6)]" strokeWidth={1} />,
    href: "/contact",
  },
  {
    id: 6,
    title: "Brand Strategy",
    description: "A brand is a promise. We help you define it and keep it, building a solid foundation.",
    outerGlow: "from-indigo-600/30",
    innerGlow: "from-indigo-500/25",
    icon: <Layers className="w-20 h-20 text-indigo-400 drop-shadow-[0_0px_20px_rgba(99,102,241,0.6)]" strokeWidth={1} />,
    href: "/contact",
  },
];

const N = servicesData.length;
const STACK_Y = 20;       
const SCALE_STEP = 0.05;  

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
    const backId = order[order.length - 1];
    setOrder((prev) => {
      const newOrder = [...prev];
      const last = newOrder.pop()!;
      newOrder.unshift(last);
      return newOrder;
    });
    setDismissingId(backId);
    setTimeout(() => {
      setDismissingId(null);
      setTimeout(() => { busy.current = false; }, 500);
    }, 20);
  }, [order]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) {
        if (e.deltaY > 0) cycle();
        else reverseCycle();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [cycle, reverseCycle]);

  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (dy > 40) cycle();
      else if (dy < -40) reverseCycle();
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [cycle, reverseCycle]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") cycle();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") reverseCycle();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycle, reverseCycle]);

  if (!mounted) return null;

  return (
    <InfiniteGrid>
      <div className="flex w-full h-screen overflow-hidden select-none">

        {/* ── LEFT: locked hero text ───────────────────────── */}
        <div className="hidden lg:flex w-[42%] shrink-0 h-full flex-col justify-center px-14 xl:px-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.04),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-6 max-w-md">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">
              What We Do
            </p>
            <h1 className="text-5xl xl:text-6xl font-black tracking-tighter text-gray-900 leading-[1.05]">
              Our
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Expertise
              </span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Scroll through our core capabilities. We engineer
              high-performance systems and digital strategies to scale your
              influence.
            </p>
            <div className="flex items-center gap-3 text-gray-400 text-xs font-semibold tracking-widest uppercase pt-4">
              <span className="w-[1px] h-8 bg-gradient-to-b from-gray-300 to-transparent block" />
              <span>Scroll / Arrow Keys to explore</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: card stack ────── */}
        <div className="w-full lg:w-[58%] h-full flex items-center justify-center overflow-hidden cursor-default" style={{ touchAction: "none" }}>
          
          <div className="absolute top-0 left-0 right-0 lg:hidden px-6 pt-24 pb-4 text-center pointer-events-none z-50">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">What We Do</p>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Expertise</span>
            </h1>
          </div>

          <div className="relative mt-8" style={{ width: 380, height: 550, perspective: 1200 }}>
            {[...order].reverse().map((id, revIdx) => {
              const pos = order.length - 1 - revIdx; 
              const card = servicesData.find((s) => s.id === id)!;
              const isDismissing = dismissingId === id;
              const isFront = pos === 0;

              if (pos > 4) return null;

              return (
                <motion.div
                  key={id}
                  className="absolute inset-0 rounded-[32px] cursor-grab active:cursor-grabbing overflow-visible"
                  style={{ zIndex: isDismissing ? N + 10 : N - pos }}
                  animate={
                    isDismissing
                      ? { y: -140, scale: 0.9, rotate: -4, opacity: 0 }
                      : { y: pos * STACK_Y, scale: 1 - pos * SCALE_STEP, rotate: 0, opacity: pos > 3 ? 0 : 1 }
                  }
                  transition={
                    isDismissing
                      ? { type: "spring", stiffness: 350, damping: 25 }
                      : { type: "spring", stiffness: 180, damping: 16, mass: 1 }
                  }
                  drag={isFront ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.y < -50 || velocity.y < -500) cycle();
                    else if (offset.y > 50 || velocity.y > 500) reverseCycle();
                  }}
                >
                  
                  {/* --- THE INSET CARD ARCHITECTURE --- */}
                  <div className={`relative w-full h-full rounded-[32px] bg-[#0d0d0f] border border-white/5 flex flex-col p-[10px] overflow-hidden ${isFront ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'shadow-none'}`}>
                    
                    {/* OUTER CARD: Fine Dot Matrix Background */}
                    <div 
                      className="absolute inset-0 opacity-[0.25] pointer-events-none" 
                      style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '5px 5px' }} 
                    />

                    {/* OUTER CARD: Bottom-Up Lighting Gradient */}
                    {/* Starts at the very bottom and fades UP toward the 1px line of the inner card */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t ${card.outerGlow} to-transparent transition-opacity duration-700 pointer-events-none z-0 ${isFront ? 'opacity-100' : 'opacity-0'}`} />

                    {/* --- INNER CARD (Top Half) --- */}
                    <div className="relative h-[55%] w-full rounded-[24px] bg-[#161618] border border-white/10 flex items-center justify-center overflow-hidden z-10 shadow-inner">
                      
                      {/* INNER CARD: Top-Down Internal Lighting (Separated from outer glow) */}
                      <div className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-b ${card.innerGlow} to-transparent transition-opacity duration-700 pointer-events-none ${isFront ? 'opacity-100' : 'opacity-0'}`} />

                      {/* 3D Icon Proxy */}
                      <div className={`relative z-20 transition-transform duration-700 ease-out ${isFront ? 'scale-110 translate-y-2' : 'scale-95 translate-y-0'}`}>
                          {card.icon}
                      </div>

                    </div>

                    {/* --- BOTTOM SECTION (Typography) --- */}
                    <div className="relative h-[45%] w-full px-6 pt-6 pb-2 flex flex-col items-start text-left z-20">
                      
                      <h3 className="text-[22px] font-bold tracking-tight text-white mb-2">
                        {card.title}
                      </h3>

                      <p className="text-[15px] text-zinc-400 leading-relaxed max-w-[95%] line-clamp-3">
                        {card.description}
                      </p>

                      {/* Minimalist CTA Button */}
                      <div className={`mt-auto mb-2 pointer-events-auto transition-all duration-700 ${isFront ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        <Link href={card.href} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-violet-500/20 transition-shadow">
                          Explore services <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 pointer-events-none select-none">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="text-xs font-semibold tracking-widest uppercase">
              ↓ Scroll or Swipe
            </motion.div>
          </div>
        </div>
      </div>
    </InfiniteGrid>
  );
}
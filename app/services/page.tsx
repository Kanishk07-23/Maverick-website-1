"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Share2, Smartphone, Search, Target, Layers } from "lucide-react";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";

// 1. Updated Data: Neon glow colors optimized for pure Dark Mode cards
const servicesData = [
  {
    id: 1,
    title: "Personal Branding",
    description: "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators.",
    meta: "Authority • Influence",
    glowColor: "rgba(139, 92, 246, 0.7)", // Intense Violet
    icon: <Briefcase className="w-12 h-12 text-violet-400" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media",
    description: "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    meta: "Growth • Engagement",
    glowColor: "rgba(59, 130, 246, 0.7)", // Intense Blue
    icon: <Share2 className="w-12 h-12 text-blue-400" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 3,
    title: "App Development",
    description: "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable.",
    meta: "Engineering • Performance",
    glowColor: "rgba(236, 72, 153, 0.7)", // Intense Pink
    icon: <Smartphone className="w-12 h-12 text-pink-400" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description: "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen.",
    meta: "Search • Visibility",
    glowColor: "rgba(16, 185, 129, 0.7)", // Intense Emerald
    icon: <Search className="w-12 h-12 text-emerald-400" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Ads",
    description: "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure measurable outcomes.",
    meta: "ROI • Analytics",
    glowColor: "rgba(245, 158, 11, 0.7)", // Intense Amber
    icon: <Target className="w-12 h-12 text-amber-400" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 6,
    title: "Brand Strategy",
    description: "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    meta: "Identity • Strategy",
    glowColor: "rgba(99, 102, 241, 0.7)", // Intense Indigo
    icon: <Layers className="w-12 h-12 text-indigo-400" strokeWidth={1.5} />,
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

          {/* 3-D card stack container */}
          <div className="relative mt-8" style={{ width: 380, height: 560, perspective: 1200 }}>
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
                  
                  {/* --- 1:1 DARK MODE REFERENCE REPLICA --- */}
                  <div className="relative w-full h-full">
                    
                    {/* Glowing Under-Shadow (Only active on front card) */}
                    <div className={`absolute -inset-1 rounded-[32px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-blue-600 blur-2xl transition-opacity duration-700 -z-10 ${isFront ? 'opacity-30' : 'opacity-0'}`} />

                    {/* Gradient Border Mask */}
                    <div className={`absolute inset-0 rounded-[32px] p-[1px] transition-colors duration-700 ${isFront ? 'bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500' : 'bg-white/10'}`}>
                      
                      {/* The Pure Dark Card Body */}
                      <div className="relative w-full h-full bg-[#0A0A0A] rounded-[31px] flex flex-col overflow-hidden">
                        
                        {/* --- TOP HALF: STAGE LIGHT & 3D ICON --- */}
                        <div className="relative h-[45%] w-full flex items-center justify-center">
                          {/* Radial Backlight */}
                          <div 
                            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isFront ? 'opacity-80' : 'opacity-20'}`}
                            style={{ background: `radial-gradient(circle at 50% 50%, ${card.glowColor} 0%, transparent 70%)` }} 
                          />
                          {/* Dark Glass Icon Proxy */}
                          <div className={`relative z-10 flex items-center justify-center w-28 h-28 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-700 ${isFront ? 'scale-110 shadow-[0_0_40px_rgba(139,92,246,0.2)]' : 'scale-95'}`}>
                              {card.icon}
                          </div>
                        </div>

                        {/* --- BOTTOM HALF: TYPOGRAPHY & CTA --- */}
                        <div className="relative h-[55%] w-full px-8 pb-8 pt-2 flex flex-col items-start text-left z-20">
                          
                          {/* Pill Tag */}
                          <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors duration-500 mb-4 border ${isFront ? 'bg-white/10 text-gray-200 border-white/20' : 'bg-white/5 text-gray-500 border-white/5'}`}>
                            {card.meta}
                          </span>

                          <h3 className="text-[24px] font-bold tracking-tight text-white mb-2 leading-none">
                            {card.title}
                          </h3>

                          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                            {card.description}
                          </p>

                          {/* Animated CTA Button */}
                          <div className={`mt-auto pt-4 pointer-events-auto transition-all duration-700 ${isFront ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                            <Link href={card.href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)] transition-shadow">
                              Get Started <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>

                        </div>
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
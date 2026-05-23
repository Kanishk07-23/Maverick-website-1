"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Share2, Smartphone, Search, Target, Layers } from "lucide-react";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";

const servicesData = [
  {
    id: 1,
    title: "Personal Branding",
    description: "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators.",
    meta: "Authority • Influence",
    glowColor: "rgba(139, 92, 246, 0.4)", // Violet
    icon: <Briefcase className="w-10 h-10 text-violet-600" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media",
    description: "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    meta: "Growth • Engagement",
    glowColor: "rgba(59, 130, 246, 0.4)", // Blue
    icon: <Share2 className="w-10 h-10 text-blue-600" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 3,
    title: "App Development",
    description: "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable.",
    meta: "Engineering • Performance",
    glowColor: "rgba(236, 72, 153, 0.4)", // Pink
    icon: <Smartphone className="w-10 h-10 text-pink-600" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description: "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen.",
    meta: "Search • Visibility",
    glowColor: "rgba(16, 185, 129, 0.4)", // Emerald
    icon: <Search className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Ads",
    description: "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure measurable outcomes.",
    meta: "ROI • Analytics",
    glowColor: "rgba(245, 158, 11, 0.4)", // Amber
    icon: <Target className="w-10 h-10 text-amber-600" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 6,
    title: "Brand Strategy",
    description: "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    meta: "Identity • Strategy",
    glowColor: "rgba(99, 102, 241, 0.4)", // Indigo
    icon: <Layers className="w-10 h-10 text-indigo-600" strokeWidth={1.5} />,
    href: "/contact",
  },
];

const N = servicesData.length;
const STACK_Y = 22;       
const SCALE_STEP = 0.06;  

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
          <div className="relative mt-8" style={{ width: 360, height: 500, perspective: 1200 }}>
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
                  
                  {/* PIXEL-PERFECT REFERENCE MATCH */}
                  <div className="relative w-full h-full rounded-[32px] p-[1px] pointer-events-none">
                    
                    {/* Border Mask: Glowing on front card, subtle silver on back cards */}
                    <div className={`absolute inset-0 rounded-[32px] transition-all duration-700 ${isFront ? 'bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500' : 'bg-black/10'}`} />
                    
                    {/* Ambient Glow Drop Shadow (Only active on front card) */}
                    <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500 blur-2xl -z-10 transition-all duration-700 ${isFront ? 'opacity-40 translate-y-4' : 'opacity-0'}`} />

                    {/* The Frosted Glass Card Body */}
                    <div className="relative w-full h-full bg-white/85 backdrop-blur-2xl rounded-[31px] flex flex-col overflow-hidden shadow-2xl shadow-black/5">
                      
                      {/* --- TOP HALF: VISUALS --- */}
                      <div className="relative h-1/2 w-full flex flex-col items-center justify-center pt-4">
                        {/* Smooth Radial Stage-Light */}
                        <div 
                          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isFront ? 'opacity-100' : 'opacity-30'}`}
                          style={{ background: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 75%)` }} 
                        />
                        {/* 3D Glass Icon Proxy */}
                        <div className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-white/60 border border-white/80 backdrop-blur-md shadow-xl transition-all duration-700 ${isFront ? 'scale-110 -translate-y-2 shadow-violet-500/15' : 'scale-90 shadow-black/5'}`}>
                            {card.icon}
                        </div>
                      </div>

                      {/* --- BOTTOM HALF: CONTENT --- */}
                      <div className="relative h-1/2 w-full px-7 pb-7 pt-2 flex flex-col items-start text-left bg-gradient-to-b from-transparent to-white/90">
                        
                        <div className="mb-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase transition-colors duration-500 ${isFront ? 'bg-violet-100/80 text-violet-700 border border-violet-200/50' : 'bg-black/5 text-gray-500 border border-black/5'}`}>
                            {card.meta}
                          </span>
                        </div>

                        <h3 className="text-[22px] font-black tracking-tight text-gray-900 mb-2 leading-none">
                          {card.title}
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 w-[90%]">
                          {card.description}
                        </p>

                        {/* Animated CTA Button (Only active on front card) */}
                        <div className="mt-auto pointer-events-auto">
                          <Link href={card.href}>
                            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-violet-500/30 transition-all duration-700 ${isFront ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                              Explore <ArrowRight className="w-4 h-4" />
                            </div>
                          </Link>
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
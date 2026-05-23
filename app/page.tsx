"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Share2, Smartphone, Search, Target, Layers } from "lucide-react";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";

// 1. Updated Data: Swapped images for premium glowing 3D icon placeholders
const servicesData = [
  {
    id: 1,
    title: "Personal Branding",
    description: "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators.",
    meta: "Authority • Influence",
    glowColor: "rgba(147, 51, 234, 0.15)", // Purple
    icon: <Briefcase className="w-16 h-16 text-purple-600/80" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media",
    description: "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    meta: "Growth • Engagement",
    glowColor: "rgba(59, 130, 246, 0.15)", // Blue
    icon: <Share2 className="w-16 h-16 text-blue-600/80" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 3,
    title: "App Development",
    description: "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable.",
    meta: "Engineering • Performance",
    glowColor: "rgba(236, 72, 153, 0.15)", // Pink
    icon: <Smartphone className="w-16 h-16 text-pink-600/80" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description: "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen.",
    meta: "Search • Visibility",
    glowColor: "rgba(16, 185, 129, 0.15)", // Emerald
    icon: <Search className="w-16 h-16 text-emerald-600/80" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Ads",
    description: "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure measurable outcomes.",
    meta: "ROI • Analytics",
    glowColor: "rgba(245, 158, 11, 0.15)", // Amber
    icon: <Target className="w-16 h-16 text-amber-600/80" strokeWidth={1.5} />,
    href: "/contact",
  },
  {
    id: 6,
    title: "Brand Strategy",
    description: "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    meta: "Identity • Strategy",
    glowColor: "rgba(99, 102, 241, 0.15)", // Indigo
    icon: <Layers className="w-16 h-16 text-indigo-600/80" strokeWidth={1.5} />,
    href: "/contact",
  },
];

const N = servicesData.length;
const STACK_Y = 18;       
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />
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
          <div className="relative" style={{ width: 370, height: 520, perspective: 1000 }}>
            {[...order].reverse().map((id, revIdx) => {
              const pos = order.length - 1 - revIdx; 
              const card = servicesData.find((s) => s.id === id)!;
              const isDismissing = dismissingId === id;
              const isFront = pos === 0;

              if (pos > 4) return null;

              return (
                <motion.div
                  key={id}
                  className="absolute inset-0 rounded-[2rem] cursor-grab active:cursor-grabbing"
                  style={{ zIndex: isDismissing ? N + 10 : N - pos }}
                  animate={
                    isDismissing
                      ? { y: -110, scale: 0.9, rotate: -2 }
                      : { y: pos * STACK_Y, scale: 1 - pos * SCALE_STEP, rotate: 0, opacity: pos > 3 ? 0 : 1 }
                  }
                  transition={
                    isDismissing
                      ? { type: "spring", stiffness: 380, damping: 22 }
                      : { type: "spring", stiffness: 160, damping: 13, mass: 1.1 }
                  }
                  drag={isFront ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.y < -50 || velocity.y < -500) cycle();
                    else if (offset.y > 50 || velocity.y > 500) reverseCycle();
                  }}
                >
                  
                  {/* THE PREMIUM LIGHT MODE CARD */}
                  <div className={`group relative w-full h-full rounded-[2rem] p-[1px] transition-all duration-500 ease-out ${isFront ? 'hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.06)]' : 'shadow-[0_4px_20px_rgb(0,0,0,0.02)]'}`}>
                    
                    {/* 1. Default Silver Border */}
                    <div className="absolute inset-0 bg-gray-200/60 rounded-[2rem] transition-opacity duration-500 group-hover:opacity-0" />
                    
                    {/* 2. Hover Gradient Border (Only works if card is at the front) */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-[2rem] opacity-0 transition-opacity duration-500 ${isFront ? 'group-hover:opacity-100' : ''}`} />

                    {/* 3. The Frosted Milk-Glass Surface */}
                    <div className="absolute inset-[1px] bg-white/80 backdrop-blur-2xl rounded-[calc(2rem-1px)] z-10 overflow-hidden flex flex-col justify-end p-8 pointer-events-none">
                      
                      {/* Radial Stage-Light Backlight */}
                      <div 
                        className={`absolute top-[-20%] left-[-20%] w-[140%] h-[70%] blur-3xl opacity-60 transition-opacity duration-700 pointer-events-none -z-10 ${isFront ? 'group-hover:opacity-100' : ''}`}
                        style={{ background: `radial-gradient(circle, ${card.glowColor} 0%, transparent 60%)` }} 
                      />

                      {/* 3D Icon Hero Area (Floats up gracefully) */}
                      <div className={`absolute top-16 left-0 right-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out z-0 ${isFront ? 'group-hover:-translate-y-4' : ''}`}>
                        <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md border border-white/60">
                            {card.icon}
                        </div>
                      </div>

                      {/* Typography & Layout */}
                      <div className="relative z-20 flex flex-col items-start mt-auto pointer-events-none">
                        
                        <span className="inline-block px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 shadow-sm">
                          {card.meta}
                        </span>

                        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                          {card.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-slate-500 mb-6 line-clamp-3">
                          {card.description}
                        </p>

                        {/* Animated CTA Button */}
                        <Link
                          href={card.href}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 translate-y-4 transition-all duration-500 ease-out shadow-lg shadow-purple-500/25 pointer-events-auto ${isFront ? 'group-hover:opacity-100 group-hover:translate-y-0' : ''}`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
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
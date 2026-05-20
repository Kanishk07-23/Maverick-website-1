"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";

const servicesData = [
  {
    id: 1,
    title: "Personal Branding",
    description:
      "Build authority and convert attention into revenue with a solid personal brand. We provide end-to-end support for founders and creators to scale their influence.",
    meta: "Authority • Influence",
    imageSrc:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 2,
    title: "Social Media Management",
    description:
      "We handle your social presence end-to-end so you can focus on your business. Creating engaging content that drives real audience growth.",
    meta: "Growth • Engagement",
    imageSrc:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 3,
    title: "App Development",
    description:
      "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but scalable and lightning-fast.",
    meta: "Engineering • Performance",
    imageSrc:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 4,
    title: "SEO & SEM",
    description:
      "Own your search results. We build sustainable organic and paid traffic systems that compound over time, making sure your brand is seen.",
    meta: "Search • Visibility",
    imageSrc:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 5,
    title: "Performance Marketing",
    description:
      "Laser-focused paid campaigns that don't waste your budget. We track and optimize every ad rupee to ensure measurable business outcomes.",
    meta: "ROI • Analytics",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
  {
    id: 6,
    title: "Branding & Strategy",
    description:
      "A brand is a promise. We help you define it and keep it. Building the foundation that makes every other marketing effort more effective.",
    meta: "Identity • Strategy",
    imageSrc:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1000&auto=format&fit=crop",
    href: "/contact",
  },
];

const N = servicesData.length;
const STACK_Y = 18;       // px offset per card in the stack
const SCALE_STEP = 0.05;  // scale decrease per card depth

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);

  // order[0] = front card id, order[N-1] = back card id
  const [order, setOrder] = useState<number[]>(servicesData.map((s) => s.id));
  // id of the card currently mid-dismiss (flying up)
  const [dismissingId, setDismissingId] = useState<number | null>(null);

  const busy = useRef(false);
  const lastCycleAt = useRef(0);

  useEffect(() => setMounted(true), []);

  // Cycle Forward (Scroll Down)
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
      setTimeout(() => {
        busy.current = false;
      }, 500);
    }, 320);
  }, [order]);

  // Cycle Backward (Scroll Up)
  const reverseCycle = useCallback(() => {
    const now = Date.now();
    if (busy.current || now - lastCycleAt.current < 650) return;

    busy.current = true;
    lastCycleAt.current = now;

    const backId = order[order.length - 1];
    
    // Pop the back card to the front
    setOrder((prev) => {
      const newOrder = [...prev];
      const last = newOrder.pop()!;
      newOrder.unshift(last);
      return newOrder;
    });
    
    // Keep it in "dismissing" state so it renders high up
    setDismissingId(backId);

    // Immediately snap it down to position 0
    setTimeout(() => {
      setDismissingId(null);
      setTimeout(() => {
        busy.current = false;
      }, 500);
    }, 20);
  }, [order]);

  // Global Wheel handler (attached to window so it always works)
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

  // Touch handler for mobile
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

  // Keyboard navigation
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
        <div
          className="w-full lg:w-[58%] h-full flex items-center justify-center overflow-hidden cursor-default"
          style={{ touchAction: "none" }}
        >
          {/* Mobile header */}
          <div className="absolute top-0 left-0 right-0 lg:hidden px-6 pt-24 pb-4 text-center pointer-events-none z-50">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">What We Do</p>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Expertise
              </span>
            </h1>
          </div>

          {/* 3-D card stack */}
          <div className="relative" style={{ width: 370, height: 490, perspective: 1000 }}>
            {/* Render back-to-front so the front card is on top in DOM stacking */}
            {[...order].reverse().map((id, revIdx) => {
              const pos = order.length - 1 - revIdx; // 0 = front
              const card = servicesData.find((s) => s.id === id)!;
              const isDismissing = dismissingId === id;

              // Cards deeper than 4 are invisible (no reason to render)
              if (pos > 4) return null;

              return (
                <motion.div
                  key={id}
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{
                    // Keep the dismissing card on top while it flies up
                    zIndex: isDismissing ? N + 10 : N - pos,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  }}
                  animate={
                    isDismissing
                      ? {
                          // Phase 1: fly slightly up
                          y: -110,
                          scale: 0.9,
                          rotate: -2,
                        }
                      : {
                          // Normal stacked position
                          y: pos * STACK_Y,
                          scale: 1 - pos * SCALE_STEP,
                          rotate: 0,
                          opacity: pos > 3 ? 0 : 1,
                        }
                  }
                  transition={
                    isDismissing
                      ? { type: "spring", stiffness: 380, damping: 22 }
                      : {
                          // Bouncy spring for the "snap to back" moment
                          type: "spring",
                          stiffness: 160,
                          damping: 13,
                          mass: 1.1,
                        }
                  }
                  // Allow swiping the front card
                  drag={pos === 0 ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.y < -50 || velocity.y < -500) {
                      cycle();
                    } else if (offset.y > 50 || velocity.y > 500) {
                      reverseCycle();
                    }
                  }}
                >
                  {/* Glass card */}
                  <div className="w-full h-full flex flex-col bg-white/70 backdrop-blur-xl border border-gray-200/60 pointer-events-none">
                    {/* Image strip */}
                    <div className="relative w-full h-[195px] shrink-0 overflow-hidden">
                      <img
                        src={card.imageSrc}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/95" />
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 px-7 pb-7 pt-4 text-left">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-xs font-bold tracking-widest text-blue-600 uppercase border border-blue-100 mb-3 self-start">
                        {card.meta}
                      </span>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                        {card.description}
                      </p>
                      {/* Interactive button (pointer-events-auto restores clickability inside the pointer-events-none card) */}
                      <Link
                        href={card.href}
                        className="mt-4 inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors group pointer-events-auto w-max"
                      >
                        Get Started{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll hint pill at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 pointer-events-none select-none">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-xs font-semibold tracking-widest uppercase"
            >
              ↓ Scroll or Swipe
            </motion.div>
          </div>
        </div>

      </div>
    </InfiniteGrid>
  );
}

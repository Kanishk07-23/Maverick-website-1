"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Feather, Layout, Monitor, Search, BarChart3, Fingerprint, Hexagon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
} as const;

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */
const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18, // Lower damping = subtle overshoot/wobble "tap"
  mass: 1,
} as const;

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      // Detect horizontal scroll primarily, but also fallback to vertical if shift is held
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-[650px] w-full flex-col overflow-hidden bg-[#fafafa] text-gray-900 outline-none select-none overflow-x-hidden",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience & Spotlight (Light Mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Bright spotlight light ray from top-left */}
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[160%] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,1),transparent_65%)] -rotate-12 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-br from-white/70 via-transparent to-transparent -rotate-12 blur-[15px] pointer-events-none" />
        
        {/* Ambient pastel background glow behind the active card */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-transparent blur-3xl"
          />
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[480px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 320;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.5;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute h-[400px] md:h-[460px] w-[280px] md:w-[320px] transition-shadow duration-300",
                  isCenter ? "z-20" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{
                  ...BASE_SPRING,
                  scale: TAP_SPRING,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <div className="h-full w-full rounded-[28px] bg-[#ffffff] border border-gray-200/60 shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col relative group">
                  {/* The Inner Gradient & Dotted Texture for the bottom half */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-[65%] transition-all duration-700 pointer-events-none z-0",
                    isCenter ? "bg-gradient-to-t from-[#9333ea] via-[#b975f8] to-[#9333ea]/0 opacity-100" : "bg-gradient-to-t from-gray-50 to-transparent opacity-100"
                  )}>
                    {/* The dotted texture */}
                    <div className={cn(
                         "absolute inset-0 transition-opacity duration-700",
                         isCenter ? "opacity-30" : "opacity-0"
                       )} 
                         style={{
                           backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
                           backgroundSize: '8px 8px',
                           maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                           WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                         }} 
                    />
                  </div>

                  {/* Top visual area */}
                  <div className="w-full h-[55%] p-2 relative z-10">
                    <div className={cn(
                      "w-full h-full rounded-[20px] relative overflow-hidden flex items-center justify-center transition-colors duration-700",
                      isCenter ? "bg-gradient-to-br from-purple-50 to-blue-50" : "bg-gray-100/50"
                    )}>
                      {/* Glossy light streaks */}
                      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/80 via-transparent to-transparent rotate-12 pointer-events-none opacity-80" />
                      
                      {/* Icon Container */}
                      <div className={cn(
                        "relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-[24px] flex items-center justify-center backdrop-blur-md border transition-all duration-700",
                        isCenter ? "bg-white/60 border-white shadow-[0_8px_30px_rgb(147,51,234,0.12)]" : "bg-white/40 border-white/50 shadow-sm"
                      )}>
                        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/80 to-transparent opacity-60 pointer-events-none" />
                        
                        <div className={cn(
                          "relative z-20 transition-colors duration-700",
                          isCenter ? "text-[#9333ea]" : "text-gray-400"
                        )}>
                          {index === 0 ? <Feather className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /> :
                           index === 1 ? <Layout className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /> :
                           index === 2 ? <Monitor className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /> :
                           index === 3 ? <Search className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /> :
                           index === 4 ? <BarChart3 className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /> :
                           index === 5 ? <Fingerprint className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /> :
                           <Hexagon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom text area */}
                  <div className="flex-1 px-6 pt-4 pb-6 flex flex-col justify-between relative z-10">
                    <div>
                      <h3 className={cn(
                        "text-[20px] md:text-[22px] font-bold leading-tight mb-3 transition-colors duration-700",
                        isCenter ? "text-white" : "text-gray-400"
                      )}>
                        {item.title}
                      </h3>
                      <p className={cn(
                        "text-xs md:text-sm leading-relaxed line-clamp-3 transition-colors duration-700",
                        isCenter ? "text-purple-50" : "text-gray-500"
                      )}>
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <Link href={item.href || "#"} className={cn(
                        "inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                        isCenter 
                          ? "bg-white text-[#9333ea] shadow-lg shadow-purple-900/20 hover:scale-105" 
                          : "bg-gray-50 text-gray-400 border border-transparent pointer-events-none"
                      )}>
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </div>
    </div>
  );
}

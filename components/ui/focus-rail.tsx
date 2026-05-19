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

const cardThemes = [
  { // Index 0: Personal Branding (Bronze/Gold)
    topBg: "bg-gradient-to-br from-amber-500/15 via-stone-800/30 to-stone-950/50",
    glowColor: "from-amber-500/20 via-amber-600/10 to-transparent",
    iconColor: "text-amber-300",
    hexFill: "fill-amber-500/10 stroke-amber-500/35",
    bottomBg: "from-amber-600/80 via-amber-500/10 to-transparent"
  },
  { // Index 1: Social Media (Blue/Purple)
    topBg: "bg-gradient-to-br from-blue-600/15 via-purple-600/20 to-purple-950/50",
    glowColor: "from-purple-500/20 via-blue-500/10 to-transparent",
    iconColor: "text-purple-200",
    hexFill: "fill-purple-600/25 stroke-purple-400/40",
    bottomBg: "from-[#9333ea]/80 via-[#b975f8]/10 to-transparent"
  },
  { // Index 2: Web Dev (Rose/Pink)
    topBg: "bg-gradient-to-br from-rose-500/15 via-purple-900/30 to-stone-950/50",
    glowColor: "from-rose-500/20 via-purple-500/10 to-transparent",
    iconColor: "text-rose-300",
    hexFill: "fill-rose-500/15 stroke-rose-400/35",
    bottomBg: "from-rose-600/80 via-rose-500/10 to-transparent"
  },
  { // Index 3: SEO (Teal/Emerald)
    topBg: "bg-gradient-to-br from-teal-500/15 via-emerald-900/30 to-stone-950/50",
    glowColor: "from-teal-500/20 via-emerald-500/10 to-transparent",
    iconColor: "text-teal-300",
    hexFill: "fill-teal-500/15 stroke-teal-400/35",
    bottomBg: "from-teal-600/80 via-teal-500/10 to-transparent"
  },
  { // Index 4: Performance Marketing (Cyan/Blue)
    topBg: "bg-gradient-to-br from-cyan-500/15 via-blue-900/30 to-stone-950/50",
    glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    iconColor: "text-cyan-300",
    hexFill: "fill-cyan-500/15 stroke-cyan-400/35",
    bottomBg: "from-cyan-600/80 via-cyan-500/10 to-transparent"
  },
  { // Index 5: Strategy (Violet/Indigo)
    topBg: "bg-gradient-to-br from-violet-500/15 via-indigo-900/30 to-stone-950/50",
    glowColor: "from-violet-500/20 via-indigo-500/10 to-transparent",
    iconColor: "text-violet-300",
    hexFill: "fill-violet-500/15 stroke-violet-400/35",
    bottomBg: "from-violet-600/80 via-violet-500/10 to-transparent"
  }
];

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
        "group relative flex h-screen w-full flex-col overflow-hidden bg-[#06080c] text-white outline-none select-none overflow-x-hidden justify-center",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience & Spotlight (1:1 Dark Mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Spotlight light ray from top-left */}
        <div className="absolute -top-[40%] -left-[10%] w-[65%] h-[160%] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_55%)] -rotate-[25deg] pointer-events-none blur-2xl" />
        <div className="absolute top-0 left-0 w-[25%] h-full bg-gradient-to-br from-white/[0.03] via-transparent to-transparent -rotate-[25deg] blur-[20px] pointer-events-none" />
        
        {/* Soft colorful background glow behind the active card */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/10 blur-3xl"
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
                <div className="h-full w-full rounded-[32px] bg-[#0c1017] border border-white/5 shadow-2xl overflow-hidden flex flex-col relative group">
                  {/* The Inner Gradient & Dotted Texture for the bottom half */}
                  {index < cardThemes.length && (
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-[60%] transition-all duration-700 pointer-events-none z-0",
                      isCenter ? "opacity-100" : "opacity-0"
                    )}>
                      <div className={cn("absolute inset-0 bg-gradient-to-t", cardThemes[index].bottomBg)} />
                      <div className="absolute inset-0 opacity-20" 
                           style={{
                             backgroundImage: 'radial-gradient(circle at center, #ffffff 1.2px, transparent 1.2px)',
                             backgroundSize: '10px 10px',
                             maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                             WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                           }} 
                      />
                    </div>
                  )}

                  {/* Top visual area */}
                  <div className="w-full h-[55%] p-3 relative z-10">
                    <div className={cn(
                      "w-full h-full rounded-[24px] relative overflow-hidden flex items-center justify-center transition-colors duration-700",
                      isCenter && index < cardThemes.length ? cardThemes[index].topBg : "bg-white/[0.02] border border-white/5"
                    )}>
                      {/* Glossy light streaks */}
                      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 pointer-events-none opacity-40" />
                      <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-bl from-white/[0.05] via-transparent to-transparent pointer-events-none" />
                      
                      {/* Rounded Hexagon Shape */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                          <polygon 
                            points="50,6 88,28 88,72 50,94 12,72 12,28" 
                            className={cn(
                              "transition-all duration-700",
                              isCenter && index < cardThemes.length ? cardThemes[index].hexFill : "fill-white/[0.02] stroke-white/10"
                            )}
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                        
                        <div className={cn(
                          "relative z-20 transition-colors duration-700",
                          isCenter && index < cardThemes.length ? cardThemes[index].iconColor : "text-white/40"
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
                        isCenter ? "text-white" : "text-white/40"
                      )}>
                        {item.title}
                      </h3>
                      <p className={cn(
                        "text-xs md:text-sm leading-relaxed line-clamp-3 transition-colors duration-700",
                        isCenter ? "text-white/70" : "text-white/20"
                      )}>
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <Link href={item.href || "#"} className={cn(
                        "inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold rounded-full transition-all duration-300",
                        isCenter 
                          ? "bg-white text-black shadow-lg hover:scale-105" 
                          : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
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

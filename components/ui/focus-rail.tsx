"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Feather, Layout, Monitor, Search, BarChart3, Fingerprint, Hexagon } from "lucide-react";
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

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
} as const;

const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18,
  mass: 1,
} as const;

/**
 * Each card's top-section silky sheen colour (the background the light beams sit on).
 * Colours are deliberately desaturated/dark so the white light-beam overlays
 * give the silky, iridescent look seen in the reference image.
 */
const CARD_THEMES = [
  {
    // Warm gold / amber
    topBase: "#1a1204",
    topGlow: "rgba(200,150,30,0.90)",
    hexBorder: "rgba(220,170,60,0.60)",
    hexGlow: "rgba(200,140,30,0.40)",
    iconColor: "text-amber-100",
    bottomGlow: null,
  },
  {
    // Blue-purple (active card in image)
    topBase: "#080818",
    topGlow: "rgba(110,70,240,0.95)",
    hexBorder: "rgba(150,110,255,0.65)",
    hexGlow: "rgba(130,80,255,0.45)",
    iconColor: "text-purple-100",
    bottomGlow: "rgba(120,40,210,0.45)",
  },
  {
    // Rose / mauve
    topBase: "#160a10",
    topGlow: "rgba(200,60,120,0.90)",
    hexBorder: "rgba(220,100,150,0.55)",
    hexGlow: "rgba(190,60,110,0.35)",
    iconColor: "text-rose-100",
    bottomGlow: null,
  },
  {
    // Teal
    topBase: "#061210",
    topGlow: "rgba(20,180,150,0.90)",
    hexBorder: "rgba(40,210,170,0.55)",
    hexGlow: "rgba(20,170,140,0.35)",
    iconColor: "text-teal-100",
    bottomGlow: null,
  },
  {
    // Cyan-blue
    topBase: "#060c18",
    topGlow: "rgba(20,130,230,0.90)",
    hexBorder: "rgba(50,160,255,0.55)",
    hexGlow: "rgba(20,130,220,0.35)",
    iconColor: "text-cyan-100",
    bottomGlow: null,
  },
  {
    // Violet-indigo
    topBase: "#0a0818",
    topGlow: "rgba(130,50,230,0.90)",
    hexBorder: "rgba(160,90,255,0.55)",
    hexGlow: "rgba(130,50,220,0.35)",
    iconColor: "text-violet-100",
    bottomGlow: null,
  },
];

const CARD_ICONS = [Feather, Layout, Monitor, Search, BarChart3, Fingerprint];

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

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 20) {
        if (delta > 0) handleNext(); else handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-screen w-full flex-col overflow-hidden bg-transparent text-gray-50 outline-none select-none overflow-x-hidden justify-center",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Page-level ambient glow (light mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 65%, rgba(147,51,234,0.06) 0%, transparent 70%)",
            }}
          />
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        <motion.div
          className="relative mx-auto flex h-[500px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
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

            const xOffset = offset * 300;
            const zOffset = -dist * 150;
            const scale = isCenter ? 1 : 0.82;
            const rotateY = offset * -18;
            const opacity = isCenter ? 1 : Math.max(0.15, 1 - dist * 0.45);
            const blur = isCenter ? 0 : dist * 5;
            const brightness = isCenter ? 1 : 0.45;

            const theme = CARD_THEMES[index % CARD_THEMES.length];
            const Icon = CARD_ICONS[index % CARD_ICONS.length];

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute h-[430px] md:h-[480px] w-[270px] md:w-[310px]",
                  isCenter ? "z-20" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{ ...BASE_SPRING, scale: TAP_SPRING }}
                style={{ transformStyle: "preserve-3d" }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {/* ── CARD SHELL ── */}
                <div
                  className="h-full w-full flex flex-col overflow-hidden"
                  style={{
                    borderRadius: "28px",
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isCenter
                      ? "0 24px 60px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.04) inset"
                      : "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                >

                  {/* ── TOP VISUAL SECTION (silky sheen with diagonal light beams) ── */}
                  <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: "52%", borderRadius: "28px 28px 20px 20px", padding: "10px" }}>
                    {/* Inner rounded panel */}
                    <div
                      className="relative w-full h-full overflow-hidden flex items-center justify-center"
                      style={{
                        borderRadius: "20px",
                        background: theme.topBase,
                      }}
                    >
                      {/* The coloured ambient glow in the centre of the top panel */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse 90% 80% at 50% 60%, ${theme.topGlow} 0%, transparent 70%)`,
                        }}
                      />

                      {/* Diagonal silky light-beam streaks — the key look from the image */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `
                            linear-gradient(
                              125deg,
                              transparent 20%,
                              rgba(255,255,255,0.07) 30%,
                              rgba(255,255,255,0.16) 36%,
                              rgba(255,255,255,0.07) 42%,
                              transparent 52%,
                              rgba(255,255,255,0.04) 60%,
                              rgba(255,255,255,0.10) 65%,
                              rgba(255,255,255,0.04) 70%,
                              transparent 80%
                            )
                          `,
                        }}
                      />
                      {/* Secondary shorter beam for realism */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `
                            linear-gradient(
                              115deg,
                              transparent 55%,
                              rgba(255,255,255,0.03) 62%,
                              rgba(255,255,255,0.08) 66%,
                              rgba(255,255,255,0.03) 70%,
                              transparent 76%
                            )
                          `,
                        }}
                      />

                      {/* ── HEXAGON ICON ── */}
                      <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
                        {/* SVG hex with glass fill + glowing border */}
                        <svg
                          viewBox="0 0 100 100"
                          className="absolute inset-0 w-full h-full"
                          style={{ filter: `drop-shadow(0 4px 20px ${theme.hexGlow})` }}
                        >
                          <defs>
                            <linearGradient id={`hexGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                              <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                            </linearGradient>
                          </defs>
                          <polygon
                            points="50,5 88,27.5 88,72.5 50,95 12,72.5 12,27.5"
                            fill={`url(#hexGrad-${index})`}
                            stroke={theme.hexBorder}
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {/* Icon */}
                        <div className={cn("relative z-10 transition-colors duration-700", theme.iconColor)}>
                          <Icon className="w-9 h-9" strokeWidth={1.4} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── BOTTOM TEXT SECTION ── */}
                  <div className="relative flex-1 flex flex-col justify-between px-6 pt-5 pb-6 overflow-hidden">

                    {/* Very subtle radial glow bleeding up from bottom — ONLY on active cards that have bottomGlow */}
                    {isCenter && theme.bottomGlow && (
                      <div
                        className="absolute bottom-0 left-0 right-0 pointer-events-none"
                        style={{
                          height: "70%",
                          background: `radial-gradient(ellipse 120% 60% at 50% 100%, ${theme.bottomGlow} 0%, transparent 70%)`,
                          opacity: 0.7,
                        }}
                      />
                    )}

                    {/* Ultra-fine halftone dot texture — only visible on active card, bottom-right area */}
                    {isCenter && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, rgba(0,0,0,0.18) 0.7px, transparent 0.7px)",
                          backgroundSize: "5px 5px",
                          maskImage:
                            "radial-gradient(ellipse 70% 60% at 80% 90%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
                          WebkitMaskImage:
                            "radial-gradient(ellipse 70% 60% at 80% 90%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)",
                          opacity: 0.4,
                        }}
                      />
                    )}

                    {/* Text content */}
                    <div className="relative z-10">
                      <h3
                        className="font-bold leading-tight mb-3"
                        style={{
                          fontSize: "clamp(17px, 2vw, 21px)",
                          color: isCenter ? "rgba(17,24,39,0.97)" : "rgba(17,24,39,0.30)",
                          transition: "color 0.5s",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="leading-relaxed line-clamp-4"
                        style={{
                          fontSize: "12px",
                          color: isCenter ? "rgba(75,85,99,0.90)" : "rgba(17,24,39,0.20)",
                          transition: "color 0.5s",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="relative z-10 mt-4">
                      <Link
                        href={item.href || "#"}
                        className="inline-flex items-center justify-center font-semibold transition-all duration-300"
                        style={{
                          padding: "8px 22px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          background: isCenter ? "rgba(17,24,39,0.92)" : "rgba(0,0,0,0.04)",
                          color: isCenter ? "#ffffff" : "rgba(17,24,39,0.25)",
                          border: isCenter ? "none" : "1px solid rgba(0,0,0,0.08)",
                          pointerEvents: isCenter ? "auto" : "none",
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
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Feather,
  LayoutGrid,
  Monitor,
  Search,
  BarChart3,
  Fingerprint,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Types                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

export type AccordionItem = {
  id: string | number;
  title: string;
  description: string;
  meta?: string;
  href?: string;
  icon?: LucideIcon;
};

interface HorizontalAccordionProps {
  items: AccordionItem[];
  className?: string;
  ctaPrefix?: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Per-card dark color themes (Fey-style)                                      */
/*                                                                             */
/*  Pure dark charcoal cards, each with a unique colored radial glow           */
/*  appearing in the bottom-left of the expanded card (ambient orb).           */
/* ─────────────────────────────────────────────────────────────────────────── */

const CARD_THEMES = [
  {
    // 1 – Warm amber
    cardBg: "linear-gradient(160deg, #1c1810 0%, #111008 50%, #0d0c08 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(200,155,50,0.28) 0%, transparent 60%)",
    iconColor: "rgba(200,160,70,0.9)",
    iconBg: "rgba(200,155,50,0.12)",
    titleColor: "#e8d9b0",
    textColor: "rgba(220,205,165,0.65)",
    metaColor: "rgba(200,160,70,0.7)",
    border: "rgba(200,155,50,0.14)",
    borderActive: "rgba(200,155,50,0.25)",
    ctaBg: "rgba(200,155,50,0.1)",
    ctaBorder: "rgba(200,155,50,0.2)",
    ctaText: "rgba(220,185,90,0.95)",
    inactiveText: "rgba(200,180,130,0.7)",
  },
  {
    // 2 – Violet / lavender
    cardBg: "linear-gradient(160deg, #130f1e 0%, #0d0b16 50%, #080710 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(140,110,220,0.28) 0%, transparent 60%)",
    iconColor: "rgba(160,130,230,0.9)",
    iconBg: "rgba(140,110,220,0.12)",
    titleColor: "#d4c8f0",
    textColor: "rgba(200,185,230,0.65)",
    metaColor: "rgba(160,130,230,0.7)",
    border: "rgba(140,110,220,0.14)",
    borderActive: "rgba(140,110,220,0.25)",
    ctaBg: "rgba(140,110,220,0.1)",
    ctaBorder: "rgba(140,110,220,0.2)",
    ctaText: "rgba(180,155,240,0.95)",
    inactiveText: "rgba(185,170,220,0.7)",
  },
  {
    // 3 – Sage / muted green
    cardBg: "linear-gradient(160deg, #0d1610 0%, #08100a 50%, #070d08 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(80,160,100,0.28) 0%, transparent 60%)",
    iconColor: "rgba(100,185,120,0.9)",
    iconBg: "rgba(80,160,100,0.12)",
    titleColor: "#bce0c5",
    textColor: "rgba(170,215,180,0.65)",
    metaColor: "rgba(100,185,120,0.7)",
    border: "rgba(80,160,100,0.14)",
    borderActive: "rgba(80,160,100,0.25)",
    ctaBg: "rgba(80,160,100,0.1)",
    ctaBorder: "rgba(80,160,100,0.2)",
    ctaText: "rgba(120,200,140,0.95)",
    inactiveText: "rgba(155,200,165,0.7)",
  },
  {
    // 4 – Cool slate blue
    cardBg: "linear-gradient(160deg, #0c1220 0%, #080d18 50%, #060912 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(70,130,210,0.28) 0%, transparent 60%)",
    iconColor: "rgba(100,160,235,0.9)",
    iconBg: "rgba(70,130,210,0.12)",
    titleColor: "#b8d0f0",
    textColor: "rgba(165,200,235,0.65)",
    metaColor: "rgba(100,160,235,0.7)",
    border: "rgba(70,130,210,0.14)",
    borderActive: "rgba(70,130,210,0.25)",
    ctaBg: "rgba(70,130,210,0.1)",
    ctaBorder: "rgba(70,130,210,0.2)",
    ctaText: "rgba(120,175,240,0.95)",
    inactiveText: "rgba(150,185,225,0.7)",
  },
  {
    // 5 – Rose / blush
    cardBg: "linear-gradient(160deg, #1e0e10 0%, #160a0c 50%, #100808 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(210,80,100,0.28) 0%, transparent 60%)",
    iconColor: "rgba(235,110,130,0.9)",
    iconBg: "rgba(210,80,100,0.12)",
    titleColor: "#f0c0ca",
    textColor: "rgba(230,175,185,0.65)",
    metaColor: "rgba(235,110,130,0.7)",
    border: "rgba(210,80,100,0.14)",
    borderActive: "rgba(210,80,100,0.25)",
    ctaBg: "rgba(210,80,100,0.1)",
    ctaBorder: "rgba(210,80,100,0.2)",
    ctaText: "rgba(240,130,148,0.95)",
    inactiveText: "rgba(210,165,175,0.7)",
  },
  {
    // 6 – Warm stone / greige
    cardBg: "linear-gradient(160deg, #181510 0%, #110f0c 50%, #0d0b09 100%)",
    glow: "radial-gradient(ellipse 70% 60% at 15% 90%, rgba(180,155,110,0.28) 0%, transparent 60%)",
    iconColor: "rgba(200,175,130,0.9)",
    iconBg: "rgba(180,155,110,0.12)",
    titleColor: "#e0d0b8",
    textColor: "rgba(215,200,170,0.65)",
    metaColor: "rgba(200,175,130,0.7)",
    border: "rgba(180,155,110,0.14)",
    borderActive: "rgba(180,155,110,0.25)",
    ctaBg: "rgba(180,155,110,0.1)",
    ctaBorder: "rgba(180,155,110,0.2)",
    ctaText: "rgba(210,185,145,0.95)",
    inactiveText: "rgba(195,180,150,0.7)",
  },
];

const DEFAULT_ICONS: LucideIcon[] = [
  Feather, LayoutGrid, Monitor, Search, BarChart3, Fingerprint,
];

/* Framer spring for card width transition */
const SPRING = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 0.8,
} as const;

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Component                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

export function HorizontalAccordion({
  items,
  className,
  ctaPrefix = "Preview",
}: HorizontalAccordionProps) {
  const [activeId, setActiveId] = React.useState<string | number>(items[0]?.id);

  return (
    <div
      className={cn("flex w-full h-full items-stretch gap-[10px]", className)}
      role="tablist"
      aria-label="Services accordion"
    >
      {items.map((item, i) => {
        const isActive = activeId === item.id;
        const Icon = item.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length];
        const theme = CARD_THEMES[i % CARD_THEMES.length];

        return (
          <motion.div
            key={item.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`accordion-panel-${item.id}`}
            id={`accordion-tab-${item.id}`}
            onClick={() => setActiveId(item.id)}
            className={cn(
              "relative flex-shrink-0 overflow-hidden cursor-pointer select-none",
              "rounded-[18px]"
            )}
            style={{
              background: theme.cardBg,
              border: `1px solid ${isActive ? theme.borderActive : theme.border}`,
              boxShadow: isActive
                ? `0 0 0 1px ${theme.borderActive} inset, 0 20px 60px -10px rgba(0,0,0,0.6)`
                : `0 2px 16px rgba(0,0,0,0.4)`,
              transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            }}
            animate={{ flex: isActive ? 4.8 : 1 }}
            transition={SPRING}
            whileHover={
              !isActive
                ? {
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 30 },
                  }
                : undefined
            }
          >
            {/* ── INACTIVE: centred vertical title + icon at bottom ── */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-between py-6 px-2",
                "transition-opacity duration-300",
                isActive ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              {/* Top: small icon */}
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                style={{ background: theme.iconBg }}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: theme.iconColor }}
                  strokeWidth={1.8}
                />
              </div>

              {/* Middle: vertical title */}
              <span
                className="font-medium whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  color: theme.inactiveText,
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </span>

              {/* Bottom: dot indicator */}
              <div
                className="w-1.5 h-1.5 rounded-full opacity-50"
                style={{ background: theme.iconColor }}
              />
            </div>

            {/* ── ACTIVE: expanded content ── */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`accordion-tab-${item.id}`}
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.15, duration: 0.4, ease: "easeOut" },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="absolute inset-0 flex flex-col justify-between p-7"
                >
                  {/* Ambient colored glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: theme.glow }}
                  />

                  {/* Top content */}
                  <div className="relative z-10 flex flex-col gap-5">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                      style={{ background: theme.iconBg }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: theme.iconColor }}
                        strokeWidth={1.6}
                      />
                    </div>

                    <div>
                      <h3
                        className="font-semibold leading-tight mb-2"
                        style={{
                          fontSize: "clamp(14px, 1.3vw, 19px)",
                          color: theme.titleColor,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.title}
                      </h3>

                      {item.meta && (
                        <p
                          className="font-semibold tracking-[0.18em] uppercase mb-3"
                          style={{
                            fontSize: "9px",
                            color: theme.metaColor,
                          }}
                        >
                          {item.meta}
                        </p>
                      )}

                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: "clamp(11px, 0.9vw, 13px)",
                          color: theme.textColor,
                          lineHeight: 1.65,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="relative z-10">
                    <Link
                      href={item.href ?? "/contact"}
                      className="inline-flex items-center gap-1.5 font-medium tracking-wide rounded-full border transition-all duration-200 hover:opacity-100 active:scale-95"
                      style={{
                        padding: "7px 16px",
                        fontSize: "11px",
                        background: theme.ctaBg,
                        borderColor: theme.ctaBorder,
                        color: theme.ctaText,
                        opacity: 0.9,
                      }}
                    >
                      <Icon className="w-3 h-3" strokeWidth={2} />
                      {ctaPrefix} {item.title.split(" ")[0].toLowerCase()}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

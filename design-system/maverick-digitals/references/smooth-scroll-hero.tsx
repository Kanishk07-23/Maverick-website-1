// REFERENCE: SmoothScrollHero — Cinematic Window-Zoom Entry Animation
// Source: User-provided component (21st.dev style)
// Dependencies: framer-motion
//
// HOW IT WORKS:
// - This is the FIRST thing users see when the website loads
// - The page starts with a BLACK background covering the entire viewport
// - Inside it, a small "window" (clip-path polygon) shows the hero content
// - Initial clip-path: polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%) — centered rectangle
// - As user scrolls down (over ~1500px):
//   * clip-path expands: 25% → 0% (start), 75% → 100% (end) — window fills the screen
//   * backgroundSize shrinks: 170% → 100% — zoom-out parallax effect
// - Once fully expanded, the hero section is full-screen
// - Uses sticky positioning so the animation stays in view during scroll
// - Total scroll area: scrollHeight (1500px) + 100vh
//
// FLOW FOR MAVERICK DIGITALS:
// 1. Page loads → black screen with small window showing hero content
// 2. User scrolls → window expands, background zooms out
// 3. Window reaches full screen → hero section is now fully visible
// 4. Continue scrolling → FlowArt takes over with section pinning/rotation
//
// ARCHITECTURE:
// [SmoothScrollHero (window zoom)] → [Hero Section (full screen)] → [FlowArt sections]

"use client";
import * as React from "react";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
  /**
   * Height of the scroll section in pixels
   * @default 1500
   */
  scrollHeight: number;
  /**
   * Background image URL for desktop view
   * @default "https://images.unsplash.com/photo-1511884642898-4c92249e20b6"
   */
  desktopImage: string;
  /**
   * Background image URL for mobile view
   * @default "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=2412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   */
  mobileImage: string;
  /**
   * Initial clip path percentage
   * @default 25
   */
  initialClipPercentage: number;
  /**
   * Final clip path percentage
   * @default 75
   */
  finalClipPercentage: number;
}

interface iISmoothScrollHeroBackgroundProps extends iISmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<
  iISmoothScrollHeroBackgroundProps
> = ({
  scrollHeight,
  desktopImage,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
}) => {
  const {scrollY} = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0],
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100],
  );

  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, scrollHeight + 500],
    ["170%", "100%"],
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-black"
      style={{
        clipPath,
        willChange: "transform, opacity",
      }}
    >
      {/* Mobile background */}
      <motion.div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Desktop background */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${desktopImage})`,
          backgroundSize,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.div>
  );
};

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
  mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=2412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  return (
    <div
      style={{height: `calc(${scrollHeight}px + 100vh)`}}
      className="relative w-full"
    >
      <SmoothScrollHeroBackground
        scrollHeight={scrollHeight}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
      />
    </div>
  );
};
export default SmoothScrollHero;

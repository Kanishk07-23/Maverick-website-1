"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { useMemo, useRef } from "react";

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase: [typeof easeIntoFocus, typeof easeOutOfFocus] = [
  easeIntoFocus,
  easeOutOfFocus,
];

type TileConfig = {
  perspective: number;
  maxTilt: number;
  maxBlur: number;
  rounded: string;
};

function Tile({
  item,
  index,
  renderItem,
  config,
  scrollContainer,
}: {
  item: any;
  index: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  config: TileConfig;
  scrollContainer: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    container: scrollContainer,
    offset: ["start end", "end start"],
  });

  const reduce = useReducedMotion();
  const { perspective, maxTilt, maxBlur, rounded } = config;

  const blur     = useTransform(p, [0, 0.4, 0.6, 1], [maxBlur, 0, 0, maxBlur]);
  const bright   = useTransform(p, [0, 0.4, 0.6, 1], [0.3, 1, 1, 0.3]);
  const contrast = useTransform(p, [0, 0.4, 0.6, 1], [2, 1, 1, 2]);

  const ty = useTransform(p, [0, 0.4, 0.6, 1], ["60%", "0%", "0%", "-60%"]);
  const tz = useTransform(p, [0, 0.4, 0.6, 1], [200, 0, 0, 200]);
  const rx = useTransform(p, [0, 0.4, 0.6, 1], [maxTilt, 0, 0, -maxTilt]);
  const rot = useTransform(p, [0, 0.4, 0.6, 1], [-4, 0, 0, 4]);
  const sk  = useTransform(p, [0, 0.4, 0.6, 1], [10, 0, 0, -10]);
  const scale = useTransform(p, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);

  const filter = useMotionTemplate`blur(${blur}px) brightness(${bright}) contrast(${contrast})`;

  if (reduce) {
    return (
      <figure ref={ref} className="relative z-10 m-0 w-full">
        <div className="w-full" style={{ borderRadius: rounded }}>
          {renderItem(item, index)}
        </div>
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className="relative z-10 m-0 w-full flex justify-center"
      style={{ perspective }}
    >
      <motion.div
        className="w-full"
        style={{
          filter,
          y: ty,
          z: tz,
          rotate: rot,
          rotateX: rx,
          skewX: sk,
          scale,
          borderRadius: rounded,
          transformStyle: "preserve-3d",
        }}
      >
        {renderItem(item, index)}
      </motion.div>
    </motion.figure>
  );
}

export type ScrollTiltedListProps = {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  scrollContainer: React.RefObject<HTMLElement | null>;
  perspective?: number;
  maxTilt?: number;
  maxBlur?: number;
  rounded?: string;
  className?: string;
};

export function ScrollTiltedList({
  items = [],
  renderItem,
  scrollContainer,
  perspective = 1000,
  maxTilt = 55,
  maxBlur = 6,
  rounded = "1.5rem",
  className,
}: ScrollTiltedListProps) {
  const config = useMemo<TileConfig>(
    () => ({ perspective, maxTilt, maxBlur, rounded }),
    [perspective, maxTilt, maxBlur, rounded],
  );

  return (
    <div className={["flex flex-col gap-12 pb-[50vh] pt-[25vh] px-6", className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <Tile
          key={`${i}-${item.id || i}`}
          item={item}
          index={i}
          renderItem={renderItem}
          config={config}
          scrollContainer={scrollContainer}
        />
      ))}
    </div>
  );
}

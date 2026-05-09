"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  maskGradient?: string;
}

export const GridBackground = ({
  className,
  dotSize = 1,
  gap = 20,
  color = "var(--dot-color)",
  maskGradient = "radial-gradient(ellipse at center, white, transparent 80%)",
}: GridBackgroundProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
      style={{
        backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
      }}
    />
  );
};

export const GridLines = ({
  className,
  size = 40,
  color = "var(--border)",
  opacity = 0.1,
}: {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        opacity: opacity,
      }}
    />
  );
};

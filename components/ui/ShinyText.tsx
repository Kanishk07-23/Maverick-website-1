"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const ShinyText = ({
  children,
  className,
  shimmerWidth = 100,
}: {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}) => {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ width: shimmerWidth }}
        animate={{
          left: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </span>
  );
};

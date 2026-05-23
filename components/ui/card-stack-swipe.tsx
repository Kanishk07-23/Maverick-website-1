"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 150;

export interface ServiceCardData {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface CardStackSwipeProps {
  cards: ServiceCardData[];
  className?: string;
}

export function CardStackSwipe({ cards: initialCards, className }: CardStackSwipeProps) {
  const [cards, setCards] = useState(initialCards);

  const handleSwipe = (id: string | number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  // If we run out of cards, optionally we can reset or show a message.
  // For now, let's just render the remaining stack.
  
  return (
    <div className={cn("relative w-full max-w-sm mx-auto h-[400px] flex items-center justify-center perspective-[1000px]", className)}>
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          // The first card in the array is the top of the stack
          const isTop = index === 0;
          return (
            <SwipeableCard
              key={card.id}
              card={card}
              index={index}
              totalCards={cards.length}
              isTop={isTop}
              onSwipe={() => handleSwipe(card.id)}
            />
          );
        })}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
          <p>No more services to show.</p>
          <button 
            onClick={() => setCards(initialCards)} 
            className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            Reset Stack
          </button>
        </div>
      )}
    </div>
  );
}

interface SwipeableCardProps {
  card: ServiceCardData;
  index: number;
  totalCards: number;
  isTop: boolean;
  onSwipe: () => void;
}

function SwipeableCard({ card, index, isTop, onSwipe }: SwipeableCardProps) {
  const x = useMotionValue(0);
  
  // Rotate between -10 and 10 degrees based on horizontal drag distance
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  
  // Fade out as it gets further from center to give a neat exit effect
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Cards underneath scale down and shift downwards
  const yOffset = index * 20; 
  const scale = 1 - index * 0.05;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      onSwipe();
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute w-full h-[320px] bg-black border border-white/10 rounded-3xl shadow-2xl flex flex-col p-8",
        isTop ? "cursor-grab active:cursor-grabbing" : "cursor-default"
      )}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 50 - index,
        opacity: isTop ? opacity : 1 - index * 0.2, // background cards fade out slightly
      }}
      animate={{
        y: yOffset,
        scale: scale,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-2xl pointer-events-none" />

      {card.icon && (() => {
        const Icon = card.icon;
        return (
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Icon />
          </div>
        );
      })()}
      
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{card.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-auto">
        {card.description}
      </p>

      {/* Swipe Indicator (only visible on top card) */}
      {isTop && (
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-500 mt-6 font-medium">
          <span className="flex items-center gap-1">
            <span className="text-lg">←</span> Swipe
          </span>
          <span className="flex items-center gap-1">
             Swipe <span className="text-lg">→</span>
          </span>
        </div>
      )}
    </motion.div>
  );
}

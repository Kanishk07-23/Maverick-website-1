"use client";
import { motion } from "framer-motion";
import React from "react";

export const CardStack = ({ items }: { items: { id: string | number; content: React.ReactNode }[] }) => {
  return (
    <div className="relative h-60 w-96">
      {items.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute h-full w-full rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-2xl shadow-2xl"
          initial={{ 
            y: index * -20, 
            scale: 1 - index * 0.05,
            zIndex: items.length - index 
          }}
          // The "Secret Sauce": Spring physics for that premium feel
          whileHover={{ 
            y: -40,
            rotate: 2,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          animate={{
            y: index * -20,
            scale: 1 - index * 0.05,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <p className="text-white/80 font-medium">{card.content}</p>
        </motion.div>
      ))}
    </div>
  );
};
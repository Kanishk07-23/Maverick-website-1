"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface CardItem {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  href?: string;
  buttonText?: string;
}

const defaultCards: CardItem[] = [
  {
    title: 'Card one',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
  },
  {
    title: 'Card two',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
  },
  {
    title: 'Card three',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
  },
];

export default function SkewCards({
  cards: customCards,
  buttonText: globalButtonText,
}: {
  cards?: CardItem[];
  buttonText?: string;
}) {
  const cards = customCards || defaultCards;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Outer clip container */}
      <div ref={containerRef} className="relative w-full overflow-hidden">

        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(48,33%,97%), transparent)' }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-30 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(48,33%,97%), transparent)' }}
        />

        {/* Draggable horizontal track */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 25, timeConstant: 300 }}
          whileTap={{ cursor: 'grabbing' }}
          className="flex flex-nowrap items-center py-16 px-20 will-change-transform"
          style={{ cursor: 'grab' }}
        >
          {cards.map(({ title, desc, gradientFrom, gradientTo, href, buttonText }, idx) => (
            <div
              key={idx}
              className="group relative flex-shrink-0 w-[320px] h-[400px] mx-8 transition-all duration-500"
            >
              {/* Skewed gradient panel */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
              />
              {/* Blurred glow panel */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
              />

              {/* Animated corner blobs */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              </span>

              {/* Card content */}
              <div className="relative z-20 left-0 p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[60px_40px] h-full">
                <h2 className="text-2xl mb-2">{title}</h2>
                <p className="text-lg leading-relaxed mb-4">{desc}</p>
                <a
                  href={href || '#'}
                  draggable={false}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block text-lg font-bold text-black bg-white px-3 py-2 rounded hover:bg-[#ffcf4d] hover:border hover:border-[rgba(255,0,88,0.4)] hover:shadow-md transition-colors duration-200"
                >
                  {buttonText || globalButtonText || 'Read More'}
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
      `}</style>
    </>
  );
}

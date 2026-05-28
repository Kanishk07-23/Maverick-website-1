"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardItem {
  tempId: number | string;
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  href?: string;
}

type CardInput = Omit<CardItem, 'tempId'>;

const defaultCards: CardInput[] = [
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

export default function SkewCards({ cards: customCards }: { cards?: CardInput[] }) {
  const [cardsList, setCardsList] = useState<CardItem[]>(
    (customCards || defaultCards).map((c, i) => ({ ...c, tempId: i }))
  );
  const [spacing, setSpacing] = useState(390);
  const [isMobile, setIsMobile] = useState(false);

  // ── Scrolling mechanism ────────────────────────────────────────────────
  const handleMove = (steps: number) => {
    const newList = [...cardsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setCardsList(newList);
  };

  useEffect(() => {
    const update = () => {
      const mobile = !window.matchMedia('(min-width: 640px)').matches;
      setIsMobile(mobile);
      setSpacing(mobile ? 260 : 390);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  // Container height: leave 80px below card bottom for nav buttons
  const containerH = isMobile ? 520 : 600;

  return (
    <>
      <div className="relative w-full overflow-hidden" style={{ height: containerH }}>
        {cardsList.map((card, index) => {
          const position =
            cardsList.length % 2
              ? index - (cardsList.length + 1) / 2
              : index - cardsList.length / 2;
          const isCenter = position === 0;

          // Mobile: only show center card (smooth crossfade via opacity transition)
          // Desktop: show ±2 cards around center
          const isVisible = isMobile ? isCenter : Math.abs(position) <= 2;

          return (
            <div
              key={card.tempId}
              // On desktop: clicking a side card jumps to it. Mobile: buttons only.
              onClick={() => !isMobile && handleMove(position)}
              className="absolute left-1/2 top-1/2 cursor-pointer group transition-all duration-500 ease-in-out"
              style={{
                width: 320,
                height: 400,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                zIndex: isCenter ? 10 : Math.max(0, 5 - Math.abs(position)),
                // Mobile: center the card, push up 40px so nav buttons don't overlap
                // Desktop: stagger layout with spacing, rotation, scale
                transform: isMobile
                  ? 'translate(-50%, -50%) translateY(-40px)'
                  : `
                      translate(-50%, -50%)
                      translateX(${spacing * position}px)
                      translateY(${isCenter ? -20 : position % 2 ? 15 : -15}px)
                      rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
                      scale(${isCenter ? 1 : 0.88})
                    `,
              }}
            >
              {/* ── Card visuals (untouched from original reference) ── */}

              {/* Skewed gradient panel */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{ background: `linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo})` }}
              />
              {/* Blurred glow */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{ background: `linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo})` }}
              />

              {/* Corner blobs */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              </span>

              {/* Content — button removed, min-h keeps same card size as original */}
              <div className="relative z-20 left-0 min-h-[250px] p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[30px_40px]">
                <h2 className="text-2xl mb-2">{card.title}</h2>
                <p className="text-lg leading-relaxed">{card.desc}</p>
              </div>
              {/* ─────────────────────────────────────────────────────── */}
            </div>
          );
        })}

        {/* Navigation buttons */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          <button
            onClick={() => handleMove(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

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

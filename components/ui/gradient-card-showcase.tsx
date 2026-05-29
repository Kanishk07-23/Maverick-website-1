"use client";

import React, { useState, useEffect, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

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

  // ── Horizontal wheel scroll — one card per gesture, with weight ───────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Cooldown: ignore subsequent wheel events for 650ms after a card moves
    const COOLDOWN_MS = 650;
    let cooling = false;
    let coolTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (cooling) return;

      // Prefer horizontal delta (trackpad swipe), fall back to vertical
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 5) return; // ignore micro-jitter

      cooling = true;
      handleMove(delta > 0 ? 1 : -1);

      coolTimer = setTimeout(() => {
        cooling = false;
      }, COOLDOWN_MS);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (coolTimer) clearTimeout(coolTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsList]);
  // ────────────────────────────────────────────────────────────────────────

  // Container height
  const containerH = isMobile ? 480 : 560;

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: containerH }}
      >
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
              // On desktop: clicking a side card jumps to it. Mobile: wheel/touch only.
              onClick={() => !isMobile && handleMove(position)}
              className={`absolute left-1/2 top-1/2 cursor-pointer group transition-all duration-500 ease-in-out${isMobile && isCenter ? ' mobile-active' : ''}`}
              style={{
                width: 320,
                height: 400,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
                zIndex: isCenter ? 10 : Math.max(0, 5 - Math.abs(position)),
                // Mobile: center the card
                // Desktop: stagger layout with spacing — NO rotation on any card
                transform: isMobile
                  ? 'translate(-50%, -50%) translateY(-20px) scale(0.78)'
                  : `
                      translate(-50%, -50%)
                      translateX(${spacing * position}px)
                      translateY(${isCenter ? -20 : position % 2 ? 15 : -15}px)
                      scale(${isCenter ? 1 : 0.88})
                    `,
              }}
            >
              {/* ── Card visuals ── */}

              {/* Skewed gradient panel */}
              <span
                className="mobile-panel absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{ background: `linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo})` }}
              />
              {/* Blurred glow */}
              <span
                className="mobile-panel absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{ background: `linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo})` }}
              />

              {/* Corner blobs */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="mobile-blob-top absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                <span className="mobile-blob-bottom absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              </span>

              {/* Content */}
              <div className="mobile-content relative z-20 left-0 min-h-[250px] p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[100px_40px]">
                <h2 className="text-2xl mb-2">{card.title}</h2>
                <p className="text-lg leading-relaxed">{card.desc}</p>
              </div>
              {/* ─────────────────────────────────────────────────────── */}
            </div>
          );
        })}

        {/* Scroll hint — replaces nav buttons */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400 select-none pointer-events-none z-20 flex items-center gap-2">
          <span className="text-base">⟵</span> scroll to explore <span className="text-base">⟶</span>
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }

        /* Auto-activate centre card on mobile/touch devices */
        .mobile-active .mobile-panel {
          transform: skewX(0deg);
          left: 20px;
          width: calc(100% - 90px);
        }
        .mobile-active .mobile-blob-top {
          top: -50px;
          left: 50px;
          width: 100px;
          height: 100px;
          opacity: 1;
        }
        .mobile-active .mobile-blob-bottom {
          bottom: -50px;
          right: 50px;
          width: 100px;
          height: 100px;
          opacity: 1;
        }
        .mobile-active .mobile-content {
          left: -25px;
          padding: 100px 40px;
        }

        /* On small screens: tighten offsets so nothing gets clipped */
        @media (max-width: 639px) {
          .mobile-active .mobile-panel {
            left: 15px;
            width: calc(100% - 70px);
          }
          .mobile-active .mobile-blob-top {
            top: -20px;
            left: 20px;
            width: 70px;
            height: 70px;
          }
          .mobile-active .mobile-blob-bottom {
            bottom: -20px;
            right: 20px;
            width: 70px;
            height: 70px;
          }
          .mobile-active .mobile-content {
            left: 0px;
            padding: 50px 24px;
          }
        }
      `}</style>
    </>
  );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  color: string;
  badge?: string;
}

// ─── Wheel Card Component ───────────────────────────────────────────────────
function WheelCard({
  service,
  index,
  rotation,
  radius,
  total,
  activeIndex,
  onNavigate,
}: {
  service: Service;
  index: number;
  rotation: any; // MotionValue
  radius: number;
  total: number;
  activeIndex: number;
  onNavigate: (service: Service) => void;
}) {
  const anglePerItem = 360 / total;
  const baseAngle = index * anglePerItem;

  // Global angle of this card
  const angleDeg = useTransform(rotation, (rot: number) => rot + baseAngle);
  const angleRad = useTransform(angleDeg, (a) => a * (Math.PI / 180));

  // Compute X and Y on the circle
  const x = useTransform(angleRad, (a) => Math.cos(a) * radius);
  const y = useTransform(angleRad, (a) => Math.sin(a) * radius);

  // Distance from the 0-degree (center right) position
  const distDeg = useTransform(angleDeg, (a) => {
    let norm = a % 360;
    if (norm > 180) norm -= 360;
    if (norm < -180) norm += 360;
    return Math.abs(norm);
  });

  // Hide cards that are wrapping around the circle (e.g., card 0 when active is 5)
  // We only show cards that are within 2 indices of the active card.
  const isWrapped = Math.abs(index - activeIndex) > 2;

  // Visual effects based on distance from center
  const scale = useTransform(distDeg, [0, 60, 120], [1, 0.75, 0.5]);
  const baseOpacity = useTransform(distDeg, [0, 45, 90], [1, 0.3, 0]);
  const opacity = useTransform(baseOpacity, (val) => isWrapped ? 0 : val);
  const zIndex = useTransform(distDeg, (d) => 100 - Math.floor(d));

  const cardRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);

  const handleClick = () => {
    // Only allow clicking if the card is roughly in the center position
    if (distDeg.get() > 15) return;
    if (!cardRef.current) return;

    // Save scroll position for returning
    sessionStorage.setItem('maverick_services_scroll', window.scrollY.toString());

    setIsZooming(true);
    
    // Slight delay allows the zoom animation to start before routing
    setTimeout(() => {
      onNavigate(service);
    }, 400); // Increased delay to allow the full-screen transition to play
  };

  if (radius === 0) return null; // Wait for radius calculation

  return (
    <motion.div
      style={{ position: 'absolute', left: 0, top: 0, x, y, zIndex }}
      className="pointer-events-none"
    >
      <motion.div
        animate={{ scale: isZooming ? 3 : 1, opacity: isZooming ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-auto origin-center"
      >
        <motion.div
          style={{ scale, opacity }}
          ref={cardRef}
          onClick={handleClick}
          className="w-[85vw] sm:w-[450px] md:w-[500px] lg:w-[600px] glass-card rounded-[40px] p-8 md:p-12 border border-border/30 transition-colors duration-500 cursor-pointer overflow-hidden group relative"
          whileHover={distDeg.get() < 15 ? { scale: 1.02 } : {}}
        >
          {/* Default static background styling */}
          <div className="absolute inset-0 bg-[var(--card)] z-0" />
          
          {/* Background Glow */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0 pointer-events-none"
            style={{ backgroundColor: service.color }}
          />

          <div className="relative z-10 flex flex-col h-full min-h-[300px] lg:min-h-[400px]">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-sm font-mono font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: `${service.color}15`, color: service.color }}
              >
                0{index + 1}
              </span>
              {service.badge && (
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                  style={{ background: service.color }}
                >
                  {service.badge}
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-black mb-4 tracking-tight leading-tight">
              {service.title}
            </h2>
            <p className="text-lg lg:text-xl font-semibold mb-6" style={{ color: service.color }}>
              {service.tagline}
            </p>

            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8 flex-1 line-clamp-3">
              {service.desc}
            </p>

            <div
              className="flex items-center gap-3 font-bold text-sm lg:text-base transition-transform group-hover:translate-x-2"
              style={{ color: service.color }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `${service.color}15` }}
              >
                <ArrowRight size={20} />
              </div>
              <span>Click to Enter Protocol</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Wheel Layout ──────────────────────────────────────────────────────
export default function ServicesList({ services }: { services: Service[] }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for the seamless transition
  const [transitioningService, setTransitioningService] = useState<Service | null>(null);

  // Restore scroll position on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('maverick_services_scroll');
    if (saved) {
      // Small delay to ensure the DOM is ready
      setTimeout(() => {
        window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
      }, 50);
      sessionStorage.removeItem('maverick_services_scroll');
    }
  }, []);

  // We make the container 500vh to give a huge scroll room, preventing abrupt cutoffs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = services.length;
  // Total rotation to scroll through all services (last service is at index = total - 1)
  const maxRotation = -(total - 1) * (360 / total);
  
  // Map scroll progress directly to wheel rotation
  // Buffer [0, 0.1]: Keep 1st service anchored while user enters section
  // Buffer [0.75, 1]: Keep last service perfectly anchored for a massive 125vh at the end
  const rotation = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.75, 1], 
    [0, 0, maxRotation, maxRotation]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Track active index for UI indicators
  useMotionValueEvent(rotation, 'change', (latest) => {
    const idx = Math.round(Math.abs(latest) / (360 / total));
    if (idx !== activeIndex && idx < total) setActiveIndex(idx);
  });

  // Responsive radius calculation
  const [radius, setRadius] = useState(0);
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(w * 0.7); // Mobile: tighter wheel
      else if (w < 1024) setRadius(w * 0.5); // Tablet
      else setRadius(w * 0.38); // Desktop
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const handleNavigate = (service: Service) => {
    setTransitioningService(service);
    setTimeout(() => {
      router.push(`/services/${service.id}`);
    }, 100);
  };

  return (
    <>
      {/* Seamless Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-500 ease-in-out ${transitioningService ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 mesh-gradient" />
        {transitioningService && (
          <div 
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{ background: `radial-gradient(circle at center, ${transitioningService.color}, transparent 70%)` }}
          />
        )}
      </div>

      <div ref={containerRef} className="relative h-[500vh] w-full">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-[100vw] overflow-hidden bg-background flex flex-col justify-center left-1/2 -translate-x-1/2">
        
        {/* Wheel Center Anchor */}
        {/* Positioned off-screen to the left, so the right side of the wheel arcs through the screen */}
        <div className="absolute left-[-40vw] sm:left-[-20vw] md:left-[-10vw] lg:left-0 top-1/2 w-0 h-0 z-10">
          
          {/* Decorative Wheel SVG Arc */}
          {radius > 0 && (
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 overflow-visible pointer-events-none"
              style={{ width: radius, height: radius * 2 }}
            >
              <circle
                cx="0"
                cy="0"
                r={radius}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="6 12"
                opacity="0.6"
              />
            </svg>
          )}

          {/* Service Cards */}
          {services.map((service, i) => (
            <WheelCard
              key={service.id}
              service={service}
              index={i}
              rotation={rotation}
              radius={radius}
              total={total}
              activeIndex={activeIndex}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Progress Indicators (Dots) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 32 : 8,
                height: 8,
                backgroundColor: i === activeIndex ? services[activeIndex].color : 'var(--border)',
                opacity: i === activeIndex ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        
      </div>
    </div>
    </>
  );
}

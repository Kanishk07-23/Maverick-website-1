'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveCardTransition } from '@/lib/cardTransition';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Octahedron, Cone, Icosahedron, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface Service {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  color: string;
  badge?: string;
}

// ─── 3D Shapes for Services ──────────────────────────────────────────────────
function ServiceShape({ id, color, isDark }: { id: string; color: string; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.4;
    }
  });

  const materialProps = {
    color: color,
    emissive: color,
    emissiveIntensity: isDark ? 0.3 : 0.6,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: isDark ? 0.8 : 0.9,
    wireframe: true,
  };

  const getShape = () => {
    switch (id) {
      case 'branding-strategy':
        return <Torus args={[1.2, 0.4, 16, 100]} />;
      case 'performance-marketing':
        return <Octahedron args={[1.5]} />;
      case 'personal-branding':
        return <Icosahedron args={[1.5, 0]} />;
      case 'seo-sem':
        return <Sphere args={[1.4, 16, 16]} />;
      case 'social-media':
        return <Cone args={[1.2, 2, 16]} />;
      case 'web-dev':
        return <Cylinder args={[1, 1, 2, 16]} />;
      default:
        return <Sphere args={[1.5, 16, 16]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        {getShape()}
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </Float>
  );
}

// ─── Individual card ──────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  onNavigate,
}: {
  service: Service;
  index: number;
  onNavigate: (el: HTMLDivElement, service: Service) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleClick = () => {
    if (!cardRef.current) return;
    onNavigate(cardRef.current, service);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
      className="w-full mb-12 lg:mb-20 cursor-pointer group"
      onClick={handleClick}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden glass-card rounded-[40px] border border-border/40 hover:border-[var(--brand-purple)]/50 transition-colors duration-500"
        style={{
          minHeight: 480,
          background: 'var(--card)',
          boxShadow: `0 24px 64px rgba(0,0,0,0.1), 0 0 40px ${service.color}10`,
        }}
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* 3D Visual Section */}
          <div className="relative w-full lg:w-2/5 h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-border/40 overflow-hidden">
             {/* Radial glow */}
            <div
              className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: `radial-gradient(circle at center, ${service.color}, transparent 70%)` }}
            />
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              dpr={[1, 2]}
              gl={{ alpha: true, antialias: true }}
            >
              <ambientLight intensity={isDark ? 0.5 : 1} />
              <directionalLight position={[5, 5, 5]} intensity={isDark ? 2 : 3} color="#ffffff" />
              <ServiceShape id={service.id} color={service.color} isDark={isDark} />
            </Canvas>
          </div>

          {/* Content Section */}
          <div className="relative z-10 p-8 lg:p-12 w-full lg:w-3/5 flex flex-col justify-center">
            {/* Top accent */}
            <div className="absolute top-0 left-0 bottom-0 w-1 hidden lg:block" style={{ background: service.color }} />
            <div className="absolute top-0 left-0 right-0 h-1 lg:hidden" style={{ background: service.color }} />

            {/* Badge row */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-sm font-mono font-bold px-4 py-1.5 rounded-full"
                style={{ backgroundColor: `${service.color}18`, color: service.color }}
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

            {/* Title */}
            <h2
              className="font-outfit font-black text-foreground leading-tight mb-3 transition-colors duration-300"
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              {service.title}
            </h2>

            {/* Tagline */}
            <p className="text-lg font-semibold mb-6" style={{ color: service.color }}>
              {service.tagline}
            </p>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              {service.desc}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {service.features.map((f, fi) => (
                <div key={fi} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <Check size={12} style={{ color: service.color }} strokeWidth={3} />
                  </div>
                  <span className="text-muted-foreground text-sm font-medium leading-tight">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="group/btn flex items-center gap-3 text-base font-bold mt-auto"
              style={{ color: service.color }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110"
                style={{ background: `${service.color}18` }}
              >
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
              <span>Explore this service</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main List ────────────────────────────────────────────────────────────
export default function ServicesList({ services }: { services: Service[] }) {
  const router = useRouter();

  const handleNavigate = (cardEl: HTMLDivElement, service: Service) => {
    const rect = cardEl.getBoundingClientRect();
    saveCardTransition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      color: service.color,
    });
    router.push(`/services/${service.id}`);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 md:px-0">
      {services.map((service, i) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={i}
          onNavigate={handleNavigate}
        />
      ))}
    </div>
  );
}

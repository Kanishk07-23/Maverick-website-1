'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView, animate } from 'framer-motion';
import { useTheme } from 'next-themes';

// ─── Animated counter (HTML layer) ─────────────────────────────────────────
function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });
    return controls.stop;
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      <span className="text-[var(--brand-purple)]">{suffix}</span>
    </span>
  );
}

// ─── Single orbiting ring (THREE) ──────────────────────────────────────────
function OrbitingRing({
  radius,
  speed,
  tilt,
  color,
  opacity,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const g = new THREE.TorusGeometry(radius, 0.012, 8, 120);
    return g;
  }, [radius]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[tilt, 0, 0]}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// ─── Floating data particle ─────────────────────────────────────────────────
function DataParticle({
  index,
  isDark,
}: {
  index: number;
  isDark: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.3 + Math.random() * 0.8, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const r = useMemo(() => 1.8 + Math.random() * 1.2, []);
  const tiltX = useMemo(() => Math.random() * Math.PI, []);
  const tiltZ = useMemo(() => Math.random() * Math.PI, []);
  const colors = isDark
    ? ['#8b5cf6', '#3b82f6', '#d946ef', '#a78bfa', '#60a5fa']
    : ['#6d28d9', '#2563eb', '#c026d3', '#7c3aed', '#3b82f6'];
  const color = colors[index % colors.length];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + offset;
    ref.current.position.x = r * Math.sin(t) * Math.cos(tiltX);
    ref.current.position.y = r * Math.sin(t) * Math.sin(tiltX);
    ref.current.position.z = r * Math.cos(t) * Math.cos(tiltZ);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// ─── Core pulsing sphere ────────────────────────────────────────────────────
function CoreSphere({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.04;
      ref.current.scale.setScalar(s);
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Core wireframe globe */}
      <mesh ref={ref}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={isDark ? '#8b5cf6' : '#7c3aed'}
          wireframe
          transparent
          opacity={isDark ? 0.18 : 0.35} // More visible in light mode
        />
      </mesh>
      {/* Inner solid */}
      <mesh>
        <sphereGeometry args={[0.88, 32, 32]} />
        <meshPhysicalMaterial
          color={isDark ? '#0f0f1a' : '#ffffff'}
          metalness={isDark ? 0.9 : 0.2}
          roughness={isDark ? 0.05 : 0.2}
          transparent
          opacity={isDark ? 0.7 : 0.3}
        />
      </mesh>
    </group>
  );
}

// ─── Complete 3D scene for one stat ─────────────────────────────────────────
function StatScene({ isDark }: { isDark: boolean }) {
  const ringColor1 = isDark ? '#8b5cf6' : '#6d28d9';
  const ringColor2 = isDark ? '#3b82f6' : '#2563eb';
  const ringColor3 = isDark ? '#d946ef' : '#c026d3';

  return (
    <>
      <ambientLight intensity={isDark ? 0.8 : 1.0} />
      <pointLight position={[3, 3, 3]} intensity={isDark ? 2 : 3} color={ringColor1} />
      <pointLight position={[-3, -3, -3]} intensity={isDark ? 1 : 2} color={ringColor2} />

      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.2}>
        <group>
          <CoreSphere isDark={isDark} />
          <OrbitingRing radius={1.4} speed={0.4} tilt={Math.PI / 4} color={ringColor1} opacity={isDark ? 0.6 : 0.7} />
          <OrbitingRing radius={1.7} speed={-0.25} tilt={Math.PI / 6} color={ringColor2} opacity={isDark ? 0.45 : 0.55} />
          <OrbitingRing radius={2.0} speed={0.18} tilt={Math.PI / 2.5} color={ringColor3} opacity={isDark ? 0.3 : 0.4} />
          {Array.from({ length: 12 }).map((_, i) => (
            <DataParticle key={i} index={i} isDark={isDark} />
          ))}
        </group>
      </Float>
    </>
  );
}

// ─── Single stat card with embedded 3D ──────────────────────────────────────
const stats = [
  { id: 'brands', num: 40, suffix: '+', label: 'Brands Scaled', desc: 'Across India, UAE, USA & UK', delay: 0.1 },
  { id: 'views', num: 15, suffix: 'M+', label: 'Organic Views', desc: 'Through SEO & social media', delay: 0.25 },
  { id: 'roi', num: 200, suffix: '%+', label: 'Average ROI', desc: 'From performance campaigns', delay: 0.4 },
  { id: 'years', num: 5, suffix: '+', label: 'Years Experience', desc: 'As a digital marketing firm', delay: 0.55 },
];

function Stat3DCard({
  stat,
  isDark,
}: {
  stat: typeof stats[0];
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: stat.delay, ease: [0.34, 1.2, 0.64, 1] }}
      className="group relative rounded-3xl overflow-hidden border border-border/40 glass-card glass-card-hover"
      style={{ minHeight: 280 }}
    >
      {/* 3D canvas backdrop */}
      <div className="absolute inset-0 z-0" style={{ height: 180, top: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        >
          <StatScene isDark={isDark} />
        </Canvas>
      </div>

      {/* Gradient overlay so text reads cleanly */}
      <div
        className="absolute z-10 left-0 right-0 bottom-0"
        style={{
          height: '65%',
          background: isDark
            ? 'linear-gradient(to top, rgba(9,9,11,0.98) 0%, rgba(9,9,11,0.82) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.82) 60%, transparent 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-20 flex flex-col justify-end h-full p-6 pt-44">
        <div
          className="font-outfit font-black text-foreground leading-none mb-2"
          style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)' }}
        >
          <AnimatedNumber target={stat.num} suffix={stat.suffix} />
        </div>
        <div className="font-bold text-base text-foreground mb-1">{stat.label}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</div>
      </div>

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.4)' }}
      />
    </motion.div>
  );
}

// ─── Public export ───────────────────────────────────────────────────────────
export default function Stats3DGrid() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <Stat3DCard key={stat.id} stat={stat} isDark={isDark} />
      ))}
    </div>
  );
}

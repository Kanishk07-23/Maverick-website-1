'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */

const GOLD = new THREE.Color('#f59e0b');
const GOLD_BRIGHT = new THREE.Color('#fcd34d');
const PURPLE = new THREE.Color('#8b5cf6');

// Number of coils in the helix
const HELIX_COILS = 4;
const HELIX_RADIUS = 1.2;
const HELIX_HEIGHT = 18;
const HELIX_SEGMENTS = 400;

// Generate helix spine points
function makeHelixPoints(coils: number, radius: number, height: number, segments: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * coils;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      t * height - height / 2,
      Math.sin(angle) * radius
    ));
  }
  return pts;
}

const HELIX_POINTS = makeHelixPoints(HELIX_COILS, HELIX_RADIUS, HELIX_HEIGHT, HELIX_SEGMENTS);
const HELIX_CURVE = new THREE.CatmullRomCurve3(HELIX_POINTS);

/* ═══════════════════════════════════════════════════════════
   HERO SPIRAL — spinning intro object (shown on landing)
═══════════════════════════════════════════════════════════ */

export function HeroSpiral({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const progressRef = useRef(0);

  useMemo(() => {
    return scrollProgress.on('change', (v) => { progressRef.current = v; });
  }, [scrollProgress]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = progressRef.current;
    const elapsed = clock.getElapsedTime();

    // Auto-rotate + scroll-driven tilt
    groupRef.current.rotation.y = elapsed * 0.5 + t * Math.PI * 3;
    groupRef.current.rotation.x = t * Math.PI * 0.5;

    // Scale down and move up as scroll increases (zoom-out transition)
    const scale = Math.max(0.2, 1 - t * 1.8);
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.y = t * 5;
    groupRef.current.position.z = t * -3;
  });

  // Build the helix geometry once
  const helixGeo = useMemo(() => {
    const pts = makeHelixPoints(3, 0.8, 5, 300);
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 300, 0.025, 8, false);
  }, []);

  // Secondary inner helix (offset by PI)
  const innerHelixGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 300; i++) {
      const t = i / 300;
      const angle = t * Math.PI * 6 + Math.PI; // offset
      pts.push(new THREE.Vector3(
        Math.cos(angle) * 0.5,
        t * 5 - 2.5,
        Math.sin(angle) * 0.5
      ));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 300, 0.018, 8, false);
  }, []);

  // Sphere nodes along helix
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const angle = t * Math.PI * 6;
      positions.push([
        Math.cos(angle) * 0.8,
        t * 5 - 2.5,
        Math.sin(angle) * 0.8,
      ]);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main golden helix tube */}
      <mesh geometry={helixGeo}>
        <meshStandardMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner helix */}
      <mesh geometry={innerHelixGeo}>
        <meshStandardMaterial
          color={GOLD_BRIGHT}
          emissive={GOLD_BRIGHT}
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Glow nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial
            color={GOLD_BRIGHT}
            emissive={GOLD_BRIGHT}
            emissiveIntensity={4}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE FIELD
═══════════════════════════════════════════════════════════ */

function ParticleField({ color = '#f59e0b', count = 800 }: { color?: string; count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={color} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO 3D SCENE  (used on landing page only)
═══════════════════════════════════════════════════════════ */

type HeroSceneProps = { scrollProgress: MotionValue<number> };

export function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.05} />
      <pointLight position={[3, 3, 5]} intensity={3} color="#f59e0b" />
      <pointLight position={[-3, -3, 5]} intensity={2} color="#fcd34d" />
      <pointLight position={[0, 0, 8]} intensity={1} color="#8b5cf6" />
      <HeroSpiral scrollProgress={scrollProgress} />
      <ParticleField color="#f59e0b" count={600} />
    </Canvas>
  );
}

/* ═══════════════════════════════════════════════════════════
   SPINE SCENE — scroll-driven helix with orbiting cards
═══════════════════════════════════════════════════════════ */

const SERVICE_COUNT = 6;

function SpineHelix() {
  // The main glowing spine line
  const lineObj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      pts.push(new THREE.Vector3(0, t * HELIX_HEIGHT - HELIX_HEIGHT / 2, 0));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.6 });
    return new THREE.Line(geo, mat);
  }, []);

  const helixLine = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(HELIX_POINTS);
    const mat = new THREE.LineBasicMaterial({ color: GOLD_BRIGHT, transparent: true, opacity: 0.4 });
    return new THREE.Line(geo, mat);
  }, []);

  const helixLineRef = useRef<THREE.Line>(null!);
  useFrame(({ clock }) => {
    // Pulse the helix opacity
    if (helixLine.material instanceof THREE.LineBasicMaterial) {
      helixLine.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    }
  });

  return (
    <>
      <primitive object={lineObj} />
      <primitive object={helixLine} />
    </>
  );
}

function SpineGlowNodes() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const positions: [number, number, number][] = useMemo(() =>
    Array.from({ length: SERVICE_COUNT }, (_, i) => {
      const t = (i + 0.5) / SERVICE_COUNT;
      const angle = t * Math.PI * 2 * HELIX_COILS;
      return [
        Math.cos(angle) * HELIX_RADIUS,
        t * HELIX_HEIGHT - HELIX_HEIGHT / 2,
        Math.sin(angle) * HELIX_RADIUS,
      ];
    }), []);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (mesh && mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissiveIntensity = 2 + Math.sin(clock.getElapsedTime() * 2 + i * 1.2) * 1;
      }
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color={GOLD_BRIGHT} emissive={GOLD_BRIGHT} emissiveIntensity={3} />
        </mesh>
      ))}
    </>
  );
}

/* The camera travels along the spine + orbits */

function SpineCamera({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const progressRef = useRef(0);

  useMemo(() => {
    return scrollYProgress.on('change', (v) => { progressRef.current = v; });
  }, [scrollYProgress]);

  useFrame(({ clock }) => {
    const t = Math.max(0.01, Math.min(progressRef.current, 0.98));
    const elapsed = clock.getElapsedTime();

    // Position along the helix height
    const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2;

    // Camera orbits around the spine at a fixed radius, rotating as we scroll
    const orbitAngle = t * Math.PI * 2 + elapsed * 0.05;
    const camR = 5;
    const targetPos = new THREE.Vector3(
      Math.cos(orbitAngle) * camR,
      y + 1,
      Math.sin(orbitAngle) * camR
    );

    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(0, y, 0);
  });

  return null;
}

type SpineSceneProps = { scrollYProgress: MotionValue<number> };

export default function SpineScene({ scrollYProgress }: SpineSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, -8, 5], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.06} />
        <pointLight position={[3, 5, 5]} intensity={3} color="#f59e0b" />
        <pointLight position={[-3, -5, 5]} intensity={2} color="#fcd34d" />
        <pointLight position={[0, 0, 8]} intensity={1} color="#8b5cf6" />

        <SpineHelix />
        <SpineGlowNodes />
        <ParticleField color="#f59e0b" count={500} />
        <SpineCamera scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}

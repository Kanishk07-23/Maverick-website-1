'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// ─── Slow-rotating icosahedron with proper facet shading ────────────────────
function FloatingIcosahedron({
  position,
  size,
  speed,
  color,
  isDark,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  color: string;
  isDark: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.y = clock.elapsedTime * speed * 0.6;
  });

  return (
    <Float speed={speed} floatIntensity={0.6} rotationIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDark ? 0.15 : 0.08}
          shininess={isDark ? 80 : 120}
          specular={new THREE.Color(isDark ? '#ffffff' : '#a78bfa')}
          transparent
          opacity={isDark ? 0.45 : 0.55}
          side={THREE.FrontSide}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe overlay to show facets */}
      <mesh position={position} scale={[1.002, 1.002, 1.002]}>
        <icosahedronGeometry args={[size, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDark ? 0.25 : 0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// ─── Rotating torus (ring) ──────────────────────────────────────────────────
function FloatingTorus({
  position,
  size,
  speed,
  color,
  isDark,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  color: string;
  isDark: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * speed * 0.5;
    meshRef.current.rotation.z = clock.elapsedTime * speed * 0.3;
  });

  return (
    <Float speed={speed * 0.8} floatIntensity={0.8} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.3, 24, 80]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDark ? 0.2 : 0.1}
          shininess={isDark ? 60 : 100}
          specular={new THREE.Color(isDark ? '#ffffff' : '#818cf8')}
          transparent
          opacity={isDark ? 0.5 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// ─── Octahedron (diamond shape) ─────────────────────────────────────────────
function FloatingOctahedron({
  position,
  size,
  speed,
  color,
  isDark,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  color: string;
  isDark: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * speed * 0.5;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * speed * 0.3) * 0.4;
  });

  return (
    <Float speed={speed * 1.2} floatIntensity={1} rotationIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDark ? 0.18 : 0.1}
          shininess={isDark ? 100 : 150}
          specular={new THREE.Color(isDark ? '#e0d7ff' : '#c4b5fd')}
          transparent
          opacity={isDark ? 0.5 : 0.6}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh position={position} scale={[1.003, 1.003, 1.003]}>
        <octahedronGeometry args={[size]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDark ? 0.2 : 0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// ─── Mouse-reactive group wrapper ───────────────────────────────────────────
function MouseReactiveGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRotation.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRotation.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x, targetRotation.current.y * 0.06, 2, delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y, targetRotation.current.x * 0.06, 2, delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Scene ──────────────────────────────────────────────────────────────────
function BackgroundScene({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const purple = isDark ? '#8b5cf6' : '#7c3aed';
  const blue   = isDark ? '#3b82f6' : '#4f46e5';
  const pink   = isDark ? '#d946ef' : '#c026d3';

  return (
    <MouseReactiveGroup>
      {/* Top-right icosahedron */}
      <FloatingIcosahedron
        position={isMobile ? [2, 1.5, -6] : [4.5, 2, -8]}
        size={isMobile ? 1.0 : 1.8}
        speed={0.5}
        color={purple}
        isDark={isDark}
      />

      {/* Bottom-left icosahedron */}
      <FloatingIcosahedron
        position={isMobile ? [-2, -2, -8] : [-5, -2.5, -11]}
        size={isMobile ? 0.7 : 1.4}
        speed={0.35}
        color={blue}
        isDark={isDark}
      />

      {/* Top-left torus */}
      <FloatingTorus
        position={isMobile ? [-2.5, 2, -9] : [-5, 3, -13]}
        size={isMobile ? 0.8 : 1.6}
        speed={0.45}
        color={pink}
        isDark={isDark}
      />

      {/* Bottom-right octahedron */}
      <FloatingOctahedron
        position={isMobile ? [2.5, -2.5, -7] : [5, -3.5, -10]}
        size={isMobile ? 0.6 : 1.2}
        speed={0.55}
        color={purple}
        isDark={isDark}
      />

      {/* Center-left torus (large, far back) */}
      {!isMobile && (
        <FloatingTorus
          position={[0, 4, -16]}
          size={2.2}
          speed={0.25}
          color={blue}
          isDark={isDark}
        />
      )}
    </MouseReactiveGroup>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function Global3DBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
      >
        {/* Three-point lighting for clear 3D shape definition */}
        <ambientLight intensity={isDark ? 0.4 : 0.6} />
        {/* Key light — strong directional from upper-right */}
        <directionalLight
          position={[8, 8, 6]}
          intensity={isDark ? 2.5 : 3.5}
          color={isDark ? '#ffffff' : '#ffffff'}
        />
        {/* Fill light — softer, from left */}
        <directionalLight
          position={[-6, 2, 4]}
          intensity={isDark ? 1.0 : 1.8}
          color={isDark ? '#8b5cf6' : '#a78bfa'}
        />
        {/* Rim/back light — bottom for depth separation */}
        <directionalLight
          position={[0, -6, -4]}
          intensity={isDark ? 0.6 : 1.0}
          color={isDark ? '#3b82f6' : '#818cf8'}
        />

        <BackgroundScene isDark={isDark} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

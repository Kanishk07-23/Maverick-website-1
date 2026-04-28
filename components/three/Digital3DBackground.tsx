'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// ─── Growth Arrow ───────────────────────────────────────────────────────────
function GrowthArrow({ position, color, isDark }: { position: [number, number, number]; color: string; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.4;
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[Math.PI / 4, 0, -Math.PI / 6]}>
      {/* Arrow Body */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={isDark ? 0.7 : 0.85} />
      </mesh>
      {/* Arrow Head */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.3, 0.6, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} transparent opacity={isDark ? 0.8 : 0.9} />
      </mesh>
    </group>
  );
}

// ─── Network Nodes ──────────────────────────────────────────────────────────
function NetworkNodes({ position, color, isDark }: { position: [number, number, number]; color: string; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(-1, -0.5, 0.5),
    new THREE.Vector3(1, -0.5, 0.5),
    new THREE.Vector3(0, -0.5, -1),
  ], []);

  const lines = useMemo(() => [
    [points[0], points[1]],
    [points[0], points[2]],
    [points[0], points[3]],
    [points[1], points[2]],
    [points[2], points[3]],
    [points[3], points[1]],
  ], [points]);

  return (
    <group ref={groupRef} position={position}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} transparent opacity={isDark ? 0.8 : 0.9} />
        </mesh>
      ))}
      {lines.map((line, i) => (
        <Line key={i} points={line} color={color} lineWidth={1.5} transparent opacity={isDark ? 0.3 : 0.4} />
      ))}
    </group>
  );
}

// ─── Digital Globe ──────────────────────────────────────────────────────────
function DigitalGlobe({ position, color, isDark }: { position: [number, number, number]; color: string; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={isDark ? 0.15 : 0.25} />
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
      groupRef.current.rotation.x, targetRotation.current.y * 0.04, 2, delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y, targetRotation.current.x * 0.04, 2, delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Main Scene ─────────────────────────────────────────────────────────────
function BackgroundScene({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const purple = isDark ? '#8b5cf6' : '#7c3aed';
  const blue   = isDark ? '#3b82f6' : '#4f46e5';
  const pink   = isDark ? '#d946ef' : '#c026d3';

  return (
    <MouseReactiveGroup>
      {/* Top-right: Growth Arrow */}
      <Float speed={1.5} floatIntensity={1.5}>
        <GrowthArrow
          position={isMobile ? [1.5, 2.5, -6] : [4, 2.5, -8]}
          color={purple}
          isDark={isDark}
        />
      </Float>

      {/* Bottom-left: Network Nodes */}
      <Float speed={2} floatIntensity={1}>
        <NetworkNodes
          position={isMobile ? [-1.5, -2.5, -7] : [-4, -3, -9]}
          color={blue}
          isDark={isDark}
        />
      </Float>

      {/* Center-left/Back: Large Wireframe Globe */}
      <DigitalGlobe
        position={isMobile ? [-1, 1, -10] : [-5, 1, -12]}
        color={pink}
        isDark={isDark}
      />
    </MouseReactiveGroup>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function Digital3DBackground() {
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
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
      >
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <directionalLight position={[5, 10, 5]} intensity={isDark ? 1.5 : 2} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={isDark ? 1 : 1.5} color="#8b5cf6" />
        <BackgroundScene isDark={isDark} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

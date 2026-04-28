'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function FloatingShapes({ isDark }: { isDark: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotation.current.y * 0.1,
        2,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotation.current.x * 0.1,
        2,
        delta
      );
    }
  });

  const accent1 = isDark ? '#8b5cf6' : '#7c3aed';
  const accent2 = isDark ? '#3b82f6' : '#2563eb';
  const accent3 = isDark ? '#d946ef' : '#db2777';
  const emissiveIntensity = isDark ? 0.3 : 0.4; // Increased for light mode to pop

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[isMobile ? 1.5 : 2.5, 64, 64]} position={isMobile ? [0, 1, -5] : [2, 0, -5]}>
          <MeshDistortMaterial
            color={accent1}
            emissive={accent1}
            emissiveIntensity={emissiveIntensity}
            speed={2}
            distort={0.4}
            radius={1}
            roughness={0.1}
            metalness={0.9}
            wireframe={isDark}
            transparent
            opacity={isDark ? 1 : 0.85}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <Icosahedron args={[isMobile ? 1 : 2, 0]} position={isMobile ? [-1.5, -2, -8] : [-4, 2, -10]}>
          <meshStandardMaterial
            color={accent2}
            emissive={accent2}
            emissiveIntensity={emissiveIntensity}
            wireframe
            transparent
            opacity={isDark ? 0.4 : 0.6}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={isMobile ? [1.5, 3, -10] : [5, -3, -12]}>
          <torusGeometry args={[isMobile ? 1.5 : 3, 0.4, 16, 100]} />
          <meshStandardMaterial
            color={accent3}
            emissive={accent3}
            emissiveIntensity={emissiveIntensity}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={isDark ? 0.6 : 0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Global3DBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until theme is resolved — prevents hydration flash and
  // avoids server-side rendering of the WebGL Canvas
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className="absolute inset-0 z-[-1] pointer-events-none"
      style={{ position: 'fixed' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Inline lights — no external HDR fetch */}
        <ambientLight intensity={isDark ? 1 : 1.2} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 2 : 1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={isDark ? '#8b5cf6' : '#7c3aed'} />
        <pointLight position={[0, 5, 5]} intensity={isDark ? 1 : 1.5} color={isDark ? '#3b82f6' : '#6366f1'} />

        <FloatingShapes isDark={isDark} />
      </Canvas>
    </div>
  );
}

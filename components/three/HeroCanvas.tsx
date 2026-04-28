'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// Per-instance frame counter — avoids shared global state between canvases
function ParticleField({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // useMemo — safe, runs only inside Canvas (client-only), no window at module scope
  const [positions, colors] = useMemo(() => {
    const count = isMobile ? 1200 : 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 4;

      const t = Math.random();
      if (isDark) {
        col[i * 3]     = 0.49 + t * (0.15 - 0.49);
        col[i * 3 + 1] = 0.23 + t * (0.37 - 0.23);
        col[i * 3 + 2] = 0.93;
      } else {
        col[i * 3]     = 0.43 + t * 0.15;
        col[i * 3 + 1] = 0.16 + t * 0.15;
        col[i * 3 + 2] = 0.85 + t * 0.1;
      }
    }
    return [pos, col];
  }, [isDark, isMobile]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.02 + mouse.x * 0.1;
    meshRef.current.rotation.x = t * 0.01 + mouse.y * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.035 : 0.04}
        vertexColors
        transparent
        opacity={isDark ? 0.75 : 0.55} // Raised from 0.4 → 0.55 in light mode
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GridLines({ isDark }: { isDark: boolean }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  let localFrame = 0;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const step = 2.0;
    const range = 12;

    for (let i = -range; i <= range; i += step) {
      vertices.push(-range, -4, i, range, -4, i);
      vertices.push(i, -4, -range, i, -4, range);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    localFrame++;
    if (localFrame % 4 !== 0) return;
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      const baseOpacity = isDark ? 0.08 : 0.10;
      const pulse = Math.sin(clock.elapsedTime * 0.5) * (isDark ? 0.03 : 0.02);
      mat.opacity = baseOpacity + pulse;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={isDark ? '#7C3AED' : '#5b21b6'}
        transparent
        opacity={isDark ? 0.08 : 0.10}
      />
    </lineSegments>
  );
}

export default function HeroCanvas() {
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
    <Canvas
      id="hero-canvas"
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 1]}
      frameloop="always"
      gl={{ antialias: false, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={isDark ? 0.5 : 0.9} />
      <ParticleField isDark={isDark} isMobile={isMobile} />
      <GridLines isDark={isDark} />
    </Canvas>
  );
}

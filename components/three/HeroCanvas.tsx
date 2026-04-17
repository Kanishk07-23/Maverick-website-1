'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function ParticleField({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const count = 4000; // slightly reduced count for more elegance
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere-like volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 4;

      const t = Math.random();
      if (isDark) {
        // Dark mode: Purple to Blue gradient
        col[i * 3]     = 0.49 + t * (0.15 - 0.49); // R
        col[i * 3 + 1] = 0.23 + t * (0.37 - 0.23); // G
        col[i * 3 + 2] = 0.93 + t * (0.93 - 0.93); // B 
      } else {
        // Light mode: Dark slate/blue with occasional accent
        col[i * 3]     = 0.1 + t * 0.2; // R
        col[i * 3 + 1] = 0.1 + t * 0.2; // G
        col[i * 3 + 2] = 0.2 + t * 0.3; // B
      }
    }
    return [pos, col];
  }, [isDark]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    // Slower rotation for premium cinematic feel
    meshRef.current.rotation.y = t * 0.02 + mouse.x * 0.1;
    meshRef.current.rotation.x = t * 0.01 + mouse.y * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={isDark ? 0.75 : 0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GridLines({ isDark }: { isDark: boolean }) {
  const lineRef = useRef<THREE.LineSegments>(null);

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
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      const baseOpacity = isDark ? 0.08 : 0.04;
      mat.opacity = baseOpacity + Math.sin(clock.elapsedTime * 0.5) * (isDark ? 0.03 : 0.01);
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={isDark ? "#7C3AED" : "#0f172a"} transparent opacity={isDark ? 0.08 : 0.04} />
    </lineSegments>
  );
}

export default function HeroCanvas() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount, default to a safe visual or just what seems like dark fallback.
  // Actually, we can just use a transparent fallback until mounted.
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Canvas
      id="hero-canvas"
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={isDark ? 0.5 : 0.8} />
      <ParticleField isDark={isDark} />
      <GridLines isDark={isDark} />
    </Canvas>
  );
}

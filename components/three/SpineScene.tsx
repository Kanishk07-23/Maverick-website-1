'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */

const GOLD   = new THREE.Color('#f59e0b');
const GOLD_B = new THREE.Color('#fcd34d');
const PURPLE = new THREE.Color('#8b5cf6');

const COILS   = 5;
const RADIUS  = 1.4;
const HEIGHT  = 22;
const SEGS    = 600;

function makeHelixPoints(coils: number, radius: number, height: number, segments: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * coils;
    pts.push(new THREE.Vector3(Math.cos(angle) * radius, t * height - height / 2, Math.sin(angle) * radius));
  }
  return pts;
}

const HELIX_POINTS = makeHelixPoints(COILS, RADIUS, HEIGHT, SEGS);
const HELIX_CURVE  = new THREE.CatmullRomCurve3(HELIX_POINTS);

/* ═══════════════════════════════════════════════════════════
   HERO SPIRAL — spinning intro object (shown on landing)
═══════════════════════════════════════════════════════════ */

export function HeroSpiral({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef  = useRef<THREE.Group>(null!);
  const progressRef = useRef(0);

  useMemo(() => {
    return scrollProgress.on('change', (v) => { progressRef.current = v; });
  }, [scrollProgress]);

  const helixGeo = useMemo(() => {
    const pts = makeHelixPoints(3, 0.9, 6, 400);
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 400, 0.032, 12, false);
  }, []);

  const innerGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      const angle = t * Math.PI * 6 + Math.PI;
      pts.push(new THREE.Vector3(Math.cos(angle) * 0.55, t * 6 - 3, Math.sin(angle) * 0.55));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.022, 10, false);
  }, []);

  const nodePositions = useMemo<[number, number, number][]>(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const t = i / 13;
      const angle = t * Math.PI * 6;
      return [Math.cos(angle) * 0.9, t * 6 - 3, Math.sin(angle) * 0.9];
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = progressRef.current;
    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsed * 0.4 + t * Math.PI * 3;
    groupRef.current.rotation.x = t * Math.PI * 0.4;
    const s = Math.max(0.15, 1 - t * 1.9);
    groupRef.current.scale.setScalar(s);
    groupRef.current.position.y = t * 6;
    groupRef.current.position.z = t * -4;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={helixGeo}>
        <meshStandardMaterial
          color={GOLD} emissive={GOLD} emissiveIntensity={1.8}
          metalness={0.9} roughness={0.1} transparent opacity={0.95}
        />
      </mesh>
      <mesh geometry={innerGeo}>
        <meshStandardMaterial
          color={GOLD_B} emissive={GOLD_B} emissiveIntensity={1.4}
          metalness={0.95} roughness={0.05} transparent opacity={0.75}
        />
      </mesh>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshStandardMaterial color={GOLD_B} emissive={GOLD_B} emissiveIntensity={5} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE FIELD
═══════════════════════════════════════════════════════════ */

function ParticleField({ color = '#f59e0b', count = 900 }: { color?: string; count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO SCENE
═══════════════════════════════════════════════════════════ */

export function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 4, 6]}  intensity={4}   color="#f59e0b" />
      <pointLight position={[-4, -4, 6]} intensity={2.5} color="#fcd34d" />
      <pointLight position={[0, 0, 10]} intensity={1.5} color="#8b5cf6" />
      <HeroSpiral scrollProgress={scrollProgress} />
      <ParticleField color="#f59e0b" count={700} />
    </Canvas>
  );
}

/* ═══════════════════════════════════════════════════════════
   SPINE HELIX — the full-height glowing spine for the services section
═══════════════════════════════════════════════════════════ */

function SpineHelix() {
  /* Main golden tube helix */
  const tubGeo = useMemo(() => {
    return new THREE.TubeGeometry(HELIX_CURVE, 600, 0.038, 14, false);
  }, []);

  /* Thin inner counter-helix */
  const innerGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 600; i++) {
      const t = i / 600;
      const angle = t * Math.PI * 2 * COILS + Math.PI;
      pts.push(new THREE.Vector3(Math.cos(angle) * (RADIUS * 0.5), t * HEIGHT - HEIGHT / 2, Math.sin(angle) * (RADIUS * 0.5)));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 600, 0.022, 10, false);
  }, []);

  /* Vertical centre glow line */
  const axisGeo = useMemo(() => {
    const pts = [new THREE.Vector3(0, -HEIGHT / 2, 0), new THREE.Vector3(0, HEIGHT / 2, 0)];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const innerRef = useRef<THREE.Mesh>(null!);
  const axisLine = useMemo(() => {
    const geo = axisGeo;
    const mat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(geo, mat);
    return line;
  }, [axisGeo]);

  const axisRef = useRef<THREE.Line>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (innerRef.current) {
      const m = innerRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.6 + Math.sin(t * 2.2) * 0.4;
    }
    if (axisLine.material instanceof THREE.LineBasicMaterial) {
      axisLine.material.opacity = 0.3 + Math.sin(t * 1.8) * 0.15;
    }
  });

  return (
    <>
      {/* Outer golden helix tube */}
      <mesh geometry={tubGeo}>
        <meshStandardMaterial
          color={GOLD} emissive={GOLD} emissiveIntensity={1.2}
          metalness={0.92} roughness={0.08} transparent opacity={0.9}
        />
      </mesh>

      {/* Inner counter-helix */}
      <mesh geometry={innerGeo} ref={innerRef}>
        <meshStandardMaterial
          color={GOLD_B} emissive={GOLD_B} emissiveIntensity={1.0}
          metalness={0.96} roughness={0.04} transparent opacity={0.65}
        />
      </mesh>

      {/* Vertical spine axis */}
      <primitive object={axisLine} />
    </>
  );
}

/* ─── Glow spheres at each service node ─── */
function SpineGlowNodes() {
  const SVC = 6;
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  const positions: [number, number, number][] = useMemo(() =>
    Array.from({ length: SVC }, (_, i) => {
      const t = (i + 0.5) / SVC;
      const angle = t * Math.PI * 2 * COILS;
      return [Math.cos(angle) * RADIUS, t * HEIGHT - HEIGHT / 2, Math.sin(angle) * RADIUS];
    }), []);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        const m = mesh.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = 2.5 + Math.sin(clock.getElapsedTime() * 2.5 + i * 1.4) * 1.5;
      }
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} ref={el => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={GOLD_B} emissive={GOLD_B} emissiveIntensity={3} />
        </mesh>
      ))}
    </>
  );
}

/* ─── Scroll-driven camera ─── */
function SpineCamera({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const progressRef = useRef(0);

  useMemo(() => {
    return scrollYProgress.on('change', v => { progressRef.current = v; });
  }, [scrollYProgress]);

  useFrame(({ clock }) => {
    const t      = Math.max(0.01, Math.min(progressRef.current, 0.98));
    const elapsed = clock.getElapsedTime();

    const y = t * HEIGHT - HEIGHT / 2;
    const orbitAngle = t * Math.PI * 2 + elapsed * 0.04;
    const camR = 6;

    const target = new THREE.Vector3(
      Math.cos(orbitAngle) * camR,
      y + 1,
      Math.sin(orbitAngle) * camR
    );
    camera.position.lerp(target, 0.06);
    camera.lookAt(0, y, 0);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════
   SPINE SCENE — exported default
═══════════════════════════════════════════════════════════ */
type SpineSceneProps = { scrollYProgress: MotionValue<number> };

export default function SpineScene({ scrollYProgress }: SpineSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [6, -10, 6], fov: 55, near: 0.1, far: 300 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[4, 6, 6]}   intensity={4}   color="#f59e0b" />
        <pointLight position={[-4, -6, 6]}  intensity={2.5} color="#fcd34d" />
        <pointLight position={[0, 0, 10]}  intensity={1.5} color="#8b5cf6" />
        <pointLight position={[0, 10, 3]}  intensity={2}   color="#f59e0b" />
        <pointLight position={[0, -10, 3]} intensity={1.5} color="#fcd34d" />

        <SpineHelix />
        <SpineGlowNodes />
        <ParticleField color="#f59e0b" count={600} />
        <SpineCamera scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}

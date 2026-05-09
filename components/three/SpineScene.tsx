'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

/* ─── Spine curve definition ───────────────────────────────── */

const SPINE_POINTS = [
  new THREE.Vector3(0,  14, 0),
  new THREE.Vector3(0.6, 10, -0.5),
  new THREE.Vector3(-0.6, 6,  0.5),
  new THREE.Vector3(0.4,  2, -0.4),
  new THREE.Vector3(-0.4,-2,  0.4),
  new THREE.Vector3(0.3, -6, -0.3),
  new THREE.Vector3(0,  -14, 0),
];

const SPINE = new THREE.CatmullRomCurve3(SPINE_POINTS, false, 'catmullrom', 0.5);
const TUBE_POINTS = SPINE.getPoints(200);

/* ─── Glowing Spine Tube ────────────────────────────────────── */

function SpineTube() {
  const matRef = useRef<THREE.LineBasicMaterial>(null!);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(TUBE_POINTS);
    const mat = new THREE.LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.8 });
    matRef.current = mat;
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.opacity = 0.7 + Math.sin(clock.getElapsedTime() * 1.8) * 0.2;
    }
  });

  return <primitive object={lineObj} />;
}

/* ─── Glow spheres along spine ─────────────────────────────── */

function SpineGlowNodes() {
  const fractions = [0.1, 0.22, 0.36, 0.5, 0.64, 0.78, 0.9];

  return (
    <>
      {fractions.map((t, i) => {
        const pt = SPINE.getPointAt(t);
        return (
          <mesh key={i} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={3}
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </>
  );
}

/* ─── Connector lines (branch lines from spine to card positions) */

function ConnectorLines() {
  const primitives = useMemo(() => {
    return [0.15, 0.27, 0.40, 0.53, 0.66, 0.79].map((t, i) => {
      const pt = SPINE.getPointAt(t);
      const side = i % 2 === 0 ? 1 : -1;
      const start = pt.clone();
      const end = new THREE.Vector3(pt.x + side * 2.5, pt.y, pt.z + 1);
      const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const mat = new THREE.LineBasicMaterial({ color: '#8b5cf6', transparent: true, opacity: 0.2 });
      return new THREE.Line(geo, mat);
    });
  }, []);

  return (
    <>
      {primitives.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </>
  );
}

/* ─── Floating particles ────────────────────────────────────── */

function Particles() {
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 32;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#8b5cf6" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ─── Camera driven by scroll ───────────────────────────────── */

function Camera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const t = Math.max(0.01, Math.min(scrollProgress, 0.97));
    const lookAhead = Math.min(t + 0.04, 0.99);

    const camTarget = SPINE.getPointAt(t);
    const lookTarget = SPINE.getPointAt(lookAhead);

    // Camera orbits slightly to the right of spine
    const target = new THREE.Vector3(
      camTarget.x + 3.5 + Math.sin(t * Math.PI * 2) * 0.5,
      camTarget.y + 0.3,
      camTarget.z + 5.5
    );

    camera.position.lerp(target, 0.04);
    camera.lookAt(new THREE.Vector3(lookTarget.x, lookTarget.y, lookTarget.z));
  });

  return null;
}

/* ─── MAIN EXPORT ───────────────────────────────────────────── */

type SpineSceneProps = {
  scrollYProgress: MotionValue<number>;
};

export default function SpineScene({ scrollYProgress }: SpineSceneProps) {
  // Read the current scroll progress as a plain number for Three.js
  const progressRef = useRef(0);

  useRef(() => {
    return scrollYProgress.on('change', (v) => {
      progressRef.current = v;
    });
  });

  // We'll use a wrapper component inside Canvas to get the live value
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3.5, 12, 6], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[0,  10, 5]} intensity={2.5} color="#8b5cf6" />
        <pointLight position={[0, -10, 5]} intensity={1.5} color="#6366f1" />
        <pointLight position={[5,   0, 5]} intensity={1}   color="#3b82f6" />

        <SpineTube />
        <SpineGlowNodes />
        <ConnectorLines />
        <Particles />
        <InnerCamera scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}

/* ─── Inner camera component with motion value subscription ─── */

function InnerCamera({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const progressRef = useRef(0);

  // Subscribe to scroll changes
  useMemo(() => {
    return scrollYProgress.on('change', (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  useFrame(() => {
    const t = Math.max(0.01, Math.min(progressRef.current, 0.97));
    const lookAhead = Math.min(t + 0.04, 0.99);

    const camTarget = SPINE.getPointAt(t);
    const lookTarget = SPINE.getPointAt(lookAhead);

    const target = new THREE.Vector3(
      camTarget.x + 3.5 + Math.sin(t * Math.PI * 2) * 0.6,
      camTarget.y + 0.3,
      camTarget.z + 5.5
    );

    camera.position.lerp(target, 0.04);
    camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
  });

  return null;
}

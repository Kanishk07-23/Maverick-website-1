"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";

/* ─── Per-service geometry configs ──────────────────────────── */
const CONFIGS: Record<
  string,
  { geometry: "torus" | "icosahedron" | "octahedron" | "torusKnot" | "dodecahedron" | "sphere"; color: string; emissive: string }
> = {
  "Personal Branding":      { geometry: "icosahedron",  color: "#7c3aed", emissive: "#4c1d95" },
  "Social Media Management":{ geometry: "torus",        color: "#2563eb", emissive: "#1e40af" },
  "Website & App Development":{ geometry: "octahedron", color: "#0891b2", emissive: "#164e63" },
  "SEO & SEM":              { geometry: "torusKnot",    color: "#059669", emissive: "#064e3b" },
  "Performance Marketing":  { geometry: "dodecahedron", color: "#d97706", emissive: "#78350f" },
  "Branding & Strategy":    { geometry: "sphere",       color: "#db2777", emissive: "#831843" },
};

function Mesh({ type, color, emissive }: { type: string; color: string; emissive: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.35;
    ref.current.rotation.y = clock.elapsedTime * 0.5;
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.3}
      roughness={0.1}
      metalness={0.6}
    />
  );

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        {type === "torus"        && <torusGeometry args={[1, 0.38, 32, 100]} />}
        {type === "icosahedron"  && <icosahedronGeometry args={[1.1, 0]} />}
        {type === "octahedron"   && <octahedronGeometry args={[1.2, 0]} />}
        {type === "torusKnot"    && <torusKnotGeometry args={[0.8, 0.28, 128, 32]} />}
        {type === "dodecahedron" && <dodecahedronGeometry args={[1.1, 0]} />}
        {type === "sphere"       && <sphereGeometry args={[1.1, 32, 32]} />}
        {mat}
      </mesh>
    </Float>
  );
}

export function Service3DIcon({ serviceTitle }: { serviceTitle: string }) {
  const cfg = CONFIGS[serviceTitle] ?? CONFIGS["Personal Branding"];

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4], fov: 40 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, -3, -3]} intensity={0.4} color={cfg.color} />
      <Suspense fallback={null}>
        <Mesh type={cfg.geometry} color={cfg.color} emissive={cfg.emissive} />
      </Suspense>
    </Canvas>
  );
}

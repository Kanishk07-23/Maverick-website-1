'use client';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function RobotBody() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current || !leftArmRef.current || !rightArmRef.current) return;
    
    // Mouse tracking for looking
    const targetX = (state.mouse.x * Math.PI) / 4;
    const targetY = (state.mouse.y * Math.PI) / 4;
    
    // Rotate torso slightly towards mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.5, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.2, 0.05);
    
    // Head tracks mouse more actively
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY * 0.8, 0.1);
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX * 0.8, 0.1);

    // Subtle arm animations (breathing/idle)
    const t = state.clock.elapsedTime;
    leftArmRef.current.rotation.z = Math.sin(t * 2) * 0.05 + 0.1;
    leftArmRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
    
    rightArmRef.current.rotation.z = -Math.sin(t * 2) * 0.05 - 0.1;
    rightArmRef.current.rotation.x = Math.sin(t * 1.5 + Math.PI) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* === TORSO === */}
        <group position={[0, 0, 0]}>
          {/* Main Chest */}
          <mesh castShadow>
            <boxGeometry args={[1.4, 1.6, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Chest Core (Interactive) */}
          <mesh 
            position={[0, 0.2, 0.41]} 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <boxGeometry args={[0.6, 0.4, 0.05]} />
            <meshStandardMaterial 
              color="#7c3aed" 
              emissive="#7c3aed" 
              emissiveIntensity={hovered ? 8 : 2} 
            />
          </mesh>
          {/* Lower Torso detail */}
          <mesh position={[0, -0.5, 0.41]}>
             <boxGeometry args={[0.8, 0.3, 0.05]} />
             <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
          </mesh>
        </group>

        {/* === NECK === */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* === HEAD === */}
        <group ref={headRef} position={[0, 1.4, 0]}>
          {/* Main Head Box */}
          <mesh castShadow>
            <boxGeometry args={[0.9, 0.8, 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Visor Area */}
          <mesh position={[0, 0.1, 0.46]}>
             <boxGeometry args={[0.7, 0.3, 0.1]} />
             <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Glowing Eyes */}
          <mesh position={[-0.15, 0.1, 0.52]}>
             <boxGeometry args={[0.2, 0.08, 0.02]} />
             <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={hovered ? 8 : 2} />
          </mesh>
          <mesh position={[0.15, 0.1, 0.52]}>
             <boxGeometry args={[0.2, 0.08, 0.02]} />
             <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={hovered ? 8 : 2} />
          </mesh>
          {/* Ear Antennas */}
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
        </group>

        {/* === LEFT ARM === */}
        <group position={[-0.9, 0.6, 0]}>
          {/* Shoulder */}
          <mesh castShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          <group ref={leftArmRef}>
            {/* Upper Arm */}
            <mesh position={[-0.1, -0.6, 0]} castShadow>
               <boxGeometry args={[0.4, 1.0, 0.4]} />
               <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Forearm */}
            <mesh position={[-0.1, -1.4, 0.1]} rotation={[-0.2, 0, 0]} castShadow>
               <boxGeometry args={[0.35, 0.8, 0.35]} />
               <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </mesh>
          </group>
        </group>

        {/* === RIGHT ARM === */}
        <group position={[0.9, 0.6, 0]}>
          {/* Shoulder */}
          <mesh castShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          <group ref={rightArmRef}>
            {/* Upper Arm */}
            <mesh position={[0.1, -0.6, 0]} castShadow>
               <boxGeometry args={[0.4, 1.0, 0.4]} />
               <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Forearm */}
            <mesh position={[0.1, -1.4, 0.1]} rotation={[-0.2, 0, 0]} castShadow>
               <boxGeometry args={[0.35, 0.8, 0.35]} />
               <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </mesh>
          </group>
        </group>

      </Float>
    </group>
  );
}

export default function InteractiveRobot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={55} />
        
        {/* Robust standard lighting to prevent external fetch crashes */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, 2, 4]} intensity={0.5} color="#4f46e5" />
        
        <Suspense fallback={null}>
          <RobotBody />
        </Suspense>
      </Canvas>
    </div>
  );
}

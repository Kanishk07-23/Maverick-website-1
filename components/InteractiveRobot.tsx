'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function RobotCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth interaction with mouse
    const targetX = (state.mouse.x * Math.PI) / 6;
    const targetY = (state.mouse.y * Math.PI) / 6;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={hovered ? "#7c3aed" : "#4f46e5"}
            speed={2}
            distort={0.4}
            radius={1}
          />
        </Sphere>
        
        {/* Eye-like Detail */}
        <mesh position={[0, 0, 1]}>
          <boxGeometry args={[0.8, 0.1, 0.1]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function InteractiveRobot() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <RobotCore />
      </Canvas>
    </div>
  );
}

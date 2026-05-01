'use client';
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Text, 
  MeshWobbleMaterial,
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

function RobotBody() {
  const meshRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !headRef.current) return;
    
    // Smooth interaction with mouse
    const targetX = (state.mouse.x * Math.PI) / 8;
    const targetY = (state.mouse.y * Math.PI) / 8;
    
    // Rotate the whole body slightly
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
    
    // Rotate head more aggressively for "looking" effect
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX * 1.5, 0.1);
  });

  return (
    <group ref={meshRef}>
      {/* Robot Head / Main Unit */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {/* Main Visor/Head Shape */}
          <mesh castShadow>
            <capsuleGeometry args={[0.5, 0.5, 32, 32]} />
            <meshStandardMaterial 
              color="#0f172a" 
              roughness={0.1} 
              metalness={0.8} 
              envMapIntensity={2}
            />
          </mesh>

          {/* Glowing Eye Visor */}
          <mesh position={[0, 0.2, 0.4]}>
            <boxGeometry args={[0.6, 0.15, 0.1]} />
            <meshStandardMaterial 
              color="#7c3aed" 
              emissive="#7c3aed" 
              emissiveIntensity={hovered ? 10 : 4} 
            />
          </mesh>

          {/* Secondary Details */}
          <mesh position={[0, -0.2, 0.45]}>
             <boxGeometry args={[0.3, 0.02, 0.05]} />
             <meshStandardMaterial color="#fff" opacity={0.5} transparent />
          </mesh>
        </Float>
      </group>

      {/* Floating Mechanical Rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Float speed={3} rotationIntensity={2} floatIntensity={0.5}>
          <mesh>
            <torusGeometry args={[1.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#7c3aed" transparent opacity={0.3} />
          </mesh>
        </Float>
      </group>
      
      <group rotation={[Math.PI / 2.5, 0.5, 0]}>
        <Float speed={4} rotationIntensity={3} floatIntensity={1}>
          <mesh>
            <torusGeometry args={[1.5, 0.01, 16, 100]} />
            <meshStandardMaterial color="#4f46e5" transparent opacity={0.2} />
          </mesh>
        </Float>
      </group>

      {/* Internal "Core" Energy Sphere */}
      <mesh 
        position={[0, 0, 0]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshWobbleMaterial 
          color="#7c3aed" 
          factor={0.4} 
          speed={2} 
          emissive="#7c3aed"
          emissiveIntensity={hovered ? 5 : 2}
        />
      </mesh>

      {/* Text Label orbiting */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="white"
        font="/fonts/Sora-Bold.ttf"
        anchorX="center"
        anchorY="middle"
      >
        MAVERICK_BOT v1.0
      </Text>
    </group>
  );
}

export default function InteractiveRobot() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        {/* Pro Lighting Setup */}
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={1} />
        <pointLight position={[10, 5, 5]} color="#4f46e5" intensity={1} />
        
        <Suspense fallback={null}>
          <RobotBody />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

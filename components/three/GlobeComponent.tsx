import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { Mesh, Color } from 'three';

export default function GlobeComponent() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const meshRef = useRef<Mesh>(null);
  const wireframeRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.15;
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={isDark ? 0.5 : 1.2} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 2 : 2.5} color={isDark ? "#8b5cf6" : "#ffffff"} />
      <directionalLight position={[-10, -10, -5]} intensity={1} color={isDark ? "#3b82f6" : "#cbd5e1"} />
      <pointLight position={[0, 0, 0]} intensity={isDark ? 0.5 : 1} color={isDark ? "#d946ef" : "#ffffff"} />

      {/* Core solid sphere with glass material */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshPhysicalMaterial 
          color={isDark ? "#000000" : "#ffffff"}
          metalness={isDark ? 0.9 : 0.6}
          roughness={isDark ? 0.1 : 0.02}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={isDark ? 0.8 : 0.3}
        />
      </mesh>

      {/* Outer wireframe sphere */}
      <mesh ref={wireframeRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial 
          color={isDark ? "#8b5cf6" : "#6d28d9"}
          wireframe={true}
          transparent={true}
          opacity={isDark ? 0.15 : 0.35}
        />
      </mesh>
      
      {/* Particles around the globe simulating data nodes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <DataNode key={i} index={i} isDark={isDark} />
      ))}
    </group>
  );
}

function DataNode({ index, isDark }: { index: number, isDark: boolean }) {
  const ref = useRef<Mesh>(null);
  
  // Random position on sphere surface
  const position = useMemo(() => {
    const r = 3.2; // slightly larger than globe
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ];
  }, []);

  // Orbit parameters
  const speed = useMemo(() => 0.2 + Math.random() * 0.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame((state) => {
    if (ref.current) {
        // Simple orbit effect
        const t = state.clock.elapsedTime * speed + offset;
        ref.current.position.x = 3.2 * Math.sin(t) * Math.cos(offset);
        ref.current.position.z = 3.2 * Math.cos(t);
    }
  });

  return (
    <mesh ref={ref} position={position as [number, number, number]}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={isDark ? "#3b82f6" : "#6d28d9"} />
      <pointLight distance={1} intensity={isDark ? 2 : 3} color={isDark ? "#3b82f6" : "#6d28d9"} />
    </mesh>
  );
}

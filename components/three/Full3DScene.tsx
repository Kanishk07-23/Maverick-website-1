import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Environment, Float, Text, Html, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';

// --------------------------------------------------------
// DATA & CONSTANTS
// --------------------------------------------------------
const GOLD = '#f59e0b';
const PURPLE = '#8b5cf6';
const CARDS_DATA = [
  { type: 'hero', size: [6, 4], title: 'WE SCALE\nBRANDS.', desc: 'Growth Protocols Active. Mumbai HQ.' },
  { type: 'service', size: [4, 2.5], num: '01', title: 'PERFORMANCE\nMARKETING', desc: 'Data-driven campaigns engineered purely for ROI. Every rupee tracked, every conversion owned.' },
  { type: 'service', size: [4, 2.5], num: '02', title: 'SEO &\nORGANIC', desc: 'Dominate search, capture intent. Technical SEO and content at scale.' },
  { type: 'service', size: [4, 2.5], num: '03', title: 'SOCIAL\nMEDIA', desc: '15M+ organic views. We build audiences that actually convert.' },
  { type: 'service', size: [4, 2.5], num: '04', title: 'BRAND\nIDENTITY', desc: 'Visual systems that command premium pricing and instant recall.' },
  { type: 'service', size: [4, 2.5], num: '05', title: 'WEB\nDEVELOPMENT', desc: 'Conversion-engineered web experiences. Fast, ruthless, beautiful.' },
  { type: 'stats', size: [5, 3.5], title: 'PROVEN YIELDS.', desc: '40+ Brands Scaled\n15M+ Views\n2.5x ROI\n₹4Cr+ Ad Spend' },
  { type: 'cta', size: [5, 3], title: 'START YOUR PROJECT.', desc: 'maverickdigitals18@gmail.com\nWhatsApp: +91 96198 18332' }
];

// Helix parameters
const COILS = 6;
const RADIUS = 2;
const TOTAL_HEIGHT = 45; // total height of the scrollable content in 3D units

// Generate Helix Curve
function makeHelixCurve(coils: number, radius: number, height: number, segments: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * coils;
    pts.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      -(t * height), // going downwards
      Math.sin(angle) * radius
    ));
  }
  return new THREE.CatmullRomCurve3(pts);
}
const HELIX_CURVE = makeHelixCurve(COILS, RADIUS, TOTAL_HEIGHT, 800);

// --------------------------------------------------------
// COMPONENTS
// --------------------------------------------------------

function GlassyHelix() {
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(HELIX_CURVE, 800, 0.15, 32, false), []);
  const innerTubeGeo = useMemo(() => {
    const innerCurve = makeHelixCurve(COILS, RADIUS * 0.4, TOTAL_HEIGHT, 400);
    return new THREE.TubeGeometry(innerCurve, 400, 0.05, 16, false);
  }, []);

  return (
    <group>
      {/* Outer Thick Glass Helix */}
      <mesh geometry={tubeGeo}>
        <meshPhysicalMaterial 
          transmission={1} 
          thickness={0.8} 
          roughness={0.05} 
          ior={1.4} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
          color={GOLD}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner Glowing Core */}
      <mesh geometry={innerTubeGeo}>
        <meshStandardMaterial 
          color={GOLD} 
          emissive={GOLD} 
          emissiveIntensity={4} 
        />
      </mesh>
    </group>
  );
}

function GlassCard({ data, index, total }: { data: any, index: number, total: number }) {
  // Distribute cards evenly along the height of the helix
  const t = index / (total - 1);
  const yPos = -(t * TOTAL_HEIGHT);
  
  // Cards orbit around the helix
  const angle = t * Math.PI * 2 * COILS;
  // To make the card end up at [0, yPos, cardRadius] in WORLD space when the group rotates by `angle`:
  // Local position is [0, 0, cardRadius] rotated by `-angle` around Y.
  const cardRadius = RADIUS + 1.5;
  const xPos = -Math.sin(angle) * cardRadius;
  const zPos = Math.cos(angle) * cardRadius;

  // The group rotates by `angle`. For the card to have 0 world rotation (facing camera on +Z),
  // its local rotation must be `-angle`.
  const rotationY = -angle;

  return (
    <group position={[xPos, yPos, zPos]} rotation={[0, rotationY, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Glass 3D Plane */}
        <mesh>
          <boxGeometry args={[data.size[0], data.size[1], 0.05]} />
          <meshPhysicalMaterial 
            transmission={1} 
            thickness={0.5} 
            roughness={0.2} 
            ior={1.5} 
            clearcoat={1}
            clearcoatRoughness={0.2}
            color="#222" // Dark tinted glass
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Pure WebGL Text Overlay */}
        <group position={[0, 0, 0.03]}>
          {data.type === 'service' && (
            <Text position={[0, 1, 0]} fontSize={0.15} color="#f59e0b" font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf" letterSpacing={0.2} anchorY="middle">
              {data.num}
            </Text>
          )}
          
          <Text 
            position={[0, data.type === 'hero' ? 0 : 0.3, 0]} 
            fontSize={data.type === 'hero' ? 0.7 : 0.4} 
            color="#ffffff" 
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
            fontWeight="bold"
            textAlign="center"
            anchorY="middle"
            maxWidth={data.size[0] - 0.5}
            lineHeight={1.1}
          >
            {data.title}
          </Text>
          
          <Text 
            position={[0, data.type === 'hero' ? -1 : -0.6, 0]} 
            fontSize={data.type === 'hero' ? 0.18 : 0.15} 
            color="#bbbbbb" 
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
            textAlign="center"
            anchorY="middle"
            maxWidth={data.size[0] - 0.8}
            lineHeight={1.4}
          >
            {data.desc}
          </Text>
        </group>
      </Float>
    </group>
  );
}

function MainScene() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Scroll offset goes from 0 to 1
    const t = scroll.offset;
    
    // Move the entire group UP so we "scroll down" through it
    const targetY = t * TOTAL_HEIGHT;
    
    // Rotate the entire group so it revolves
    // We rotate exactly COILS times so the camera follows the spiral
    const targetRotY = t * Math.PI * 2 * COILS;
    
    // Smooth interpolation
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <GlassyHelix />
      {CARDS_DATA.map((card, i) => (
        <GlassCard key={i} data={card} index={i} total={CARDS_DATA.length} />
      ))}
      <Sparkles count={1000} scale={[10, TOTAL_HEIGHT + 10, 10]} position={[0, -TOTAL_HEIGHT/2, 0]} color={GOLD} size={2} opacity={0.4} />
    </group>
  );
}

// --------------------------------------------------------
// MAIN CANVAS
// --------------------------------------------------------

export default function Full3DScene() {
  return (
    <div className="w-full h-screen bg-black absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={5} color={GOLD} />
        <pointLight position={[-5, -5, 5]} intensity={3} color={PURPLE} />
        
        <Suspense fallback={<Html center><div className="text-[#f59e0b] font-bold text-[10px] tracking-[0.3em] uppercase whitespace-nowrap">Loading 3D Assets...</div></Html>}>
          <Environment preset="city" />
          
          <ScrollControls pages={8} damping={0.1} distance={1}>
            <MainScene />
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
        <div className="w-px h-12 bg-gradient-to-b from-[#f59e0b] to-transparent animate-pulse" />
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#f59e0b] mt-2">Scroll</span>
      </div>
      
      {/* Minimal Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-20">
        <span className="font-bold text-white text-[11px] tracking-[0.3em] uppercase">Maverick Digitals</span>
        <span className="font-bold text-white/50 text-[9px] tracking-[0.2em] uppercase">Mumbai HQ</span>
      </div>
    </div>
  );
}

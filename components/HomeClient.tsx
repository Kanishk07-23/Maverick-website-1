'use client';

import dynamic from 'next/dynamic';
import CustomCursor from './CustomCursor';

/* ── Dynamically imported 3D scenes (no SSR — they need WebGL) ── */
const Full3DScene = dynamic(
  () => import('@/components/three/Full3DScene'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-screen bg-black flex items-center justify-center text-[#f59e0b] text-[10px] tracking-[0.3em] font-bold uppercase">
        Initializing 3D Environment...
      </div>
    ) 
  }
);

export default function HomeClient() {
  return (
    <main className="bg-black w-full h-screen overflow-hidden">
      <CustomCursor />
      <Full3DScene />
    </main>
  );
}

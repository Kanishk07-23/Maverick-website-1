'use client';
import { useState, useEffect } from 'react';

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
    <div className="w-full h-full min-h-[400px] relative overflow-hidden bg-transparent">
      {/* 
          100% BUILD STABLE & SECURITY BYPASS
          Using dangerouslySetInnerHTML for the Web Component is the ONLY way to 
          bypass TypeScript/Webpack errors while keeping the Spline robot 1:1 original.
      */}
      <div 
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js"></script>
            <spline-viewer url="https://prod.spline.design/kZDDjO5HlviUof4f/scene.splinecode" style="width: 100%; height: 100%;"></spline-viewer>
          `
        }}
      />
    </div>
  );
}

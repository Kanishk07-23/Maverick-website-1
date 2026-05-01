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
          DANGER-FREE SPLINE INTEGRATION
          Using an iframe is the ONLY way to guarantee 100% stability on Vercel
          because it completely isolates the 3D engine from the React lifecycle.
      */}
      <iframe 
        src="https://my.spline.design/kZDDjO5HlviUof4f/" 
        frameBorder="0" 
        width="100%" 
        height="100%" 
        title="Maverick 3D Mascot"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          background: 'transparent'
        }}
        loading="lazy"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

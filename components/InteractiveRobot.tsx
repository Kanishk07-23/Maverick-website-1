'use client';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use standard react-spline but with dynamic import to force client-side only
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

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
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/kZDDjO5HlviUof4f/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}

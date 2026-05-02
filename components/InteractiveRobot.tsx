'use client';

import Spline from '@splinetool/react-spline/next';
import { useState, useEffect } from 'react';

export default function InteractiveRobot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extra safety net to ensure we are only rendering on the client
  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] relative flex items-center justify-center overflow-hidden bg-transparent">
      <Spline 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
        className="w-full h-full"
      />
    </div>
  );
}


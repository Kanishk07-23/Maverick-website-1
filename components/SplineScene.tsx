'use client'

import { Suspense, lazy, useState, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleError = (error: ErrorEvent) => {
      if (error.message.includes('Spline') || error.message.includes('WebGL')) {
        setHasError(true);
      }
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent border border-[var(--border)] rounded-xl">
        <p className="text-[var(--muted-foreground)] text-sm uppercase tracking-widest">
          3D Asset Unavailable
        </p>
      </div>
    );
  }

  // Prevent SSR crashes by not rendering Spline until client-side mount
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onError={() => setHasError(true)}
      />
    </Suspense>
  )
}

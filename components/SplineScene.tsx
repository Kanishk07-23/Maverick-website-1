'use client'

import { useState, useEffect, Suspense, lazy } from 'react'

// Use a truly dynamic import that only triggers on the client
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // If we're not on the client yet, or if there was an error, don't show Spline
  if (!mounted || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent border border-[var(--border)] rounded-xl">
        <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
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
        onError={() => setError(true)}
      />
    </Suspense>
  )
}

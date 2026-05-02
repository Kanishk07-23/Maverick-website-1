'use client';

import Spline from '@splinetool/react-spline/next';
import { useState, useEffect, Component, ReactNode } from 'react';

// Error boundary to prevent Spline WebGL crashes from bringing down the entire Next.js site
class SplineErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Spline crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function InteractiveRobot() {
  const [mounted, setMounted] = useState(false);
  const [sceneUrl, setSceneUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    // Spline Web Workers require an absolute URL to fetch the scene file properly
    setSceneUrl(window.location.origin + '/scene.splinecode');
  }, []);

  const fallbackUI = (
    <div className="w-full h-full flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Extra safety net to ensure we are only rendering on the client
  if (!mounted || !sceneUrl) {
    return fallbackUI;
  }

  return (
    <div className="w-full h-full min-h-[400px] relative flex items-center justify-center overflow-hidden bg-transparent">
      <SplineErrorBoundary fallback={fallbackUI}>
        <Spline 
          scene={sceneUrl} 
          className="w-full h-full"
        />
      </SplineErrorBoundary>
    </div>
  );
}


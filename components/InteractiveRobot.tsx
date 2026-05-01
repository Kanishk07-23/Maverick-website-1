'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveRobot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] relative flex items-center justify-center overflow-hidden bg-transparent perspective-[1000px]">
      {/* 
          100% STABLE NATIVE ANIMATION FALLBACK
          WebGL (Canvas/Spline) causes 'Context Lost' memory crashes during Next.js routing.
          Spline's S3 CDN throws 403 Forbidden.
          Solution: Pure DOM & Framer Motion. 0% crash rate, 100% stable.
      */}
      
      {/* Central Core */}
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative w-48 h-48 preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer Ring */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-[var(--brand-purple)] rounded-full opacity-30"
          style={{ transform: 'rotateX(75deg)' }}
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-[var(--brand-blue)] rounded-full opacity-40"
          style={{ transform: 'rotateY(75deg)' }}
        />

        {/* Center Node */}
        <div className="absolute inset-16 bg-[var(--foreground)] rounded-full blur-[1px] opacity-10" />
        
        {/* Floating Data Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--brand-purple)] rounded-full"
            style={{
              top: '50%',
              left: '50%',
              marginTop: '-4px',
              marginLeft: '-4px',
            }}
            animate={{
              x: [
                Math.sin(i) * 100,
                Math.cos(i) * 120,
                Math.sin(i * 2) * 80,
                Math.sin(i) * 100
              ],
              y: [
                Math.cos(i) * 100,
                Math.sin(i) * 120,
                Math.cos(i * 2) * 80,
                Math.cos(i) * 100
              ],
              z: [0, 50, -50, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-purple)_0%,transparent_50%)] opacity-10 mix-blend-screen pointer-events-none" />
      
      {/* Terminal Text Overlay */}
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[var(--brand-purple)] opacity-50 uppercase tracking-[0.2em] pointer-events-none">
        Sys.Core.Online<br />
        WebGL.Bypass.Active
      </div>
    </div>
  );
}

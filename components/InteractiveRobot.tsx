'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * InteractiveRobot — Uses @splinetool/runtime directly (NOT the React wrapper).
 *
 * The React wrapper (@splinetool/react-spline) has opaque error handling —
 * failures are swallowed silently, causing infinite spinners with no diagnostics.
 *
 * Using the runtime directly gives us:
 *  ✓ Full try/catch around the load
 *  ✓ Explicit error messages
 *  ✓ Proper cleanup on unmount
 *  ✓ A real animated fallback if it fails
 */

const SPLINE_SCENE_URL =
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

export default function InteractiveRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  // Use a ref to track loaded state inside the timeout — avoids stale closure bug
  // where the setTimeout callback captures an old snapshot of `status`.
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let app: any = null;
    let cancelled = false;

    const loadScene = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (cancelled) return;

        app = new Application(canvasRef.current!);
        await app.load(SPLINE_SCENE_URL);

        if (!cancelled) {
          loadedRef.current = true;
          setStatus('ready');
        }
      } catch (err) {
        console.error('[InteractiveRobot] Spline load failed:', err);
        if (!cancelled) setStatus('error');
      }
    };

    loadScene();

    // Timeout reads the ref, not the stale state closure
    const timer = setTimeout(() => {
      if (!cancelled && !loadedRef.current) {
        console.warn('[InteractiveRobot] Spline load timed out after 30s');
        setStatus('error');
      }
    }, 30000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (app) {
        try { app.dispose(); } catch { /* already cleaned */ }
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] relative flex items-center justify-center overflow-hidden bg-transparent">

      {/* ── Spline Canvas (always mounted, visibility toggled) ──────── */}
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
        style={{
          opacity: status === 'ready' ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
      />

      {/* ── Loading Spinner ──────────────────────────────────────────── */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-[var(--brand-purple)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ── Animated Fallback (shown when Spline fails or times out) ─ */}
      {status === 'error' && <AnimatedFallback />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Animated Fallback — Pure Framer Motion, zero WebGL dependency.
   Shown only if the Spline runtime cannot load.
   ═══════════════════════════════════════════════════════════════════════ */
function AnimatedFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="relative w-48 h-48"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer ring */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-[var(--brand-purple)] rounded-full opacity-30"
          style={{ transform: 'rotateX(75deg)' }}
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 border border-[var(--brand-blue)] rounded-full opacity-40"
          style={{ transform: 'rotateY(75deg)' }}
        />
        {/* Center node */}
        <div className="absolute inset-16 bg-[var(--foreground)] rounded-full blur-[1px] opacity-10" />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--brand-purple)] rounded-full"
            style={{ top: '50%', left: '50%', marginTop: -4, marginLeft: -4 }}
            animate={{
              x: [Math.sin(i) * 100, Math.cos(i) * 120, Math.sin(i * 2) * 80, Math.sin(i) * 100],
              y: [Math.cos(i) * 100, Math.sin(i) * 120, Math.cos(i * 2) * 80, Math.cos(i) * 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

    </div>
  );
}

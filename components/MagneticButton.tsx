'use client';

import { motion } from 'framer-motion';
import { useRef, useState, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, useCallback, useEffect } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  as?: any;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function MagneticButton({
  children,
  className = '',
  as: Component = 'button',
  href,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cachedRect = useRef<DOMRect | null>(null);
  // Disable magnetic effect on touch/coarse-pointer devices
  const [isPointer, setIsPointer] = useState(true);

  useEffect(() => {
    setIsPointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointer) return; // No-op on touch

    if (!cachedRect.current && ref.current) {
      cachedRect.current = ref.current.getBoundingClientRect();
    }
    const rect = cachedRect.current;
    if (!rect) return;

    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  }, [isPointer]);

  const reset = useCallback(() => {
    cachedRect.current = null;
    setPosition({ x: 0, y: 0 });
  }, []);

  const Wrapper = href ? 'a' : Component;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      // On touch: spring is instant (x/y always 0) so no overhead
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      <Wrapper
        href={href as any}
        {...rest}
        className="relative inline-flex items-center justify-center overflow-hidden w-full h-full group"
      >
        {children}
      </Wrapper>
    </motion.div>
  );
}

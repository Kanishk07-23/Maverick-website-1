'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
}

export default function Reveal({ children, direction = 'up', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // After the transition completes, we release the compositor layer
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    
    // Safety fallback
    const timeout = setTimeout(() => setIsVisible(true), 1000);
    
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // Release the compositor layer ~700ms after animation completes
  useEffect(() => {
    if (!isVisible) return;
    const totalDuration = (0.7 + delay + 0.1) * 1000;
    const timer = setTimeout(() => setSettled(true), totalDuration);
    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(32px)';
        case 'left': return 'translateX(-32px)';
        case 'right': return 'translateX(32px)';
        case 'none': return 'none';
      }
    }
    return 'translate(0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        // willChange is set only while animating, then released to avoid permanent layer promotion
        willChange: settled ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

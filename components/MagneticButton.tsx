'use client';

import { motion } from 'framer-motion';
import { useRef, useState, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  as?: any;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function MagneticButton({ children, className = '', as: Component = 'button', href, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // If we're passing an 'a' tag or Link
  const Wrapper = href ? 'a' : Component;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
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

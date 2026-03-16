"use client";
import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface MagnetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  distance?: number;
  hoverSpeed?: number;
  falloffSpeed?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet = ({
  children,
  distance = 100,
  hoverSpeed = 0.2,
  falloffSpeed = 0.15,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}: MagnetProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const dist = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

      if (dist < distance) {
        setIsActive(true);
        const mouseX = (clientX - centerX) * hoverSpeed;
        const mouseY = (clientY - centerY) * hoverSpeed;
        setPosition({ x: mouseX, y: mouseY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [distance, hoverSpeed]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;

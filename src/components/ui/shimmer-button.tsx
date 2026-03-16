'use client';

import React from 'react';
import { cn } from '@/lib/utils/index';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = '#C9A84C',
  background = '#E94560',
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'shimmer-btn group relative cursor-pointer overflow-hidden whitespace-nowrap px-6 py-2.5',
        'transition-all duration-300 ease-in-out active:scale-95',
        className
      )}
      style={{ '--shimmer-color': shimmerColor, '--btn-bg': background } as React.CSSProperties}
      {...props}
    >
      {/* solid background */}
      <span className="absolute inset-0" style={{ background: 'var(--btn-bg)' }} />

      {/* shimmer layer — slides in from left on hover */}
      <span
        className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-[linear-gradient(110deg,transparent_20%,var(--shimmer-color)_50%,transparent_80%)]',
          'transition-transform duration-700 ease-in-out',
          'group-hover:translate-x-full'
        )}
        aria-hidden
      />

      {/* text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

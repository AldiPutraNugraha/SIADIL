"use client";

import React, { ReactNode } from 'react';

type TooltipProps = {
  content: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
  className?: string;
};

export default function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const pos = (() => {
    switch (placement) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2 origin-bottom';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 translate-y-2 origin-top';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 -translate-x-2 origin-right';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 translate-x-2 origin-left';
      default:
        return '';
    }
  })();

  const arrow = (() => {
    // Arrow positioned based on placement
    const base = 'absolute w-2 h-2 rotate-45 bg-gray-900/95';
    switch (placement) {
      case 'top':
        return `${base} top-full left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${base} bottom-full left-1/2 -translate-x-1/2`;
      case 'left':
        return `${base} left-full top-1/2 -translate-y-1/2`;
      case 'right':
        return `${base} right-full top-1/2 -translate-y-1/2`;
      default:
        return base;
    }
  })();

  return (
    <span className={`relative inline-flex group/tt ${className ?? ''}`}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none hidden group-hover/tt:block group-focus-within/tt:block absolute z-50 px-2 py-1 text-xs text-white rounded-md shadow-sm bg-gray-900/95 ${pos}`}
      >
        {content}
        <span className={arrow} />
      </span>
    </span>
  );
}

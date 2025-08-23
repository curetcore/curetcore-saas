'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const calculatePosition = React.useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;

    let x = 0;
    let y = 0;

    switch (side) {
      case 'top':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.top - tooltipRect.height - spacing;
        break;
      case 'right':
        x = triggerRect.right + spacing;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.bottom + spacing;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - spacing;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // Ajustar si se sale de la pantalla
    const padding = 10;
    x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding));
    y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding));

    setPosition({ x, y });
  }, [side]);

  React.useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 px-3 py-1.5 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg pointer-events-none animate-scale-in",
            className
          )}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {content}
          <div
            className={cn(
              "absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45",
              {
                'bottom-[-4px] left-1/2 -translate-x-1/2': side === 'top',
                'left-[-4px] top-1/2 -translate-y-1/2': side === 'right',
                'top-[-4px] left-1/2 -translate-x-1/2': side === 'bottom',
                'right-[-4px] top-1/2 -translate-y-1/2': side === 'left',
              }
            )}
          />
        </div>
      )}
    </>
  );
}

// Componente más simple para tooltips básicos
export function SimpleTooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {content}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, ReactNode, useRef } from 'react';
import { Button } from '@/_shared/components/ui/Button';

// Outcome Selector Component
interface OutcomeSelectorProps {
  outcomes: { id: string; label: string; probability?: number }[];
  selectedOutcome: string | null;
  onChange: (outcomeId: string) => void;
}

export function OutcomeSelector({ outcomes, selectedOutcome, onChange }: OutcomeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {outcomes.map((outcome) => (
        <button
          key={outcome.id}
          onClick={() => onChange(outcome.id)}
          className={`p-4 rounded-xl border transition-all ${
            selectedOutcome === outcome.id
              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
              : 'bg-black/30 border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          <div className="font-medium">{outcome.label}</div>
          {outcome.probability && (
            <div className="text-sm">{(outcome.probability * 100).toFixed(1)}%</div>
          )}
        </button>
      ))}
    </div>
  );
}

// Probability Slider Component
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export function ProbabilitySlider({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  label 
}: SliderProps) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{label}</span>
          <span className="text-white">{value}%</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--blue-500) 0%, var(--blue-500) ${value}%, var(--gray-700) ${value}%, var(--gray-700) 100%)`
          }}
        />
        <div 
          className="absolute -top-1 w-4 h-4 bg-blue-500 rounded-full shadow"
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        />
      </div>
    </div>
  );
}

// Expandable Section Component
interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function ExpandableSection({ 
  title, 
  children, 
  defaultExpanded = false 
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-200 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-4 bg-black/30">{children}</div>
      </div>
    </div>
  );
}

// Tooltip Component
interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [arrowPosition, setArrowPosition] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Calculate the positioning based on the requested position
    let x = 0;
    let y = 0;
    let arrowClass = '';
    
    switch (position) {
      case 'top':
        x = targetRect.left + targetRect.width / 2;
        y = targetRect.top - 10;
        arrowClass = 'bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45';
        break;
      case 'bottom':
        x = targetRect.left + targetRect.width / 2;
        y = targetRect.bottom + 10;
        arrowClass = 'top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-45';
        break;
      case 'left':
        x = targetRect.left - 10;
        y = targetRect.top + targetRect.height / 2;
        arrowClass = 'right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45';
        break;
      case 'right':
        x = targetRect.right + 10;
        y = targetRect.top + targetRect.height / 2;
        arrowClass = 'left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45';
        break;
    }
    
    setTooltipPosition({ x, y });
    setArrowPosition(arrowClass);
    setIsVisible(true);
  };

  // Adjust tooltip position to keep it in viewport
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let { x, y } = tooltipPosition;
      
      // Adjust horizontally if offscreen
      if (tooltipRect.right > viewportWidth) {
        x = viewportWidth - tooltipRect.width / 2 - 10;
      } else if (tooltipRect.left < 0) {
        x = tooltipRect.width / 2 + 10;
      }
      
      // Adjust vertically if offscreen
      if (tooltipRect.bottom > viewportHeight) {
        y = viewportHeight - tooltipRect.height - 10;
      } else if (tooltipRect.top < 0) {
        y = tooltipRect.height + 10;
      }
      
      if (x !== tooltipPosition.x || y !== tooltipPosition.y) {
        setTooltipPosition({ x, y });
      }
    }
  }, [isVisible, tooltipPosition]);

  const getTooltipStyles = () => {
    switch (position) {
      case 'top':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translate(0, -50%)'
        };
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg border border-gray-700"
          style={getTooltipStyles()}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-900 border-gray-700 ${arrowPosition}`}
          />
        </div>
      )}
    </div>
  );
}

// Loading Spinner Component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function Spinner({ size = 'md', color = 'currentColor' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

// Progress Indicator Component
interface ProgressProps {
  progress: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Progress({ progress, label, size = 'md' }: ProgressProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{label}</span>
          <span className="text-white">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${sizeClasses[size]}`}>
        <div
          className="bg-blue-500 rounded-full h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Lazy Loading Component
interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
}

export function LazyLoad({ children, placeholder }: LazyLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      placeholder || (
        <div className="animate-pulse">
          <div className="h-32 bg-gray-700/50 rounded-xl" />
        </div>
      )
    );
  }

  return <>{children}</>;
}

// Skeleton Loader Component
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '1rem', className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-700/50 rounded ${className}`}
      style={{ width, height }}
    />
  );
}

// Market Card Skeleton
export function MarketCardSkeleton() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton width="48px" height="48px" className="rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton width="70%" height="24px" />
          <Skeleton width="40%" height="16px" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton height="32px" />
        <Skeleton height="32px" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton width="30%" height="16px" />
        <Skeleton width="20%" height="16px" />
      </div>
    </div>
  );
} 

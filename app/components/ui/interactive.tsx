"use client";

import React, { useState, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';

// Skeleton component for loading states
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '12px', className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-gray-800 rounded ${className}`}
      style={{ width, height }}
    />
  );
}

// Button component
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    info: 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  
  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isFullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? disabledClasses : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className="flex items-center justify-center">
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </button>
  );
}

// Input component
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
}

export function Input({
  label,
  error,
  prefix,
  suffix,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {prefix}
          </div>
        )}
        <input
          className={`
            w-full rounded-lg bg-gray-900 border border-gray-700 text-white 
            px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:opacity-60 disabled:cursor-not-allowed
            ${prefix ? 'pl-8' : ''}
            ${suffix ? 'pr-10' : ''}
            ${error ? 'border-red-500' : 'border-gray-700'}
            ${className}
          `}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// ProbabilitySlider component
interface ProbabilitySliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function ProbabilitySlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
}: ProbabilitySliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const getPositionPercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width);
    const newValue = min + percentage * (max - min);
    onChange(Math.min(max, Math.max(min, Math.round(newValue / step) * step)));
  };
  
  return (
    <div 
      className={`h-2 bg-gray-800 rounded-full cursor-pointer relative ${className}`}
      onClick={handleSliderClick}
    >
      {/* Track fill */}
      <div 
        className="h-full bg-blue-600 rounded-full"
        style={{ width: `${getPositionPercentage()}%` }}
      ></div>
      
      {/* Thumb */}
      <div 
        className={`absolute top-1/2 w-4 h-4 bg-white rounded-full -mt-2 -ml-2 shadow-md
                    transition-transform duration-150 transform ${isDragging ? 'scale-125' : 'scale-100'}`}
        style={{ left: `${getPositionPercentage()}%` }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      ></div>
    </div>
  );
} 
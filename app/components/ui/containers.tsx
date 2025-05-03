"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'filled';
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  onClick
}: CardProps) {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-gray-900 shadow-lg border border-teal-900/20',
    bordered: 'bg-gray-900/60 border border-teal-800/30',
    filled: 'bg-gray-800'
  };
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${onClick ? 'cursor-pointer hover:bg-gray-850' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 
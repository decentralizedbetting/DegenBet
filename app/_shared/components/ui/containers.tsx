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
  const baseClasses = 'rounded-lg overflow-hidden transition-all duration-200';
  
  const variantClasses = {
    default: 'terminal-card',
    bordered: 'bg-black/60 border border-green-500/30 backdrop-blur-sm',
    filled: 'bg-black/80 border border-green-500/50'
  };
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${onClick ? 'cursor-pointer hover:bg-black/70 hover:border-green-500/50' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 

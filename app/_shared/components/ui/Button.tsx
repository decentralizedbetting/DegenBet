import React, { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-mono font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider',
  {
    variants: {
      variant: {
        primary: 'btn-degen text-black hover:scale-105 active:scale-95',
        secondary: 'btn-degen-secondary text-green-400 hover:bg-green-500/20 hover:scale-105',
        ghost: 'hover:bg-green-500/10 text-green-400 border border-green-500/30',
        success: 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 hover:scale-105',
        danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:scale-105',
        terminal: 'bg-black/50 border border-green-500/50 text-green-400 hover:bg-green-500/10 font-mono',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button'; 

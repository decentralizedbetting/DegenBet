import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/_shared/lib/utils';

const cardVariants = cva(
  'terminal-card transition-all duration-300 mouse-glow hover-zone',
  {
    variants: {
      variant: {
        default: 'terminal-card',
        terminal: 'bg-terminal border-terminal backdrop-blur-sm',
        gradient: 'bg-gradient-to-b from-green-500/10 to-black/50 border-terminal-light backdrop-blur-sm',
        solid: 'bg-terminal-heavy border-terminal-bright',
        glass: 'bg-terminal-glass border-terminal-light',
      },
      hover: {
        default: 'hover:border-green-500/50 hover:bg-black/60',
        enhanced: 'hover:border-green-500/70 hover:bg-black/60 hover:shadow-green-500/25 hover:scale-[1.02]',
        subtle: 'hover:border-green-500/40',
        none: '',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'terminal-interactive cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: 'enhanced',
      size: 'md',
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, size, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, hover, size, interactive, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-green-400 font-mono glow-text",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-green-300 font-mono", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter"; 

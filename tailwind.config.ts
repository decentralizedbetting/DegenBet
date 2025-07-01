import type { Config } from 'tailwindcss'
import { colors, typography, borderRadius, shadows, spacing } from './app/_shared/styles/design-system'

// Convert number values to strings for Tailwind compatibility
const convertToStringValues = (obj: Record<string, number>): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, String(value)])
  );
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Override default container to match our design system
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Terminal Degen Design System Colors
        terminal: {
          green: '#22c55e',
          'green-bright': '#10b981',
          'green-dark': '#16a34a',
          red: '#ef4444',
          yellow: '#eab308',
          purple: '#a855f7',
          blue: '#3b82f6',
          orange: '#f97316',
        },
        // Matrix/Degen specific colors
        matrix: {
          green: '#00ff41',
          'green-dim': '#22c55e',
          'green-glow': 'rgba(34, 197, 94, 0.4)',
          background: '#000000',
          'background-light': 'rgba(0, 0, 0, 0.8)',
        },
        // Glass morphism colors
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          heavy: 'rgba(255, 255, 255, 0.15)',
          'green-light': 'rgba(34, 197, 94, 0.05)',
          'green-medium': 'rgba(34, 197, 94, 0.1)',
        },
        // Map our design system colors to Tailwind
        gray: colors.gray,
        success: {
          light: colors.success.light,
          DEFAULT: colors.success.default,
          dark: colors.success.dark,
        },
        warning: {
          light: colors.warning.light,
          DEFAULT: colors.warning.default,
          dark: colors.warning.dark,
        },
        danger: {
          light: colors.danger.light,
          DEFAULT: colors.danger.default,
          dark: colors.danger.dark,
        },
        info: {
          light: colors.info.light,
          DEFAULT: colors.info.default,
          dark: colors.info.dark,
        },
        yes: colors.yes,
        no: colors.no,
        // Network-specific colors
        ethereum: colors.networks.ethereum,
        optimism: colors.networks.optimism,
        arbitrum: colors.networks.arbitrum,
        polygon: colors.networks.polygon,
        // shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: typography.fontFamily.sans.split(','),
        mono: typography.fontFamily.mono.split(','),
        // Terminal-specific font stacks
        terminal: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        ...typography.fontSize,
        // Terminal-specific sizes
        'terminal-xs': ['0.6rem', { lineHeight: '0.8rem' }],
        'terminal-sm': ['0.75rem', { lineHeight: '1rem' }],
        'terminal-base': ['0.875rem', { lineHeight: '1.25rem' }],
      },
      fontWeight: convertToStringValues(typography.fontWeight),
      lineHeight: convertToStringValues(typography.lineHeight),
      borderRadius: {
        ...borderRadius,
        // Terminal-specific border radius
        'terminal': '0.75rem',
        'terminal-sm': '0.5rem',
        'terminal-lg': '1rem',
      },
      boxShadow: {
        ...shadows,
        // Terminal-specific shadows
        'terminal': '0 0 20px rgba(34, 197, 94, 0.1)',
        'terminal-glow': '0 0 30px rgba(34, 197, 94, 0.2)',
        'terminal-heavy': '0 0 40px rgba(34, 197, 94, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'glass-green': '0 8px 32px rgba(34, 197, 94, 0.1)',
      },
      spacing: spacing,
      // Background patterns for terminal grid
      backgroundImage: {
        'terminal-grid': `
          linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
        `,
        'matrix-rain': `
          linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.05) 100%)
        `,
        'glass-gradient': `
          linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)
        `,
      },
      backgroundSize: {
        'grid-sm': '20px 20px',
        'grid-md': '40px 40px',
        'grid-lg': '80px 80px',
      },
      // Enhanced animation utilities for terminal effects
      animation: {
        // Existing animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'marquee': 'marquee 25s linear infinite',
        'marquee-vertical': 'marqueeVertical 15s linear infinite',
        // Terminal-specific animations
        'terminal-blink': 'terminalBlink 1s infinite',
        'terminal-cursor': 'terminalCursor 1.2s infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'matrix-rain': 'matrixRain 3s linear infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'scan-line': 'scanLine 2s linear infinite',
        'type-write': 'typeWrite 3s steps(20) infinite',
      },
      keyframes: {
        // Existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        // Terminal-specific keyframes
        terminalBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        terminalCursor: {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: '#22c55e' },
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-80px, -80px)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(34, 197, 94, 0.2)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
            opacity: '0.9'
          },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-5px) rotate(0deg)' },
          '75%': { transform: 'translateY(-15px) rotate(-1deg)' },
        },
        scanLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        typeWrite: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      // Backdrop blur utilities
      backdropBlur: {
        'terminal': '8px',
        'glass-light': '12px',
        'glass-heavy': '20px',
      },
      // Custom utilities
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
}

export default config 
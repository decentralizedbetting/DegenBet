import type { Config } from 'tailwindcss'
import { colors, typography, borderRadius, shadows, spacing } from './app/styles/design-system'

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
    extend: {
      colors: {
        // Map our design system colors to Tailwind
        primary: colors.primary,
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
      },
      fontFamily: {
        sans: typography.fontFamily.sans.split(','),
        mono: typography.fontFamily.mono.split(','),
      },
      fontSize: typography.fontSize,
      fontWeight: convertToStringValues(typography.fontWeight),
      lineHeight: convertToStringValues(typography.lineHeight),
      borderRadius: borderRadius,
      boxShadow: shadows,
      spacing: spacing,
      // Add a specific gray for backgrounds
      backgroundColor: {
        'gray-850': '#151e2d', // Between gray-800 and gray-900
      },
      // Add animation utilities
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config 
/**
 * Style Utilities
 * 
 * Common styling patterns and helpers to reduce duplication and ensure consistency.
 * These utilities combine Tailwind classes with our design system.
 */

/**
 * Combines multiple class strings, filtering out falsy values
 * @example
 * cx('text-white', condition && 'bg-blue-500', undefined)
 * // Returns: 'text-white bg-blue-500' if condition is true
 */
export function cx(...classNames: (string | false | null | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Common text styles based on hierarchy level
 */
export const textStyles = {
  // Headings
  h1: 'text-3xl md:text-4xl font-bold text-white',
  h2: 'text-2xl md:text-3xl font-bold text-white',
  h3: 'text-xl md:text-2xl font-semibold text-white',
  h4: 'text-lg md:text-xl font-semibold text-white',
  h5: 'text-base md:text-lg font-medium text-white',
  h6: 'text-sm md:text-base font-medium text-white',
  
  // Body text
  bodyLarge: 'text-lg text-gray-300',
  body: 'text-base text-gray-300',
  bodySmall: 'text-sm text-gray-400',
  bodyXSmall: 'text-xs text-gray-400',
  
  // UI text
  label: 'text-sm font-medium text-gray-400',
  caption: 'text-xs text-gray-500',
  button: 'text-sm font-medium',
};

/**
 * Common container styles
 */
export const containerStyles = {
  // Page container
  page: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Content section
  section: 'py-8 md:py-12',
  
  // Card/panel variants
  card: 'bg-gray-900 rounded-lg shadow-lg overflow-hidden',
  cardBordered: 'bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden',
  cardFilled: 'bg-gray-800 rounded-lg overflow-hidden',
  
  // Modal
  modal: 'bg-gray-900 border border-gray-700 rounded-xl shadow-2xl',
  
  // Form group
  formGroup: 'space-y-1.5 mb-4',
};

/**
 * Layout helper patterns
 */
export const layoutStyles = {
  // Flex patterns
  row: 'flex flex-row',
  col: 'flex flex-col',
  rowCenter: 'flex flex-row items-center',
  colCenter: 'flex flex-col items-center',
  centerBoth: 'flex items-center justify-center',
  spaceBetween: 'flex justify-between items-center',
  
  // Grid patterns
  grid2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  
  // Spacing
  stack: 'space-y-4',
  stackLg: 'space-y-6',
  inlineStack: 'space-x-4',
};

/**
 * Animation patterns
 */
export const animationStyles = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  pulse: 'animate-pulse',
  pulseSlow: 'animate-pulse-slow',
  bounce: 'animate-bounce-slow',
};

/**
 * Status and state styles
 */
export const statusStyles = {
  success: 'bg-success-light text-success-dark',
  warning: 'bg-warning-light text-warning-dark',
  danger: 'bg-danger-light text-danger-dark',
  info: 'bg-info-light text-info-dark',
  
  successText: 'text-success-default',
  warningText: 'text-warning-default',
  dangerText: 'text-danger-default',
  infoText: 'text-info-default',
  
  // Badge styles
  badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  badgeSuccess: 'bg-success-dark/30 text-success-default',
  badgeWarning: 'bg-warning-dark/30 text-warning-default',
  badgeDanger: 'bg-danger-dark/30 text-danger-default',
  badgeInfo: 'bg-info-dark/30 text-info-default',
  
  // Active/inactive states
  active: 'bg-blue-600 text-white',
  inactive: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
};

/**
 * Form element styles
 */
export const formStyles = {
  input: 'w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  select: 'w-full rounded-lg bg-gray-900 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  checkbox: 'rounded bg-gray-900 border-gray-700 text-blue-600 focus:ring-blue-500',
  radio: 'bg-gray-900 border-gray-700 text-blue-600 focus:ring-blue-500',
  
  // Error states
  inputError: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  errorMessage: 'mt-1 text-sm text-red-500',
  
  // Form label
  label: 'block text-sm font-medium text-gray-400 mb-1',
  
  // Form group layout
  formGroup: 'mb-4',
}; 

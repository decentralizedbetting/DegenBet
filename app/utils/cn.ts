import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names using clsx and tailwind-merge
 * This helps with combining Tailwind classes in a more predictable way
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 
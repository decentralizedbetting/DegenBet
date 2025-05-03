/**
 * Performance Utilities
 * 
 * This file contains helper functions for optimizing application performance,
 * including debouncing, throttling, memoization, and React hooks.
 */

/**
 * Debounce a function call
 * Useful for search inputs, window resize handlers, etc.
 * 
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 * @param immediate Whether to call the function immediately on the leading edge
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Throttle a function call
 * Useful for scroll handlers, animations, etc.
 * 
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let lastArgs: Parameters<T> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  const throttled = function(this: any, ...args: Parameters<T>): void {
    const context = this;
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(context, args);
    } else {
      // Store the latest args for trailing call
      lastArgs = args;
      
      // Set up trailing call if not already set
      if (!timeout) {
        timeout = setTimeout(() => {
          lastCall = Date.now();
          timeout = null;
          if (lastArgs) {
            func.apply(context, lastArgs);
            lastArgs = null;
          }
        }, limit - (now - lastCall));
      }
    }
  };
  
  return throttled;
}

/**
 * Memoize a function result
 * Caches results of expensive calculations based on input arguments
 * 
 * @param func The function to memoize
 * @param resolver Optional function to determine cache key
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver 
      ? resolver(...args) 
      : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

/**
 * React Hooks for Performance Optimization
 */
import { useState, useEffect, useCallback, useRef, DependencyList } from 'react';

/**
 * Hook to debounce a value
 * 
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

/**
 * Hook to debounce a callback function
 * 
 * @param callback The callback to debounce
 * @param delay The delay in milliseconds
 * @param deps Dependencies for the callback
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T, 
  delay: number,
  deps: DependencyList = []
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return useCallback(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay),
    [delay, ...deps]
  );
}

/**
 * Hook to throttle a callback function
 * 
 * @param callback The callback to throttle
 * @param limit The time limit in milliseconds
 * @param deps Dependencies for the callback
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  limit: number,
  deps: DependencyList = []
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return useCallback(
    throttle((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, limit),
    [limit, ...deps]
  );
}

/**
 * Hook to track if a component is mounted
 * Useful for avoiding state updates on unmounted components
 */
export function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false);
  
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  return useCallback(() => mountedRef.current, []);
}

/**
 * Hook to measure rendering performance
 * Use only in development
 * 
 * @param componentName The name of the component to measure
 * @param enabled Whether the measurement is enabled
 */
export function useRenderingMetrics(
  componentName: string,
  enabled = process.env.NODE_ENV === 'development'
): void {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());
  
  if (enabled) {
    useEffect(() => {
      const endTime = performance.now();
      const duration = endTime - startTime.current;
      renderCount.current += 1;
      
      console.log(
        `%c[Rendering Metrics] ${componentName}`,
        'color: #3b82f6; font-weight: bold;',
        `Render #${renderCount.current}, Duration: ${duration.toFixed(2)}ms`
      );
      
      return () => {
        startTime.current = performance.now();
      };
    });
  }
}

/**
 * Hook for efficient infinite scrolling
 * 
 * @param callback Function to call when user scrolls near bottom
 * @param options Configuration options
 */
export function useInfiniteScroll(
  callback: () => void,
  options: {
    root?: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
    enabled?: boolean;
  } = {}
): { observerRef: (node: HTMLElement | null) => void } {
  const { root = null, rootMargin = '100px', threshold = 0.5, enabled = true } = options;
  
  const observer = useRef<IntersectionObserver | null>(null);
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;
      
      if (observer.current) {
        observer.current.disconnect();
      }
      
      if (node) {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              callbackRef.current();
            }
          },
          { root, rootMargin, threshold }
        );
        
        observer.current.observe(node);
      }
    },
    [root, rootMargin, threshold, enabled]
  );
  
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  
  return { observerRef };
} 
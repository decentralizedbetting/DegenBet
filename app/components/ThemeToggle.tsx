"use client";

import { useTheme } from '@/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-black/30 border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200 font-mono"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`terminal_theme_${theme === 'dark' ? 'light' : 'dark'}.sh`}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4" />
      )}
    </button>
  );
} 
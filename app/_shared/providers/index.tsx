'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

// Export individual providers too
export { ThemeProvider, useTheme } from './ThemeProvider'; 

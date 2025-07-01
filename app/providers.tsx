'use client';

import { ThemeProvider } from '@/_shared/providers/ThemeProvider';
import { Web3Provider } from '@/_shared/providers/Web3Provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Web3Provider>
        {children}
      </Web3Provider>
    </ThemeProvider>
  );
} 

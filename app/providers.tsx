'use client';

import { Providers } from '@/_shared/providers';

interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <Providers>
      {children}
    </Providers>
  );
} 

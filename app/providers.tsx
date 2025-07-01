'use client';

import { ThemeProvider } from '@/_shared/providers/ThemeProvider';
import { WalletProvider, useWallet } from '@/_shared/contexts/WalletContext';
import { WalletModal } from '@/_shared/components/ui/WalletModal';

function GlobalWalletModal() {
  const { showWalletModal, closeWalletModal } = useWallet();
  
  return (
    <WalletModal 
      isOpen={showWalletModal}
      onClose={closeWalletModal}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <WalletProvider>
        {children}
        <GlobalWalletModal />
      </WalletProvider>
    </ThemeProvider>
  );
} 

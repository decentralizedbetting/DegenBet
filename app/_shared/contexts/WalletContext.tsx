'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// TypeScript declarations for MetaMask
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isMetaMask?: boolean;
      isTrust?: boolean;
      on?: (eventName: string, callback: Function) => void;
      removeListener?: (eventName: string, callback: Function) => void;
      selectedAddress?: string;
      chainId?: string;
    };
  }
}

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string;
  chainId: string;
  isCorrectNetwork: boolean;
  isConnecting: boolean;
  showWalletModal: boolean;
  connectWallet: (provider?: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchToBSC: () => Promise<void>;
  addToWhitelist: (address: string, txHash?: string) => Promise<void>;
  openWalletModal: () => void;
  closeWalletModal: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

interface WalletProviderProps {
  children: ReactNode;
}

// LocalStorage keys for wallet state persistence
const WALLET_STORAGE_KEYS = {
  USER_DISCONNECTED: 'dbt-user-disconnected',
  WHITELIST: 'dbt-whitelist'
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [chainId, setChainId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const BSC_CHAIN_ID = '0x38'; // BNB Smart Chain
  const isCorrectNetwork = chainId === BSC_CHAIN_ID;

  // Check if wallet is already connected on load
  useEffect(() => {
    checkConnection();
    setupEventListeners();
    
    return () => {
      removeEventListeners();
    };
  }, []);

  const checkConnection = async () => {
    try {
      // Check if user intentionally disconnected
      const userDisconnected = localStorage.getItem(WALLET_STORAGE_KEYS.USER_DISCONNECTED) === 'true';
      
      if (userDisconnected) {
        // Don't auto-reconnect if user previously disconnected
        console.log('🚫 Auto-reconnection blocked - user previously disconnected');
        return;
      }

      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
          setChainId(currentChainId);
          console.log('🔄 Auto-reconnected to wallet:', accounts[0]);
        }
      }
    } catch (error) {
      console.error('Failed to check wallet connection:', error);
    }
  };

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on?.('accountsChanged', handleAccountsChanged);
      window.ethereum.on?.('chainChanged', handleChainChanged);
    }
  };

  const removeEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener?.('chainChanged', handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected from wallet provider directly
      console.log('👤 User disconnected from wallet provider');
      disconnectWallet();
    } else {
      // User switched accounts
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      // Clear disconnect flag when user reconnects via wallet
      localStorage.removeItem(WALLET_STORAGE_KEYS.USER_DISCONNECTED);
      console.log('🔄 Account switched to:', accounts[0]);
    }
  };

  const handleChainChanged = (newChainId: string) => {
    setChainId(newChainId);
    console.log('🔗 Chain changed to:', newChainId);
    // Reload page when chain changes for consistency
    window.location.reload();
  };

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  const closeWalletModal = () => {
    setShowWalletModal(false);
  };

  const connectWallet = async (provider: string = 'metamask') => {
    setIsConnecting(true);
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect your wallet.');
      }

      // Get current chain
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      setIsConnected(true);
      setWalletAddress(accounts[0]);
      setChainId(currentChainId);

      // Clear disconnect flag on successful connection
      localStorage.removeItem(WALLET_STORAGE_KEYS.USER_DISCONNECTED);

      // Auto-add to whitelist when connecting
      await addToWhitelist(accounts[0]);

      // Close modal on successful connection
      setShowWalletModal(false);

      console.log('✅ Wallet connected:', accounts[0]);

      // Switch to BSC if not already connected
      if (currentChainId !== BSC_CHAIN_ID) {
        await switchToBSC();
      }

    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Set flag to prevent auto-reconnection
      localStorage.setItem(WALLET_STORAGE_KEYS.USER_DISCONNECTED, 'true');
      
      // Clear React state
      setIsConnected(false);
      setWalletAddress('');
      setChainId('');
      setShowWalletModal(false);
      
      // Clear whitelist data
      localStorage.removeItem(WALLET_STORAGE_KEYS.WHITELIST);
      
      console.log('✅ Disconnected from app');
      
      // Show user instruction for complete disconnection
      alert(
        '🔐 WALLET DISCONNECTED FROM APP\n\n' +
        '⚠️ IMPORTANT: To completely disconnect:\n' +
        '1. Open your wallet (MetaMask/Trust Wallet)\n' +
        '2. Go to Connected Sites/Permissions\n' +
        '3. Remove this website from connected sites\n\n' +
        'This prevents automatic reconnection when you refresh the page.'
      );
      
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  };

  const switchToBSC = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // If BSC is not added to MetaMask, add it
      if (switchError.code === 4902) {
        try {
          if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
          }
          
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: BSC_CHAIN_ID,
              chainName: 'BNB Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            }],
          });
        } catch (addError) {
          console.error('Failed to add BSC network:', addError);
          throw addError;
        }
      } else {
        console.error('Failed to switch to BSC:', switchError);
        throw switchError;
      }
    }
  };

  const addToWhitelist = async (address: string, txHash?: string) => {
    try {
      // This would be an API call to your backend
      // For now, we'll just log it and store in localStorage
      const whitelistEntry = {
        address,
        timestamp: new Date().toISOString(),
        txHash: txHash || null,
        status: 'active'
      };

      // Store in localStorage as temporary solution
      const existingWhitelist = JSON.parse(localStorage.getItem(WALLET_STORAGE_KEYS.WHITELIST) || '[]');
      const isAlreadyWhitelisted = existingWhitelist.some((entry: any) => entry.address === address);
      
      if (!isAlreadyWhitelisted) {
        existingWhitelist.push(whitelistEntry);
        localStorage.setItem(WALLET_STORAGE_KEYS.WHITELIST, JSON.stringify(existingWhitelist));
        
        console.log('✅ Address added to whitelist:', address);
        
        // TODO: Replace with actual API call
        // await fetch('/api/whitelist', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(whitelistEntry)
        // });
      }
    } catch (error) {
      console.error('Failed to add to whitelist:', error);
    }
  };

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    chainId,
    isCorrectNetwork,
    isConnecting,
    showWalletModal,
    connectWallet,
    disconnectWallet,
    switchToBSC,
    addToWhitelist,
    openWalletModal,
    closeWalletModal,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/_shared/contexts/WalletContext';

// TypeScript declarations for additional wallet providers (extending existing types)
interface ExtendedEthereum {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  isMetaMask?: boolean;
  isTrust?: boolean;
  on?: (eventName: string, callback: Function) => void;
  removeListener?: (eventName: string, callback: Function) => void;
  selectedAddress?: string;
  chainId?: string;
}

declare global {
  interface Window {
    ethereum?: ExtendedEthereum;
    trustwallet?: any;
    BinanceChain?: any;
  }
}

const WALLET_PROVIDERS = [
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    icon: '🛡️',
    description: 'Connect using Trust Wallet',
    priority: 1,
    checkAvailability: () => {
      return !!(window.ethereum?.isTrust || (window as any).trustwallet);
    }
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using MetaMask',
    priority: 2,
    checkAvailability: () => {
      return !!(window.ethereum?.isMetaMask);
    }
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect using WalletConnect',
    priority: 3,
    checkAvailability: () => {
      return true; // Always available as it's a protocol
    }
  },
  {
    id: 'binance',
    name: 'Binance Wallet',
    icon: '💛',
    description: 'Connect using Binance Chain Wallet',
    priority: 4,
    checkAvailability: () => {
      return !!((window as any).BinanceChain);
    }
  }
];

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectSuccess?: () => void;
}

interface WalletProviderWithAvailability {
  id: string;
  name: string;
  icon: string;
  description: string;
  priority: number;
  checkAvailability: () => boolean;
  isAvailable?: boolean;
}

export function WalletModal({ isOpen, onClose, onConnectSuccess }: WalletModalProps) {
  const [connectionError, setConnectionError] = useState('');
  const [availableWallets, setAvailableWallets] = useState<WalletProviderWithAvailability[]>(WALLET_PROVIDERS);
  
  const { 
    isConnecting,
    connectWallet
  } = useWallet();

  // Check wallet availability on mount
  useEffect(() => {
    const checkWalletAvailability = () => {
      const walletsWithAvailability = WALLET_PROVIDERS.map(wallet => ({
        ...wallet,
        isAvailable: wallet.checkAvailability()
      }));
      setAvailableWallets(walletsWithAvailability);
    };

    if (isOpen) {
      checkWalletAvailability();
    }
  }, [isOpen]);

  const handleConnect = async (walletProvider: WalletProviderWithAvailability) => {
    try {
      setConnectionError('');
      
      // Use only the global wallet context for connection
      await connectWallet(walletProvider.id);
      
      onClose();
      
      if (onConnectSuccess) {
        onConnectSuccess();
      }
    } catch (error: any) {
      console.error('Connection failed:', error);
      setConnectionError(error.message || `Failed to connect with ${walletProvider.name}. Please try again.`);
    }
  };

  const getWalletStatus = (wallet: WalletProviderWithAvailability) => {
    if (!wallet.isAvailable) {
      return { status: 'unavailable', message: 'Not Installed' };
    }
    if (wallet.priority === 1) {
      return { status: 'recommended', message: 'RECOMMENDED' };
    }
    if (wallet.priority === 2) {
      return { status: 'popular', message: 'POPULAR' };
    }
    return { status: 'available', message: 'Available' };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="terminal-card max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-sm">select_wallet.exe</div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="p-6">
            <h3 className="text-green-400 font-mono text-xl mb-6 text-center">
              {'>'} SELECT_WALLET_PROVIDER
            </h3>
            
            <div className="space-y-3">
              {availableWallets.map((wallet) => {
                const walletStatus = getWalletStatus(wallet);
                
                return (
                  <motion.button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet)}
                    disabled={isConnecting || !wallet.isAvailable}
                    className={`w-full p-4 border rounded-lg transition-all duration-200 group ${
                      wallet.isAvailable
                        ? 'bg-black/50 border-green-500/30 hover:border-green-500/50 hover:bg-green-500/5'
                        : 'bg-gray-800/50 border-gray-600/30 cursor-not-allowed opacity-50'
                    } ${isConnecting ? 'opacity-50' : ''}`}
                    whileHover={wallet.isAvailable ? { scale: 1.02 } : {}}
                    whileTap={wallet.isAvailable ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{wallet.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <span className={`font-mono font-bold ${
                            wallet.isAvailable ? 'text-green-400' : 'text-gray-500'
                          }`}>
                            {wallet.name}
                          </span>
                          
                          {walletStatus.status === 'recommended' && (
                            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-mono">
                              {walletStatus.message}
                            </span>
                          )}
                          {walletStatus.status === 'popular' && (
                            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded font-mono">
                              {walletStatus.message}
                            </span>
                          )}
                          {walletStatus.status === 'unavailable' && (
                            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-mono">
                              {walletStatus.message}
                            </span>
                          )}
                        </div>
                        <div className={`text-sm font-mono ${
                          wallet.isAvailable ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {wallet.description}
                        </div>
                      </div>
                      
                      {wallet.isAvailable && (
                        <div className="text-green-400 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      )}
                      
                      {!wallet.isAvailable && (
                        <div className="text-gray-600">
                          ⚠️
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-400">ℹ️</span>
                <span className="text-blue-400 font-mono text-sm">CONNECTION_INFO</span>
              </div>
              <p className="text-gray-400 text-xs font-mono">
                {'>'} Your wallet will be automatically added to the presale whitelist
                <br />
                {'>'} Ensure you're connected to BNB Smart Chain (BSC)
                <br />
                {'>'} Your payments go directly to: 0x8D3D...3A7f9
                <br />
                {'>'} All transactions are verified on BSCScan
              </p>
            </div>
            
            {connectionError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                <div className="text-red-400 text-sm font-mono">
                  ❌ {connectionError}
                </div>
              </div>
            )}
            
            {isConnecting && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <div className="flex items-center space-x-2 text-yellow-400 text-sm font-mono">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>CONNECTING_TO_WALLET...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 
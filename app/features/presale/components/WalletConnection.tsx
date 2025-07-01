'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: (provider: string) => void;
  walletAddress?: string;
}

const WALLET_PROVIDERS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect to your MetaMask wallet',
    popular: true
  },
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    icon: '🛡️',
    description: 'Connect to your Trust Wallet',
    popular: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect with WalletConnect protocol',
    popular: false
  },
  {
    id: 'binance',
    name: 'Binance Wallet',
    icon: '💛',
    description: 'Connect to Binance Chain Wallet',
    popular: false
  }
];

export function WalletConnection({ isConnected, onConnect, walletAddress }: WalletConnectionProps) {
  const [showWallets, setShowWallets] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (provider: string) => {
    setIsConnecting(true);
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConnect(provider);
    setIsConnecting(false);
    setShowWallets(false);
  };

  if (isConnected && walletAddress) {
    return (
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">wallet_status.sh</div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-xl">✅</span>
              </div>
              <div>
                <div className="text-green-400 font-mono text-sm">WALLET CONNECTED</div>
                <div className="text-gray-400 font-mono text-xs">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-mono">BNB CHAIN</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="terminal-card">
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs">wallet_connect.sh</div>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-yellow-400 text-2xl">🔌</span>
          </div>
          <h3 className="text-yellow-400 font-mono text-lg mb-2">WALLET_NOT_CONNECTED</h3>
          <p className="text-gray-400 font-mono text-sm mb-6">
            {'>'} Connect your wallet to participate in the private sale
          </p>
          <button 
            onClick={() => setShowWallets(true)}
            disabled={isConnecting}
            className="btn-degen px-8 py-3 font-mono"
          >
            {isConnecting ? 'CONNECTING...' : 'CONNECT_WALLET'}
          </button>
        </div>
      </div>

      {/* Wallet Selection Modal */}
      <AnimatePresence>
        {showWallets && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWallets(false)}
          >
            <motion.div 
              className="terminal-card max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="terminal-text text-xs">select_wallet.sh</div>
                  <button 
                    onClick={() => setShowWallets(false)}
                    className="text-red-400 hover:text-red-300 text-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-green-400 font-mono text-lg mb-6 flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  SELECT_WALLET_PROVIDER
                </h3>
                <div className="space-y-3">
                  {WALLET_PROVIDERS.map((wallet) => (
                    <motion.button
                      key={wallet.id}
                      onClick={() => handleConnect(wallet.id)}
                      disabled={isConnecting}
                      className="w-full p-4 bg-black/50 border border-green-500/30 rounded-lg hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-200 group disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{wallet.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 font-mono">{wallet.name}</span>
                            {wallet.popular && (
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-mono">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm font-mono">{wallet.description}</div>
                        </div>
                        <span className="text-green-400 group-hover:text-green-300">→</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-400 text-sm">ℹ️</span>
                    <div className="text-blue-400 text-sm font-mono">
                      <p className="mb-1">Make sure you're connected to BNB Smart Chain:</p>
                      <p className="text-xs text-gray-400">
                        {'>'} Network: BNB Smart Chain<br />
                        {'>'} Chain ID: 56<br />
                        {'>'} Currency: BNB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 

"use client";

import React from 'react';
import Image from 'next/image';

interface Wallet {
  name: string;
  icon: string;
  enabled?: boolean;
}

const defaultWallets: Wallet[] = [
  { name: 'MetaMask', icon: '/icons/metamask.svg' },
  { name: 'Coinbase', icon: '/icons/coinbase.svg' },
  { name: 'WalletConnect', icon: '/icons/walletconnect.svg' },
  { name: 'Trust Wallet', icon: '/icons/trustwallet.svg' },
  { name: 'Rainbow', icon: '/icons/rainbow.svg' },
  { name: 'Ledger', icon: '/icons/ledger.svg' },
];

interface WalletIconsProps {
  wallets?: Wallet[];
  className?: string;
  iconSize?: number;
  onClick?: (wallet: Wallet) => void;
  showLabels?: boolean;
}

export function WalletIcons({
  wallets = defaultWallets,
  className = '',
  iconSize = 24,
  onClick,
  showLabels = false
}: WalletIconsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
      {wallets.map((wallet) => (
        <div
          key={wallet.name}
          className={`group relative flex flex-col items-center gap-2 ${
            onClick ? 'cursor-pointer' : ''
          }`}
          onClick={() => onClick && onClick(wallet)}
          title={wallet.name}
        >
          <div className="flex items-center justify-center w-12 h-12 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
            <Image
              src={wallet.icon}
              alt={wallet.name}
              width={iconSize}
              height={iconSize}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          {showLabels && (
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
              {wallet.name}
            </span>
          )}
          {wallet.enabled === false && (
            <div className="absolute inset-0 bg-gray-900/80 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">Coming Soon</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 
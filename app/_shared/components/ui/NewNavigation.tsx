"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UnifiedWalletButton } from '@/_shared/components/ui/UnifiedWalletButton';
import { useWallet } from '@/_shared/contexts/WalletContext';

export function NewNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { isConnected, walletAddress, isCorrectNetwork } = useWallet();

  const navigationLinks = [
    { href: '/markets', label: 'Markets', color: 'green' },
    { href: '/create', label: 'Create', color: 'purple' },
    { href: '/leaderboard', label: 'Leaderboard', color: 'yellow' },
    { href: '/presale', label: 'Presale', color: 'blue' },
    { href: '/governance', label: 'Governance', color: 'indigo' },
    { href: '/token', label: 'Token', color: 'pink' },
  ];

  const getNavLinkClasses = (href: string, color: string) => {
    const isActive = pathname === href;
    const baseClasses = "px-3 py-2 rounded font-mono transition-all duration-200 text-sm border";
    
    if (isActive) {
      return `${baseClasses} bg-${color}-500/20 text-${color}-400 border-${color}-500/30`;
    }
    
    return `${baseClasses} text-gray-400 hover:text-${color}-400 hover:bg-${color}-500/10 border-transparent hover:border-${color}-500/30`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-green-500/30 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <Image 
                  src="/logo-degenbet.svg" 
                  alt="DegenBet" 
                  width={20} 
                  height={20} 
                  className="filter brightness-0 invert transform group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xl tracking-tight text-green-400">DegenBet</span>
                <div className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-green-500/20 text-green-400 rounded border border-green-500/30 uppercase tracking-wider animate-pulse">
                  LIVE
                </div>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={getNavLinkClasses(link.href, link.color)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Network Status - Simple Indicator Only */}
            {isConnected && (
              <div className="flex items-center space-x-2 text-xs font-mono">
                <div className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                <span className={isCorrectNetwork ? 'text-green-400' : 'text-yellow-400'}>
                  {isCorrectNetwork ? 'BSC' : 'Wrong Network'}
                </span>
              </div>
            )}
            
            {/* Wallet Connection */}
            <UnifiedWalletButton variant="header" />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Wallet Button */}
            <UnifiedWalletButton variant="minimal" />
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-green-400 hover:text-green-300 p-2 border border-green-500/30 rounded bg-black/50 hover:bg-green-500/10 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-green-500/30 backdrop-blur-sm">
          <div className="px-4 py-3 space-y-2">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block ${getNavLinkClasses(link.href, link.color)}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Network Status */}
            {isConnected && (
              <div className="flex items-center justify-center space-x-2 text-xs font-mono pt-2 border-t border-green-500/20">
                <div className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                <span className={isCorrectNetwork ? 'text-green-400' : 'text-yellow-400'}>
                  {isCorrectNetwork ? 'Connected to BSC' : 'Please switch to BSC in your wallet'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
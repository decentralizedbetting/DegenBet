"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PlusIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/_shared/components/ui/Button';
import { ThemeToggle } from '@/_shared/components/layout/ThemeToggle';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const [isTemplatesMenuOpen, setIsTemplatesMenuOpen] = useState(false);
  const [unreadNotifications] = useState(3);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [networkInfo, setNetworkInfo] = useState({
    name: 'BNB Smart Chain',
    icon: '/icons/bnb.svg',
    status: 'healthy', // 'healthy', 'congested', 'issues'
  });
  const [predictionStreak, setPredictionStreak] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs for click outside handling
  const userMenuRef = useRef<HTMLDivElement>(null);
  const networkMenuRef = useRef<HTMLDivElement>(null);
  const templatesMenuRef = useRef<HTMLDivElement>(null);

  // Available networks - BNB first as primary
  const networks = [
    { name: 'BNB Smart Chain', icon: '/icons/bnb.svg', chainId: '0x38' },
    { name: 'Ethereum', icon: '/icons/eth.svg', chainId: '0x1' },
    { name: 'Polygon', icon: '/icons/polygon.svg', chainId: '0x89' },
    { name: 'Arbitrum', icon: '/icons/arbitrum.svg', chainId: '0xa4b1' },
    { name: 'Optimism', icon: '/icons/optimism.svg', chainId: '0xa' }
  ];

  // Simulate fetching network status occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      // Occasionally change network status for demo purposes
      if (Math.random() > 0.8) {
        const statuses = ['healthy', 'congested', 'issues'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setNetworkInfo(prev => ({ ...prev, status: randomStatus }));
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (networkMenuRef.current && !networkMenuRef.current.contains(event.target as Node)) {
        setIsNetworkMenuOpen(false);
      }
      if (templatesMenuRef.current && !templatesMenuRef.current.contains(event.target as Node)) {
        setIsTemplatesMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when resizing window to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const handleNetworkMenuToggle = () => {
    setIsNetworkMenuOpen(!isNetworkMenuOpen);
  };
  
  const handleTemplatesMenuToggle = () => {
    setIsTemplatesMenuOpen(!isTemplatesMenuOpen);
  };
  
  const handleNetworkSelect = (network: {name: string, icon: string, chainId: string}) => {
    setNetworkInfo({
      name: network.name,
      icon: network.icon,
      status: 'healthy',
    });
    setIsNetworkMenuOpen(false);
    // TODO: Implement actual network switching logic
    console.log(`Switching to ${network.name} (Chain ID: ${network.chainId})`);
  };

  const handleConnectWallet = () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      // TODO: Implement disconnect logic
      console.log('Disconnecting wallet...');
    } else {
      setIsWalletConnected(true);
      // TODO: Implement wallet connection logic
      console.log('Connecting wallet...');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
      // For now, redirect to markets page with search query
      window.location.href = `/markets?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Get status indicator colors
  const getStatusColors = () => {
    switch (networkInfo.status) {
      case 'healthy':
        return 'bg-green-500';
      case 'congested':
        return 'bg-yellow-500';
      case 'issues':
        return 'bg-red-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
          <nav className="sticky top-0 z-50 bg-terminal-heavy backdrop-blur-xl border-b border-terminal shadow-lg shadow-green-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Terminal Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center flex-shrink-0 mr-8 group">
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
                  <span className="terminal-text font-bold text-xl tracking-tight glow-text">DegenBet</span>
                  <div className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-green-500/20 text-green-400 rounded border border-green-500/30 uppercase tracking-wider animate-pulse">
                    LIVE
                  </div>
                </div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/markets" 
                className="text-gray-400 hover:text-green-400 hover:bg-green-500/10 px-3 py-2 rounded font-mono transition-colors relative group border border-transparent hover:border-green-500/30"
              >
                <span className="relative z-10">{'>'} markets.exe</span>
              </Link>
              
              <Link 
                href="/create" 
                className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 px-3 py-2 rounded font-mono transition-colors relative group border border-transparent hover:border-purple-500/30"
              >
                <span className="relative z-10">{'>'} create.sh</span>
              </Link>
              
              <Link 
                href="/leaderboard" 
                className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 px-3 py-2 rounded font-mono transition-colors relative group border border-transparent hover:border-yellow-500/30"
              >
                <span className="relative z-10">{'>'} leaderboard.db</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Right Section - Reorganized */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Terminal Search */}
            <form onSubmit={handleSearch} className="relative group hidden lg:block">
              <div className="relative">
                <span className="absolute left-3 top-2 text-green-400 font-mono text-sm">$</span>
              <input
                type="text"
                  placeholder="find . -name '*market*'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-terminal border-terminal text-green-400 rounded pl-8 pr-4 py-1.5 text-sm font-mono focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 w-48 transition-all duration-300 hover:bg-black/70 focus:w-56 placeholder-gray-500 terminal-input"
              />
              </div>
            </form>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Terminal Notifications */}
            <button className="relative text-green-400 hover:text-green-300 p-2 rounded border border-green-500/30 hover:bg-green-500/10 transition-all duration-200 font-mono" title="notifications.log">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs w-4 h-4 flex items-center justify-center rounded border border-green-400 font-bold font-mono animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Terminal Wallet Section - Network Selector + Connect Button grouped */}
            <div className="flex items-center space-x-2 bg-terminal-glass rounded border-terminal p-1 backdrop-blur-sm">
              {/* Network Status */}
              <div className="relative z-40" ref={networkMenuRef}>
                <button 
                  onClick={handleNetworkMenuToggle}
                  className="flex items-center text-sm rounded bg-terminal hover:bg-green-500/10 px-2 py-1.5 border-terminal transition-all duration-200 font-mono terminal-interactive"
                  title={`network_${networkInfo.name.toLowerCase().replace(' ', '_')}.cfg`}
                >
                  <div className="mr-2 relative w-5 h-5">
                    <Image 
                      src={networkInfo.icon} 
                      alt={networkInfo.name} 
                      width={20} 
                      height={20} 
                    />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${getStatusColors()} rounded-full border border-gray-900`}></div>
                  </div>
                  <span className="text-green-400 mr-1 text-xs font-mono">{networkInfo.name.split(' ')[0].toUpperCase()}</span>
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isNetworkMenuOpen && (
                  <div className="terminal-card absolute right-0 mt-2 w-56 shadow-lg py-1 z-[60]">
                    <div className="flex items-center justify-between p-2 border-b border-green-500/20">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="terminal-text text-xs">network_selector.sh</div>
                    </div>
                    <div className="px-3 py-2 border-b border-green-500/20 text-xs text-green-400 font-mono">
                      {'>'} SELECT_NETWORK:
                    </div>
                    {networks.map((network) => (
                      <button
                        key={network.name}
                        onClick={() => handleNetworkSelect(network)}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 font-mono"
                      >
                        <Image 
                          src={network.icon} 
                          alt={network.name} 
                          width={16} 
                          height={16} 
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-green-400">./connect_{network.name.toLowerCase().replace(' ', '_')}</div>
                          <div className="text-xs text-gray-500">{network.chainId}</div>
                        </div>
                        {networkInfo.name === network.name && (
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Terminal Connect Wallet Button */}
              <Button 
                onClick={handleConnectWallet}
                className={`relative group overflow-hidden text-black py-1.5 px-3 rounded transition-all duration-200 text-sm font-mono font-bold ${
                  isWalletConnected 
                    ? 'btn-degen'
                    : 'btn-degen-secondary'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  {isWalletConnected ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      WALLET_CONNECTED
                    </>
                  ) : (
                    <>./connect_wallet.exe</>
                  )}
                </span>
                {isWalletConnected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}
              </Button>
            </div>

            {/* User Profile Dropdown - Only show when wallet connected */}
            {isWalletConnected && (
              <div className="relative z-40" ref={userMenuRef}>
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center justify-center bg-black/50 hover:bg-green-500/10 rounded border border-green-500/30 w-8 h-8 transition-all duration-200 relative"
                  title="user_profile.dat"
                >
                  <span className="text-sm font-medium text-blue-400">DF</span>
                  
                  {/* Prediction streak badge */}
                  {predictionStreak > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded border border-green-400 group font-mono font-bold">
                      <span>{predictionStreak}</span>
                      <div className="absolute inset-0 rounded animate-ping bg-green-500 opacity-30"></div>
                    </div>
                  )}
                </button>
                
                {isUserMenuOpen && (
                  <div className="terminal-card absolute right-0 mt-2 w-64 shadow-lg py-1 z-[60]">
                    <div className="flex items-center justify-between p-2 border-b border-green-500/20">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="terminal-text text-xs">user_dashboard.exe</div>
                    </div>
                    <div className="px-4 py-3 border-b border-green-500/20">
                      <div className="font-medium text-green-400 flex items-center font-mono">
                        DeFiWhale
                        {predictionStreak > 0 && (
                          <div className="ml-2 bg-green-500 text-black text-xs px-1.5 py-0.5 rounded flex items-center font-bold border border-green-400">
                            <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
                            {predictionStreak}_DAY_STREAK
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1 font-mono">
                        <span className="truncate">0x4a3...f28b</span>
                        <button className="ml-1 text-gray-500 hover:text-green-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Terminal Quick stats */}
                      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                        <div className="bg-black/30 rounded border border-green-500/20 px-2 py-1.5">
                          <div className="font-medium text-green-400 font-mono">12</div>
                          <div className="text-gray-500 font-mono">MARKETS</div>
                        </div>
                        <div className="bg-black/30 rounded border border-green-500/20 px-2 py-1.5">
                          <div className="font-medium text-green-400 font-mono">+18.6%</div>
                          <div className="text-gray-500 font-mono">ROI</div>
                        </div>
                        <div className="bg-black/30 rounded border border-green-500/20 px-2 py-1.5">
                          <div className="font-medium text-green-400 font-mono">4.2k</div>
                          <div className="text-gray-500 font-mono">DBT</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link 
                        href="/preview/profile-dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 font-mono"
                      >
                        <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        ./profile_dashboard.exe
                      </Link>
                      <Link 
                        href="/governance" 
                        className="flex items-center px-4 py-2 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 font-mono"
                      >
                        <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ./governance.sh
                      </Link>
                      <Link 
                        href="/token" 
                        className="flex items-center px-4 py-2 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 font-mono"
                      >
                        <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        ./dbt_token.exe
                      </Link>
                    </div>
                    
                    <div className="border-t border-green-500/20 pt-1">
                      <button 
                        onClick={handleConnectWallet}
                        className="flex w-full items-center text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200 font-mono"
                      >
                        <svg className="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        ./disconnect.sh
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Account Icon - Only show when wallet connected */}
            {isWalletConnected && (
              <button
                onClick={handleUserMenuToggle}
                className="flex items-center justify-center bg-black/50 hover:bg-green-500/10 rounded border border-green-500/30 w-8 h-8 transition-all duration-200 relative"
                title="mobile_user.dat"
              >
                <span className="text-sm font-medium text-green-400 font-mono">DF</span>
                
                {/* Terminal Prediction streak badge */}
                {predictionStreak > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-black text-xs w-4 h-4 flex items-center justify-center rounded border border-green-400 font-mono font-bold">
                    <span>{predictionStreak}</span>
                  </div>
                )}
              </button>
            )}
            
            {/* Terminal Mobile Menu Button */}
            <button 
              onClick={handleMobileMenuToggle} 
              className="text-green-400 hover:text-green-300 p-2 border border-green-500/30 rounded bg-black/50 hover:bg-green-500/10 transition-all duration-200"
              title="menu.sh"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Terminal Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 px-2 pt-2 pb-3 border-t border-green-500/30 relative z-50 backdrop-blur-sm">
          {/* Terminal Mobile Search */}
          <form onSubmit={handleSearch} className="relative mb-3">
            <span className="absolute left-3 top-2.5 text-green-400 font-mono text-sm">$</span>
            <input
              type="text"
              placeholder="find . -name '*market*'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-green-500/30 text-green-400 rounded pl-8 pr-4 py-2 text-sm font-mono focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:bg-black/70 placeholder-gray-500"
            />
          </form>

          {/* Terminal User Profile Section - Only show when wallet connected */}
          {isWalletConnected && (
            <div className="terminal-card p-3 mb-3">
              <div className="flex items-center justify-between p-2 border-b border-green-500/20 mb-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">mobile_profile.dat</div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center justify-center bg-black/50 rounded border border-green-500/30 w-10 h-10 mr-3 relative">
                  <span className="text-sm font-medium text-green-400 font-mono">DF</span>
                  {predictionStreak > 0 && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-black text-xs w-4 h-4 flex items-center justify-center rounded border border-green-400 font-mono font-bold">
                      <span>{predictionStreak}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-green-400 flex items-center font-mono">
                    DeFiWhale
                    {predictionStreak > 0 && (
                      <div className="ml-2 bg-green-500 text-black text-xs px-1.5 py-0.5 rounded flex items-center font-bold border border-green-400">
                        <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                        {predictionStreak}_DAY_STREAK
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center font-mono">
                    <span className="truncate">0x4a3...f28b</span>
                    <button className="ml-1 text-gray-500 hover:text-green-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Terminal Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="bg-black/30 rounded border border-green-500/20 px-2 py-1.5">
                  <div className="font-medium text-green-400 font-mono">12</div>
                  <div className="text-gray-500 font-mono">MARKETS</div>
                </div>
                <div className="bg-black/30 rounded border border-green-500/20 px-2 py-1.5">
                  <div className="font-medium text-green-400 font-mono">+18.6%</div>
                  <div className="text-gray-500 font-mono">ROI</div>
                </div>
                <div className="bg-black/30 rounded border border-green-500/20 px-2 py-1.5">
                  <div className="font-medium text-green-400 font-mono">4.2k</div>
                  <div className="text-gray-500 font-mono">DBT</div>
                </div>
              </div>
              
              {/* Terminal Profile link */}
              <Link 
                href="/preview/profile-dashboard" 
                className="flex items-center w-full px-3 py-2 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 rounded font-mono"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                ./view_full_profile.exe
              </Link>
            </div>
          )}

          {/* Terminal Network and Connect Section */}
          <div className="terminal-card p-3 mb-3">
            <div className="flex items-center justify-between p-2 border-b border-green-500/20 mb-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-xs">network_config.sh</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-400 font-mono">{'>'} NETWORK_&_WALLET:</span>
              <ThemeToggle />
            </div>
            
            {/* Network Selection */}
            <div className="relative mb-2" ref={networkMenuRef}>
              <button 
                onClick={handleNetworkMenuToggle}
                className="flex items-center w-full text-sm rounded bg-black/50 hover:bg-green-500/10 px-3 py-2 border border-green-500/30 transition-all duration-200 font-mono"
              >
                <div className="mr-2 relative w-5 h-5">
                  <Image 
                    src={networkInfo.icon} 
                    alt={networkInfo.name} 
                    width={20} 
                    height={20} 
                  />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${getStatusColors()} rounded-full border border-gray-900`}></div>
                </div>
                <span className="text-green-400 flex-1 text-left">{networkInfo.name.toUpperCase()}</span>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isNetworkMenuOpen && (
                <div className="terminal-card absolute left-0 top-full mt-1 w-full shadow-lg py-1 z-[70]">
                  {networks.map((network) => (
                    <button
                      key={network.name}
                      onClick={() => handleNetworkSelect(network)}
                      className="flex items-center w-full px-3 py-2 text-sm text-green-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 font-mono"
                    >
                      <Image 
                        src={network.icon} 
                        alt={network.name} 
                        width={16} 
                        height={16} 
                        className="mr-3"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-green-400">./connect_{network.name.toLowerCase().replace(' ', '_')}</div>
                        <div className="text-xs text-gray-500">{network.chainId}</div>
                      </div>
                      {network.name === networkInfo.name && (
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Terminal Connect Button */}
            <Button 
              onClick={handleConnectWallet}
              className={`w-full relative group overflow-hidden py-2 rounded transition-all duration-200 text-sm font-mono font-bold ${
                isWalletConnected 
                  ? 'btn-degen'
                  : 'btn-degen-secondary'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isWalletConnected ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    WALLET_CONNECTED
                  </>
                ) : (
                  './connect_wallet.exe'
                )}
              </span>
              {isWalletConnected && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              )}
            </Button>
          </div>
          
          {/* Terminal Navigation Links */}
          <div className="flex flex-col space-y-1">
            <Link 
              href="/markets" 
              className="text-green-300 hover:text-green-400 hover:bg-green-500/10 px-3 py-2 rounded transition-all duration-200 font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {'>'} ./markets.exe
            </Link>
            <Link 
              href="/create" 
              className="text-green-300 hover:text-green-400 hover:bg-green-500/10 px-3 py-2 rounded transition-all duration-200 font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {'>'} ./create_market.sh
            </Link>
            <Link 
              href="/leaderboard" 
              className="text-green-300 hover:text-green-400 hover:bg-green-500/10 px-3 py-2 rounded transition-all duration-200 font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {'>'} ./leaderboard.exe
            </Link>
            <Link 
              href="/governance" 
              className="text-green-300 hover:text-green-400 hover:bg-green-500/10 px-3 py-2 rounded transition-all duration-200 font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {'>'} ./governance.sh
            </Link>
            <Link 
              href="/token" 
              className="text-green-300 hover:text-green-400 hover:bg-green-500/10 px-3 py-2 rounded transition-all duration-200 font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {'>'} ./dbt_token.exe
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 

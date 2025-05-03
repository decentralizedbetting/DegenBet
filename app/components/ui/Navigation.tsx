"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { ThemeToggle } from '@/app/components/ThemeToggle';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const [isTemplatesMenuOpen, setIsTemplatesMenuOpen] = useState(false);
  const [unreadNotifications] = useState(3);
  const [networkInfo, setNetworkInfo] = useState({
    name: 'Ethereum',
    icon: '/icons/eth.svg',
    status: 'healthy', // 'healthy', 'congested', 'issues'
  });
  const [predictionStreak, setPredictionStreak] = useState(7);
  
  // Refs for click outside handling
  const userMenuRef = useRef<HTMLDivElement>(null);
  const networkMenuRef = useRef<HTMLDivElement>(null);
  const templatesMenuRef = useRef<HTMLDivElement>(null);

  // Available networks
  const networks = [
    { name: 'Ethereum', icon: '/icons/eth.svg' },
    { name: 'Polygon', icon: '/icons/polygon.svg' },
    { name: 'Arbitrum', icon: '/icons/arbitrum.svg' },
    { name: 'Optimism', icon: '/icons/optimism.svg' }
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
  
  const handleNetworkSelect = (network: {name: string, icon: string}) => {
    setNetworkInfo({
      name: network.name,
      icon: network.icon,
      status: 'healthy',
    });
    setIsNetworkMenuOpen(false);
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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center flex-shrink-0 mr-8 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 blur-sm group-hover:blur transition duration-200"></div>
                <div className="relative bg-gray-900 rounded-full p-1">
                  <Image 
                    src="/Dino-Logo.png" 
                    alt="DINO" 
                    width={32} 
                    height={32} 
                    className="transform group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-2">
                <span className="text-white font-bold text-lg leading-none">DINO</span>
                <span className="text-blue-400 text-xs font-medium leading-tight">Prediction Market</span>
              </div>
              
              {/* Beta Badge - Fixed positioning */}
              <div className="ml-2 self-start">
                <div className="relative group">
                  <div className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-sm border border-white/20 uppercase tracking-wider">
                    Beta
                  </div>
                  <div className="absolute hidden group-hover:block w-40 bg-gray-900 text-white text-xs p-2 rounded border border-white/10 -left-4 top-6 z-[100]">
                    This platform is in active development. Features and UI may change.
                  </div>
                </div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/markets" 
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors relative"
              >
                <span className="relative z-10">Markets</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></span>
              </Link>
              
              <Link 
                href="/create" 
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors relative"
              >
                <span className="relative z-10">Create Market</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></span>
              </Link>
              <Link 
                href="/leaderboard" 
                className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors relative"
              >
                <span className="relative z-10">Leaderboard</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Right Section (Network Info, Search, Notifications, Profile, Connect) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {/* Network Status - Adjusted width and position */}
            <div className="relative z-40" ref={networkMenuRef}>
              <button 
                onClick={handleNetworkMenuToggle}
                className="flex items-center text-sm rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 px-3 py-1.5 border border-white/10 transition-colors"
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
                <span className="text-white mr-1">{networkInfo.name}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isNetworkMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl border border-white/10 shadow-lg py-1 z-[60]">
                  <div className="px-3 py-2 border-b border-white/10 text-xs text-white/60">
                    Select Network
                  </div>
                  {networks.map((network) => (
                    <button
                      key={network.name}
                      onClick={() => handleNetworkSelect(network)}
                      className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                      <Image 
                        src={network.icon} 
                        alt={network.name} 
                        width={16} 
                        height={16} 
                        className="mr-2"
                      />
                      {network.name}
                      {networkInfo.name === network.name && (
                        <svg className="w-4 h-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Toggle - Fixed spacing */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
            
            {/* Search - Fixed positioning and width */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search markets..."
                className="bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-40 lg:w-52 transition-all duration-300 hover:bg-white/10 focus:w-52 lg:focus:w-64 group-hover:bg-white/10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Notifications - Fixed positioning for badge */}
            <button className="relative text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {/* User Profile Dropdown - Fixed positioning and z-index */}
            <div className="relative z-40" ref={userMenuRef}>
              <button
                onClick={handleUserMenuToggle}
                className="flex items-center justify-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-full w-8 h-8 transition-colors relative border border-white/10"
              >
                <span className="text-sm font-medium text-blue-400">DF</span>
                
                {/* Prediction streak badge - Fixed positioning */}
                {predictionStreak > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-gray-900 group">
                    <span>{predictionStreak}</span>
                    <div className="absolute inset-0 rounded-full animate-ping bg-orange-500 opacity-30"></div>
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs whitespace-nowrap bg-gray-900 px-1.5 py-0.5 rounded pointer-events-none z-[100]">
                      {predictionStreak} day streak!
                    </span>
                  </div>
                )}
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl border border-white/10 shadow-lg py-1 z-[60]">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="font-medium text-white flex items-center">
                      DeFiWhale
                      {predictionStreak > 0 && (
                        <div className="ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                          <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                          </svg>
                          {predictionStreak} day streak
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center mt-1">
                      <span className="truncate">0x4a3...f28b</span>
                      <button className="ml-1 text-gray-400 hover:text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                      <div className="bg-white/5 rounded px-2 py-1.5">
                        <div className="font-medium text-white">12</div>
                        <div className="text-gray-400">Markets</div>
                      </div>
                      <div className="bg-white/5 rounded px-2 py-1.5">
                        <div className="font-medium text-green-400">+18.6%</div>
                        <div className="text-gray-400">ROI</div>
                      </div>
                      <div className="bg-white/5 rounded px-2 py-1.5">
                        <div className="font-medium text-white">4.2k</div>
                        <div className="text-gray-400">DINO</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-3 flex items-center space-x-4">
                    <Link 
                      href="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Your Profile
                    </Link>
                    <Link 
                      href="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                  </div>
                  
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <button 
                      className="flex w-full items-center text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                    >
                      <svg className="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Connect Wallet Button - Adjusted spacing */}
            <Button className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-700 text-white py-1.5 px-3 lg:py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium">
              <span className="relative z-10">Connect Wallet</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-700/50 translate-y-10 group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={handleMobileMenuToggle} 
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 border-t border-white/10 relative z-50">
          {/* Network selection - Fixed mobile dropdown position */}
          <div className="px-3 py-2 mb-2 flex items-center relative">
            <div className="flex items-center">
              <div className="mr-2 relative w-5 h-5">
                <Image 
                  src={networkInfo.icon} 
                  alt={networkInfo.name} 
                  width={20} 
                  height={20} 
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${getStatusColors()} rounded-full border border-gray-900`}></div>
              </div>
              <button 
                onClick={handleNetworkMenuToggle}
                className="text-white text-sm flex items-center"
              >
                <span>{networkInfo.name}</span>
                <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Mobile network dropdown - Fixed position */}
            {isNetworkMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-full bg-gray-800 rounded-lg border border-white/10 shadow-lg py-1 z-[70]">
                {networks.map((network) => (
                  <button
                    key={network.name}
                    onClick={() => handleNetworkSelect(network)}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    <div className="mr-2 relative w-5 h-5">
                      <Image 
                        src={network.icon} 
                        alt={network.name} 
                        width={20} 
                        height={20} 
                      />
                    </div>
                    <span>{network.name}</span>
                    {network.name === networkInfo.name && (
                      <svg className="w-4 h-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Added theme toggle to mobile menu */}
          <div className="flex justify-between items-center px-3 mb-2">
            <div className="text-gray-300 text-sm">Theme</div>
            <ThemeToggle />
          </div>
          
          <div className="flex flex-col space-y-1">
            <Link 
              href="/markets" 
              className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              Markets
            </Link>
            <Link 
              href="/create" 
              className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              Create Market
            </Link>
            <Link 
              href="/leaderboard" 
              className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              Leaderboard
            </Link>

            {/* Added mobile search */}
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search markets..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 hover:bg-white/10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-700 text-white py-2 rounded-lg transition-all duration-200 text-sm font-medium">
                <span className="relative z-10">Connect Wallet</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-700/50 translate-y-10 group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
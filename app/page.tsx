"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './components/ui/Button';
import { MarketsGrid } from './components/MarketsGrid';
import { sampleMarkets as importedMarkets } from './data/markets';
import Footer from './components/Footer';
import { MarketCard } from './components/MarketCard';
import { MarketsGrid as NewMarketsGrid } from './components/MarketsGrid';
import { ArrowRightIcon, CalendarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { FeaturedMarket } from './components/FeaturedMarket';
import { Market } from './types/market';
import HexagonalBackground from './components/HexagonalBackground';

// Supported wallets data
const supportedWallets = [
  { name: 'MetaMask', icon: '/icons/metamask.svg' },
  { name: 'WalletConnect', icon: '/icons/walletconnect.svg' },
  { name: 'Coinbase Wallet', icon: '/icons/coinbase.svg' },
  { name: 'Trust Wallet', icon: '/icons/trust.svg' },
  { name: 'Rainbow', icon: '/icons/rainbow.svg' },
];

// Platform statistics
const platformStats = [
  { label: 'Total Value Locked', value: '$2.5M+' },
  { label: 'Active Markets', value: '150+' },
  { label: 'Total Volume', value: '$1.2M+' },
  { label: 'Community Members', value: '10K+' },
];

// Featured categories
const categories = [
  { name: 'Crypto', icon: '/icons/crypto.svg', count: 45 },
  { name: 'DeFi', icon: '/icons/defi.svg', count: 32 },
  { name: 'NFTs', icon: '/icons/nft.svg', count: 28, fallbackIcon: 'nft' },
  { name: 'Gaming', icon: '/icons/gaming.svg', count: 24, fallbackIcon: 'gaming' },
  { name: 'Layer 2', icon: '/icons/layer2.svg', count: 18, fallbackIcon: 'layer2' },
  { name: 'DAOs', icon: '/icons/dao.svg', count: 15, fallbackIcon: 'dao' },
];

// Platform features
const features = [
  {
    title: 'Decentralized & Secure',
    description: 'Built on blockchain technology with no central authority or single point of failure.',
    icon: '/icons/decentralized.svg',
    fallbackIcon: 'decentralized'
  },
  {
    title: 'Real-Time Data',
    description: 'Access real-time market data, analytics, and price feeds from trusted oracles.',
    icon: '/icons/data.svg',
    fallbackIcon: 'data'
  },
  {
    title: 'Advanced Trading',
    description: 'Use limit orders, market orders, and advanced trading features for optimal positions.',
    icon: '/icons/trading.svg',
    fallbackIcon: 'trading'
  },
  {
    title: 'Community Governed',
    description: 'Platform decisions made by the community through transparent governance mechanisms.',
    icon: '/icons/community.svg',
    fallbackIcon: 'community'
  }
];

// Supported Blockchain Networks
const blockchains = [
  { name: 'Ethereum', icon: '/icons/eth.svg', isPrimary: true },
  { name: 'Polygon', icon: '/icons/polygon.svg', isPrimary: true },
  { name: 'Arbitrum', icon: '/icons/arbitrum.svg', isPrimary: true },
  { name: 'Optimism', icon: '/icons/optimism.svg', isPrimary: true },
  { name: 'Avalanche', icon: '/icons/avalanche.svg', isPrimary: false },
  { name: 'Base', icon: '/icons/base.svg', isPrimary: false },
  { name: 'Solana', icon: '/icons/solana.svg', isPrimary: false },
  { name: 'Binance Chain', icon: '/icons/bnb.svg', isPrimary: false },
];

// Token ecosystem data
const tokens = [
  { symbol: 'DINO', name: 'DINO Prediction Token', icon: '/icons/token.svg', role: 'Governance & Staking' },
  { symbol: 'USDC', name: 'USD Coin', icon: '/icons/usdc.svg', role: 'Collateral & Settlement' },
  { symbol: 'ETH', name: 'Ethereum', icon: '/icons/eth.svg', role: 'Gas & Fees' },
  { symbol: 'MATIC', name: 'Polygon', icon: '/icons/polygon.svg', role: 'Gas & Fees' },
];

// Live market ticker data
const liveMarketData = [
  { name: 'Bitcoin $100K by EOY', probability: 0.42, change: 0.05, volume: '$124K', category: 'Crypto' },
  { name: 'Ethereum to flip Bitcoin', probability: 0.18, change: -0.02, volume: '$89K', category: 'Crypto' },
  { name: 'USDC to regain #2 stablecoin position', probability: 0.76, change: 0.03, volume: '$56K', category: 'DeFi' },
  { name: 'Fed to cut rates in Q3', probability: 0.63, change: 0.01, volume: '$102K', category: 'Macro' },
  { name: 'New crypto regulation in EU', probability: 0.51, change: -0.04, volume: '$78K', category: 'Politics' },
];

// Market categories with associated styling
const marketCategories = [
  { id: 'trending', name: 'Trending', color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'new', name: 'New', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'politics', name: 'Politics', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 'sports', name: 'Sports', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'culture', name: 'Culture', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'crypto', name: 'Crypto', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'climate', name: 'Climate', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'economics', name: 'Economics', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { id: 'companies', name: 'Companies', color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { id: 'financials', name: 'Financials', color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'tech', name: 'Tech & Science', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'health', name: 'Health', color: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { id: 'world', name: 'World', color: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
];

// Define sample markets with the complete Market properties
const currentMarkets: Market[] = [
  {
    id: "0x1",
    title: "Bitcoin Price Prediction",
    description: "Will Bitcoin exceed $100k before 2025?",
    category: "crypto",
    status: "active",
    resolutionType: "binary",
    createdAt: "2023-09-15T10:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    creator: {
      id: "0xD92E44Ac213b9EBda0178E1523d84a343147b4dF",
      username: "CryptoWhale",
      reputation: 98
    },
    outcomes: [
      { id: "0", label: "No", probability: 0.32, price: 0.32, volume: 320000 },
      { id: "1", label: "Yes", probability: 0.68, price: 0.68, volume: 680000 }
    ],
    totalVolume: 1200000,
    liquidity: 320000,
    comments: [],
    tags: ["crypto", "bitcoin", "price prediction"]
  },
  {
    id: "0x2",
    title: "Ethereum Merge Prediction",
    description: "Will Ethereum merge to PoS in 2023?",
    category: "crypto",
    status: "active",
    resolutionType: "binary",
    createdAt: "2023-08-10T14:30:00Z",
    endDate: "2023-12-31T23:59:59Z",
    creator: {
      id: "0x8C8D7C46219D9205f056f28fee5950aD564d7465",
      username: "ETHDeveloper",
      reputation: 92
    },
    outcomes: [
      { id: "0", label: "No", probability: 0.08, price: 0.08, volume: 272000 },
      { id: "1", label: "Yes", probability: 0.92, price: 0.92, volume: 3128000 }
    ],
    totalVolume: 3400000,
    liquidity: 650000,
    comments: [],
    tags: ["crypto", "ethereum", "merge", "PoS"]
  },
  {
    id: "0x3",
    title: "Trump Election Prediction",
    description: "Will Trump win the 2024 US Election?",
    category: "politics",
    status: "active",
    resolutionType: "binary",
    createdAt: "2023-07-04T09:15:00Z",
    endDate: "2024-11-05T23:59:59Z",
    creator: {
      id: "0x1234567890123456789012345678901234567890",
      username: "PoliticalAnalyst",
      reputation: 88
    },
    outcomes: [
      { id: "0", label: "No", probability: 0.52, price: 0.52, volume: 3016000 },
      { id: "1", label: "Yes", probability: 0.48, price: 0.48, volume: 2784000 }
    ],
    totalVolume: 5800000,
    liquidity: 980000,
    comments: [],
    tags: ["politics", "election", "US", "Trump"]
  },
  {
    id: "0x4",
    title: "GPT-5 Release Prediction",
    description: "Will OpenAI release GPT-5 before 2024?",
    category: "technology",
    status: "active",
    resolutionType: "binary",
    createdAt: "2023-09-20T11:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
    creator: {
      id: "0xabc123def456ghi789jkl012mno345pqr678stu",
      username: "AIResearcher",
      reputation: 95
    },
    outcomes: [
      { id: "0", label: "No", probability: 0.65, price: 0.65, volume: 507000 },
      { id: "1", label: "Yes", probability: 0.35, price: 0.35, volume: 273000 }
    ],
    totalVolume: 780000,
    liquidity: 250000,
    comments: [],
    tags: ["technology", "AI", "OpenAI", "GPT-5"]
  },
  {
    id: "0x5",
    title: "SpaceX Mars Landing Prediction",
    description: "Will SpaceX land humans on Mars before 2030?",
    category: "science",
    status: "active",
    resolutionType: "binary",
    createdAt: "2023-04-12T16:45:00Z",
    endDate: "2029-12-31T23:59:59Z",
    creator: {
      id: "0x5566778899aabbccddeeff0011223344556677",
      username: "SpaceEnthusiast",
      reputation: 85
    },
    outcomes: [
      { id: "0", label: "No", probability: 0.72, price: 0.72, volume: 1152000 },
      { id: "1", label: "Yes", probability: 0.28, price: 0.28, volume: 448000 }
    ],
    totalVolume: 1600000,
    liquidity: 420000,
    comments: [],
    tags: ["science", "space", "SpaceX", "Mars", "exploration"]
  },
  {
    id: "0x6",
    title: "Global Temperature Prediction",
    description: "Will global average temperature rise exceed 1.5°C by 2025?",
    category: "science",
    status: "active",
    resolutionType: "binary",
    createdAt: "2023-01-15T08:30:00Z",
    endDate: "2025-12-31T23:59:59Z",
    creator: {
      id: "0xA1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5F6A1B2",
      username: "ClimateScientist",
      reputation: 97
    },
    outcomes: [
      { id: "0", label: "No", probability: 0.36, price: 0.36, volume: 342000 },
      { id: "1", label: "Yes", probability: 0.64, price: 0.64, volume: 608000 }
    ],
    totalVolume: 950000,
    liquidity: 280000,
    comments: [],
    tags: ["science", "climate", "global warming", "temperature"]
  }
];

// Get the featured market (first one for now)
const featuredMarket = currentMarkets[0];

// Format large numbers into K/M format
const formatVolume = (volume: number) => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  }
  if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  }
  return `$${volume.toFixed(0)}`;
};

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Ethereum');
  const [tickerPosition, setTickerPosition] = useState(0);
  const [activeMarketIndex, setActiveMarketIndex] = useState(0);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  // Animation for the live market ticker
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerPosition((prev) => (prev + 1) % liveMarketData.length);
    }, 3000);
    
    return () => clearInterval(tickerInterval);
  }, []);

  // Animation for active markets carousel
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setActiveMarketIndex((prev) => (prev + 1) % currentMarkets.length);
    }, 5000);
    
    return () => clearInterval(carouselInterval);
  }, []);

  // Use effect to simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingFeatured(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // SVG Icon fallbacks
  const renderIconFallback = (iconName: string) => {
    switch(iconName.toLowerCase()) {
      case 'logo':
        return (
          <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
          </svg>
        );
      case 'crypto':
        return (
          <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0C5.334 0 0 5.334 0 11.944c0 6.61 5.334 11.944 11.944 11.944 6.61 0 11.944-5.334 11.944-11.944C23.888 5.334 18.554 0 11.944 0zM12 3v4.85l4.707 2.11L12 3zm0 17.788V8.826L6 11.894l6 8.894z"/>
          </svg>
        );
      case 'defi':
        return (
          <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm3-12v4h-6v-4h6z"/>
          </svg>
        );
      case 'nft':
        return (
          <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7 2h2v4h-2V6zm-4 0h2v4H9V6zmM5 6h2v4H5V6zm14 12H5v-6h14v6z"/>
          </svg>
        );
      case 'gaming':
        return (
          <svg className="w-10 h-10 text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        );
      case 'layer2':
        return (
          <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        );
      case 'dao':
        return (
          <svg className="w-10 h-10 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-15v10m-5-5h10"/>
          </svg>
        );
    }
  };

  // SVG Icon fallbacks for platform features
  const renderFeatureIconFallback = (iconName: string) => {
    switch(iconName.toLowerCase()) {
      case 'decentralized':
        return (
          <svg className="w-12 h-12 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-17v4h2V5h-2zm0 12v4h2v-4h-2zm8-6h-4v2h4v-2zM9 13H5v-2h4v2zm9.7-8.3l-2.8 2.8 1.4 1.4 2.8-2.8-1.4-1.4zm-18.4 0l1.4 1.4L4.3 8.9 2.9 7.5l1.4-1.4zM21.7 19.3l-2.8-2.8-1.4 1.4 2.8 2.8 1.4-1.4zm-14.4 0l-2.8 2.8-1.4-1.4 2.8-2.8 1.4 1.4z"/>
          </svg>
        );
      case 'data':
        return (
          <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-7h2v7zm-1-9.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          </svg>
        );
      case 'trading':
        return (
          <svg className="w-12 h-12 text-green-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2.5 7.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S14.17 9 15 9s1.5.67 1.5 1.5zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM9 9c-.83 0-1.5.67-1.5 1.5S8.17 12 9 12s1.5-.67 1.5-1.5S9.83 9 9 9zm11 9H4v-2h16v2zm0-5l-4-4 4-4v8z"/>
          </svg>
        );
      case 'community':
        return (
          <svg className="w-12 h-12 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-15v10m-5-5h10"/>
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Live Market Ticker with Categories */}
      <div className="w-full bg-gray-900 border-y border-white/10 py-4 overflow-hidden relative">
        <div className="container mx-auto px-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center mb-4 space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary/20 border border-primary/30 rounded-full whitespace-nowrap">
              All Markets
            </button>
            {marketCategories.map(category => (
              <button 
                key={category.id}
                className={`px-3 py-1.5 text-xs font-medium ${category.color} ${category.bg} border ${category.border} rounded-full whitespace-nowrap hover:bg-opacity-30 transition-colors`}
              >
                {category.name}
              </button>
              ))}
            </div>
          
          {/* Live Market Ticker */}
          <div className="relative">
            <div className="flex items-center space-x-6 animate-marquee">
              {currentMarkets.map((market, index) => {
                // Randomly assign a category to each market for demo purposes
                const randomCategory = marketCategories[index % marketCategories.length];
                return (
          <Link 
                    href={`/markets/${market.id}`}
                    key={market.id} 
                    className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors min-w-max"
                  >
                    <div className={`px-2 py-1 text-xs font-medium rounded-md ${randomCategory.color} ${randomCategory.bg} border ${randomCategory.border}`}>
                      {randomCategory.name}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-white font-medium mr-2">{market.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-md ${market.outcomes[1].probability > 0.5 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {(market.outcomes[1].probability * 100).toFixed(0)}%
                      </span>
                    </div>
          </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Blockchain Background */}
      <section className="relative py-20 px-4 overflow-hidden">
        <HexagonalBackground />
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo with fallback */}
            <div className="mx-auto mb-8 w-20 h-20 flex items-center justify-center">
              <Image
                src="/Dino-Logo.png"
                alt="DINO Logo"
                width={80}
                height={80}
                className="mx-auto"
                priority
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const logoFallback = document.getElementById('logo-fallback');
                  if (logoFallback) {
                    logoFallback.style.display = 'block';
                  }
                }}
              />
              <div id="logo-fallback" className="hidden">
                {renderIconFallback('logo')}
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Trade on the Future with DINO
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Predict and trade on crypto market outcomes. From Bitcoin to DeFi, put your knowledge to work and earn rewards.
            </p>
            
            {/* Wallet Connection */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {supportedWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => setSelectedWallet(wallet.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                      selectedWallet === wallet.name
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    aria-pressed={selectedWallet === wallet.name}
                    aria-label={`Connect with ${wallet.name}`}
                  >
                    <div className="w-6 h-6 relative">
                      <Image
                        src={wallet.icon}
                        alt={wallet.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        priority={wallet.name === 'MetaMask' || wallet.name === 'Coinbase'}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallbackElement = e.currentTarget.parentElement?.querySelector('.wallet-fallback');
                          if (fallbackElement) {
                            fallbackElement.classList.remove('hidden');
                          }
                        }}
                      />
                      <div className="wallet-fallback hidden">
                        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                      </div>
                    </div>
                    <span>{wallet.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Network Selection */}
              {selectedWallet && (
                <div className="mb-6">
                  <div className="text-sm text-white/60 mb-3">Select Network</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {blockchains.filter(b => b.isPrimary).map((blockchain) => (
                      <button
                        key={blockchain.name}
                        onClick={() => setSelectedNetwork(blockchain.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all duration-300 ${
                          selectedNetwork === blockchain.name
                            ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="w-4 h-4 relative">
                          <Image
                            src={blockchain.icon}
                            alt={blockchain.name}
                            width={16}
                            height={16}
                            priority={blockchain.name === 'Ethereum' || blockchain.name === 'Polygon'}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallbackElement = e.currentTarget.parentElement?.querySelector('.network-fallback');
                              if (fallbackElement) {
                                fallbackElement.classList.remove('hidden');
                              }
                            }}
                          />
                          <div className="network-fallback hidden">
                            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2z"/>
                            </svg>
                          </div>
                        </div>
                        <span>{blockchain.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
                disabled={!selectedWallet}
              >
                {selectedWallet ? `Connect ${selectedWallet}` : 'Select a Wallet'}
              </Button>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {platformStats.map((stat) => (
                <div key={stat.label} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Market Section - Removed header */}
      <section className="py-10 px-4 container mx-auto">
        {/* Featured Market component */}
        <FeaturedMarket market={currentMarkets[0]} />
      </section>

      {/* Active Markets Section - Removed header */}
      <section className="py-10 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto">
          {/* Category Filters - horizontal scrollable on mobile */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none flex-nowrap mb-6">
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-teal-500/20 border border-teal-500/30 rounded-full whitespace-nowrap">
              All Categories
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full whitespace-nowrap">
              Crypto
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full whitespace-nowrap">
              Politics
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-full whitespace-nowrap">
              Sports
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full whitespace-nowrap">
              Economics
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-full whitespace-nowrap">
              Entertainment
            </button>
          </div>
          
          {/* Markets Grid with improved layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMarkets.slice(0, 6).map(market => (
              <MarketCard key={market.id} market={market} />
                ))}
          </div>

          {/* View All Markets CTA */}
          <div className="flex justify-center mt-10">
            <Link href="/markets">
              <Button size="lg" className="px-8 group">
                <span>Explore All Markets</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
                  </div>
                      </div>
      </section>

      {/* More Opportunities Section - replaces any existing section */}
      <section className="py-10 px-4 bg-black/30 backdrop-blur-sm border-y border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                    <div>
              <h2 className="text-2xl font-bold text-white mb-2">More Opportunities</h2>
              <p className="text-gray-400 max-w-2xl">Discover emerging markets with growth potential</p>
                      </div>
            <div className="flex mt-4 md:mt-0 gap-2">
              <Button variant="secondary" size="sm">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>Latest</span>
              </Button>
              <Button variant="secondary" size="sm">
                <UserGroupIcon className="w-4 h-4 mr-2" />
                <span>Popular</span>
              </Button>
              <Button variant="secondary" size="sm">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                <span>Trending</span>
              </Button>
                    </div>
                      </div>
          
          {/* Markets Grid with slightly different styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentMarkets.slice(0, 4).map(market => (
              <div key={market.id} className="backdrop-blur-sm bg-gray-800/30 hover:bg-gray-800/50 border border-white/5 hover:border-teal-500/30 rounded-xl p-4 transition-all group">
                <div className="mb-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full bg-${market.category === 'crypto' ? 'blue' : 'purple'}-500/10 text-${market.category === 'crypto' ? 'blue' : 'purple'}-400`}>
                    {market.category}
                  </span>
                    </div>
                <h3 className="text-white font-medium mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors">{market.title}</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Volume: {formatVolume(market.totalVolume)}</span>
                  <span className="text-white font-medium">{(market.outcomes[0].probability * 100).toFixed(0)}%</span>
                      </div>
                <Link href={`/markets/${market.id}`} className="mt-4 text-teal-400 text-sm font-medium flex items-center hover:text-teal-300 transition-colors">
                  <span>Trade Now</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
                    </div>
            ))}
                  </div>
        </div>
      </section>

      {/* Categories Section - Expanded with more categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Crypto Category */}
              <Link 
              href="/markets?category=crypto"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-blue-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0C5.334 0 0 5.334 0 11.944c0 6.61 5.334 11.944 11.944 11.944 6.61 0 11.944-5.334 11.944-11.944C23.888 5.334 18.554 0 11.944 0zM12 3v4.85l4.707 2.11L12 3zm0 17.788V8.826L6 11.894l6 8.894z"/>
                    </svg>
                </div>
              <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                Crypto
              </div>
              <div className="text-sm text-white/60 mt-1">45 markets</div>
            </Link>
            
            {/* DeFi Category */}
            <Link
              href="/markets?category=defi"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-green-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-4-11.5h8a2.5 2.5 0 010 5h-8a2.5 2.5 0 010-5z"/>
                </svg>
                      </div>
              <div className="font-medium text-white group-hover:text-green-400 transition-colors">
                DeFi
                    </div>
              <div className="text-sm text-white/60 mt-1">32 markets</div>
            </Link>
            
            {/* NFTs Category */}
            <Link
              href="/markets?category=nfts"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-purple-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-7.5 12h-5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5zm5.5-2.5c0 .83-.67 1.5-1.5 1.5S15 14.33 15 13.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm0-4c0 .83-.67 1.5-1.5 1.5S15 10.33 15 9.5 15.67 8 16.5 8s1.5.67 1.5 1.5z"/>
                </svg>
                          </div>
              <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                NFTs
                      </div>
              <div className="text-sm text-white/60 mt-1">28 markets</div>
            </Link>
            
            {/* Gaming Category */}
            <Link
              href="/markets?category=gaming"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-red-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                    </div>
              <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                Gaming
                  </div>
              <div className="text-sm text-white/60 mt-1">24 markets</div>
            </Link>
            
            {/* Politics Category */}
            <Link
              href="/markets?category=politics"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-orange-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                </div>
              <div className="font-medium text-white group-hover:text-orange-400 transition-colors">
                Politics
              </div>
              <div className="text-sm text-white/60 mt-1">36 markets</div>
            </Link>
            
            {/* Sports Category */}
            <Link
              href="/markets?category=sports"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-green-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
            </div>
              <div className="font-medium text-white group-hover:text-green-400 transition-colors">
                Sports
          </div>
              <div className="text-sm text-white/60 mt-1">42 markets</div>
            </Link>
            
            {/* Entertainment Category */}
            <Link
              href="/markets?category=entertainment"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-pink-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                </svg>
        </div>
              <div className="font-medium text-white group-hover:text-pink-400 transition-colors">
                Entertainment
              </div>
              <div className="text-sm text-white/60 mt-1">19 markets</div>
            </Link>
            
            {/* Science & Tech Category */}
              <Link
              href="/markets?category=tech"
              className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center bg-cyan-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 19.17V4h-6V2H4v14.17L2 18l2 1.83V22h16v-2.17l2-1.83-2-1.83zM16 6h2v10h-2V6zM6 4h6v6h2v12H6V4z"/>
                </svg>
                </div>
              <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                Science & Tech
              </div>
              <div className="text-sm text-white/60 mt-1">31 markets</div>
              </Link>
          </div>
        </div>
      </section>

      {/* Token Ecosystem Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Token Ecosystem</h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Built on a multi-token economy for optimal efficiency, security, and user experience
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokens.map((token) => (
              <div
                key={token.symbol}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-4 relative">
                  <Image
                    src={token.icon}
                    alt={token.name}
                    width={40}
                    height={40}
                      className="mr-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallbackElement = e.currentTarget.parentElement?.querySelector('.token-fallback');
                        if (fallbackElement) {
                          fallbackElement.classList.remove('hidden');
                        }
                      }}
                    />
                    <div className="token-fallback hidden">
                      <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.25-5v-1.5h2.5V17h-2.5zm0-10v7h2.5V7h-2.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{token.symbol}</div>
                    <div className="text-sm text-white/60">{token.name}</div>
                  </div>
                </div>
                <div className="bg-blue-500/10 text-blue-400 text-sm py-1 px-3 rounded-full inline-block">
                  {token.role}
                </div>
              </div>
            ))}
      </div>

          <div className="mt-10 text-center">
            <Link
              href="/token"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Learn more about our token economy</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blockchain Networks */}
      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Supported Networks</h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Our platform operates across multiple blockchains for maximum accessibility and efficiency
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {blockchains.map((blockchain) => (
              <div
                key={blockchain.name}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-12 h-12 mb-4 relative">
                <Image
                  src={blockchain.icon}
                  alt={blockchain.name}
                  width={48}
                  height={48}
                    className="mb-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallbackElement = e.currentTarget.parentElement?.querySelector('.blockchain-fallback');
                      if (fallbackElement) {
                        fallbackElement.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="blockchain-fallback hidden">
                    <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0C5.334 0 0 5.334 0 11.944c0 6.61 5.334 11.944 11.944 11.944 6.61 0 11.944-5.334 11.944-11.944C23.888 5.334 18.554 0 11.944 0zM12 3v4.85l4.707 2.11L12 3zm0 17.788V8.826L6 11.894l6 8.894z"/>
                    </svg>
                  </div>
                </div>
                <div className="font-medium text-white text-center">{blockchain.name}</div>
                {blockchain.isPrimary && (
                  <div className="mt-2 bg-blue-500/10 text-blue-400 text-xs py-1 px-2 rounded-full">
                    Live
                  </div>
                )}
                {!blockchain.isPrimary && (
                  <div className="mt-2 bg-gray-500/10 text-gray-400 text-xs py-1 px-2 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
      </div>
                </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 relative">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="mb-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallbackElement = e.currentTarget.parentElement?.querySelector('.feature-fallback');
                      if (fallbackElement) {
                        fallbackElement.classList.remove('hidden');
                      }
                    }}
                  />
                  <div className="feature-fallback hidden">
                    {renderFeatureIconFallback(feature.fallbackIcon)}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & DAO */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold mb-6">Community Governance</h2>
              <p className="text-white/70 text-lg mb-6">
                Our platform is governed by DINO token holders through a decentralized autonomous organization (DAO).
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Proposal Creation</h3>
                    <p className="text-white/60">Any token holder can create governance proposals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Community Voting</h3>
                    <p className="text-white/60">Democratic voting on platform changes and treasury allocations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Treasury Management</h3>
                    <p className="text-white/60">Community-controlled fund allocation and protocol incentives</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/governance" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Explore Governance</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Latest Proposals</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-white">Add New Oracle Integration</div>
                      <div className="bg-green-500/20 text-green-400 text-xs py-1 px-2 rounded-full">Active</div>
                    </div>
                    <p className="text-white/60 text-sm mb-3">Proposal to integrate Chainlink Data Feeds for market resolution.</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">Votes: 142k DINO</div>
                      <div className="text-white/60">Ends in 2 days</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-white">Adjust Market Creation Fee</div>
                      <div className="bg-green-500/20 text-green-400 text-xs py-1 px-2 rounded-full">Active</div>
                    </div>
                    <p className="text-white/60 text-sm mb-3">Proposal to reduce market creation fee from 5 DINO to 2 DINO.</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">Votes: 89k DINO</div>
                      <div className="text-white/60">Ends in 3 days</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-white">Protocol Fee Distribution</div>
                      <div className="bg-blue-500/20 text-blue-400 text-xs py-1 px-2 rounded-full">Executed</div>
                    </div>
                    <p className="text-white/60 text-sm mb-3">Approved: 80% of protocol fees to be distributed to DINO stakers.</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">Votes: 267k DINO</div>
                      <div className="text-green-400">Passed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oracle Integration */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Powered by Oracle Networks</h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Our markets are resolved using decentralized oracle networks for reliable, tamper-proof data
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4">
              <Image
                src="/icons/chainlink.svg"
                alt="Chainlink"
                width={80}
                height={80}
                  className="mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackElement = e.currentTarget.parentElement?.querySelector('.oracle-fallback');
                    if (fallbackElement) {
                      fallbackElement.classList.remove('hidden');
                    }
                  }}
                />
                <div className="oracle-fallback hidden">
                  <svg className="w-20 h-20 text-blue-400 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm3-12v4h-6v-4h6z"/>
                  </svg>
                </div>
              </div>
              <div className="font-medium text-white">Chainlink</div>
              <div className="text-sm text-white/60">Price Feeds</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4">
              <Image
                src="/icons/api3.svg"
                alt="API3"
                width={80}
                height={80}
                  className="mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackElement = e.currentTarget.parentElement?.querySelector('.oracle-fallback');
                    if (fallbackElement) {
                      fallbackElement.classList.remove('hidden');
                    }
                  }}
                />
                <div className="oracle-fallback hidden">
                  <svg className="w-20 h-20 text-green-400 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </div>
              </div>
              <div className="font-medium text-white">API3</div>
              <div className="text-sm text-white/60">dAPIs</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4">
              <Image
                src="/icons/umb.svg"
                alt="Umbrella Network"
                width={80}
                height={80}
                  className="mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackElement = e.currentTarget.parentElement?.querySelector('.oracle-fallback');
                    if (fallbackElement) {
                      fallbackElement.classList.remove('hidden');
                    }
                  }}
                />
                <div className="oracle-fallback hidden">
                  <svg className="w-20 h-20 text-purple-400 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4C7.58 4 4 7.58 4 12c0 1.06.21 2.06.58 3L12 4zm7.42 5c-.37-.94-.97-1.86-1.76-2.66L12 12l4.66 4.66c.8-.79 1.4-1.71 1.76-2.66L14.73 12l4.69-3zM19.42 9c.37.94.58 1.94.58 3s-.21 2.06-.58 3l-2.5-2L19.42 9zM7.83 18.77C9.02 19.53 10.46 20 12 20s2.98-.47 4.17-1.23L12 14.82l-4.17 3.95z"/>
                  </svg>
                </div>
              </div>
              <div className="font-medium text-white">Umbrella</div>
              <div className="text-sm text-white/60">Layer-2 Oracle</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4">
              <Image
                src="/icons/pyth.svg"
                alt="Pyth Network"
                width={80}
                height={80}
                  className="mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackElement = e.currentTarget.parentElement?.querySelector('.oracle-fallback');
                    if (fallbackElement) {
                      fallbackElement.classList.remove('hidden');
                    }
                  }}
                />
                <div className="oracle-fallback hidden">
                  <svg className="w-20 h-20 text-yellow-400 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.24 12.99L21 12l-5-5-1 1 4 4-4 4 1 1 4.24-4.01zM9 8l-4.99 4L9 16l1-1-4-4 4-4-1-1zM15 3l-2 14-1 4h2l1-4 2-14h-2z"/>
                  </svg>
                </div>
              </div>
              <div className="font-medium text-white">Pyth</div>
              <div className="text-sm text-white/60">Financial Data</div>
        </div>
      </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 max-w-3xl mx-auto">
            <h3 className="font-semibold text-lg mb-4">How Oracle Integration Works</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-blue-400 font-medium">1</span>
                </div>
                <div>
                  <p className="text-white/70">Market creators select specific data sources and resolution criteria</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-blue-400 font-medium">2</span>
                </div>
                <div>
                  <p className="text-white/70">Smart contracts automatically trigger resolution based on oracle data</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-blue-400 font-medium">3</span>
                </div>
                <div>
                  <p className="text-white/70">Multi-oracle verification ensures accurate and tamper-proof outcomes</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-blue-400 font-medium">4</span>
                </div>
                <div>
                  <p className="text-white/70">Winnings are automatically distributed to prediction holders</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 border border-white/10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="md:w-1/2">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Stay Updated</h2>
                <p className="text-sm md:text-base text-white/70 mb-2">
                  Get the latest updates on market trends, new features, and trading opportunities.
                </p>
                <p className="text-xs md:text-sm text-white/50">
                  We'll never spam you or share your email with third parties.
                </p>
              </div>
              <div className="md:w-1/2 w-full">
                <form className="space-y-3 md:space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="Your email address" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <div className="flex-1">
                      <select 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      >
                        <option value="" className="bg-gray-800">Interest</option>
                        <option value="trading" className="bg-gray-800">Trading</option>
                        <option value="market_creation" className="bg-gray-800">Market Creation</option>
                        <option value="technology" className="bg-gray-800">Technology</option>
                        <option value="governance" className="bg-gray-800">Governance</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 text-sm md:text-base"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Join thousands of traders who are already predicting the future of crypto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20">
              Create Account
            </Button>
            <Button className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300">
              Learn More
            </Button>
              </div>
            </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 
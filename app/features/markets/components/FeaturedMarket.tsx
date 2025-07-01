"use client";

import React, { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import type { Market } from '@/_shared/types/market';
import { getMarketSlug } from '@/data/markets';

interface FeaturedMarketProps {
  market: Market;
  isLoading?: boolean;
}

// Deterministic random number generator using market ID as seed
const seededRandom = (seed: string, index: number): number => {
  const hash = seed.split('').reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
  }, 0);
  const x = Math.sin(hash + index) * 10000;
  return x - Math.floor(x);
};

// Lightweight chart component (CSS-only, no heavy libraries)
const LightweightChart = memo(({ market }: { market: Market }) => {
  const [isClient, setIsClient] = useState(false);

  // Only render on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate deterministic trend data using market ID as seed
  const trendData = React.useMemo(() => {
    if (!isClient) return Array(20).fill(0.5); // Static data for SSR
    
    const points = 20;
    const data = [];
    let baseValue = market.outcomes[0]?.probability || 0.5;
    
    for (let i = 0; i < points; i++) {
      // Use deterministic random based on market ID + index
      const randomValue = seededRandom(market.id, i);
      const variance = (randomValue - 0.5) * 0.1;
      baseValue = Math.max(0.1, Math.min(0.9, baseValue + variance));
      data.push(baseValue);
    }
    return data;
  }, [market.id, market.outcomes, isClient]);

  const maxValue = Math.max(...trendData);
  const minValue = Math.min(...trendData);
  const range = Math.max(maxValue - minValue, 0.1); // Prevent division by zero

  // Chart dimensions for viewBox
  const chartWidth = 300;
  const chartHeight = 200;
  const padding = 20;

  if (!isClient) {
    // Show static chart during SSR
    return (
      <div className="relative h-full bg-black/20 rounded overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-4 grid-rows-4 h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-green-500/20"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-2 left-2 text-xs font-mono text-green-400">
          <div className="bg-black/60 px-2 py-1 rounded">
            {'>'} LOADING_CHART...
          </div>
        </div>
      </div>
    );
  }

  // Generate the path data for the line chart
  const linePoints = trendData.map((value, index) => {
    const x = padding + (index / (trendData.length - 1)) * (chartWidth - 2 * padding);
    const y = padding + (1 - (value - minValue) / range) * (chartHeight - 2 * padding);
    return { x, y };
  });

  // Create the line path
  const linePath = linePoints.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x},${point.y}`;
    }
    return `${path} L ${point.x},${point.y}`;
  }, '');

  // Create the area path (fill under the line)
  const areaPath = linePoints.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x},${chartHeight - padding} L ${point.x},${point.y}`;
    }
    return `${path} L ${point.x},${point.y}`;
  }, '') + ` L ${linePoints[linePoints.length - 1].x},${chartHeight - padding} Z`;

  return (
    <div className="relative h-full bg-black/20 rounded overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-4 grid-rows-4 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-green-500/20"></div>
          ))}
        </div>
      </div>
      
      {/* Responsive SVG Chart */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`chartGradient-${market.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Area under line */}
        <path
          d={areaPath}
          fill={`url(#chartGradient-${market.id})`}
          className="animate-pulse"
        />
        
        {/* Line */}
        <path
          d={linePath}
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          className="drop-shadow-lg"
        />
        
        {/* Animated dot at end */}
        <circle
          cx={linePoints[linePoints.length - 1].x}
          cy={linePoints[linePoints.length - 1].y}
          r="4"
          fill="#10B981"
          className="animate-pulse"
        />
      </svg>
      
      {/* Chart Info Overlay */}
      <div className="absolute bottom-2 left-2 text-xs font-mono text-green-400">
        <div className="bg-black/60 px-2 py-1 rounded">
          {'>'} TREND: {((trendData[trendData.length - 1] - trendData[0]) * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
});

LightweightChart.displayName = 'LightweightChart';

// Get default image based on category (memoized)
const getDefaultImage = (category: string) => {
  const categoryImages: Record<string, string> = {
    crypto: '/images/bitcoin.svg',
    politics: '/images/election.svg',
    sports: '/images/sports.svg',
    finance: '/images/placeholder.svg',
    technology: '/images/ethereum.svg',
    entertainment: '/images/placeholder.svg',
    science: '/images/placeholder.svg',
    other: '/images/placeholder.svg'
  };
  return categoryImages[category] || '/images/placeholder.svg';
};

// Format functions (memoized)
const formatVolume = (volume: number) => {
  if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
  if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
  return `$${volume.toFixed(2)}`;
};

const formatTimeRemaining = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  const timeRemaining = end.getTime() - now.getTime();
  
  if (timeRemaining <= 0) return 'EXPIRED';
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d_${hours}h`;
  
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h_${minutes}m`;
};

const getCategoryColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    crypto: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
    politics: 'bg-purple-500/20 text-purple-400 border-purple-400/30',
    sports: 'bg-green-500/20 text-green-400 border-green-400/30',
    finance: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
    technology: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30',
    entertainment: 'bg-pink-500/20 text-pink-400 border-pink-400/30',
    science: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30',
    other: 'bg-gray-500/20 text-gray-400 border-gray-400/30'
  };
  return categoryColors[category] || 'bg-blue-500/20 text-blue-400 border-blue-400/30';
};

const FeaturedMarket = memo(({ market, isLoading = false }: FeaturedMarketProps) => {
  // Memoize expensive calculations
  const memoizedData = React.useMemo(() => ({
    volume: formatVolume(market.totalVolume),
    liquidity: formatVolume(market.liquidity),
    timeRemaining: formatTimeRemaining(market.endDate),
    categoryColor: getCategoryColor(market.category),
    tradersCount: Math.floor(market.totalVolume / 100),
    defaultImage: getDefaultImage(market.category)
  }), [market]);

  // Loading state
  if (isLoading) {
    return (
      <div className="terminal-card h-[400px] animate-pulse">
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
          <div className="w-20 h-3 bg-green-500/20 rounded"></div>
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-2"></div>
            <span className="text-green-400 font-mono text-sm">LOADING_FEATURED.EXE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-card hover:border-green-500/50 transition-all duration-200 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 border-b border-green-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="terminal-text text-xs">featured_market.exe</div>
      </div>
      
      <div className="flex flex-col lg:flex-row min-h-[400px]">
        
        {/* Lightweight Chart Section */}
        <div className="w-full lg:w-[60%] bg-black/20 p-4 lg:border-r border-green-500/20 order-2 lg:order-1">
          <div className="h-full flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base lg:text-lg font-semibold text-green-400 font-mono">
                {'>'} LIVE_TREND.PY
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  24h: {formatVolume(market.totalVolume * 0.15)}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline text-green-400">STREAMING</span>
              </div>
            </div>
            <div className="flex-1 min-h-[200px]">
              <LightweightChart market={market} />
            </div>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="w-full lg:w-[40%] flex flex-col order-1 lg:order-2">
          
          {/* Market Image */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={market.imageUrl || memoizedData.defaultImage}
              alt={market.title}
              width={400}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs font-mono rounded border ${memoizedData.categoryColor}`}>
                {market.category.toUpperCase()}.CAT
              </span>
            </div>
            
            {/* Time Remaining */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-mono rounded bg-black/70 text-green-400 border border-green-500/30 flex items-center gap-1">
                ⏱️ {memoizedData.timeRemaining}
              </span>
            </div>
            
            {/* Volume Display */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/80 rounded px-2 py-1 border border-green-500/30">
                <div className="text-green-400 text-xs font-mono">
                  {'>'} volume: <span className="text-white">{memoizedData.volume}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Details */}
          <div className="flex-1 p-4 bg-black/10">
            <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight font-mono">
              {market.title}
            </h2>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed font-mono">
              {'>'} {market.description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-black/30 rounded p-2 border border-green-500/20">
                <div className="text-gray-400 text-xs font-mono">liquidity:</div>
                <div className="text-green-400 font-semibold text-sm font-mono">
                  {memoizedData.liquidity}
                </div>
              </div>
              <div className="bg-black/30 rounded p-2 border border-green-500/20">
                <div className="text-gray-400 text-xs font-mono">traders:</div>
                <div className="text-green-400 font-semibold text-sm font-mono">
                  {memoizedData.tradersCount}
                </div>
              </div>
            </div>
            
            {/* Betting Options */}
            <div className="space-y-1.5 mb-4">
              {market.outcomes.slice(0, 2).map((outcome) => (
                <Link 
                  key={outcome.id} 
                  href={`/markets/${getMarketSlug(market)}?outcome=${outcome.id}`}
                  className="block w-full relative overflow-hidden group flex items-center justify-between py-2 px-3 rounded border border-green-500/30 hover:border-green-500/50 bg-black/20 hover:bg-green-500/10 transition-all duration-150"
                >
                  <span className="text-sm text-white font-mono relative z-10">
                    {'>'} {outcome.label}
                  </span>
                  <span className="bg-green-500/20 px-2 py-0.5 rounded text-xs font-bold text-green-400 relative z-10 font-mono border border-green-500/30">
                    {(outcome.probability * 100).toFixed(0)}%
                  </span>
                </Link>
              ))}
              
              {market.outcomes.length > 2 && (
                <div className="text-center text-xs text-gray-400 pt-1 font-mono">
                  {'>'} +{market.outcomes.length - 2} more_options.sh
                </div>
              )}
            </div>
            
            {/* View Market Button */}
            <Link 
              href={`/markets/${getMarketSlug(market)}`}
              className="block w-full btn-degen font-mono text-black py-2 group relative overflow-hidden text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                VIEW_MARKET.EXE
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

FeaturedMarket.displayName = 'FeaturedMarket';

export { FeaturedMarket }; 

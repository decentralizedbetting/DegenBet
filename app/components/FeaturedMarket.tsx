"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { MultiOutcomeChart } from '@/components/trading/MultiOutcomeChart';
import { IconArrowRight, IconUsers, IconClock, IconTrendingUp } from '@tabler/icons-react';
import type { Market } from '@/types/market';
import { getMarketSlug } from '@/data/markets';
import { CalendarIcon, UsersIcon, ArrowTrendingUpIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/containers';

interface FeaturedMarketProps {
  market: Market;
  isLoading?: boolean;
}

// Get default image based on category
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

export function FeaturedMarket({ market, isLoading = false }: FeaturedMarketProps) {
  if (isLoading) {
    return (
      <div className="terminal-card h-[400px] animate-pulse">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-2"></div>
            <span className="text-green-400 font-mono text-sm">Loading featured market...</span>
          </div>
        </div>
      </div>
    );
  }

  // Format volume
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(2)}`;
  };

  // Format time remaining
  const formatTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(market.endDate);
    const timeRemaining = endDate.getTime() - now.getTime();
    
    if (timeRemaining <= 0) return 'EXPIRED';
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d_${hours}h`;
    } else {
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h_${minutes}m`;
    }
  };

  // Handle category color
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
        
        {/* Chart Section - Responsive layout */}
        <div className="w-full lg:w-[60%] bg-black/20 p-4 lg:border-r border-green-500/20 order-2 lg:order-1">
          <div className="h-full flex flex-col min-h-[200px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base lg:text-lg font-semibold text-green-400 font-mono">{'>'} LIVE_CHART.PY</h3>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  24h: {formatVolume(market.totalVolume * 0.15)}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline text-green-400">STREAMING</span>
              </div>
            </div>
            <div className="flex-1 min-h-0 bg-black/30 rounded border border-green-500/20">
              <MultiOutcomeChart 
                market={market} 
                timeframe="1D"
              />
            </div>
          </div>
        </div>
        
        {/* Sidebar - Responsive layout */}
        <div className="w-full lg:w-[40%] flex flex-col order-1 lg:order-2">
          
          {/* Image Section */}
          <div className="relative h-40 overflow-hidden">
            <Image
              src={market.imageUrl || getDefaultImage(market.category)}
              alt={market.title}
              width={400}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Terminal Status Overlays */}
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 text-xs font-mono rounded border ${getCategoryColor(market.category)}`}>
                {market.category.toUpperCase()}.CAT
              </span>
            </div>
            
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-mono rounded bg-black/70 text-green-400 border border-green-500/30 flex items-center gap-1">
                ⏱️ {formatTimeRemaining()}
              </span>
            </div>
            
            {/* Volume Terminal Display */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/80 rounded px-2 py-1 border border-green-500/30">
                <div className="text-green-400 text-xs font-mono">{'>'} volume: <span className="text-white">{formatVolume(market.totalVolume)}</span></div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 p-4 bg-black/10">
            <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight font-mono">
              {market.title}
            </h2>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed font-mono">
              {'>'} {market.description}
            </p>
            
            {/* Terminal stats grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-black/30 rounded p-2 border border-green-500/20">
                <div className="text-gray-400 text-xs font-mono">liquidity:</div>
                <div className="text-green-400 font-semibold text-sm font-mono">{formatVolume(market.liquidity)}</div>
              </div>
              <div className="bg-black/30 rounded p-2 border border-green-500/20">
                <div className="text-gray-400 text-xs font-mono">traders:</div>
                <div className="text-green-400 font-semibold text-sm font-mono">{Math.floor(market.totalVolume / 100)}</div>
              </div>
            </div>
            
            {/* Terminal betting options */}
            <div className="space-y-1.5">
              {market.outcomes.slice(0, 2).map((outcome) => (
                <Link 
                  key={outcome.id} 
                  href={`/markets/${getMarketSlug(market)}?outcome=${outcome.id}`}
                  className="block w-full relative overflow-hidden group flex items-center justify-between py-2 px-3 rounded border border-green-500/30 hover:border-green-500/50 bg-black/20 hover:bg-green-500/10 transition-all duration-150"
                >
                  <div className="absolute inset-0 bg-green-500/5 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-150"></div>
                  <span className="text-sm text-white font-mono relative z-10">{'>'} {outcome.label}</span>
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
            
            {/* Terminal view button */}
            <div className="mt-4">
              <Link 
                href={`/markets/${getMarketSlug(market)}`}
                className="block w-full btn-degen font-mono text-black py-2 group relative overflow-hidden text-center"
              >
                <span className="relative z-10">VIEW_MARKET.EXE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
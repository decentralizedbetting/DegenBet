"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from './ui/containers';
import { Button } from './ui/Button';
import { MultiOutcomeChart } from './trading/MultiOutcomeChart';
import { IconArrowRight, IconChartBar, IconUsers } from '@tabler/icons-react';
import type { Market } from '../types/market';
import { getMarketSlug } from '../data/markets';

interface FeaturedMarketProps {
  market: Market;
  isLoading?: boolean;
}

export function FeaturedMarket({ market, isLoading = false }: FeaturedMarketProps) {
  if (isLoading) {
    return (
      <div className="bg-black/50 backdrop-blur-sm border border-teal-900/20 rounded-xl h-[400px] animate-pulse">
        <div className="h-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
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
    
    // If market has ended
    if (timeRemaining <= 0) {
      return 'Ended';
    }
    
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    }
  };

  // Handle category color
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      crypto: 'bg-blue-500/20 text-blue-400 border-blue-400/20',
      politics: 'bg-purple-500/20 text-purple-400 border-purple-400/20',
      sports: 'bg-green-500/20 text-green-400 border-green-400/20',
      finance: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/20',
      technology: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/20',
      entertainment: 'bg-pink-500/20 text-pink-400 border-pink-400/20',
      science: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/20',
      other: 'bg-gray-500/20 text-gray-400 border-gray-400/20'
    };
    return categoryColors[category] || 'bg-teal-500/20 text-teal-400 border-teal-400/20';
  };

  return (
    <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-teal-900/30 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
        {/* Left section - Market info */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(market.category)}`}>
                {market.category}
              </div>
              <div className="text-gray-400 text-sm flex items-center">
                <IconUsers size={16} className="mr-1" />
                <span>{Math.floor(market.totalVolume / 100)} traders</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{market.title}</h2>
            <p className="text-gray-300 mb-6 line-clamp-3">{market.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Volume</div>
                <div className="text-white font-medium">{formatVolume(market.totalVolume)}</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Ends In</div>
                <div className="text-white font-medium">{formatTimeRemaining()}</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Creator</div>
                <div className="text-white font-medium truncate">{market.creator.username}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {market.outcomes.map((outcome) => (
              <Link 
                key={outcome.id} 
                href={`/markets/${getMarketSlug(market)}?outcome=${outcome.id}`}
                className="flex-1 min-w-[120px]"
              >
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full relative overflow-hidden group flex items-center justify-between gap-2"
                >
                  <div className="absolute inset-0 bg-teal-500/10 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                  <span className="text-sm truncate relative z-10">{outcome.label}</span>
                  <span className="bg-black/20 px-2 py-0.5 rounded-sm text-xs relative z-10">
                    {(outcome.probability * 100).toFixed(0)}%
                  </span>
                </Button>
              </Link>
            ))}
            
            <Link href={`/markets/${getMarketSlug(market)}`} className="w-full mt-2">
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
              >
                <IconChartBar size={18} />
                <span>View Full Market</span>
                <IconArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Right section - Chart */}
        <div className="lg:col-span-3 bg-black/20 rounded-xl p-4">
          <div className="mb-2 font-medium text-white">Market Probabilities</div>
          <MultiOutcomeChart 
            market={market} 
            timeframe="1D"
          />
        </div>
      </div>
    </div>
  );
} 
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, UsersIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Market } from '@/types/market';
import { getMarketSlug } from '@/data/markets';

interface MarketCardProps {
  market: Market;
  isCompact?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: (market: Market) => void;
}

const formatVolume = (volume: number) => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  }
  if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  }
  return `$${volume.toFixed(2)}`;
};

const formatProbability = (probability: number) => {
  return `${(probability * 100).toFixed(0)}%`;
};

const getDaysUntilEnd = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to get default image based on category
const getDefaultImage = (category: string) => {
  const categoryImages: Record<string, string> = {
    crypto: '/images/bitcoin.svg',
    politics: '/images/election.svg',
    sports: '/images/sports.svg',
    finance: '/images/placeholder.svg',
    technology: '/images/placeholder.svg',
    entertainment: '/images/placeholder.svg',
    science: '/images/placeholder.svg',
    other: '/images/placeholder.svg'
  };
  return categoryImages[category] || '/images/placeholder.svg';
};

export function MarketCard({ market, isCompact = false, isLoading = false, className = '', onClick }: MarketCardProps) {
  // Calculate the highest probability outcome for binary markets
  const mainProbability = market.outcomes?.reduce((max, outcome) => 
    Math.max(max, outcome.probability), 0) ?? 0;
    
  // Format days remaining with appropriate text
  const daysRemaining = getDaysUntilEnd(market.endDate);
  const timeRemainingText = daysRemaining > 0 
    ? `${daysRemaining}d` 
    : 'Ending';
    
  // Handle category display with terminal degen color coding
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      crypto: 'bg-green-500/20 text-green-400 border-green-500/30',
      politics: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      sports: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      finance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      technology: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      entertainment: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      science: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      other: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return categoryColors[category] || 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  // Loading skeleton with terminal style
  if (isLoading) {
    return (
      <div className={`terminal-card animate-pulse ${className}`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
          <div className="w-16 h-3 bg-green-500/20 rounded"></div>
        </div>
        <div className="p-4">
          <div className="h-4 bg-green-500/20 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-green-500/20 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-green-500/20 rounded"></div>
            <div className="h-8 bg-green-500/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Card content wrapper based on whether it's clickable or should link to a detail page
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (onClick) {
      return (
        <div 
          className={`cursor-pointer ${className}`}
          onClick={() => onClick(market)}
          onKeyDown={(e) => e.key === 'Enter' && onClick(market)}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      );
    }
    
    return (
      <Link href={`/markets/${getMarketSlug(market)}`} className={className}>
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <div 
        className={`terminal-card h-full overflow-hidden group hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 mouse-glow hover-zone ${
          onClick || !isCompact ? 'hover:bg-terminal' : ''
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs">
            market_{market.id.slice(0, 6)}.exe
          </div>
        </div>

        {/* Market Preview Image */}
        <div className="relative h-20 w-full overflow-hidden bg-terminal-light">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black/50 to-purple-900/30" />
          <Image
            src={market.imageUrl || getDefaultImage(market.category)}
            alt={market.title}
            width={400}
            height={80}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            unoptimized
          />
          
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded border backdrop-blur-sm ${getCategoryColor(market.category)}`}>
              {market.category.toUpperCase()}
            </span>
          </div>
          
          {/* Status indicator */}
          <div className="absolute top-2 right-2 flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-green-400 backdrop-blur-sm bg-terminal px-1 rounded">
              LIVE
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 leading-tight group-hover:text-green-400 transition-colors">
            {market.title}
          </h3>
          
          {/* Terminal-style Stats */}
          <div className="grid grid-cols-2 gap-3 mb-3 text-xs font-mono">
            <div>
              <span className="text-gray-500">VOL:</span>
              <span className="text-green-400 font-bold ml-1">{formatVolume(market.totalVolume ?? 0)}</span>
            </div>
            <div>
              <span className="text-gray-500">USERS:</span>
              <span className="text-purple-400 font-bold ml-1">{Math.floor((market.totalVolume ?? 0) / 100)}</span>
            </div>
          </div>

          {/* Terminal-style Betting Options */}
          <div className="space-y-1.5">
            {market.outcomes.slice(0, 2).map((outcome, index) => (
              <div
                key={outcome.id}
                className="relative overflow-hidden rounded bg-terminal-glass border-terminal-light hover:border-green-400/40 transition-colors group/btn terminal-interactive"
              >
                <div className="flex items-center justify-between p-2">
                  <span className="text-xs text-green-300 font-mono truncate">
                    {'>'} {outcome.label}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-mono font-bold ${
                      outcome.probability > 0.5 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatProbability(outcome.probability)}
                    </span>
                    <div className="w-8 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          outcome.probability > 0.5 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${outcome.probability * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {market.outcomes.length > 2 && (
              <div className="text-center text-xs text-gray-500 pt-1 font-mono">
                +{market.outcomes.length - 2} more_options.exe
              </div>
            )}
          </div>

          {/* Terminal footer */}
          <div className="mt-3 pt-2 border-t border-green-500/20 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-500">
              EXPIRES: {timeRemainingText}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-green-400">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
} 
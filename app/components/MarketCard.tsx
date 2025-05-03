"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import type { Market } from '../types/market';
import { getMarketSlug } from '../data/markets';

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
  return `${(probability * 100).toFixed(1)}%`;
};

const getDaysUntilEnd = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function MarketCard({ market, isCompact = false, isLoading = false, className = '', onClick }: MarketCardProps) {
  // Calculate the highest probability outcome for binary markets
  const mainProbability = market.outcomes?.reduce((max, outcome) => 
    Math.max(max, outcome.probability), 0) ?? 0;
    
  // Format days remaining with appropriate text
  const daysRemaining = getDaysUntilEnd(market.endDate);
  const timeRemainingText = daysRemaining > 0 
    ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}` 
    : 'Ending today';
    
  // Handle category display with color coding
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      crypto: 'bg-blue-500/20 text-blue-300',
      politics: 'bg-purple-500/20 text-purple-300',
      sports: 'bg-green-500/20 text-green-300',
      finance: 'bg-yellow-500/20 text-yellow-300',
      technology: 'bg-cyan-500/20 text-cyan-300',
      entertainment: 'bg-pink-500/20 text-pink-300',
      science: 'bg-emerald-500/20 text-emerald-300',
      other: 'bg-gray-500/20 text-gray-300'
    };
    return categoryColors[category] || 'bg-white/10 text-white/60';
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-500/20 text-green-300',
      resolved: 'bg-blue-500/20 text-blue-300',
      cancelled: 'bg-red-500/20 text-red-300',
      pending: 'bg-yellow-500/20 text-yellow-300'
    };
    return statusColors[status] || 'bg-white/10 text-white/60';
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <Card className={`bg-black/50 backdrop-blur-sm border-white/10 animate-pulse ${className}`}>
        <CardHeader>
          <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3 bg-white/10 rounded w-1/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="h-10 bg-white/10 rounded w-full"></div>
        </CardFooter>
      </Card>
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

  // Function to limit number of outcomes shown
  const getDisplayOutcomes = () => {
    // Show all outcomes directly if there are 2 or less (binary markets)
    if (market.outcomes.length <= 2) {
      return market.outcomes;
    }
    
    // For multi-outcome markets, return all outcomes for new UI
    return market.outcomes;
  };

  return (
    <CardWrapper>
      <Card 
        className={`bg-black/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors h-full ${
          onClick || !isCompact ? 'hover:bg-black/60' : ''
        }`}
      >
        <CardHeader className={isCompact ? 'p-4' : undefined}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-white ${isCompact ? 'text-lg' : 'text-xl'}`}>
                {market.title}
              </CardTitle>
              {!isCompact && (
                <CardDescription className="text-white/60 mt-1 line-clamp-2">
                  {market.description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(market.category)}`}>
              {market.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(market.status)}`}>
              {market.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className={isCompact ? 'p-4 pt-0' : undefined}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Volume</span>
              <span className="text-white font-medium">
                {formatVolume(market.totalVolume ?? 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Probability</span>
              <span className="text-white font-medium">
                {formatProbability(mainProbability)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Ends in</span>
              <span className="text-white font-medium">
                {timeRemainingText}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className={isCompact ? 'p-4' : undefined}>
          {/* Binary Markets (2 or fewer options) */}
          {market.outcomes.length <= 2 ? (
            <div className="grid grid-cols-2 gap-2 w-full">
              {getDisplayOutcomes().map((outcome) => (
                <Button
                  key={outcome.id}
                  variant="secondary"
                  size="sm"
                  className="relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-teal-500/10 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                  <div className="flex items-center justify-between w-full z-10 relative">
                    <span className="text-sm truncate">{outcome.label}</span>
                    <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded">
                      {(outcome.probability * 100).toFixed(0)}%
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            /* Multi-outcome Markets (3 or more options) */
            <div className="w-full">
              {/* Progress bar visualization */}
              <div className="h-4 w-full bg-gray-800 rounded-full mb-3 flex overflow-hidden">
                {getDisplayOutcomes().map((outcome, index) => {
                  // Get colors for each segment
                  const colors = [
                    'bg-teal-500', 'bg-blue-500', 'bg-purple-500', 
                    'bg-amber-500', 'bg-rose-500', 'bg-cyan-500',
                    'bg-lime-500', 'bg-pink-500'
                  ];
                  const color = colors[index % colors.length];
                  
                  return (
                    <div 
                      key={outcome.id}
                      className={`${color} h-full relative group`}
                      style={{ width: `${outcome.probability * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                  );
                })}
              </div>
              
              {/* Top options list with improved layout */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {getDisplayOutcomes().map((outcome, index) => {
                  // Get colors for each option label
                  const colors = [
                    'text-teal-400', 'text-blue-400', 'text-purple-400', 
                    'text-amber-400', 'text-rose-400', 'text-cyan-400',
                    'text-lime-400', 'text-pink-400'
                  ];
                  const bgColors = [
                    'bg-teal-500/10', 'bg-blue-500/10', 'bg-purple-500/10', 
                    'bg-amber-500/10', 'bg-rose-500/10', 'bg-cyan-500/10',
                    'bg-lime-500/10', 'bg-pink-500/10'
                  ];
                  const color = colors[index % colors.length];
                  const bgColor = bgColors[index % bgColors.length];
                  
                  return (
                    <div key={outcome.id} className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${color.replace('text', 'bg')} mr-1.5`}></div>
                        <span className="text-sm text-white truncate">{outcome.label}</span>
                      </div>
                      <span className={`text-xs font-medium ${color} ${bgColor} px-1.5 py-0.5 rounded group-hover:scale-110 transition-transform`}>
                        {(outcome.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </CardWrapper>
  );
} 
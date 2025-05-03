import React, { useState } from 'react';
import { MarketCard } from './MarketCard';
import type { Market, MarketCategory } from '../types/market';
import { Button } from './ui/Button';

interface MarketsGridProps {
  markets: Market[];
  title: string;
  description?: string;
  isLoading?: boolean;
  showFilters?: boolean;
  limit?: number;
  onViewMore?: () => void;
}

export function MarketsGrid({ 
  markets, 
  title, 
  description, 
  isLoading = false,
  showFilters = false,
  limit,
  onViewMore 
}: MarketsGridProps) {
  const [activeFilter, setActiveFilter] = useState<MarketCategory | 'all'>('all');
  const [displayCount, setDisplayCount] = useState<number>(limit || 6);

  // Filter markets based on selected category
  const filteredMarkets = activeFilter === 'all' 
    ? markets 
    : markets.filter(market => market.category === activeFilter);

  // Limit number of markets to display
  const displayedMarkets = filteredMarkets.slice(0, displayCount);

  // Available categories from the markets data
  const categories = ['all', ...Array.from(new Set(markets.map(market => market.category)))];

  const loadMore = () => {
    if (onViewMore) {
      onViewMore();
    } else {
      setDisplayCount(prev => prev + 6);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div className={`${showFilters ? 'mb-6 md:mb-0' : 'text-center md:text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">{title}</h2>
            {description && (
              <p className="text-white/60 max-w-2xl">{description}</p>
            )}
          </div>
          
          {/* Category filters */}
          {showFilters && (
            <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category as MarketCategory | 'all')}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeFilter === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid layout with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white/5 rounded-xl h-80 animate-pulse"></div>
            ))
          ) : displayedMarkets.length > 0 ? (
            // Market cards
            displayedMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))
          ) : (
            // Empty state
            <div className="col-span-full py-12 text-center">
              <p className="text-white/60 mb-4">No markets found matching your criteria</p>
              {activeFilter !== 'all' && (
                <Button 
                  variant="secondary" 
                  onClick={() => setActiveFilter('all')}
                >
                  View All Markets
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Load more button */}
        {!isLoading && filteredMarkets.length > displayCount && (
          <div className="mt-10 text-center">
            <Button variant="secondary" onClick={loadMore}>
              Load More Markets
            </Button>
          </div>
        )}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
} 
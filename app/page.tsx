"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/_shared/components/ui/Button';
import { sampleMarkets, getMarketSlug } from '@/data/markets';
import Footer from '@/_shared/components/layout/Footer';
import { MarketCard } from '@/features/markets/components/MarketCard';
import { FeaturedMarket } from '@/features/markets/components/FeaturedMarket';
import { DegenHero2025 } from '@/_shared/components/DegenHero2025';
import { ArrowRightIcon, ChartBarIcon, ShieldCheckIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { Market } from '@/_shared/types/market';

// Market categories with associated styling (restored full list)
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

// Core value propositions
const valueProps = [
  {
    title: 'Decentralized & Secure',
    description: 'Built on blockchain with no central authority. Your predictions, your control.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Real-Time Markets',
    description: 'Trade on live events with instant execution and transparent pricing.',
    icon: ChartBarIcon,
  },
  {
    title: 'Community Driven',
    description: 'Join thousands of traders in a transparent, community-governed platform.',
    icon: UsersIcon,
  }
];

// Shuffle function for randomizing markets
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Use the actual market data
const currentMarkets: Market[] = sampleMarkets;

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shuffledMarkets, setShuffledMarkets] = useState<Market[]>([]);

  // Initialize shuffled markets on component mount
  useEffect(() => {
    setShuffledMarkets(shuffleArray(currentMarkets));
  }, []);

  // Memoize expensive market filtering operations with shuffled markets
  const { featuredMarkets, regularMarkets } = useMemo(() => {
    const featured = shuffledMarkets.filter(market => market.featured);
    const regular = shuffledMarkets.filter(market => !market.featured);
    return { featuredMarkets: featured, regularMarkets: regular };
  }, [shuffledMarkets]);

  // Memoize filtered markets to prevent recalculation on every render
  const { filteredFeaturedMarkets, filteredRegularMarkets } = useMemo(() => {
    const filterMarkets = (markets: Market[]) => {
      if (selectedCategory === 'all') return markets;
      return markets.filter(market => market.category === selectedCategory);
    };
    
    return {
      filteredFeaturedMarkets: filterMarkets(featuredMarkets),
      filteredRegularMarkets: filterMarkets(regularMarkets)
    };
  }, [featuredMarkets, regularMarkets, selectedCategory]);

  // Optimize auto-slide with useCallback and reduced frequency
  useEffect(() => {
    if (filteredFeaturedMarkets.length <= 1) return; // No sliding needed
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredFeaturedMarkets.length);
    }, 8000); // Increased to 8 seconds for better performance
    
    return () => clearInterval(slideInterval);
  }, [filteredFeaturedMarkets.length]);

  // Memoize event handlers
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentSlide(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, filteredFeaturedMarkets.length));
  }, [filteredFeaturedMarkets.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + filteredFeaturedMarkets.length) % Math.max(1, filteredFeaturedMarkets.length));
  }, [filteredFeaturedMarkets.length]);

  // Function to reshuffle markets
  const reshuffleMarkets = useCallback(() => {
    setShuffledMarkets(shuffleArray(currentMarkets));
    setCurrentSlide(0);
  }, []);

  return (
    <div className="text-white">
      {/* Terminal Market Ticker */}
      <div className="w-full bg-terminal border-y border-terminal py-6 overflow-hidden relative">
        <div className="container mx-auto px-4">
          {/* Terminal Category Filters */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
              <button 
                onClick={() => handleCategorySelect('all')}
                className={`px-3 py-1.5 text-sm font-mono font-bold uppercase tracking-wider rounded transition-all duration-200 ${
                  selectedCategory === 'all' 
                    ? 'btn-degen text-black' 
                    : 'btn-degen-secondary text-green-400'
                }`}
              >
                ALL_MARKETS.EXE
              </button>
              {marketCategories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-3 py-1.5 text-sm font-mono font-bold uppercase tracking-wider rounded transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? 'btn-degen text-black' 
                      : 'btn-degen-secondary text-green-400'
                  }`}
                >
                  {category.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Terminal Market Feed */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee hover:pause-marquee">
              {/* Limit to first 8 markets for performance */}
              {filteredFeaturedMarkets.slice(0, 8).map((market, index) => {
                return (
                  <Link 
                    href={`/markets/${getMarketSlug(market)}`}
                    key={market.id} 
                    className="flex items-center space-x-3 terminal-card border border-green-500/30 hover:border-green-500/50 px-4 py-3 transition-all duration-200 min-w-max mx-2"
                  >
                    <div className="px-2 py-1 text-xs font-mono font-bold bg-green-500/20 text-green-400 border border-green-500/30 rounded">
                      LIVE
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-white font-mono mr-2">{market.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${market.outcomes[1].probability > 0.5 ? 'profit-text bg-green-500/20' : 'loss-text bg-red-500/20'}`}>
                        {(market.outcomes[1].probability * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      VOL: ${(market.totalVolume / 1000).toFixed(1)}K
                    </div>
                  </Link>
                );
              })}
              {/* Single duplication for seamless loop */}
              {filteredFeaturedMarkets.slice(0, 8).map((market, index) => {
                return (
                  <Link 
                    href={`/markets/${getMarketSlug(market)}`}
                    key={`dup-${market.id}`} 
                    className="flex items-center space-x-3 terminal-card border border-green-500/30 hover:border-green-500/50 px-4 py-3 transition-all duration-200 min-w-max mx-2"
                  >
                    <div className="px-2 py-1 text-xs font-mono font-bold bg-green-500/20 text-green-400 border border-green-500/30 rounded">
                      LIVE
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-white font-mono mr-2">{market.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${market.outcomes[1].probability > 0.5 ? 'profit-text bg-green-500/20' : 'loss-text bg-red-500/20'}`}>
                        {(market.outcomes[1].probability * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      VOL: ${(market.totalVolume / 1000).toFixed(1)}K
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Terminal gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* New 2025 Degen Hero Section */}
      <DegenHero2025 />

      {/* Terminal Live Markets */}
      <section className="py-20 px-6 bg-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 font-mono">
              <span className="text-green-400">{'>'}</span> LIVE_MARKETS.EXE
            </h2>
            <p className="text-green-300 max-w-2xl mx-auto text-lg leading-relaxed font-mono">
              {'>'} Scanning real-time prediction markets across all protocols...
              <br />
              {'>'} Trade on live events with diamond hands precision
            </p>
          </div>

          {/* Terminal Featured Markets */}
          {filteredFeaturedMarkets.length > 0 && (
            <div className="mb-20">
              {/* Terminal header with navigation */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white font-mono">
                  <span className="text-green-400">{'>'}</span> FEATURED_MARKETS.SH
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={reshuffleMarkets}
                    className="btn-degen-secondary font-mono text-sm"
                  >
                    SHUFFLE.EXE
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      disabled={filteredFeaturedMarkets.length <= 1}
                      className="p-3 rounded bg-terminal border-terminal text-green-400 hover:bg-green-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 terminal-interactive"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      disabled={filteredFeaturedMarkets.length <= 1}
                      className="p-3 rounded bg-terminal border-terminal text-green-400 hover:bg-green-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 terminal-interactive"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {filteredFeaturedMarkets.map((market, index) => (
                    <div key={market.id} className="w-full flex-shrink-0">
                      <FeaturedMarket market={market} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Terminal Slide Indicators */}
              {filteredFeaturedMarkets.length > 1 && (
                <div className="flex justify-center mt-8 space-x-3">
                  {filteredFeaturedMarkets.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded transition-all duration-200 border ${
                        index === currentSlide 
                          ? 'bg-green-500 border-green-500 scale-125 shadow-lg shadow-green-500/50' 
                          : 'bg-terminal border-terminal hover:bg-green-500/20'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Terminal All Markets Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white font-mono">
                <span className="text-green-400">{'>'}</span> ALL_MARKETS.SH
              </h3>
              <span className="text-green-400 text-sm font-mono">
                {filteredRegularMarkets.length} MARKETS_INDEXED
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRegularMarkets.slice(0, 12).map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </div>
          
          {/* Terminal No Markets Message */}
          {filteredFeaturedMarkets.length === 0 && filteredRegularMarkets.length === 0 && (
            <div className="text-center py-16">
              <div className="text-green-400 mb-6 text-lg font-mono">
                {'>'} ERROR: No markets found in selected protocol
                <br />
                {'>'} Switching to global scan...
              </div>
              <Button 
                onClick={() => handleCategorySelect('all')}
                variant="primary"
                size="lg"
                className="font-mono"
              >
                SCAN_ALL_MARKETS.EXE
              </Button>
            </div>
          )}

          {/* Terminal View All Markets CTA */}
          <div className="flex justify-center">
            <Link href="/markets">
              <Button size="lg" className="px-12 py-4 group btn-degen text-black font-mono font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105">
                <span>EXPLORE_ALL_MARKETS.EXE</span>
                <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Terminal Why DegenBet */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 font-mono">
              <span className="text-green-400">{'>'}</span> WHY_DEGENBET.SH
            </h2>
            <p className="text-green-300 max-w-3xl mx-auto text-lg leading-relaxed font-mono">
              {'>'} Built for degens, by degens
              <br />
              {'>'} Diamond hands technology meets transparent prediction markets
              <br />
              {'>'} This is the way
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="terminal-card border-terminal hover:border-green-500/50 p-8 transition-all duration-200 text-center group hover:scale-105 mouse-glow hover-zone"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/10 rounded flex items-center justify-center group-hover:scale-110 transition-transform border border-green-500/20">
                  <prop.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white font-mono">{prop.title.toUpperCase()}</h3>
                <p className="text-green-300 text-lg leading-relaxed font-mono">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      
      {/* Footer */}
      <Footer />
    </div>
  );
} 

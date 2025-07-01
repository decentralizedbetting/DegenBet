"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/_shared/components/ui/Button';
import { sampleMarkets, getMarketSlug } from '@/data/markets';
import Footer from '@/_shared/components/layout/Footer';
import { MarketCard } from '@/features/markets/components/MarketCard';
import { FeaturedMarket } from '@/features/markets/components/FeaturedMarket';
import { DegenHero2025 } from '@/_shared/components/DegenHero2025';
import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Core value propositions for "Why DegenBet" section
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

export default function HomePage() {
  // Memoize market filtering to prevent recalculation on every render
  const { featuredMarkets, regularMarkets } = useMemo(() => {
    const featured = sampleMarkets.filter(market => market.featured);
    const regular = sampleMarkets.filter(market => !market.featured);
    return { featuredMarkets: featured, regularMarkets: regular };
  }, []); // Empty dependency array since sampleMarkets is static
  
  // Featured market carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Memoize navigation handlers to prevent recreation on every render
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, featuredMarkets.length));
  }, [featuredMarkets.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featuredMarkets.length) % Math.max(1, featuredMarkets.length));
  }, [featuredMarkets.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Optimized auto-slide with proper cleanup
  useEffect(() => {
    if (featuredMarkets.length <= 1) return;
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMarkets.length);
    }, 8000);
    
    return () => clearInterval(slideInterval);
  }, [featuredMarkets.length]);

  // Memoize ticker markets to prevent recalculation
  const tickerMarkets = useMemo(() => featuredMarkets.slice(0, 6), [featuredMarkets]);

  return (
    <div className="text-white">
      {/* Terminal Market Ticker */}
      <div className="w-full bg-terminal border-y border-terminal py-4 overflow-hidden relative">
        <div className="container mx-auto px-4">
          {/* Demo Notice */}
          <div className="text-center mb-3">
            <span className="text-yellow-400/80 font-mono text-sm">
              {'>'} PREVIEW_MODE: Demo interface • Join presale for early access 🚀
            </span>
          </div>
          
          {/* Live Market Feed */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee hover:pause-marquee">
              {tickerMarkets.map((market) => (
                <Link 
                  href={`/markets/${getMarketSlug(market)}`}
                  key={market.id} 
                  className="flex items-center space-x-3 terminal-card border border-green-500/30 hover:border-green-500/50 px-4 py-2 transition-all duration-200 min-w-max mx-2"
                >
                  <div className="px-2 py-1 text-xs font-mono font-bold bg-green-500/20 text-green-400 border border-green-500/30 rounded">
                    DEMO
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-white font-mono mr-2">{market.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                      market.outcomes[1].probability > 0.5 ? 'profit-text bg-green-500/20' : 'loss-text bg-red-500/20'
                    }`}>
                      {(market.outcomes[1].probability * 100).toFixed(0)}%
                    </span>
                  </div>
                </Link>
              ))}
              {/* Duplicate for seamless loop */}
              {tickerMarkets.map((market) => (
                <Link 
                  href={`/markets/${getMarketSlug(market)}`}
                  key={`dup-${market.id}`} 
                  className="flex items-center space-x-3 terminal-card border border-green-500/30 hover:border-green-500/50 px-4 py-2 transition-all duration-200 min-w-max mx-2"
                >
                  <div className="px-2 py-1 text-xs font-mono font-bold bg-green-500/20 text-green-400 border border-green-500/30 rounded">
                    DEMO
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-white font-mono mr-2">{market.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                      market.outcomes[1].probability > 0.5 ? 'profit-text bg-green-500/20' : 'loss-text bg-red-500/20'
                    }`}>
                      {(market.outcomes[1].probability * 100).toFixed(0)}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <DegenHero2025 />

      {/* DBT Utility Grid */}
      <section className="py-16 px-6 bg-transparent border-y border-green-500/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 font-mono">
              <span className="text-green-400">{'>'}</span> POWERED_BY_DBT.EXE
            </h2>
            <p className="text-green-300 font-mono">
              {'>'} DegenBet Token utilities that power the entire ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="terminal-card border border-purple-500/30 hover:border-purple-500/50 transition-all group">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-purple-400 text-2xl">🏛️</span>
                </div>
                <h3 className="font-mono font-bold text-xs text-purple-400 mb-1">DAO_GOVERNANCE</h3>
                <p className="text-gray-400 text-xs font-mono">1 DBT = 1 Vote</p>
              </div>
            </div>

            <div className="terminal-card border border-green-500/30 hover:border-green-500/50 transition-all group">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-green-400 text-2xl">💎</span>
                </div>
                <h3 className="font-mono font-bold text-xs text-green-400 mb-1">BETTING_CURRENCY</h3>
                <p className="text-gray-400 text-xs font-mono">100% Volume</p>
              </div>
            </div>

            <div className="terminal-card border border-blue-500/30 hover:border-blue-500/50 transition-all group">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-blue-400 text-2xl">⚡</span>
                </div>
                <h3 className="font-mono font-bold text-xs text-blue-400 mb-1">VIP_STAKING</h3>
                <p className="text-gray-400 text-xs font-mono">50% APY</p>
              </div>
            </div>

            <div className="terminal-card border border-yellow-500/30 hover:border-yellow-500/50 transition-all group">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-yellow-400 text-2xl">💰</span>
                </div>
                <h3 className="font-mono font-bold text-xs text-yellow-400 mb-1">FEE_DISCOUNTS</h3>
                <p className="text-gray-400 text-xs font-mono">Up to 50%</p>
              </div>
            </div>

            <div className="terminal-card border border-orange-500/30 hover:border-orange-500/50 transition-all group">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-orange-400 text-2xl">🚀</span>
                </div>
                <h3 className="font-mono font-bold text-xs text-orange-400 mb-1">REFERRALS</h3>
                <p className="text-gray-400 text-xs font-mono">Unlimited</p>
              </div>
            </div>

            <div className="terminal-card border border-pink-500/30 hover:border-pink-500/50 transition-all group">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-pink-400 text-2xl">🏦</span>
                </div>
                <h3 className="font-mono font-bold text-xs text-pink-400 mb-1">REVENUE_SHARE</h3>
                <p className="text-gray-400 text-xs font-mono">2-5% Yield</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/token">
              <button className="btn-degen-secondary font-mono">
                {'>'} VIEW_ALL_UTILITIES.EXE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Markets Section */}
      <section className="py-20 px-6 bg-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 font-mono">
              <span className="text-green-400">{'>'}</span> DEMO_MARKETS.EXE
            </h2>
            <p className="text-green-300 max-w-2xl mx-auto text-lg leading-relaxed font-mono">
              {'>'} Preview of upcoming prediction markets interface...
              <br />
              {'>'} These are DEMO markets only - no real trading yet
              <br />
              <span className="text-orange-400 font-bold">{'>'} Join presale to trade when we launch! 🚀</span>
            </p>
          </div>

          {/* Featured Markets Section */}
          {featuredMarkets.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white font-mono">
                  <span className="text-green-400">{'>'}</span> FEATURED_MARKETS.SH
                  <span className="text-orange-400 text-sm ml-2">[PREVIEW ONLY]</span>
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      disabled={featuredMarkets.length <= 1}
                      className="p-3 rounded bg-terminal border-terminal text-green-400 hover:bg-green-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                      aria-label="Previous featured market"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      disabled={featuredMarkets.length <= 1}
                      className="p-3 rounded bg-terminal border-terminal text-green-400 hover:bg-green-500/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                      aria-label="Next featured market"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Optimized carousel with transform for better performance */}
              <div className="relative overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out will-change-transform"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredMarkets.map((market) => (
                    <div key={market.id} className="w-full flex-shrink-0">
                      <FeaturedMarket market={market} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Slide Indicators */}
              {featuredMarkets.length > 1 && (
                <div className="flex justify-center mt-8 space-x-3">
                  {featuredMarkets.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded transition-all duration-200 border ${
                        index === currentSlide 
                          ? 'bg-green-500 border-green-500 scale-125 shadow-lg shadow-green-500/50' 
                          : 'bg-terminal border-terminal hover:bg-green-500/20'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sample Markets Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white font-mono">
                <span className="text-green-400">{'>'}</span> SAMPLE_MARKETS.SH
              </h3>
              <span className="text-green-400 text-sm font-mono">
                {regularMarkets.length} MARKETS_INDEXED
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularMarkets.slice(0, 9).map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </div>

          {/* CTA to Full Markets */}
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

      {/* Why DegenBet Section */}
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
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="terminal-card border-terminal hover:border-green-500/50 p-8 transition-all duration-200 text-center group hover:scale-105"
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

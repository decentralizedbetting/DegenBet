"use client";

import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { OrderBook } from '@/features/markets/components/trading/OrderBook';
import { MarketActivity } from '@/features/markets/components/trading/MarketActivity';
import { TopHolders } from '@/features/markets/components/trading/TopHolders';
import { TradingInterface } from '@/features/markets/components/trading/TradingInterface';
import { MultiOutcomeChart } from '@/features/markets/components/trading/MultiOutcomeChart';
import Link from 'next/link';
import Image from 'next/image';
import { getMarketData } from '@/data/markets';
import { IconChartBar, IconShare, IconFlag } from '@tabler/icons-react';
import { Button } from '@/_shared/components/ui/Button';

// Chart data type
interface ChartPoint {
  time: string;
  value: number;
}

// Order type
interface Order {
  price: number;
  quantity: number;
  total: number;
  isMine?: boolean;
}

// Holder type
interface Holder {
  id: string;
  address: string;
  displayName?: string;
  position: number;
  quantity: number;
  type: 'yes' | 'no' | 'liquidity';
  isYou?: boolean;
}

// Activity type
interface ActivityItem {
  id: string;
  type: 'buy' | 'sell' | 'liquidity' | 'position';
  timestamp: string;
  price: number;
  quantity: number;
  user: {
    address: string;
    isYou?: boolean;
  };
}

// Trade details type
interface TradeDetails {
  outcome: string;
  quantity: number;
  price: number;
  slippage: number;
  orderType: 'limit' | 'market';
}

// Mock data generators
const generateChartData = (timeframe: string): ChartPoint[] => {
  // Simplified chart data generation for demonstration
  const now = new Date();
  const data: ChartPoint[] = [];
  
  // Generate points with a semi-random pattern
  let currentValue = 0.65; // Starting value
  const points = timeframe === '1H' ? 60 : 
                 timeframe === '6H' ? 180 : 
                 timeframe === '1D' ? 288 : 
                 timeframe === '1W' ? 168 : 
                 timeframe === '1M' ? 180 : 365;
  
  const volatility = timeframe === '1H' ? 0.002 : 
                    timeframe === '6H' ? 0.003 : 
                    timeframe === '1D' ? 0.005 : 
                    timeframe === '1W' ? 0.01 : 
                    timeframe === '1M' ? 0.02 : 0.04;
  
  for (let i = 0; i < points; i++) {
    const pointTime = new Date(now.getTime() - (points - i) * 60000);
    
    // Add some randomness but maintain a general trend
    const change = Math.random() * volatility * 2 - volatility;
    currentValue += change;
    
    // Keep it within reasonable bounds
    if (currentValue < 0.45) currentValue = 0.45 + Math.random() * 0.02;
    if (currentValue > 0.85) currentValue = 0.85 - Math.random() * 0.02;
    
    data.push({
      time: pointTime.toISOString(),
      value: currentValue
    });
  }
  
  return data;
};

const generateOrderBook = (): { bids: Order[]; asks: Order[] } => {
  const bids: Order[] = [];
  const asks: Order[] = [];
  
  // Current market price
  const marketPrice = 0.65;
  
  // Generate bids (buy orders)
  for (let i = 0; i < 10; i++) {
    const price = marketPrice - (i * 0.005) - (Math.random() * 0.002);
    const quantity = Math.floor(Math.random() * 1000) + 100;
    bids.push({
      price,
      quantity,
      total: price * quantity,
      isMine: i === 3 // Make one order belong to the user
    });
  }
  
  // Generate asks (sell orders)
  for (let i = 0; i < 10; i++) {
    const price = marketPrice + (i * 0.005) + (Math.random() * 0.002);
    const quantity = Math.floor(Math.random() * 1000) + 100;
    asks.push({
      price,
      quantity,
      total: price * quantity,
      isMine: i === 2 // Make one order belong to the user
    });
  }
  
  // Sort by price (bids in descending, asks in ascending)
  bids.sort((a, b) => b.price - a.price);
  asks.sort((a, b) => a.price - b.price);
  
  return { bids, asks };
};

const generateTopHolders = (): Holder[] => {
  const holders: Holder[] = [];
  
  // Generate some random holders
  const types = ['yes', 'no', 'liquidity'] as const;
  
  for (let i = 0; i < 7; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const position = Math.floor(Math.random() * 50000) + 5000;
    const quantity = Math.floor(position / 10);
    
    holders.push({
      id: `holder-${i}`,
      address: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
      position,
      quantity,
      type,
      isYou: i === 1 // Make one holder be the user
    });
  }
  
  // Sort by position value
  holders.sort((a, b) => b.position - a.position);
  
  return holders;
};

const generateActivity = (): ActivityItem[] => {
  const activities: ActivityItem[] = [];
  const types = ['buy', 'sell', 'liquidity', 'position'] as const;
  const now = new Date();
  
  // Generate some random activities over the past few days
  for (let i = 0; i < 12; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const price = 0.60 + (Math.random() * 0.1);
    const quantity = Math.floor(Math.random() * 1000) + 50;
    
    // Random time within the last 3 days
    const timestamp = new Date(now.getTime() - (Math.random() * 3 * 24 * 60 * 60 * 1000));
    
    activities.push({
      id: `activity-${i}`,
      type,
      timestamp: timestamp.toISOString(),
      price,
      quantity,
      user: {
        address: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        isYou: i === 2 || i === 7 // Make a couple activities be from the user
      }
    });
  }
  
  // Sort by timestamp, newest first
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  return activities;
};

interface MarketPageClientProps {
  marketId: string;
}

export default function MarketPageClient({ marketId }: MarketPageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [market, setMarket] = useState<any>(null);
  const [selectedOutcome, setSelectedOutcome] = useState('yes');
  const [timeframe, setTimeframe] = useState('1D');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [orderBook, setOrderBook] = useState<{ bids: Order[]; asks: Order[] }>({ bids: [], asks: [] });
  const [topHolders, setTopHolders] = useState<Holder[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [tradeSuccess, setTradeSuccess] = useState<string | null>(null);
  
  // Load market data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch real market data from the API
        const marketData = getMarketData(marketId);
        
        if (marketData) {
          setMarket(marketData);
        } else {
          console.error('Market not found');
        }
        
        // Load the other data
        setChartData(generateChartData(timeframe));
        setOrderBook(generateOrderBook());
        setActivities(generateActivity());
        setTopHolders(generateTopHolders());
      } catch (error) {
        console.error('Error loading market data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [marketId, timeframe]);
  
  // Format time until market end
  const formatTimeRemaining = () => {
    if (!market) return 'Loading...';
    
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
  
  // Calculate percentage of time elapsed
  const getTimeProgress = () => {
    if (!market) return 0;
    
    const now = new Date();
    const endDate = new Date(market.endDate);
    const createDate = new Date(market.createdAt);
    
    // If market has ended
    if (now >= endDate) return 100;
    
    // Calculate total duration and elapsed time
    const totalDuration = endDate.getTime() - createDate.getTime();
    const elapsedTime = now.getTime() - createDate.getTime();
    
    // Calculate percentage (inversed, as we want % remaining)
    const percentage = 100 - Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100));
    
    return percentage;
  };
  
  // Handle trade submission
  const handleTrade = async (tradeDetails: TradeDetails): Promise<void> => {
    console.log('Trade submitted:', tradeDetails);
    
    // Here you would normally submit the trade to your API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, show success with terminal-style notification
    setTradeSuccess(`✅ TRADE_EXECUTED: ${tradeDetails.outcome.toUpperCase()} - ${tradeDetails.quantity} @ $${tradeDetails.price.toFixed(2)}`);
    
    // Clear success message after 5 seconds
    setTimeout(() => setTradeSuccess(null), 5000);
    
    // Reload data
    setChartData(generateChartData(timeframe));
    setOrderBook(generateOrderBook());
    setActivities(generateActivity());
    setTopHolders(generateTopHolders());
  };

  // Quick trade function - provides a simplified way to trade quickly
  const handleQuickTrade = (outcomeId: string) => {
    setSelectedOutcome(outcomeId);
    // Scroll to trading interface
    const tradingSection = document.getElementById('trading-section');
    if (tradingSection) {
      tradingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (!market && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="terminal-card max-w-lg mx-auto">
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-sm">error_404.exe</div>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-4 font-mono">MARKET_NOT_FOUND</h1>
            <p className="text-gray-400 mb-8 font-mono">{'>'} The market you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/features/markets" className="btn-degen font-mono text-black">
              {'>'} BROWSE_MARKETS.EXE
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Trade Success Notification */}
      {tradeSuccess && (
        <div className="fixed top-4 right-4 z-50 terminal-card border border-green-500 bg-green-500/20 p-4 max-w-md">
          <div className="flex items-center justify-between p-2 border-b border-green-500/20 mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-sm">trade_success.exe</div>
          </div>
          <p className="text-green-300 font-mono text-sm">{tradeSuccess}</p>
        </div>
      )}

      {/* Market header */}
      <div className="mt-8">
        {isLoading || !market ? (
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">loading_market.exe</div>
            </div>
            <div className="h-64 p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-green-500/20 rounded"></div>
                <div className="h-4 bg-green-500/20 rounded w-3/4"></div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-16 bg-green-500/20 rounded"></div>
                  <div className="h-16 bg-green-500/20 rounded"></div>
                  <div className="h-16 bg-green-500/20 rounded"></div>
                  <div className="h-16 bg-green-500/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">market_{market.id}.exe</div>
            </div>
            <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-mono">{market.title}</h1>
                <p className="text-green-300 mb-4 font-mono">{'>'} {market.description}</p>
                
                {/* Market metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="terminal-card border border-green-500/30 p-3">
                    <div className="text-gray-500 text-sm font-mono">VOLUME</div>
                    <div className="text-green-400 font-bold font-mono">${market.totalVolume ? (market.totalVolume / 1000).toFixed(0) + 'K' : 'N/A'}</div>
                  </div>
                  <div className="terminal-card border border-green-500/30 p-3">
                    <div className="text-gray-500 text-sm font-mono">LIQUIDITY</div>
                    <div className="text-green-400 font-bold font-mono">${market.liquidity ? (market.liquidity / 1000).toFixed(0) + 'K' : 'N/A'}</div>
                  </div>
                  <div className="terminal-card border border-green-500/30 p-3">
                    <div className="text-gray-500 text-sm font-mono">CATEGORY</div>
                    <div className="text-green-400 font-bold font-mono uppercase">{market.category}</div>
                  </div>
                  <div className="terminal-card border border-green-500/30 p-3">
                    <div className="text-gray-500 text-sm font-mono">ENDS_IN</div>
                    <div className="flex items-center">
                      <div className="text-green-400 font-bold font-mono mr-2">{formatTimeRemaining()}</div>
                      {/* Countdown progress indicator */}
                      {market && (
                        <div className="w-16 h-2 bg-black/50 rounded-full overflow-hidden border border-green-500/30">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${getTimeProgress()}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Trading Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {market.outcomes.map((outcome: any, index: number) => {
                    const isYes = outcome.label.toLowerCase().includes('yes') || outcome.label.toLowerCase().includes('will') || index === 1;
                    const probability = (outcome.probability * 100).toFixed(0);
                    const odds = (1 / outcome.probability).toFixed(2);
                    
                    return (
                      <div 
                        key={outcome.id}
                        onClick={() => handleQuickTrade(outcome.id)}
                        className={`relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                          isYes 
                            ? 'hover:shadow-xl hover:shadow-green-500/30' 
                            : 'hover:shadow-xl hover:shadow-red-500/30'
                        }`}
                      >
                        {/* Glowing border effect on hover */}
                        <div className={`absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300 ${
                          isYes 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                            : 'bg-gradient-to-r from-red-500 to-rose-400'
                        }`}></div>
                        
                        {/* Main button card */}
                        <div className={`relative terminal-card border-2 rounded-xl p-5 text-center transition-all duration-200 ${
                          isYes 
                            ? 'border-green-500/60 bg-gradient-to-b from-green-500/15 to-green-500/5 hover:border-green-400 hover:from-green-500/25 hover:to-green-500/10' 
                            : 'border-red-500/60 bg-gradient-to-b from-red-500/15 to-red-500/5 hover:border-red-400 hover:from-red-500/25 hover:to-red-500/10'
                        }`}>
                          
                          {/* Header with label and status */}
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                              isYes ? 'text-green-400' : 'text-red-400'
                            }`}>
                              BET_{outcome.label.toUpperCase()}
                            </span>
                            <div className={`w-3 h-3 rounded-full animate-pulse shadow-lg ${
                              isYes ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'
                            }`}></div>
                          </div>
                          
                          {/* Large probability display */}
                          <div className={`text-3xl font-black font-mono mb-2 leading-none ${
                            isYes ? 'text-green-200' : 'text-red-200'
                          }`}>
                            {probability}%
                          </div>
                          
                          {/* Odds display */}
                          <div className={`text-sm font-mono font-bold mb-3 ${
                            isYes ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {odds}x PAYOUT
                          </div>
                          
                          {/* Terminal-style action bar */}
                          <div className={`pt-3 border-t border-dashed ${
                            isYes ? 'border-green-500/40' : 'border-red-500/40'
                          }`}>
                            <div className={`text-xs font-mono font-bold tracking-wider flex items-center justify-center space-x-2 ${
                              isYes ? 'text-green-300' : 'text-red-300'
                            }`}>
                              <span>▶</span>
                              <span>CLICK_TO_TRADE</span>
                              <span>◀</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Market image */}
              <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden bg-black/50 border border-green-500/30">
                {market.imageUrl ? (
                  <Image 
                    src={market.imageUrl} 
                    alt={market.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 160px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-green-500/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Market Actions */}
            <div className="flex flex-wrap gap-2 mt-4 border-t border-green-500/20 pt-4">
              <Link href={`/markets/charts?id=${marketId}`} className="btn-degen-secondary font-mono text-sm inline-flex items-center">
                <IconChartBar className="w-4 h-4 mr-2" />
                VIEW_CHARTS.EXE
              </Link>
              <Button variant="secondary" size="sm" className="inline-flex items-center font-mono">
                <IconShare className="w-4 h-4 mr-2" />
                SHARE.SH
              </Button>
              <Button variant="secondary" size="sm" className="inline-flex items-center font-mono">
                <IconFlag className="w-4 h-4 mr-2" />
                REPORT.EXE
              </Button>
            </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Market content with tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column: Price chart, order book, and discussion */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outcome Chart */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">price_chart.exe</div>
            </div>
            <div className="p-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-green-400">PRICE_CHART.SH</h3>
              <div className="mb-4 border-b border-green-500/20 pb-3">
                <div className="flex flex-wrap gap-2">
                  {['1H', '6H', '1D', '1W', '1M', 'ALL'].map((tf) => (
                    <button
                      key={tf}
                      className={`px-3 py-1 text-sm rounded-md font-mono transition-all duration-200 ${
                        timeframe === tf 
                          ? 'btn-degen text-black' 
                          : 'btn-degen-secondary text-green-400'
                      }`}
                      onClick={() => setTimeframe(tf)}
                    >
                      --{tf.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              {isLoading ? (
                <div className="h-72 bg-green-500/10 animate-pulse rounded-md border border-green-500/30"></div>
              ) : (
                <MultiOutcomeChart 
                  market={market} 
                  timeframe={timeframe}
                />
              )}
            </div>
          </div>
          
          {/* Order Book */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">order_book.dat</div>
            </div>
            {isLoading ? (
              <div className="h-72 bg-green-500/10 animate-pulse rounded-md border border-green-500/30 m-6"></div>
            ) : (
              <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
            )}
          </div>

          {/* Discussion Section - Moved here */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">discussion_board.exe</div>
            </div>
            <div className="p-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-green-400">DISCUSSION_BOARD.SH</h3>
              
              {/* Comment composer */}
              <div className="mb-6 terminal-card border border-green-500/30 p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center">
                    <span className="text-black font-bold text-sm font-mono">YOU</span>
                  </div>
                  <span className="text-green-400 font-mono font-bold">Share your prediction...</span>
                </div>
                
                <textarea
                  placeholder="Share your analysis, prediction, or thoughts about this market..."
                  className="w-full bg-black/50 border border-green-500/30 rounded-md p-3 text-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-green-500/50"
                  rows={3}
                />
                
                <div className="flex items-center justify-end mt-3">
                  <Button 
                    size="sm"
                    className="font-mono btn-degen text-black"
                  >
                    POST.EXE
                  </Button>
                </div>
              </div>

              {/* Sample comments */}
              <div className="space-y-4">
                <div className="text-green-400 font-mono text-sm mb-4">{'>'} 3 COMMENTS_LOADED</div>
                
                {/* Comment 1 */}
                <div className="terminal-card border border-green-500/30 hover:border-green-500/50 transition-all duration-200 p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-600 flex items-center justify-center">
                      <span className="text-black font-bold text-sm font-mono">DH</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-400 font-mono font-bold">DiamondHands💎</span>
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold rounded border text-yellow-400 bg-yellow-500/20 border-yellow-500/30">
                          WHALE
                        </span>
                        <span className="text-gray-500 text-xs font-mono">87% WIN • 2h ago</span>
                        <span className="text-green-400 text-xs font-mono">YES $15K @ 0.68</span>
                      </div>
                      
                      <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-400 font-mono font-bold text-sm">PREDICTION:</span>
                          <span className="px-2 py-1 text-xs font-mono font-bold rounded text-green-400 bg-green-500/20 border border-green-500/30">
                            YES - 75% CONFIDENCE
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm font-mono">Historical data shows top picks rarely go as expected</p>
                      </div>
                      
                      <p className="text-gray-200 leading-relaxed font-mono text-sm mb-3">
                        Been tracking NBA draft patterns for 5 years. This pick order feels WAY too predictable. Smart money is on some surprises in top 5. Cooper Flagg going #1 is overpriced at these odds.
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors">
                          <span className="font-mono">▲ 23</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-400 transition-colors">
                          <span className="font-mono">▼ 3</span>
                        </button>
                        <button className="text-gray-500 hover:text-purple-400 transition-colors font-mono text-sm">
                          REPLY.SH
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comment 2 */}
                <div className="terminal-card border border-green-500/30 hover:border-green-500/50 transition-all duration-200 p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm font-mono">CD</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-400 font-mono font-bold">CryptoDegenBBall</span>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold rounded border text-blue-400 bg-blue-500/20 border-blue-500/30">
                          TRADER
                        </span>
                        <span className="text-gray-500 text-xs font-mono">54% WIN • 45m ago</span>
                        <span className="text-red-400 text-xs font-mono">NO $2.5K @ 0.32</span>
                      </div>
                      
                      <p className="text-gray-200 leading-relaxed font-mono text-sm mb-3">
                        Just saw the latest mock drafts. 4 out of 5 major analysts have same top 5. This feels like easy money on NO.
                      </p>
                      
                      <div className="border border-green-500/30 rounded p-2 bg-green-500/5 mb-3">
                        <a href="#" className="text-green-400 hover:text-green-300 text-sm font-mono underline">
                          ESPN Mock Draft Update
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-400 transition-colors">
                          <span className="font-mono">▲ 12</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-400 transition-colors">
                          <span className="font-mono">▼ 8</span>
                        </button>
                        <button className="text-gray-500 hover:text-purple-400 transition-colors font-mono text-sm">
                          REPLY.SH
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Trading interface and activity/holders tabs */}
        <div className="space-y-6">
          {/* Trading Interface */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">trading_terminal.exe</div>
            </div>
            <div id="trading-section" className="p-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-green-400">TRADING_TERMINAL.EXE</h3>
              {isLoading ? (
                <div className="h-96 bg-green-500/10 animate-pulse rounded-md border border-green-500/30"></div>
              ) : (
                <TradingInterface
                  market={market}
                  isLoading={isLoading}
                  selectedOutcome={selectedOutcome}
                  setSelectedOutcome={setSelectedOutcome}
                  orderType={orderType}
                  setOrderType={setOrderType}
                  onTrade={handleTrade}
                />
              )}
            </div>
          </div>
          
          {/* Tabs for Activity and Top Holders only */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">market_data.exe</div>
            </div>
            <Tab.Group>
              <Tab.List className="flex space-x-1 bg-terminal p-1 border-b border-green-500/20">
                <Tab className={({ selected }) =>
                  `w-full py-2 text-sm leading-5 rounded-md font-mono transition-all duration-200
                  ${selected
                    ? 'btn-degen text-black font-bold'
                    : 'text-green-400 hover:bg-green-500/10 hover:text-green-300'
                  }`
                }>
                  ACTIVITY.LOG
                </Tab>
                <Tab className={({ selected }) =>
                  `w-full py-2 text-sm leading-5 rounded-md font-mono transition-all duration-200
                  ${selected
                    ? 'btn-degen text-black font-bold'
                    : 'text-green-400 hover:bg-green-500/10 hover:text-green-300'
                  }`
                }>
                  HOLDERS.DB
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-4">
                <Tab.Panel>
                  {isLoading ? (
                    <div className="h-96 bg-green-500/10 animate-pulse rounded-md border border-green-500/30 m-6"></div>
                  ) : (
                    <MarketActivity activities={activities} />
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {isLoading ? (
                    <div className="h-96 bg-green-500/10 animate-pulse rounded-md border border-green-500/30 m-6"></div>
                  ) : (
                    <TopHolders holders={topHolders} />
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>

      {/* News & Context Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Market News & Updates */}
        <div className="terminal-card">
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-sm">news_feed.exe</div>
          </div>
          <div className="p-6">
            <h3 className="font-mono font-bold text-lg mb-4 text-green-400">NEWS_FEED.SH</h3>
            <div className="space-y-4">
              <div className="border border-green-500/30 rounded p-4 bg-green-500/5 hover:bg-green-500/10 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-mono text-sm font-bold">ESPN</span>
                  <span className="text-gray-500 font-mono text-xs">2h ago</span>
                </div>
                <h4 className="text-white font-mono font-bold mb-2">Latest NBA Mock Draft 2025: Surprising Changes in Top 5</h4>
                <p className="text-gray-300 text-sm font-mono leading-relaxed">
                  Three major mock drafts released this week show unexpected shifts in the projected top 5 picks, with scouts citing new workout performances...
                </p>
                <div className="mt-3">
                  <a href="#" className="text-green-400 hover:text-green-300 font-mono text-sm underline">READ_MORE.EXE</a>
                </div>
              </div>
              
              <div className="border border-green-500/30 rounded p-4 bg-green-500/5 hover:bg-green-500/10 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-mono text-sm font-bold">THE_ATHLETIC</span>
                  <span className="text-gray-500 font-mono text-xs">4h ago</span>
                </div>
                <h4 className="text-white font-mono font-bold mb-2">Draft Combine Results: 5 Players Who Boosted Their Stock</h4>
                <p className="text-gray-300 text-sm font-mono leading-relaxed">
                  The NBA Draft Combine revealed some surprises that could shake up the lottery order. Here are the players who impressed scouts most...
                </p>
                <div className="mt-3">
                  <a href="#" className="text-green-400 hover:text-green-300 font-mono text-sm underline">READ_MORE.EXE</a>
                </div>
              </div>
              
              <div className="border border-orange-500/30 rounded p-4 bg-orange-500/5 hover:bg-orange-500/10 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-400 font-mono text-sm font-bold">MARKET_ALERT</span>
                  <span className="text-gray-500 font-mono text-xs">6h ago</span>
                </div>
                <h4 className="text-white font-mono font-bold mb-2">Large Position Alert: Whale Moves $50K on Draft Order</h4>
                <p className="text-gray-300 text-sm font-mono leading-relaxed">
                  Significant trading activity detected. A verified whale trader just placed a $50K position betting against consensus mock drafts...
                </p>
                <div className="mt-3">
                  <span className="text-orange-400 font-mono text-sm">IMPACT: HIGH 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Resolution & Related Markets */}
        <div className="space-y-6">
          {/* Resolution Details */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">resolution.dat</div>
            </div>
            <div className="p-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-green-400">RESOLUTION_CRITERIA.DAT</h3>
              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
                  <h4 className="text-purple-400 font-mono font-bold mb-2">HOW_THIS_RESOLVES:</h4>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    Market resolves to YES if the 2025 NBA Draft top 5 picks (positions 1-5) differ from the consensus of major mock drafts published 1 week before the draft.
                  </p>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                  <h4 className="text-blue-400 font-mono font-bold mb-2">DATA_SOURCES:</h4>
                  <ul className="text-gray-300 font-mono text-sm space-y-1">
                    <li>• ESPN Mock Draft</li>
                    <li>• The Athletic Draft Board</li>
                    <li>• NBA.com Official Mock</li>
                    <li>• Bleacher Report Rankings</li>
                  </ul>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                  <h4 className="text-red-400 font-mono font-bold mb-2">DISPUTE_PROCESS:</h4>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    If resolution is disputed, a 48-hour review period begins. Community can submit evidence and vote on outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Markets */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">related_markets.db</div>
            </div>
            <div className="p-6">
              <h3 className="font-mono font-bold text-lg mb-4 text-green-400">RELATED_MARKETS.DB</h3>
              <div className="space-y-3">
                <Link href="/markets/cooper-flagg-first-pick" className="block border border-green-500/30 rounded p-3 bg-green-500/5 hover:bg-green-500/10 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-mono font-bold text-sm">Cooper Flagg #1 Pick?</h4>
                      <p className="text-gray-400 font-mono text-xs">Will Cooper Flagg be drafted first overall?</p>
                    </div>
                    <div className="text-green-400 font-mono text-sm font-bold">
                      89%
                    </div>
                  </div>
                </Link>
                
                <Link href="/markets/duke-players-top-10" className="block border border-green-500/30 rounded p-3 bg-green-500/5 hover:bg-green-500/10 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-mono font-bold text-sm">3+ Duke Players in Top 10?</h4>
                      <p className="text-gray-400 font-mono text-xs">Three or more Duke players drafted in top 10</p>
                    </div>
                    <div className="text-green-400 font-mono text-sm font-bold">
                      67%
                    </div>
                  </div>
                </Link>
                
                <Link href="/markets/international-players-lottery" className="block border border-green-500/30 rounded p-3 bg-green-500/5 hover:bg-green-500/10 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-mono font-bold text-sm">International Player in Lottery?</h4>
                      <p className="text-gray-400 font-mono text-xs">Non-US player drafted in top 14</p>
                    </div>
                    <div className="text-green-400 font-mono text-sm font-bold">
                      23%
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
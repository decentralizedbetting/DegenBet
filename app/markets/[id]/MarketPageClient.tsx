"use client";

import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { OrderBook } from '@/app/components/trading/OrderBook';
import { MarketActivity } from '@/app/components/trading/MarketActivity';
import { TopHolders } from '@/app/components/trading/TopHolders';
import { TradingInterface } from '@/app/components/trading/TradingInterface';
import { MultiOutcomeChart } from '@/app/components/trading/MultiOutcomeChart';
import { Card } from '@/app/components/ui/containers';
import Link from 'next/link';
import Image from 'next/image';
import { getMarketData } from '@/app/data/markets';
import { IconChartBar, IconShare, IconFlag } from '@tabler/icons-react';
import { Button } from '@/app/components/ui/Button';

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
    
    // For demo purposes, show success
    alert(`Trade successful: ${tradeDetails.outcome} - ${tradeDetails.quantity} @ ${tradeDetails.price}`);
    
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
        <h1 className="text-3xl font-bold text-white mb-4">Market Not Found</h1>
        <p className="text-gray-400 mb-8">The market you're looking for doesn't exist or has been removed.</p>
        <Link href="/markets" className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-md text-white">
          Browse All Markets
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Market header */}
      <div className="mt-8">
        {isLoading || !market ? (
          <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
        ) : (
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-teal-900/30 rounded-lg p-6 relative overflow-hidden">
            {/* Category indicator */}
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-teal-400 w-full"></div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{market.title}</h1>
                <p className="text-gray-400 mb-4">{market.description}</p>
                
                {/* Market metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-gray-500 text-sm">Volume</div>
                    <div className="text-white font-medium">${market.totalVolume ? (market.totalVolume / 1000).toFixed(0) + 'K' : 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Liquidity</div>
                    <div className="text-white font-medium">${market.liquidity ? (market.liquidity / 1000).toFixed(0) + 'K' : 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Category</div>
                    <div className="text-white font-medium capitalize">{market.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">Ends In</div>
                    <div className="flex items-center">
                      <div className="text-white font-medium mr-2">{formatTimeRemaining()}</div>
                      {/* Countdown progress indicator */}
                      {market && (
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500" 
                            style={{ width: `${getTimeProgress()}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Quick trade buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {market.outcomes.map((outcome: any) => (
                    <Button 
                      key={outcome.id}
                      variant="primary"
                      size="sm"
                      className="min-w-24 flex items-center justify-between gap-2"
                      onClick={() => handleQuickTrade(outcome.id)}
                    >
                      <span>{outcome.label}</span>
                      <span className="bg-black/20 px-2 py-0.5 rounded-sm text-xs">
                        {(outcome.probability * 100).toFixed(0)}%
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Market image */}
              <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden bg-gray-700 border border-gray-600">
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
                    <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Market Actions */}
            <div className="flex flex-wrap gap-2 mt-4 border-t border-gray-700 pt-4">
              <Link href={`/markets/charts?id=${marketId}`} className="inline-flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm">
                <IconChartBar className="w-4 h-4 mr-2" />
                View Charts
              </Link>
              <Button variant="secondary" size="sm" className="inline-flex items-center">
                <IconShare className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="secondary" size="sm" className="inline-flex items-center">
                <IconFlag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Market content with tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column: Price chart and order book */}
        <div className="lg:col-span-2 space-y-6">
          {/* Outcome Chart */}
          <Card className="relative">
            <h3 className="font-medium text-lg mb-4">Price Chart</h3>
            <div className="mb-4 border-b border-gray-700 pb-3">
              <div className="flex flex-wrap gap-2">
                {['1H', '6H', '1D', '1W', '1M', 'ALL'].map((tf) => (
                  <button
                    key={tf}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeframe === tf 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            
            {isLoading ? (
              <div className="h-72 bg-gray-800 animate-pulse rounded-md"></div>
            ) : (
              <MultiOutcomeChart 
                market={market} 
                timeframe={timeframe}
              />
            )}
          </Card>
          
          {/* Order Book */}
          <Card>
            {isLoading ? (
              <div className="h-72 bg-gray-800 animate-pulse rounded-md"></div>
            ) : (
              <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
            )}
          </Card>
        </div>
        
        {/* Right column: Trading interface and tabs for activity/holders */}
        <div className="space-y-6">
          {/* Trading Interface */}
          <Card className="relative">
            <div id="trading-section">
              <h3 className="font-medium text-lg mb-4">Trade</h3>
              {isLoading ? (
                <div className="h-96 bg-gray-800 animate-pulse rounded-md"></div>
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
          </Card>
          
          {/* Tabs for Activity and Top Holders */}
          <Card>
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-lg bg-gray-800 p-1">
                <Tab className={({ selected }) =>
                  `w-full py-2 text-sm leading-5 rounded-md
                  ${selected
                    ? 'bg-teal-500 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }>
                  Activity
                </Tab>
                <Tab className={({ selected }) =>
                  `w-full py-2 text-sm leading-5 rounded-md
                  ${selected
                    ? 'bg-teal-500 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }>
                  Top Holders
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-4">
                <Tab.Panel>
                  {isLoading ? (
                    <div className="h-96 bg-gray-800 animate-pulse rounded-md"></div>
                  ) : (
                    <MarketActivity activities={activities} />
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {isLoading ? (
                    <div className="h-96 bg-gray-800 animate-pulse rounded-md"></div>
                  ) : (
                    <TopHolders holders={topHolders} />
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Card>
        </div>
      </div>
    </div>
  );
} 
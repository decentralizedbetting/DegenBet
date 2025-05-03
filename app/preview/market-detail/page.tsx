"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

// Mock data
const marketData = {
  id: 'btc-100k-2024',
  title: 'Will Bitcoin reach $100,000 by Dec 31, 2024?',
  description: 'This market will resolve to YES if the price of Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange before December 31, 2024 23:59:59 UTC.',
  category: 'Crypto',
  endDate: '2024-12-31T23:59:59Z',
  volume: 2500000,
  liquidity: 750000,
  currentPrice: 0.65,
  priceChange: '+5.2%',
  resolution: 'Chainlink Price Feed',
  creator: '0x1234...5678',
  createdAt: '2024-01-15T10:30:00Z',
  positions: [
    { outcome: 'Yes', shares: 1000, avgPrice: 0.58, currentPrice: 0.65, pnl: '+12.1%' },
    { outcome: 'No', shares: 500, avgPrice: 0.42, currentPrice: 0.35, pnl: '+16.7%' }
  ],
  orderHistory: [
    { type: 'Buy', outcome: 'Yes', amount: 1000, price: 0.58, timestamp: '2024-02-15 14:30', status: 'Completed' },
    { type: 'Sell', outcome: 'No', amount: 500, price: 0.42, timestamp: '2024-02-14 09:15', status: 'Completed' }
  ],
  comments: [
    { id: 1, user: 'CryptoWhale', avatar: '🐋', content: 'Bitcoin halving in 2024 could be a major catalyst', timestamp: '2 hours ago', likes: 15 },
    { id: 2, user: 'TechAnalyst', avatar: '📊', content: 'Technical indicators suggest strong upward momentum', timestamp: '5 hours ago', likes: 8 }
  ],
  relatedMarkets: [
    { id: 'eth-5k-2024', title: 'ETH to reach $5,000', price: 0.45, change: '+3.2%' },
    { id: 'btc-dominance', title: 'BTC dominance above 50%', price: 0.72, change: '-1.5%' }
  ]
};

const priceHistory = [
  { timestamp: '2024-01-15', price: 0.50 },
  { timestamp: '2024-01-30', price: 0.55 },
  { timestamp: '2024-02-15', price: 0.65 }
];

export default function MarketDetailPreview() {
  const [activeTab, setActiveTab] = useState('info');
  const [orderType, setOrderType] = useState('buy');
  const [outcome, setOutcome] = useState('Yes');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Preview Banner */}
      <div className="bg-amber-500/20 border-b border-amber-500/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-amber-400 font-medium">Preview Mode - Market Detail Template</span>
            </div>
            <Link 
              href="/markets"
              className="text-amber-400 hover:text-amber-300 text-sm font-medium"
            >
              Exit Preview
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex space-x-2 text-sm text-gray-400">
            <Link href="/markets" className="hover:text-white">Markets</Link>
            <span>/</span>
            <Link href="/markets/crypto" className="hover:text-white">Crypto</Link>
            <span>/</span>
            <span className="text-white">BTC $100k</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Info & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Title & Stats */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{marketData.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Created by {marketData.creator}</span>
                      <span>•</span>
                      <span>Ends {new Date(marketData.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <span className="mr-2">📊</span> Share
                    </Button>
                    <Button variant="ghost" size="sm">
                      <span className="mr-2">⭐</span> Follow
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">24h Volume</div>
                    <div className="text-lg font-bold">${marketData.volume.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Liquidity</div>
                    <div className="text-lg font-bold">${marketData.liquidity.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Current Price</div>
                    <div className="text-lg font-bold">${marketData.currentPrice}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">24h Change</div>
                    <div className="text-lg font-bold text-green-400">{marketData.priceChange}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Price Chart */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Price History</h2>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">1D</Button>
                    <Button variant="ghost" size="sm">1W</Button>
                    <Button variant="primary" size="sm">1M</Button>
                    <Button variant="ghost" size="sm">ALL</Button>
                  </div>
                </div>
                <div className="h-64 bg-black/30 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400">Price Chart Placeholder</span>
                </div>
              </div>
            </Card>

            {/* Info Tabs */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <div className="border-b border-gray-700">
                <div className="flex space-x-4 p-4">
                  {['info', 'positions', 'comments', 'activity'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-300">{marketData.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Resolution Details</h3>
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                            🔗
                          </div>
                          <div>
                            <div className="font-medium">Chainlink Price Feed</div>
                            <div className="text-sm text-gray-400">Automated price resolution via Chainlink oracle</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'positions' && (
                  <div className="space-y-4">
                    {marketData.positions.map((position, i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{position.outcome}</div>
                          <div className={position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                            {position.pnl}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400">Shares</div>
                            <div>{position.shares}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Avg Price</div>
                            <div>${position.avgPrice}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Current</div>
                            <div>${position.currentPrice}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                        💭
                      </div>
                      <textarea
                        placeholder="Add your thoughts..."
                        className="flex-1 bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-4">
                      {marketData.comments.map((comment) => (
                        <div key={comment.id} className="bg-black/30 rounded-xl p-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                              {comment.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-medium">{comment.user}</div>
                                <div className="text-sm text-gray-400">{comment.timestamp}</div>
                              </div>
                              <p className="text-gray-300 mb-2">{comment.content}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <button className="text-gray-400 hover:text-white">
                                  👍 {comment.likes}
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                  💬 Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-4">
                    {marketData.orderHistory.map((order, i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-gray-400 text-sm">Type</div>
                            <div className={`font-medium ${
                              order.type === 'Buy' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {order.type}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Amount</div>
                            <div className="font-medium">{order.amount}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Price</div>
                            <div className="font-medium">${order.price}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Status</div>
                            <div className="font-medium text-green-400">{order.status}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Trading Interface & Related Markets */}
          <div className="space-y-6">
            {/* Trading Interface */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Trade</h2>
                <div className="space-y-4">
                  {/* Order Type */}
                  <div>
                    <div className="flex space-x-2 mb-4">
                      <Button
                        variant={orderType === 'buy' ? 'success' : 'ghost'}
                        onClick={() => setOrderType('buy')}
                        className="flex-1"
                      >
                        Buy
                      </Button>
                      <Button
                        variant={orderType === 'sell' ? 'danger' : 'ghost'}
                        onClick={() => setOrderType('sell')}
                        className="flex-1"
                      >
                        Sell
                      </Button>
                    </div>
                  </div>

                  {/* Outcome Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Outcome
                    </label>
                    <div className="flex space-x-2">
                      <Button
                        variant={outcome === 'Yes' ? 'primary' : 'ghost'}
                        onClick={() => setOutcome('Yes')}
                        className="flex-1"
                      >
                        Yes
                      </Button>
                      <Button
                        variant={outcome === 'No' ? 'primary' : 'ghost'}
                        onClick={() => setOutcome('No')}
                        className="flex-1"
                      >
                        No
                      </Button>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Amount (DINO)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Limit Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Limit Price
                    </label>
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                      placeholder="0.00"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-black/30 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Est. Cost</span>
                      <span>1,000 DINO</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Est. Fee</span>
                      <span>2 DINO</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Max Return</span>
                      <span className="text-green-400">+500 DINO</span>
                    </div>
                  </div>

                  <Button
                    variant={orderType === 'buy' ? 'success' : 'danger'}
                    className="w-full"
                  >
                    {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Related Markets */}
            <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Related Markets</h2>
                <div className="space-y-4">
                  {marketData.relatedMarkets.map((market) => (
                    <Link
                      key={market.id}
                      href={`/markets/${market.id}`}
                      className="block bg-black/30 rounded-xl p-4 hover:bg-black/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{market.title}</div>
                        <div className={market.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                          {market.change}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Current Price: ${market.price}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
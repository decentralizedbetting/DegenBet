"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/_shared/components/ui/Card';
import { Button } from '@/_shared/components/ui/Button';

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
    <div className="min-h-screen bg-transparent">
      {/* Terminal Preview Banner */}
      <div className="terminal-card mb-6">
        <div className="flex items-center justify-between p-3 border-b border-yellow-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs">preview_mode.exe</div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-lg">⚠️</span>
              <span className="text-yellow-400 font-medium font-mono">PREVIEW MODE - Market Detail Template</span>
            </div>
            <Link 
              href="/markets"
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium font-mono"
            >
              {'>'} exit_preview.sh
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Terminal Breadcrumbs */}
        <div className="mb-6">
          <div className="terminal-card">
            <div className="flex items-center justify-between p-3 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-xs">navigation.sh</div>
            </div>
            <div className="p-3">
              <nav className="flex space-x-2 text-sm font-mono">
                <Link href="/markets" className="text-green-400 hover:text-green-300">{'>'} /markets</Link>
                <span className="text-gray-500">/</span>
                <Link href="/markets/crypto" className="text-green-400 hover:text-green-300">crypto</Link>
                <span className="text-gray-500">/</span>
                <span className="text-white">btc_100k.market</span>
          </nav>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Info & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Terminal Market Title & Stats */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-sm">market_info.exe</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2 font-mono">{marketData.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 font-mono">
                      <span>{'>'} created_by: {marketData.creator}</span>
                      <span>•</span>
                      <span>{'>'} expires: {new Date(marketData.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="btn-degen-secondary font-mono text-sm">
                      <span className="mr-2">📊</span> share.sh
                    </button>
                    <button className="btn-degen-secondary font-mono text-sm">
                      <span className="mr-2">⭐</span> follow.exe
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 rounded p-3 border border-green-500/20">
                    <div className="text-sm text-gray-400 font-mono">24h_volume</div>
                    <div className="text-lg font-bold font-mono text-green-400">${marketData.volume.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/30 rounded p-3 border border-green-500/20">
                    <div className="text-sm text-gray-400 font-mono">liquidity</div>
                    <div className="text-lg font-bold font-mono text-green-400">${marketData.liquidity.toLocaleString()}</div>
                  </div>
                  <div className="bg-black/30 rounded p-3 border border-green-500/20">
                    <div className="text-sm text-gray-400 font-mono">current_price</div>
                    <div className="text-lg font-bold font-mono text-green-400">${marketData.currentPrice}</div>
                  </div>
                  <div className="bg-black/30 rounded p-3 border border-green-500/20">
                    <div className="text-sm text-gray-400 font-mono">24h_change</div>
                    <div className="text-lg font-bold font-mono text-green-400">{marketData.priceChange}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Price Chart */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-sm">price_chart.py</div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold font-mono text-green-400">{'>'} PRICE_HISTORY.SH</h2>
                  <div className="flex space-x-2">
                    <button className="btn-degen-secondary text-sm font-mono">1D</button>
                    <button className="btn-degen-secondary text-sm font-mono">1W</button>
                    <button className="btn-degen text-sm font-mono text-black">1M</button>
                    <button className="btn-degen-secondary text-sm font-mono">ALL</button>
                  </div>
                </div>
                <div className="h-64 bg-black/30 rounded-xl flex items-center justify-center border border-green-500/20">
                  <div className="text-center">
                    <div className="text-green-400 text-2xl mb-2">📈</div>
                    <span className="text-gray-400 font-mono">Chart_Module_Loading...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Info Tabs */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-sm">market_data.json</div>
              </div>
              <div className="border-b border-green-500/20">
                <div className="flex space-x-4 p-4">
                  {['info', 'positions', 'comments', 'activity'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg transition-colors font-mono ${
                        activeTab === tab
                          ? 'btn-degen text-black'
                          : 'text-gray-400 hover:text-green-400'
                      }`}
                    >
                      {'>'} {tab}.sh
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'info' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 font-mono text-green-400">{'>'} DESCRIPTION.MD</h3>
                      <p className="text-gray-300 font-mono leading-relaxed">{marketData.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 font-mono text-purple-400">{'>'} RESOLUTION_PROTOCOL.SOL</h3>
                      <div className="terminal-card border border-blue-500/30">
                        <div className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                            🔗
                          </div>
                          <div>
                              <div className="font-medium font-mono text-blue-400">Chainlink_Oracle.exe</div>
                              <div className="text-sm text-gray-400 font-mono">Automated price resolution via Chainlink oracle</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'positions' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-mono text-yellow-400">{'>'} MY_POSITIONS.DB</h3>
                    {marketData.positions.map((position, i) => (
                      <div key={i} className="terminal-card border border-yellow-500/30">
                        <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-white">{position.outcome}_SHARES.EXE</span>
                            <span className={`font-mono ${position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {position.pnl}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                          <div>
                              <span className="text-gray-400">shares:</span>
                              <span className="text-white ml-2">{position.shares}</span>
                          </div>
                          <div>
                              <span className="text-gray-400">avg_price:</span>
                              <span className="text-white ml-2">${position.avgPrice}</span>
                          </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'comments' && (
                    <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-mono text-cyan-400">{'>'} COMMUNITY_CHAT.LOG</h3>
                      {marketData.comments.map((comment) => (
                      <div key={comment.id} className="terminal-card border border-cyan-500/30">
                        <div className="p-4">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{comment.avatar}</span>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-mono text-cyan-400">{comment.user}</span>
                                <span className="text-xs text-gray-500 font-mono">{comment.timestamp}</span>
                              </div>
                              <p className="text-gray-300 font-mono text-sm">{comment.content}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <button className="text-xs text-gray-400 hover:text-green-400 font-mono">
                                  ❤️ {comment.likes}
                                </button>
                                <button className="text-xs text-gray-400 hover:text-blue-400 font-mono">
                                  reply.sh
                                </button>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-mono text-purple-400">{'>'} TRADE_ACTIVITY.LOG</h3>
                    {marketData.orderHistory.map((order, i) => (
                      <div key={i} className="terminal-card border border-purple-500/30">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-mono">
                              <span className={order.type === 'Buy' ? 'text-green-400' : 'text-red-400'}>
                                {order.type.toUpperCase()}_ORDER.EXE
                              </span>
                              <span className="text-white ml-2">{order.outcome}</span>
                            </div>
                            <div className="text-right font-mono">
                              <div className="text-white">{order.amount} @ ${order.price}</div>
                              <div className="text-xs text-gray-400">{order.timestamp}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trading Interface Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Terminal Trading Interface */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-sm">trading_terminal.exe</div>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 font-mono text-green-400">{'>'} PLACE_ORDER.SH</h2>
                
                {/* Order Type Toggle */}
                    <div className="flex space-x-2 mb-4">
                  {['buy', 'sell'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 py-2 px-4 rounded font-mono text-sm ${
                        orderType === type
                          ? type === 'buy' ? 'btn-degen text-black' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'btn-degen-secondary'
                      }`}
                    >
                      {type.toUpperCase()}.EXE
                    </button>
                  ))}
                  </div>

                  {/* Outcome Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">outcome_selection:</label>
                    <div className="flex space-x-2">
                    {['Yes', 'No'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setOutcome(option)}
                        className={`flex-1 py-2 px-4 rounded font-mono text-sm ${
                          outcome === option
                            ? 'btn-degen text-black'
                            : 'btn-degen-secondary'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                    amount_usdc:
                    </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-green-400 font-mono">$</span>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                    />
                  </div>
                  </div>

                  {/* Limit Price */}
                <div className="mb-4">
                  <label htmlFor="limitPrice" className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                    limit_price:
                    </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-green-400 font-mono">$</span>
                    <input
                      type="number"
                      id="limitPrice"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      placeholder="0.65"
                      className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                    />
                  </div>
                  </div>

                {/* Trade Summary */}
                <div className="bg-black/30 rounded p-3 mb-4 border border-green-500/20">
                  <div className="text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">estimated_shares:</span>
                      <span className="text-white">1,538</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">avg_price:</span>
                      <span className="text-white">$0.65</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">slippage:</span>
                      <span className="text-yellow-400">~0.1%</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-600 pt-1">
                      <span className="text-gray-400">total_cost:</span>
                      <span className="text-green-400">$1,000.00</span>
                    </div>
                  </div>
                </div>

                {/* Execute Button */}
                <button className="w-full btn-degen py-3 font-mono text-black font-bold">
                  EXECUTE_TRADE.SH
                </button>
                    </div>
                  </div>

            {/* Terminal Market Stats */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">market_stats.py</div>
              </div>
              <div className="p-4">
                <h3 className="font-mono font-bold mb-3 text-blue-400">{'>'} QUICK_STATS.EXE</h3>
                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">total_traders:</span>
                    <span className="text-white">2,543</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">yes_probability:</span>
                    <span className="text-green-400">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">no_probability:</span>
                    <span className="text-red-400">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">market_cap:</span>
                    <span className="text-purple-400">$3.2M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Related Markets */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">related_markets.db</div>
              </div>
              <div className="p-4">
                <h3 className="font-mono font-bold mb-3 text-orange-400">{'>'} RELATED_MARKETS.SH</h3>
                <div className="space-y-2">
                  {marketData.relatedMarkets.map((related) => (
                    <Link key={related.id} href={`/markets/${related.id}`}>
                      <div className="bg-black/30 rounded p-3 hover:bg-black/50 transition-colors border border-gray-700 hover:border-green-500/30">
                        <div className="text-sm font-mono">
                          <div className="text-white mb-1">{related.title}</div>
                          <div className="flex justify-between text-xs">
                            <span className="text-green-400">${related.price}</span>
                            <span className={related.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                              {related.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

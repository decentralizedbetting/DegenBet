"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

// Mock data for preview
const mockUser = {
  address: '0x1234...5678',
  username: 'CryptoWhale',
  joinedDate: '2024-01-15',
  reputation: 98,
  stats: {
    totalTrades: 156,
    winRate: 68.5,
    totalVolume: 125000,
    activePositions: 12,
    totalPnL: 15.4
  },
  achievements: [
    { id: 1, title: 'Early Adopter', description: 'Joined during beta phase', icon: '🌟' },
    { id: 2, title: 'Market Maker', description: 'Provided liquidity in 10+ markets', icon: '💧' },
    { id: 3, title: 'Sharp Predictor', description: 'Won 5 predictions in a row', icon: '🎯' }
  ]
};

const mockPositions = [
  {
    market: 'Bitcoin Price Above $50,000',
    outcome: 'Yes',
    amount: 1000,
    avgPrice: 0.65,
    currentPrice: 0.72,
    pnl: '+10.77%',
    category: 'Crypto'
  },
  {
    market: 'ETH to Reach $5,000',
    outcome: 'No',
    amount: 500,
    avgPrice: 0.45,
    currentPrice: 0.38,
    pnl: '+15.56%',
    category: 'Crypto'
  },
  {
    market: 'Fed Rate Cut in Q2',
    outcome: 'Yes',
    amount: 750,
    avgPrice: 0.55,
    currentPrice: 0.48,
    pnl: '-12.73%',
    category: 'Economics'
  }
];

const mockHistory = [
  {
    type: 'Buy',
    market: 'Bitcoin Price Above $50,000',
    amount: 1000,
    price: 0.65,
    timestamp: '2024-02-15 14:30',
    status: 'Completed',
    hash: '0xabc...123'
  },
  {
    type: 'Sell',
    market: 'ETH 2.0 Launch Success',
    amount: 500,
    price: 0.82,
    timestamp: '2024-02-14 09:15',
    status: 'Completed',
    hash: '0xdef...456'
  }
];

const mockActivity = [
  {
    type: 'Market Win',
    description: 'Won prediction on "BTC Above $45k"',
    reward: '+500 DINO',
    timestamp: '2 hours ago'
  },
  {
    type: 'Liquidity',
    description: 'Added liquidity to "Fed Rate Cut"',
    amount: '$1,000',
    timestamp: '5 hours ago'
  },
  {
    type: 'Achievement',
    description: 'Earned "Market Maker" badge',
    timestamp: '1 day ago'
  }
];

export default function ProfileDashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

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
              <span className="text-amber-400 font-medium">Preview Mode - Profile Dashboard Template</span>
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">CW</span>
                    </div>
                    <h2 className="text-xl font-bold mb-1">{mockUser.username}</h2>
                    <p className="text-gray-400 font-mono text-sm mb-4">{mockUser.address}</p>
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-green-500/20 rounded-full">
                        <span className="text-xs text-green-400">Rep {mockUser.reputation}</span>
                      </div>
                      <div className="px-2 py-1 bg-blue-500/20 rounded-full">
                        <span className="text-xs text-blue-400">Beta Tester</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-2">
                  <nav className="space-y-1">
                    {[
                      { name: 'Overview', icon: '📊' },
                      { name: 'Positions', icon: '📈' },
                      { name: 'History', icon: '📜' },
                      { name: 'Achievements', icon: '🏆' },
                      { name: 'Settings', icon: '⚙️' }
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name.toLowerCase())}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === item.name.toLowerCase()
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="primary" className="w-full justify-start">
                      <span className="mr-2">🎯</span> Create Market
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                      <span className="mr-2">💧</span> Add Liquidity
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <span className="mr-2">💰</span> Claim Rewards
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                    <div className="p-4">
                      <div className="text-sm text-gray-400">Total Volume</div>
                      <div className="text-2xl font-bold">${mockUser.stats.totalVolume.toLocaleString()}</div>
                      <div className="text-sm text-green-400">+12.5% this month</div>
                    </div>
                  </Card>
                  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                    <div className="p-4">
                      <div className="text-sm text-gray-400">Win Rate</div>
                      <div className="text-2xl font-bold">{mockUser.stats.winRate}%</div>
                      <div className="text-sm text-green-400">+2.3% this month</div>
                    </div>
                  </Card>
                  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                    <div className="p-4">
                      <div className="text-sm text-gray-400">Total P&L</div>
                      <div className="text-2xl font-bold text-green-400">+{mockUser.stats.totalPnL}%</div>
                      <div className="text-sm text-green-400">All time</div>
                    </div>
                  </Card>
                </div>

                {/* Active Positions */}
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Active Positions</h3>
                      <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    <div className="space-y-4">
                      {mockPositions.map((position, i) => (
                        <div key={i} className="bg-black/30 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">{position.market}</div>
                              <div className="text-sm text-gray-400">{position.category}</div>
                            </div>
                            <div className={position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                              {position.pnl}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-400">Outcome</div>
                              <div className="font-medium">{position.outcome}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Amount</div>
                              <div className="font-medium">{position.amount}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Avg Price</div>
                              <div className="font-medium">${position.avgPrice}</div>
                            </div>
                            <div>
                              <div className="text-gray-400">Current</div>
                              <div className="font-medium">${position.currentPrice}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {mockActivity.map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700/50 last:border-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                              {activity.type === 'Market Win' && '🎯'}
                              {activity.type === 'Liquidity' && '💧'}
                              {activity.type === 'Achievement' && '🏆'}
                            </div>
                            <div>
                              <div className="font-medium">{activity.description}</div>
                              <div className="text-sm text-gray-400">{activity.timestamp}</div>
                            </div>
                          </div>
                          {activity.reward && (
                            <div className="text-green-400 font-medium">{activity.reward}</div>
                          )}
                          {activity.amount && (
                            <div className="text-blue-400 font-medium">{activity.amount}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeTab === 'positions' && (
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-6">All Positions</h3>
                  {/* Position content similar to overview but with more detail */}
                </div>
              </Card>
            )}

            {activeTab === 'history' && (
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Trading History</h3>
                  <div className="space-y-4">
                    {mockHistory.map((trade, i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-gray-400 text-sm">Type</div>
                            <div className={`font-medium ${
                              trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {trade.type}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Amount</div>
                            <div className="font-medium">{trade.amount}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Price</div>
                            <div className="font-medium">${trade.price}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Status</div>
                            <div className="font-medium text-green-400">{trade.status}</div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-700/50">
                          <div className="text-sm">
                            <span className="text-gray-400">Market: </span>
                            <span className="text-white">{trade.market}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Transaction: </span>
                            <span className="text-blue-400 font-mono">{trade.hash}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'achievements' && (
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockUser.achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-black/30 rounded-xl p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                            {achievement.icon}
                          </div>
                          <div>
                            <div className="font-medium">{achievement.title}</div>
                            <div className="text-sm text-gray-400">{achievement.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-4">Profile Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            value={mockUser.username}
                            className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Bio
                          </label>
                          <textarea
                            className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-4">Preferences</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Email Notifications</span>
                          <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Market Updates</span>
                          <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/_shared/components/ui/Card';
import { Button } from '@/_shared/components/ui/Button';

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
    reward: '+500 DBT',
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
              <span className="text-yellow-400 font-medium font-mono">PREVIEW MODE - Profile Dashboard Template</span>
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Terminal Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Terminal Profile Card */}
              <div className="terminal-card">
                <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="terminal-text text-xs">user_profile.json</div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold font-mono">CW</span>
                    </div>
                    <h2 className="text-xl font-bold mb-1 font-mono text-green-400">{mockUser.username}</h2>
                    <p className="text-gray-400 font-mono text-sm mb-4">{mockUser.address}</p>
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                        <span className="text-xs text-green-400 font-mono">REP_{mockUser.reputation}</span>
                      </div>
                      <div className="px-2 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                        <span className="text-xs text-blue-400 font-mono">BETA_USER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Navigation */}
              <div className="terminal-card">
                <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="terminal-text text-xs">navigation.sh</div>
                </div>
                <div className="p-2">
                  <nav className="space-y-1">
                    {[
                      { name: 'Overview', icon: '📊', file: 'overview.exe' },
                      { name: 'Positions', icon: '📈', file: 'positions.db' },
                      { name: 'History', icon: '📜', file: 'history.log' },
                      { name: 'Achievements', icon: '🏆', file: 'badges.json' },
                      { name: 'Settings', icon: '⚙️', file: 'config.ini' }
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name.toLowerCase())}
                        className={`w-full flex items-center px-4 py-3 text-sm font-mono rounded-lg transition-colors ${
                          activeTab === item.name.toLowerCase()
                            ? 'btn-degen text-black'
                            : 'text-gray-400 hover:bg-green-500/10 hover:text-green-400 border border-transparent hover:border-green-500/30'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {'>'} {item.file}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Terminal Quick Actions */}
              <div className="terminal-card">
                <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="terminal-text text-xs">quick_actions.sh</div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-3 font-mono">{'>'} QUICK_COMMANDS</h3>
                  <div className="space-y-2">
                    <button className="w-full btn-degen justify-start font-mono text-black">
                      <span className="mr-2">🎯</span> create_market.exe
                    </button>
                    <button className="w-full btn-degen-secondary justify-start font-mono">
                      <span className="mr-2">💧</span> add_liquidity.sh
                    </button>
                    <button className="w-full btn-degen-secondary justify-start font-mono">
                      <span className="mr-2">💰</span> claim_rewards.exe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Terminal Stats Overview */}
                <div className="terminal-card">
                  <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="terminal-text text-sm">user_stats.py</div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6 font-mono text-green-400">{'>'} ACCOUNT_OVERVIEW.JSON</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="terminal-card border border-green-500/30">
                        <div className="p-4 text-center">
                          <div className="text-3xl font-black font-mono text-green-400 mb-2">{mockUser.stats.totalTrades}</div>
                          <div className="text-sm text-gray-400 font-mono">TOTAL_TRADES</div>
                        </div>
                      </div>
                      <div className="terminal-card border border-blue-500/30">
                        <div className="p-4 text-center">
                          <div className="text-3xl font-black font-mono text-blue-400 mb-2">{mockUser.stats.winRate}%</div>
                          <div className="text-sm text-gray-400 font-mono">WIN_RATE</div>
                        </div>
                      </div>
                      <div className="terminal-card border border-purple-500/30">
                        <div className="p-4 text-center">
                          <div className="text-3xl font-black font-mono text-purple-400 mb-2">${mockUser.stats.totalVolume.toLocaleString()}</div>
                          <div className="text-sm text-gray-400 font-mono">TOTAL_VOLUME</div>
                        </div>
                      </div>
                      <div className="terminal-card border border-yellow-500/30">
                        <div className="p-4 text-center">
                          <div className="text-3xl font-black font-mono text-yellow-400 mb-2">+{mockUser.stats.totalPnL}%</div>
                          <div className="text-sm text-gray-400 font-mono">TOTAL_PNL</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terminal Recent Activity */}
                <div className="terminal-card">
                  <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="terminal-text text-sm">activity_feed.log</div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6 font-mono text-cyan-400">{'>'} RECENT_ACTIVITY.LOG</h2>
                    <div className="space-y-4">
                      {mockActivity.map((activity, i) => (
                        <div key={i} className="terminal-card border border-cyan-500/30">
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-mono text-white mb-1">{activity.type.toUpperCase()}_EVENT</div>
                                <div className="text-sm text-gray-400 font-mono">{activity.description}</div>
                              </div>
                              <div className="text-right">
                                {activity.reward && (
                                  <div className="text-green-400 font-mono font-bold">{activity.reward}</div>
                                )}
                                {activity.amount && (
                                  <div className="text-yellow-400 font-mono font-bold">{activity.amount}</div>
                                )}
                                <div className="text-xs text-gray-500 font-mono">{activity.timestamp}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'positions' && (
              <div className="terminal-card">
                <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="terminal-text text-sm">active_positions.db</div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 font-mono text-yellow-400">{'>'} ACTIVE_POSITIONS.DB</h2>
                  <div className="space-y-4">
                    {mockPositions.map((position, i) => (
                      <div key={i} className="terminal-card border border-yellow-500/30">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-mono text-white text-lg">{position.market}</div>
                              <div className="text-sm text-gray-400 font-mono">outcome: <span className="text-blue-400">{position.outcome}</span></div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xl font-bold font-mono ${position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {position.pnl}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm font-mono">
                            <div>
                              <span className="text-gray-400">amount:</span>
                              <div className="text-white">${position.amount}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">avg_price:</span>
                              <div className="text-white">${position.avgPrice}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">current:</span>
                              <div className="text-white">${position.currentPrice}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs would be similar terminal-styled content */}
            {activeTab === 'achievements' && (
              <div className="terminal-card">
                <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="terminal-text text-sm">achievements.json</div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6 font-mono text-orange-400">{'>'} EARNED_BADGES.JSON</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockUser.achievements.map((achievement) => (
                      <div key={achievement.id} className="terminal-card border border-orange-500/30">
                        <div className="p-4 text-center">
                          <div className="text-4xl mb-3">{achievement.icon}</div>
                          <div className="font-mono font-bold text-orange-400 mb-1">{achievement.title.toUpperCase()}</div>
                          <div className="text-sm text-gray-400 font-mono">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 

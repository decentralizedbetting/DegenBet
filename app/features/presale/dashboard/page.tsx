'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WalletConnection } from '../components/WalletConnection';
import { ReferralSystem } from '../components/ReferralSystem';
import { SmartContractInterface } from '../components/SmartContractInterface';

export default function PresaleDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - replace with real data from smart contracts
  const [userData, setUserData] = useState({
    totalInvested: 37.5, // BNB
    tokensOwned: 187500, // DBT
    referralEarnings: 15420, // DBT
    vestingProgress: 23.7, // percentage
    nextClaimDate: new Date('2025-02-15'),
    claimableTokens: 12500
  });

  const handleConnect = (provider: string) => {
    // Simulate wallet connection
    setIsConnected(true);
    setWalletAddress('0x742d35Cc6631C0532925a3b8D45cfb8Ca4d47bd2');
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: '📊' },
    { id: 'vesting', label: 'VESTING', icon: '🔒' },
    { id: 'referrals', label: 'REFERRALS', icon: '🤝' },
    { id: 'activity', label: 'ACTIVITY', icon: '📝' }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="terminal-card mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-sm flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>dbt_dashboard.exe</span>
            </div>
          </div>
          <div className="p-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-black font-mono mb-4 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-green-400">{'>'}</span>{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                DBT_DASHBOARD
              </span>
            </motion.h1>
            <motion.p 
              className="text-center text-green-300 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {'>'} Manage your DegenBet Token holdings and rewards
            </motion.p>
          </div>
        </motion.div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnection 
            isConnected={isConnected} 
            onConnect={handleConnect}
            walletAddress={walletAddress}
          />
        </div>

        {isConnected ? (
          <>
            {/* Quick Stats */}
            <motion.div 
              className="terminal-card mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="terminal-text text-xs">portfolio_stats.sh</div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 font-mono mb-2">
                      {userData.totalInvested}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">BNB INVESTED</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 font-mono mb-2">
                      {userData.tokensOwned.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">DBT TOKENS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 font-mono mb-2">
                      {userData.referralEarnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">REF REWARDS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 font-mono mb-2">
                      {userData.vestingProgress}%
                    </div>
                    <div className="text-sm text-gray-400 font-mono">UNLOCKED</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div 
              className="terminal-card mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="terminal-text text-xs">navigation.sh</div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                          : 'bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:border-green-500/30 hover:text-green-300'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Portfolio Value */}
                  <div className="terminal-card">
                    <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div className="terminal-text text-xs">portfolio_value.sh</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-green-400 font-mono text-lg mb-4">PORTFOLIO_VALUE</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-mono">Initial Investment:</span>
                          <span className="text-green-400 font-mono">{userData.totalInvested} BNB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-mono">DBT Holdings:</span>
                          <span className="text-blue-400 font-mono">{userData.tokensOwned.toLocaleString()} DBT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-mono">Current DBT Price:</span>
                          <span className="text-yellow-400 font-mono">$0.0025</span>
                        </div>
                        <div className="border-t border-green-500/20 pt-4">
                          <div className="flex justify-between text-lg">
                            <span className="text-green-400 font-mono font-bold">Total Value:</span>
                            <span className="text-green-400 font-mono font-bold">
                              ${(userData.tokensOwned * 0.0025).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="terminal-card">
                    <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div className="terminal-text text-xs">quick_actions.sh</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-green-400 font-mono text-lg mb-4">QUICK_ACTIONS</h3>
                      <div className="space-y-3">
                        <button className="w-full btn-degen py-3 text-left flex items-center space-x-3">
                          <span>🔒</span>
                          <div>
                            <div className="font-mono">CLAIM_TOKENS</div>
                            <div className="text-xs text-gray-400">{userData.claimableTokens.toLocaleString()} DBT available</div>
                          </div>
                        </button>
                        <button className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg py-3 text-left flex items-center space-x-3 hover:border-purple-500/50 transition-colors">
                          <span>🤝</span>
                          <div>
                            <div className="font-mono">SHARE_REFERRAL</div>
                            <div className="text-xs text-gray-400">Earn 10% DBT for each referral</div>
                          </div>
                        </button>
                        <button className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg py-3 text-left flex items-center space-x-3 hover:border-blue-500/50 transition-colors">
                          <span>📊</span>
                          <div>
                            <div className="font-mono">VIEW_MARKETS</div>
                            <div className="text-xs text-gray-400">Start betting with DBT tokens</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vesting' && (
                <SmartContractInterface 
                  isConnected={isConnected} 
                  walletAddress={walletAddress}
                />
              )}

              {activeTab === 'referrals' && (
                <ReferralSystem 
                  userAddress={walletAddress} 
                  isConnected={isConnected}
                />
              )}

              {activeTab === 'activity' && (
                <div className="terminal-card">
                  <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <div className="terminal-text text-xs">activity_log.sh</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-green-400 font-mono text-lg mb-6">ACTIVITY_HISTORY</h3>
                    <div className="space-y-4">
                      {[
                        { type: 'PURCHASE', details: 'Bought 62,500 DBT for 12.5 BNB', date: '2024-12-10', status: 'SUCCESS' },
                        { type: 'PURCHASE', details: 'Bought 125,000 DBT for 25 BNB', date: '2024-12-01', status: 'SUCCESS' },
                        { type: 'REFERRAL', details: 'Earned 2,500 DBT from referral 0x3C...8F9', date: '2024-12-08', status: 'SUCCESS' },
                        { type: 'CLAIM', details: 'Claimed 18,750 DBT tokens', date: '2024-12-15', status: 'SUCCESS' }
                      ].map((activity, index) => (
                        <div key={index} className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 rounded text-xs font-mono ${
                                activity.type === 'PURCHASE' ? 'bg-blue-500/20 text-blue-400' :
                                activity.type === 'REFERRAL' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {activity.type}
                              </span>
                              <span className="text-gray-300 font-mono text-sm">{activity.details}</span>
                            </div>
                            <span className="text-green-400 text-xs font-mono">{activity.status}</span>
                          </div>
                          <div className="text-gray-500 text-xs font-mono">{activity.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-yellow-400 text-4xl">🔌</span>
            </div>
            <h2 className="text-yellow-400 font-mono text-2xl mb-4">WALLET_CONNECTION_REQUIRED</h2>
            <p className="text-gray-400 font-mono mb-8">
              {'>'} Connect your wallet to access your presale dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 

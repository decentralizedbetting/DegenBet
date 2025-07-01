'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock data - replace with real contract data
const PRESALE_DATA = {
  currentPhase: 'Private',
  totalGoal: 200000, // $200K USD
  currentRaised: 47350, // Current amount raised
  tokenPrice: 0.002, // $0.002 per DBT
  tokensAllocated: 100000000, // 100M DBT for private sale
  tokensSold: 23675000, // Tokens sold so far
  participants: 89,
  timeLeft: {
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 22
  }
};

export default function PresalePage() {
  const [countdown, setCountdown] = useState(PRESALE_DATA.timeLeft);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPercentage = (PRESALE_DATA.currentRaised / PRESALE_DATA.totalGoal) * 100;
  const tokenProgressPercentage = (PRESALE_DATA.tokensSold / PRESALE_DATA.tokensAllocated) * 100;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Terminal Header */}
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
              <span>presale_dbt.exe</span>
            </div>
          </div>
          <div className="p-8 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-black font-mono mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-green-400">{'>'}</span>{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                DBT_PRESALE.EXE
              </span>
            </motion.h1>
            <motion.div 
              className="space-y-2 text-green-300 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="flex items-center justify-center space-x-2">
                <span className="text-green-400">{'>'}</span>
                <span className="animate-pulse">Initializing DegenBet Token Private Sale...</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-green-400">{'>'}</span>
                <span className="text-yellow-400 font-bold">PHASE 1: PRIVATE</span>
                <span>|</span>
                <span className="text-purple-400">BNB Chain</span>
                <span>|</span>
                <span className="text-blue-400">${PRESALE_DATA.tokenPrice} per DBT</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Countdown Timer */}
          <motion.div 
            className="terminal-card lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-xs">countdown.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                <span className="text-green-400 mr-2">{'>'}</span>
                TIME_REMAINING
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'DAYS', value: countdown.days },
                  { label: 'HRS', value: countdown.hours },
                  { label: 'MIN', value: countdown.minutes },
                  { label: 'SEC', value: countdown.seconds }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-2">
                      <div className="text-2xl font-mono font-bold text-green-400">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-center">
                <span className="text-red-400 text-sm font-mono">
                  {'>'} PRIVATE_SALE_ENDING_SOON
                </span>
              </div>
            </div>
          </motion.div>

          {/* Progress Stats */}
          <motion.div 
            className="terminal-card lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="terminal-text text-xs">live_metrics.sh</div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 font-mono">
                    ${PRESALE_DATA.currentRaised.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400 font-mono">RAISED</div>
                  <div className="text-xs text-purple-400 font-mono">
                    / ${PRESALE_DATA.totalGoal.toLocaleString()} GOAL
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 font-mono">
                    {(PRESALE_DATA.tokensSold / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-400 font-mono">DBT SOLD</div>
                  <div className="text-xs text-purple-400 font-mono">
                    / {(PRESALE_DATA.tokensAllocated / 1000000)}M TOTAL
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 font-mono">
                    {PRESALE_DATA.participants}
                  </div>
                  <div className="text-sm text-gray-400 font-mono">DEGENS</div>
                  <div className="text-xs text-purple-400 font-mono">JOINED</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-green-400">USD PROGRESS</span>
                    <span className="text-yellow-400">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-green-500/30">
                    <motion.div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1.5, delay: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"></div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-green-400">TOKEN ALLOCATION</span>
                    <span className="text-yellow-400">{tokenProgressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-green-500/30">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${tokenProgressPercentage}%` }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Purchase Interface */}
        <motion.div 
          className="terminal-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-xs flex items-center space-x-1">
              <span>purchase_dbt.sh</span>
              {isConnected && <span className="text-green-400">● CONNECTED</span>}
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Purchase Form */}
              <div>
                <h3 className="text-green-400 font-mono text-xl mb-6 flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  PURCHASE_DBT_TOKENS
                </h3>
                
                {!isConnected ? (
                  <div className="space-y-4">
                    <div className="p-4 border border-yellow-500/30 bg-yellow-500/5 rounded-lg">
                      <p className="text-yellow-400 text-sm font-mono mb-2">
                        {'>'} Connect wallet to participate in private sale
                      </p>
                      <p className="text-gray-400 text-xs font-mono">
                        Supported: MetaMask, Trust Wallet, WalletConnect
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsConnected(true)}
                      className="w-full btn-degen py-4 text-lg font-mono flex items-center justify-center space-x-2"
                    >
                      <span>🔗</span>
                      <span>CONNECT_WALLET</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-green-400 text-sm font-mono mb-2">
                          BNB AMOUNT
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={purchaseAmount}
                            onChange={(e) => setPurchaseAmount(e.target.value)}
                            className="w-full bg-black/50 border border-green-500/30 text-green-400 rounded-lg font-mono pl-4 pr-16 py-4 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            placeholder="0.1"
                          />
                          <span className="absolute right-4 top-4 text-yellow-400 font-mono">BNB</span>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                        <div className="flex justify-between text-sm font-mono mb-2">
                          <span className="text-gray-400">You'll receive:</span>
                          <span className="text-green-400">
                            {purchaseAmount ? (parseFloat(purchaseAmount || '0') * 400 * 500).toLocaleString() : '0'} DBT
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-mono mb-2">
                          <span className="text-gray-400">Price per DBT:</span>
                          <span className="text-yellow-400">$0.002</span>
                        </div>
                        <div className="flex justify-between text-sm font-mono">
                          <span className="text-gray-400">5% Bonus (5+ BNB):</span>
                          <span className="text-purple-400">
                            {parseFloat(purchaseAmount || '0') >= 5 ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full btn-degen py-4 text-lg font-mono">
                      PURCHASE_DBT_TOKENS
                    </button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-mono">
                        Min: 0.1 BNB | Max: 50 BNB | 10% TGE + 6mo vesting
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tokenomics Preview */}
              <div>
                <h3 className="text-green-400 font-mono text-xl mb-6 flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  DBT_TOKENOMICS
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Private Presale', percent: '10%', amount: '100M DBT', color: 'text-green-400' },
                    { label: 'Public Presale', percent: '15%', amount: '150M DBT', color: 'text-blue-400' },
                    { label: 'Liquidity', percent: '20%', amount: '200M DBT', color: 'text-purple-400' },
                    { label: 'Team & Founders', percent: '15%', amount: '150M DBT', color: 'text-yellow-400' },
                    { label: 'Platform Rewards', percent: '15%', amount: '150M DBT', color: 'text-emerald-400' },
                    { label: 'Development', percent: '10%', amount: '100M DBT', color: 'text-orange-400' },
                    { label: 'Marketing', percent: '10%', amount: '100M DBT', color: 'text-pink-400' },
                    { label: 'DAO Treasury', percent: '5%', amount: '50M DBT', color: 'text-red-400' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-300 text-sm font-mono">{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-mono ${item.color}`}>{item.percent}</span>
                        <span className="text-xs text-gray-500 font-mono">{item.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 border border-purple-500/30 bg-purple-500/5 rounded-lg">
                  <p className="text-purple-400 text-sm font-mono mb-2">
                    {'>'} TOTAL_SUPPLY: 1,000,000,000 DBT
                  </p>
                  <p className="text-gray-400 text-xs font-mono">
                    BNB Smart Chain | Betting Currency | DAO Governance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div 
          className="terminal-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-xs">live_feed.sh</div>
          </div>
          <div className="p-6">
            <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
              <span className="text-green-400 mr-2">{'>'}</span>
              LIVE_DEGEN_ACTIVITY
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-terminal">
              {[
                { address: '0x7B...4D9', amount: '12.5 BNB', tokens: '25,000 DBT', time: '2 min ago' },
                { address: '0x9C...8F2', amount: '25.0 BNB', tokens: '52,500 DBT', time: '5 min ago' },
                { address: '0x3A...1B7', amount: '8.2 BNB', tokens: '17,220 DBT', time: '8 min ago' },
                { address: '0x6E...5C4', amount: '50.0 BNB', tokens: '105,000 DBT', time: '12 min ago' },
                { address: '0x2F...9D8', amount: '15.7 BNB', tokens: '32,970 DBT', time: '18 min ago' }
              ].map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/10 rounded text-sm font-mono">
                  <div className="flex items-center space-x-4">
                    <span className="text-green-400">{'>'}</span>
                    <span className="text-purple-400">{tx.address}</span>
                    <span className="text-yellow-400">{tx.amount}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-400">{tx.tokens}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{tx.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 

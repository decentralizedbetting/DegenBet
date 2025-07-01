'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WhitelistPage() {
  const [email, setEmail] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whitelistStats, setWhitelistStats] = useState({
    totalRegistered: 2847,
    spotsRemaining: 1153,
    lastRegistrations: [
      { handle: '@degen_king', time: '2 min ago', bonus: '5% bonus' },
      { handle: '@crypto_wolf', time: '5 min ago', bonus: '3% bonus' },
      { handle: '@bnb_maxi', time: '8 min ago', bonus: '2% bonus' },
      { handle: '@defi_degen', time: '12 min ago', bonus: '1% bonus' }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWhitelistStats(prev => ({
        ...prev,
        totalRegistered: prev.totalRegistered + Math.floor(Math.random() * 3),
        spotsRemaining: Math.max(0, prev.spotsRemaining - Math.floor(Math.random() * 3))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const progressPercentage = ((4000 - whitelistStats.spotsRemaining) / 4000) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">

        <motion.div 
          className="terminal-card max-w-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-xs">whitelist_success.sh</div>
          </div>
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-green-400 text-4xl">✅</span>
            </div>
            <h2 className="text-green-400 font-mono text-2xl mb-4">WHITELIST_REGISTRATION_COMPLETE</h2>
            <div className="space-y-3 text-sm font-mono mb-6">
              <p className="text-gray-300">
                {'>'} You're now on the DBT Private Sale whitelist!
              </p>
              <p className="text-yellow-400">
                {'>'} You'll receive early access 24 hours before public launch
              </p>
              <p className="text-purple-400">
                {'>'} Check your email for whitelist confirmation & next steps
              </p>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
              <div className="text-green-400 text-sm font-mono mb-2">EXCLUSIVE_WHITELIST_BONUSES:</div>
              <div className="space-y-1 text-xs font-mono text-gray-300">
                <p>• 5% extra DBT tokens for first 100 purchasers</p>
                <p>• Priority access to future DegenBet features</p>
                <p>• Referral rewards doubled during presale</p>
                <p>• Governance voting rights from day 1</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => window.open('https://twitter.com/intent/tweet?text=Just joined the @DegenBet DBT private sale whitelist! 🔥 The future of decentralized betting is here. Get early access: presale.degenbet.xyz/whitelist', '_blank')}
                className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg py-3 font-mono hover:border-blue-500/50 transition-colors"
              >
                SHARE_ON_TWITTER 🐦
              </button>
              <button 
                onClick={() => window.location.href = '/presale'}
                className="w-full btn-degen py-3 font-mono"
              >
                VIEW_PRESALE_PAGE →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>dbt_whitelist.exe</span>
            </div>
          </div>
          <div className="p-8 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-black font-mono mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-yellow-400">{'>'}</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                EARLY_ACCESS_WHITELIST
              </span>
            </motion.h1>
            <motion.div 
              className="space-y-2 text-green-300 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="flex items-center justify-center space-x-2">
                <span className="text-yellow-400">{'>'}</span>
                <span className="animate-pulse">Join the DBT Private Sale Whitelist</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-yellow-400">{'>'}</span>
                <span className="text-red-400 font-bold">LIMITED TO 4,000 SPOTS</span>
                <span>|</span>
                <span className="text-purple-400">EXCLUSIVE BONUSES</span>
                <span>|</span>
                <span className="text-blue-400">EARLY ACCESS</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Whitelist Registration Form */}
          <motion.div 
            className="terminal-card"
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
              <div className="terminal-text text-xs">registration.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-green-400 font-mono text-xl mb-6 flex items-center">
                <span className="text-green-400 mr-2">{'>'}</span>
                REGISTER_FOR_WHITELIST
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2">
                    EMAIL_ADDRESS *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/50 border border-green-500/30 text-green-400 rounded-lg font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="degen@example.com"
                  />
                </div>

                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2">
                    TWITTER_HANDLE *
                  </label>
                  <input
                    type="text"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    required
                    className="w-full bg-black/50 border border-green-500/30 text-green-400 rounded-lg font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="@your_handle"
                  />
                </div>

                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2">
                    TELEGRAM_HANDLE (optional)
                  </label>
                  <input
                    type="text"
                    value={telegramHandle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
                    className="w-full bg-black/50 border border-green-500/30 text-green-400 rounded-lg font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="@telegram_username"
                  />
                </div>

                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2">
                    REFERRAL_CODE (optional)
                  </label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="w-full bg-black/50 border border-green-500/30 text-green-400 rounded-lg font-mono px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    placeholder="DBTXXXXX"
                  />
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-400">⚡</span>
                    <span className="text-yellow-400 font-mono text-sm">WHITELIST_BENEFITS</span>
                  </div>
                  <ul className="text-gray-300 text-xs font-mono space-y-1">
                    <li>• 24-hour early access before public sale</li>
                    <li>• 5% bonus DBT for first 100 purchasers</li>
                    <li>• Double referral rewards during presale</li>
                    <li>• Priority support and updates</li>
                    <li>• Governance voting rights from TGE</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email || !twitterHandle}
                  className={`w-full py-4 rounded-lg font-mono text-lg transition-all duration-200 ${
                    isLoading || !email || !twitterHandle
                      ? 'bg-gray-500/20 border border-gray-500/30 text-gray-500 cursor-not-allowed'
                      : 'btn-degen'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>REGISTERING...</span>
                    </div>
                  ) : (
                    'JOIN_WHITELIST_NOW'
                  )}
                </button>

                <p className="text-xs text-gray-500 font-mono text-center">
                  By registering, you agree to receive updates about the DBT presale
                </p>
              </form>
            </div>
          </motion.div>

          {/* Whitelist Stats & Social Proof */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <motion.div 
              className="terminal-card"
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
                <div className="terminal-text text-xs">whitelist_stats.sh</div>
              </div>
              <div className="p-6">
                <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  WHITELIST_PROGRESS
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 font-mono">
                      {whitelistStats.totalRegistered.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">REGISTERED</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400 font-mono">
                      {whitelistStats.spotsRemaining.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">REMAINING</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-green-400">WHITELIST PROGRESS</span>
                    <span className="text-yellow-400">{progressPercentage.toFixed(1)}% FULL</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-green-500/30">
                    <motion.div 
                      className="bg-gradient-to-r from-yellow-500 to-red-500 h-full rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1.5, delay: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"></div>
                    </motion.div>
                  </div>
                </div>

                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-center">
                  <span className="text-red-400 text-sm font-mono animate-pulse">
                    {'>'} ONLY {whitelistStats.spotsRemaining.toLocaleString()} SPOTS REMAINING
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Recent Registrations */}
            <motion.div 
              className="terminal-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="terminal-text text-xs">live_registrations.sh</div>
              </div>
              <div className="p-6">
                <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  RECENT_REGISTRATIONS
                </h3>
                <div className="space-y-3">
                  {whitelistStats.lastRegistrations.map((reg, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/10 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">{'>'}</span>
                        <span className="text-purple-400 font-mono text-sm">{reg.handle}</span>
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-mono">
                          {reg.bonus}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs font-mono">{reg.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="terminal-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="terminal-text text-xs">social_proof.sh</div>
              </div>
              <div className="p-6">
                <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  COMMUNITY_BUZZ
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-blue-400">🐦</span>
                      <span className="text-blue-400 font-mono text-sm">@crypto_influencer</span>
                    </div>
                    <p className="text-gray-300 text-sm font-mono">
                      "DegenBet is going to revolutionize prediction markets on BNB Chain. 
                      Already whitelisted for the DBT presale! 🚀"
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-purple-400">📱</span>
                      <span className="text-purple-400 font-mono text-sm">@defi_research</span>
                    </div>
                    <p className="text-gray-300 text-sm font-mono">
                      "The tokenomics look solid. 10% TGE, fair vesting, and actual utility. 
                      This could be the Polymarket of BNB Chain."
                    </p>
                  </div>

                  <div className="text-center mt-6">
                    <button 
                      onClick={() => window.open('https://twitter.com/search?q=%23DegenBet', '_blank')}
                      className="text-blue-400 font-mono text-sm hover:text-blue-300 transition-colors"
                    >
                      {'>'} See more community reactions on Twitter
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 

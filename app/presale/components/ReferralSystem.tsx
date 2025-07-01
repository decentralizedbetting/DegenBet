'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ReferralSystemProps {
  userAddress?: string;
  isConnected: boolean;
}

export function ReferralSystem({ userAddress, isConnected }: ReferralSystemProps) {
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 7,
    totalEarned: 15420,
    pendingRewards: 2840,
    recentReferrals: [
      { address: '0x3C...8F9', amount: 12.5, reward: 2500, time: '2 hours ago' },
      { address: '0x7A...2D4', amount: 25.0, reward: 5000, time: '8 hours ago' },
      { address: '0x9E...5B7', amount: 8.3, reward: 1660, time: '1 day ago' }
    ]
  });
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (userAddress && isConnected) {
      // Generate referral code based on wallet address
      const code = `DBT${userAddress.slice(2, 8).toUpperCase()}`;
      setReferralCode(code);
    }
  }, [userAddress, isConnected]);

  const copyReferralLink = async () => {
    const referralLink = `https://presale.degenbet.xyz?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOnTwitter = () => {
    const text = `Just joined the @DegenBet DBT private sale! 🔥 The future of decentralized prediction markets is here. Get your DBT tokens with my referral code: ${referralCode}`;
    const url = `https://presale.degenbet.xyz?ref=${referralCode}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = `🚀 DegenBet Private Sale is LIVE! Get DBT tokens at $0.002 each. Use my referral code: ${referralCode} for exclusive benefits! https://presale.degenbet.xyz?ref=${referralCode}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(`https://presale.degenbet.xyz?ref=${referralCode}`)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnDiscord = () => {
    const text = `🔥 DegenBet Private Sale Alert! \n\nGet your DBT tokens now at $0.002 each!\nUse referral code: ${referralCode}\nLink: https://presale.degenbet.xyz?ref=${referralCode}\n\nBe part of the future of prediction markets! 💎`;
    navigator.clipboard.writeText(text);
    alert('Discord message copied to clipboard! Paste it in your Discord server.');
  };

  if (!isConnected) {
    return (
      <div className="terminal-card">
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs">referral_system.sh</div>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-400 text-2xl">🤝</span>
          </div>
          <h3 className="text-purple-400 font-mono text-lg mb-2">REFERRAL_SYSTEM</h3>
          <p className="text-gray-400 font-mono text-sm">
            {'>'} Connect wallet to access referral rewards
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Referral Overview */}
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">referral_program.sh</div>
        </div>
        <div className="p-6">
          <h3 className="text-green-400 font-mono text-xl mb-6 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            REFERRAL_EARNINGS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 font-mono">
                {referralStats.totalReferrals}
              </div>
              <div className="text-sm text-gray-400 font-mono">TOTAL REFS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 font-mono">
                {referralStats.totalEarned.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">DBT EARNED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 font-mono">
                {referralStats.pendingRewards.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">PENDING</div>
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-purple-400">🎯</span>
              <span className="text-purple-400 font-mono text-sm">REFERRAL_REWARDS</span>
            </div>
            <p className="text-gray-300 text-sm font-mono mb-2">
              {'>'} Earn 10% in DBT tokens for every successful referral
            </p>
            <p className="text-gray-400 text-xs font-mono">
              When your referral purchases DBT, you earn 10% of their purchase amount in bonus DBT tokens
            </p>
          </div>

          {/* Referral Link */}
          <div className="space-y-4">
            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                YOUR_REFERRAL_CODE
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="flex-1 bg-black/50 border border-green-500/30 text-green-400 rounded-lg font-mono px-4 py-3 focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={copyReferralLink}
                  className={`px-6 py-3 rounded-lg font-mono transition-all duration-200 ${
                    copySuccess 
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                      : 'bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:border-purple-500/50'
                  }`}
                >
                  {copySuccess ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <span className="text-blue-400 text-sm">📱</span>
                <div className="text-blue-400 text-sm font-mono">
                  <p className="mb-1">Share on social media:</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 rounded text-xs hover:bg-blue-600/30 transition-colors" onClick={shareOnTwitter}>
                      TWITTER
                    </button>
                    <button className="px-3 py-1 bg-indigo-600/20 border border-indigo-600/30 rounded text-xs hover:bg-indigo-600/30 transition-colors" onClick={shareOnTelegram}>
                      TELEGRAM
                    </button>
                    <button className="px-3 py-1 bg-purple-600/20 border border-purple-600/30 rounded text-xs hover:bg-purple-600/30 transition-colors" onClick={shareOnDiscord}>
                      DISCORD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Referrals */}
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">referral_activity.sh</div>
        </div>
        <div className="p-6">
          <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            RECENT_REFERRAL_ACTIVITY
          </h3>
          <div className="space-y-3">
            {referralStats.recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/10 rounded">
                <div className="flex items-center space-x-4">
                  <span className="text-green-400">{'>'}</span>
                  <span className="text-purple-400 font-mono text-sm">{referral.address}</span>
                  <span className="text-yellow-400 font-mono text-sm">{referral.amount} BNB</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-green-400 font-mono text-sm">+{referral.reward} DBT</span>
                </div>
                <span className="text-gray-500 text-xs font-mono">{referral.time}</span>
              </div>
            ))}
          </div>

          {referralStats.recentReferrals.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-500/20 border border-gray-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📊</span>
              </div>
              <p className="text-gray-400 font-mono text-sm">
                {'>'} No referrals yet. Share your link to start earning!
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Referral Leaderboard */}
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">leaderboard.sh</div>
        </div>
        <div className="p-6">
          <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            TOP_REFERRERS
          </h3>
          <div className="space-y-2">
            {[
              { rank: 1, address: '0x8F...3D2', referrals: 23, earned: 47500, badge: '🥇' },
              { rank: 2, address: '0x4A...7B9', referrals: 18, earned: 35200, badge: '🥈' },
              { rank: 3, address: '0x9C...1F8', referrals: 15, earned: 28900, badge: '🥉' },
              { rank: 4, address: userAddress || '0x7D...5E4', referrals: 7, earned: 15420, badge: '' }
            ].map((user, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded ${
                  user.address === userAddress 
                    ? 'bg-purple-500/10 border border-purple-500/30' 
                    : 'bg-gray-500/5 border border-gray-500/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg">{user.badge || user.rank}</span>
                  <span className={`font-mono text-sm ${
                    user.address === userAddress ? 'text-purple-400' : 'text-green-400'
                  }`}>
                    {user.address}
                  </span>
                  {user.address === userAddress && (
                    <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded font-mono">
                      YOU
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm font-mono">
                  <span className="text-yellow-400">{user.referrals} refs</span>
                  <span className="text-green-400">{user.earned.toLocaleString()} DBT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 

"use client";

import Link from 'next/link';

export default function TokenPage() {
  const tokenUtilities = [
    {
      title: "DAO_GOVERNANCE",
      description: "Vote on protocol upgrades and degen proposals",
      icon: "🏛️",
      status: "ACTIVE",
      file: "governance.dao"
    },
    {
      title: "DIAMOND_STAKING", 
      description: "Stake $DBT for passive income and rewards",
      icon: "💎",
      status: "LIVE",
      file: "staking.sol"
    },
    {
      title: "FEE_DISCOUNTS",
      description: "Reduced trading fees for true diamond hands",
      icon: "⚡",
      status: "ACTIVE", 
      file: "discounts.exe"
    },
    {
      title: "PREMIUM_ACCESS",
      description: "Exclusive features for elite degen tier",
      icon: "👑",
      status: "BETA",
      file: "premium.sh"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
                  <Link href="/" className="text-green-400 hover:text-green-300">{'>'} /home</Link>
                  <span className="text-gray-500">/</span>
                  <span className="text-white">dbt_token.erc20</span>
            </nav>
          </div>
            </div>
          </div>

          {/* Terminal Header */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">dbt_tokenomics.exe</div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-5xl font-black mb-4 font-mono">
                <span className="text-green-400">$</span>DBT_TOKEN.SOL
              </h1>
              <p className="text-green-300 font-mono leading-relaxed">
                {'>'} The ultimate degen governance token
                <br />
                {'>'} Power your diamond hands with true utility
                <br />
                {'>'} Only the strongest hodlers survive in this economy
              </p>
            </div>
          </div>

          {/* Terminal Token Stats */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">token_stats.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-orange-400">
                {'>'} LIVE_TOKEN_METRICS.EXE
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="terminal-card border border-orange-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-orange-400 mb-2">1M</div>
                    <div className="text-sm text-gray-500 font-mono">MAX_SUPPLY</div>
                    <div className="text-xs text-orange-400 font-mono mt-1">CAPPED FOREVER</div>
                  </div>
                </div>
                <div className="terminal-card border border-orange-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-orange-400 mb-2">690K</div>
                    <div className="text-sm text-gray-500 font-mono">CIRCULATING</div>
                    <div className="text-xs text-green-400 font-mono mt-1">69% IN CIRCULATION</div>
                  </div>
                </div>
                <div className="terminal-card border border-orange-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-orange-400 mb-2">42%</div>
                    <div className="text-sm text-gray-500 font-mono">STAKING_APY</div>
                    <div className="text-xs text-purple-400 font-mono mt-1">DIAMOND HANDS ONLY</div>
                  </div>
                </div>
                <div className="terminal-card border border-orange-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-orange-400 mb-2">4.2K</div>
                    <div className="text-sm text-gray-500 font-mono">HODLERS</div>
                    <div className="text-xs text-blue-400 font-mono mt-1">ELITE DEGENS</div>
                  </div>
                </div>
              </div>
                </div>
              </div>

          {/* Terminal Utilities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tokenUtilities.map((utility, index) => (
              <div key={index} className="terminal-card">
                <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="terminal-text text-xs">{utility.file}</div>
                </div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{utility.icon}</span>
                  </div>
                  <h3 className="font-mono font-bold mb-2 text-orange-400">{utility.title}</h3>
                  <p className="text-gray-400 text-sm font-mono mb-3">{utility.description}</p>
                  <span className={`px-2 py-1 text-xs rounded font-mono ${
                    utility.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                    utility.status === 'LIVE' ? 'bg-blue-500/20 text-blue-400' :
                    utility.status === 'BETA' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {utility.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Distribution */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">token_distribution.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-purple-400">
                {'>'} TOKEN_ALLOCATION.EXE
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-3xl font-black font-mono text-purple-400 mb-2">30%</div>
                    <div className="text-lg font-mono text-white mb-1">COMMUNITY_REWARDS</div>
                    <div className="text-sm text-gray-400 font-mono">For the true degen contributors</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-3xl font-black font-mono text-purple-400 mb-2">25%</div>
                    <div className="text-lg font-mono text-white mb-1">STAKING_POOL</div>
                    <div className="text-sm text-gray-400 font-mono">Diamond hands get rewarded</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-3xl font-black font-mono text-purple-400 mb-2">45%</div>
                    <div className="text-lg font-mono text-white mb-1">PUBLIC_SALE</div>
                    <div className="text-sm text-gray-400 font-mono">Available for all degens</div>
                  </div>
                </div>
                  </div>
                </div>
              </div>

          {/* Terminal Actions */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">token_actions.sh</div>
            </div>
            <div className="p-6 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/governance">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} VIEW_GOVERNANCE.DAO
                  </button>
                </Link>
                <button className="btn-degen w-full sm:w-auto font-mono text-black">
                  {'>'} BUY_DBT.EXE (SOON™)
                </button>
              </div>
              <div className="mt-6 p-4 border border-yellow-500/30 rounded bg-yellow-500/5">
                <p className="text-yellow-400 font-mono text-sm">
                  {'>'} WARNING: Only true degens should hold $DBT tokens
                  <br />
                  {'>'} Paper hands will get REKT by diamond hands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

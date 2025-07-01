"use client";

import Link from 'next/link';

export default function TokenPage() {
  const tokenUtilities = [
    {
      title: "PREDICTION_BETTING",
      description: "Primary currency for all market trading & position taking",
      examples: ["BTC price bets", "Sports outcomes", "Political events"],
      value: "100% platform volume",
      icon: "💎",
      status: "POST-PRESALE",
      file: "trading.sol"
    },
    {
      title: "DAO_GOVERNANCE",
      description: "Vote on protocol upgrades, market categories & treasury decisions",
      examples: ["New market types", "Fee structures", "Treasury allocation"],
      value: "1 DBT = 1 Vote",
      icon: "🏛️",
      status: "ACTIVE",
      file: "governance.dao"
    },
    {
      title: "STAKING_VIP_ACCESS",
      description: "Higher betting limits, early access & reduced fees through staking",
      examples: ["$10K limits vs $1K", "24h early access", "Premium features"],
      value: "50% APY rewards",
      icon: "⚡",
      status: "POST-PRESALE", 
      file: "staking.exe"
    },
    {
      title: "PLATFORM_FEE_DISCOUNTS",
      description: "Reduced platform & trading fees when using DBT",
      examples: ["2.5% → 1.5% fees", "0.5% → 0.25%", "Creator discounts"],
      value: "Up to 50% savings",
      icon: "💰",
      status: "POST-PRESALE",
      file: "fees.sol"
    },
    {
      title: "REFERRAL_REWARDS",
      description: "Earn DBT through referral campaigns & airdrop programs",
      examples: ["10% of friend's trades", "Airdrops", "Community rewards"],
      value: "Unlimited earning",
      icon: "🚀",
      status: "ACTIVE",
      file: "referrals.exe"
    },
    {
      title: "REVENUE_SHARE",
      description: "DAO-controlled distribution of platform fees to DBT stakers",
      examples: ["Quarterly distributions", "Fee sharing", "Yield farming"],
      value: "2-5% quarterly yield",
      icon: "🏦",
      status: "DAO-CONTROLLED",
      file: "treasury.sol"
    },
    {
      title: "INSURANCE_VAULT",
      description: "Stake DBT to cover market risks & earn risk-adjusted returns",
      examples: ["Market insurance", "Dispute resolution", "Risk coverage"],
      value: "Risk-adjusted returns",
      icon: "🛡️",
      status: "POST-PRESALE",
      file: "insurance.sol"
    },
    {
      title: "CREATOR_PERKS",
      description: "Exclusive benefits for market creators & premium features",
      examples: ["50% deployment discount", "Priority listing", "Custom markets"],
      value: "Creator advantages",
      icon: "👑",
      status: "PRESALE-EXCLUSIVE",
      file: "creator.sh"
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
                {'>'} The native governance token for DegenBet ecosystem
                <br />
                {'>'} 1 Billion total supply • BNB Smart Chain • DAO controlled
                <br />
                <span className="text-orange-400 font-bold">{'>'} Private presale LIVE: $0.002/DBT • Limited time! 🚀</span>
              </p>
            </div>
          </div>

          {/* Presale CTA */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-orange-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">presale_opportunity.sh</div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-mono font-bold mb-3 text-orange-400">PRESALE PRICING TIERS</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="terminal-card border border-orange-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-orange-400 mb-1">$0.002</div>
                    <div className="text-sm text-white font-mono mb-1">PRIVATE SALE</div>
                    <div className="text-xs text-gray-400 font-mono">Currently Active • $200K Goal</div>
                  </div>
                </div>
                <div className="terminal-card border border-yellow-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-yellow-400 mb-1">$0.003</div>
                    <div className="text-sm text-white font-mono mb-1">PUBLIC SALE</div>
                    <div className="text-xs text-gray-400 font-mono">Coming Soon • $450K Goal</div>
                  </div>
                </div>
                <div className="terminal-card border border-green-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-green-400 mb-1">$0.005</div>
                    <div className="text-sm text-white font-mono mb-1">DEX LAUNCH</div>
                    <div className="text-xs text-gray-400 font-mono">PancakeSwap Listing</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/presale">
                  <button className="btn-degen w-full sm:w-auto font-mono text-black text-lg px-8 py-3">
                    {'>'} JOIN_PRESALE.EXE
                  </button>
                </Link>
                <Link href="/presale/whitelist">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono text-lg px-8 py-3">
                    {'>'} GET_WHITELISTED.SH
                  </button>
                </Link>
              </div>
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
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-purple-400">
                {'>'} DBT_TOKEN_METRICS.EXE
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-purple-400 mb-2">1B</div>
                    <div className="text-sm text-gray-500 font-mono">MAX_SUPPLY</div>
                    <div className="text-xs text-purple-400 font-mono mt-1">FIXED FOREVER</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-purple-400 mb-2">250M</div>
                    <div className="text-sm text-gray-500 font-mono">PRESALE_TOKENS</div>
                    <div className="text-xs text-green-400 font-mono mt-1">25% TOTAL SUPPLY</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-purple-400 mb-2">BNB</div>
                    <div className="text-sm text-gray-500 font-mono">CHAIN</div>
                    <div className="text-xs text-yellow-400 font-mono mt-1">LOW FEES</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-6">
                    <div className="text-4xl font-black font-mono text-purple-400 mb-2">1.2K</div>
                    <div className="text-sm text-gray-500 font-mono">HOLDERS</div>
                    <div className="text-xs text-blue-400 font-mono mt-1">EARLY ADOPTERS</div>
                  </div>
                </div>
              </div>
                </div>
              </div>

          {/* Terminal Utility Breakdown */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">utility_breakdown.exe</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-green-400">
                {'>'} DBT_UTILITY_MATRIX.SOL
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-green-500/20">
                      <th className="text-left p-3 font-mono text-green-400 text-sm">UTILITY</th>
                      <th className="text-left p-3 font-mono text-green-400 text-sm">DESCRIPTION</th>
                      <th className="text-left p-3 font-mono text-green-400 text-sm">EXAMPLES</th>
                      <th className="text-left p-3 font-mono text-green-400 text-sm">VALUE</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm">
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3 text-orange-400 font-bold">PREDICTION_BETTING</td>
                      <td className="p-3 text-gray-300">Primary currency for all market trading</td>
                      <td className="p-3 text-gray-400">BTC price bets, sports outcomes</td>
                      <td className="p-3 text-purple-300 font-bold">100% platform volume</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3 text-orange-400 font-bold">DAO_GOVERNANCE</td>
                      <td className="p-3 text-gray-300">Vote on protocol upgrades & decisions</td>
                      <td className="p-3 text-gray-400">Market categories, fee structures</td>
                      <td className="p-3 text-purple-300 font-bold">1 DBT = 1 Vote</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3 text-orange-400 font-bold">STAKING_VIP_ACCESS</td>
                      <td className="p-3 text-gray-300">Higher limits & early access through staking</td>
                      <td className="p-3 text-gray-400">$10K limits, 24h early access</td>
                      <td className="p-3 text-purple-300 font-bold">50% APY rewards</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3 text-orange-400 font-bold">FEE_DISCOUNTS</td>
                      <td className="p-3 text-gray-300">Reduced platform & trading fees</td>
                      <td className="p-3 text-gray-400">2.5% → 1.5% fees</td>
                      <td className="p-3 text-purple-300 font-bold">Up to 50% savings</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3 text-orange-400 font-bold">REFERRAL_REWARDS</td>
                      <td className="p-3 text-gray-300">Earn through referral campaigns</td>
                      <td className="p-3 text-gray-400">10% of friend's trades</td>
                      <td className="p-3 text-purple-300 font-bold">Unlimited earning</td>
                    </tr>
                    <tr className="border-b border-gray-700/30">
                      <td className="p-3 text-orange-400 font-bold">REVENUE_SHARE</td>
                      <td className="p-3 text-gray-300">Platform fee distributions to stakers</td>
                      <td className="p-3 text-gray-400">Quarterly distributions</td>
                      <td className="p-3 text-purple-300 font-bold">2-5% quarterly yield</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-orange-400 font-bold">INSURANCE_VAULT</td>
                      <td className="p-3 text-gray-300">Stake to cover market risks</td>
                      <td className="p-3 text-gray-400">Market insurance, disputes</td>
                      <td className="p-3 text-purple-300 font-bold">Risk-adjusted returns</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Terminal Utilities */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{utility.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono font-bold mb-2 text-orange-400">{utility.title}</h3>
                      <p className="text-gray-400 text-sm font-mono mb-3 leading-relaxed">{utility.description}</p>
                      
                      {utility.examples && (
                        <div className="mb-3">
                          <div className="text-xs text-green-400 font-mono mb-1">{'>'} Examples:</div>
                          <div className="text-xs text-gray-500 font-mono">
                            {utility.examples.map((example, i) => (
                              <div key={i}>• {example}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {utility.value && (
                        <div className="mb-3">
                          <div className="text-xs text-purple-400 font-mono mb-1">{'>'} Value:</div>
                          <div className="text-xs text-purple-300 font-mono font-bold">{utility.value}</div>
                        </div>
                      )}
                      
                      <span className={`inline-block px-2 py-1 text-xs rounded font-mono border ${
                        utility.status === 'LIVE' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        utility.status === 'ACTIVE' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                        utility.status === 'POST-PRESALE' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        utility.status === 'DAO-CONTROLLED' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                        utility.status === 'PRESALE-EXCLUSIVE' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}>
                        {utility.status}
                      </span>
                    </div>
                  </div>
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
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-blue-400">
                {'>'} TOKEN_ALLOCATION.EXE (1B DBT)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">10%</div>
                    <div className="text-sm font-mono text-white mb-1">PRIVATE_SALE</div>
                    <div className="text-xs text-gray-400 font-mono">100M DBT • $0.002</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">15%</div>
                    <div className="text-sm font-mono text-white mb-1">PUBLIC_SALE</div>
                    <div className="text-xs text-gray-400 font-mono">150M DBT • $0.003</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">20%</div>
                    <div className="text-sm font-mono text-white mb-1">LIQUIDITY</div>
                    <div className="text-xs text-gray-400 font-mono">200M DBT • PancakeSwap</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">15%</div>
                    <div className="text-sm font-mono text-white mb-1">TEAM</div>
                    <div className="text-xs text-gray-400 font-mono">150M DBT • 24mo vesting</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">15%</div>
                    <div className="text-sm font-mono text-white mb-1">INCENTIVES</div>
                    <div className="text-xs text-gray-400 font-mono">150M DBT • User rewards</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">10%</div>
                    <div className="text-sm font-mono text-white mb-1">DEVELOPMENT</div>
                    <div className="text-xs text-gray-400 font-mono">100M DBT • Platform growth</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">10%</div>
                    <div className="text-sm font-mono text-white mb-1">MARKETING</div>
                    <div className="text-xs text-gray-400 font-mono">100M DBT • Growth campaigns</div>
                  </div>
                </div>
                <div className="terminal-card border border-blue-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-blue-400 mb-1">5%</div>
                    <div className="text-sm font-mono text-white mb-1">DAO_TREASURY</div>
                    <div className="text-xs text-gray-400 font-mono">50M DBT • Community fund</div>
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
                <Link href="/presale">
                  <button className="btn-degen w-full sm:w-auto font-mono text-black">
                    {'>'} BUY_DBT.EXE
                  </button>
                </Link>
                <Link href="/presale/dashboard">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} TRACK_PRESALE.SH
                  </button>
                </Link>
              </div>
              <div className="mt-6 p-4 border border-yellow-500/30 rounded bg-yellow-500/5">
                <p className="text-yellow-400 font-mono text-sm">
                  {'>'} WARNING: Limited presale spots available
                  <br />
                  {'>'} Early adopters get maximum governance power & rewards
                  <br />
                  {'>'} Don't miss the private sale at $0.002/DBT!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

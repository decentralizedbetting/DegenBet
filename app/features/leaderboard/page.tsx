"use client";

import Link from 'next/link';

export default function LeaderboardPage() {
  const topDegens = [
    { rank: 1, name: "presale_whale_1", profit: "+$42,069", accuracy: "94%", streak: "28", rekt: "0", badge: "🚀", status: "PRESALE", dbtHoldings: "500K" },
    { rank: 2, name: "diamond_hands_dao", profit: "+$25,420", accuracy: "89%", streak: "22", rekt: "1", badge: "💎", status: "PRESALE", dbtHoldings: "350K" },
    { rank: 3, name: "early_adopter_chad", profit: "+$18,888", accuracy: "86%", streak: "19", rekt: "2", badge: "⚡", status: "PRESALE", dbtHoldings: "250K" },
    { rank: 4, name: "governance_master", profit: "+$15,555", accuracy: "83%", streak: "16", rekt: "1", badge: "🏛️", status: "PRESALE", dbtHoldings: "200K" },
    { rank: 5, name: "degen_founder", profit: "+$12,345", accuracy: "81%", streak: "14", rekt: "3", badge: "🔥", status: "PRESALE", dbtHoldings: "180K" },
    { rank: 6, name: "market_creator_og", profit: "+$9,876", accuracy: "78%", streak: "12", rekt: "2", badge: "⭐", status: "DEMO", dbtHoldings: "0" },
    { rank: 7, name: "prediction_wizard", profit: "+$7,777", accuracy: "75%", streak: "9", rekt: "4", badge: "🧙", status: "DEMO", dbtHoldings: "0" },
    { rank: 8, name: "beta_tester_degen", profit: "+$5,420", accuracy: "72%", streak: "7", rekt: "5", badge: "🧪", status: "DEMO", dbtHoldings: "0" }
  ];

  const leaderboardStats = {
    totalParticipants: "1,247",
    presaleHolders: topDegens.filter(d => d.status === "PRESALE").length,
    totalVolume: "$2.4M",
    totalDBTStaked: "1,480,000 DBT"
  };

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
                  <span className="text-white">leaderboard.exe</span>
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
              <div className="terminal-text text-sm">degen_rankings.exe</div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-5xl font-black mb-4 font-mono">
                <span className="text-green-400">{'>'}</span> DEGENBET_LEADERBOARD
              </h1>
              <p className="text-green-300 font-mono leading-relaxed">
                {'>'} Elite DBT holders & presale participants
                <br />
                {'>'} Early adopters dominate the prediction markets
                <br />
                {'>'} Presale participants: {leaderboardStats.presaleHolders} • Total users: {leaderboardStats.totalParticipants}
              </p>
            </div>
          </div>

          {/* Presale Leaderboard Notice */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-orange-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">presale_advantage.sh</div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-mono font-bold mb-3 text-orange-400">PRESALE HOLDER ADVANTAGE</h3>
              <p className="text-gray-400 font-mono mb-6">
                {'>'} Top performers are early DBT presale participants
                <br />
                {'>'} Join presale to compete with the best degens
                <br />
                <span className="text-yellow-400">{'>'} Higher DBT holdings = better platform perks & voting power</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/presale">
                  <button className="btn-degen w-full sm:w-auto font-mono text-black">
                    {'>'} JOIN_PRESALE.EXE
                  </button>
                </Link>
                <Link href="/presale/whitelist">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} GET_WHITELISTED.SH
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Terminal Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">profit.exe</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-400 text-2xl">💰</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-yellow-400">PROFIT_TRACKING</h3>
                <p className="text-gray-400 text-sm font-mono">Demo gains & future earnings potential</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">dbt_holdings.db</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-2xl">💎</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-purple-400">DBT_HOLDINGS</h3>
                <p className="text-gray-400 text-sm font-mono">Token balance & governance power</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">accuracy.sh</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">🎯</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-blue-400">ACCURACY_SCORE</h3>
                <p className="text-gray-400 text-sm font-mono">Prediction hit rate & degen skills</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">presale_status.dao</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-400 text-2xl">🚀</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-orange-400">PRESALE_TIER</h3>
                <p className="text-gray-400 text-sm font-mono">Early adopter access level</p>
              </div>
                </div>
              </div>

          {/* Terminal Leaderboard */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">top_degens.exe</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-green-400 text-center">
                {'>'} ELITE_DEGEN_RANKINGS.SH
              </h3>
                <div className="space-y-3">
                {topDegens.map((degen) => (
                  <div key={degen.rank} className="terminal-card border border-green-500/20">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{degen.badge}</span>
                            <span className="text-xl font-mono text-green-400">#{degen.rank}</span>
                          </div>
                          <div>
                            <div className="font-mono font-bold text-white text-lg">{degen.name}</div>
                            <div className="flex items-center space-x-4 text-sm font-mono">
                              <span className={`px-2 py-1 rounded text-xs border ${
                                degen.status === 'PRESALE' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                                'bg-gray-500/20 text-gray-400 border-gray-500/30'
                              }`}>
                                {degen.status}
                              </span>
                              {degen.dbtHoldings !== "0" && (
                                <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                  {degen.dbtHoldings} DBT
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-green-400 text-lg">{degen.profit}</div>
                          <div className="grid grid-cols-3 gap-4 text-sm font-mono">
                            <div>
                              <span className="text-blue-400">{degen.accuracy}</span>
                              <div className="text-xs text-gray-500">accuracy</div>
                            </div>
                            <div>
                              <span className="text-purple-400">{degen.streak}</span>
                              <div className="text-xs text-gray-500">streak</div>
                            </div>
                        <div>
                              <span className="text-red-400">{degen.rekt}</span>
                              <div className="text-xs text-gray-500">rekt</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  ))}
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
              <div className="terminal-text text-sm">degen_actions.sh</div>
            </div>
            <div className="p-6 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/markets">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} START_TRADING.EXE
                  </button>
                </Link>
                <Link href="/preview/profile-dashboard">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} VIEW_DASHBOARD.EXE
                  </button>
                </Link>
                <Link href="/governance">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} DAO_VOTING.SH
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

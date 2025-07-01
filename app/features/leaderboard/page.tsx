"use client";

import Link from 'next/link';

export default function LeaderboardPage() {
  const topDegens = [
    { rank: 1, name: "diamond_hands_420", profit: "+$69,420", accuracy: "96%", streak: "42", rekt: "0", badge: "🏆", status: "ONLINE" },
    { rank: 2, name: "lambo_soon_anon", profit: "+$42,069", accuracy: "91%", streak: "28", rekt: "2", badge: "💎", status: "TRADING" },
    { rank: 3, name: "rekt_detector_9000", profit: "+$33,333", accuracy: "89%", streak: "15", rekt: "1", badge: "🚀", status: "ONLINE" },
    { rank: 4, name: "to_the_moon_chad", profit: "+$25,555", accuracy: "85%", streak: "12", rekt: "3", badge: "⚡", status: "AFK" },
    { rank: 5, name: "degen_whale_0x", profit: "+$19,999", accuracy: "82%", streak: "8", rekt: "5", badge: "🔥", status: "ONLINE" },
    { rank: 6, name: "ngmi_reverser", profit: "+$15,420", accuracy: "78%", streak: "6", rekt: "4", badge: "💰", status: "TRADING" },
    { rank: 7, name: "ape_mode_enabled", profit: "+$12,345", accuracy: "76%", streak: "4", rekt: "7", badge: "🦍", status: "ONLINE" },
    { rank: 8, name: "copium_overdose", profit: "+$9,876", accuracy: "73%", streak: "3", rekt: "8", badge: "💊", status: "REKT" }
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
                <span className="text-green-400">{'>'}</span> DEGEN_LEADERBOARD
              </h1>
              <p className="text-green-300 font-mono leading-relaxed">
                {'>'} Ranking the most elite degens in the prediction markets
                <br />
                {'>'} Only diamond hands survive in this degen casino
                <br />
                {'>'} Current online degens: {topDegens.filter(d => d.status === "ONLINE" || d.status === "TRADING").length}/8
              </p>
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
                <h3 className="font-mono font-bold mb-2 text-yellow-400">PROFIT_TRACKER</h3>
                <p className="text-gray-400 text-sm font-mono">Total gains & diamond hands ROI</p>
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
                <div className="terminal-text text-xs">streak.exe</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-2xl">🔥</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-purple-400">WIN_STREAKS</h3>
                <p className="text-gray-400 text-sm font-mono">Consecutive lambo predictions</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">reputation.dao</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-400 text-2xl">⭐</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-red-400">DEGEN_REP</h3>
                <p className="text-gray-400 text-sm font-mono">Community respect score</p>
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
                              <span className={`px-2 py-1 rounded text-xs ${
                                degen.status === 'ONLINE' ? 'bg-green-500/20 text-green-400' :
                                degen.status === 'TRADING' ? 'bg-yellow-500/20 text-yellow-400' :
                                degen.status === 'REKT' ? 'bg-red-500/20 text-red-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {degen.status}
                              </span>
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
                  <button className="btn-degen w-full sm:w-auto font-mono text-black">
                    {'>'} VIEW_DASHBOARD.EXE
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

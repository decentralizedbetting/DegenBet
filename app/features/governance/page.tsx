"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GovernancePage() {
  const [dbtAmount, setDbtAmount] = useState(10000);
  const [votingPower, setVotingPower] = useState(10000);
  const [supplyPercentage, setSupplyPercentage] = useState(0.001);
  const [governanceTier, setGovernanceTier] = useState('COMMUNITY');

  // Calculate voting power and tier when DBT amount changes
  useEffect(() => {
    const power = dbtAmount;
    const percentage = (dbtAmount / 1000000000) * 100; // 1B total supply
    
    let tier = 'COMMUNITY';
    if (dbtAmount >= 1000000) tier = 'WHALE';
    else if (dbtAmount >= 100000) tier = 'GOVERNOR';
    else if (dbtAmount >= 10000) tier = 'DELEGATE';
    
    setVotingPower(power);
    setSupplyPercentage(percentage);
    setGovernanceTier(tier);
  }, [dbtAmount]);

  const handleDbtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setDbtAmount(value);
  };
  const daoProposals = [
    {
      id: "PROP_001",
      title: "Launch Private Presale Phase",
      description: "Approve $200K private sale at $0.002/DBT with 10% TGE and vesting terms",
      status: "PASSED",
      votes: "847,320 $DBT",
      timeLeft: "EXECUTED",
      approval: 94,
      author: "degenbet_core",
      category: "TOKENOMICS"
    },
    {
      id: "PROP_002", 
      title: "Enable Cross-Chain Market Creation",
      description: "Add Polygon and Arbitrum support for deploying prediction markets",
      status: "ACTIVE",
      votes: "524,690 $DBT", 
      timeLeft: "3 days, 12 hours",
      approval: 82,
      author: "multi_chain_degen",
      category: "PROTOCOL"
    },
    {
      id: "PROP_003",
      title: "Establish Creator Incentive Pool",
      description: "Allocate 5M DBT for rewarding top market creators monthly",
      status: "ACTIVE",
      votes: "398,450 $DBT",
      timeLeft: "5 days, 7 hours",
      approval: 76,
      author: "creator_advocate",
      category: "INCENTIVES"
    },
    {
      id: "PROP_004",
      title: "Reduce Market Resolution Timeframe",
      description: "Cut oracle wait time from 48h to 24h for faster settlements",
      status: "PENDING",
      votes: "156,280 $DBT",
      timeLeft: "7 days, 15 hours",
      approval: 68,
      author: "speed_optimizer",
      category: "OPERATIONS"
    }
  ];

  const daoStats = {
    totalSupply: "1,000,000,000 DBT",
    circulatingSupply: "150,000,000 DBT", // 15% circulating (presale + early unlocks)
    holdersCount: "1,247",
    treasuryValue: "$85,000",
    activeProposals: daoProposals.filter(p => p.status === "ACTIVE").length,
    passedProposals: daoProposals.filter(p => p.status === "PASSED").length
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
                  <span className="text-white">governance.dao</span>
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
              <div className="terminal-text text-sm">degenbet_dao.exe</div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-5xl font-black mb-4 font-mono">
                <span className="text-green-400">{'>'}</span> DEGENBET_DAO.SH
              </h1>
              <p className="text-green-300 font-mono leading-relaxed">
                {'>'} Decentralized governance powered by DBT holders
                <br />
                {'>'} Control the future of prediction markets
                <br />
                {'>'} Active proposals: {daoStats.activeProposals} • Passed: {daoStats.passedProposals} • Treasury: {daoStats.treasuryValue}
              </p>
            </div>
          </div>

          {/* Voting Power Calculator */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">voting_calculator.exe</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-green-400">
                {'>'} VOTING_POWER_CALCULATOR.EXE
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    {'>'} DBT_HOLDINGS.INPUT
                  </label>
                                     <input
                     type="number"
                     className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                     placeholder="Enter DBT amount..."
                     value={dbtAmount}
                     onChange={handleDbtChange}
                   />
                                     <div className="mt-4 space-y-2 text-sm font-mono">
                     <div className="flex justify-between">
                       <span className="text-gray-400">{'>'} Voting Power:</span>
                       <span className="text-green-400 font-bold">{votingPower.toLocaleString()} Votes</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-400">{'>'} % of Total Supply:</span>
                       <span className="text-purple-400 font-bold">{supplyPercentage.toFixed(4)}%</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-400">{'>'} Governance Tier:</span>
                       <span className={`font-bold ${
                         governanceTier === 'WHALE' ? 'text-green-400' :
                         governanceTier === 'GOVERNOR' ? 'text-yellow-400' :
                         governanceTier === 'DELEGATE' ? 'text-blue-400' :
                         'text-gray-400'
                       }`}>{governanceTier}</span>
                     </div>
                   </div>
                   
                   <div className="mt-4">
                     <div className="text-xs text-gray-400 font-mono mb-2">{'>'} Quick Set:</div>
                     <div className="grid grid-cols-2 gap-2">
                       <button 
                         onClick={() => setDbtAmount(10000)}
                         className="px-3 py-1 text-xs bg-blue-500/20 border border-blue-500/30 rounded font-mono text-blue-400 hover:bg-blue-500/30"
                       >
                         10K (DELEGATE)
                       </button>
                       <button 
                         onClick={() => setDbtAmount(100000)}
                         className="px-3 py-1 text-xs bg-yellow-500/20 border border-yellow-500/30 rounded font-mono text-yellow-400 hover:bg-yellow-500/30"
                       >
                         100K (GOVERNOR)
                       </button>
                       <button 
                         onClick={() => setDbtAmount(1000000)}
                         className="px-3 py-1 text-xs bg-green-500/20 border border-green-500/30 rounded font-mono text-green-400 hover:bg-green-500/30"
                       >
                         1M (WHALE)
                       </button>
                       <button 
                         onClick={() => setDbtAmount(50000000)}
                         className="px-3 py-1 text-xs bg-purple-500/20 border border-purple-500/30 rounded font-mono text-purple-400 hover:bg-purple-500/30"
                       >
                         50M (PRESALE)
                       </button>
                     </div>
                   </div>
                </div>
                
                <div>
                  <h4 className="font-mono font-bold mb-4 text-orange-400">{'>'} GOVERNANCE_TIERS.SH</h4>
                                     <div className="space-y-3">
                     <div className={`p-3 border rounded transition-all ${
                       governanceTier === 'WHALE' 
                         ? 'bg-green-500/20 border-green-500/50 ring-2 ring-green-500/30' 
                         : 'bg-green-500/10 border-green-500/30'
                     }`}>
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-green-400 font-bold">WHALE</span>
                         <span className="font-mono text-sm text-green-400">1M+ DBT</span>
                       </div>
                       <p className="text-xs text-gray-400 font-mono mt-1">Create proposals, veto power</p>
                     </div>
                     <div className={`p-3 border rounded transition-all ${
                       governanceTier === 'GOVERNOR' 
                         ? 'bg-yellow-500/20 border-yellow-500/50 ring-2 ring-yellow-500/30' 
                         : 'bg-yellow-500/10 border-yellow-500/30'
                     }`}>
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-yellow-400 font-bold">GOVERNOR</span>
                         <span className="font-mono text-sm text-yellow-400">100K+ DBT</span>
                       </div>
                       <p className="text-xs text-gray-400 font-mono mt-1">Create proposals, priority voting</p>
                     </div>
                     <div className={`p-3 border rounded transition-all ${
                       governanceTier === 'DELEGATE' 
                         ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30' 
                         : 'bg-blue-500/10 border-blue-500/30'
                     }`}>
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-blue-400 font-bold">DELEGATE</span>
                         <span className="font-mono text-sm text-blue-400">10K+ DBT</span>
                       </div>
                       <p className="text-xs text-gray-400 font-mono mt-1">Vote on all proposals</p>
                     </div>
                     <div className={`p-3 border rounded transition-all ${
                       governanceTier === 'COMMUNITY' 
                         ? 'bg-gray-500/20 border-gray-500/50 ring-2 ring-gray-500/30' 
                         : 'bg-gray-500/10 border-gray-500/30'
                     }`}>
                       <div className="flex justify-between items-center">
                         <span className="font-mono text-gray-400 font-bold">COMMUNITY</span>
                         <span className="font-mono text-sm text-gray-400">1+ DBT</span>
                       </div>
                       <p className="text-xs text-gray-400 font-mono mt-1">Vote on approved proposals</p>
                     </div>
                   </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded text-center">
                <p className="text-orange-400 font-mono text-sm">
                  {'>'} Join presale now to maximize your governance power from day one!
                </p>
                <Link href="/presale">
                  <button className="btn-degen mt-3 font-mono text-black">
                    {'>'} JOIN_PRESALE.EXE
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* DAO Stats Dashboard */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">dao_metrics.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-center text-purple-400">
                {'>'} DAO_POWER_METRICS.EXE
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-purple-400 mb-1">1B</div>
                    <div className="text-xs text-gray-500 font-mono">TOTAL_SUPPLY</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-purple-400 mb-1">150M</div>
                    <div className="text-xs text-gray-500 font-mono">CIRCULATING</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-purple-400 mb-1">{daoStats.holdersCount}</div>
                    <div className="text-xs text-gray-500 font-mono">HOLDERS</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-purple-400 mb-1">$85K</div>
                    <div className="text-xs text-gray-500 font-mono">TREASURY</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-purple-400 mb-1">{daoStats.activeProposals}</div>
                    <div className="text-xs text-gray-500 font-mono">ACTIVE</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-black font-mono text-purple-400 mb-1">69%</div>
                    <div className="text-xs text-gray-500 font-mono">PASS_RATE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Governance Powers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">markets.exe</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">🎯</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-blue-400">MARKET_CONTROL</h3>
                <p className="text-gray-400 text-sm font-mono">Approve new market categories & resolution rules</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">treasury.sol</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-400 text-2xl">💰</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-yellow-400">TREASURY_MGMT</h3>
                <p className="text-gray-400 text-sm font-mono">Control 5% DBT treasury allocation & spending</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">fees.config</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 text-2xl">⚡</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-green-400">FEE_STRUCTURE</h3>
                <p className="text-gray-400 text-sm font-mono">Set platform fees & revenue distribution</p>
              </div>
                </div>

            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">upgrades.sh</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-2xl">🔧</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-purple-400">PROTOCOL_UPGRADES</h3>
                <p className="text-gray-400 text-sm font-mono">Vote on platform improvements & new features</p>
              </div>
                </div>
              </div>

          {/* Terminal Proposals */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">active_proposals.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-green-400 text-center">
                {'>'} LIVE_DAO_PROPOSALS.EXE
              </h3>
                <div className="space-y-4">
                {daoProposals.map((proposal) => (
                  <div key={proposal.id} className="terminal-card border border-green-500/20">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-green-400 text-sm">{proposal.id}</span>
                            <span className={`px-2 py-1 text-xs rounded font-mono ${
                              proposal.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              proposal.status === 'PASSED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              proposal.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {proposal.status}
                        </span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded font-mono border border-purple-500/30">
                              {proposal.category}
                            </span>
                          </div>
                          <h4 className="font-mono font-bold text-white text-lg mb-2">{proposal.title}</h4>
                          <p className="text-gray-400 text-sm font-mono mb-3">{proposal.description}</p>
                          <div className="text-sm font-mono text-gray-500">
                            Proposed by: <span className="text-green-400">{proposal.author}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex space-x-6 text-sm font-mono">
                          <span className="text-gray-400">
                            Votes: <span className="text-green-400">{proposal.votes}</span>
                          </span>
                          <span className="text-gray-400">
                            Time: <span className="text-yellow-400">{proposal.timeLeft}</span>
                          </span>
                        </div>
                        <div className="text-lg font-mono">
                          <span className={proposal.approval > 50 ? "text-green-400" : "text-red-400"}>
                            {proposal.approval}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Terminal Progress Bar */}
                      <div className="bg-black/50 rounded h-3 overflow-hidden border border-green-500/20">
                        <div 
                          className={`h-3 rounded transition-all duration-500 ${
                            proposal.approval > 50 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                          style={{ width: `${proposal.approval}%` }}
                        ></div>
                      </div>
                      
                      {proposal.status === 'ACTIVE' && (
                        <div className="flex space-x-3 mt-4">
                          <button className="btn-degen-secondary text-sm font-mono flex-1">
                            VOTE_YES.EXE
                          </button>
                          <button className="border border-red-500/30 text-red-400 px-4 py-2 rounded hover:bg-red-500/10 transition-colors text-sm font-mono flex-1">
                            VOTE_NO.EXE
                          </button>
                        </div>
                      )}
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="terminal-text text-sm">governance_access.sh</div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-mono font-bold mb-3 text-orange-400">GET_VOTING_POWER.EXE</h3>
              <p className="text-gray-400 font-mono mb-6">
                {'>'} Join the presale to earn DBT tokens and control platform governance
                <br />
                {'>'} Private sale: $0.002/DBT • Public sale: $0.003/DBT • DEX launch: $0.005/DBT
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/presale">
                  <button className="btn-degen w-full sm:w-auto font-mono text-black">
                    {'>'} JOIN_PRESALE.EXE
                  </button>
                </Link>
                <Link href="/token">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} DBT_TOKENOMICS.SH
                  </button>
                </Link>
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
              <div className="terminal-text text-sm">dao_actions.sh</div>
            </div>
            <div className="p-6 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/markets">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} VIEW_MARKETS.EXE
                  </button>
                </Link>
                <Link href="/leaderboard">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} COMMUNITY_RANKS.SH
                  </button>
                </Link>
                <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                  {'>'} SUBMIT_PROPOSAL.EXE (SOON)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

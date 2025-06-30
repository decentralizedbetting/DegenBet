"use client";

import Link from 'next/link';

export default function GovernancePage() {
  const daoProposals = [
    {
      id: "PROP_001",
      title: "Enable Degen Leverage Trading",
      description: "Allow 10x leverage on prediction markets because YOLO",
      status: "ACTIVE",
      votes: "420,690 $DBT",
      timeLeft: "2 days, 13 hours",
      approval: 89,
      author: "diamond_hands_anon",
      category: "PROTOCOL"
    },
    {
      id: "PROP_002", 
      title: "Reduce Market Creation Fee to 0.69 DBT",
      description: "Make creating markets even more affordable for broke degens",
      status: "ACTIVE",
      votes: "315,240 $DBT", 
      timeLeft: "4 days, 8 hours",
      approval: 76,
      author: "to_the_moon_chad",
      category: "ECONOMICS"
    },
    {
      id: "PROP_003",
      title: "Launch Degen NFT Collection",
      description: "Fund creation of 10k 'Rekt Apes' NFT collection for governance perks",
      status: "PASSED",
      votes: "567,890 $DBT",
      timeLeft: "EXECUTED",
      approval: 94,
      author: "ape_gang_leader",
      category: "COMMUNITY"
    },
    {
      id: "PROP_004",
      title: "Add Shitcoin Integration",
      description: "Accept $DOGE, $SHIB, and other memecoins for betting",
      status: "FAILED",
      votes: "123,456 $DBT",
      timeLeft: "REJECTED",
      approval: 31,
      author: "meme_lord_420",
      category: "INTEGRATION"
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
                {'>'} Autonomous governance protocol for elite degens
                <br />
                {'>'} Only diamond hands can propose the future
                <br />
                {'>'} Current proposals: {daoProposals.filter(p => p.status === "ACTIVE").length} active, {daoProposals.filter(p => p.status === "PASSED").length} passed
              </p>
            </div>
          </div>

          {/* Terminal Governance Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">proposals.exe</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">📝</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-blue-400">PROPOSAL_FACTORY</h3>
                <p className="text-gray-400 text-sm font-mono">Submit your degen ideas to shape the future</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">voting.dao</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 text-2xl">✅</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-green-400">DEMOCRATIC_VOTING</h3>
                <p className="text-gray-400 text-sm font-mono">Cast votes with your $DBT diamond hands</p>
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
                <p className="text-gray-400 text-sm font-mono">Manage the collective degen vault</p>
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
                              proposal.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                              proposal.status === 'PASSED' ? 'bg-blue-500/20 text-blue-400' :
                              proposal.status === 'FAILED' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {proposal.status}
                        </span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded font-mono">
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
                      <div className="bg-black/50 rounded h-3 overflow-hidden">
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

          {/* Terminal Actions */}
          <div className="terminal-card mb-8">
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
                <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                  {'>'} CONNECT_WALLET.EXE
                </button>
                <button className="btn-degen w-full sm:w-auto font-mono text-black">
                  {'>'} VIEW_DBT_TOKEN.EXE
                </button>
              </div>
            </div>
              </div>

          {/* Terminal Token Info */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">dbt_token.erc20</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-4 text-center text-purple-400">
                GOVERNANCE_TOKEN: $DBT
              </h3>
              <p className="text-gray-400 font-mono text-center mb-6 leading-relaxed">
                {'>'} Hold $DBT tokens to participate in DAO governance
                <br />
                {'>'} Your voting power = your diamond hands holdings
                <br />
                {'>'} True degen democracy in action
                </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4">
                    <div className="text-3xl font-black font-mono text-purple-400">1M</div>
                    <div className="text-sm text-gray-500 font-mono">TOTAL_SUPPLY</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4">
                    <div className="text-3xl font-black font-mono text-purple-400">690K</div>
                    <div className="text-sm text-gray-500 font-mono">CIRCULATING</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4">
                    <div className="text-3xl font-black font-mono text-purple-400">{daoProposals.length}</div>
                    <div className="text-sm text-gray-500 font-mono">PROPOSALS</div>
                  </div>
                </div>
                <div className="terminal-card border border-purple-500/30">
                  <div className="p-4">
                    <div className="text-3xl font-black font-mono text-purple-400">4.2K</div>
                    <div className="text-sm text-gray-500 font-mono">VOTERS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
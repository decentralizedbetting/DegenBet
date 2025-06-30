"use client";

import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CreateMarketPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
                  <span className="text-white">create_market.exe</span>
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
              <div className="terminal-text text-sm">market_factory.exe</div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-5xl font-black mb-4 font-mono">
                <span className="text-green-400">{'>'}</span> CREATE_MARKET.SH
              </h1>
              <p className="text-green-300 font-mono leading-relaxed">
                {'>'} Initializing market deployment protocol...
                <br />
                {'>'} Deploy your own degen betting markets and watch the chaos unfold
              </p>
            </div>
          </div>

          {/* Terminal Status */}
          <div className="terminal-card text-center mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">deployment_status.sh</div>
            </div>
            <div className="p-8">
              <div className="mx-auto w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-yellow-400 text-4xl font-mono">⚠</span>
              </div>
              <h2 className="text-4xl font-black mb-4 font-mono text-yellow-400">
                DEPLOYMENT IN PROGRESS...
              </h2>
              <p className="text-green-300 font-mono text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                {'>'} Building the most degen market creation wizard...
                <br />
                {'>'} ETA: Soon™ (trust the process)
                <br />
                {'>'} Status: 69% complete 🔥
              </p>
            </div>
          </div>

          {/* Terminal Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">wizard.exe</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-green-400">EASY_SETUP.SH</h3>
                <p className="text-gray-400 text-sm font-mono">One-click deployment wizard for degen markets</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">contracts.sol</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-2xl">⚡</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-purple-400">SMART_CONTRACTS</h3>
                <p className="text-gray-400 text-sm font-mono">Automated settlement & secure escrow protocols</p>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">community.dao</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">👥</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-blue-400">DEGEN_GOVERNANCE</h3>
                <p className="text-gray-400 text-sm font-mono">Community-curated market validation system</p>
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
              <div className="terminal-text text-sm">quick_actions.sh</div>
            </div>
            <div className="p-6 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/markets">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} BROWSE_MARKETS.EXE
                  </button>
                </Link>
                <Link href="/preview/market-wizard">
                  <button className="btn-degen w-full sm:w-auto font-mono text-black">
                    {'>'} PREVIEW_WIZARD.EXE
                  </button>
                </Link>
              </div>
            </div>
              </div>

          {/* Terminal Newsletter */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">notifications.sh</div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-mono font-bold mb-3 text-green-400">SUBSCRIBE TO UPDATES</h3>
              <p className="text-gray-400 font-mono mb-4">Get notified when the degen factory goes live!</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-green-400 font-mono">$</span>
                  <input
                    type="email"
                    placeholder="your_email@degen.wtf"
                    className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                  />
                </div>
                <button className="btn-degen font-mono text-black">
                  NOTIFY.SH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
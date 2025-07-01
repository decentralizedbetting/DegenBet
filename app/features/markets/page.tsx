import Link from 'next/link';
import { MarketCard } from '@/features/markets/components/MarketCard';
import { sampleMarkets, getMarketSlug } from '@/data/markets';

export default function MarketsPage() {
  const categories = ['All', 'Crypto', 'Economics', 'Politics', 'Sports', 'Entertainment', 'Technology', 'Science'];

  return (
    <div className="container py-8 md:py-12 min-h-screen">
      {/* Terminal Header */}
      <div className="terminal-card mb-8">
        <div className="flex items-center justify-between p-4 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-sm flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>markets_explorer.exe</span>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-white font-mono">
            <span className="text-green-400 mr-2">{'>'}</span> 
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              MARKET_EXPLORER
            </span>
          </h1>
          <div className="space-y-2 text-green-300 font-mono leading-relaxed">
            <p className="flex items-center space-x-2">
              <span className="text-green-400">{'>'}</span>
              <span className="animate-pulse">Scanning available prediction markets...</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-green-400">{'>'}</span>
              <span className="text-yellow-400 font-bold">{sampleMarkets.length}</span>
              <span>markets discovered and indexed</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></span>
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Filters */}
      <div className="terminal-card mb-8">
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs flex items-center space-x-1">
            <span>filter_markets.sh</span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <span className="text-green-400 font-mono text-sm mr-3">CATEGORIES:</span>
                <span className="text-xs text-gray-400 font-mono">({categories.length} available)</span>
              </div>
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                    className={`px-3 py-1.5 rounded font-mono text-xs transition-all duration-200 hover:scale-105 ${
                  category === 'All'
                        ? 'btn-degen text-black'
                        : 'btn-degen-secondary text-green-400'
                }`}
              >
                    {category.toUpperCase()}
              </button>
            ))}
          </div>
            </div>
            <div className="flex items-center space-x-3 lg:min-w-[200px]">
              <span className="text-purple-400 font-mono text-sm whitespace-nowrap">SORT:</span>
            <select
              id="sort"
                className="bg-black/50 border border-green-500/30 text-green-400 text-sm rounded px-3 py-2 font-mono focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 hover:border-green-500/50 transition-colors flex-1"
            >
                <option value="volume">--volume</option>
                <option value="newest">--newest</option>
                <option value="endDate">--expiry</option>
                <option value="liquidity">--liquidity</option>
            </select>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Search */}
      <div className="mb-8">
        <div className="terminal-card">
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-xs flex items-center space-x-1">
              <span>search_markets.sh</span>
              <span className="text-green-400">●</span>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <span className="text-green-400 font-mono">$</span>
                <span className="text-xs text-gray-500 font-mono">root@degenbet:</span>
          </div>
          <input
            type="text"
                className="bg-black/30 border border-green-500/30 text-green-400 rounded-lg font-mono w-full pl-24 pr-24 py-4 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500 hover:border-green-500/40 transition-colors text-sm"
                placeholder="grep -i 'market_name' | filter --active --live"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-mono">LIVE</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">
                <span className="text-green-400">{'>'}</span> Use advanced search: --category=crypto --min-volume=1000
              </span>
              <span className="text-purple-400">
                {sampleMarkets.length} results indexed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {sampleMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>

      {/* Terminal Pagination */}
      <div className="flex justify-center mt-12 mb-8">
        <div className="terminal-card w-full max-w-2xl">
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-xs flex items-center space-x-1">
              <span>paginate.sh</span>
              <span className="text-blue-400">--interactive</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
              <button className="px-4 py-2 rounded font-mono text-sm border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {'<'} PREV
              </button>
              <button className="px-4 py-2 rounded font-mono text-sm btn-degen text-black shadow-lg">
                1
              </button>
              <button className="px-4 py-2 rounded font-mono text-sm border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 hover:scale-105">
                2
              </button>
              <button className="px-4 py-2 rounded font-mono text-sm border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 hover:scale-105">
                3
              </button>
              <span className="px-2 text-gray-500 font-mono text-lg">...</span>
              <button className="px-4 py-2 rounded font-mono text-sm border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 hover:scale-105">
                10
          </button>
              <button className="px-4 py-2 rounded font-mono text-sm border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-200 hover:scale-105">
                NEXT {'>'}
          </button>
            </div>
            <div className="text-center space-y-1">
              <div className="text-xs text-gray-500 font-mono">
                <span className="text-green-400">{'>'}</span> Displaying page 1 of 10 
                <span className="text-purple-400 mx-2">|</span>
                Total: <span className="text-yellow-400 font-bold">{sampleMarkets.length}</span> markets
              </div>
              <div className="text-xs text-gray-600 font-mono">
                <span className="text-green-400">{'>'}</span> Use arrow keys or click to navigate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Status Bar */}
      <div className="mt-8 mb-4">
        <div className="terminal-card">
          <div className="p-3 border-b border-green-500/20">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-4">
                <span className="text-green-400">STATUS:</span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">CONNECTED</span>
                </span>
                <span className="text-gray-500">|</span>
                <span className="text-purple-400">MARKETS: {sampleMarkets.length}</span>
                <span className="text-gray-500">|</span>
                <span className="text-yellow-400">LAST_SYNC: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">degenbet@terminal:~$</span>
                <div className="w-2 h-3 bg-green-400 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

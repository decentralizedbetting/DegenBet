import Link from 'next/link';
import { MarketCard } from '../components/MarketCard';
import { sampleMarkets, getMarketSlug } from '../data/markets';

export default function MarketsPage() {
  const categories = ['All', 'Crypto', 'Economics', 'Politics', 'Sports', 'Entertainment', 'Technology', 'Science'];

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Markets</h1>
        <p className="text-white/60">
          Browse and trade on various prediction markets across different categories
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm font-medium text-white/60 mr-2">Sort by:</label>
            <select
              id="sort"
              className="bg-white/10 border border-white/20 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="volume">Volume</option>
              <option value="newest">Newest</option>
              <option value="endDate">End Date</option>
              <option value="liquidity">Liquidity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            className="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 placeholder-white/40"
            placeholder="Search markets..."
          />
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleMarkets.map((market) => (
          <Link 
            key={market.id} 
            href={`/markets/${getMarketSlug(market)}`} 
            className="block"
          >
            <MarketCard market={market} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 rounded-md border border-white/20 text-white/60 hover:bg-white/10">
            Previous
          </button>
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white font-medium">1</button>
          <button className="px-3 py-2 rounded-md border border-white/20 text-white/60 hover:bg-white/10">2</button>
          <button className="px-3 py-2 rounded-md border border-white/20 text-white/60 hover:bg-white/10">3</button>
          <span className="px-2 text-white/60">...</span>
          <button className="px-3 py-2 rounded-md border border-white/20 text-white/60 hover:bg-white/10">10</button>
          <button className="px-3 py-2 rounded-md border border-white/20 text-white/60 hover:bg-white/10">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
} 
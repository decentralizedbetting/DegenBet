import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMarketData, getMarketSlug } from '@/data/markets';
import MarketPageClient from './MarketPageClient';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const market = getMarketData(id);

  if (!market) {
    return {
      title: 'Market Not Found',
      description: 'The requested betting market could not be found.',
    };
  }

  // If the ID is numeric and doesn't match the slug format, redirect to the slug URL
  if (!isNaN(Number(id)) && id !== getMarketSlug(market)) {
    // Note: We can't redirect here as metadata functions don't support redirects,
    // the redirect will be handled in the main component
  }

  return {
    title: `${market.title} | DegenBet`,
    description: market.description,
    openGraph: {
      title: `${market.title} | DegenBet`,
      description: market.description,
      url: `/markets/${getMarketSlug(market)}`,
      siteName: 'DegenBet',
      images: [
        {
          url: market.imageUrl || '/images/default-market.jpg',
          width: 1200,
          height: 630,
          alt: market.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${market.title} | DegenBet`,
      description: market.description,
      creator: '@DegenBet',
      images: [market.imageUrl || '/images/default-market.jpg'],
    },
  };
}

export default function MarketPage({ params }: Props) {
  const { id } = params;
  const market = getMarketData(id);
  
  // If market not found, return terminal-themed error
  if (!market) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="terminal-card max-w-lg mx-auto">
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-sm">error_404.exe</div>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-4 font-mono">MARKET_NOT_FOUND</h1>
            <p className="text-gray-400 mb-8 font-mono">{'>'} The market you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/markets" className="btn-degen font-mono text-black">
              {'>'} BROWSE_MARKETS.EXE
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // If the URL is using the numeric ID instead of the slug, redirect to the slug URL
  const marketSlug = getMarketSlug(market);
  if (!isNaN(Number(id)) && id !== marketSlug) {
    redirect(`/features/markets/${marketSlug}`);
  }

  return <MarketPageClient marketId={market.id} />;
} 
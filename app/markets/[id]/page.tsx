import { Metadata } from 'next';
import { getMarketData, getMarketSlug } from '@/app/data/markets';
import MarketPageClient from './MarketPageClient';
import { redirect } from 'next/navigation';

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
      description: 'The requested prediction market could not be found.',
    };
  }

  // If the ID is numeric and doesn't match the slug format, redirect to the slug URL
  if (!isNaN(Number(id)) && id !== getMarketSlug(market)) {
    // Note: We can't redirect here as metadata functions don't support redirects,
    // the redirect will be handled in the main component
  }

  return {
    title: `${market.title} | Prediction Market`,
    description: market.description,
    openGraph: {
      title: `${market.title} | Prediction Market`,
      description: market.description,
      url: `/markets/${getMarketSlug(market)}`,
      siteName: 'Crypto Prediction Market',
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
      title: `${market.title} | Prediction Market`,
      description: market.description,
      creator: '@CryptoPredictionMarket',
      images: [market.imageUrl || '/images/default-market.jpg'],
    },
  };
}

export default function MarketPage({ params }: Props) {
  const { id } = params;
  const market = getMarketData(id);
  
  // If market not found, this could be handled by a not-found page
  if (!market) {
    return <div>Market not found</div>;
  }
  
  // If the URL is using the numeric ID instead of the slug, redirect to the slug URL
  const marketSlug = getMarketSlug(market);
  if (!isNaN(Number(id)) && id !== marketSlug) {
    redirect(`/markets/${marketSlug}`);
  }

  return <MarketPageClient marketId={market.id} />;
} 
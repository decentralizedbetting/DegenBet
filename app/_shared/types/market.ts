export type MarketCategory = 
  | 'crypto'
  | 'politics'
  | 'sports'
  | 'technology'
  | 'finance'
  | 'entertainment'
  | 'science'
  | 'other';

export type MarketStatus = 
  | 'active'
  | 'resolved'
  | 'cancelled'
  | 'pending';

export type MarketResolutionType = 
  | 'binary'
  | 'multiple-choice'
  | 'scalar'
  | 'time-based';

export interface MarketOutcome {
  id: string;
  label: string;
  probability: number;
  price: number;
  volume: number;
}

export interface MarketComment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Market {
  id: string;
  title: string;
  description: string;
  category: MarketCategory;
  status: MarketStatus;
  resolutionType: MarketResolutionType;
  createdAt: string;
  endDate: string;
  resolutionDate?: string;
  creator: {
    id: string;
    username: string;
    reputation: number;
  };
  outcomes: MarketOutcome[];
  totalVolume: number;
  liquidity: number;
  comments: MarketComment[];
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
  resolutionDetails?: {
    resolvedOutcome?: string;
    resolutionSource?: string;
    resolutionValue?: number;
  };
  metadata?: {
    source?: string;
    externalId?: string;
    verificationMethod?: string;
  };
}

// Helper type for market creation
export type CreateMarketInput = Omit<Market, 'id' | 'createdAt' | 'status' | 'totalVolume' | 'liquidity' | 'comments'>;

// Helper type for market updates
export type UpdateMarketInput = Partial<Omit<Market, 'id' | 'createdAt' | 'creator'>>;

// Type for market filters
export interface MarketFilters {
  category?: MarketCategory;
  status?: MarketStatus;
  resolutionType?: MarketResolutionType;
  minVolume?: number;
  maxVolume?: number;
  creatorId?: string;
  tags?: string[];
  searchQuery?: string;
  sortBy?: 'volume' | 'createdAt' | 'endDate';
  sortOrder?: 'asc' | 'desc';
}

// Type for market statistics
export interface MarketStats {
  totalMarkets: number;
  activeMarkets: number;
  totalVolume: number;
  averageLiquidity: number;
  resolutionRate: number;
  categoryDistribution: Record<MarketCategory, number>;
  volumeByCategory: Record<MarketCategory, number>;
} 

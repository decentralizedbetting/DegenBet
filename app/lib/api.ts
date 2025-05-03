/**
 * API Client for CryptoPredictionMarket
 * 
 * This file contains the API client functions for fetching data from the backend.
 * It provides a consistent interface for data fetching across the application.
 */

// API Base URL - will be replaced with environment variable in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cryptopredict.example';

// Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  meta?: {
    totalCount?: number;
    pageCount?: number;
    currentPage?: number;
  };
}

// Market types
export interface MarketOutcome {
  id: string;
  label: string;
  probability: number;
  price: number;
}

export interface Market {
  id: string;
  title: string;
  description?: string;
  category?: string;
  subcategory?: string;
  creator?: string;
  createdAt?: string;
  endsAt: string;
  volume?: number;
  liquidity?: number;
  resolution: null | string;
  outcomes: MarketOutcome[];
  status: string;
  imageUrl?: string;
  network?: string;
}

// Order type
export interface Order {
  id: string;
  price: number;
  quantity: number;
  total: number;
  outcomeId: string;
  createdAt: string;
  expiresAt?: string;
  userId?: string;
  isMine?: boolean;
}

// Holder type
export interface Holder {
  id: string;
  address: string;
  displayName?: string;
  position: number;
  quantity: number;
  type: 'yes' | 'no' | 'liquidity';
  isYou?: boolean;
}

// Activity type
export interface ActivityItem {
  id: string;
  type: 'buy' | 'sell' | 'liquidity' | 'position';
  timestamp: string;
  price: number;
  quantity: number;
  marketId: string;
  outcomeId: string;
  user: {
    address: string;
    isYou?: boolean;
  };
}

// Chart data type
export interface ChartPoint {
  time: string;
  value: number;
}

// Trade details type
export interface TradeDetails {
  marketId: string;
  outcome: string;
  quantity: number;
  price: number;
  slippage: number;
  orderType: 'limit' | 'market';
}

// Filter parameters for markets
export interface MarketFilters {
  category?: string;
  status?: 'open' | 'closed' | 'resolved';
  network?: string;
  creator?: string;
  search?: string;
  sortBy?: 'newest' | 'endingSoon' | 'volume' | 'liquidity';
  page?: number;
  limit?: number;
}

/**
 * Error handling helper
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    if (response.status === 401) {
      // Handle authentication error
      // Could redirect to login or refresh token
    }
    
    const errorData = await response.json().catch(() => ({}));
    return { 
      error: errorData.message || `API error: ${response.status} ${response.statusText}` 
    };
  }
  
  try {
    return await response.json();
  } catch (error) {
    return { 
      error: 'Failed to parse response' 
    };
  }
}

/**
 * Get all markets with optional filtering
 */
export async function getMarkets(filters: MarketFilters = {}): Promise<ApiResponse<Market[]>> {
  // Create query string from filters
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}/markets?${queryParams.toString()}`);
    return handleResponse<Market[]>(response);
  } catch (error) {
    return { 
      error: 'Network error when fetching markets' 
    };
  }
}

/**
 * Get a single market by ID
 */
export async function getMarket(id: string): Promise<ApiResponse<Market>> {
  try {
    const response = await fetch(`${API_BASE_URL}/markets/${id}`);
    return handleResponse<Market>(response);
  } catch (error) {
    return { 
      error: 'Network error when fetching market' 
    };
  }
}

/**
 * Get order book for a market
 */
export async function getOrderBook(marketId: string, outcomeId: string): Promise<ApiResponse<{ bids: Order[]; asks: Order[] }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/markets/${marketId}/orderbook?outcome=${outcomeId}`);
    return handleResponse<{ bids: Order[]; asks: Order[] }>(response);
  } catch (error) {
    return { 
      error: 'Network error when fetching order book' 
    };
  }
}

/**
 * Get market activity
 */
export async function getMarketActivity(marketId: string, limit = 20): Promise<ApiResponse<ActivityItem[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/markets/${marketId}/activity?limit=${limit}`);
    return handleResponse<ActivityItem[]>(response);
  } catch (error) {
    return { 
      error: 'Network error when fetching market activity' 
    };
  }
}

/**
 * Get top holders for a market
 */
export async function getTopHolders(marketId: string, limit = 10): Promise<ApiResponse<Holder[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/markets/${marketId}/holders?limit=${limit}`);
    return handleResponse<Holder[]>(response);
  } catch (error) {
    return { 
      error: 'Network error when fetching top holders' 
    };
  }
}

/**
 * Get price history for a market outcome
 */
export async function getPriceHistory(
  marketId: string, 
  outcomeId: string, 
  timeframe: '1H' | '6H' | '1D' | '1W' | '1M' | 'ALL' = '1D'
): Promise<ApiResponse<ChartPoint[]>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/markets/${marketId}/price-history?outcome=${outcomeId}&timeframe=${timeframe}`
    );
    return handleResponse<ChartPoint[]>(response);
  } catch (error) {
    return { 
      error: 'Network error when fetching price history' 
    };
  }
}

/**
 * Place a trade
 */
export async function placeTrade(tradeDetails: TradeDetails): Promise<ApiResponse<{ txHash: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tradeDetails),
    });
    return handleResponse<{ txHash: string }>(response);
  } catch (error) {
    return { 
      error: 'Network error when placing trade' 
    };
  }
}

/**
 * Cancel an order
 */
export async function cancelOrder(orderId: string): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
    });
    return handleResponse<{ success: boolean }>(response);
  } catch (error) {
    return { 
      error: 'Network error when cancelling order' 
    };
  }
} 
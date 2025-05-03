import { PriceData } from '../components/visualizations/TradingChart';

/**
 * Utility class for generating demo trading chart data
 */
export class ChartDataGenerator {
  /**
   * Generate realistic price action data for a demo chart
   * @param basePrice Base price to start from
   * @param days Number of days to generate
   * @param volatility Price volatility (0-1)
   * @param trend Trend direction and strength (-1 to 1)
   * @param timeframe Timeframe for data points
   * @returns Array of price data points
   */
  static generatePriceData(
    basePrice: number = 100,
    days: number = 90,
    volatility: number = 0.02,
    trend: number = 0,
    timeframe: '1H' | '1D' | '1W' | '1M' | 'ALL' = '1D'
  ): PriceData[] {
    // Determine number of data points based on timeframe
    let dataPoints: number;
    let timeIncrement: number;
    
    switch (timeframe) {
      case '1H':
        dataPoints = days * 24;
        timeIncrement = 60 * 60 * 1000; // 1 hour in ms
        break;
      case '1W':
        dataPoints = Math.ceil(days / 7);
        timeIncrement = 7 * 24 * 60 * 60 * 1000; // 1 week in ms
        break;
      case '1M':
        dataPoints = Math.ceil(days / 30);
        timeIncrement = 30 * 24 * 60 * 60 * 1000; // ~1 month in ms
        break;
      case 'ALL':
        dataPoints = Math.ceil(days / 4); // Sparse data
        timeIncrement = 4 * 24 * 60 * 60 * 1000; // 4 days in ms
        break;
      case '1D':
      default:
        dataPoints = days;
        timeIncrement = 24 * 60 * 60 * 1000; // 1 day in ms
        break;
    }
    
    const result: PriceData[] = [];
    let currentPrice = basePrice;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate = new Date(currentDate.getTime() - (dataPoints * timeIncrement));
    
    // Create random walk with trend
    for (let i = 0; i < dataPoints; i++) {
      // Add time increment
      currentDate = new Date(currentDate.getTime() + timeIncrement);
      
      // Calculate price movement with trend bias
      const trendFactor = 1 + (trend * (Math.random() * 0.01));
      const change = currentPrice * volatility * (Math.random() * 2 - 1) * trendFactor;
      
      // Calculate daily range with some randomness
      const rangeMultiplier = 0.5 + Math.random();
      const dayRange = Math.abs(change) * rangeMultiplier;
      
      // Calculate open, high, low, close
      const open = currentPrice;
      const close = currentPrice + change;
      const high = Math.max(open, close) + (dayRange * 0.5);
      const low = Math.min(open, close) - (dayRange * 0.5);
      
      // Calculate volume with some correlation to price movement
      const volumeBase = basePrice * 1000;
      const volumeChange = Math.abs(change / currentPrice);
      const volume = Math.round(volumeBase * (1 + volumeChange * 5) * (0.5 + Math.random()));
      
      // Format date as YYYY-MM-DD
      const timeStr = currentDate.toISOString().split('T')[0];
      
      // Add data point
      result.push({
        time: timeStr,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume
      });
      
      // Update current price for next iteration
      currentPrice = close;
    }
    
    return result;
  }
  
  /**
   * Generate data for specific market types with realistic behavior
   */
  static generateMarketData(
    marketType: 'crypto' | 'stock' | 'commodity' | 'forex' | 'prediction',
    days: number = 90,
    timeframe: '1H' | '1D' | '1W' | '1M' | 'ALL' = '1D'
  ): PriceData[] {
    switch (marketType) {
      case 'crypto':
        // High volatility, slight upward bias
        return this.generatePriceData(
          20000 + Math.random() * 10000, // Base price around $20-30k
          days,
          0.04, // Higher volatility
          0.1,  // Slight upward trend
          timeframe
        );
        
      case 'stock':
        // Medium volatility, slight upward bias
        return this.generatePriceData(
          100 + Math.random() * 900, // Base price $100-1000
          days,
          0.015, // Medium volatility
          0.05,  // Slight upward trend
          timeframe
        );
        
      case 'commodity':
        // Low-medium volatility, neutral trend
        return this.generatePriceData(
          50 + Math.random() * 150, // Base price $50-200
          days,
          0.01, // Lower volatility
          0.0,  // Neutral trend
          timeframe
        );
        
      case 'forex':
        // Very low volatility, minimal trend
        return this.generatePriceData(
          1 + Math.random() * 0.5, // Base price 1.0-1.5
          days,
          0.005, // Very low volatility
          0.01,  // Minimal trend
          timeframe
        );
        
      case 'prediction':
      default:
        // Medium-high volatility, random trend
        return this.generatePriceData(
          0.3 + Math.random() * 0.4, // Base price 0.3-0.7 (probability)
          days,
          0.03, // Medium-high volatility
          Math.random() * 0.2 - 0.1,  // Random trend between -0.1 and 0.1
          timeframe
        );
    }
  }
  
  /**
   * Format market data based on timeframe for display
   */
  static formatMarketData(
    data: PriceData[],
    timeframe: string
  ): PriceData[] {
    // Filter or aggregate data based on timeframe
    switch (timeframe) {
      case '1H':
        // Return most recent 24 hours of data
        return data.slice(-24);
        
      case '1D':
        // Return most recent 30 days
        return data.slice(-30);
        
      case '1W':
        // Return most recent 12 weeks
        return data.slice(-12);
        
      case '1M':
        // Return most recent 12 months
        return data.slice(-12);
        
      case 'ALL':
      default:
        // Return all data
        return data;
    }
  }
} 
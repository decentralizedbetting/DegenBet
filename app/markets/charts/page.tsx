"use client";

import { useState } from 'react';
import { TradingChart, type PriceData, type ChartOptions } from '@/components/visualizations/TradingChart';
import { ChartDataGenerator } from '@/utils/chartData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

type TimeframeType = '1H' | '1D' | '1W' | '1M' | 'ALL';

export default function ChartsPage() {
  const [timeframe, setTimeframe] = useState<TimeframeType>('1D');
  const [chartData, setChartData] = useState({
    btc: ChartDataGenerator.generateMarketData('crypto', 90, '1D' as TimeframeType),
    eth: ChartDataGenerator.generateMarketData('crypto', 90, '1D' as TimeframeType),
    prediction: ChartDataGenerator.generateMarketData('prediction', 90, '1D' as TimeframeType),
    stock: ChartDataGenerator.generateMarketData('stock', 90, '1D' as TimeframeType),
  });
  
  // Handle timeframe changes to regenerate data
  const handleTimeframeChange = (market: string, newTimeframe: TimeframeType) => {
    const marketType = market === 'btc' || market === 'eth' 
      ? 'crypto' 
      : market as 'prediction' | 'stock';
      
    setChartData(prev => ({
      ...prev,
      [market]: ChartDataGenerator.generateMarketData(marketType, 90, newTimeframe)
    }));
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Market Charts</h1>
          <p className="text-gray-400">
            Interactive price charts with technical indicators for cryptocurrency and prediction markets
          </p>
        </div>
        
        <Tabs defaultValue="crypto">
          <TabsList className="mb-6">
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
            <TabsTrigger value="prediction">Prediction Markets</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crypto" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <TradingChart
                marketId="btc-usd"
                marketTitle="Bitcoin (BTC/USD)"
                data={chartData.btc}
                options={{
                  height: 500,
                  showVolume: true,
                  indicators: ['sma', 'ema', 'rsi'],
                  timeframe,
                  theme: 'dark'
                }}
                onTimeframeChange={(tf) => handleTimeframeChange('btc', tf as TimeframeType)}
                className="w-full"
              />
              
              <TradingChart
                marketId="eth-usd"
                marketTitle="Ethereum (ETH/USD)"
                data={chartData.eth}
                options={{
                  height: 400,
                  showVolume: true,
                  indicators: ['sma'],
                  timeframe,
                  theme: 'dark'
                }}
                onTimeframeChange={(tf) => handleTimeframeChange('eth', tf as TimeframeType)}
                className="w-full"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="prediction" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Market Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <TradingChart
                    marketId="btc-100k-eoy"
                    marketTitle="Bitcoin to reach $100K by EOY (Probability)"
                    data={chartData.prediction}
                    options={{
                      height: 500,
                      showVolume: true,
                      indicators: ['sma', 'ema'],
                      timeframe,
                      theme: 'dark'
                    }}
                    onTimeframeChange={(tf) => handleTimeframeChange('prediction', tf as TimeframeType)}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stocks" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Market Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <TradingChart
                    marketId="aapl"
                    marketTitle="Apple Inc (AAPL)"
                    data={chartData.stock}
                    options={{
                      height: 500,
                      showVolume: true,
                      indicators: ['sma', 'ema', 'rsi'],
                      timeframe,
                      theme: 'dark'
                    }}
                    onTimeframeChange={(tf) => handleTimeframeChange('stock', tf as TimeframeType)}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 terminal-card p-6">
          <div className="flex items-center justify-between p-2 border-b border-green-500/20 mb-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-xs">trading_charts.md</div>
          </div>
          <h2 className="text-xl font-bold mb-4 text-green-400 font-mono">ABOUT_TRADING_CHARTS</h2>
          <p className="text-green-300 mb-4 font-mono">
            Our trading charts provide advanced technical analysis tools for cryptocurrency and prediction markets.
            You can analyze price movements, identify trends, and make more informed trading decisions.
          </p>
          
          <h3 className="text-lg font-semibold mb-2 text-green-400 font-mono">{'>'} AVAILABLE_FEATURES:</h3>
          <ul className="list-disc list-inside text-green-300 space-y-1 mb-4 font-mono">
            <li>Multiple timeframes (1H, 1D, 1W, 1M, ALL)</li>
            <li>Candlestick charts with volume indicator</li>
            <li>Technical indicators (SMA, EMA, RSI)</li>
            <li>Interactive price and time tooltips</li>
            <li>Responsive design for all screen sizes</li>
          </ul>
          
          <p className="text-green-300 font-mono">
            These charts are powered by lightweight-charts, a fast and efficient charting library designed for financial data visualization.
          </p>
        </div>
      </div>
    </div>
  );
} 
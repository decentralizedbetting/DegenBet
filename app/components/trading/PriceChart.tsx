"use client";

import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/interactive/index';

// Chart point interface
interface ChartPoint {
  time: string;
  value: number;
}

interface PriceChartProps {
  timeframe: string;
  data?: ChartPoint[];
  color?: string;
  isLoading?: boolean;
}

export function PriceChart({ 
  timeframe, 
  data: propData,
  color = 'rgba(59, 130, 246, 1)',
  isLoading = false 
}: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [highestValue, setHighestValue] = useState<number>(0);
  const [lowestValue, setLowestValue] = useState<number>(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  
  // Generate mock chart data if none provided
  useEffect(() => {
    if (propData && propData.length > 0) {
      setChartData(propData);
      return;
    }

    const now = new Date();
    const data = [];
    
    // Generate points with a semi-random pattern
    let currentValue = 0.65; // Starting value
    const points = timeframe === '1H' ? 60 : 
                  timeframe === '6H' ? 180 : 
                  timeframe === '1D' ? 288 : 
                  timeframe === '1W' ? 168 : 
                  timeframe === '1M' ? 180 : 365;
    
    const intervalMs = timeframe === '1H' ? 60000 : 
                      timeframe === '6H' ? 2 * 60000 : 
                      timeframe === '1D' ? 5 * 60000 : 
                      timeframe === '1W' ? 60 * 60000 : 
                      timeframe === '1M' ? (24 * 60 * 60000) / 6 : (24 * 60 * 60000) / 4;
    
    const volatility = timeframe === '1H' ? 0.002 : 
                     timeframe === '6H' ? 0.003 : 
                     timeframe === '1D' ? 0.005 : 
                     timeframe === '1W' ? 0.01 : 
                     timeframe === '1M' ? 0.02 : 0.04;
    
    for (let i = 0; i < points; i++) {
      const pointTime = new Date(now.getTime() - (points - i) * intervalMs);
      
      // Add some randomness but maintain a general trend
      const change = Math.random() * volatility * 2 - volatility;
      currentValue += change;
      
      // Keep it within reasonable bounds
      if (currentValue < 0.45) currentValue = 0.45 + Math.random() * 0.02;
      if (currentValue > 0.85) currentValue = 0.85 - Math.random() * 0.02;
      
      data.push({
        time: pointTime.toISOString(),
        value: currentValue
      });
    }
    
    setChartData(data);
  }, [timeframe, propData]);

  // Calculate min, max, and other metrics
  useEffect(() => {
    if (chartData.length > 0) {
      const values = chartData.map(point => point.value);
      const highest = Math.max(...values);
      const lowest = Math.min(...values);
      
      setHighestValue(highest);
      setLowestValue(lowest);
      setCurrentPrice(values[values.length - 1]);
      
      // Calculate price change
      const firstPrice = values[0];
      const lastPrice = values[values.length - 1];
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      setPriceChange(change);
    }
  }, [chartData]);

  // Format the currency
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(3)}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <Skeleton width="160px" height="32px" className="mb-2" />
            <Skeleton width="100px" height="16px" />
          </div>
          <Skeleton width="180px" height="24px" />
        </div>
        <Skeleton width="100%" height="300px" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-white">{formatCurrency(currentPrice)}</div>
          <div className={`text-sm font-medium ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}% ({timeframe})
          </div>
        </div>
        <div className="flex space-x-4 text-sm text-gray-400">
          <div>
            <span className="block">High</span>
            <span className="font-medium text-white">{formatCurrency(highestValue)}</span>
          </div>
          <div>
            <span className="block">Low</span>
            <span className="font-medium text-white">{formatCurrency(lowestValue)}</span>
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="relative h-[300px] w-full">
          {/* SVG Chart */}
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${chartData.length} 100`}
            preserveAspectRatio="none"
          >
            {/* Chart background gradient */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Value Range - transform the values to fit in the 0-100 range */}
            {(() => {
              if (chartData.length === 0) return null;
              
              // Calculate the range to scale values to 10-90 (leaving 10% margin)
              const range = highestValue - lowestValue;
              const scaleFactor = range > 0 ? 80 / range : 1;
              
              // Create line points
              const points = chartData.map((point, index) => {
                const yValue = 90 - ((point.value - lowestValue) * scaleFactor + 10);
                return `${index},${yValue}`;
              }).join(' ');
              
              // Create area points (adding bottom corners)
              const areaPoints = `${points} ${chartData.length - 1},100 0,100`;
              
              return (
                <>
                  {/* Area fill */}
                  <polygon
                    points={areaPoints}
                    fill="url(#chartGradient)"
                  />
                  {/* Line */}
                  <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              );
            })()}
          </svg>

          {/* Horizontal guides */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-px bg-green-500/20" />
            <div className="h-px bg-green-500/20" />
            <div className="h-px bg-green-500/20" />
            <div className="h-px bg-green-500/20" />
          </div>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center bg-gray-900/30 rounded-xl">
          <div className="text-gray-400">No chart data available</div>
        </div>
      )}
      
      {/* Time labels */}
      <div className="mt-2 flex justify-between text-xs text-gray-400">
        {chartData.length > 0 && (
          <>
            <div>{new Date(chartData[0].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>{new Date(chartData[Math.floor(chartData.length / 4)].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>{new Date(chartData[Math.floor(chartData.length / 2)].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>{new Date(chartData[Math.floor(chartData.length * 3 / 4)].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div>{new Date(chartData[chartData.length - 1].time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </>
        )}
      </div>
    </div>
  );
} 
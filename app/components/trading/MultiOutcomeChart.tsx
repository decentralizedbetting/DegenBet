"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '@/components/ui/interactive/index';
import type { Market, MarketOutcome } from '@/types/market';

// Define chart point type for each outcome
interface MultiChartPoint {
  time: string;
  [key: string]: string | number; // Dynamic keys for each outcome
}

interface MultiOutcomeChartProps {
  market: Market;
  timeframe: string;
  data?: MultiChartPoint[];
  isLoading?: boolean;
  className?: string;
}

// Generate mock data for the outcomes
const generateMockOutcomeData = (outcomes: MarketOutcome[], timeframe: string): MultiChartPoint[] => {
  const now = new Date();
  const data: MultiChartPoint[] = [];
  
  // Number of data points based on timeframe
  const points = timeframe === '1H' ? 60 : 
                timeframe === '6H' ? 180 : 
                timeframe === '1D' ? 288 : 
                timeframe === '1W' ? 168 : 
                timeframe === '1M' ? 180 : 365;
  
  const volatility = timeframe === '1H' ? 0.005 : 
                    timeframe === '6H' ? 0.01 : 
                    timeframe === '1D' ? 0.015 : 
                    timeframe === '1W' ? 0.03 : 
                    timeframe === '1M' ? 0.05 : 0.08;
  
  // Initial values, making sure they sum to 1 for probabilities
  const values: { [key: string]: number } = {};
  
  // Initialize with actual probabilities
  outcomes.forEach(outcome => {
    values[outcome.id] = outcome.probability;
  });
  
  for (let i = 0; i < points; i++) {
    const pointTime = new Date(now.getTime() - (points - i) * 600000); // 10 minutes per point
    
    const point: MultiChartPoint = {
      time: pointTime.toISOString()
    };
    
    // Add some random movement to each value, but ensure they still sum to 1
    let totalProbability = 0;
    const newValues: { [key: string]: number } = {};
    
    // First pass: apply random changes
    outcomes.forEach(outcome => {
      const change = (Math.random() * volatility * 2) - volatility;
      newValues[outcome.id] = Math.max(0.01, Math.min(0.99, values[outcome.id] + change));
      totalProbability += newValues[outcome.id];
    });
    
    // Second pass: normalize to ensure sum is 1
    outcomes.forEach(outcome => {
      values[outcome.id] = newValues[outcome.id] / totalProbability;
      point[outcome.id] = values[outcome.id];
    });
    
    data.push(point);
  }
  
  return data;
};

export function MultiOutcomeChart({ 
  market, 
  timeframe, 
  data: propData, 
  isLoading = false,
  className = "" 
}: MultiOutcomeChartProps) {
  // Use provided data or generate mock data
  const chartData = propData || generateMockOutcomeData(market.outcomes, timeframe);
  
  // Prepare colors for different outcomes
  const getOutcomeColor = (index: number) => {
    const colors = [
      '#3DAD9C', // Teal primary
      '#FF6B6B', // Red
      '#FFD166', // Yellow
      '#06D6A0', // Mint
      '#118AB2', // Blue
      '#8A4FFF', // Purple
      '#F6F7F8', // Light gray
      '#52D6DF'  // Cyan
    ];
    
    return colors[index % colors.length];
  };
  
  // Format date for tooltip and x-axis
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format percentage for y-axis and tooltip
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm border border-teal-900/20 p-3 rounded shadow-lg">
          <p className="text-gray-400 text-xs mb-2">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center justify-between gap-4">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="text-white font-bold">
                {formatPercentage(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton height="300px" />
      </div>
    );
  }

  return (
    <div className={`w-full bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 ${className}`}>
      <h3 className="text-white font-medium mb-4">Outcome Probabilities</h3>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {market.outcomes.map((outcome, index) => (
                <linearGradient key={outcome.id} id={`gradient-${outcome.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={getOutcomeColor(index)} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={getOutcomeColor(index)} stopOpacity={0.2} />
                </linearGradient>
              ))}
            </defs>
            
            <XAxis 
              dataKey="time" 
              tickFormatter={(time: string) => {
                const date = new Date(time);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280' }}
            />
            
            <YAxis 
              tickFormatter={(value: number) => formatPercentage(value)}
              domain={[0, 1]}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280' }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              formatter={(value) => {
                const outcome = market.outcomes.find(o => o.id === value);
                return outcome ? outcome.label : value;
              }}
              wrapperStyle={{ paddingTop: '8px' }}
            />
            
            {market.outcomes.map((outcome, index) => (
              <Area
                key={outcome.id}
                type="monotone"
                dataKey={outcome.id}
                name={outcome.label}
                stroke={getOutcomeColor(index)}
                fill={`url(#gradient-${outcome.id})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {market.outcomes.map((outcome, index) => (
                     <div key={outcome.id} className="terminal-card p-3">
             <div className="flex items-center justify-between mb-2">
               <span className="font-medium text-green-400 font-mono">{outcome.label.toUpperCase()}</span>
               <span className="text-sm text-gray-500 font-mono">
                 {(outcome.probability * 100).toFixed(1)}%
               </span>
             </div>
             <div className="text-lg font-bold text-green-400 font-mono">
               {(outcome.probability * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
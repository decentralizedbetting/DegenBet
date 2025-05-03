"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createChart, ColorType, LineStyle, CrosshairMode } from 'lightweight-charts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

// Types for our component
export interface PriceData {
  time: string; // Format: 'YYYY-MM-DD' or 'YYYY-MM-DD HH:MM:SS'
  open: number;
  high: number;
  close: number;
  low: number;
  volume?: number;
}

export interface IndicatorValue {
  time: string;
  value: number;
}

export interface ChartOptions {
  width?: number;
  height?: number;
  timeframe?: string; // e.g., "1H", "1D", "1W", "1M"
  showVolume?: boolean;
  indicators?: string[]; // "ma", "ema", "rsi", etc.
  theme?: 'light' | 'dark';
}

export interface TradingChartProps {
  marketId: string;
  marketTitle?: string;
  data: PriceData[];
  options?: ChartOptions;
  onTimeframeChange?: (timeframe: string) => void;
  className?: string;
}

/**
 * Calculate Simple Moving Average
 */
function calculateSMA(data: PriceData[], period: number): IndicatorValue[] {
  const result: IndicatorValue[] = [];
  
  if (data.length < period) {
    return result;
  }
  
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((total, item) => total + item.close, 0);
    result.push({
      time: data[i].time,
      value: sum / period
    });
  }
  
  return result;
}

/**
 * Calculate Exponential Moving Average
 */
function calculateEMA(data: PriceData[], period: number): IndicatorValue[] {
  const result: IndicatorValue[] = [];
  
  if (data.length < period) {
    return result;
  }
  
  // First EMA is SMA
  const sma = data.slice(0, period).reduce((total, item) => total + item.close, 0) / period;
  result.push({
    time: data[period - 1].time,
    value: sma
  });
  
  // Calculate multiplier
  const multiplier = 2 / (period + 1);
  
  // Calculate rest of EMAs
  for (let i = period; i < data.length; i++) {
    const ema = (data[i].close - result[result.length - 1].value) * multiplier + result[result.length - 1].value;
    result.push({
      time: data[i].time,
      value: ema
    });
  }
  
  return result;
}

/**
 * Calculate Relative Strength Index
 */
function calculateRSI(data: PriceData[], period: number): IndicatorValue[] {
  const result: IndicatorValue[] = [];
  
  if (data.length < period + 1) {
    return result;
  }
  
  // Calculate price changes
  const changes: number[] = [];
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i].close - data[i - 1].close);
  }
  
  // Calculate average gains and losses over the specified period
  let gains = 0;
  let losses = 0;
  
  for (let i = 0; i < period; i++) {
    if (changes[i] >= 0) {
      gains += changes[i];
    } else {
      losses -= changes[i];
    }
  }
  
  // First RS value
  gains /= period;
  losses /= period;
  
  // Avoid division by zero
  if (losses === 0) {
    result.push({
      time: data[period].time,
      value: 100
    });
  } else {
    const rs = gains / losses;
    result.push({
      time: data[period].time,
      value: 100 - (100 / (1 + rs))
    });
  }
  
  // Calculate subsequent RSI values
  for (let i = period + 1; i < data.length; i++) {
    // Update average gains and losses
    const change = changes[i - 1];
    
    if (change >= 0) {
      gains = (gains * (period - 1) + change) / period;
      losses = (losses * (period - 1)) / period;
    } else {
      gains = (gains * (period - 1)) / period;
      losses = (losses * (period - 1) - change) / period;
    }
    
    // Calculate RSI
    if (losses === 0) {
      result.push({
        time: data[i].time,
        value: 100
      });
    } else {
      const rs = gains / losses;
      result.push({
        time: data[i].time,
        value: 100 - (100 / (1 + rs))
      });
    }
  }
  
  return result;
}

// Main TradingChart component
export function TradingChart({
  marketId,
  marketTitle = "Market Price",
  data,
  options = {},
  onTimeframeChange,
  className = ""
}: TradingChartProps) {
  // Track if chart is initialized to prevent duplicate initialization
  const chartInitialized = useRef(false);
  
  // Refs and state
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const chartRef = useRef<any>(null);
  const candleSeries = useRef<any>(null);
  const volumeSeries = useRef<any>(null);
  const indicatorSeries = useRef<{ [key: string]: any }>({});
  
  // Store initial options in ref to avoid re-renders when options change
  const initialOptions = useRef<ChartOptions>(options);
  
  // Initialize state from initial options to avoid re-renders when options prop changes
  const [timeframe, setTimeframe] = useState(initialOptions.current.timeframe || "1D");
  const [hoveredData, setHoveredData] = useState<{ price: string; time: string } | null>(null);
  const [activeIndicators, setActiveIndicators] = useState<string[]>(initialOptions.current.indicators || []);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Memoize chart dimensions to prevent unnecessary recalculations
  const chartDimensions = useMemo(() => {
    return {
      width: initialOptions.current.width || 600,
      height: initialOptions.current.height || 400
    };
  }, []);
  
  // Memoize options and theme to prevent unnecessary rerenders
  const chartOptions = useRef(options);
  
  // Available timeframes
  const timeframes = useMemo(() => [
    { value: "1H", label: "1H" },
    { value: "1D", label: "1D" },
    { value: "1W", label: "1W" },
    { value: "1M", label: "1M" },
    { value: "ALL", label: "All" }
  ], []);
  
  // Available indicators
  const indicators = useMemo(() => [
    { value: "sma", label: "SMA(20)", color: "#2962FF", series: "line" },
    { value: "ema", label: "EMA(50)", color: "#FF6D00", series: "line" },
    { value: "rsi", label: "RSI(14)", color: "#9C27B0", series: "separate" }
  ], []);
  
  // Memoize themes to prevent re-renders
  const darkTheme = useMemo(() => ({
    layout: {
      background: { color: 'rgba(0, 0, 0, 0)' },
      textColor: 'rgba(255, 255, 255, 0.7)',
    },
    grid: {
      vertLines: { color: 'rgba(197, 203, 206, 0.1)' },
      horzLines: { color: 'rgba(197, 203, 206, 0.1)' },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: 'rgba(197, 203, 206, 0.3)',
    },
    timeScale: {
      borderColor: 'rgba(197, 203, 206, 0.3)',
      timeVisible: true,
      secondsVisible: false,
    },
  }), []);
  
  const lightTheme = useMemo(() => ({
    layout: {
      background: { color: '#FFFFFF' },
      textColor: '#191919',
    },
    grid: {
      vertLines: { color: 'rgba(42, 46, 57, 0.1)' },
      horzLines: { color: 'rgba(42, 46, 57, 0.1)' },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: 'rgba(42, 46, 57, 0.2)',
    },
    timeScale: {
      borderColor: 'rgba(42, 46, 57, 0.2)',
      timeVisible: true,
      secondsVisible: false,
    },
  }), []);
  
  // Set the theme based on initial options or default to dark (memoized)
  const chartTheme = useMemo(() => 
    initialOptions.current.theme === 'light' ? lightTheme : darkTheme
  , [lightTheme, darkTheme]);
  
  // Handle crosshair move (memoized to prevent recreating on every render)
  const handleCrosshairMove = useCallback((param: any) => {
    if (!param.time || !param.point || param.point.x < 0 || param.point.y < 0) {
      setHoveredData(null);
      return;
    }
    
    const price = param.seriesPrices.get(candleSeries.current);
    if (price) {
      const formattedPrice = typeof price === 'object' 
        ? price.close.toFixed(2) 
        : price.toFixed(2);
        
      const dateStr = param.time;
      setHoveredData({
        price: formattedPrice,
        time: dateStr
      });
    }
  }, []);
  
  // Initialize chart
  useEffect(() => {
    // Prevent duplicate initialization
    if (chartInitialized.current || !chartContainerRef.current) return;
    
    chartInitialized.current = true;
    
    // Create chart instance
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartDimensions.width,
      height: chartDimensions.height,
      ...chartTheme,
      layout: {
        ...chartTheme.layout,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      },
      timeScale: {
        ...chartTheme.timeScale,
        rightOffset: 10,
        barSpacing: 10,
      },
    });
    
    // Add main candlestick series
    candleSeries.current = chartRef.current.addCandlestickSeries({
      upColor: '#26A69A',
      downColor: '#EF5350',
      borderVisible: false,
      wickUpColor: '#26A69A',
      wickDownColor: '#EF5350',
    });
    candleSeries.current.setData(data);
    
    // Add volume series if enabled
    if (initialOptions.current.showVolume) {
      volumeSeries.current = chartRef.current.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'volume',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      
      const volumeData = data.map(item => ({
        time: item.time,
        value: item.volume || 0,
        color: item.close >= item.open ? '#26a69a55' : '#ef535055'
      }));
      
      volumeSeries.current.setData(volumeData);
    }
    
    // Subscribe to crosshair move to update legend
    chartRef.current.subscribeCrosshairMove(handleCrosshairMove);
    
    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candleSeries.current = null;
        volumeSeries.current = null;
        indicatorSeries.current = {};
        chartInitialized.current = false;
      }
      
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [data, chartTheme, chartDimensions, handleCrosshairMove]);
  
  // Handle adding/updating indicators
  const updateIndicators = useCallback(() => {
    if (!chartRef.current || !candleSeries.current) return;
    
    // Clear existing indicators
    Object.values(indicatorSeries.current).forEach((series: any) => {
      chartRef.current.removeSeries(series);
    });
    indicatorSeries.current = {};
    
    // Add selected indicators
    activeIndicators.forEach(indicator => {
      // Find indicator config
      const indicatorConfig = indicators.find(i => i.value === indicator);
      if (!indicatorConfig) return;
      
      let indicatorData: IndicatorValue[] = [];
      
      switch (indicator) {
        case 'sma':
          indicatorData = calculateSMA(data, 20);
          break;
        case 'ema':
          indicatorData = calculateEMA(data, 50);
          break;
        case 'rsi':
          indicatorData = calculateRSI(data, 14);
          break;
      }
      
      if (indicatorData.length === 0) return;
      
      if (indicatorConfig.series === 'line') {
        // Add as line to main chart
        const lineSeries = chartRef.current.addLineSeries({
          color: indicatorConfig.color,
          lineWidth: 1.5,
          title: indicatorConfig.label,
        });
        lineSeries.setData(indicatorData);
        indicatorSeries.current[indicator] = lineSeries;
      } else if (indicatorConfig.series === 'separate' && indicator === 'rsi') {
        // Add RSI as separate pane
        const rsiSeries = chartRef.current.addLineSeries({
          color: indicatorConfig.color,
          lineWidth: 1.5,
          title: 'RSI(14)',
          pane: 1,
          priceFormat: {
            type: 'custom',
            formatter: (price: number) => price.toFixed(2),
          },
        });
        
        // Add RSI levels
        const rsiThresholdSeries30 = chartRef.current.addLineSeries({
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 1,
          pane: 1,
          lineStyle: LineStyle.Dashed,
        });
        
        const rsiThresholdSeries70 = chartRef.current.addLineSeries({
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 1,
          pane: 1,
          lineStyle: LineStyle.Dashed,
        });
        
        // Add threshold lines
        const rsiThreshold30 = indicatorData.map(item => ({
          time: item.time,
          value: 30
        }));
        
        const rsiThreshold70 = indicatorData.map(item => ({
          time: item.time,
          value: 70
        }));
        
        rsiThresholdSeries30.setData(rsiThreshold30);
        rsiThresholdSeries70.setData(rsiThreshold70);
        rsiSeries.setData(indicatorData);
        
        indicatorSeries.current[indicator] = rsiSeries;
        indicatorSeries.current[`${indicator}_threshold30`] = rsiThresholdSeries30;
        indicatorSeries.current[`${indicator}_threshold70`] = rsiThresholdSeries70;
      }
    });
    
    // Fit content after adding series
    chartRef.current.timeScale().fitContent();
  }, [data, activeIndicators]);

  // Update indicators when active indicators change
  useEffect(() => {
    if (chartRef.current && candleSeries.current) {
      updateIndicators();
    }
  }, [updateIndicators]);
  
  // Remove the extra effects that aren't needed now
  // Update data when it changes - this will also update indicators via the useCallback dependency
  useEffect(() => {
    if (!chartRef.current || !candleSeries.current) return;
    
    candleSeries.current.setData(data);
    
    if (volumeSeries.current) {
      const volumeData = data.map(item => ({
        time: item.time,
        value: item.volume || 0,
        color: item.close >= item.open ? '#26a69a55' : '#ef535055'
      }));
      
      volumeSeries.current.setData(volumeData);
    }
    
    // Fit content after updating data
    chartRef.current.timeScale().fitContent();
  }, [data]); // Only rerun when data changes
  
  // Handle window resize
  useEffect(() => {
    if (!chartContainerRef.current || !chartRef.current) return;
    
    const handleResize = () => {
      const parent = chartContainerRef.current?.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      setContainerWidth(width);
      chartRef.current.resize(width, chartDimensions.height);
      chartRef.current.timeScale().fitContent();
    };
    
    // Initial resize
    handleResize();
    
    // Set up resize observer
    resizeObserverRef.current = new ResizeObserver(handleResize);
    if (chartContainerRef.current.parentElement) {
      resizeObserverRef.current.observe(chartContainerRef.current.parentElement);
    }
    
    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [chartDimensions.height]);
  
  // Handle timeframe changes
  const handleTimeframeChange = useCallback((newTimeframe: string) => {
    setTimeframe(newTimeframe);
    if (onTimeframeChange) {
      onTimeframeChange(newTimeframe);
    }
  }, [onTimeframeChange]);
  
  // Toggle indicator visibility
  const toggleIndicator = useCallback((indicator: string) => {
    setActiveIndicators(prevIndicators => {
      if (prevIndicators.includes(indicator)) {
        return prevIndicators.filter(i => i !== indicator);
      } else {
        return [...prevIndicators, indicator];
      }
    });
  }, []);
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-xl">{marketTitle}</CardTitle>
            <div className="text-xs text-muted-foreground mt-1">
              ID: {marketId}
            </div>
          </div>
          
          {/* Timeframes selector */}
          <div className="flex space-x-1 mt-3 md:mt-0">
            {timeframes.map(tf => (
              <Button
                key={tf.value}
                size="sm"
                variant={timeframe === tf.value ? "primary" : "secondary"}
                onClick={() => handleTimeframeChange(tf.value)}
                className="px-2 py-1 h-auto text-xs"
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Chart container */}
          <div className="relative">
            <div ref={chartContainerRef} className="trading-chart" />
            
            {/* Legend overlay */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded px-3 py-2 text-xs text-white z-10">
              {hoveredData ? (
                <>
                  <div className="font-semibold">${hoveredData.price}</div>
                  <div className="text-gray-300 text-xs">{hoveredData.time}</div>
                </>
              ) : (
                <div className="text-xs text-gray-300">Hover chart for details</div>
              )}
            </div>
            
            {/* Indicators selector */}
            <div className="absolute top-4 right-4 flex gap-1 z-10">
              {indicators.map(indicator => (
                <button
                  key={indicator.value}
                  className={`px-2 py-1 text-xs rounded ${
                    activeIndicators.includes(indicator.value)
                      ? 'bg-primary text-white'
                      : 'bg-gray-700/70 hover:bg-gray-600/70 text-gray-200'
                  }`}
                  onClick={() => toggleIndicator(indicator.value)}
                  style={{ borderLeft: `3px solid ${indicator.color}` }}
                >
                  {indicator.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
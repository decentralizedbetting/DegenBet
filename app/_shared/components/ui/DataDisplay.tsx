"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// PriceChart component
export function PriceChart({ 
  data, 
  width = 400, 
  height = 200, 
  color = "#60a5fa", 
  fillColor = "rgba(96, 165, 250, 0.1)" 
}: { 
  data: {timestamp: number, price: number}[], 
  width?: number, 
  height?: number, 
  color?: string, 
  fillColor?: string 
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // Skip if no data
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center bg-white/5 rounded-lg p-4 h-48">
        <p className="text-white/60">No chart data available</p>
      </div>
    );
  }

  // Calculate min/max for scaling
  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const range = maxPrice - minPrice;
  const padding = range * 0.1; // 10% padding
  
  // Normalize data points to fit in the chart
  const normalizeY = (price: number) => {
    return height - ((price - (minPrice - padding)) / ((maxPrice + padding) - (minPrice - padding))) * height;
  };
  
  const normalizeX = (index: number) => {
    return (index / (data.length - 1)) * width;
  };
  
  // Generate SVG path
  const pathD = data.map((point, i) => {
    const x = normalizeX(i);
    const y = normalizeY(point.price);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  // Area fill path (line to bottom and back)
  const areaPath = `${pathD} L ${normalizeX(data.length - 1)} ${height} L ${normalizeX(0)} ${height} Z`;
  
  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <div className="font-medium text-white">Price Chart</div>
        <div className="text-white/60 text-sm">
          {hoverIndex !== null 
            ? formatDate(data[hoverIndex].timestamp) 
            : `Last ${data.length} days`}
        </div>
      </div>
      
      <div className="relative">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((factor, i) => (
            <line 
              key={i} 
              x1={0} 
              y1={height * factor} 
              x2={width} 
              y2={height * factor} 
              stroke="rgba(255, 255, 255, 0.1)" 
              strokeWidth={1} 
            />
          ))}
          
          {/* Area fill */}
          <path d={areaPath} fill={fillColor} />
          
          {/* Line chart */}
          <path d={pathD} fill="none" stroke={color} strokeWidth={2} />
          
          {/* Data points */}
          {data.map((point, i) => (
            <circle
              key={i}
              cx={normalizeX(i)}
              cy={normalizeY(point.price)}
              r={hoverIndex === i ? 4 : 0}
              fill={color}
              stroke="white"
              strokeWidth={hoverIndex === i ? 1 : 0}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{transition: 'r 0.2s, stroke-width 0.2s'}}
            />
          ))}
          
          {/* Hover detection */}
          {data.map((point, i) => (
            <rect
              key={i}
              x={normalizeX(i) - width / (data.length * 2)}
              y={0}
              width={width / data.length}
              height={height}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}
        </svg>
        
        {/* Hover tooltip */}
        {hoverIndex !== null && (
          <div 
            className="absolute bg-gray-800 rounded-lg p-2 text-white text-xs border border-white/10 shadow-lg"
            style={{
              left: `${normalizeX(hoverIndex)}px`,
              top: `${normalizeY(data[hoverIndex].price) - 40}px`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="font-medium">{formatPrice(data[hoverIndex].price)}</div>
            <div className="text-white/60">{formatDate(data[hoverIndex].timestamp)}</div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-white/40">
        <div>{formatDate(data[0].timestamp)}</div>
        <div>{formatDate(data[data.length - 1].timestamp)}</div>
      </div>
    </div>
  );
}

// ProgressBar component
export function ProgressBar({ 
  value, 
  max = 100, 
  label,
  color = "blue", 
  size = "md",
  showValue = true
}: { 
  value: number, 
  max?: number, 
  label?: string,
  color?: "blue" | "green" | "red" | "purple" | "yellow", 
  size?: "sm" | "md" | "lg",
  showValue?: boolean
}) {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, value), max) / max * 100;
  
  // Color class mapping
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500"
  };
  
  // Size class mapping
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm text-white/70">{label}</div>
          {showValue && (
            <div className="text-sm font-medium text-white">{value}/{max}</div>
          )}
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} rounded-full ${sizeClasses[size]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        >
          {size === "lg" && showValue && (
            <div className="flex items-center justify-center h-full text-xs font-medium text-white">
              {percentage.toFixed(0)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// StatsCard component
export function StatsCard({ 
  title, 
  value, 
  change, 
  icon,
  iconBg = "blue",
  trend = "up"
}: { 
  title: string, 
  value: string | number, 
  change?: number, 
  icon?: React.ReactNode | string,
  iconBg?: "blue" | "green" | "red" | "purple" | "yellow",
  trend?: "up" | "down" | "neutral"
}) {
  // Color class mapping
  const bgColorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    red: "bg-red-500/20 text-red-400",
    purple: "bg-purple-500/20 text-purple-400",
    yellow: "bg-yellow-500/20 text-yellow-400"
  };
  
  // Trend color mapping
  const trendColorClasses = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-white/60"
  };
  
  // Icon component
  const renderIcon = () => {
    if (!icon) return null;
    
    // If icon is a string, it's an image URL
    if (typeof icon === 'string') {
      return (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgColorClasses[iconBg]}`}>
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
      );
    }
    
    // Otherwise, it's a React node (SVG icon)
    return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bgColorClasses[iconBg]}`}>
        {icon}
      </div>
    );
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex justify-between items-start">
        {renderIcon()}
        {change !== undefined && (
          <div className={`flex items-center ${trendColorClasses[trend]}`}>
            {trend === 'up' && (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
            {trend === 'down' && (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-white/60 text-sm mb-1">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

// DataTable component
export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns,
  onRowClick
}: { 
  data: T[], 
  columns: {
    key: keyof T,
    header: string,
    width?: string,
    render?: (value: any, row: T) => React.ReactNode
  }[],
  onRowClick?: (row: T) => void
}) {
  return (
    <div className="w-full overflow-x-auto bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 text-left">
            {columns.map((column) => (
              <th 
                key={column.key as string} 
                className="px-4 py-3 text-sm font-medium text-white/80"
                style={column.width ? { width: column.width } : {}}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-white/60">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr 
                key={index} 
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={column.key as string} className="px-4 py-3 text-sm text-white">
                    {column.render 
                      ? column.render(row[column.key], row) 
                      : row[column.key] !== undefined ? String(row[column.key]) : '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Skeleton loaders
export function Skeleton({ 
  variant = "text", 
  width, 
  height,
  className = "",
  rounded = "default" 
}: { 
  variant?: "text" | "rect" | "circle" | "card", 
  width?: string | number, 
  height?: string | number,
  className?: string,
  rounded?: "none" | "default" | "full" | "lg" | "xl"
}) {
  // Variant class mapping
  const variantClasses = {
    text: "h-4 w-full",
    rect: "",
    circle: "rounded-full",
    card: "rounded-xl w-full p-5"
  };
  
  // Rounded class mapping
  const roundedClasses = {
    none: "rounded-none",
    default: "rounded",
    full: "rounded-full",
    lg: "rounded-lg",
    xl: "rounded-xl"
  };
  
  const baseStyles = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined
  };
  
  // Pulse animation class
  const animationClass = "animate-pulse bg-white/10";
  
  return (
    <div 
      className={`${animationClass} ${variantClasses[variant]} ${variant !== 'circle' ? roundedClasses[rounded] : ''} ${className}`}
      style={baseStyles}
    ></div>
  );
}

export function SkeletonMarketCard() {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
      <div className="flex justify-between items-start mb-6">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="rect" width={48} height={24} rounded="lg" />
      </div>
      <div className="mb-4">
        <Skeleton variant="text" width="80%" className="mb-2" />
        <Skeleton variant="text" width="40%" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" width="40%" />
        </div>
        <div>
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rect" width="100%" height={40} rounded="lg" />
    </div>
  );
}

// Tooltip component
export function Tooltip({ 
  content, 
  children,
  position = "top"
}: { 
  content: React.ReactNode, 
  children: React.ReactNode,
  position?: "top" | "bottom" | "left" | "right"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  
  // Position the tooltip relative to the children
  useEffect(() => {
    if (isVisible && tooltipRef.current && childRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;
      
      switch (position) {
        case "top":
          top = -tooltipRect.height - 8;
          left = (childRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = childRect.height + 8;
          left = (childRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = (childRect.height - tooltipRect.height) / 2;
          left = -tooltipRect.width - 8;
          break;
        case "right":
          top = (childRect.height - tooltipRect.height) / 2;
          left = childRect.width + 8;
          break;
      }
      
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    }
  }, [isVisible, position]);
  
  // Position arrow class
  const arrowPositionClass = {
    top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-800 border-x-transparent border-b-transparent",
    bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-800 border-x-transparent border-t-transparent",
    left: "right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-gray-800 border-y-transparent border-r-transparent",
    right: "left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-gray-800 border-y-transparent border-l-transparent"
  };
  
  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip} ref={childRef}>
      {children}
      
      {isVisible && (
        <div 
          ref={tooltipRef} 
          className="absolute z-50 min-w-max max-w-xs bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg border border-white/10"
        >
          {content}
          <div className={`absolute w-0 h-0 border-4 ${arrowPositionClass[position]}`}></div>
        </div>
      )}
    </div>
  );
} 

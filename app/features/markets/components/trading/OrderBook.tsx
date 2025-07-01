"use client";

import React from 'react';
import { Skeleton } from '@/_shared/components/ui/interactive/index';
import { Card } from '@/_shared/components/ui/containers';

// Order type definition
interface Order {
  price: number;
  quantity: number;
  total: number;
  isMine?: boolean;
}

interface OrderBookProps {
  bids: Order[];
  asks: Order[];
  spread?: number;
  isLoading?: boolean;
  maxOrdersToShow?: number;
  showMyOrders?: boolean;
  onOrderClick?: (order: Order, type: 'bid' | 'ask') => void;
}

export function OrderBook({
  bids = [],
  asks = [],
  spread = 0.02,
  isLoading = false,
  maxOrdersToShow = 8,
  showMyOrders = true,
  onOrderClick
}: OrderBookProps) {
  // Format price for display
  const formatPrice = (price: number) => {
    return `$${price.toFixed(3)}`;
  };
  
  // Format quantity for display
  const formatQuantity = (quantity: number) => {
    return quantity.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };
  
  // Calculate the highest total to normalize depth visualization
  const calculateMaxTotal = () => {
    const bidMax = Math.max(...bids.map(order => order.total), 0);
    const askMax = Math.max(...asks.map(order => order.total), 0);
    return Math.max(bidMax, askMax);
  };
  
  const maxTotal = calculateMaxTotal();
  
  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-mono font-bold text-green-400 mb-4">ORDER_BOOK.DAT</h3>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`ask-${i}`} width="100%" height="24px" />
            ))}
            <div className="py-4">
              <Skeleton width="80%" height="32px" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`bid-${i}`} width="100%" height="24px" />
            ))}
          </div>
        </div>
    );
  }
  
  return (
    <div className="p-6">
      <h3 className="text-lg font-mono font-bold text-green-400 mb-4">ORDER_BOOK.DAT</h3>
        
        {/* Column Headers */}
        <div className="grid grid-cols-3 text-xs text-gray-400 mb-3 font-mono border-b border-green-500/20 pb-2">
          <div>PRICE</div>
          <div className="text-right">QTY</div>
          <div className="text-right">TOTAL</div>
        </div>
        
        {/* Asks (Sell Orders) - Displayed in reverse order (highest first) */}
        <div className="space-y-1 mb-4">
          {asks.slice(0, maxOrdersToShow).map((order, index) => (
            <div 
              key={`ask-${index}`}
              className={`grid grid-cols-3 text-sm py-2 px-2 relative cursor-pointer hover:bg-green-500/5 rounded font-mono transition-colors ${order.isMine && showMyOrders ? 'border-l-2 border-green-500' : ''}`}
              onClick={() => onOrderClick && onOrderClick(order, 'ask')}
            >
              {/* Background bar for depth visualization */}
              <div 
                className="absolute right-0 top-0 bottom-0 bg-red-500/10 rounded-r"
                style={{ width: `${(order.total / maxTotal) * 100}%` }}
              ></div>
              
              <div className="text-red-400 relative z-10">{formatPrice(order.price)}</div>
              <div className="text-right relative z-10 text-gray-300">{formatQuantity(order.quantity)}</div>
              <div className="text-right relative z-10 text-gray-300">{formatQuantity(order.total)}</div>
            </div>
          ))}
        </div>
        
        {/* Spread */}
        <div className="py-3 px-3 mb-4 bg-black/30 rounded border border-green-500/30 text-center">
          <span className="text-gray-400 text-sm font-mono">SPREAD: </span>
          <span className="text-green-400 font-medium font-mono">${spread.toFixed(3)} ({(spread * 100).toFixed(2)}%)</span>
        </div>
        
        {/* Bids (Buy Orders) */}
        <div className="space-y-1">
          {bids.slice(0, maxOrdersToShow).map((order, index) => (
            <div 
              key={`bid-${index}`}
              className={`grid grid-cols-3 text-sm py-2 px-2 relative cursor-pointer hover:bg-green-500/5 rounded font-mono transition-colors ${order.isMine && showMyOrders ? 'border-l-2 border-green-500' : ''}`}
              onClick={() => onOrderClick && onOrderClick(order, 'bid')}
            >
              {/* Background bar for depth visualization */}
              <div 
                className="absolute right-0 top-0 bottom-0 bg-green-500/10 rounded-r"
                style={{ width: `${(order.total / maxTotal) * 100}%` }}
              ></div>
              
              <div className="text-green-400 relative z-10">{formatPrice(order.price)}</div>
              <div className="text-right relative z-10 text-gray-300">{formatQuantity(order.quantity)}</div>
              <div className="text-right relative z-10 text-gray-300">{formatQuantity(order.total)}</div>
            </div>
          ))}
        </div>
        
        {bids.length === 0 && asks.length === 0 && (
          <div className="py-12 text-center text-gray-400 font-mono">
            {'>'} No orders in the book
          </div>
        )}
      </div>
  );
} 

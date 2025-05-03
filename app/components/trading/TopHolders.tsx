"use client";

import React from 'react';
import { Skeleton } from '../ui/interactive';
import { Card } from '../ui/containers';

// Holder interface
interface Holder {
  id: string;
  address: string;
  displayName?: string;
  position: number;
  quantity: number;
  type: 'yes' | 'no' | 'liquidity';
  isYou?: boolean;
}

interface TopHoldersProps {
  holders: Holder[];
  isLoading?: boolean;
  maxToShow?: number;
  onHolderClick?: (holder: Holder) => void;
}

export function TopHolders({
  holders = [],
  isLoading = false,
  maxToShow = 5,
  onHolderClick
}: TopHoldersProps) {
  // Format address to display only first and last chars
  const formatAddress = (address: string): string => {
    if (address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Format currency display
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };
  
  // Calculate total position
  const totalPosition = holders.reduce((sum, holder) => sum + holder.position, 0);
  
  // Calculate percentage of total
  const calculatePercentage = (position: number) => {
    if (totalPosition === 0) return 0;
    return (position / totalPosition) * 100;
  };
  
  // Loading state
  if (isLoading) {
    return (
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-white mb-4">Top Holders</h3>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`holder-${i}`} width="100%" height="24px" />
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-4">Top Holders</h3>
        
        {holders.length > 0 ? (
          <div className="space-y-2">
            {holders.slice(0, maxToShow).map((holder, index) => (
              <div 
                key={holder.id}
                className="flex items-center py-2 border-b border-gray-800 last:border-0 text-sm cursor-pointer hover:bg-gray-800/20"
                onClick={() => onHolderClick && onHolderClick(holder)}
              >
                <div className="w-6 text-center text-gray-400">{index + 1}</div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`font-medium ${holder.isYou ? 'text-blue-300' : 'text-white'}`}>
                      {holder.isYou ? 'You' : (holder.displayName || formatAddress(holder.address))}
                    </span>
                    
                    {holder.type && (
                      <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                        holder.type === 'yes' ? 'bg-green-900/30 text-green-400' :
                        holder.type === 'no' ? 'bg-red-900/30 text-red-400' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {holder.type.toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-gray-400 mt-1">
                    <div>
                      {holder.quantity.toLocaleString()} shares
                    </div>
                    <div className="font-medium text-white">
                      {formatCurrency(holder.position)}
                    </div>
                  </div>
                </div>
                
                {/* Percentage bar */}
                <div className="ml-3 w-16">
                  <div className="bg-gray-700 h-1.5 rounded-full w-full">
                    <div 
                      className={`h-full rounded-full ${
                        holder.type === 'yes' ? 'bg-green-500' :
                        holder.type === 'no' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${calculatePercentage(holder.position)}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-0.5">
                    {calculatePercentage(holder.position).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400">
            No position holders yet
          </div>
        )}
      </div>
    </Card>
  );
} 
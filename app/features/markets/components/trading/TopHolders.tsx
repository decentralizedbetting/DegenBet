"use client";

import React from 'react';
import { Skeleton } from '@/_shared/components/ui/interactive/index';
import { Card } from '@/_shared/components/ui/containers';

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
                className="flex items-center py-2 border-b border-green-500/20 last:border-0 text-sm cursor-pointer hover:bg-green-500/10 transition-all duration-200"
                onClick={() => onHolderClick && onHolderClick(holder)}
              >
                <div className="flex-shrink-0 w-8 text-center">
                  <span className={`font-bold font-mono ${
                    index < 3 ? 'text-green-400' : 'text-green-300'
                  }`}>
                    #{index + 1}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0 mx-3">
                  <div className="font-medium text-green-400 truncate font-mono">
                    {holder.isYou ? 'You' : (holder.displayName || formatAddress(holder.address))}
                  </div>
                  
                  {holder.type && (
                    <div className="text-gray-500 text-xs font-mono">
                      {holder.type.toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="font-bold text-green-400 font-mono">
                    {holder.quantity.toLocaleString()} shares
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {formatCurrency(holder.position)}
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

"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/interactive/index';
import { Card } from '@/components/ui/containers';

// Activity item interface 
interface ActivityItem {
  id: string;
  type: 'buy' | 'sell' | 'liquidity' | 'position';
  timestamp: string;
  price: number;
  quantity: number;
  user: {
    address: string;
    isYou?: boolean;
  };
}

interface MarketActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
  maxItemsToShow?: number;
  onActivityClick?: (activity: ActivityItem) => void;
}

export function MarketActivity({
  activities = [],
  isLoading = false,
  maxItemsToShow = 10,
  onActivityClick
}: MarketActivityProps) {
  // Format address to display only first and last chars
  const formatAddress = (address: string): string => {
    if (address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Format timestamp to a readable format
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for grouping
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };
  
  // Get icon based on activity type
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'buy':
        return '↗️';
      case 'sell':
        return '↘️';
      case 'liquidity':
        return '💧';
      case 'position':
        return '📊';
      default:
        return '•';
    }
  };
  
  // Group activities by date
  const groupActivitiesByDate = (activities: ActivityItem[]) => {
    const groups: { [key: string]: ActivityItem[] } = {};
    
    activities.forEach(activity => {
      const dateKey = formatDate(activity.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });
    
    return Object.entries(groups);
  };
  
  const groupedActivities = groupActivitiesByDate(activities);
  
  // Loading state
  if (isLoading) {
    return (
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={`activity-${i}`} width="100%" height="24px" />
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        
        {activities.length > 0 ? (
          <div className="space-y-4">
            {groupedActivities.map(([date, dateActivities]) => (
              <div key={date}>
                <div className="text-xs text-gray-400 mb-2">{date}</div>
                
                <div className="space-y-2">
                  {dateActivities.slice(0, maxItemsToShow).map(activity => (
                    <div 
                      key={activity.id}
                      className="flex items-center py-1.5 border-b border-gray-800 last:border-0 text-sm cursor-pointer hover:bg-gray-800/20"
                      onClick={() => onActivityClick && onActivityClick(activity)}
                    >
                      <div className="w-6 text-center">{getActivityIcon(activity.type)}</div>
                      
                      <div className="flex-1">
                        <div className="flex">
                          <span className={`font-medium ${activity.type === 'buy' ? 'text-green-400' : activity.type === 'sell' ? 'text-red-400' : 'text-blue-400'}`}>
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </span>
                          <span className="mx-1">•</span>
                          <span className={`${activity.user.isYou ? 'text-blue-300' : 'text-gray-400'}`}>
                            {activity.user.isYou ? 'You' : formatAddress(activity.user.address)}
                          </span>
                        </div>
                        
                        <div className="text-gray-300 flex justify-between mt-0.5">
                          <span>
                            {activity.quantity.toLocaleString()} @ ${activity.price.toFixed(3)}
                          </span>
                          <span className="text-gray-500">{formatTime(activity.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400">
            No recent activity
          </div>
        )}
      </div>
    </Card>
  );
} 
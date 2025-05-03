"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/Button';
import { ProbabilitySlider } from '@/app/components/ui/interactive';
import { Input } from '@/app/components/ui/Input';
import { Card } from '@/app/components/ui/containers';

// Market outcome type
interface MarketOutcome {
  id: string;
  label: string;
  probability: number;
  price: number;
}

// Market type
interface Market {
  id: string;
  title: string;
  description?: string;
  category?: string;
  subcategory?: string;
  creator?: string;
  createdAt?: string;
  endsAt: string;
  volume?: number;
  liquidity?: number;
  resolution: null | string;
  outcomes: MarketOutcome[];
  status: string;
  imageUrl?: string;
  network?: string;
}

// Trade details type
interface TradeDetails {
  outcome: string;
  quantity: number;
  price: number;
  slippage: number;
  orderType: 'limit' | 'market';
}

interface TradingInterfaceProps {
  market: any;
  isLoading: boolean;
  selectedOutcome: string;
  setSelectedOutcome: React.Dispatch<React.SetStateAction<string>>;
  orderType: 'limit' | 'market';
  setOrderType: React.Dispatch<React.SetStateAction<'limit' | 'market'>>;
  onTrade: (tradeDetails: TradeDetails) => Promise<void>;
}

export function TradingInterface({ 
  market, 
  isLoading,
  selectedOutcome,
  setSelectedOutcome,
  orderType,
  setOrderType,
  onTrade 
}: TradingInterfaceProps) {
  const [amount, setAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(1.0); // Default 1.0%
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Ensure selected outcome is updated if market changes
  useEffect(() => {
    if (market.outcomes.length > 0 && !market.outcomes.some((o: MarketOutcome) => o.id === selectedOutcome)) {
      setSelectedOutcome(market.outcomes[0].id);
    }
  }, [market, selectedOutcome]);
  
  // Calculate the potential payout based on input amount and selected outcome
  const calculatePayout = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return 0;
    
    const selectedOutcomeData = market.outcomes.find((o: MarketOutcome) => o.id === selectedOutcome);
    if (!selectedOutcomeData) return 0;
    
    // For Yes/No markets, payout is calculated as amount / probability
    return amountNum / selectedOutcomeData.price;
  };
  
  // Format percentage for display
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    
    const selectedOutcomeData = market.outcomes.find((o: MarketOutcome) => o.id === selectedOutcome);
    if (!selectedOutcomeData) return;
    
    setIsSubmitting(true);
    
    try {
      await onTrade({
        outcome: selectedOutcome,
        quantity: calculatePayout(),
        price: selectedOutcomeData.price,
        slippage,
        orderType
      });
      
      // Reset form after successful submission
      setAmount('');
    } catch (error) {
      console.error('Trade failed:', error);
      // Handle error (could show a notification)
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="p-4">
      <h3 className="text-xl font-semibold text-white mb-4">Place a Trade</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Outcome selection */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Select Outcome</label>
          <div className="grid gap-2">
            {market.outcomes.map((outcome: MarketOutcome) => (
              <button
                key={outcome.id}
                type="button"
                className={`p-3 rounded-lg text-left transition ${
                  selectedOutcome === outcome.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedOutcome(outcome.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{outcome.label}</span>
                  <span className="font-medium">
                    {formatPercent(outcome.probability * 100)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Order type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Order Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`p-2 rounded-lg transition ${
                orderType === 'limit' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setOrderType('limit')}
            >
              Limit
            </button>
            <button
              type="button"
              className={`p-2 rounded-lg transition ${
                orderType === 'market' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setOrderType('market')}
            >
              Market
            </button>
          </div>
        </div>
        
        {/* Amount input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Amount (USDC)</label>
          <Input
            type="number"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
            prefix="$"
          />
        </div>
        
        {/* Slippage tolerance */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Slippage Tolerance: {formatPercent(slippage)}
          </label>
          <ProbabilitySlider
            value={slippage}
            onChange={setSlippage}
            min={0.1}
            max={5}
            step={0.1}
          />
        </div>
        
        {/* Trade summary */}
        {amount && !isNaN(parseFloat(amount)) && (
          <div className="mb-6 p-3 bg-gray-800/50 rounded-lg">
            <h4 className="text-sm text-gray-400 mb-2">Trade Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">You pay:</span>
                <span className="text-white">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">You receive:</span>
                <span className="text-white">{calculatePayout().toFixed(2)} shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price per share:</span>
                <span className="text-white">
                  {formatCurrency(market.outcomes.find((o: MarketOutcome) => o.id === selectedOutcome)?.price || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max payout:</span>
                <span className="text-green-400">{formatCurrency(calculatePayout())}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit button */}
        <Button 
          type="submit"
          variant={selectedOutcome === 'yes' ? 'success' : selectedOutcome === 'no' ? 'danger' : 'primary'}
          disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || !selectedOutcome || isSubmitting}
          className="w-full py-3"
        >
          {isSubmitting ? 'Processing...' : 'Place Trade'}
        </Button>
      </form>
      
      {/* Market deadline */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        This market {market.status === 'closed' ? 'ended' : 'ends'} on {new Date(market.endsAt).toLocaleDateString()}
      </div>
    </Card>
  );
} 
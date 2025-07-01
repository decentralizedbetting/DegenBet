"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/_shared/components/ui/Button';
import { ProbabilitySlider } from '@/_shared/components/ui/interactive/index';
import { Input } from '@/_shared/components/ui/Input';
import { Card } from '@/_shared/components/ui/containers';

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
    <div>
      <form onSubmit={handleSubmit}>
        {/* Outcome selection */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-3 font-mono">{'>'} SELECT_OUTCOME:</label>
          <div className="grid gap-2">
            {market.outcomes.map((outcome: MarketOutcome) => (
              <button
                key={outcome.id}
                type="button"
                className={`p-3 rounded border font-mono text-left transition-all duration-200 ${
                  selectedOutcome === outcome.id 
                    ? 'btn-degen text-black' 
                    : 'bg-black/30 border-green-500/30 text-green-400 hover:border-green-500/50 hover:bg-green-500/10'
                }`}
                onClick={() => setSelectedOutcome(outcome.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{outcome.label.toUpperCase()}</span>
                  <span className="font-bold text-xs bg-green-500/20 px-2 py-1 rounded border border-green-500/30">
                    {formatPercent(outcome.probability * 100)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Order type */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-3 font-mono">{'>'} ORDER_TYPE:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`p-3 rounded border font-mono transition-all duration-200 ${
                orderType === 'limit' 
                  ? 'btn-degen text-black' 
                  : 'bg-black/30 border-green-500/30 text-green-400 hover:border-green-500/50 hover:bg-green-500/10'
              }`}
              onClick={() => setOrderType('limit')}
            >
              --LIMIT
            </button>
            <button
              type="button"
              className={`p-3 rounded border font-mono transition-all duration-200 ${
                orderType === 'market' 
                  ? 'btn-degen text-black' 
                  : 'bg-black/30 border-green-500/30 text-green-400 hover:border-green-500/50 hover:bg-green-500/10'
              }`}
              onClick={() => setOrderType('market')}
            >
              --MARKET
            </button>
          </div>
        </div>
        
        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-3 font-mono">{'>'} AMOUNT_USDC:</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-green-400 font-mono">$</span>
          <Input
            type="number"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
              variant="terminal"
              className="pl-8"
          />
          </div>
        </div>
        
        {/* Slippage tolerance */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-3 font-mono">
            {'>'} SLIPPAGE_TOLERANCE: {formatPercent(slippage)}
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
          <div className="mb-6 p-4 bg-black/30 rounded border border-green-500/30">
            <h4 className="text-sm text-green-400 mb-3 font-mono font-bold">{'>'} TRADE_SUMMARY.DAT</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">YOU_PAY:</span>
                <span className="text-green-400">{formatCurrency(parseFloat(amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">YOU_RECEIVE:</span>
                <span className="text-green-400">{calculatePayout().toFixed(2)} shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PRICE_PER_SHARE:</span>
                <span className="text-green-400">
                  {formatCurrency(market.outcomes.find((o: MarketOutcome) => o.id === selectedOutcome)?.price || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">MAX_PAYOUT:</span>
                <span className="text-yellow-400 font-bold">{formatCurrency(calculatePayout())}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit button */}
        <Button 
          type="submit"
          variant="primary"
          disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || !selectedOutcome || isSubmitting}
          className="w-full py-3 font-mono"
        >
          {isSubmitting ? 'PROCESSING...' : '{'>'} EXECUTE_TRADE.EXE'}
        </Button>
      </form>
      
      {/* Market deadline */}
      <div className="mt-4 text-xs text-gray-400 text-center font-mono">
        {'>'} Market {market.status === 'closed' ? 'ended' : 'ends'} on {new Date(market.endsAt).toLocaleDateString()}
      </div>
    </div>
  );
} 

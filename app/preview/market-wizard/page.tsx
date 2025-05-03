"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

// Mock data for market categories and templates
const marketCategories = [
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Price predictions, protocol events, token launches' },
  { id: 'defi', name: 'DeFi', icon: '🏦', description: 'Protocol metrics, TVL predictions, governance' },
  { id: 'nft', name: 'NFT', icon: '🎨', description: 'Floor price predictions, mint events, trading volume' },
  { id: 'sports', name: 'Sports', icon: '⚽', description: 'Match outcomes, player performance, tournaments' },
  { id: 'politics', name: 'Politics', icon: '🗳️', description: 'Election outcomes, policy decisions, governance' },
  { id: 'economics', name: 'Economics', icon: '📈', description: 'Interest rates, GDP, inflation metrics' }
];

// Add type definitions
interface MarketTemplate {
  id: number | string;
  name: string;
  description: string;
}

interface MarketTemplates {
  [key: string]: MarketTemplate[];
}

const marketTemplates: MarketTemplates = {
  crypto: [
    { id: 1, name: 'Token Price Prediction', description: 'Will [token] reach [price] by [date]?' },
    { id: 2, name: 'Protocol Launch', description: 'Will [protocol] launch on mainnet by [date]?' },
    { id: 3, name: 'Trading Volume', description: 'Will [token] 24h volume exceed [amount] by [date]?' }
  ],
  defi: [
    { id: 4, name: 'TVL Milestone', description: 'Will [protocol] TVL reach [amount] by [date]?' },
    { id: 5, name: 'Governance Proposal', description: 'Will [proposal] pass governance by [date]?' }
  ]
};

const resolutionSources = [
  { id: 'chainlink', name: 'Chainlink', icon: '🔗', description: 'Decentralized oracle network' },
  { id: 'uma', name: 'UMA', icon: '🔮', description: 'Optimistic oracle protocol' },
  { id: 'api3', name: 'API3', icon: '🌐', description: 'First-party oracle solution' }
];

export default function MarketWizardPreview() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<MarketTemplate | null>(null);
  const [marketDetails, setMarketDetails] = useState({
    title: '',
    description: '',
    endDate: '',
    resolutionSource: '',
    liquidityAmount: '',
    outcomes: ['Yes', 'No']
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Preview Banner */}
      <div className="bg-amber-500/20 border-b border-amber-500/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-amber-400 font-medium">Preview Mode - Market Creation Wizard</span>
            </div>
            <Link 
              href="/markets"
              className="text-amber-400 hover:text-amber-300 text-sm font-medium"
            >
              Exit Preview
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2" />
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                    stepNumber === step
                      ? 'bg-blue-500 text-white'
                      : stepNumber < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {stepNumber < step ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-400">Category</span>
              <span className="text-sm text-gray-400">Template</span>
              <span className="text-sm text-gray-400">Details</span>
              <span className="text-sm text-gray-400">Review</span>
            </div>
          </div>

          {/* Step Content */}
          <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
            <div className="p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Choose Market Category</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {marketCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-xl border transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-500/20 border-blue-500/50'
                            : 'bg-black/30 border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                            {category.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-gray-400">{category.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Select Market Template</h2>
                  <div className="space-y-4">
                    {marketTemplates[selectedCategory]?.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`w-full p-4 rounded-xl border transition-colors ${
                          selectedTemplate?.id === template.id
                            ? 'bg-blue-500/20 border-blue-500/50'
                            : 'bg-black/30 border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-400">{template.description}</div>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedTemplate({ 
                        id: 'custom', 
                        name: 'Custom Market',
                        description: 'Create a custom market with your own parameters'
                      })}
                      className="w-full p-4 rounded-xl border border-dashed border-gray-700/50 hover:border-gray-600/50 bg-black/30"
                    >
                      <div className="text-center">
                        <div className="font-medium">Create Custom Market</div>
                        <div className="text-sm text-gray-400">Start from scratch with your own parameters</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Market Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Market Question
                      </label>
                      <input
                        type="text"
                        value={marketDetails.title}
                        onChange={(e) => setMarketDetails({ ...marketDetails, title: e.target.value })}
                        placeholder="Will BTC reach $100,000 by Dec 31, 2024?"
                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        value={marketDetails.description}
                        onChange={(e) => setMarketDetails({ ...marketDetails, description: e.target.value })}
                        placeholder="Provide additional context and resolution criteria..."
                        rows={4}
                        className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          End Date
                        </label>
                        <input
                          type="datetime-local"
                          value={marketDetails.endDate}
                          onChange={(e) => setMarketDetails({ ...marketDetails, endDate: e.target.value })}
                          className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Initial Liquidity
                        </label>
                        <input
                          type="number"
                          value={marketDetails.liquidityAmount}
                          onChange={(e) => setMarketDetails({ ...marketDetails, liquidityAmount: e.target.value })}
                          placeholder="1000"
                          className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-4">
                        Resolution Source
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {resolutionSources.map((source) => (
                          <button
                            key={source.id}
                            onClick={() => setMarketDetails({ ...marketDetails, resolutionSource: source.id })}
                            className={`p-4 rounded-xl border transition-colors ${
                              marketDetails.resolutionSource === source.id
                                ? 'bg-blue-500/20 border-blue-500/50'
                                : 'bg-black/30 border-gray-700/50 hover:border-gray-600/50'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">{source.icon}</div>
                              <div className="font-medium">{source.name}</div>
                              <div className="text-sm text-gray-400">{source.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Review Market</h2>
                  <div className="space-y-6">
                    <div className="bg-black/30 rounded-xl p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-400">Category</div>
                          <div className="font-medium">
                            {marketCategories.find(c => c.id === selectedCategory)?.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Template</div>
                          <div className="font-medium">{selectedTemplate?.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Question</div>
                          <div className="font-medium">{marketDetails.title || 'Not set'}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Description</div>
                          <div className="font-medium">{marketDetails.description || 'Not set'}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400">End Date</div>
                            <div className="font-medium">{marketDetails.endDate || 'Not set'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Initial Liquidity</div>
                            <div className="font-medium">
                              {marketDetails.liquidityAmount ? `${marketDetails.liquidityAmount} DINO` : 'Not set'}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Resolution Source</div>
                          <div className="font-medium">
                            {resolutionSources.find(s => s.id === marketDetails.resolutionSource)?.name || 'Not set'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-medium text-amber-400">Important Notice</h4>
                          <p className="text-sm text-amber-300">
                            Creating a market requires a deposit of 100 DINO tokens. This deposit will be returned when the market is resolved, minus a small protocol fee.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <Button variant="ghost" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                <Button
                  variant={step === 4 ? 'success' : 'primary'}
                  onClick={step === 4 ? () => {} : handleNext}
                >
                  {step === 4 ? 'Create Market' : 'Continue'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 
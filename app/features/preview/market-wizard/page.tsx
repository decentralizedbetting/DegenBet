"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/_shared/components/ui/Card';
import { Button } from '@/_shared/components/ui/Button';

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
    <div className="min-h-screen bg-transparent">
      {/* Terminal Preview Banner */}
      <div className="terminal-card mb-6">
        <div className="flex items-center justify-between p-3 border-b border-yellow-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs">preview_mode.exe</div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-lg">⚠️</span>
              <span className="text-yellow-400 font-medium font-mono">PREVIEW MODE - Market Creation Wizard</span>
            </div>
            <Link 
              href="/markets"
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium font-mono"
            >
              {'>'} exit_preview.sh
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Progress Steps */}
          <div className="mb-8">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">wizard_progress.sh</div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2" />
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full font-mono ${
                        stepNumber === step
                          ? 'bg-green-500 text-black'
                          : stepNumber < step
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {stepNumber < step ? (
                        <span className="text-xs">✓</span>
                      ) : (
                        stepNumber
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-400 font-mono">category.sh</span>
                  <span className="text-sm text-gray-400 font-mono">template.exe</span>
                  <span className="text-sm text-gray-400 font-mono">details.json</span>
                  <span className="text-sm text-gray-400 font-mono">review.md</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Step Content */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">market_creation_wizard.exe</div>
            </div>
            <div className="p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 font-mono text-green-400">{'>'} SELECT_MARKET_CATEGORY.SH</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {marketCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-xl border transition-colors terminal-card ${
                          selectedCategory === category.id
                            ? 'border-green-500/50 bg-green-500/10'
                            : 'border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                            {category.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium font-mono text-white">{category.name.toUpperCase()}</div>
                            <div className="text-sm text-gray-400 font-mono">{category.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 font-mono text-purple-400">{'>'} CHOOSE_TEMPLATE.EXE</h2>
                  <div className="space-y-4">
                    {marketTemplates[selectedCategory]?.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`w-full p-4 rounded-xl border transition-colors terminal-card ${
                          selectedTemplate?.id === template.id
                            ? 'border-purple-500/50 bg-purple-500/10'
                            : 'border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium font-mono text-white">{template.name}</div>
                          <div className="text-sm text-gray-400 font-mono">{template.description}</div>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedTemplate({ 
                        id: 'custom', 
                        name: 'Custom Market',
                        description: 'Create a custom market with your own parameters'
                      })}
                      className="w-full p-4 rounded-xl border border-dashed border-gray-700/50 hover:border-gray-600/50 terminal-card"
                    >
                      <div className="text-center">
                        <div className="font-medium font-mono text-orange-400">CREATE_CUSTOM_MARKET.EXE</div>
                        <div className="text-sm text-gray-400 font-mono">Start from scratch with your own parameters</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 font-mono text-blue-400">{'>'} CONFIGURE_MARKET.JSON</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                        market_question:
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-green-400 font-mono">?</span>
                        <input
                          type="text"
                          value={marketDetails.title}
                          onChange={(e) => setMarketDetails({...marketDetails, title: e.target.value})}
                          placeholder="Will Bitcoin reach $100,000 by Dec 31, 2024?"
                          className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                        description:
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-blue-400 font-mono">#</span>
                        <textarea
                          value={marketDetails.description}
                          onChange={(e) => setMarketDetails({...marketDetails, description: e.target.value})}
                          placeholder="Detailed market resolution criteria and terms..."
                          rows={4}
                          className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                          end_date:
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-purple-400 font-mono">📅</span>
                          <input
                            type="datetime-local"
                            value={marketDetails.endDate}
                            onChange={(e) => setMarketDetails({...marketDetails, endDate: e.target.value})}
                            className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-10 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                          initial_liquidity:
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-yellow-400 font-mono">$</span>
                          <input
                            type="number"
                            value={marketDetails.liquidityAmount}
                            onChange={(e) => setMarketDetails({...marketDetails, liquidityAmount: e.target.value})}
                            placeholder="1000"
                            className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-mono">
                        resolution_source:
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {resolutionSources.map((source) => (
                          <button
                            key={source.id}
                            onClick={() => setMarketDetails({...marketDetails, resolutionSource: source.id})}
                            className={`p-4 rounded-xl border transition-colors terminal-card ${
                              marketDetails.resolutionSource === source.id
                                ? 'border-cyan-500/50 bg-cyan-500/10'
                                : 'border-gray-700/50 hover:border-gray-600/50'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">{source.icon}</div>
                              <div className="font-medium font-mono text-white">{source.name.toUpperCase()}</div>
                              <div className="text-xs text-gray-400 font-mono">{source.description}</div>
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
                  <h2 className="text-xl font-semibold mb-6 font-mono text-cyan-400">{'>'} REVIEW_AND_DEPLOY.SH</h2>
                  <div className="space-y-6">
                    <div className="terminal-card border border-cyan-500/30">
                      <div className="p-4">
                        <h3 className="font-mono font-bold mb-3 text-cyan-400">MARKET_SUMMARY.JSON</h3>
                        <div className="space-y-2 text-sm font-mono">
                          <div><span className="text-gray-400">question:</span> <span className="text-white">{marketDetails.title || 'Not set'}</span></div>
                          <div><span className="text-gray-400">category:</span> <span className="text-green-400">{selectedCategory || 'Not selected'}</span></div>
                          <div><span className="text-gray-400">template:</span> <span className="text-purple-400">{selectedTemplate?.name || 'Not selected'}</span></div>
                          <div><span className="text-gray-400">liquidity:</span> <span className="text-yellow-400">${marketDetails.liquidityAmount || '0'}</span></div>
                          <div><span className="text-gray-400">oracle:</span> <span className="text-blue-400">{marketDetails.resolutionSource || 'Not selected'}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-yellow-400 text-xl">⚠️</span>
                        <div>
                          <div className="font-medium font-mono text-yellow-400 mb-1">DEPLOYMENT_WARNING.TXT</div>
                          <div className="text-sm text-gray-300 font-mono">
                            Market creation requires 100 DBT tokens as collateral. This will be returned when the market resolves.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terminal Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-green-500/20">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="btn-degen-secondary font-mono"
                  >
                    {'<'} BACK.SH
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !selectedCategory) ||
                      (step === 2 && !selectedTemplate) ||
                      (step === 3 && (!marketDetails.title || !marketDetails.endDate))
                    }
                    className="btn-degen font-mono text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    NEXT.SH {'>'}
                  </button>
                ) : (
                  <button className="btn-degen font-mono text-black">
                    DEPLOY_MARKET.SH 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

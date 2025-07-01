"use client";

import { useState } from 'react';
import { Button } from '@/_shared/components/ui/Button';
import Link from 'next/link';

// Market creation data
const marketCategories = [
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Price predictions, protocol events, token launches' },
  { id: 'defi', name: 'DeFi', icon: '🏦', description: 'Protocol metrics, TVL predictions, governance' },
  { id: 'nft', name: 'NFT', icon: '🎨', description: 'Floor price predictions, mint events, trading volume' },
  { id: 'sports', name: 'Sports', icon: '⚽', description: 'Match outcomes, player performance, tournaments' },
  { id: 'politics', name: 'Politics', icon: '🗳️', description: 'Election outcomes, policy decisions, governance' },
  { id: 'economics', name: 'Economics', icon: '📈', description: 'Interest rates, GDP, inflation metrics' }
];

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

export default function CreateMarketPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<MarketTemplate | null>(null);
  const [marketDetails, setMarketDetails] = useState({
    title: '',
    description: '',
    endDate: '',
    liquidityAmount: '',
    outcomes: ['Yes', 'No']
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  if (showWizard) {
    return (
      <div className="min-h-screen bg-transparent">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back to Info Button */}
            <div className="mb-6">
              <button 
                onClick={() => setShowWizard(false)}
                className="btn-degen-secondary font-mono"
              >
                {'<'} BACK_TO_INFO.SH
              </button>
            </div>

            {/* Presale Notice */}
            <div className="terminal-card mb-6">
              <div className="flex items-center justify-between p-4 border-b border-orange-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-sm">presale_exclusive.exe</div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-black mb-4 font-mono text-orange-400">
                  WIZARD PREVIEW MODE
                </h2>
                <p className="text-gray-300 font-mono mb-6 leading-relaxed">
                  {'>'} This wizard launches post-presale with full functionality
                  <br />
                  {'>'} Presale participants get early access + 50% discount
                  <br />
                  <span className="text-yellow-400">{'>'} Join presale to become an elite market creator!</span>
                </p>
                <Link href="/presale">
                  <button className="btn-degen font-mono text-black">
                    {'>'} JOIN_PRESALE.EXE
                  </button>
                </Link>
              </div>
            </div>

            {/* Wizard Progress */}
            <div className="terminal-card mb-8">
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
                      {stepNumber < step ? '✓' : stepNumber}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-400 font-mono">category</span>
                  <span className="text-sm text-gray-400 font-mono">template</span>
                  <span className="text-sm text-gray-400 font-mono">details</span>
                  <span className="text-sm text-gray-400 font-mono">deploy</span>
                </div>
              </div>
            </div>

            {/* Wizard Content */}
            <div className="terminal-card">
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-sm">market_wizard.exe</div>
              </div>
              <div className="p-6">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 font-mono text-green-400">{'>'} SELECT_CATEGORY.SH</h2>
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
                      
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                        <div className="text-center">
                          <span className="text-yellow-400 text-lg">⚠️</span>
                          <p className="text-yellow-400 font-mono text-sm mt-2">
                            {'>'} Full template library available to presale participants
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 font-mono text-blue-400">{'>'} MARKET_DETAILS.JSON</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                          {'>'} market_title.txt
                        </label>
                        <input
                          type="text"
                          className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                          placeholder="Enter your prediction market title..."
                          value={marketDetails.title}
                          onChange={(e) => setMarketDetails({...marketDetails, title: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                          {'>'} description.md
                        </label>
                        <textarea
                          rows={4}
                          className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                          placeholder="Detailed market description and resolution criteria..."
                          value={marketDetails.description}
                          onChange={(e) => setMarketDetails({...marketDetails, description: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                            {'>'} end_date.iso
                          </label>
                          <input
                            type="datetime-local"
                            className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            value={marketDetails.endDate}
                            onChange={(e) => setMarketDetails({...marketDetails, endDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                            {'>'} initial_liquidity.dbt
                          </label>
                          <input
                            type="number"
                            className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                            placeholder="1000"
                            value={marketDetails.liquidityAmount}
                            onChange={(e) => setMarketDetails({...marketDetails, liquidityAmount: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 font-mono text-yellow-400">{'>'} DEPLOY_MARKET.SOL</h2>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-yellow-400 text-4xl">🚀</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-mono text-yellow-400">PRESALE REQUIRED</h3>
                      <p className="text-gray-300 font-mono mb-6 leading-relaxed">
                        {'>'} Market deployment requires DBT tokens for gas fees
                        <br />
                        {'>'} Presale participants get 50% discount on deployment costs
                        <br />
                        {'>'} Join presale to unlock the full market creation experience
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/presale">
                          <button className="btn-degen w-full sm:w-auto font-mono text-black">
                            {'>'} JOIN_PRESALE.EXE
                          </button>
                        </Link>
                        <button 
                          onClick={() => setStep(1)}
                          className="btn-degen-secondary w-full sm:w-auto font-mono"
                        >
                          {'>'} RESTART_DEMO.SH
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {step < 4 && (
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handleBack}
                      disabled={step === 1}
                      className="btn-degen-secondary disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                    >
                      {'<'} BACK.SH
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={
                        (step === 1 && !selectedCategory) ||
                        (step === 2 && !selectedTemplate) ||
                        (step === 3 && (!marketDetails.title || !marketDetails.description))
                      }
                      className="btn-degen disabled:opacity-50 disabled:cursor-not-allowed font-mono text-black"
                    >
                      NEXT.EXE {'>'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Breadcrumbs */}
          <div className="mb-6">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">navigation.sh</div>
              </div>
              <div className="p-3">
                <nav className="flex space-x-2 text-sm font-mono">
                  <Link href="/" className="text-green-400 hover:text-green-300">{'>'} /home</Link>
                  <span className="text-gray-500">/</span>
                  <span className="text-white">create_market.exe</span>
            </nav>
              </div>
            </div>
          </div>

          {/* Terminal Header */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">market_factory.exe</div>
            </div>
            <div className="p-6 text-center">
              <h1 className="text-5xl font-black mb-4 font-mono">
                <span className="text-green-400">{'>'}</span> CREATE_MARKETS.SH
              </h1>
              <p className="text-green-300 font-mono leading-relaxed">
                {'>'} Deploy your own prediction markets with one click
                <br />
                {'>'} Coming soon for DBT presale participants
                <br />
                <span className="text-orange-400 font-bold">{'>'} Join presale for early creator access! 🚀</span>
              </p>
            </div>
          </div>

          {/* Terminal Status */}
          <div className="terminal-card text-center mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">deployment_status.sh</div>
            </div>
            <div className="p-8">
              <div className="mx-auto w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-orange-400 text-4xl font-mono">🚀</span>
              </div>
              <h2 className="text-4xl font-black mb-4 font-mono text-orange-400">
                PRESALE PHASE ACTIVE
              </h2>
              <p className="text-green-300 font-mono text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                {'>'} Market creation wizard launches post-presale
                <br />
                {'>'} Private sale: $200K goal at $0.002/DBT
                <br />
                {'>'} Early backers get exclusive creator privileges
                <br />
                <span className="text-yellow-400">{'>'} Join now before public sale opens!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link href="/presale">
                  <button className="btn-degen w-full sm:w-auto font-mono text-black text-lg px-8 py-3">
                    {'>'} JOIN_PRESALE.EXE
                  </button>
                </Link>
                <button 
                  onClick={() => setShowWizard(true)}
                  className="btn-degen-secondary w-full sm:w-auto font-mono text-lg px-8 py-3"
                >
                  {'>'} PREVIEW_WIZARD.EXE
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Features Coming Soon */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">wizard.exe</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 text-2xl">✨</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-green-400">NO-CODE_WIZARD</h3>
                <p className="text-gray-400 text-sm font-mono">Deploy markets in 60 seconds with guided wizard</p>
                <div className="mt-3 text-xs font-mono text-orange-400">POST-PRESALE</div>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">contracts.sol</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-2xl">⚡</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-purple-400">AUTO_RESOLUTION</h3>
                <p className="text-gray-400 text-sm font-mono">Chainlink oracles for automated market settlement</p>
                <div className="mt-3 text-xs font-mono text-orange-400">POST-PRESALE</div>
              </div>
                </div>
                
            <div className="terminal-card">
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="terminal-text text-xs">governance.dao</div>
                  </div>
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">🏛️</span>
                </div>
                <h3 className="font-mono font-bold mb-2 text-blue-400">DAO_GOVERNANCE</h3>
                <p className="text-gray-400 text-sm font-mono">DBT holders control market categories & rules</p>
                <div className="mt-3 text-xs font-mono text-orange-400">PRESALE ACCESS</div>
              </div>
                </div>
              </div>

          {/* Presale Benefits */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">presale_benefits.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-mono font-bold mb-6 text-green-400 text-center">
                {'>'} PRESALE_CREATOR_PERKS.EXE
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-mono text-white">Early access to market creation wizard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-mono text-white">50% discount on market deployment fees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-mono text-white">Priority listing on homepage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-mono text-white">Exclusive creator badges & reputation</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-xl">🏆</span>
                    <span className="font-mono text-white">DAO voting power from day one</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-xl">🏆</span>
                    <span className="font-mono text-white">Higher revenue share on created markets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-xl">🏆</span>
                    <span className="font-mono text-white">Custom market categories proposal rights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-xl">🏆</span>
                    <span className="font-mono text-white">Beta tester access to new features</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Actions */}
          <div className="terminal-card mb-8">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">quick_actions.sh</div>
            </div>
            <div className="p-6 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/markets">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} BROWSE_DEMO_MARKETS.EXE
                  </button>
                </Link>
                <button 
                  onClick={() => setShowWizard(true)}
                  className="btn-degen-secondary w-full sm:w-auto font-mono"
                >
                  {'>'} PREVIEW_WIZARD.EXE
                </button>
                <Link href="/token">
                  <button className="btn-degen-secondary w-full sm:w-auto font-mono">
                    {'>'} DBT_TOKENOMICS.SH
                  </button>
                </Link>
              </div>
            </div>
              </div>

          {/* Terminal Newsletter */}
          <div className="terminal-card">
            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-sm">notifications.sh</div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-mono font-bold mb-3 text-green-400">PRESALE LAUNCH ALERTS</h3>
              <p className="text-gray-400 font-mono mb-4">Get notified about presale phases & creator beta access!</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-green-400 font-mono">$</span>
                  <input
                    type="email"
                    placeholder="your_email@degen.wtf"
                    className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full pl-8 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                  />
                </div>
                <button className="btn-degen font-mono text-black">
                  NOTIFY.SH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

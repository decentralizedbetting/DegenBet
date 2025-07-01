'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PresaleNavigation } from './components/PresaleNavigation';
import { useWalletConnection } from '@/_shared/hooks/useWalletConnection';
import { ModernWalletButton } from '@/_shared/components/ui/ModernWalletButton';

// Production configuration
const PRESALE_DATA = {
  currentPhase: 'Private',
  totalGoal: 200000, // $200K USD
  currentRaised: 47350, // Current amount raised
  tokenPrice: 0.002, // $0.002 per DBT
  tokensAllocated: 100000000, // 100M DBT for private sale
  tokensSold: 23675000, // Tokens sold so far
  participants: 89,
  timeLeft: {
    days: 12,
    hours: 8,
    minutes: 34,
    seconds: 22
  },
  // PRODUCTION CONFIGURATION
  receivingAddress: '0x8D3D4caDeFd1BDC27ccB2fb27aaB05aDAD03A7f9', // Your Trust Wallet BNB receiving address
  network: {
    chainId: '0x38', // BNB Smart Chain
    chainName: 'BNB Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/']
  }
};

export default function PresalePage() {
  const [countdown, setCountdown] = useState(PRESALE_DATA.timeLeft);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'purchasing' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');
  
  // Use modern wallet connection hook
  const { 
    isConnected, 
    address, 
    isCorrectNetwork, 
    switchToBSC,
    addToWhitelist
  } = useWalletConnection();

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressPercentage = (PRESALE_DATA.currentRaised / PRESALE_DATA.totalGoal) * 100;
  const tokenProgressPercentage = (PRESALE_DATA.tokensSold / PRESALE_DATA.tokensAllocated) * 100;

  const handlePurchase = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!isCorrectNetwork) {
      try {
        await switchToBSC();
      } catch (error) {
        alert('Please switch to BNB Smart Chain to continue');
        return;
      }
    }
    
    if (!purchaseAmount || parseFloat(purchaseAmount) < 0.1) {
      alert('Minimum purchase amount is 0.1 BNB');
      return;
    }
    
    if (parseFloat(purchaseAmount) > 50) {
      alert('Maximum purchase amount is 50 BNB');
      return;
    }

    // Calculate DBT tokens to receive
    const dbtTokens = parseFloat(purchaseAmount) / PRESALE_DATA.tokenPrice;
    
    const confirmation = confirm(
      `🚀 PURCHASE CONFIRMATION\n\n` +
      `💰 Amount: ${purchaseAmount} BNB\n` +
      `🎯 DBT Tokens: ${dbtTokens.toLocaleString()} DBT\n` +
      `📊 Rate: $${PRESALE_DATA.tokenPrice} per DBT\n\n` +
      `📬 Receiving Address: ${PRESALE_DATA.receivingAddress}\n\n` +
      `✅ Your address will be automatically whitelisted\n\n` +
      `Proceed with purchase?`
    );
    
    if (confirmation) {
      setPurchaseStatus('purchasing');
      
      try {
        if (window.ethereum) {
          // Convert BNB to Wei (18 decimals)
          const valueInWei = BigInt(Math.floor(parseFloat(purchaseAmount) * 1e18));
          
          const transactionParameters = {
            to: PRESALE_DATA.receivingAddress,
            from: address,
            value: '0x' + valueInWei.toString(16),
            gas: '0x5208', // 21000 gas for simple transfer
            gasPrice: '0x02540be400', // 10 Gwei
          };
          
          // Request transaction through MetaMask
          const transactionHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
          
          setTxHash(transactionHash);
          setPurchaseStatus('success');
          
          // Add to whitelist with transaction hash
          await addToWhitelist(address, transactionHash);
          
          alert(
            `🎉 TRANSACTION SUCCESSFUL!\n\n` +
            `📋 Transaction Hash: ${transactionHash}\n\n` +
            `🎯 You will receive: ${dbtTokens.toLocaleString()} DBT tokens\n` +
            `✅ Address whitelisted: ${address}\n\n` +
            `📊 View on BSCScan: https://bscscan.com/tx/${transactionHash}`
          );
          
          // Clear purchase amount
          setPurchaseAmount('');
          
        } else {
          // Fallback for manual transfer
          alert(
            `📱 MANUAL TRANSFER REQUIRED\n\n` +
            `Send exactly ${purchaseAmount} BNB to:\n` +
            `📬 ${PRESALE_DATA.receivingAddress}\n\n` +
            `After transaction confirmation:\n` +
            `🎯 You will receive: ${dbtTokens.toLocaleString()} DBT tokens\n` +
            `✅ Your address will be whitelisted\n\n` +
            `💾 Save your transaction hash for verification.`
          );
          
        }
      } catch (error: any) {
        console.error('Transaction failed:', error);
        setPurchaseStatus('error');
        
        if (error.code === 4001) {
          alert('❌ Transaction cancelled by user');
        } else {
          alert(`❌ Transaction failed: ${error.message || 'Unknown error'}\n\nPlease try again or contact support.`);
        }
      }
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Navigation */}
        <PresaleNavigation />

        {/* Terminal Header */}
        <motion.div 
          className="terminal-card mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-sm flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>presale_dbt.exe</span>
            </div>
          </div>
          <div className="p-8 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-black font-mono mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-green-400">{'>'}</span>{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                DBT_PRESALE.EXE
              </span>
            </motion.h1>
            <motion.div 
              className="space-y-2 text-green-300 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="flex items-center justify-center space-x-2">
                <span className="text-green-400">{'>'}</span>
                <span className="animate-pulse">Initializing DegenBet Token Private Sale...</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-green-400">{'>'}</span>
                <span className="text-yellow-400 font-bold">PHASE 1: PRIVATE</span>
                <span>|</span>
                <span className="text-purple-400">BNB Chain</span>
                <span>|</span>
                <span className="text-blue-400">${PRESALE_DATA.tokenPrice} per DBT</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Buy DBT - Conversion Focused Section */}
        <motion.div 
          className="terminal-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-sm">why_buy_dbt.exe</div>
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-black mb-6 font-mono text-center text-orange-400">
              {'>'} WHY_BUY_DBT.EXE
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-400 text-3xl">🏛️</span>
                </div>
                <h3 className="font-mono font-bold mb-3 text-purple-400">DAO_GOVERNANCE</h3>
                <p className="text-gray-300 text-sm font-mono mb-4">Control the platform from day one. Vote on market categories, fees, and treasury decisions.</p>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                  <span className="text-purple-300 font-mono text-sm font-bold">1 DBT = 1 Vote</span>
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 text-3xl">💎</span>
                </div>
                <h3 className="font-mono font-bold mb-3 text-green-400">TRADING_CURRENCY</h3>
                <p className="text-gray-300 text-sm font-mono mb-4">The native token for all prediction market betting. 100% of platform volume flows through DBT.</p>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <span className="text-green-300 font-mono text-sm font-bold">100% Platform Volume</span>
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-400 text-3xl">💰</span>
                </div>
                <h3 className="font-mono font-bold mb-3 text-yellow-400">PRESALE_PERKS</h3>
                <p className="text-gray-300 text-sm font-mono mb-4">Private sale holders get lifetime fee discounts, revenue sharing, and exclusive access.</p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <span className="text-yellow-300 font-mono text-sm font-bold">50% Fee Discount Forever</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center">
              <h4 className="text-xl font-mono font-bold mb-3 text-orange-400">PRESALE EXCLUSIVE BENEFITS</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">50% platform fee discount for life</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">2-5% quarterly revenue sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Early access to all new markets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Governance voting from launch day</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Exclusive founder NFT badges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-gray-300">Priority customer support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Countdown Timer */}
          <motion.div 
            className="terminal-card lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="terminal-text text-xs">countdown.sh</div>
            </div>
            <div className="p-6">
              <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
                <span className="text-green-400 mr-2">{'>'}</span>
                TIME_REMAINING
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'DAYS', value: countdown.days },
                  { label: 'HRS', value: countdown.hours },
                  { label: 'MIN', value: countdown.minutes },
                  { label: 'SEC', value: countdown.seconds }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-2">
                      <div className="text-2xl font-mono font-bold text-green-400">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-center">
                <span className="text-red-400 text-sm font-mono">
                  {'>'} PRIVATE_SALE_ENDING_SOON
                </span>
              </div>
            </div>
          </motion.div>

          {/* Progress Stats */}
          <motion.div 
            className="terminal-card lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="terminal-text text-xs">live_metrics.sh</div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 font-mono">
                    ${PRESALE_DATA.currentRaised.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400 font-mono">RAISED</div>
                  <div className="text-xs text-purple-400 font-mono">
                    / ${PRESALE_DATA.totalGoal.toLocaleString()} GOAL
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 font-mono">
                    {(PRESALE_DATA.tokensSold / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-400 font-mono">DBT SOLD</div>
                  <div className="text-xs text-purple-400 font-mono">
                    / {(PRESALE_DATA.tokensAllocated / 1000000)}M TOTAL
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 font-mono">
                    {PRESALE_DATA.participants}
                  </div>
                  <div className="text-sm text-gray-400 font-mono">DEGENS</div>
                  <div className="text-xs text-purple-400 font-mono">JOINED</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-green-400">USD PROGRESS</span>
                    <span className="text-yellow-400">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-green-500/30">
                    <motion.div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1.5, delay: 1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"></div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-green-400">TOKEN ALLOCATION</span>
                    <span className="text-yellow-400">{tokenProgressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-green-500/30">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${tokenProgressPercentage}%` }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wallet Connection - Using Modern Component */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <ModernWalletButton variant="presale" />
        </motion.div>

        {/* Purchase Interface */}
        {isConnected && isCorrectNetwork && (
          <motion.div 
            className="terminal-card mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-green-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="terminal-text text-xs">purchase_dbt.exe</div>
            </div>
            <div className="p-6">
              <h3 className="text-green-400 font-mono text-lg mb-6 flex items-center">
                <span className="text-green-400 mr-2">{'>'}</span>
                PURCHASE_DBT_TOKENS
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    {'>'} BNB_AMOUNT.INPUT
                  </label>
                  <input
                    type="number"
                    className="bg-black/30 border border-green-500/30 text-green-400 rounded font-mono w-full px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 placeholder-gray-500"
                    placeholder="Enter BNB amount..."
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    step="0.1"
                    min="0.1"
                    max="50"
                    disabled={purchaseStatus === 'purchasing'}
                  />
                  <div className="mt-2 text-xs text-gray-400 font-mono">
                    {'>'} Min: 0.1 BNB • Max: 50 BNB
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    {'>'} DBT_TOKENS.OUTPUT
                  </label>
                  <div className="bg-black/30 border border-purple-500/30 text-purple-400 rounded font-mono w-full px-4 py-3">
                    {purchaseAmount ? (parseFloat(purchaseAmount) / PRESALE_DATA.tokenPrice).toLocaleString() : '0'} DBT
                  </div>
                  <div className="mt-2 text-xs text-gray-400 font-mono">
                    {'>'} Rate: 1 BNB = {(1 / PRESALE_DATA.tokenPrice).toLocaleString()} DBT
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={handlePurchase}
                  disabled={!purchaseAmount || parseFloat(purchaseAmount) < 0.1 || purchaseStatus === 'purchasing'}
                  className="btn-degen px-8 py-3 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {purchaseStatus === 'purchasing' ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>PROCESSING...</span>
                    </div>
                  ) : (
                    'PURCHASE_DBT.EXE'
                  )}
                </button>
              </div>

              {/* Purchase Status */}
              {purchaseStatus === 'success' && txHash && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-green-400">🎉</span>
                    <span className="text-green-400 font-mono text-sm">TRANSACTION_SUCCESS</span>
                  </div>
                  <div className="text-gray-300 text-xs font-mono">
                    {'>'} Hash: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </div>
                  <button 
                    onClick={() => window.open(`https://bscscan.com/tx/${txHash}`, '_blank')}
                    className="mt-2 px-3 py-1 bg-green-600/20 border border-green-600/30 text-green-400 rounded text-xs hover:bg-green-600/30 transition-colors font-mono"
                  >
                    VIEW_ON_BSCSCAN
                  </button>
                </div>
              )}

              {/* Receiving Address Display */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-400">🔐</span>
                  <span className="text-blue-400 font-mono text-sm">RECEIVING_ADDRESS</span>
                </div>
                <div className="bg-black/50 border border-blue-500/30 rounded p-3 font-mono text-xs break-all">
                  <span className="text-green-400">{PRESALE_DATA.receivingAddress}</span>
                </div>
                <p className="text-gray-400 text-xs font-mono mt-2">
                  {'>'} All BNB payments sent here • Auto-whitelist on purchase
                </p>
                <div className="flex items-center space-x-2 mt-3">
                  <button 
                    onClick={() => navigator.clipboard.writeText(PRESALE_DATA.receivingAddress)}
                    className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded text-xs hover:bg-blue-600/30 transition-colors font-mono"
                  >
                    COPY_ADDRESS
                  </button>
                  <button 
                    onClick={() => window.open(`https://bscscan.com/address/${PRESALE_DATA.receivingAddress}`, '_blank')}
                    className="px-3 py-1 bg-green-600/20 border border-green-600/30 text-green-400 rounded text-xs hover:bg-green-600/30 transition-colors font-mono"
                  >
                    VIEW_ON_BSCSCAN
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Live Activity Feed */}
        <motion.div 
          className="terminal-card mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-xs">live_feed.sh</div>
          </div>
          <div className="p-6">
            <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
              <span className="text-green-400 mr-2">{'>'}</span>
              LIVE_DEGEN_ACTIVITY
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-terminal">
              {[
                { address: '0x7B...4D9', amount: '12.5 BNB', tokens: '6,250 DBT', time: '2 min ago' },
                { address: '0x9C...8F2', amount: '25.0 BNB', tokens: '12,500 DBT', time: '5 min ago' },
                { address: '0x3A...1B7', amount: '8.2 BNB', tokens: '4,100 DBT', time: '8 min ago' },
                { address: '0x6E...5C4', amount: '50.0 BNB', tokens: '25,000 DBT', time: '12 min ago' },
                { address: '0x2F...9D8', amount: '15.7 BNB', tokens: '7,850 DBT', time: '18 min ago' }
              ].map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/10 rounded text-sm font-mono">
                  <div className="flex items-center space-x-4">
                    <span className="text-green-400">{'>'}</span>
                    <span className="text-purple-400">{tx.address}</span>
                    <span className="text-yellow-400">{tx.amount}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-400">{tx.tokens}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{tx.time}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded text-center">
              <span className="text-purple-400 text-sm font-mono">
                {'>'} Join {PRESALE_DATA.participants} degens • ${PRESALE_DATA.currentRaised.toLocaleString()} raised
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 

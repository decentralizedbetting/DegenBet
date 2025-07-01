'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SmartContractInterfaceProps {
  isConnected: boolean;
  walletAddress?: string;
}

interface VestingSchedule {
  totalTokens: number;
  releasedTokens: number;
  nextUnlockDate: Date;
  nextUnlockAmount: number;
  claimableTokens: number;
}

interface PurchaseHistory {
  id: string;
  amount: number;
  tokensReceived: number;
  timestamp: Date;
  txHash: string;
  status: 'completed' | 'pending' | 'failed';
}

export function SmartContractInterface({ isConnected, walletAddress }: SmartContractInterfaceProps) {
  const [vestingData, setVestingData] = useState<VestingSchedule>({
    totalTokens: 125000, // Example: purchased 125K DBT
    releasedTokens: 12500, // 10% TGE already released
    nextUnlockDate: new Date('2025-02-15'),
    nextUnlockAmount: 18750, // Monthly unlock amount
    claimableTokens: 0
  });

  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([
    {
      id: '1',
      amount: 25,
      tokensReceived: 125000,
      timestamp: new Date('2024-12-01'),
      txHash: '0xabc123...def456',
      status: 'completed'
    },
    {
      id: '2',
      amount: 12.5,
      tokensReceived: 62500,
      timestamp: new Date('2024-12-10'),
      txHash: '0x789xyz...456abc',
      status: 'completed'
    }
  ]);

  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [lastClaimTx, setLastClaimTx] = useState<string>('');

  // Simulate vesting calculations
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tgeDate = new Date('2024-12-01'); // TGE date
      const cliffDate = new Date('2025-03-01'); // 3-month cliff
      
      if (now > cliffDate) {
        // Calculate how many months have passed since cliff
        const monthsSinceCliff = Math.floor((now.getTime() - cliffDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
        const monthlyUnlock = vestingData.totalTokens * 0.15; // 15% per month after cliff
        const shouldBeReleased = vestingData.totalTokens * 0.1 + (monthlyUnlock * monthsSinceCliff);
        const claimable = Math.max(0, shouldBeReleased - vestingData.releasedTokens);
        
        setVestingData(prev => ({
          ...prev,
          claimableTokens: Math.min(claimable, prev.totalTokens - prev.releasedTokens)
        }));
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [vestingData.totalTokens, vestingData.releasedTokens]);

  const handleClaimTokens = async () => {
    if (vestingData.claimableTokens === 0) return;
    
    setIsClaimLoading(true);
    
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const txHash = `0x${Math.random().toString(16).substr(2, 40)}`;
      setLastClaimTx(txHash);
      
      setVestingData(prev => ({
        ...prev,
        releasedTokens: prev.releasedTokens + prev.claimableTokens,
        claimableTokens: 0
      }));
      
    } catch (error) {
      console.error('Claim failed:', error);
    } finally {
      setIsClaimLoading(false);
    }
  };

  const vestingProgress = (vestingData.releasedTokens / vestingData.totalTokens) * 100;
  const unlockedPercent = vestingProgress;

  if (!isConnected) {
    return (
      <div className="terminal-card">
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="terminal-text text-xs">smart_contract.sh</div>
        </div>
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-400 text-2xl">📋</span>
          </div>
          <h3 className="text-blue-400 font-mono text-lg mb-2">CONTRACT_INTERFACE</h3>
          <p className="text-gray-400 font-mono text-sm">
            {'>'} Connect wallet to view your DBT tokens and vesting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vesting Overview */}
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">vesting_schedule.sh</div>
        </div>
        <div className="p-6">
          <h3 className="text-green-400 font-mono text-xl mb-6 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            DBT_VESTING_SCHEDULE
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 font-mono">
                {vestingData.totalTokens.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">TOTAL DBT</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 font-mono">
                {vestingData.releasedTokens.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">RELEASED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 font-mono">
                {vestingData.claimableTokens.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">CLAIMABLE</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 font-mono">
                {(vestingData.totalTokens - vestingData.releasedTokens).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">LOCKED</div>
            </div>
          </div>

          {/* Vesting Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-mono mb-2">
              <span className="text-green-400">VESTING PROGRESS</span>
              <span className="text-yellow-400">{vestingProgress.toFixed(1)}% UNLOCKED</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 border border-green-500/30">
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${unlockedPercent}%` }}
                transition={{ duration: 1.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line"></div>
              </motion.div>
            </div>
          </div>

          {/* Vesting Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="text-blue-400 font-mono text-sm mb-3">VESTING_TERMS</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">TGE Release:</span>
                  <span className="text-green-400">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cliff Period:</span>
                  <span className="text-yellow-400">3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vesting Period:</span>
                  <span className="text-purple-400">6 months linear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Release:</span>
                  <span className="text-blue-400">15%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="text-purple-400 font-mono text-sm mb-3">NEXT_UNLOCK</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-green-400">{vestingData.nextUnlockDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-yellow-400">{vestingData.nextUnlockAmount.toLocaleString()} DBT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Days Left:</span>
                  <span className="text-purple-400">
                    {Math.max(0, Math.ceil((vestingData.nextUnlockDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Claim Button */}
          <div className="mt-6">
            <button
              onClick={handleClaimTokens}
              disabled={vestingData.claimableTokens === 0 || isClaimLoading}
              className={`w-full py-4 rounded-lg font-mono text-lg transition-all duration-200 ${
                vestingData.claimableTokens > 0 && !isClaimLoading
                  ? 'btn-degen'
                  : 'bg-gray-500/20 border border-gray-500/30 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isClaimLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>CLAIMING_TOKENS...</span>
                </div>
              ) : vestingData.claimableTokens > 0 ? (
                `CLAIM_${vestingData.claimableTokens.toLocaleString()}_DBT`
              ) : (
                'NO_TOKENS_TO_CLAIM'
              )}
            </button>

            {lastClaimTx && (
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded text-center">
                <p className="text-green-400 text-sm font-mono">
                  {'>'} Claim successful! TX: {lastClaimTx.slice(0, 10)}...{lastClaimTx.slice(-6)}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Purchase History */}
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">purchase_history.sh</div>
        </div>
        <div className="p-6">
          <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            PURCHASE_HISTORY
          </h3>
          <div className="space-y-3">
            {purchaseHistory.map((purchase) => (
              <div key={purchase.id} className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-green-400">{'>'}</span>
                    <span className="text-yellow-400 font-mono text-sm">{purchase.amount} BNB</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-400 font-mono text-sm">{purchase.tokensReceived.toLocaleString()} DBT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      purchase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      purchase.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {purchase.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>{purchase.timestamp.toLocaleDateString()} {purchase.timestamp.toLocaleTimeString()}</span>
                  <span>TX: {purchase.txHash.slice(0, 10)}...{purchase.txHash.slice(-6)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contract Information */}
      <motion.div 
        className="terminal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between p-3 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="terminal-text text-xs">contract_info.sh</div>
        </div>
        <div className="p-6">
          <h3 className="text-green-400 font-mono text-lg mb-4 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            SMART_CONTRACT_INFO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 font-mono text-sm">DBT Token:</span>
                <span className="text-green-400 font-mono text-sm">0x1234...5678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-mono text-sm">Presale Contract:</span>
                <span className="text-green-400 font-mono text-sm">0xABCD...EFGH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-mono text-sm">Vesting Contract:</span>
                <span className="text-green-400 font-mono text-sm">0x9876...5432</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 font-mono text-sm">Chain:</span>
                <span className="text-yellow-400 font-mono text-sm">BNB Smart Chain</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-mono text-sm">Chain ID:</span>
                <span className="text-purple-400 font-mono text-sm">56</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-mono text-sm">Verified:</span>
                <span className="text-green-400 font-mono text-sm">✅ BSCScan</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 

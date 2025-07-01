'use client';

import { useWallet } from '@/_shared/contexts/WalletContext';

interface UnifiedWalletButtonProps {
  variant?: 'header' | 'presale' | 'minimal';
  onConnectSuccess?: () => void;
  className?: string;
}

export function UnifiedWalletButton({ 
  variant = 'header', 
  onConnectSuccess,
  className = ''
}: UnifiedWalletButtonProps) {
  const { 
    isConnected, 
    walletAddress, 
    isCorrectNetwork,
    isConnecting,
    disconnectWallet,
    switchToBSC,
    openWalletModal
  } = useWallet();

  const handleConnect = () => {
    openWalletModal();
  };

  const handleDisconnect = async () => {
    const confirmed = confirm(
      '🔐 DISCONNECT WALLET?\n\n' +
      'This will:\n' +
      '• Disconnect from the app\n' +
      '• Clear your session data\n' +
      '• Prevent auto-reconnection\n\n' +
      'You can reconnect anytime by clicking "Connect Wallet" again.\n\n' +
      'Proceed with disconnect?'
    );
    
    if (confirmed) {
      await disconnectWallet();
    }
  };

  const handleNetworkSwitch = async () => {
    try {
      await switchToBSC();
    } catch (error: any) {
      console.error('Network switch failed:', error);
      alert('Failed to switch to BNB Smart Chain. Please switch manually in your wallet.');
    }
  };

  // Minimal variant - just the connect/disconnect button
  if (variant === 'minimal') {
    if (isConnected && walletAddress) {
      return (
        <button
          onClick={handleDisconnect}
          className={`bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded font-mono text-xs hover:bg-red-500/30 transition-colors ${className}`}
        >
          Disconnect
        </button>
      );
    } else {
      return (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-2 rounded font-mono text-xs hover:bg-green-500/30 transition-colors disabled:opacity-50 ${className}`}
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      );
    }
  }

  // Header variant - clean connected state
  if (variant === 'header') {
    if (isConnected && walletAddress) {
      return (
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-3 py-2 rounded font-mono text-sm ${className}`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            {!isCorrectNetwork && (
              <span className="text-yellow-400 text-xs">⚠️</span>
            )}
          </div>
          
          {!isCorrectNetwork && (
            <button
              onClick={handleNetworkSwitch}
              className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-2 py-1 rounded text-xs hover:bg-yellow-500/30 transition-colors font-mono"
            >
              Switch to BSC
            </button>
          )}
          
          <button
            onClick={handleDisconnect}
            className="bg-red-500/20 border border-red-500/30 text-red-400 px-2 py-1 rounded text-xs hover:bg-red-500/30 transition-colors font-mono"
          >
            Disconnect
          </button>
        </div>
      );
    } else {
      return (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded font-mono transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 ${className}`}
        >
          {isConnecting ? (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting...</span>
            </div>
          ) : (
            'Connect Wallet'
          )}
        </button>
      );
    }
  }

  // Presale variant - full card display
  if (variant === 'presale') {
    if (isConnected && walletAddress) {
      return (
        <div className="terminal-card">
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="terminal-text text-xs">wallet_status.sh</div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xl">✅</span>
                </div>
                <div>
                  <div className="text-green-400 font-mono text-sm">WALLET_CONNECTED</div>
                  <div className="text-gray-400 font-mono text-xs">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isCorrectNetwork ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-mono">BNB_CHAIN</span>
                  </>
                ) : (
                  <button
                    onClick={handleNetworkSwitch}
                    className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded text-xs hover:bg-yellow-500/30 transition-colors font-mono"
                  >
                    SWITCH_TO_BSC
                  </button>
                )}
              </div>
            </div>
            
            {!isCorrectNetwork && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <div className="flex items-center space-x-2 text-yellow-400 text-sm font-mono">
                  <span>⚠️</span>
                  <span>Please switch to BNB Smart Chain to participate in the presale</span>
                </div>
              </div>
            )}
            
            {/* Disconnect Option */}
            <div className="mt-4 pt-4 border-t border-green-500/20">
              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded font-mono text-sm hover:bg-red-500/30 transition-colors"
              >
                DISCONNECT_WALLET
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="terminal-card">
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-xs">wallet_connect.sh</div>
          </div>
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-400 text-2xl">🔌</span>
            </div>
            <h3 className="text-yellow-400 font-mono text-lg mb-2">WALLET_NOT_CONNECTED</h3>
            <p className="text-gray-400 font-mono text-sm mb-6">
              {'>'} Connect your wallet to participate in the private sale
            </p>
            
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className={`btn-degen px-6 py-3 font-mono disabled:opacity-50 ${className}`}
            >
              {isConnecting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>CONNECTING...</span>
                </div>
              ) : (
                'CONNECT_WALLET'
              )}
            </button>
            
            {/* Helpful hint for reconnection */}
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-xs">
              <div className="text-blue-400 font-mono">
                {'>'} Previously connected? Just click "Connect Wallet" again!
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
} 
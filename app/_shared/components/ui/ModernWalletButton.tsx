'use client'

import { useWalletConnection } from '@/_shared/hooks/useWalletConnection'

interface ModernWalletButtonProps {
  variant?: 'header' | 'presale' | 'minimal'
  onConnectSuccess?: () => void
  className?: string
}

export function ModernWalletButton({ 
  variant = 'header', 
  onConnectSuccess,
  className = ''
}: ModernWalletButtonProps) {
  const { 
    isConnected, 
    address, 
    shortAddress,
    isCorrectNetwork,
    connectWallet,
    disconnectWallet,
    switchToBSC,
    addToWhitelist,
    isClient
  } = useWalletConnection()

  const handleConnect = async () => {
    try {
      await connectWallet()
      if (onConnectSuccess) {
        onConnectSuccess()
      }
      
      // Auto-add to whitelist when connecting
      if (address) {
        await addToWhitelist(address)
      }
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  const handleDisconnect = async () => {
    const confirmed = confirm(
      '🔐 DISCONNECT WALLET?\n\n' +
      'This will:\n' +
      '• Disconnect from the app\n' +
      '• Clear your session data\n' +
      '• Prevent auto-reconnection\n\n' +
      'You can reconnect anytime by clicking "Connect Wallet" again.\n\n' +
      'Proceed with disconnect?'
    )
    
    if (confirmed) {
      await disconnectWallet()
    }
  }

  const handleNetworkSwitch = async () => {
    try {
      await switchToBSC()
    } catch (error: any) {
      console.error('Network switch failed:', error)
      alert('Failed to switch to BNB Smart Chain. Please switch manually in your wallet.')
    }
  }

  // Show loading state until client is ready
  if (!isClient) {
    if (variant === 'minimal') {
      return (
        <div className={`bg-gray-500/20 border border-gray-500/30 text-gray-400 px-3 py-2 rounded font-mono text-xs ${className}`}>
          Loading...
        </div>
      )
    } else if (variant === 'header') {
      return (
        <div className={`bg-gray-500/20 border border-gray-500/30 text-gray-400 px-4 py-2 rounded font-mono ${className}`}>
          Loading...
        </div>
      )
    } else {
      return (
        <div className="terminal-card">
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-green-400 font-mono">Loading Web3...</p>
          </div>
        </div>
      )
    }
  }

  // Minimal variant - just the connect/disconnect button
  if (variant === 'minimal') {
    if (isConnected && address) {
      return (
        <button
          onClick={handleDisconnect}
          className={`bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-2 rounded font-mono text-xs hover:bg-red-500/30 transition-colors ${className}`}
        >
          Disconnect
        </button>
      )
    } else {
      return (
        <button
          onClick={handleConnect}
          className={`bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-2 rounded font-mono text-xs hover:bg-green-500/30 transition-colors ${className}`}
        >
          Connect
        </button>
      )
    }
  }

  // Header variant - clean connected state
  if (variant === 'header') {
    if (isConnected && address) {
      return (
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-3 py-2 rounded font-mono text-sm ${className}`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">{shortAddress}</span>
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
      )
    } else {
      return (
        <button
          onClick={handleConnect}
          className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 rounded font-mono transition-all duration-200 shadow-lg hover:shadow-green-500/25 ${className}`}
        >
          Connect Wallet
        </button>
      )
    }
  }

  // Presale variant - full card display
  if (variant === 'presale') {
    if (isConnected && address) {
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
                  <div className="text-gray-400 font-mono text-xs">{shortAddress}</div>
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
      )
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
              className={`btn-degen px-6 py-3 font-mono ${className}`}
            >
              CONNECT_WALLET
            </button>
            
            {/* Helpful hint for reconnection */}
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-xs">
              <div className="text-blue-400 font-mono">
                {'>'} Click "Connect Wallet" to choose from multiple wallet options!
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return null
} 
'use client'

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { getWagmiConfig } from '@/_shared/lib/web3config'
import { bsc } from 'wagmi/chains'
import { useCallback, useEffect, useState } from 'react'

export function useWalletConnection() {
  const { address, isConnected, isConnecting, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  
  // Track user's disconnection intent and client state
  const [userDisconnected, setUserDisconnected] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Safe Web3Modal hook usage
  let modal: ReturnType<typeof useWeb3Modal> | null = null
  try {
    modal = useWeb3Modal()
  } catch (error) {
    console.warn('Web3Modal not initialized yet:', error)
  }

  // Check correct network
  const isCorrectNetwork = chain?.id === bsc.id

  // Track client-side mounting
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check for user disconnect preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasDisconnected = localStorage.getItem('dbt-user-disconnected')
      if (wasDisconnected === 'true') {
        setUserDisconnected(true)
      }
    }
  }, [])

  // Clear disconnect flag when user reconnects
  useEffect(() => {
    if (isConnected && userDisconnected) {
      localStorage.removeItem('dbt-user-disconnected')
      setUserDisconnected(false)
    }
  }, [isConnected, userDisconnected])

  const connectWallet = async () => {
    try {
      if (modal) {
        modal.open()
      } else {
        console.warn('Web3Modal not available')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnectWallet = async () => {
    try {
      // Set flag to prevent auto-reconnection
      if (typeof window !== 'undefined') {
        localStorage.setItem('dbt-user-disconnected', 'true')
        setUserDisconnected(true)
      }
      
      disconnect()
      console.log('Wallet disconnected')
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  const getAvailableConnectors = () => {
    try {
      if (typeof window !== 'undefined') {
        const config = getWagmiConfig()
        return config.connectors || []
      }
      return []
    } catch {
      return []
    }
  }

  const switchToBSC = useCallback(async () => {
    try {
      if (switchChain && chain && chain.id !== bsc.id) {
        await switchChain({ chainId: bsc.id })
      }
    } catch (error) {
      console.error('Failed to switch to BSC:', error)
    }
  }, [switchChain, chain])

  const addToWhitelist = useCallback(async (walletAddress: string, txHash?: string) => {
    try {
      if (typeof window === 'undefined') return false

      const whitelistData = {
        address: walletAddress,
        timestamp: Date.now(),
        txHash: txHash || null
      }
      
      localStorage.setItem('dbt-whitelist', JSON.stringify(whitelistData))
      console.log('✅ Added to whitelist:', walletAddress)
      return true
    } catch (error) {
      console.error('Failed to add to whitelist:', error)
      return false
    }
  }, [])

  const isWhitelisted = useCallback(() => {
    try {
      if (typeof window === 'undefined') return false
      
      const stored = localStorage.getItem('dbt-whitelist')
      if (!stored) return false
      
      const data = JSON.parse(stored)
      return data.address === address
    } catch {
      return false
    }
  }, [address])

  return {
    // Connection state
    isConnected: isConnected && !userDisconnected && isClient,
    address,
    isConnecting,
    chain,
    isCorrectNetwork,
    isClient,
    
    // Actions
    connectWallet,
    disconnectWallet,
    switchToBSC,
    addToWhitelist,
    
    // Utilities
    connectors: getAvailableConnectors(),
    isWhitelisted: isWhitelisted(),
    
    // Modal control (if needed)
    openModal: modal?.open,
    closeModal: modal?.close,
  }
} 
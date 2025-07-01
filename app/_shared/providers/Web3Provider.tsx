'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi'
import { State, WagmiProvider } from 'wagmi'
import type { Config } from 'wagmi'
import { getWagmiConfig } from '@/_shared/lib/web3config'
import { ReactNode, useEffect, useState } from 'react'

// Setup queryClient
const queryClient = new QueryClient()

// Get projectId from environment - you need to add this to your .env.local
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c4f79cc821944d9680842e34466bfb'

// Track if modal has been created (client-side only)
let modalCreated = false

interface Web3ProviderProps {
  children: ReactNode
  initialState?: State
}

export function Web3Provider({ children, initialState }: Web3ProviderProps) {
  const [isClient, setIsClient] = useState(false)
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null)

  useEffect(() => {
    // Ensure we're client-side
    setIsClient(true)
    
    // Initialize wagmi config on client-side only
    try {
      const config = getWagmiConfig()
      setWagmiConfig(config)
      console.log('✅ Wagmi config initialized')
    } catch (error) {
      console.error('❌ Failed to initialize wagmi config:', error)
      return
    }
    
    // Create modal only once and only on client-side
    if (typeof window !== 'undefined' && !modalCreated) {
      try {
        createWeb3Modal({
          wagmiConfig: getWagmiConfig(),
          projectId,
          enableAnalytics: true,
          enableOnramp: false, // Disable to reduce SSR issues
          themeMode: 'dark',
          themeVariables: {
            '--w3m-font-family': 'monospace',
            '--w3m-accent': '#22c55e',
            '--w3m-border-radius-master': '8px'
          }
        })
        modalCreated = true
        console.log('✅ Web3Modal created successfully')
      } catch (error) {
        console.error('❌ Failed to create Web3Modal:', error)
      }
    }
  }, [])

  // Don't render wagmi provider until client-side and config is ready
  if (!isClient || !wagmiConfig) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-green-400 font-mono">Initializing Web3...</p>
        </div>
      </div>
    )
  }

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
} 
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { cookieStorage, createStorage } from 'wagmi'
import type { Config } from 'wagmi'

// 1. Get projectId from https://cloud.reown.com (free)
// For development, you can use a temporary project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c4f79cc821944d9680842e34466bfb'

// 2. Create wagmiConfig factory (client-side only)
const metadata = {
  name: 'DegenBet - Crypto Prediction Markets',
  description: 'Decentralized prediction markets on BNB Smart Chain',
  url: 'https://degenbet.com', // Update with your domain
  icons: ['https://degenbet.com/logo-degenbet.svg']
}

const chains = [bsc, bscTestnet] as const

// Factory function to create config only on client-side
export function createWagmiConfig(): Config {
  if (typeof window === 'undefined') {
    throw new Error('wagmiConfig can only be created on client-side')
  }
  
  return defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage
    })
  })
}

// Lazy wagmi config - only created when accessed on client
let _wagmiConfig: Config | null = null
export function getWagmiConfig(): Config {
  if (!_wagmiConfig && typeof window !== 'undefined') {
    _wagmiConfig = createWagmiConfig()
  }
  if (!_wagmiConfig) {
    throw new Error('wagmiConfig not available on server-side')
  }
  return _wagmiConfig
}

// 3. Export chain info
export { bsc, bscTestnet }
export const DEFAULT_CHAIN = bsc 
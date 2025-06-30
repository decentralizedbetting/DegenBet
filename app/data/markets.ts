import type { Market } from '@/types/market';
import { slugify } from '@/lib/utils';

export const sampleMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100,000 by the end of 2024?',
    description: 'Predict whether Bitcoin will reach the $100,000 milestone by December 31, 2024.',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-20T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    creator: {
      id: 'user1',
      username: 'crypto_analyst',
      reputation: 95
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.65,
        price: 0.65,
        volume: 150000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.35,
        price: 0.35,
        volume: 80000
      }
    ],
    totalVolume: 230000,
    liquidity: 50000,
    comments: [
      {
        id: 'comment1',
        userId: 'user2',
        username: 'trader_jane',
        content: 'Strong technical indicators suggest this is likely',
        timestamp: '2024-03-20T10:30:00Z',
        likes: 12
      }
    ],
    tags: ['bitcoin', 'crypto', 'price-prediction'],
    imageUrl: '/images/bitcoin.svg',
    featured: true
  },
  {
    id: '2',
    title: 'Who will win the 2024 US Presidential Election?',
    description: 'Predict the winner of the 2024 US Presidential Election.',
    category: 'politics',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-19T00:00:00Z',
    endDate: '2024-11-05T23:59:59Z',
    creator: {
      id: 'user2',
      username: 'political_analyst',
      reputation: 88
    },
    outcomes: [
      {
        id: 'candidate1',
        label: 'Democratic Nominee',
        probability: 0.45,
        price: 0.45,
        volume: 200000
      },
      {
        id: 'candidate2',
        label: 'Republican Nominee',
        probability: 0.40,
        price: 0.40,
        volume: 180000
      },
      {
        id: 'candidate3',
        label: 'Independent/Third Party',
        probability: 0.15,
        price: 0.15,
        volume: 60000
      }
    ],
    totalVolume: 440000,
    liquidity: 100000,
    comments: [],
    tags: ['politics', 'election', '2024'],
    imageUrl: '/images/election.svg',
    featured: true
  },
  {
    id: '3',
    title: 'What will be the global average temperature in 2024?',
    description: 'Predict the global average temperature for 2024 (in Celsius).',
    category: 'science',
    status: 'active',
    resolutionType: 'scalar',
    createdAt: '2024-03-18T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    creator: {
      id: 'user3',
      username: 'climate_expert',
      reputation: 92
    },
    outcomes: [
      {
        id: 'range1',
        label: '14.0-14.5°C',
        probability: 0.30,
        price: 0.30,
        volume: 90000
      },
      {
        id: 'range2',
        label: '14.5-15.0°C',
        probability: 0.45,
        price: 0.45,
        volume: 135000
      },
      {
        id: 'range3',
        label: '15.0-15.5°C',
        probability: 0.25,
        price: 0.25,
        volume: 75000
      }
    ],
    totalVolume: 300000,
    liquidity: 75000,
    comments: [],
    tags: ['climate', 'temperature', 'science'],
    imageUrl: '/images/placeholder.svg',
    featured: true
  },
  {
    id: '4',
    title: 'Will Ethereum transition to full EIP-4844 implementation by September 2024?',
    description: 'Market resolves to "Yes" if Ethereum successfully implements and activates EIP-4844 (Proto-Danksharding) on mainnet by September 30th, 2024.',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-01T00:00:00Z',
    endDate: '2024-09-30T23:59:59Z',
    creator: {
      id: 'user3',
      username: 'ethereum_dev',
      reputation: 94
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.80,
        price: 0.80,
        volume: 1200000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.20,
        price: 0.20,
        volume: 300000
      }
    ],
    totalVolume: 1500000,
    liquidity: 750000,
    comments: [],
    tags: ['ethereum', 'eip-4844', 'proto-danksharding'],
    imageUrl: '/images/ethereum.svg'
  },
  {
    id: '5',
    title: 'Will global AI regulation framework be adopted by 20+ countries in 2024?',
    description: 'This market resolves to "Yes" if 20 or more countries adopt a unified AI regulation framework by the end of 2024.',
    category: 'technology',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-02-15T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    creator: {
      id: 'user4',
      username: 'tech_policy_expert',
      reputation: 89
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.35,
        price: 0.35,
        volume: 700000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.65,
        price: 0.65,
        volume: 1300000
      }
    ],
    totalVolume: 2000000,
    liquidity: 500000,
    comments: [],
    tags: ['ai', 'regulation', 'policy'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'btc-100k',
    title: 'Bitcoin to reach $100K by EOY',
    description: 'Will Bitcoin (BTC) reach a price of $100,000 USD by December 31, 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-01-15T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user5',
      username: 'btc_enthusiast',
      reputation: 87
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.42,
        price: 0.42,
        volume: 1234567
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.58,
        price: 0.58,
        volume: 987654
      }
    ],
    totalVolume: 1234567,
    liquidity: 500000,
    comments: [],
    tags: ['bitcoin', 'price-prediction'],
    imageUrl: '/images/bitcoin.svg'
  },
  {
    id: 'eth-merge',
    title: 'ETH to gain 50% after merge',
    description: 'Will Ethereum (ETH) gain at least 50% in value within 3 months after the Shanghai upgrade?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-02-20T00:00:00Z',
    endDate: '2023-10-15T23:59:59Z',
    creator: {
      id: 'user6',
      username: 'eth_developer',
      reputation: 92
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.78,
        price: 0.78,
        volume: 987654
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.22,
        price: 0.22,
        volume: 456789
      }
    ],
    totalVolume: 987654,
    liquidity: 400000,
    comments: [],
    tags: ['ethereum', 'merge', 'defi'],
    imageUrl: '/images/ethereum.svg'
  },
  {
    id: 'fed-rates',
    title: 'Fed to cut rates in Q3',
    description: 'Will the Federal Reserve announce an interest rate cut during Q3 2023?',
    category: 'finance',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-03-10T00:00:00Z',
    endDate: '2023-09-30T23:59:59Z',
    creator: {
      id: 'user7',
      username: 'macro_trader',
      reputation: 85
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.63,
        price: 0.63,
        volume: 765432
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.37,
        price: 0.37,
        volume: 345678
      }
    ],
    totalVolume: 765432,
    liquidity: 350000,
    comments: [],
    tags: ['finance', 'fed', 'rates'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'sol-1000',
    title: 'Solana to reach $1000',
    description: 'Will Solana (SOL) reach a price of $1,000 USD before the end of 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-04-05T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user8',
      username: 'sol_maximalist',
      reputation: 78
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.24,
        price: 0.24,
        volume: 543210
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.76,
        price: 0.76,
        volume: 321098
      }
    ],
    totalVolume: 543210,
    liquidity: 250000,
    comments: [],
    tags: ['solana', 'price-prediction'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'arb-gain',
    title: 'Arbitrum to gain 100% in Q3',
    description: 'Will Arbitrum (ARB) gain at least 100% in value during Q3 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-05-15T00:00:00Z',
    endDate: '2023-09-30T23:59:59Z',
    creator: {
      id: 'user9',
      username: 'arb_investor',
      reputation: 81
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.56,
        price: 0.56,
        volume: 432109
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.44,
        price: 0.44,
        volume: 210987
      }
    ],
    totalVolume: 432109,
    liquidity: 200000,
    comments: [],
    tags: ['arbitrum', 'layer2', 'defi'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'usdc-recover',
    title: 'USDC to regain $10B market cap',
    description: 'Will USD Coin (USDC) regain a market cap of at least $10 billion before the end of 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-06-20T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user10',
      username: 'stablecoin_tracker',
      reputation: 79
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.67,
        price: 0.67,
        volume: 321098
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.33,
        price: 0.33,
        volume: 109876
      }
    ],
    totalVolume: 321098,
    liquidity: 150000,
    comments: [],
    tags: ['usdc', 'stablecoin', 'market-cap'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'btc-dominance',
    title: 'Bitcoin dominance to rise above 60%',
    description: 'Will Bitcoin market cap dominance rise above 60% before the end of 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-07-10T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user11',
      username: 'dominance_watcher',
      reputation: 84
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.38,
        price: 0.38,
        volume: 210987
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.62,
        price: 0.62,
        volume: 190876
      }
    ],
    totalVolume: 210987,
    liquidity: 120000,
    comments: [],
    tags: ['bitcoin', 'dominance', 'market-analysis'],
    imageUrl: '/images/bitcoin.svg'
  },
  {
    id: 'nft-floor-prices',
    title: 'BAYC floor price to double',
    description: 'Will the floor price of Bored Ape Yacht Club NFTs double in ETH value by end of 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-08-05T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user12',
      username: 'nft_collector',
      reputation: 83
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.37,
        price: 0.37,
        volume: 198765
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.63,
        price: 0.63,
        volume: 165432
      }
    ],
    totalVolume: 198765,
    liquidity: 100000,
    comments: [],
    tags: ['nft', 'bayc', 'floor-price'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'sec-etf',
    title: 'SEC to approve BTC ETF',
    description: 'Will the SEC approve a spot Bitcoin ETF application in 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-02-25T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user13',
      username: 'etf_analyst',
      reputation: 94
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.44,
        price: 0.44,
        volume: 657432
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.56,
        price: 0.56,
        volume: 432198
      }
    ],
    totalVolume: 657432,
    liquidity: 300000,
    comments: [],
    tags: ['bitcoin', 'etf', 'sec', 'regulation'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'layer2-users',
    title: 'Layer 2 to exceed 5M users',
    description: 'Will Ethereum Layer 2 solutions collectively exceed 5 million unique users by end of 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-03-15T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user14',
      username: 'layer2_dev',
      reputation: 89
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.76,
        price: 0.76,
        volume: 345678
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.24,
        price: 0.24,
        volume: 123456
      }
    ],
    totalVolume: 345678,
    liquidity: 175000,
    comments: [],
    tags: ['ethereum', 'layer2', 'scaling', 'users'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'dao-governance',
    title: 'MakerDAO to change governance',
    description: 'Will MakerDAO implement a major governance structure change in 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-04-20T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user15',
      username: 'dao_governor',
      reputation: 91
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.52,
        price: 0.52,
        volume: 234567
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.48,
        price: 0.48,
        volume: 210987
      }
    ],
    totalVolume: 234567,
    liquidity: 120000,
    comments: [],
    tags: ['makerdao', 'dao', 'governance'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'defi-hack',
    title: 'Major DeFi protocol to be hacked',
    description: 'Will a DeFi protocol with >$100M TVL suffer a hack with losses >$10M before end of 2023?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2023-05-05T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    creator: {
      id: 'user16',
      username: 'security_researcher',
      reputation: 95
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.83,
        price: 0.83,
        volume: 432109
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.17,
        price: 0.17,
        volume: 109876
      }
    ],
    totalVolume: 432109,
    liquidity: 200000,
    comments: [],
    tags: ['defi', 'security', 'hack', 'risk'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'la-liga-winner-2025',
    title: 'La Liga Winner 2025',
    description: 'Predict the winner of the Spanish La Liga for the 2024-2025 season.',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-15T00:00:00Z',
    endDate: '2025-05-30T23:59:59Z',
    creator: {
      id: 'user20',
      username: 'soccer_expert',
      reputation: 91
    },
    outcomes: [
      {
        id: 'barcelona',
        label: 'Barcelona',
        probability: 0.66,
        price: 0.66,
        volume: 179520000
      },
      {
        id: 'real-madrid',
        label: 'Real Madrid',
        probability: 0.29,
        price: 0.29,
        volume: 78880000
      },
      {
        id: 'atletico-madrid',
        label: 'Atletico Madrid',
        probability: 0.05,
        price: 0.05,
        volume: 13600000
      }
    ],
    totalVolume: 272000000,
    liquidity: 100000000,
    comments: [],
    tags: ['sports', 'soccer', 'la-liga', 'barcelona', 'real-madrid'],
    imageUrl: '/images/sports.svg'
  },
  {
    id: 'premier-league-winner-2025',
    title: 'Premier League Winner 2025',
    description: 'Predict the winner of the English Premier League for the 2024-2025 season.',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-15T00:00:00Z',
    endDate: '2025-05-30T23:59:59Z',
    creator: {
      id: 'user20',
      username: 'soccer_expert',
      reputation: 91
    },
    outcomes: [
      {
        id: 'liverpool',
        label: 'Liverpool',
        probability: 0.96,
        price: 0.96,
        volume: 764160000
      },
      {
        id: 'arsenal',
        label: 'Arsenal',
        probability: 0.03,
        price: 0.03,
        volume: 23880000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.01,
        price: 0.01,
        volume: 7960000
      }
    ],
    totalVolume: 796000000,
    liquidity: 200000000,
    comments: [],
    tags: ['sports', 'soccer', 'premier-league', 'liverpool', 'arsenal'],
    imageUrl: '/images/sports.svg'
  },
  {
    id: 'champions-league-winner-2025',
    title: 'Champions League Winner 2025',
    description: 'Predict the winner of the UEFA Champions League for the 2024-2025 season.',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-15T00:00:00Z',
    endDate: '2025-06-15T23:59:59Z',
    creator: {
      id: 'user20',
      username: 'soccer_expert',
      reputation: 91
    },
    outcomes: [
      {
        id: 'barcelona',
        label: 'Barcelona',
        probability: 0.23,
        price: 0.23,
        volume: 226780000
      },
      {
        id: 'psg',
        label: 'Paris Saint-Germain',
        probability: 0.21,
        price: 0.21,
        volume: 207060000
      },
      {
        id: 'real-madrid',
        label: 'Real Madrid',
        probability: 0.20,
        price: 0.20,
        volume: 197200000
      },
      {
        id: 'bayern-munich',
        label: 'Bayern Munich',
        probability: 0.15,
        price: 0.15,
        volume: 147900000
      },
      {
        id: 'arsenal',
        label: 'Arsenal',
        probability: 0.12,
        price: 0.12,
        volume: 118320000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.09,
        price: 0.09,
        volume: 88740000
      }
    ],
    totalVolume: 986000000,
    liquidity: 300000000,
    comments: [],
    tags: ['sports', 'soccer', 'champions-league', 'barcelona', 'psg', 'real-madrid'],
    imageUrl: '/images/sports.svg',
    featured: true
  },
  {
    id: 'nba-champion-2025',
    title: 'NBA Champion 2025',
    description: 'Predict the winner of the NBA Championship for the 2024-2025 season.',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-10T00:00:00Z',
    endDate: '2025-06-30T23:59:59Z',
    creator: {
      id: 'user21',
      username: 'basketball_analyst',
      reputation: 89
    },
    outcomes: [
      {
        id: 'okc-thunder',
        label: 'Oklahoma City Thunder',
        probability: 0.30,
        price: 0.30,
        volume: 600000000
      },
      {
        id: 'boston-celtics',
        label: 'Boston Celtics',
        probability: 0.29,
        price: 0.29,
        volume: 580000000
      },
      {
        id: 'cleveland-cavaliers',
        label: 'Cleveland Cavaliers',
        probability: 0.14,
        price: 0.14,
        volume: 280000000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.27,
        price: 0.27,
        volume: 540000000
      }
    ],
    totalVolume: 2000000000,
    liquidity: 500000000,
    comments: [],
    tags: ['sports', 'basketball', 'nba', 'okc-thunder', 'boston-celtics'],
    imageUrl: '/images/sports.svg',
    featured: true
  },
  {
    id: 'nba-eastern-conference-2025',
    title: 'NBA Eastern Conference Champion 2025',
    description: 'Predict the winner of the NBA Eastern Conference for the 2024-2025 season.',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-10T00:00:00Z',
    endDate: '2025-06-15T23:59:59Z',
    creator: {
      id: 'user21',
      username: 'basketball_analyst',
      reputation: 89
    },
    outcomes: [
      {
        id: 'boston-celtics',
        label: 'Boston Celtics',
        probability: 0.54,
        price: 0.54,
        volume: 148500000
      },
      {
        id: 'cleveland-cavaliers',
        label: 'Cleveland Cavaliers',
        probability: 0.32,
        price: 0.32,
        volume: 88000000
      },
      {
        id: 'new-york-knicks',
        label: 'New York Knicks',
        probability: 0.08,
        price: 0.08,
        volume: 22000000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.06,
        price: 0.06,
        volume: 16500000
      }
    ],
    totalVolume: 275000000,
    liquidity: 100000000,
    comments: [],
    tags: ['sports', 'basketball', 'nba', 'eastern-conference', 'celtics', 'cavaliers', 'knicks'],
    imageUrl: '/images/sports.svg'
  },
  {
    id: 'canada-elections-pm-2025',
    title: 'Next Canadian Prime Minister',
    description: 'Who will be the next Prime Minister of Canada after the upcoming federal election?',
    category: 'politics',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-05T00:00:00Z',
    endDate: '2025-01-31T23:59:59Z',
    creator: {
      id: 'user22',
      username: 'political_forecaster',
      reputation: 93
    },
    outcomes: [
      {
        id: 'mark-carney',
        label: 'Mark Carney',
        probability: 0.58,
        price: 0.58,
        volume: 9280000
      },
      {
        id: 'pierre-poilievre',
        label: 'Pierre Poilievre',
        probability: 0.41,
        price: 0.41,
        volume: 6560000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.01,
        price: 0.01,
        volume: 160000
      }
    ],
    totalVolume: 16000000,
    liquidity: 5000000,
    comments: [],
    tags: ['politics', 'canada', 'elections', 'prime-minister', 'liberal-party', 'conservative-party'],
    imageUrl: '/images/election.svg'
  },
  {
    id: 'trump-ukraine-war-90-days',
    title: 'Trump Ends Ukraine War in First 90 Days',
    description: 'Will President Trump end the Russia-Ukraine conflict within the first 90 days of his administration?',
    category: 'politics',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-01T00:00:00Z',
    endDate: '2025-04-20T23:59:59Z',
    creator: {
      id: 'user23',
      username: 'geopolitical_analyst',
      reputation: 90
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.15,
        price: 0.15,
        volume: 5250000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.85,
        price: 0.85,
        volume: 29750000
      }
    ],
    totalVolume: 35000000,
    liquidity: 10000000,
    comments: [],
    tags: ['politics', 'usa', 'trump', 'ukraine', 'russia', 'foreign-policy'],
    imageUrl: '/images/election.svg'
  },
  {
    id: 'bitcoin-price-march-31',
    title: 'Bitcoin Price by March 31',
    description: 'What will be the price of Bitcoin (BTC) by March 31, 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    creator: {
      id: 'user24',
      username: 'crypto_whale',
      reputation: 96
    },
    outcomes: [
      {
        id: 'price-75k',
        label: '$75,000',
        probability: 0.20,
        price: 0.20,
        volume: 7800000
      },
      {
        id: 'price-95k',
        label: '$95,000',
        probability: 0.13,
        price: 0.13,
        volume: 5070000
      },
      {
        id: 'price-100k',
        label: '$100,000',
        probability: 0.06,
        price: 0.06,
        volume: 2340000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.61,
        price: 0.61,
        volume: 23790000
      }
    ],
    totalVolume: 39000000,
    liquidity: 15000000,
    comments: [],
    tags: ['crypto', 'bitcoin', 'price-prediction', 'btc'],
    imageUrl: '/images/bitcoin.svg'
  },
  {
    id: 'ethereum-march-21',
    title: 'Ethereum Price on March 21',
    description: 'Will the price of Ethereum (ETH) be above $1,900 on March 21, 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-01T00:00:00Z',
    endDate: '2025-03-21T23:59:59Z',
    creator: {
      id: 'user24',
      username: 'crypto_whale',
      reputation: 96
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.91,
        price: 0.91,
        volume: 910000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.09,
        price: 0.09,
        volume: 90000
      }
    ],
    totalVolume: 1000000,
    liquidity: 300000,
    comments: [],
    tags: ['crypto', 'ethereum', 'price-prediction', 'eth'],
    imageUrl: '/images/ethereum.svg'
  },
  {
    id: 'highest-grossing-movie-2025',
    title: 'Highest Grossing Movie 2025',
    description: 'Which film will have the highest worldwide box office gross in 2025?',
    category: 'entertainment',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-02-28T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user25',
      username: 'film_buff',
      reputation: 88
    },
    outcomes: [
      {
        id: 'zootopia-2',
        label: 'Zootopia 2',
        probability: 0.41,
        price: 0.41,
        volume: 820000
      },
      {
        id: 'jurassic-world',
        label: 'Jurassic World: Rebirth',
        probability: 0.28,
        price: 0.28,
        volume: 560000
      },
      {
        id: 'avatar-3',
        label: 'Avatar 3',
        probability: 0.10,
        price: 0.10,
        volume: 200000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.21,
        price: 0.21,
        volume: 420000
      }
    ],
    totalVolume: 2000000,
    liquidity: 800000,
    comments: [],
    tags: ['entertainment', 'movies', 'box-office', 'disney', 'universal'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'eurovision-winner-2025',
    title: 'Eurovision Winner 2025',
    description: 'Which country will win the Eurovision Song Contest in 2025?',
    category: 'entertainment',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-05T00:00:00Z',
    endDate: '2025-05-31T23:59:59Z',
    creator: {
      id: 'user26',
      username: 'eurovision_fan',
      reputation: 85
    },
    outcomes: [
      {
        id: 'sweden',
        label: 'Sweden',
        probability: 0.30,
        price: 0.30,
        volume: 5100000
      },
      {
        id: 'austria',
        label: 'Austria',
        probability: 0.23,
        price: 0.23,
        volume: 3910000
      },
      {
        id: 'france',
        label: 'France',
        probability: 0.13,
        price: 0.13,
        volume: 2210000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.34,
        price: 0.34,
        volume: 5780000
      }
    ],
    totalVolume: 17000000,
    liquidity: 5000000,
    comments: [],
    tags: ['entertainment', 'music', 'eurovision', 'contest', 'europe'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'jfk-inside-job',
    title: 'Was JFK Assassination an Inside Job?',
    description: 'Will conclusive evidence be released by 2026 proving the JFK assassination was an inside job?',
    category: 'other',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-02-15T00:00:00Z',
    endDate: '2026-01-01T23:59:59Z',
    creator: {
      id: 'user27',
      username: 'conspiracy_analyst',
      reputation: 75
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.01,
        price: 0.01,
        volume: 70000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.99,
        price: 0.99,
        volume: 6930000
      }
    ],
    totalVolume: 7000000,
    liquidity: 2000000,
    comments: [],
    tags: ['unusual', 'conspiracy', 'history', 'jfk', 'government'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'elon-buys-tiktok',
    title: 'Will Elon Musk Buy TikTok?',
    description: 'Will Elon Musk buy or acquire a controlling stake in TikTok before April 2025?',
    category: 'other',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-10T00:00:00Z',
    endDate: '2025-04-01T23:59:59Z',
    creator: {
      id: 'user28',
      username: 'tech_speculator',
      reputation: 82
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.01,
        price: 0.01,
        volume: 10000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.99,
        price: 0.99,
        volume: 990000
      }
    ],
    totalVolume: 1000000,
    liquidity: 300000,
    comments: [],
    tags: ['unusual', 'tech', 'business', 'elon-musk', 'tiktok', 'acquisition'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'march-2025-temperature',
    title: 'March 2025 Global Temperature Increase',
    description: 'What will be the global temperature increase in March 2025 compared to pre-industrial levels?',
    category: 'science',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-02-20T00:00:00Z',
    endDate: '2025-04-15T23:59:59Z',
    creator: {
      id: 'user29',
      username: 'climate_scientist',
      reputation: 94
    },
    outcomes: [
      {
        id: 'temp-1.32-1.36',
        label: '1.32-1.36°C',
        probability: 0.80,
        price: 0.80,
        volume: 800000
      },
      {
        id: 'temp-1.37-1.41',
        label: '1.37-1.41°C',
        probability: 0.12,
        price: 0.12,
        volume: 120000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.08,
        price: 0.08,
        volume: 80000
      }
    ],
    totalVolume: 1000000,
    liquidity: 400000,
    comments: [],
    tags: ['science', 'climate', 'temperature', 'global-warming', 'environment'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'best-ai-model-march',
    title: 'Best AI Model End of March 2025',
    description: 'Which company will have the most advanced general artificial intelligence model by the end of March 2025?',
    category: 'technology',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-03-01T00:00:00Z',
    endDate: '2025-04-05T23:59:59Z',
    creator: {
      id: 'user30',
      username: 'ai_researcher',
      reputation: 97
    },
    outcomes: [
      {
        id: 'xai',
        label: 'xAI',
        probability: 0.91,
        price: 0.91,
        volume: 1820000
      },
      {
        id: 'openai',
        label: 'OpenAI',
        probability: 0.08,
        price: 0.08,
        volume: 160000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.01,
        price: 0.01,
        volume: 20000
      }
    ],
    totalVolume: 2000000,
    liquidity: 800000,
    comments: [],
    tags: ['technology', 'ai', 'machine-learning', 'xai', 'openai'],
    imageUrl: '/images/placeholder.svg',
    featured: true
  },
  {
    id: 'ukraine-ceasefire-july',
    title: 'Ukraine-Russia Ceasefire Before July',
    description: 'Will there be a formal ceasefire agreement between Ukraine and Russia before July 2025?',
    category: 'politics',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-01T00:00:00Z',
    endDate: '2025-07-01T23:59:59Z',
    creator: {
      id: 'user31',
      username: 'conflict_analyst',
      reputation: 93
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.50,
        price: 0.50,
        volume: 2000000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.50,
        price: 0.50,
        volume: 2000000
      }
    ],
    totalVolume: 4000000,
    liquidity: 1500000,
    comments: [],
    tags: ['politics', 'geopolitics', 'ukraine', 'russia', 'conflict', 'ceasefire'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'israel-hamas-ceasefire',
    title: 'Israel-Hamas Ceasefire by Friday',
    description: 'Will Israel and Hamas agree to a formal ceasefire by this Friday?',
    category: 'politics',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-03-18T00:00:00Z',
    endDate: '2024-03-22T23:59:59Z',
    creator: {
      id: 'user31',
      username: 'conflict_analyst',
      reputation: 93
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.01,
        price: 0.01,
        volume: 2210
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.99,
        price: 0.99,
        volume: 218790
      }
    ],
    totalVolume: 221000,
    liquidity: 100000,
    comments: [],
    tags: ['politics', 'geopolitics', 'israel', 'hamas', 'conflict', 'ceasefire'],
    imageUrl: '/images/placeholder.svg'
  }
];

export function getMarkets(): Market[] {
  return sampleMarkets;
}

/**
 * Get a market by ID
 * 
 * @param id The market ID or slug to look up
 * @returns The market data or undefined if not found
 */
export function getMarketData(id: string): Market | undefined {
  // First try direct ID lookup
  const market = sampleMarkets.find(market => market.id === id);
  if (market) return market;
  
  // If not found by ID, try looking up by slug
  return sampleMarkets.find(market => 
    slugify(market.title) === id
  );
}

/**
 * Get a market by its slug (title converted to URL-friendly string)
 * 
 * @param slug The slug to look up
 * @returns The market data or undefined if not found
 */
export function getMarketBySlug(slug: string): Market | undefined {
  return sampleMarkets.find(market => 
    slugify(market.title) === slug
  );
}

/**
 * Get the slug for a market
 * 
 * @param market The market or market ID
 * @returns The slug for the market
 */
export function getMarketSlug(market: Market | string): string {
  if (typeof market === 'string') {
    const marketData = getMarketData(market);
    return marketData ? slugify(marketData.title) : '';
  }
  return slugify(market.title);
}

/**
 * Get only the featured markets
 * 
 * @returns Array of featured markets
 */
export function getFeaturedMarkets(): Market[] {
  return sampleMarkets.filter(market => market.featured === true);
}

/**
 * Get only the regular (non-featured) markets
 * 
 * @returns Array of regular markets
 */
export function getRegularMarkets(): Market[] {
  return sampleMarkets.filter(market => !market.featured);
}

/**
 * Helper function to get appropriate image URL based on market category and content
 * Ensures all images exist and provides fallbacks
 */
export function getMarketImageUrl(market: Market): string {
  // If market already has a valid imageUrl that uses our existing SVGs, use it
  if (market.imageUrl) {
    const validImages = [
      '/images/bitcoin.svg',
      '/images/ethereum.svg', 
      '/images/election.svg',
      '/images/sports.svg',
      '/images/placeholder.svg'
    ];
    if (validImages.includes(market.imageUrl)) {
      return market.imageUrl;
    }
  }

  // Map based on category and content
  const { category, title, tags } = market;
  
  // Check for specific crypto currencies
  if (category === 'crypto') {
    if (title.toLowerCase().includes('bitcoin') || title.toLowerCase().includes('btc') || 
        tags.some(tag => tag.includes('bitcoin') || tag.includes('btc'))) {
      return '/images/bitcoin.svg';
    }
    if (title.toLowerCase().includes('ethereum') || title.toLowerCase().includes('eth') ||
        tags.some(tag => tag.includes('ethereum') || tag.includes('eth'))) {
      return '/images/ethereum.svg';
    }
    // Default for other crypto
    return '/images/bitcoin.svg';
  }
  
  // Category-based mapping
  const categoryImageMap: Record<string, string> = {
    politics: '/images/election.svg',
    sports: '/images/sports.svg',
    finance: '/images/placeholder.svg',
    technology: '/images/placeholder.svg',
    entertainment: '/images/placeholder.svg',
    science: '/images/placeholder.svg',
    other: '/images/placeholder.svg'
  };
  
  return categoryImageMap[category] || '/images/placeholder.svg';
}

/**
 * Get markets with validated image URLs
 */
export function getMarketsWithValidImages(): Market[] {
  return sampleMarkets.map(market => ({
    ...market,
    imageUrl: getMarketImageUrl(market)
  }));
} 
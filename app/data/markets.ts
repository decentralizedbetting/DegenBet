import type { Market } from '@/_shared/types/market';
import { slugify } from '@/_shared/lib/utils';

export const sampleMarkets: Market[] = [
  // FEATURED HIGH-VOLUME MARKETS
  {
    id: 'nyc-mayor-2025',
    title: 'NYC Mayoral Election 2025',
    description: 'Who will be the next Mayor of New York City? The race is heating up with progressive candidate Zohran Mamdani leading in the polls.',
    category: 'politics',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-12-15T00:00:00Z',
    endDate: '2025-11-05T23:59:59Z',
    creator: {
      id: 'user1',
      username: 'degen_political_whale',
      reputation: 98
    },
    outcomes: [
      {
        id: 'mamdani',
        label: 'Zohran Mamdani',
        probability: 0.68,
        price: 0.68,
        volume: 31960000
      },
      {
        id: 'adams',
        label: 'Eric Adams',
        probability: 0.22,
        price: 0.22,
        volume: 10340000
      },
      {
        id: 'cuomo',
        label: 'Andrew Cuomo',
        probability: 0.08,
        price: 0.08,
        volume: 3760000
      },
      {
        id: 'sliwa',
        label: 'Curtis Sliwa',
        probability: 0.02,
        price: 0.02,
        volume: 940000
      }
    ],
    totalVolume: 47000000,
    liquidity: 15000000,
    comments: [
      {
        id: 'comment1',
        userId: 'user2',
        username: 'nyc_degen_trader',
        content: 'MAMDANI TO THE MOON 🚀 Progressive wave incoming',
        timestamp: '2024-12-20T10:30:00Z',
        likes: 847
      }
    ],
    tags: ['politics', 'nyc', 'mayor', 'election-2025'],
    imageUrl: '/images/election.svg',
    featured: true
  },
  {
    id: 'btc-july-1-2025',
    title: 'Bitcoin Price July 1, 2025',
    description: 'What will be the price of Bitcoin on July 1st, 2025? Currently trading around $106k with massive institutional adoption.',
    category: 'crypto',
    status: 'active',
    resolutionType: 'scalar',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-07-01T23:59:59Z',
    creator: {
      id: 'user3',
      username: 'diamond_hands_whale',
      reputation: 97
    },
    outcomes: [
      {
        id: 'btc-under-102k',
        label: '<$102k',
        probability: 0.01,
        price: 0.01,
        volume: 250000
      },
      {
        id: 'btc-102-104k',
        label: '$102-104k',
        probability: 0.03,
        price: 0.03,
        volume: 750000
      },
      {
        id: 'btc-104-106k',
        label: '$104-106k',
        probability: 0.18,
        price: 0.18,
        volume: 4500000
      },
      {
        id: 'btc-106-108k',
        label: '$106-108k',
        probability: 0.73,
        price: 0.73,
        volume: 18250000
      },
      {
        id: 'btc-over-108k',
        label: '>$108k',
        probability: 0.05,
        price: 0.05,
        volume: 1250000
      }
    ],
    totalVolume: 25000000,
    liquidity: 8000000,
    comments: [],
    tags: ['bitcoin', 'btc', 'price-prediction', 'crypto'],
    imageUrl: '/images/bitcoin.svg',
    featured: true
  },
  {
    id: 'fed-rate-july-2025',
    title: 'Fed Rate Decision July 2025',
    description: 'What will the Federal Reserve decide on interest rates in July 2025? Current inflation trends suggest continued easing.',
    category: 'finance',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-12-10T00:00:00Z',
    endDate: '2025-07-31T23:59:59Z',
    creator: {
      id: 'user4',
      username: 'fed_watch_degen',
      reputation: 94
    },
    outcomes: [
      {
        id: 'decrease-50-plus',
        label: '50+ bps decrease',
        probability: 0.03,
        price: 0.03,
        volume: 600000
      },
      {
        id: 'decrease-25',
        label: '25 bps decrease',
        probability: 0.17,
        price: 0.17,
        volume: 3400000
      },
      {
        id: 'no-change',
        label: 'No change',
        probability: 0.78,
        price: 0.78,
        volume: 15600000
      },
      {
        id: 'increase-25-plus',
        label: '25+ bps increase',
        probability: 0.02,
        price: 0.02,
        volume: 400000
      }
    ],
    totalVolume: 20000000,
    liquidity: 6000000,
    comments: [],
    tags: ['finance', 'fed', 'interest-rates', 'monetary-policy'],
    imageUrl: '/images/placeholder.svg',
    featured: true
  },

  // BINARY YES/NO MARKETS
  {
    id: 'israel-hamas-ceasefire-july',
    title: 'Israel-Hamas Ceasefire by July 15?',
    description: 'Will Israel and Hamas reach a formal ceasefire agreement by July 15, 2025?',
    category: 'politics',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-12-15T00:00:00Z',
    endDate: '2025-07-15T23:59:59Z',
    creator: {
      id: 'user5',
      username: 'geopolitical_degen',
      reputation: 91
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.81,
        price: 0.81,
        volume: 14580000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.19,
        price: 0.19,
        volume: 3420000
      }
    ],
    totalVolume: 18000000,
    liquidity: 5000000,
    comments: [],
    tags: ['politics', 'israel', 'hamas', 'ceasefire', 'middle-east'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'tesla-robotaxi-august',
    title: 'Tesla Robotaxi Launch by August?',
    description: 'Will Tesla launch a fully autonomous robotaxi service to the public by August 2025?',
    category: 'technology',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-12-20T00:00:00Z',
    endDate: '2025-08-31T23:59:59Z',
    creator: {
      id: 'user6',
      username: 'tesla_moon_boy',
      reputation: 89
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.15,
        price: 0.15,
        volume: 1200000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.85,
        price: 0.85,
        volume: 6800000
      }
    ],
    totalVolume: 8000000,
    liquidity: 2500000,
    comments: [],
    tags: ['technology', 'tesla', 'autonomous', 'robotaxi'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'us-recession-2025',
    title: 'US Recession in 2025?',
    description: 'Will the United States officially enter a recession (two consecutive quarters of negative GDP growth) in 2025?',
    category: 'finance',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user7',
      username: 'macro_bear_degen',
      reputation: 93
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.28,
        price: 0.28,
        volume: 4200000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.72,
        price: 0.72,
        volume: 10800000
      }
    ],
    totalVolume: 15000000,
    liquidity: 4500000,
    comments: [],
    tags: ['finance', 'recession', 'economy', 'gdp'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'btc-above-105k-july',
    title: 'Bitcoin Above $105k on July 1?',
    description: 'Will Bitcoin be trading above $105,000 on July 1st, 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-12-15T00:00:00Z',
    endDate: '2025-07-01T23:59:59Z',
    creator: {
      id: 'user8',
      username: 'btc_hopium_dealer',
      reputation: 96
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.94,
        price: 0.94,
        volume: 7520000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.06,
        price: 0.06,
        volume: 480000
      }
    ],
    totalVolume: 8000000,
    liquidity: 2400000,
    comments: [],
    tags: ['bitcoin', 'btc', 'price-prediction', 'crypto'],
    imageUrl: '/images/bitcoin.svg'
  },
  {
    id: 'solana-etf-july',
    title: 'Solana ETF Approved by July 31?',
    description: 'Will the SEC approve a spot Solana ETF by July 31, 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-12-10T00:00:00Z',
    endDate: '2025-07-31T23:59:59Z',
    creator: {
      id: 'user9',
      username: 'sol_gang_leader',
      reputation: 92
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.97,
        price: 0.97,
        volume: 4850000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.03,
        price: 0.03,
        volume: 150000
      }
    ],
    totalVolume: 5000000,
    liquidity: 1500000,
    comments: [],
    tags: ['solana', 'sol', 'etf', 'sec', 'crypto'],
    imageUrl: '/images/placeholder.svg'
  },

  // SPORTS & ENTERTAINMENT
  {
    id: 'wimbledon-mens-2025',
    title: '2025 Wimbledon Men\'s Winner',
    description: 'Who will win the 2025 Wimbledon Men\'s Singles Championship?',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-07-15T23:59:59Z',
    creator: {
      id: 'user10',
      username: 'tennis_degen_king',
      reputation: 88
    },
    outcomes: [
      {
        id: 'alcaraz',
        label: 'Carlos Alcaraz',
        probability: 0.41,
        price: 0.41,
        volume: 4920000
      },
      {
        id: 'sinner',
        label: 'Jannik Sinner',
        probability: 0.34,
        price: 0.34,
        volume: 4080000
      },
      {
        id: 'djokovic',
        label: 'Novak Djokovic',
        probability: 0.16,
        price: 0.16,
        volume: 1920000
      },
      {
        id: 'draper',
        label: 'Jack Draper',
        probability: 0.05,
        price: 0.05,
        volume: 600000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.04,
        price: 0.04,
        volume: 480000
      }
    ],
    totalVolume: 12000000,
    liquidity: 3600000,
    comments: [],
    tags: ['sports', 'tennis', 'wimbledon', 'grand-slam'],
    imageUrl: '/images/sports.svg'
  },
  {
    id: 'world-series-2025',
    title: 'World Series Champion 2025',
    description: 'Which team will win the 2025 MLB World Series?',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-11-15T00:00:00Z',
    endDate: '2025-11-01T23:59:59Z',
    creator: {
      id: 'user11',
      username: 'baseball_whale_69',
      reputation: 87
    },
    outcomes: [
      {
        id: 'dodgers',
        label: 'LA Dodgers',
        probability: 0.28,
        price: 0.28,
        volume: 5040000
      },
      {
        id: 'yankees',
        label: 'NY Yankees',
        probability: 0.16,
        price: 0.16,
        volume: 2880000
      },
      {
        id: 'tigers',
        label: 'Detroit Tigers',
        probability: 0.12,
        price: 0.12,
        volume: 2160000
      },
      {
        id: 'phillies',
        label: 'Philadelphia Phillies',
        probability: 0.08,
        price: 0.08,
        volume: 1440000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.36,
        price: 0.36,
        volume: 6480000
      }
    ],
    totalVolume: 18000000,
    liquidity: 5400000,
    comments: [],
    tags: ['sports', 'baseball', 'mlb', 'world-series'],
    imageUrl: '/images/sports.svg'
  },
  {
    id: 'f1-champion-2025',
    title: 'F1 Drivers Champion 2025',
    description: 'Who will win the 2025 Formula 1 World Drivers\' Championship?',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-11-20T00:00:00Z',
    endDate: '2025-12-01T23:59:59Z',
    creator: {
      id: 'user12',
      username: 'f1_speed_demon',
      reputation: 90
    },
    outcomes: [
      {
        id: 'piastri',
        label: 'Oscar Piastri',
        probability: 0.56,
        price: 0.56,
        volume: 27440000
      },
      {
        id: 'norris',
        label: 'Lando Norris',
        probability: 0.37,
        price: 0.37,
        volume: 18130000
      },
      {
        id: 'verstappen',
        label: 'Max Verstappen',
        probability: 0.05,
        price: 0.05,
        volume: 2450000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.02,
        price: 0.02,
        volume: 980000
      }
    ],
    totalVolume: 49000000,
    liquidity: 14700000,
    comments: [],
    tags: ['sports', 'f1', 'formula1', 'racing'],
    imageUrl: '/images/sports.svg',
    featured: true
  },

  // CRYPTO MARKETS
  {
    id: 'btc-price-2025-max',
    title: 'What Price Will Bitcoin Hit in 2025?',
    description: 'What will be the highest price Bitcoin reaches during 2025? Current ATH is around $108k.',
    category: 'crypto',
    status: 'active',
    resolutionType: 'scalar',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user13',
      username: 'btc_price_oracle',
      reputation: 99
    },
    outcomes: [
      {
        id: 'btc-1m',
        label: '$1,000,000',
        probability: 0.02,
        price: 0.02,
        volume: 700000
      },
      {
        id: 'btc-250k',
        label: '$250,000',
        probability: 0.05,
        price: 0.05,
        volume: 1750000
      },
      {
        id: 'btc-200k',
        label: '$200,000',
        probability: 0.08,
        price: 0.08,
        volume: 2800000
      },
      {
        id: 'btc-150k',
        label: '$150,000',
        probability: 0.28,
        price: 0.28,
        volume: 9800000
      },
      {
        id: 'btc-130k',
        label: '$130,000',
        probability: 0.45,
        price: 0.45,
        volume: 15750000
      },
      {
        id: 'btc-120k',
        label: '$120,000',
        probability: 0.12,
        price: 0.12,
        volume: 4200000
      }
    ],
    totalVolume: 35000000,
    liquidity: 10500000,
    comments: [],
    tags: ['bitcoin', 'btc', 'price-prediction', 'crypto', 'ath'],
    imageUrl: '/images/bitcoin.svg',
    featured: true
  },
  {
    id: 'eth-july-1-2025',
    title: 'Ethereum Price July 1, 2025',
    description: 'What will be the price of Ethereum on July 1st, 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'scalar',
    createdAt: '2024-12-15T00:00:00Z',
    endDate: '2025-07-01T23:59:59Z',
    creator: {
      id: 'user14',
      username: 'eth_whale_2025',
      reputation: 95
    },
    outcomes: [
      {
        id: 'eth-under-2200',
        label: '<$2200',
        probability: 0.02,
        price: 0.02,
        volume: 120000
      },
      {
        id: 'eth-2200-2300',
        label: '$2200-2300',
        probability: 0.03,
        price: 0.03,
        volume: 180000
      },
      {
        id: 'eth-2300-2400',
        label: '$2300-2400',
        probability: 0.12,
        price: 0.12,
        volume: 720000
      },
      {
        id: 'eth-2400-2500',
        label: '$2400-2500',
        probability: 0.81,
        price: 0.81,
        volume: 4860000
      },
      {
        id: 'eth-over-2500',
        label: '>$2500',
        probability: 0.02,
        price: 0.02,
        volume: 120000
      }
    ],
    totalVolume: 6000000,
    liquidity: 1800000,
    comments: [],
    tags: ['ethereum', 'eth', 'price-prediction', 'crypto'],
    imageUrl: '/images/ethereum.svg'
  },

  // POLITICAL MARKETS
  {
    id: 'chile-president-2025',
    title: 'Chile Presidential Election',
    description: 'Who will win the 2025 Chilean Presidential Election?',
    category: 'politics',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-11-01T00:00:00Z',
    endDate: '2025-11-30T23:59:59Z',
    creator: {
      id: 'user15',
      username: 'latam_politics_degen',
      reputation: 86
    },
    outcomes: [
      {
        id: 'kast',
        label: 'José Antonio Kast',
        probability: 0.46,
        price: 0.46,
        volume: 3680000
      },
      {
        id: 'matthei',
        label: 'Evelyn Matthei',
        probability: 0.28,
        price: 0.28,
        volume: 2240000
      },
      {
        id: 'jara',
        label: 'Jeannette Jara',
        probability: 0.21,
        price: 0.21,
        volume: 1680000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.05,
        price: 0.05,
        volume: 400000
      }
    ],
    totalVolume: 8000000,
    liquidity: 2400000,
    comments: [],
    tags: ['politics', 'chile', 'election', 'latin-america'],
    imageUrl: '/images/election.svg'
  },

  // TIME-BASED MARKETS
  {
    id: 'reconciliation-bill-timing',
    title: 'Reconciliation Bill Passed By...?',
    description: 'When will the reconciliation bill be passed by Congress?',
    category: 'politics',
    status: 'active',
    resolutionType: 'time-based',
    createdAt: '2024-12-20T00:00:00Z',
    endDate: '2025-08-31T23:59:59Z',
    creator: {
      id: 'user16',
      username: 'congress_tracker_420',
      reputation: 84
    },
    outcomes: [
      {
        id: 'july-3',
        label: 'July 3',
        probability: 0.15,
        price: 0.15,
        volume: 1200000
      },
      {
        id: 'july-4',
        label: 'July 4',
        probability: 0.48,
        price: 0.48,
        volume: 3840000
      },
      {
        id: 'july-5',
        label: 'July 5',
        probability: 0.32,
        price: 0.32,
        volume: 2560000
      },
      {
        id: 'july-31',
        label: 'July 31',
        probability: 0.04,
        price: 0.04,
        volume: 320000
      },
      {
        id: 'august-31',
        label: 'August 31',
        probability: 0.01,
        price: 0.01,
        volume: 80000
      }
    ],
    totalVolume: 8000000,
    liquidity: 2400000,
    comments: [],
    tags: ['politics', 'congress', 'reconciliation', 'timing'],
    imageUrl: '/images/election.svg'
  },
  {
    id: 'gpt5-release-timing',
    title: 'GPT-5 Released By...?',
    description: 'When will OpenAI release GPT-5 to the public?',
    category: 'technology',
    status: 'active',
    resolutionType: 'time-based',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user17',
      username: 'ai_release_tracker',
      reputation: 91
    },
    outcomes: [
      {
        id: 'june-30',
        label: 'June 30',
        probability: 0.001,
        price: 0.001,
        volume: 8000
      },
      {
        id: 'july-31',
        label: 'July 31',
        probability: 0.26,
        price: 0.26,
        volume: 2080000
      },
      {
        id: 'december-31',
        label: 'December 31',
        probability: 0.739,
        price: 0.739,
        volume: 5912000
      }
    ],
    totalVolume: 8000000,
    liquidity: 2400000,
    comments: [],
    tags: ['technology', 'ai', 'openai', 'gpt5', 'release'],
    imageUrl: '/images/placeholder.svg'
  },

  // ECONOMIC & FINANCE
  {
    id: 'fed-rate-cuts-2025',
    title: 'How Many Fed Rate Cuts in 2025?',
    description: 'How many times will the Federal Reserve cut interest rates in 2025?',
    category: 'finance',
    status: 'active',
    resolutionType: 'scalar',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user18',
      username: 'rate_cut_predictor',
      reputation: 92
    },
    outcomes: [
      {
        id: 'zero-cuts',
        label: '0 cuts',
        probability: 0.12,
        price: 0.12,
        volume: 1200000
      },
      {
        id: 'one-cut',
        label: '1 cut (25 bps)',
        probability: 0.19,
        price: 0.19,
        volume: 1900000
      },
      {
        id: 'two-cuts',
        label: '2 cuts (50 bps)',
        probability: 0.41,
        price: 0.41,
        volume: 4100000
      },
      {
        id: 'three-cuts',
        label: '3 cuts (75 bps)',
        probability: 0.18,
        price: 0.18,
        volume: 1800000
      },
      {
        id: 'four-plus-cuts',
        label: '4+ cuts',
        probability: 0.10,
        price: 0.10,
        volume: 1000000
      }
    ],
    totalVolume: 10000000,
    liquidity: 3000000,
    comments: [],
    tags: ['finance', 'fed', 'interest-rates', 'monetary-policy'],
    imageUrl: '/images/placeholder.svg'
  },

  // TECHNOLOGY & AI
  {
    id: 'best-ai-model-july-2025',
    title: 'Best AI Model End of July 2025',
    description: 'Which company will have the most advanced AI model by the end of July 2025?',
    category: 'technology',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-12-15T00:00:00Z',
    endDate: '2025-08-01T23:59:59Z',
    creator: {
      id: 'user19',
      username: 'ai_model_ranker',
      reputation: 95
    },
    outcomes: [
      {
        id: 'google',
        label: 'Google',
        probability: 0.68,
        price: 0.68,
        volume: 8160000
      },
      {
        id: 'xai',
        label: 'xAI',
        probability: 0.22,
        price: 0.22,
        volume: 2640000
      },
      {
        id: 'openai',
        label: 'OpenAI',
        probability: 0.08,
        price: 0.08,
        volume: 960000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.02,
        price: 0.02,
        volume: 240000
      }
    ],
    totalVolume: 12000000,
    liquidity: 3600000,
    comments: [],
    tags: ['technology', 'ai', 'google', 'xai', 'openai'],
    imageUrl: '/images/placeholder.svg'
  },

  // GLOBAL EVENTS
  {
    id: 'xi-jinping-out-2025',
    title: 'Xi Jinping Out in 2025?',
    description: 'Will Xi Jinping step down or be removed from power in China in 2025?',
    category: 'politics',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-11-15T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user20',
      username: 'china_watcher_degen',
      reputation: 88
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.13,
        price: 0.13,
        volume: 780000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.87,
        price: 0.87,
        volume: 5220000
      }
    ],
    totalVolume: 6000000,
    liquidity: 1800000,
    comments: [],
    tags: ['politics', 'china', 'xi-jinping', 'leadership'],
    imageUrl: '/images/placeholder.svg'
  },

  // DAILY LIVE MARKETS
  {
    id: 'btc-up-down-july-1-3am',
    title: 'Bitcoin Up/Down July 1, 3AM ET',
    description: 'Will Bitcoin be up or down at 3AM ET on July 1st compared to current price?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-30T00:00:00Z',
    endDate: '2025-07-01T07:00:00Z',
    creator: {
      id: 'user21',
      username: 'scalp_master_9000',
      reputation: 82
    },
    outcomes: [
      {
        id: 'up',
        label: 'Up',
        probability: 1.00,
        price: 1.00,
        volume: 500000
      },
      {
        id: 'down',
        label: 'Down',
        probability: 0.00,
        price: 0.00,
        volume: 0
      }
    ],
    totalVolume: 500000,
    liquidity: 150000,
    comments: [],
    tags: ['crypto', 'bitcoin', 'short-term', 'live'],
    imageUrl: '/images/bitcoin.svg'
  },
  {
    id: 'yankees-vs-blue-jays-today',
    title: 'Yankees vs Blue Jays Today',
    description: 'Will the New York Yankees beat the Toronto Blue Jays in today\'s game?',
    category: 'sports',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-07-01T00:00:00Z',
    endDate: '2025-07-01T23:59:59Z',
    creator: {
      id: 'user22',
      username: 'daily_sports_degen',
      reputation: 79
    },
    outcomes: [
      {
        id: 'yankees',
        label: 'Yankees Win',
        probability: 0.61,
        price: 0.61,
        volume: 122000
      },
      {
        id: 'blue-jays',
        label: 'Blue Jays Win',
        probability: 0.39,
        price: 0.39,
        volume: 78000
      }
    ],
    totalVolume: 200000,
    liquidity: 60000,
    comments: [],
    tags: ['sports', 'baseball', 'yankees', 'blue-jays', 'daily'],
    imageUrl: '/images/sports.svg'
  },

  // ENTERTAINMENT
  {
    id: 'highest-grossing-movie-2025',
    title: 'Highest Grossing Movie 2025',
    description: 'Which movie will have the highest worldwide box office gross in 2025?',
    category: 'entertainment',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-11-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user23',
      username: 'box_office_whale',
      reputation: 85
    },
    outcomes: [
      {
        id: 'minecraft-movie',
        label: 'A Minecraft Movie',
        probability: 0.31,
        price: 0.31,
        volume: 2790000
      },
      {
        id: 'zootopia-2',
        label: 'Zootopia 2',
        probability: 0.29,
        price: 0.29,
        volume: 2610000
      },
      {
        id: 'superman',
        label: 'Superman',
        probability: 0.16,
        price: 0.16,
        volume: 1440000
      },
      {
        id: 'avatar-3',
        label: 'Avatar 3',
        probability: 0.14,
        price: 0.14,
        volume: 1260000
      },
      {
        id: 'others',
        label: 'Others',
        probability: 0.10,
        price: 0.10,
        volume: 900000
      }
    ],
    totalVolume: 9000000,
    liquidity: 2700000,
    comments: [],
    tags: ['entertainment', 'movies', 'box-office', 'minecraft', 'disney'],
    imageUrl: '/images/placeholder.svg'
  },

  // UNUSUAL/MEME MARKETS
  {
    id: 'jesus-christ-return-2025',
    title: 'Will Jesus Christ Return in 2025?',
    description: 'Will the Second Coming of Jesus Christ occur in 2025? Market resolves based on global consensus.',
    category: 'other',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2024-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user24',
      username: 'apocalypse_trader',
      reputation: 73
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.02,
        price: 0.02,
        volume: 14160
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.98,
        price: 0.98,
        volume: 693840
      }
    ],
    totalVolume: 708000,
    liquidity: 212400,
    comments: [],
    tags: ['unusual', 'religion', 'apocalypse', 'meme'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'what-happens-before-gta-6',
    title: 'What Will Happen Before GTA VI?',
    description: 'Which of these events will happen before GTA VI is released?',
    category: 'other',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2024-11-15T00:00:00Z',
    endDate: '2026-12-31T23:59:59Z',
    creator: {
      id: 'user25',
      username: 'gta6_waiting_room',
      reputation: 76
    },
    outcomes: [
      {
        id: 'rihanna-album',
        label: 'New Rihanna Album',
        probability: 0.68,
        price: 0.68,
        volume: 1360000
      },
      {
        id: 'carti-album',
        label: 'New Playboi Carti Album',
        probability: 0.52,
        price: 0.52,
        volume: 1040000
      },
      {
        id: 'ukraine-ceasefire',
        label: 'Russia-Ukraine Ceasefire',
        probability: 0.47,
        price: 0.47,
        volume: 940000
      },
      {
        id: 'china-taiwan',
        label: 'China Invades Taiwan',
        probability: 0.19,
        price: 0.19,
        volume: 380000
      },
      {
        id: 'btc-1m',
        label: 'Bitcoin Hits $1m',
        probability: 0.14,
        price: 0.14,
        volume: 280000
      }
    ],
    totalVolume: 2000000,
    liquidity: 600000,
    comments: [],
    tags: ['unusual', 'gta6', 'pop-culture', 'meme'],
    imageUrl: '/images/placeholder.svg'
  },

  // TRENDING CURRENT EVENTS (ADDED FROM KALSHI/POLYMARKET)
  {
    id: 'israel-hamas-ceasefire-july-end',
    title: 'Israel-Hamas Ceasefire Announced Before End of July?',
    description: 'Will Israel and Hamas officially announce a ceasefire agreement before July 31, 2025? This is one of the hottest markets on Polymarket right now.',
    category: 'politics',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-25T00:00:00Z',
    endDate: '2025-07-31T23:59:59Z',
    creator: {
      id: 'user100',
      username: 'middle_east_oracle',
      reputation: 94
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.73,
        price: 0.73,
        volume: 12775000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.27,
        price: 0.27,
        volume: 4725000
      }
    ],
    totalVolume: 17500000,
    liquidity: 5250000,
    comments: [
      {
        id: 'comment100',
        userId: 'user101',
        username: 'gaza_trader_420',
        content: 'CEASEFIRE LOOKING LIKELY 📈 Big money flowing in',
        timestamp: '2025-06-25T15:30:00Z',
        likes: 234
      }
    ],
    tags: ['politics', 'israel', 'hamas', 'ceasefire', 'trending', 'polymarket-hot'],
    imageUrl: '/images/placeholder.svg',
    featured: true
  },
  {
    id: 'nba-draft-top-5-picks-2025',
    title: 'NBA Top 5 Draft Picks 2025',
    description: 'Who will be selected in the top 5 picks of the 2025 NBA Draft? Currently trending on both Kalshi and Polymarket.',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2025-06-20T00:00:00Z',
    endDate: '2025-06-26T23:59:59Z',
    creator: {
      id: 'user102',
      username: 'draft_king_degen',
      reputation: 91
    },
    outcomes: [
      {
        id: 'cooper-flagg',
        label: 'Cooper Flagg #1',
        probability: 0.67,
        price: 0.67,
        volume: 8710000
      },
      {
        id: 'ace-bailey',
        label: 'Ace Bailey Top 3',
        probability: 0.78,
        price: 0.78,
        volume: 5460000
      },
      {
        id: 'dylan-harper',
        label: 'Dylan Harper Top 5',
        probability: 0.89,
        price: 0.89,
        volume: 4230000
      },
      {
        id: 'others',
        label: 'Others in Top 5',
        probability: 0.45,
        price: 0.45,
        volume: 2600000
      }
    ],
    totalVolume: 13000000,
    liquidity: 3900000,
    comments: [],
    tags: ['sports', 'nba', 'draft', 'basketball', 'trending', 'kalshi-hot'],
    imageUrl: '/images/sports.svg',
    featured: true
  },
  {
    id: 'bitcoin-yearly-high-2025',
    title: 'How High Will Bitcoin Get This Year?',
    description: 'What will be Bitcoin\'s highest price point in 2025? One of the most active crypto markets on Kalshi right now.',
    category: 'crypto',
    status: 'active',
    resolutionType: 'scalar',
    createdAt: '2025-06-25T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user103',
      username: 'btc_yearly_tracker',
      reputation: 98
    },
    outcomes: [
      {
        id: 'btc-110k',
        label: '$110,000',
        probability: 0.15,
        price: 0.15,
        volume: 3900000
      },
      {
        id: 'btc-125k',
        label: '$125,000',
        probability: 0.28,
        price: 0.28,
        volume: 7280000
      },
      {
        id: 'btc-150k',
        label: '$150,000',
        probability: 0.34,
        price: 0.34,
        volume: 8840000
      },
      {
        id: 'btc-200k',
        label: '$200,000',
        probability: 0.18,
        price: 0.18,
        volume: 4680000
      },
      {
        id: 'btc-250k-plus',
        label: '$250,000+',
        probability: 0.05,
        price: 0.05,
        volume: 1300000
      }
    ],
    totalVolume: 26000000,
    liquidity: 7800000,
    comments: [],
    tags: ['crypto', 'bitcoin', 'yearly-high', 'trending', 'kalshi-hot'],
    imageUrl: '/images/bitcoin.svg',
    featured: true
  },
  {
    id: 'australian-election-winner-2025',
    title: 'Australian Election Winner',
    description: 'Who will win the next Australian federal election? Trending heavily on international prediction markets.',
    category: 'politics',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2025-06-15T00:00:00Z',
    endDate: '2026-05-31T23:59:59Z',
    creator: {
      id: 'user104',
      username: 'aussie_politics_whale',
      reputation: 87
    },
    outcomes: [
      {
        id: 'labor-albanese',
        label: 'Labor (Albanese)',
        probability: 0.58,
        price: 0.58,
        volume: 4060000
      },
      {
        id: 'liberal-dutton',
        label: 'Liberal (Dutton)',
        probability: 0.39,
        price: 0.39,
        volume: 2730000
      },
      {
        id: 'coalition-others',
        label: 'Coalition/Others',
        probability: 0.03,
        price: 0.03,
        volume: 210000
      }
    ],
    totalVolume: 7000000,
    liquidity: 2100000,
    comments: [],
    tags: ['politics', 'australia', 'election', 'international', 'trending'],
    imageUrl: '/images/election.svg'
  },
  {
    id: 'crypto-market-cap-3t',
    title: 'Crypto Market Cap Above $3 Trillion in 2025?',
    description: 'Will the total cryptocurrency market capitalization exceed $3 trillion before end of 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-24T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user105',
      username: 'total_market_cap_chad',
      reputation: 93
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.72,
        price: 0.72,
        volume: 7920000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.28,
        price: 0.28,
        volume: 3080000
      }
    ],
    totalVolume: 11000000,
    liquidity: 3300000,
    comments: [],
    tags: ['crypto', 'market-cap', 'total-market', 'trending'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'ai-agi-breakthrough-2025',
    title: 'AGI Breakthrough Announced in 2025?',
    description: 'Will a major AI company announce they have achieved Artificial General Intelligence (AGI) in 2025?',
    category: 'technology',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-23T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user106',
      username: 'agi_singularity_bet',
      reputation: 89
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.23,
        price: 0.23,
        volume: 1610000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.77,
        price: 0.77,
        volume: 5390000
      }
    ],
    totalVolume: 7000000,
    liquidity: 2100000,
    comments: [],
    tags: ['technology', 'ai', 'agi', 'breakthrough', 'trending'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'summer-olympics-2025-medal-count',
    title: 'Top 3 Countries by Medal Count - Summer Olympics 2025',
    description: 'Which countries will finish in the top 3 for total medal count at the 2025 Summer Olympics?',
    category: 'sports',
    status: 'active',
    resolutionType: 'multiple-choice',
    createdAt: '2025-06-22T00:00:00Z',
    endDate: '2025-08-15T23:59:59Z',
    creator: {
      id: 'user107',
      username: 'olympics_medal_tracker',
      reputation: 86
    },
    outcomes: [
      {
        id: 'usa-top-3',
        label: 'USA Top 3',
        probability: 0.95,
        price: 0.95,
        volume: 4750000
      },
      {
        id: 'china-top-3',
        label: 'China Top 3',
        probability: 0.92,
        price: 0.92,
        volume: 4600000
      },
      {
        id: 'japan-top-3',
        label: 'Japan Top 3',
        probability: 0.34,
        price: 0.34,
        volume: 1700000
      },
      {
        id: 'france-top-3',
        label: 'France Top 3',
        probability: 0.28,
        price: 0.28,
        volume: 1400000
      },
      {
        id: 'others-top-3',
        label: 'Others Top 3',
        probability: 0.15,
        price: 0.15,
        volume: 750000
      }
    ],
    totalVolume: 5000000,
    liquidity: 1500000,
    comments: [],
    tags: ['sports', 'olympics', 'medals', 'trending'],
    imageUrl: '/images/sports.svg'
  },
  {
    id: 'polymarket-us-return-2025',
    title: 'Polymarket Returns to US Market in 2025?',
    description: 'Will Polymarket gain regulatory approval and return to serving US customers in 2025? Meta-betting on prediction markets!',
    category: 'technology',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-25T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user108',
      username: 'polymarket_return_bet',
      reputation: 82
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.67,
        price: 0.67,
        volume: 2010000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.33,
        price: 0.33,
        volume: 990000
      }
    ],
    totalVolume: 3000000,
    liquidity: 900000,
    comments: [],
    tags: ['technology', 'polymarket', 'regulation', 'meta-betting', 'trending'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'climate-tipping-point-2025',
    title: 'Major Climate Tipping Point Reached in 2025?',
    description: 'Will scientists announce that a major climate tipping point has been reached or crossed in 2025?',
    category: 'science',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-21T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user109',
      username: 'climate_tipping_predictor',
      reputation: 88
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.31,
        price: 0.31,
        volume: 930000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.69,
        price: 0.69,
        volume: 2070000
      }
    ],
    totalVolume: 3000000,
    liquidity: 900000,
    comments: [],
    tags: ['science', 'climate', 'environment', 'tipping-point'],
    imageUrl: '/images/placeholder.svg'
  },
  {
    id: 'kalshi-ipo-2025',
    title: 'Kalshi Goes Public in 2025?',
    description: 'Will Kalshi announce plans for an IPO or go public in 2025? With their recent $185M raise at $2B valuation, could be next!',
    category: 'finance',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-25T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user110',
      username: 'kalshi_ipo_watcher',
      reputation: 85
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.18,
        price: 0.18,
        volume: 360000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.82,
        price: 0.82,
        volume: 1640000
      }
    ],
    totalVolume: 2000000,
    liquidity: 600000,
    comments: [],
    tags: ['finance', 'kalshi', 'ipo', 'trending', 'meta-betting'],
    imageUrl: '/images/placeholder.svg'
  },

  // CRYPTO HOT TOPICS
  {
    id: 'ethereum-pos-upgrade-2025',
    title: 'Major Ethereum Upgrade Deployed in 2025?',
    description: 'Will Ethereum deploy a major protocol upgrade (beyond routine updates) in 2025?',
    category: 'crypto',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-24T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user111',
      username: 'eth_upgrade_scout',
      reputation: 91
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.58,
        price: 0.58,
        volume: 2320000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.42,
        price: 0.42,
        volume: 1680000
      }
    ],
    totalVolume: 4000000,
    liquidity: 1200000,
    comments: [],
    tags: ['crypto', 'ethereum', 'upgrade', 'protocol'],
    imageUrl: '/images/ethereum.svg'
  },

  // UNUSUAL TRENDING MARKETS
  {
    id: 'aliens-contact-earth-2025',
    title: 'Official Alien Contact Announced in 2025?',
    description: 'Will any government officially announce contact with extraterrestrial intelligence in 2025?',
    category: 'other',
    status: 'active',
    resolutionType: 'binary',
    createdAt: '2025-06-20T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    creator: {
      id: 'user112',
      username: 'alien_contact_believer',
      reputation: 74
    },
    outcomes: [
      {
        id: 'yes',
        label: 'Yes',
        probability: 0.04,
        price: 0.04,
        volume: 80000
      },
      {
        id: 'no',
        label: 'No',
        probability: 0.96,
        price: 0.96,
        volume: 1920000
      }
    ],
    totalVolume: 2000000,
    liquidity: 600000,
    comments: [],
    tags: ['unusual', 'aliens', 'ufo', 'contact', 'government'],
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

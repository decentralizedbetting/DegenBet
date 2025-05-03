# Crypto Prediction Market 🚀

<div align="center">
  <img src="public/logo.svg" alt="Crypto Prediction Market Logo" width="200"/>
  <h3>Predict. Trade. Profit.</h3>
  <p>A modern decentralized platform for trading on future events using cryptocurrency.</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
  ![React](https://img.shields.io/badge/React-18.0-blue)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6)
</div>

## 📑 Table of Contents
- [Live Demo](#-live-demo) 
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Key Components](#-key-components)
- [Development Process](#-development-process)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)

## 🌐 Live Demo

Visit our live demo: [Crypto Prediction Market](https://crypto-prediction-market-4mb5ml5d9-laxraws-projects.vercel.app)

## 📋 Project Overview

Crypto Prediction Market is a platform similar to Polymarket and Kalshi that enables users to trade on the outcomes of future events. The application combines modern web technologies with a user-friendly interface to create an engaging prediction market experience. Users can browse different markets, place trades on outcomes, and track their portfolio performance over time.

## ✨ Features

- **Browsable Markets**: Explore prediction markets across diverse categories
- **Real-time Trading**: Interactive interface for buying and selling outcome shares
- **Market Price Charts**: Visual representation of price movements over time
- **Portfolio Dashboard**: Track all your positions and historical performance
- **Market Creation Wizard**: Step-by-step guide for creating new markets
- **Responsive UI**: Seamless experience across mobile, tablet, and desktop
- **Interactive Components**: Modern UI with tooltips, modals, and animations

## 📸 Screenshots

### Home Page
![Home Page](public/screenshots/homepage.png)
*The landing page showcasing featured markets and platform statistics.*

### Market Detail
![Market Detail](public/screenshots/market-detail.png)
*Detailed view of a market with price chart, trading interface, and market information.*

### Trading Interface
![Trading Interface](public/screenshots/trading-interface.png)
*The interface where users can place trades on market outcomes.*

### Markets Explorer
![Markets Explorer](public/screenshots/markets-explorer.png)
*Browse and filter through available prediction markets.*

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [React 18](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Lightweight Charts](https://www.tradingview.com/lightweight-charts/) & [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Libraries**:
  - [@headlessui/react](https://headlessui.com/)
  - [@heroicons/react](https://heroicons.com/)
  - [@radix-ui/react-tabs](https://www.radix-ui.com/)
  - [@tabler/icons-react](https://tabler-icons.io/)
- **Development Tools**:
  - ESLint
  - PostCSS
  - Autoprefixer

## 📂 Project Structure

```
crypto-prediction-market/
├── app/                        # Next.js app router
│   ├── components/             # UI components
│   │   ├── ui/                 # Base UI components
│   │   ├── markets/            # Market-related components
│   │   ├── trading/            # Trading interface components
│   │   └── layout/             # Layout components
│   ├── data/                   # Mock data and API interfaces
│   ├── lib/                    # Utility functions and helpers
│   ├── markets/                # Market-related pages
│   │   └── [id]/               # Dynamic market detail page
│   ├── preview/                # Preview pages (dashboard, etc.)
│   └── page.tsx                # Homepage
├── public/                     # Static assets
│   ├── icons/                  # SVG icons
│   └── screenshots/            # README screenshots
├── scripts/                    # Build and maintenance scripts
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/crypto-prediction-market.git
cd crypto-prediction-market
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the result.

## 🧩 Key Components

### Market Components

- **MarketCard**: Displays summary information about a market
- **MarketsGrid**: Organizes multiple market cards in a responsive grid
- **FeaturedMarket**: Highlights a specific market on the homepage
- **MarketPageClient**: Main component for the detailed market view

### Trading Components

- **TradingInterface**: Handles the buying/selling of market shares
- **ProbabilitySlider**: Interactive slider for selecting probability/price
- **OrderBook**: Shows current buy/sell orders in the market

### Chart Components

- **PriceChart**: Displays market price history using Lightweight Charts
- **OutcomeChart**: Visualizes the probability distribution of outcomes

### UI Components

- **Button**: Customizable button with various styles and states
- **Card**: Container component with different variants
- **Input**: Form input with validation and styling
- **Tabs**: Tabbed interface for organizing content

## 💻 Development Process

This project follows modern web development practices:

1. **Component-Based Architecture**: Reusable, modular components
2. **Type Safety**: TypeScript for better code quality and IDE support
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Performance Optimization**: Next.js features for optimal loading
5. **Interactive UI**: Framer Motion for smooth animations and transitions

## 📤 Deployment

The application is deployed on Vercel, but can be deployed to any hosting service that supports Next.js:

1. **Build the application**
```bash
npm run build
```

2. **Start the production server**
```bash
npm run start
```

Alternatively, deploy directly to Vercel:
```bash
npm install -g vercel
vercel
```

## 🔮 Future Enhancements

- **Blockchain Integration**: Connect to Ethereum/Polygon for real trading
- **Smart Contracts**: Implement prediction market contracts for trustless trading
- **User Authentication**: Connect wallet for seamless Web3 login
- **Market Creation**: Allow users to create and fund their own markets
- **Social Features**: Comments, sharing, and social trading
- **Advanced Analytics**: Market trends, user statistics, and insights
- **Mobile App**: Native mobile experience using React Native

## 👥 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by platforms like [Polymarket](https://polymarket.com/) and [Kalshi](https://kalshi.com/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Special thanks to all contributors and the open-source community 
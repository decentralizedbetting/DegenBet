# Market Detail Page Components

This directory contains the main market detail page and its supporting components for the CryptoPredictionMarket application.

## Components Overview

The market detail page uses a collection of modular components to display market information and provide trading functionality:

### 1. Market Detail Page (`page.tsx`)
- Main container component that integrates all trading components
- Displays market metadata (title, description, volume, etc.)
- Handles data loading and state management
- Responsive layout with grid system for different screen sizes

### 2. Trading Components

#### PriceChart (`app/components/trading/PriceChart.tsx`)
- Displays price history for the selected market outcome
- Supports different timeframes (1H, 6H, 1D, 1W, 1M, ALL)
- Shows key metrics (current price, high/low, change percentage)
- Includes loading state with skeleton UI
- Auto-generates mock data when real data isn't available

#### OrderBook (`app/components/trading/OrderBook.tsx`)
- Visualizes the current bids and asks in the market
- Shows depth visualization with colored background bars
- Highlights user's own orders
- Displays the price spread between best bid and ask
- Supports interaction to populate trading form

#### MarketActivity (`app/components/trading/MarketActivity.tsx`)
- Shows recent market transactions
- Groups activities by date
- Supports different transaction types (buy, sell, liquidity, position)
- Highlights user's own activities
- Uses proper time formatting and address shortening

#### TopHolders (`app/components/trading/TopHolders.tsx`)
- Lists participants with the largest positions
- Shows position size, share quantity, and percentage of total
- Differentiates between position types (yes, no, liquidity)
- Visual indicators for position size
- Highlights user's own positions

#### TradingInterface (`app/components/trading/TradingInterface.tsx`)
- Form for placing trades in the market
- Supports selecting outcomes and order types
- Real-time calculation of potential payouts
- Slippage tolerance slider
- Comprehensive trade summary
- Visual feedback for loading states
- Form validation

### 3. UI Components

The trading components are built on top of reusable UI primitives:

- `Button`: Multi-variant button with loading states
- `Card`: Container component with variants
- `Input`: Form input with prefix/suffix support
- `ProbabilitySlider`: Interactive slider for probability/percentage inputs
- `Skeleton`: Loading placeholder

## Data Flow

1. The market detail page loads and fetches market data
2. Data is distributed to child components via props
3. User interactions are handled locally in each component
4. Trading actions are passed up to the parent for processing
5. UI updates to reflect the outcome of actions

## Mock Data Support

The components currently use mock data generators to simulate:
- Price chart data
- Order book entries
- Trading activity
- Position holders

These can be replaced with real API calls while maintaining the same interface structure. 
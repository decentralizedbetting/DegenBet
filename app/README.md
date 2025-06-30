# DegenBet App Directory 📁

This README provides a comprehensive guide to the `/app` directory structure, explaining what each file and folder does, where they're used, and how they work together in the DegenBet platform.

## 📑 Table of Contents
- [Overview](#-overview)
- [Root Files](#-root-files)
- [Directory Structure](#-directory-structure)
- [Component Architecture](#-component-architecture)
- [Data Flow](#-data-flow)
- [Import Patterns](#-import-patterns)
- [Development Guidelines](#-development-guidelines)
- [Where to Make Changes](#-where-to-make-changes)

## 🌟 Overview

The `/app` directory uses **Next.js 14 App Router** architecture, providing:
- **File-based routing** with automatic page generation
- **Server-side rendering** by default
- **Streaming and Suspense** support
- **Layout nesting** for shared UI components
- **TypeScript-first** development approach

## 📄 Root Files

### `layout.tsx` (2.9KB, 101 lines)
**Purpose**: Root layout component that wraps all pages
**Contains**:
- HTML document structure (`<html>`, `<head>`, `<body>`)
- Global metadata (title, description, keywords, favicon)
- Font loading (Inter from Google Fonts)
- Theme provider integration
- Navigation component
- Footer component

**Usage**:
```typescript
// Applied to every page automatically
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**When to modify**:
- Adding global meta tags
- Changing site-wide fonts
- Adding global providers (auth, theme, etc.)
- Modifying navigation or footer

---

### `page.tsx` (65KB, 1295 lines)
**Purpose**: Homepage component - the main landing page
**Contains**:
- Hero section with platform introduction
- Featured markets display
- Statistics section
- Platform categories
- Wallet integration showcase
- Call-to-action sections

**Key Features**:
- Real-time market data
- Interactive market cards
- Responsive design
- Blockchain ecosystem showcase
- Platform statistics

**Usage**: Automatically served at `/` route

**When to modify**:
- Updating homepage content
- Adding new sections
- Modifying platform statistics
- Changing featured markets

---

### `globals.css` (4.4KB, 213 lines)
**Purpose**: Global styles and CSS custom properties
**Contains**:
- Tailwind CSS base imports
- CSS custom properties (colors, spacing)
- Dark/light theme variables
- Custom animations and keyframes
- Global utility classes
- Scrollbar styling

**Key Sections**:
```css
@layer base {
  :root {
    --primary: 167 48% 46%;    /* Teal primary color */
    --background: 0 0% 0%;     /* Dark background */
  }
}

/* Custom animations */
@keyframes fadeIn { /* ... */ }
@keyframes dataFlow { /* ... */ }
```

**When to modify**:
- Adding new color schemes
- Creating custom animations
- Defining global styles
- Adding utility classes

---

### `ThemeContext.tsx` (1.5KB, 53 lines)
**Purpose**: React Context for theme management
**Contains**:
- Theme state management (light/dark)
- Theme persistence (localStorage)
- Theme provider component
- Custom hook for theme access

**Usage**:
```typescript
// In components
import { useTheme } from '@/ThemeContext';

function Component() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

**When to modify**:
- Adding new theme options
- Changing theme persistence logic
- Adding theme-related utilities

## 📂 Directory Structure

### `/components` - UI Components
**Purpose**: Reusable UI components organized by category

```
components/
├── ui/                     # Base UI components
│   ├── interactive/        # Interactive components (sliders, selectors)
│   ├── Button.tsx          # Multi-variant button component
│   ├── Card.tsx           # Flexible container component
│   ├── Input.tsx          # Form input with validation
│   ├── Navigation.tsx     # Site navigation with wallet connect
│   └── Tabs.tsx           # Accessible tabbed interface
├── trading/               # Trading-specific components
│   ├── MarketActivity.tsx     # Recent market transactions
│   ├── MultiOutcomeChart.tsx  # Charts for multiple outcomes
│   ├── OrderBook.tsx          # Bid/ask order display
│   ├── PriceChart.tsx         # Price history charts
│   ├── TopHolders.tsx         # Largest position holders
│   └── TradingInterface.tsx   # Main betting interface
├── visualizations/        # Data visualization components
│   └── TradingChart.tsx       # Advanced trading charts
├── FeaturedMarket.tsx     # Homepage featured market
├── Footer.tsx             # Site footer with terminal interface
├── DegenHero2025.tsx      # Terminal degen hero section with live feeds
├── MarketCard.tsx         # Individual market display with terminal styling
└── ThemeToggle.tsx        # Dark/light mode toggle
```

**Usage Patterns**:
```typescript
// Import UI components
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Import trading components
import { TradingInterface } from '@/components/trading/TradingInterface';

// Import specialized components
import { MarketCard } from '@/components/MarketCard';
```

---

### `/data` - Data Layer
**Purpose**: Data management, API interfaces, and mock data

**Contents**:
- `markets.ts` - Market data, utilities, and mock datasets
- API response types
- Data transformation utilities
- Mock data generators

**Key Functions**:
```typescript
import { getMarketData, getMarkets } from '@/data/markets';

// Get all markets
const markets = getMarkets();

// Get specific market
const market = getMarketData('market-id');
```

**When to use**:
- Adding new market data
- Creating mock data for development
- Defining API interfaces
- Data transformation logic

---

### `/lib` - Core Utilities
**Purpose**: Core utility functions and helpers

**Contents**:
- `utils.ts` - General utilities (cn, slugify, etc.)
- `accessibility.ts` - Accessibility helpers
- `api.ts` - API utilities and fetch helpers
- `performance.ts` - Performance optimization utilities

**Common Functions**:
```typescript
import { cn } from '@/lib/utils';           // Class name utility
import { slugify } from '@/lib/utils';      // URL slug creation
import { debounce } from '@/lib/performance'; // Performance utilities
```

**When to use**:
- Adding utility functions
- API helper functions
- Performance optimization
- Accessibility improvements

---

### `/types` - TypeScript Definitions
**Purpose**: TypeScript type definitions and interfaces

**Contents**:
- `market.ts` - Market-related types and interfaces
- Component prop types
- API response types
- Utility types

**Usage**:
```typescript
import type { Market, MarketOutcome } from '@/types/market';

interface ComponentProps {
  market: Market;
  onBet: (outcome: MarketOutcome) => void;
}
```

**When to use**:
- Defining new data structures
- Creating component interfaces
- API response typing
- Extending existing types

---

### `/utils` - App-Specific Utilities
**Purpose**: Application-specific utility functions

**Contents**:
- `chartData.ts` - Chart data generation and formatting
- Market calculation utilities
- Betting logic helpers
- Data formatting functions

**Usage**:
```typescript
import { ChartDataGenerator } from '@/utils/chartData';

const chartData = ChartDataGenerator.generatePriceHistory();
```

**When to use**:
- Chart data manipulation
- Market calculations
- Betting logic
- App-specific transformations

---

### `/styles` - Styling Utilities
**Purpose**: Styling utilities and design system tokens

**Contents**:
- `design-system.ts` - Design system tokens and variables
- `utils.ts` - Style-related utility functions
- Component styling patterns
- Theme definitions

**Usage**:
```typescript
import { colors, spacing } from '@/styles/design-system';
import { animationStyles } from '@/styles/utils';
```

**When to use**:
- Defining design tokens
- Creating style utilities
- Managing component variants
- Theme customization

---

### `/markets` - Market Pages
**Purpose**: Market-related pages and routing

```
markets/
├── [id]/                  # Dynamic market detail pages
│   ├── MarketPageClient.tsx   # Client-side market page
│   └── page.tsx              # Server-side market page
├── charts/                # Market charts page
│   └── page.tsx              # Charts visualization page
└── page.tsx               # Markets listing page
```

**Routing**:
- `/markets` → Markets listing
- `/markets/[id]` → Individual market detail
- `/markets/charts` → Charts and analytics

**When to modify**:
- Adding new market pages
- Changing market display logic
- Adding chart features
- Modifying market routing

---

### `/preview` - Preview Pages
**Purpose**: Preview and demo pages for development

```
preview/
├── market-detail/         # Market detail preview
├── market-wizard/         # Market creation wizard
└── profile-dashboard/     # User dashboard preview
```

**Usage**: 
- Development and testing
- Design previews
- Component showcases
- Feature prototyping

**When to use**:
- Testing new features
- Design iterations
- Component development
- User experience testing

## 🏗️ Component Architecture

### Component Hierarchy
```
RootLayout (layout.tsx)
├── Navigation (components/ui/Navigation.tsx)
├── Page Content (page.tsx or market pages)
│   ├── UI Components (components/ui/*)
│   ├── Trading Components (components/trading/*)
│   └── Market Components (components/Market*.tsx)
└── Footer (components/Footer.tsx)
```

### Design Patterns

#### 1. **Server-Side Components** (Default)
```typescript
// Server component - no "use client"
export default function MarketPage({ params }: { params: { id: string } }) {
  const market = getMarketData(params.id); // Server-side data fetching
  return <MarketPageClient market={market} />;
}
```

#### 2. **Client-Side Components**
```typescript
"use client"; // Required for interactivity

export function TradingInterface() {
  const [amount, setAmount] = useState(0); // Client-side state
  return <input onChange={(e) => setAmount(e.target.value)} />;
}
```

#### 3. **Compound Components**
```typescript
// Card.tsx exports multiple related components
export { Card, CardHeader, CardTitle, CardContent, CardFooter };

// Usage
<Card>
  <CardHeader>
    <CardTitle>Market Title</CardTitle>
  </CardHeader>
  <CardContent>Market details</CardContent>
</Card>
```

## 🔄 Data Flow

### 1. **Server-Side Data Flow**
```
Server Component → Data Fetching → Client Component → UI Update
```

### 2. **Client-Side Interaction Flow**
```
User Interaction → State Update → Component Re-render → UI Update
```

### 3. **Theme Flow**
```
ThemeContext → Theme Provider → Component Consumer → Style Application
```

## 📦 Import Patterns

### Standardized Import Structure
```typescript
// External imports first
import React from 'react';
import Link from 'next/link';

// Internal imports (absolute paths)
import { Button } from '@/components/ui/Button';
import { MarketCard } from '@/components/MarketCard';
import type { Market } from '@/types/market';
import { getMarketData } from '@/data/markets';
import { cn } from '@/lib/utils';
```

### Path Mapping Reference
```json
{
  "@/*": ["./app/*"],
  "@/components/*": ["./app/components/*"],
  "@/lib/*": ["./app/lib/*"],
  "@/types/*": ["./app/types/*"],
  "@/data/*": ["./app/data/*"],
  "@/utils/*": ["./app/utils/*"],
  "@/styles/*": ["./app/styles/*"]
}
```

## 📋 Development Guidelines

### File Naming Conventions
- **Components**: PascalCase (`MarketCard.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (`chartData.ts`)
- **Types**: camelCase (`market.ts`)

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { cn } from '@/lib/utils';

// 2. Types/Interfaces
interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

// 3. Component Definition
export function Component({ className, children }: ComponentProps) {
  // 4. Hooks and state
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Render
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
}
```

### TypeScript Best Practices
- Always define prop interfaces
- Use strict mode (enabled in tsconfig.json)
- Export types from `/types` directory
- Use `type` for object shapes, `interface` for extensible contracts

## 🛠️ Where to Make Changes

### Adding New Pages
1. Create file in appropriate directory:
   - `/markets/new-page/page.tsx` for market pages
   - `/preview/new-preview/page.tsx` for previews
2. Follow Next.js App Router conventions
3. Add to navigation if needed

### Creating New Components
1. Determine category:
   - `/components/ui/` for reusable UI
   - `/components/trading/` for trading-specific
   - `/components/` root for general components
2. Create TypeScript interface
3. Export from component file
4. Add to import patterns

### Modifying Styles
1. **Global styles**: Edit `globals.css`
2. **Theme colors**: Update CSS custom properties
3. **Component styles**: Use Tailwind classes
4. **Animations**: Add to `globals.css` or `/styles/`

### Adding Data/Types
1. **Market data**: Add to `/data/markets.ts`
2. **Type definitions**: Add to `/types/market.ts`
3. **Utilities**: Add to `/lib/utils.ts` or `/utils/`

### Performance Optimization
1. **Server components**: Use by default (no "use client")
2. **Client components**: Only when needed for interactivity
3. **Dynamic imports**: For large components
4. **Image optimization**: Use Next.js `Image` component

### Debugging Common Issues
1. **Import errors**: Check path mapping in `tsconfig.json`
2. **Hydration errors**: Ensure server/client rendering match
3. **Style issues**: Check Tailwind configuration
4. **Type errors**: Verify TypeScript interfaces

## 🚀 Getting Started with Development

### 1. Understanding the Structure
- Start with `page.tsx` to understand the homepage
- Explore `components/ui/` for reusable components
- Check `types/market.ts` for data structures

### 2. Making Your First Change
- Find the relevant component in `/components/`
- Check the component's props interface
- Make changes following TypeScript guidelines
- Test in browser at `http://localhost:3000`

### 3. Adding New Features
- Plan the component hierarchy
- Create types first in `/types/`
- Build components in appropriate directories
- Add to pages where needed

### 4. Best Practices
- Use TypeScript strictly
- Follow import patterns
- Test on multiple screen sizes
- Maintain accessibility standards

---

## 📞 Need Help?

- **Component Issues**: Check `/components/ui/` for examples
- **Type Errors**: Review `/types/market.ts` for interfaces
- **Styling Problems**: See `globals.css` and Tailwind config
- **Data Flow**: Follow patterns in `/data/markets.ts`

This architecture provides a scalable, maintainable foundation for the DegenBet platform with clear separation of concerns and consistent patterns throughout.

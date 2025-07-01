# 🚀 DegenBet (DBT) Presale Platform

## Overview

This is a complete **Terminal Degen**-themed presale platform for the DBT token private sale. Built with Next.js 14, TypeScript, and Tailwind CSS, it features a command-line interface aesthetic with Matrix-style animations and blockchain integration for BNB Smart Chain.

**Target**: Raise $200K in the private sale with 100M DBT tokens at $0.002 per token.

---

## 🏗️ **Architecture**

### **Directory Structure**
```
app/presale/
├── page.tsx                     # Main presale landing page
├── dashboard/
│   └── page.tsx                 # User token management dashboard
├── whitelist/
│   └── page.tsx                 # Pre-registration/whitelist page
├── components/
│   ├── WalletConnection.tsx     # Multi-wallet connection component
│   ├── ReferralSystem.tsx       # Referral rewards & leaderboard
│   ├── SmartContractInterface.tsx # Vesting & token claims
│   └── PresaleNavigation.tsx    # Navigation between presale pages
└── README.md                    # This documentation
```

### **Page Routes**
- `/presale` - Main presale page (purchase DBT tokens)
- `/presale/dashboard` - User dashboard (manage tokens, vesting, referrals)
- `/presale/whitelist` - Whitelist registration (pre-launch FOMO)

---

## 🎨 **Design System**

### **Terminal Degen Aesthetic**
- **Colors**: Matrix green (#22c55e), terminal amber, red alerts
- **Typography**: Monospace fonts (JetBrains Mono, Fira Code, Monaco)
- **Components**: Terminal windows with macOS-style traffic lights
- **Animations**: Grid movement, scan lines, cursor blinks, glitch effects

### **Key Visual Elements**
1. **Terminal Cards**: Black backgrounds with green borders and terminal headers
2. **Grid Background**: Animated Matrix-style grid with 20% opacity
3. **Status Indicators**: Colored dots (red/yellow/green) like terminal windows
4. **Progress Bars**: Green gradient bars with scan-line animations
5. **Buttons**: Glowing green "degen" style with hover effects

---

## 🔧 **Components**

### **1. WalletConnection.tsx**
**Purpose**: Multi-wallet connection interface
**Features**:
- Supports MetaMask, Trust Wallet, WalletConnect, Binance Wallet
- BNB Smart Chain network detection and switching
- Connection status display with wallet address truncation
- Modal-based wallet selection with Terminal styling

**Props**:
```typescript
interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: (provider: string) => void;
  walletAddress?: string;
}
```

### **2. ReferralSystem.tsx**
**Purpose**: Referral program with 10% DBT rewards
**Features**:
- Auto-generated referral codes based on wallet address
- Real-time referral statistics and earnings
- Leaderboard with top referrers
- Social media sharing integration
- Recent referral activity feed

**Props**:
```typescript
interface ReferralSystemProps {
  userAddress?: string;
  isConnected: boolean;
}
```

### **3. SmartContractInterface.tsx**
**Purpose**: Token vesting and claim management
**Features**:
- Vesting schedule visualization (10% TGE + 6-month linear)
- Real-time claimable token calculations
- Claim functionality with transaction tracking
- Purchase history display
- Contract information and verification links

**Props**:
```typescript
interface SmartContractInterfaceProps {
  isConnected: boolean;
  walletAddress?: string;
}
```

### **4. PresaleNavigation.tsx**
**Purpose**: Navigation between presale pages
**Features**:
- Active page highlighting
- Quick access to all presale functionality
- Terminal-style navigation with icons
- Live presale information banner

---

## 💰 **Tokenomics Implementation**

### **DBT Token Details**
- **Total Supply**: 1,000,000,000 DBT
- **Private Sale**: 100M DBT (10% of total)
- **Price**: $0.002 per DBT
- **Chain**: BNB Smart Chain (BSC)
- **Min Purchase**: 0.1 BNB
- **Max Purchase**: 50 BNB

### **Vesting Schedule**
- **TGE (Token Generation Event)**: 10% immediate release
- **Cliff Period**: 3 months after TGE
- **Linear Vesting**: 6 months after cliff (15% per month)
- **Total Vesting Period**: 9 months from TGE

### **Bonus Structure**
- **5+ BNB Purchase**: 5% extra DBT tokens
- **Referral Rewards**: 10% DBT for each successful referral
- **Whitelist Benefits**: Early access + priority bonuses

---

## 🛠️ **Setup & Development**

### **Prerequisites**
```bash
Node.js 18+ 
npm or yarn
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/yourusername/degenbet-presale

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Environment Variables**
Create a `.env.local` file:
```env
# Contract Addresses (deploy these first)
NEXT_PUBLIC_DBT_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS=0x...

# BNB Smart Chain RPC
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed.binance.org/

# API Keys (optional)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

---

## 🔗 **Smart Contract Integration**

### **Required Contracts**
1. **DBT Token Contract** (ERC-20)
   - Standard ERC-20 implementation
   - 1B total supply
   - Pausable functionality (optional)

2. **Presale Contract**
   - Accepts BNB payments
   - Converts BNB to DBT at fixed rate
   - Handles bonus calculations
   - Manages whitelist access

3. **Vesting Contract**
   - Manages token release schedules
   - Handles TGE and cliff periods
   - Allows users to claim vested tokens
   - Tracks vesting progress

### **Integration Points**
Replace mock data in components with real contract calls:

```typescript
// Example: Replace mock purchase data
const purchaseTokens = async (bnbAmount: number) => {
  const contract = new ethers.Contract(
    PRESALE_CONTRACT_ADDRESS,
    presaleABI,
    signer
  );
  
  const tx = await contract.purchaseTokens({
    value: ethers.utils.parseEther(bnbAmount.toString())
  });
  
  return tx;
};
```

---

## 🎯 **Key Features**

### **1. Main Presale Page (`/presale`)**
- Live presale progress tracking
- Real-time purchase activity feed
- BNB to DBT conversion calculator
- Wallet connection interface
- Tokenomics breakdown
- Purchase interface with bonus calculations

### **2. User Dashboard (`/presale/dashboard`)**
- Portfolio overview and statistics
- Vesting schedule visualization
- Token claim functionality
- Referral management
- Activity history
- Quick action buttons

### **3. Whitelist Registration (`/presale/whitelist`)**
- Pre-launch registration form
- Social proof and FOMO elements
- Live registration counters
- Limited spots (4,000 max)
- Social media integration
- Community testimonials

---

## 🎨 **Styling Guide**

### **Terminal Card Component**
```jsx
<div className="terminal-card">
  <div className="flex items-center justify-between p-3 border-b border-green-500/20">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-red-500"></div>
      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
    </div>
    <div className="terminal-text text-xs">filename.sh</div>
  </div>
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

### **Grid Background**
```jsx
<div className="fixed inset-0 -z-10">
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-gray-950/20" />
  <div 
    className="absolute inset-0 opacity-20 animate-grid-move"
    style={{
      backgroundImage: `
        linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px'
    }}
  />
</div>
```

### **Degen Button**
```jsx
<button className="btn-degen py-4 text-lg font-mono">
  PURCHASE_DBT_TOKENS
</button>
```

### **CSS Classes**
```css
.terminal-card {
  @apply bg-black/80 border border-green-500/30 rounded-lg backdrop-blur-sm;
}

.terminal-text {
  @apply font-mono text-green-400;
}

.btn-degen {
  @apply bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg font-mono hover:bg-green-500/30 hover:border-green-500/70 transition-all duration-200;
}
```

---

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### **Grid Layouts**
```jsx
// Responsive grid for stats
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Responsive layout for main content
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

### **Mobile Optimizations**
- Touch-friendly button sizes (min 44px)
- Optimized terminal card spacing
- Simplified grid backgrounds for performance
- Reduced animation complexity on mobile

---

## 🚀 **Deployment**

### **Build & Deploy**
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (recommended)
npx vercel --prod
```

### **Domain Setup**
Configure your subdomain to point to the deployment:
```
presale.degenbet.xyz → Your deployment URL
```

### **Performance Optimizations**
- Next.js automatic code splitting
- Image optimization for icons/logos
- CSS-in-JS for styled components
- Lazy loading for heavy components

---

## 🔧 **Testing**

### **Component Testing**
```bash
# Run component tests
npm run test

# Run with coverage
npm run test:coverage
```

### **Manual Testing Checklist**
- [ ] Wallet connection works on all browsers
- [ ] Grid background is visible and animating
- [ ] All terminal windows have proper styling
- [ ] Responsive design works on mobile/tablet
- [ ] Purchase calculations are correct
- [ ] Vesting schedules display properly
- [ ] Referral links generate correctly

---

## 🐛 **Troubleshooting**

### **Common Issues**

**1. Grid Background Not Visible**
- Check opacity is set to `opacity-20` (20%)
- Ensure `animate-grid-move` class is applied
- Verify Tailwind config includes grid animations

**2. Wallet Connection Issues**
- Ensure user is on BNB Smart Chain (Chain ID: 56)
- Check for proper error handling in wallet connection
- Verify contract addresses are correct

**3. Styling Issues**
- Make sure `terminal-card` class is properly defined
- Check for conflicting CSS classes
- Ensure Tailwind config is properly loaded

### **Debug Mode**
Add this to see component states:
```jsx
{process.env.NODE_ENV === 'development' && (
  <div className="fixed bottom-4 right-4 bg-black/80 text-green-400 p-4 rounded-lg font-mono text-xs">
    Debug: {JSON.stringify({ isConnected, walletAddress }, null, 2)}
  </div>
)}
```

---

## 📋 **Deployment Checklist**

### **Pre-Launch**
- [ ] Smart contracts deployed and verified on BSCScan
- [ ] Contract addresses updated in environment variables
- [ ] Whitelist functionality tested
- [ ] Purchase flow tested end-to-end
- [ ] Vesting calculations verified
- [ ] Referral system tested

### **Launch Day**
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Social media accounts ready
- [ ] Community announcements scheduled
- [ ] Monitoring and analytics setup

### **Post-Launch**
- [ ] Monitor transaction activity
- [ ] Track whitelist signups
- [ ] Monitor for any errors or issues
- [ ] Community support and engagement

---

## 🔐 **Security Considerations**

### **Smart Contract Security**
- Audit all contracts before deployment
- Test extensively on testnet
- Implement proper access controls
- Use multisig for contract ownership

### **Frontend Security**
- Validate all user inputs
- Sanitize data before display
- Use secure RPC endpoints
- Implement rate limiting

### **User Security**
- Clear wallet security instructions
- Warning messages for large transactions
- Proper error handling and user feedback
- Transaction confirmation dialogs

---

## 🎯 **Success Metrics**

### **KPIs to Track**
- **Whitelist Signups**: Target 4,000 registrations
- **Conversion Rate**: Whitelist → Purchase
- **Average Purchase**: Track BNB investment amounts
- **Referral Performance**: Track viral coefficient
- **Time to Goal**: Monitor progress toward $200K

### **Analytics Integration**
```jsx
// Track key events
const trackPurchase = (amount: number) => {
  analytics.track('Purchase_Completed', {
    amount_bnb: amount,
    amount_usd: amount * bnbPrice,
    timestamp: Date.now()
  });
};
```

---

## 📞 **Support & Maintenance**

### **Development Team Contacts**
- **Lead Developer**: [Your contact]
- **Smart Contract Developer**: [Contact]
- **UI/UX Designer**: [Contact]

### **Emergency Procedures**
- Contract pause functionality
- DNS failover procedures
- Communication channels for emergencies

---

## 🔄 **Future Enhancements**

### **Phase 2 Features**
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Enhanced referral features
- [ ] Integration with DegenBet main platform

### **Technical Improvements**
- [ ] Real-time WebSocket connections
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] A/B testing framework

---

**Built with ❤️ for the Degen community** 

*Ready to launch your $200K private sale! 🚀* 
# 🚀 **DegenBet Private Sale Technical Implementation Guide**

## ⚙️ Overview

* **Platform Name**: DegenBet
* **Token Name**: DegenBet Token (DBT)
* **Chain**: BNB Smart Chain (ERC-20 compatible)
* **Total Supply**: 1,000,000,000 DBT
* **Launch Strategy**: Crypto-native presale (Private + Public)
* **Core Feature**: Decentralized Prediction Market
* **Governance**: DAO powered by DBT

---

## 💻 **PRIVATE SALE TECHNICAL SETUP** 

### 🔧 **presale.degenbet.xyz Implementation**

#### **Smart Contract Architecture:**
```solidity
contract PresaleTracker {
    mapping(address => uint256) public contributions;
    mapping(address => uint256) public tokensPurchased;
    mapping(address => bool) public isWhitelisted;
    mapping(address => address) public referrals;
    
    uint256 public constant PRIVATE_SALE_PRICE = 2000000000000000; // 0.002 BNB per DBT
    uint256 public constant MAX_PRIVATE_RAISE = 200000 * 10**18; // $200K in BNB
    uint256 public totalRaised;
    uint256 public tokensSold;
    
    event Purchase(address buyer, uint256 amount, uint256 tokens);
    event Referral(address referrer, address buyer, uint256 bonus);
}
```

#### **Frontend Implementation (presale.degenbet.xyz):**

**1. Wallet Connection:**
- **MetaMask/Trust Wallet** integration
- **WalletConnect** for mobile wallets
- **Auto-detect** BNB Smart Chain network
- **Add BSC network** button if wrong chain

**2. Purchase Flow:**
```javascript
// Purchase tracking system
const handlePurchase = async (bnbAmount) => {
  // 1. Connect wallet
  const account = await connectWallet();
  
  // 2. Check whitelist status
  const isWhitelisted = await checkWhitelist(account);
  
  // 3. Calculate DBT tokens (1 BNB = 500,000 DBT at $0.002)
  const dbtTokens = bnbAmount * 500000;
  
  // 4. Send BNB to presale contract
  const tx = await presaleContract.contribute({
    value: ethers.utils.parseEther(bnbAmount.toString())
  });
  
  // 5. Update local database
  await updateUserContribution(account, bnbAmount, dbtTokens);
  
  // 6. Send confirmation email
  await sendPurchaseConfirmation(account, dbtTokens);
};
```

**3. Payment Tracking Database:**
```sql
CREATE TABLE presale_contributions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  wallet_address VARCHAR(42) NOT NULL,
  bnb_amount DECIMAL(18,8) NOT NULL,
  dbt_tokens DECIMAL(18,0) NOT NULL,
  referrer_address VARCHAR(42),
  bonus_tokens DECIMAL(18,0) DEFAULT 0,
  transaction_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'distributed') DEFAULT 'pending'
);
```

### 🎯 **Multi-Wallet Support:**
- **Receive Address**: Your main treasury wallet (multisig recommended)
- **Auto-tracking**: Smart contract logs all contributions
- **Manual backup**: Database tracks wallet → contribution mapping
- **Referral system**: Automatic bonus calculation and distribution

---

## 💎 **PRIVATE SALE EXCLUSIVE BENEFITS**

### 🏆 **Tier 1: Whale Benefits (5+ BNB)**
- **50% platform fees discount** for life
- **Exclusive "Founder" NFT** badge
- **Priority access** to all new markets
- **Direct line** to team via private Telegram
- **Revenue sharing**: 2% of quarterly platform fees
- **Early beta access** to all new features
- **Custom market creation** with zero fees

### 🚀 **Tier 2: Degen Benefits (1-5 BNB)**
- **25% platform fees discount** for life  
- **"Early Adopter" NFT** badge
- **Beta access** to new prediction markets
- **Private Discord** channel access
- **Revenue sharing**: 1% of quarterly platform fees
- **Priority customer support**
- **Governance voting power** from day one

### ⚡ **Tier 3: Community Benefits (0.1-1 BNB)**
- **10% platform fees discount** for life
- **"Supporter" NFT** badge
- **Early access** to new markets (24 hours)
- **Community Discord** access
- **Governance voting rights**
- **Staking bonus**: 25% higher APY

### 🎁 **Universal Private Sale Perks:**
- **15% TGE** (immediate token distribution)
- **Referral rewards**: 15% bonus for successful invites
- **Vesting advantage**: 2-month cliff vs 6-month for public
- **Market creation discount**: 50% off deployment fees
- **DAO proposal rights**: Create governance proposals
- **Whitelist guarantee**: Auto-approved for all future sales

---

## 📈 **TOKEN VALUE MAINTENANCE STRATEGY**

### 🔒 **Pre-DEX Launch Value Protection:**

**1. Limited Early Liquidity (Week 7):**
- **5% of raised funds** → Small PancakeSwap pool
- **Initial price**: $0.003-0.005 (natural price discovery)
- **Limited supply**: Only 15M DBT available for trading
- **Purpose**: Let private holders take profits, create FOMO

**2. Controlled Token Release:**
```
Week 7:  15% TGE to private holders = 15M DBT
Week 8:  No new tokens released
Week 9:  Public sale begins (creates buying pressure)
Week 10: Public TGE + full DEX launch
```

**3. Demand Generation:**
- **FOMO campaigns**: "Only 15M DBT available before public sale"
- **Utility activation**: Governance voting goes live
- **Platform beta**: Limited market creation for holders
- **Staking pools**: Immediate 50% APY for early stakers

**4. Supply Shock Tactics:**
- **Burn mechanism**: 10% of public sale tokens burned if sold out
- **Vesting locks**: 85% of tokens still locked during price discovery
- **Whale incentives**: Private holders get bonus for NOT selling
- **Liquidity rewards**: Extra DBT for providing liquidity

### 💰 **Expected Value Trajectory:**
- **Private Sale**: $0.002 (baseline)
- **Week 7 Launch**: $0.003-0.005 (2.5x potential)
- **Public Sale**: Launch price - 20% discount
- **DEX Launch**: $0.005-0.010 (5x potential from private)

---

## 🌐 **WHERE TO SHOW DBT UTILITIES ON WEBSITE**

### 📍 **Primary Locations:**

**1. Token Page (/token) - MAIN SHOWCASE:**
- **Detailed utility table** (the one from plan)
- **Real-world use cases** with examples
- **Comparison with other DeFi tokens**
- **Staking calculator** and fee savings calculator

**2. Presale Page (/presale) - CONVERSION FOCUSED:**
- **"Why Buy DBT?"** section with top 3 utilities
- **Exclusive benefits** for presale participants
- **FOMO messaging**: "Utilities activate post-presale"

**3. Homepage - QUICK OVERVIEW:**
- **6-icon utility grid** in hero section
- **"Powered by DBT"** callouts throughout
- **Link to full utility breakdown**

**4. Governance Page (/governance) - DAO FOCUS:**
- **Voting power calculator** based on DBT holdings
- **Active governance utilities** and voting history
- **Future governance roadmap**

### 📊 **Enhanced Utility Display:**
```jsx
// Token page utility showcase
const detailedUtilities = [
  {
    title: "PREDICTION_BETTING",
    description: "Primary currency for all market trading and position taking",
    examples: ["Bet on BTC price", "Sports outcomes", "Political events"],
    value: "100% of platform volume",
    status: "LIVE_POST_LAUNCH"
  },
  {
    title: "DAO_GOVERNANCE", 
    description: "Vote on protocol upgrades, market categories & treasury decisions",
    examples: ["New market types", "Fee structures", "Treasury allocation"],
    value: "1 DBT = 1 Vote",
    status: "ACTIVE_NOW"
  },
  // ... rest of utilities with detailed breakdowns
];
```

---

## 🧱 1. Smart Contract & Token Setup

You already have contracts built (✅), but here's your checklist:

### 🔧 Token Smart Contract Features

* ERC-20 Token (DBT)
* Pausable (optional)
* Minted: No (Fixed supply)
* Ownership: Transferable to DAO or multisig later
* Verified on BscScan

### 🔐 Vesting Contracts

* Private Presale Vesting
* Public Presale Vesting
* Team Allocation Vesting

Want code templates for this? I can generate them.

---

## 💰 2. Tokenomics Finalized (1B DBT)

| Category                | Allocation | Vesting                                        |
| ----------------------- | ---------- | ---------------------------------------------- |
| **Private Presale**     | 10% (100M) | 15% TGE, 2-month cliff, 4-month linear vest    |
| **Public Presale**      | 15% (150M) | 25% TGE, 3-month linear unlock                 |
| **Liquidity**           | 20% (200M) | For PancakeSwap, 1-year locked LP tokens       |
| **Team & Founders**     | 15% (150M) | 6-month cliff, 24-month vesting                |
| **Platform Incentives** | 15% (150M) | Prediction rewards, staking, referral airdrops |
| **Development Fund**    | 10% (100M) | Protocol improvements, bug bounties            |
| **Marketing**           | 10% (100M) | Influencer deals, CT push, campaigns           |
| **DAO Treasury**        | 5% (50M)   | Community grants, insurance pool, vote fund    |

---

## 🚀 3. THE DEGEN PRESALE STRATEGY (UPDATED)

### 🎯 Phase 1: Private Sale ($200K Target)

**Timeline**: 4-6 weeks
* **Goal**: $200,000
* **Tokens**: 100M DBT (10%)
* **Price**: $0.002 / DBT
* **Vesting**: 15% TGE, 2-month cliff, 4-month linear
* **Eligible**: Twitter degens, influencers, CT alpha groups
* **DEGEN BONUSES**:
  * 🔥 **First 24 hours**: 20% bonus tokens
  * 💎 **5+ BNB**: 10% bonus + exclusive NFT
  * 🚀 **Referral program**: 15% DBT for successful invites
  * 👑 **Top 10 contributors**: Permanent "Founder" status + revenue share

### 🎪 Phase 1.5: TOKEN LAUNCH & PRIVATE DISTRIBUTION

**Timeline**: 1 week after private sale closes
* **Deploy DBT token** to BNB Smart Chain
* **Distribute 15% TGE** to private sale participants
* **Create limited liquidity pool** (5-10% of raised funds)
* **Price discovery**: Let market find fair value before public sale
* **DEGEN MOVE**: Private holders can trade immediately = instant FOMO

### 📢 Phase 2: Public Presale (FOMO Mode)

**Timeline**: 2 weeks after token launch
* **Goal**: $300K-500K (adjust based on private sale momentum)
* **Price**: Market price + 20-30% discount
* **Tokens**: 75M-125M (7.5-12.5%) - **FLEXIBLE SUPPLY**
* **Vesting**: 25% TGE, 3-month linear unlock
* **DEGEN FEATURES**:
  * ⚡ **Flash sales**: Random 1-hour windows with extra discounts
  * 🎲 **Prediction contests**: Guess BTC price, win bonus DBT
  * 🏆 **Community challenges**: Twitter raids, meme contests
  * 🔥 **Burn mechanism**: 10% of public sale tokens burned if sold out

### 🌊 Phase 3: DEX Launch & Liquidity

**Timeline**: 1 week after public sale
* **PancakeSwap listing** at fair market value
* **Liquidity**: 60% of raised funds + 20% token allocation
* **LP lock**: 12 months minimum
* **DEGEN CATALYST**: Staking pools launch same day

---

## 🎯 5. REVISED LAUNCH PHASES TIMELINE

| Week | Phase | Action | Target |
|------|--------|---------|---------|
| **1-2** | Pre-Launch | Twitter growth, whitelist building | 5K followers, 2K whitelist |
| **3-6** | Private Sale | $200K raise, community building | 100M DBT sold |
| **7** | Token Launch | Deploy, distribute 15% TGE | Price discovery |
| **8-9** | Public Sale | $300-500K raise, FOMO mode | 75-125M DBT sold |
| **10** | DEX Launch | PancakeSwap, staking pools | Full liquidity |
| **11+** | DAO Activation | Governance voting, platform launch | Decentralization |

---

## 🧠 6. DEGEN PRICING STRATEGY

### 💡 Dynamic Pricing Model
* **Private**: $0.002 (fixed)
* **Launch**: Market discovers price (likely $0.003-0.005)
* **Public**: Launch price + 20% discount
* **DEX**: Fair market value (no discount)

### 🎲 Risk/Reward Balance
* **Private holders**: Highest risk, highest reward (potential 10x)
* **Public holders**: Medium risk, good reward (potential 3-5x)
* **DEX buyers**: Lowest risk, fair entry point

---

## 🚀 8. THE DEGEN EXECUTION PLAYBOOK

### Week 1-2: Building The Hype
- Twitter threads about prediction markets
- Influencer partnerships and shoutouts
- Alpha group infiltration
- Meme contests and viral content

### Week 3-6: Private Sale Domination
- Daily updates on funding progress
- Whale celebration posts
- Referral leaderboards
- Exclusive holder perks announcements

### Week 7: Token Launch Moment
- Live countdown and launch party
- Real-time distribution tracking
- Price discovery celebration
- Early trading volume contests

### Week 8-9: Public Sale FOMO
- "Last chance" messaging
- Flash sale events
- Community challenges
- Whale vs retail competition

### Week 10+: Moon Mission
- DEX listing celebration
- Staking pool launches
- DAO governance activation
- Platform beta access

---

## 🌐 9. DBT Utility in the Platform

| Utility                        | Description                                                      | Examples | Value |
| ------------------------------ | ---------------------------------------------------------------- | -------- | ----- |
| **Betting Currency**           | Users stake DBT on prediction markets                            | BTC price bets, sports outcomes | 100% platform volume |
| **Governance Voting (DAO)**    | Vote on new markets, resolution rules, fees, and treasury usage  | Market categories, fee structures | 1 DBT = 1 Vote |
| **Staking for VIP Access**     | Higher betting limits, early access, lower fees                  | $10K limits vs $1K, 24h early access | 50% APY rewards |
| **Platform Fee Discounts**     | Reduced platform/taker fees when using DBT                       | 2.5% → 1.5% fees, 0.5% → 0.25% | Up to 50% savings |
| **Referral & Airdrop Rewards** | Earn DBT through referral campaigns                              | 10% of friend's trades, airdrops | Unlimited earning |
| **Insurance Vault Access**     | Stake DBT to cover market reversion risks or slashing mechanisms | Market insurance, dispute resolution | Risk-adjusted returns |
| **Revenue Share (optional)**   | DAO can vote to distribute part of platform fees to DBT stakers  | Quarterly fee distribution | 2-5% quarterly yield |

---

## 🗳️ 10. The DAO — Community Power

You'll implement a **DegenBet DAO**, governed by **DBT holders**, to ensure decentralization and alignment with the betting community.

### DAO Responsibilities:

* Approve new prediction categories (e.g., Politics, Crypto, Sports)
* Vote on dispute resolutions
* Manage the **DAO Treasury** (5% DBT reserve)
* Control platform fees / reward ratios
* Elect council members / multisig signers (optional)

DAO tools: Snapshot, Tally, or a custom voting dashboard via your dApp frontend.

---

## 🛠️ 11. Launch Phases Timeline

| Phase                | Milestone                                    |
| -------------------- | -------------------------------------------- |
| ✅ **Phase 0**        | Smart contract complete                      |
| 🔄 **Phase 1 (Now)** | Website frontend completion + Twitter growth |
| 🚀 **Phase 2**       | Launch Private Presale                       |
| 🔓 **Phase 3**       | Public Presale (if needed)                   |
| 🌊 **Phase 4**       | DEX Launch (PancakeSwap) + Token unlock      |
| 🌐 **Phase 5**       | Incentives live: Airdrops, staking, DAO      |
| 🧠 **Phase 6**       | DAO control shift, full decentralization     |


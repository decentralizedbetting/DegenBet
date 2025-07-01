"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/_shared/components/ui/Button';
import { 
  RocketLaunchIcon, 
  TrophyIcon,
  ArrowRightIcon,
  PlayIcon,
  BoltIcon,
  FireIcon
} from '@heroicons/react/24/outline';

interface TerminalLine {
  id: string;
  type: 'profit' | 'loss' | 'system' | 'trade';
  content: string;
  amount?: number;
  timestamp: string;
}

interface LiveStats {
  totalVolume: number;
  activeDegens: number;
  biggestWin: number;
  presaleRaised: number;
}

const degenCommands = [
  "npm install --save diamond-hands",
  "git commit -m 'TO THE MOON 🚀'", 
  "docker run --moon-mission degenbet",
  "yarn add @degen/protocol@latest",
  "chmod +x ./moon_mission.sh",
  "sudo apt install big-degen-energy"
];

const cryptoSymbols = ["₿", "Ξ", "◉", "⬢", "◈", "⟡", "▲", "●"];

const statusMessages = [
  "SMART_CONTRACTS: AUDITED ✓",
  "PROTOCOL: DECENTRALIZED ✓", 
  "COMMUNITY: 1337_DEGENS ✓",
  "PRESALE: MOON_MISSION_ACTIVE ✓"
];

export const DegenHero2025: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalVolume: 4200000,
    activeDegens: 1337,
    biggestWin: 69420,
    presaleRaised: 2400000
  });
  const [currentStatus, setCurrentStatus] = useState(0);

  // Track client-side rendering to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (!isClient) return;
    
    const command = degenCommands[currentCommand];
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < command.length) {
        setTypingText(command.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setTimeout(() => {
          setCurrentCommand((prev) => (prev + 1) % degenCommands.length);
          setTypingText('');
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentCommand, isClient]);

  // Status rotation
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statusMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isClient]);

  // Live terminal feed with deterministic seeding to avoid hydration errors
  useEffect(() => {
    if (!isClient) return;
    
    const users = ['anon_chad', 'diamond_hands', 'moon_boy', 'degen_king', 'ape_strong'];
    const events = [
      'REKT THE HOUSE on BTC prediction',
      'got liquidated betting against ETH', 
      'diamond handed through -80% dip',
      'YOLO\'d entire bag on NBA finals',
      'moon mission successful 🚀',
      'just bought the dip AGAIN'
    ];
    
    let lineCounter = 0; // Use counter instead of Math.random for deterministic behavior
    
    const generateLine = (): TerminalLine => {
      // Use counter-based deterministic "randomness"
      const isProfit = (lineCounter % 5) !== 0; // 80% profit rate
      const amount = isProfit 
        ? 1000 + (lineCounter % 50000)
        : 500 + (lineCounter % 20000);
      
      const user = users[lineCounter % users.length];
      const event = events[lineCounter % events.length];
      
      lineCounter++;
      
      return {
        id: `line-${lineCounter}`,
        type: isProfit ? 'profit' : 'loss',
        content: `${user}: ${event}`,
        amount,
        timestamp: new Date().toLocaleTimeString()
      };
    };

    const interval = setInterval(() => {
      const newLine = generateLine();
      setTerminalLines(prev => [...prev.slice(-6), newLine]);
      
      // Update live stats with deterministic increments
      setLiveStats(prev => ({
        totalVolume: prev.totalVolume + (1000 + (lineCounter % 10000)),
        activeDegens: Math.max(1000, prev.activeDegens + ((lineCounter % 5) - 2)),
        biggestWin: Math.max(prev.biggestWin, newLine.amount || 0),
        presaleRaised: prev.presaleRaised + (100 + (lineCounter % 500))
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [isClient]);

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden bg-transparent">
      {/* Matrix Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating crypto symbols with deterministic positioning */}
        {isClient && cryptoSymbols.map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/20 text-2xl font-bold"
            style={{
              left: `${(i * 12.5) % 100}%`, // Deterministic left position
              top: `${(i * 15) % 100}%`,    // Deterministic top position
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + (i % 4), // Deterministic duration based on index
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {symbol}
          </motion.div>
        ))}

        {/* Matrix rain effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Side - Terminal & Content */}
          <div className="space-y-6">
            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-card border border-green-500/30 bg-black/80"
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <span className="text-green-400 font-mono text-xs">system_status.exe</span>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-mono text-sm">
                    {statusMessages[currentStatus]}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Image
                    src="/logo-degenbet.svg"
                    alt="DegenBet"
                    width={32}
                    height={32}
                    className="filter brightness-0 invert"
                  />
                </div>
                <div className="text-green-400 font-mono text-xl font-bold tracking-wider">
                  DEGENBET.XYZ
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                <span className="text-white">DEGEN</span>
                <br />
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  BETTING
                </span>
                <br />
                <span className="text-purple-400">PROTOCOL</span>
              </h1>

              <div className="text-lg lg:text-xl text-gray-300 leading-relaxed font-mono">
                <span className="text-green-400">&gt;</span> The first{' '}
                <span className="text-yellow-400 font-bold">decentralized prediction market</span>{' '}
                built for degens
                <br />
                <span className="text-green-400">&gt;</span> Diamond hands technology meets{' '}
                <span className="text-purple-400 font-bold">transparent betting</span>
                <br />
                <span className="text-green-400">&gt;</span> No house edge. No KYC. No BS.
              </div>
            </motion.div>

            {/* Terminal Command Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="terminal-card border border-purple-500/30 bg-black/60"
            >
              <div className="p-4">
                <div className="flex items-center space-x-2 font-mono text-sm">
                  <span className="text-purple-400">degenbet@mainnet:</span>
                  <span className="text-white">~$</span>
                  <span className="text-green-400">{typingText}</span>
                  <span className="text-green-400 animate-ping">_</span>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/presale">
                <Button 
                  size="lg" 
                  className="group btn-degen text-black font-mono font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  <RocketLaunchIcon className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  <span>JOIN_PRESALE.EXE</span>
                  <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/markets">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="group btn-degen-secondary font-mono font-bold text-lg px-8 py-4 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  <PlayIcon className="w-5 h-5 mr-3" />
                  <span>PREVIEW_DEMO.SH</span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Live Terminal Feed */}
          <div className="space-y-6">
            {/* Live Stats Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="terminal-card border border-green-500/30 bg-black/80"
            >
              <div className="flex items-center justify-between p-3 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-400 font-mono text-xs">live_stats.json</span>
              </div>
              
              <div className="p-4 space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">presale_raised:</span>
                  <span className="text-green-400 font-bold">
                    ${(liveStats.presaleRaised / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">volume_24h:</span>
                  <span className="text-purple-400 font-bold">
                    ${(liveStats.totalVolume / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">active_degens:</span>
                  <span className="text-yellow-400 font-bold">{liveStats.activeDegens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">biggest_win:</span>
                  <span className="text-orange-400 font-bold">
                    ${liveStats.biggestWin.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="terminal-card border border-cyan-500/30 bg-black/80"
            >
              <div className="flex items-center justify-between p-3 border-b border-cyan-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-cyan-400 font-mono text-xs">tail -f /var/log/degens.log</span>
              </div>
              
              <div className="p-4 h-64 overflow-hidden">
                <AnimatePresence>
                  {terminalLines.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="font-mono text-xs mb-2 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">{line.timestamp}</span>
                        <span className={line.type === 'profit' ? 'text-green-400' : 'text-red-400'}>
                          {line.content}
                        </span>
                      </div>
                      {line.amount && (
                        <span className={`font-bold ${line.type === 'profit' ? 'text-green-400' : 'text-red-400'}`}>
                          {line.type === 'profit' ? '+' : '-'}${line.amount.toLocaleString()}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center space-x-6 flex-wrap gap-2 opacity-70"
            >
              <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>AUDITED</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>DECENTRALIZED</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>COMMUNITY_OWNED</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 

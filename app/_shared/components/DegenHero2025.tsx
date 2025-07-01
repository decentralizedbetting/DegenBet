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
  TerminalIcon
} from '@heroicons/react/24/outline';

interface TerminalLine {
  id: string;
  type: 'profit' | 'loss' | 'bet';
  content: string;
  amount?: number;
  timestamp: string;
}

interface LiveStats {
  totalVolume: number;
  activeUsers: number;
  successRate: number;
  biggestWin: number;
}

const degenPhrases = [
  "TO THE MOON 🚀",
  "DIAMOND HANDS 💎", 
  "BIG DEGEN ENERGY ⚡",
  "WEN LAMBO? 🏎️",
  "HODL THE LINE 📈"
];

const cryptoSymbols = ["₿", "Ξ", "◉", "⬢", "◈", "⟡"];

export const DegenHero2025: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalVolume: 2847293,
    activeUsers: 1337,
    successRate: 69.42,
    biggestWin: 42069
  });
  const [cursorVisible, setCursorVisible] = useState(true);

  // Dynamic typing effect
  useEffect(() => {
    const phrase = degenPhrases[currentPhrase];
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < phrase.length) {
        setTypedText(phrase.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % degenPhrases.length);
          setTypedText('');
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentPhrase]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Terminal data stream
  useEffect(() => {
    const users = ['anon_trader', 'degen_king', 'moon_boy', 'whale_hunter'];
    const markets = ['BTC/USD', 'ETH Merge', 'NBA Finals', 'Election 2024'];
    
    const generateLine = (): TerminalLine => {
      const isProfit = Math.random() > 0.3;
      const amount = isProfit 
        ? Math.floor(Math.random() * 5000) + 100
        : Math.floor(Math.random() * 2000) + 50;
      
      const user = users[Math.floor(Math.random() * users.length)];
      const market = markets[Math.floor(Math.random() * markets.length)];
      
      return {
        id: Math.random().toString(36),
        type: isProfit ? 'profit' : 'loss',
        content: `${user} ${isProfit ? 'REKT the house' : 'got liquidated'} on ${market}`,
        amount,
        timestamp: new Date().toLocaleTimeString()
      };
    };

    const interval = setInterval(() => {
      const newLine = generateLine();
      setTerminalLines(prev => [...prev.slice(-7), newLine]);
      
      setLiveStats(prev => ({
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        successRate: 65 + Math.random() * 10,
        biggestWin: Math.max(prev.biggestWin, newLine.amount || 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Additional Floating Crypto Symbols for Hero */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {cryptoSymbols.map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/30 text-4xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
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
            </motion.div>

            {/* Dynamic Headline */}
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-7xl font-black leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white">DEGEN</span>
                <br />
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  BETTING
                </span>
                <br />
                <span className="text-purple-400">PROTOCOL</span>
              </motion.h1>

              {/* Typing Animation */}
              <motion.div
                className="text-xl lg:text-2xl font-mono text-green-400 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {typedText}
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  _
                </span>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-300 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Decentralized. Unstoppable. <span className="text-green-400 font-semibold">100% On-Chain.</span>
              <br />
              Where degens come to print money or get absolutely rekt.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/markets">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-bold px-8 py-4 text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">START DEGEN MODE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>
              
              <Button
                size="lg"
                variant="secondary"
                className="border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono px-8 py-4 text-lg"
              >
                CONNECT WALLET
              </Button>
            </motion.div>

            {/* Live Stats Bar */}
            <motion.div
              className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-green-400 font-mono text-lg font-bold">
                    ${liveStats.totalVolume.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-xs">TOTAL VOLUME</div>
                </div>
                <div>
                  <div className="text-purple-400 font-mono text-lg font-bold">
                    {liveStats.activeUsers}
                  </div>
                  <div className="text-gray-500 text-xs">DEGENS ONLINE</div>
                </div>
                <div>
                  <div className="text-yellow-400 font-mono text-lg font-bold">
                    {liveStats.successRate.toFixed(1)}%
                  </div>
                  <div className="text-gray-500 text-xs">WIN RATE</div>
                </div>
                <div>
                  <div className="text-red-400 font-mono text-lg font-bold">
                    ${liveStats.biggestWin.toLocaleString()}
                  </div>
                  <div className="text-gray-500 text-xs">BIGGEST WIN</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Terminal */}
          <motion.div
            className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 font-mono text-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-green-500/30">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-green-400 text-xs">LIVE_FEED.exe</div>
            </div>

            {/* Terminal Content */}
            <div className="space-y-2 h-64 overflow-hidden">
              <div className="text-green-400 text-xs mb-2">
                {'>'} DegenBet Protocol v2.0 initialized...
              </div>
              <div className="text-green-400 text-xs mb-4">
                {'>'} Real-time betting data stream active
              </div>
              
              <AnimatePresence mode="popLayout">
                {terminalLines.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className={`
                      ${line.type === 'profit' ? 'text-green-400' : 'text-red-400'}
                    `}>
                      [{line.timestamp}] {line.content}
                    </span>
                    {line.amount && (
                      <span className={`font-bold ${
                        line.type === 'profit' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {line.type === 'profit' ? '+' : '-'}${line.amount}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Terminal Input */}
            <div className="mt-4 pt-2 border-t border-green-500/30">
              <div className="text-green-400 text-xs flex items-center">
                <span className="mr-2">degen@protocol:~$</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}; 

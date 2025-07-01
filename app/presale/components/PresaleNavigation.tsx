'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function PresaleNavigation() {
  const pathname = usePathname();

  const navItems = [
    { 
      href: '/presale', 
      label: 'PRESALE', 
      icon: '💰',
      description: 'Buy DBT tokens'
    },
    { 
      href: '/presale/dashboard', 
      label: 'DASHBOARD', 
      icon: '📊',
      description: 'Manage your tokens'
    },
    { 
      href: '/presale/whitelist', 
      label: 'WHITELIST', 
      icon: '⭐',
      description: 'Join early access'
    },
    { 
      href: '/markets', 
      label: 'MARKETS', 
      icon: '🎯',
      description: 'Prediction markets'
    }
  ];

  return (
    <motion.div 
      className="terminal-card mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between p-3 border-b border-green-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <div className="terminal-text text-xs">navigation.sh</div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 flex items-center space-x-2 group ${
                    isActive
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : 'bg-gray-500/10 border border-gray-500/30 text-gray-400 hover:border-green-500/30 hover:text-green-300 hover:bg-green-500/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="font-bold">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center space-x-2 text-purple-400 text-sm font-mono">
            <span>🔥</span>
            <span>DBT Private Sale: $200K Goal | $0.002 per token | BNB Smart Chain</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
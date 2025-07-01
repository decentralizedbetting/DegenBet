"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-black border-t border-green-500/30">
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Terminal Header */}
        <div className="terminal-card mb-8">
          <div className="flex items-center justify-between p-3 border-b border-green-500/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="terminal-text text-xs">footer_info.exe</div>
          </div>
          
        {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Image
                src="/logo-degenbet.svg"
                alt="DegenBet"
                    width={24}
                    height={24}
                    className="filter brightness-0 invert"
              />
                </div>
                <span className="text-xl font-bold terminal-text glow-text">
                DegenBet
              </span>
            </div>
              <p className="text-green-300 text-sm mb-4 leading-relaxed font-mono">
                {'>'} Decentralized degen betting protocol
                <br />
                {'>'} Where legends are made or rekt
            </p>
              <div className="text-xs text-gray-500 font-mono">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">SYSTEM_ONLINE</span>
                </div>
                <div className="text-gray-400">
                  {'>'} SSL_SECURED: TRUE
                  <br />
                  {'>'} AUDIT_STATUS: PASSED
                </div>
            </div>
          </div>

            {/* System Commands */}
          <div>
              <h3 className="text-green-400 font-mono font-bold mb-4 glow-text">SYSTEM_COMMANDS</h3>
            <div className="space-y-2">
                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm block font-mono">
                  {'>'} ./about_us.sh
              </Link>
                <Link href="/careers" className="text-gray-400 hover:text-green-400 transition-colors text-sm block font-mono">
                  {'>'} ./join_team.exe
              </Link>
                <Link href="/press" className="text-gray-400 hover:text-green-400 transition-colors text-sm block font-mono">
                  {'>'} ./press_kit.zip
              </Link>
                <Link href="/governance" className="text-gray-400 hover:text-green-400 transition-colors text-sm block font-mono">
                  {'>'} ./governance.dao
              </Link>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
              <h3 className="text-purple-400 font-mono font-bold mb-4">SUPPORT_MODULES</h3>
            <div className="space-y-2">
                <Link href="/help" className="text-gray-400 hover:text-purple-400 transition-colors text-sm block font-mono">
                  {'>'} help --center
              </Link>
                <Link href="/learn" className="text-gray-400 hover:text-purple-400 transition-colors text-sm block font-mono">
                  {'>'} man degenbet
              </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm block font-mono">
                  {'>'} cat privacy.txt
              </Link>
                <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm block font-mono">
                  {'>'} cat terms.md
              </Link>
              <a 
                href="https://www.gamblersanonymous.org" 
                target="_blank" 
                rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm block font-mono font-bold"
              >
                  {'>'} ./responsible_gaming.exe ⚠️
              </a>
            </div>
          </div>

            {/* Terminal Newsletter */}
          <div>
              <h3 className="text-cyan-400 font-mono font-bold mb-4">CONNECT_STREAM</h3>
              <p className="text-gray-400 text-sm mb-4 font-mono">
                {'>'} Subscribe to real-time updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-2 text-green-400 font-mono text-sm">$</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter_email@protocol.xyz"
                    className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 pl-8 text-green-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
                required
              />
                </div>
              <button
                type="submit"
                  className="w-full btn-degen px-4 py-2 rounded font-mono text-sm relative overflow-hidden group"
              >
                  <span className="relative z-10">SUBSCRIBE.EXE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </form>
            </div>
          </div>
        </div>

        
        {/* Terminal Status Bar */}
        <div className="border-t border-green-500/20 pt-4 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright Terminal Style */}
            <div className="text-green-400 text-sm text-center md:text-left font-mono">
              <span className="text-gray-500">{'>'} </span>
              © 2025 DegenBet_Protocol.inc • ALL_RIGHTS_RESERVED
              <br className="md:hidden" />
              <span className="text-xs text-purple-400 ml-1">
                contact@degenbet.xyz
              </span>
            </div>
            
            {/* Social Terminal Connections */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-xs hidden md:block font-mono">SOCIAL_STREAMS:</span>
              <a
                href="https://twitter.com/degenbet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors p-2 hover:bg-green-500/10 rounded border border-gray-700 hover:border-green-500/30"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/degenbet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors p-2 hover:bg-purple-500/10 rounded border border-gray-700 hover:border-purple-500/30"
                aria-label="Discord"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </a>
              <a
                href="https://t.me/degenbet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2 hover:bg-cyan-500/10 rounded border border-gray-700 hover:border-cyan-500/30"
                aria-label="Telegram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="https://github.com/degenbet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2 hover:bg-yellow-500/10 rounded border border-gray-700 hover:border-yellow-500/30"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Terminal Footer */}
          <div className="mt-4 pt-3 border-t border-green-500/10 text-center">
            <p className="text-xs font-mono text-gray-500">
              <span className="text-green-400">$</span> tail -f /var/log/degenbet.log
              <span className="animate-terminal-blink text-green-400 ml-2">_</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 

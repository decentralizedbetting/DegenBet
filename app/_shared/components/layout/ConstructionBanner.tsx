"use client";

import React from 'react';
import Link from 'next/link';

export default function ConstructionBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 border-y border-orange-500/50 py-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <span className="text-2xl animate-bounce">🚧</span>
          <h2 className="text-xl font-black font-mono text-orange-400 uppercase tracking-wider">
            PROTOCOL_UNDER_CONSTRUCTION.EXE
          </h2>
          <span className="text-2xl animate-bounce">🚧</span>
        </div>
        <p className="text-orange-300 font-mono text-sm mb-3">
          {'>'} Website is live for preview but markets are not operational yet
          <br />
          {'>'} Currently running PRIVATE SALE for early degens 💎
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/presale" className="btn-degen font-mono text-black font-bold px-6 py-2 animate-pulse">
            🔥 JOIN_PRIVATE_SALE.EXE 🔥
          </Link>
          <Link href="/presale/whitelist" className="btn-degen-secondary font-mono text-sm px-4 py-2">
            GET_WHITELISTED.SH
          </Link>
        </div>
      </div>
    </div>
  );
} 
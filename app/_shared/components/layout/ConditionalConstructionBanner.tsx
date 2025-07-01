"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import ConstructionBanner from './ConstructionBanner';

export function ConditionalConstructionBanner() {
  const pathname = usePathname();
  
  // Hide banner on presale pages
  const shouldHideBanner = pathname.startsWith('/presale');
  
  if (shouldHideBanner) {
    return null;
  }
  
  return <ConstructionBanner />;
} 
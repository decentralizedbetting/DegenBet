import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/_shared/components/ui/Navigation';
import { ThemeProvider } from '@/_shared/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DegenBet | Decentralized Betting Platform',
  description: 'The ultimate degen betting platform for micro-events: sports, politics, crypto prices. Join the revolution with DBT token.',
  keywords: 'DegenBet, degen betting, decentralized betting, crypto betting, sports betting, politics betting, DBT token, BNB Chain',
  authors: [{ name: 'DegenBet' }],
  creator: 'DegenBet',
  publisher: 'DegenBet',
  metadataBase: new URL('https://degenbet.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DegenBet | Decentralized Betting Platform',
    description: 'The ultimate degen betting platform for micro-events: sports, politics, crypto prices. Join the revolution with DBT token.',
    url: 'https://degenbet.xyz',
    siteName: 'DegenBet',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DegenBet - Decentralized Betting Platform',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DegenBet | Decentralized Betting Platform',
    description: 'The ultimate degen betting platform for micro-events: sports, politics, crypto prices. Join the revolution with DBT token.',
    images: ['/twitter-image.jpg'],
    creator: '@DegenBet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    other: {
      me: ['contact@degenbet.xyz'],
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3DAD9C',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#22c55e', // Terminal green for degen aesthetic
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Subtle mouse tracking for hover effects
              document.addEventListener('DOMContentLoaded', function() {
                document.addEventListener('mousemove', function(e) {
                  // Update CSS custom properties for subtle mouse glow effects
                  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
                  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
                });
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased relative`}>
        {/* SIMPLIFIED Terminal Background - No Conflicts */}
        <div className="fixed inset-0 -z-10">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-gray-950/20" />
          
          {/* Terminal grid pattern */}
          <div 
            className="absolute inset-0 opacity-20 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.6) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>
        
        <ThemeProvider>
          <Navigation />
          <main className="bg-transparent text-white relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 

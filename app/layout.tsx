import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from './components/ui/Navigation';
import { ThemeProvider } from './ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DINO | Decentralized Prediction Market Platform',
  description: 'Trade and create prediction markets for crypto, DeFi, NFTs, and more on DINO - the most advanced decentralized prediction market platform.',
  keywords: 'prediction market, crypto prediction, blockchain, DINO token, decentralized finance, trading, crypto forecast',
  authors: [{ name: 'DINO Protocol' }],
  creator: 'DINO Protocol',
  publisher: 'DINO Protocol',
  metadataBase: new URL('https://dinopredict.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DINO | Decentralized Prediction Market Platform',
    description: 'Trade and create prediction markets for crypto, DeFi, NFTs, and more on DINO - the most advanced decentralized prediction market platform.',
    url: 'https://dinopredict.io',
    siteName: 'DINO Prediction Markets',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DINO Prediction Markets Platform',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DINO | Decentralized Prediction Market Platform',
    description: 'Trade and create prediction markets for crypto, DeFi, NFTs, and more on DINO.',
    images: ['/twitter-image.jpg'],
    creator: '@DINOProtocol',
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
      me: ['dino@example.com'],
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
  themeColor: '#3DAD9C',
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#3DAD9C', // Teal color from the logo
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white antialiased`}>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Clean URL rewrites for main features
      {
        source: '/markets/:path*',
        destination: '/features/markets/:path*',
      },
      {
        source: '/create',
        destination: '/features/create',
      },
      {
        source: '/leaderboard',
        destination: '/features/leaderboard',
      },
      {
        source: '/governance',
        destination: '/features/governance',
      },
      {
        source: '/token',
        destination: '/features/token',
      },
      // Preview routes (if you want clean URLs for these too)
      {
        source: '/preview/:path*',
        destination: '/features/preview/:path*',
      },
      // Presale routes
      {
        source: '/presale/:path*',
        destination: '/features/presale/:path*',
      },
    ]
  },
}

module.exports = nextConfig 
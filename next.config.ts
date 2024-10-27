import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous', // or 'use-credentials' if needed
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    API_PORT: process.env.API_PORT || '3001',
  },
  async rewrites() {
    return [
      {
        source: '/api/docs',
        destination: '/api/docs',
      },
    ];
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

export default nextConfig;

import type { NextConfig } from 'next';
import dotenv from 'dotenv';

// Load the correct .env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*', // Apply CORS to all routes under /api
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
  crossOrigin: 'anonymous',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_PORT: process.env.API_PORT,
    BASE_URL: process.env.BASE_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    GENERATE_INITIAL_DATA: process.env.GENERATE_INITIAL_DATA,
    CUSTOM_LOCAL_SETTING: process.env.CUSTOM_LOCAL_SETTING,
  },

  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

export default nextConfig;

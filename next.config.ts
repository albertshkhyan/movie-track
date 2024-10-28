import type { NextConfig } from 'next';
import dotenv from 'dotenv';

// Load the correct .env file based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

const nextConfig: NextConfig = {
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
  async rewrites() {
    return [
      {
        source: '/api/docs',
        destination: `${process.env.BASE_URL}/api/docs`,
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

// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {}, // ini “silence” error Turbopack
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
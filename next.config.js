/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@uniswap/widgets'],
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.resolve.fallback = { fs: false };
    return config;
  }
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['curetcore.com'],
  },
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
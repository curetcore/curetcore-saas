/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['curetcore.com'],
  },
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
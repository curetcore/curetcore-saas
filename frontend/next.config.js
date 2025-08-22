/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['curetcore.com'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
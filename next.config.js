/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.maverickdigitals.co.in'],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.maverickdigitals.co.in'],
    unoptimized: true,
  },
  transpilePackages: ['three'],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["1.pcx.hu"],
  },
};

module.exports = nextConfig;

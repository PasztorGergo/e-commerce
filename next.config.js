/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["1.pcx.hu"],
  },
  env: {
    GQL_URL:
      "https://realm.mongodb.com/api/client/v2.0/app/ecommerce-store-oaubh/graphql",
    APP_ID: "ecommerce-store-oaubh",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    GOOGLE_UID: process.env.GOOGLE_UID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    BASE_API_URL: process.env.BASE_API_URL || "https://fallback-url.com/api",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiBaseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  },
};

module.exports = nextConfig;

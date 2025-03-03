/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "your_secret_key",
  },
  publicRuntimeConfig: {
    apiBaseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  },
};

export default nextConfig;

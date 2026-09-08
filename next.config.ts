import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  // Permite preview cross-origin em dev
  allowedDevOrigins: ["*.space-z.ai", "*.github.io"],
};

export default nextConfig;

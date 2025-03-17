import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ["a.espncdn.com"], // Add ESPN CDN to allowed domains
  },
};

export default nextConfig;

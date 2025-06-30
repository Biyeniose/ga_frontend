import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: false,
  images: {
    domains: [
      "a.espncdn.com",
      "tmssl.akamaized.net",
      "encrypted-tbn0.gstatic.com",
      "i.pinimg.com",
      "img.a.transfermarkt.technology",
    ], // Add ESPN CDN to allowed domains
  },
};

export default nextConfig;

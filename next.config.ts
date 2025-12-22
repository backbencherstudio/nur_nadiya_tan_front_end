import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "backend.transfermaidsingapore.com",
      },
      {
        protocol: "https",
        hostname: "peterson-timing-focused-articles.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;

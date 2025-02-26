import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

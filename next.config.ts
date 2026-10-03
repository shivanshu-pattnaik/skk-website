import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Scope Turbopack to this project so it does not walk up into the home
  // directory (a stray package-lock.json there defeats root detection).
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Static imports carry no query strings, so no localPatterns are needed.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { unoptimized: true },
  // A fixed build ID keeps the inline RSC bootstrap script byte-identical
  // between builds, so its CSP hash (scripts/csp-hashes.mjs) can be committed.
  generateBuildId: async () => "case-rk-2027",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

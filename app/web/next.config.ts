import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@clipboard-online/ui"],
  turbopack: {
    root: path.resolve(import.meta.dirname, "../.."),
  },
  reactCompiler: true,
};

export default nextConfig;

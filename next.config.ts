import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['onnxruntime-node', '@xenova/transformers'],
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },
  // Skip type-checking and linting during production build
  // (handled separately in CI; prevents build failures from minor type issues)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

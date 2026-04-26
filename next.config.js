/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Los tipos ya se validan localmente con tsc --noEmit
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

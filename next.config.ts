import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.fclj2-1.fna.fbcdn.net',
        // Optionally, you can specify port and pathname too:
        // port: '',
        // pathname: '/v/t51.2885-19/**',
      },
      // Add other domains if needed
    ],
    // Optional: You can also set default image quality
    // quality: 80,
    // Optional: Set device sizes for responsive images
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;

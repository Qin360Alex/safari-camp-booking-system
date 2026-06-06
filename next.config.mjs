/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve AVIF/WebP at the right pixel width for each slot (retina-sharp, fast load)
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512, 640, 768, 1024, 1280, 1536],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Admin routes are now handled by Next.js App Router
  // No rewrites needed
}

export default nextConfig

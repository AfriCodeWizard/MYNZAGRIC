/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        // Internal rewrite: /admin/ → /admin/index.html
        // URL stays as /admin/ (no redirect), but serves index.html
        // This is required for Decap CMS OAuth to work
        source: '/admin',
        destination: '/admin/index.html',
      },
      {
        // Also handle /admin/ with trailing slash
        source: '/admin/',
        destination: '/admin/index.html',
      },
    ]
  },
}

export default nextConfig

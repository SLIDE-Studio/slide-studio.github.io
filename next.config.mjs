/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/slidestudio.github.io',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

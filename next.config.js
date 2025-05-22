/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/nextjs-todo-app',
  assetPrefix: '/nextjs-todo-app/',
}

module.exports = nextConfig 
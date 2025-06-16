/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi sebagai Static Site
  output: 'export',
  // Nonaktifkan image optimization
  images: {
    unoptimized: true,
  },
  // Abaikan semua error saat build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Matikan semua proses SSR/SSG
  experimental: {
    optimizePackageImports: [],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    
    return config;
  },
};

export default nextConfig;
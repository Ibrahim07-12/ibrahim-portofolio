/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // ✅ Dihapus untuk mengaktifkan mode server

  // Konfigurasi untuk mengizinkan gambar dari host eksternal
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Membantu dengan error TypeScript selama build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Mengabaikan error ESLint selama build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  experimental: {
    optimizePackageImports: [],
  },

  // Handler untuk file media
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

module.exports = nextConfig;
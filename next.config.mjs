/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.microlink.io" // Microlink Image Preview
    ],
  },
  // Tambahkan opsi ini jika masih ada masalah dengan prerendering
  experimental: {
    // Matikan optimisasi yang mungkin bermasalah dengan komponen client-side
    optimizeCss: false,
    optimizePackageImports: false,
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
    
    // Tambahkan konfigurasi untuk menandai window sebagai eksternal
    config.externals.push({
      window: 'window',
    });
    
    return config;
  },
};

export default nextConfig;
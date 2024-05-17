/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push(
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      );
    }
    return config;
  },
  images: {
    // domains: ['cdn.shopify.com', 'letsmetrix.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'letsmetrix.com',
        port: '',
        pathname: '/admin-blog/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/app-store/listing_images/**',
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config) => {
    // maplibre-gl v4 has "type":"module" in package.json but ships a UMD bundle.
    // Webpack 5 would try to parse it as ESM and fail. Force CJS/auto detection.
    config.module.rules.push({
      test: /node_modules[\\/]maplibre-gl[\\/]dist[\\/]maplibre-gl\.js$/,
      type: 'javascript/auto',
    });
    return config;
  },
};

export default nextConfig;

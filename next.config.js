/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    'expo-modules-core',
    'expo-linear-gradient',
    '@expo/vector-icons',
    'react-native-svg',
  ],
  webpack: (config) => {
    // Handle font files required by @expo/vector-icons on Next.js web
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Ensure React Native imports resolve to web-compatible modules
    config.resolve = config.resolve || {};
    // Prefer web-specific extensions
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(config.resolve.extensions || []),
      '.mjs',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': require.resolve('react-native-web'),
      'react-native$': require.resolve('react-native-web'),
    };

    return config;
  },
  experimental: {
    // Keep SWC transforms enabled for better RN Web compatibility
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;

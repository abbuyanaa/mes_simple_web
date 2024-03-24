const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

module.exports = withBundleAnalyzer({
  distDir: process.env.NODE_ENV === 'production' ? 'build' : null, // null - .next
  compress: true,
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    if (!prod) config.resolve.alias.inferno = 'inferno/dist/index.dev.esm.js';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? false : 'eval-source-map',
      // devtool: prod ? 'hidden-source-map' : 'inline-source-map',
      // plugins: [
      //   ...config.plugins,
      // ],
    };
  },
  i18n,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
});

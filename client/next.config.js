const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

module.exports = withBundleAnalyzer({
  distDir: process.env.NODE_ENV === 'production' ? 'build' : null, // null - .next
  compress: true,
  i18n,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
});

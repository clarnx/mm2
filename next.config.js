/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  trailingSlash: true,
  swcMinify: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
};

module.exports = nextConfig;

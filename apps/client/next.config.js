//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // output: process.env.NEXT_PUBLIC_BUILD_OUTPUT || undefined,
  env: {
    TZ: 'Asia/Tokyo',
  },
  eslint: {
    dirs: ['src'],
  },

  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,

  images: {
    // To use static export
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: 'http://127.0.0.1:8080/:path*',
      },
    ]
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];


module.exports = composePlugins(...plugins)(withNextIntl(nextConfig));

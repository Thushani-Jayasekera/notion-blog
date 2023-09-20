import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
      },
    ],
  },
/*
  publicRuntimeConfig: {
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_AUTH_TOKEN: process.env.NOTION_AUTH_TOKEN,
    SITE_URL: process.env.SITE_URL,
    API_KEY:process.env.API_KEY,
  },
  */

  // suppress keyv warning
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/\/keyv\//, (data) => {
        delete data.dependencies[0].critical;
        return data;
      })
    );

    return config;
  },
};

export default withPlaiceholder(nextConfig)

const path = require('path');
const withCSS = require("@zeit/next-css");
const withStylus = require('@zeit/next-stylus')
const withTM = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');
const dev = process.env.NODE_ENV !== 'production';
const localIdentName = dev ? '[local]-[hash:base64:5]' : '[hash:base64:5]';
// module.exports = withCSS({});
// module.exports = withStylus({
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: "[local]___[hash:base64:5]",
//   }
// })

const nextConfig = {
  distDir: 'dist',
  webpack: (config, { buildId, deve, isServer, defaultLoaders }) => {
    // config.plugins.push(...plugins);
    // config.resolve.alias['@kkb/daji'] = path.resolve(__dirname, '../daji/src');
    return config;
  }
};

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ['@kkb/daji']
      }
    ],
    [
      withStylus,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName
        }
      }
    ],
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName
        }
      }
    ]
  ],
  nextConfig
);

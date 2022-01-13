const path = require('path');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[contenthash:6].bundle.js',
    chunkFilename: '[name].[contenthash:6].chunk.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
  },
  externals: {
    config: JSON.stringify({
      baseUrl: '/api',
    }),
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin(),
  ],
});

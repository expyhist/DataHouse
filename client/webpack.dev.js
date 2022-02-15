const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    compress: true,
  },
  cache: {
    type: 'memory',
  },
  externals: {
    config: JSON.stringify({
      rejectRegister: false,
    }),
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
});

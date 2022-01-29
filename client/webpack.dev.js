const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
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
  },
  cache: {
    type: 'memory',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  externals: {
    config: JSON.stringify({
      rejectRegister: false,
    }),
  },
});

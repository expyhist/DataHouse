const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  externals: {
    config: JSON.stringify({
      baseUrl: '/api',
    }),
  },
});

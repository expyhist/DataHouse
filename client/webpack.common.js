const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
		minimize: false,
		minimizer: [
			new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
		]
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015',
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: true
            }
          }
        ]
      },
    ]
  },
}
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    chunkFilename : "[name].chunk.js",
    publicPath: "/"
  },
  externals: {
    config: JSON.stringify({
      baseUrl: "http://localhost:3000/api"
    })
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
});
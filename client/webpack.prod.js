const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].bundle.js",
    chunkFilename : "[name].chunk.js",
    publicPath: "/"
  },
  externals: {
    config: JSON.stringify({
      baseUrl: "/api"
    })
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new WebpackManifestPlugin({
      basePath: "./public/manifest.json"
    })
  ],
});
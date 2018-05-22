const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new MinifyPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    }),
    new OptimizeCSSAssetsPlugin({}),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'assets/media/favicon.ico',
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  }
});
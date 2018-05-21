
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env, argv) {
  const config = {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: './assets/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './assets/app.bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: 'index.html',
        favicon: 'assets/media/favicon.ico'
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/app.css'
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, "./dist"),
      compress: true,
      port: 12003,
      stats: 'errors-only',
      open: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.scss$/,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader', 'sass-loader'
          ],
        },
        {
          test: /\.(jpg|png|gif|svg|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './assets/media/',
                publicPath: './assets/media/'
              }
            }
          ]
        }
      ]
    }
  };

  return config;
}

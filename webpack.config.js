const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[hash].js',
    publicPath: '/',
  },
  mode: process.env.ENV === 'production' ? 'production' : 'development',
  devtool: process.env.ENV === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                'react-hot-loader/babel',
                'babel-plugin-styled-components',
              ],
            },
          },
        ],
        exclude: [/node_modules/, path.resolve(__dirname, 'server/')],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'dist/',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/index.html'),
      inject: 'body',
    }),
  ],
};

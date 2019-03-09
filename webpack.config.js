const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(__dirname, 'src/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'src/public'),
    filename: 'bundle.js',
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
        exclude: [/node_modules/, /server/],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

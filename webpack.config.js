const R = require('ramda');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env) => ({
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: R.filter(R.identity, [
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: 'src/index.ejs'
    }),
    new webpack.NamedModulesPlugin()
  ])
});

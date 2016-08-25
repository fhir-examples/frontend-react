var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'bootstrap-loader',
    'font-awesome-sass-loader',
    path.join(__dirname, "src", "../index.js")
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', include: path.join(__dirname, '../')},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[ext]', include: path.join(__dirname, '../')},
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=assets/[name].[ext]', include: path.join(__dirname, '../')},
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'], include: path.join(__dirname, '../')}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      VERSION: JSON.stringify(require('git-repo-version')())
    }),
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
    new WriteFilePlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    outputPath: path.join(__dirname, "dist")
  }
};
const HtmlPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

/**
 * RULES
 */
const babelRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['babel-loader']
};

const cssRule = {
  test: /\.s?css$/,
  use: [
    CssExtractPlugin.loader,
    'css-loader', 
    'sass-loader'
  ]
};

/**
 * PLUGINS
 */
const htmlPlugin = new HtmlPlugin({
  template: './static/template.html'
});

const cssExtractPlugin = new CssExtractPlugin({
  filename: 'styles.css'
});

/**
 * WEBPACK CONFIG
 */
module.exports = {
  entry: './src/index.js',

  devtool: 'source-map',

  module: {
    rules: [babelRule, cssRule]
  },

  plugins: [htmlPlugin, cssExtractPlugin],
  
  devServer: {
    open: true,
    host: '0.0.0.0'
  }
}
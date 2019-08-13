const { resolve } = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

/**
 * RULES
 */
const babelRule = {
  test: /\.(j|t)s$/,
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
  entry: './src/index.ts',

  devtool: 'source-map',

  module: {
    rules: [babelRule, cssRule]
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      utils: resolve(__dirname, 'src/utils')
    }
  },

  plugins: [htmlPlugin, cssExtractPlugin],
  
  devServer: {
    open: true,
    host: '0.0.0.0'
  }
}
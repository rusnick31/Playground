const HtmlPlugin = require('html-webpack-plugin');

const babelRule = {
  test: /\.js/,
  exclude: /node_modules/,
  use: [{
      loader: 'babel-loader'
  }]
};

const htmlPLugin = new HtmlPlugin({ template: './static/template.html' });

module.exports = {
  devtool: 'source-map',

  module: {
    rules: [babelRule]
  },

  plugins: [htmlPLugin],
  
  devServer: {
    open: true
  }
}
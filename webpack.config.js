const HtmlPlugin = require('html-webpack-plugin');

const babelRule = {
  test: /\.js/,
  exclude: /node_modules/,
  use: [{
      loader: 'babel-loader'
  }]
};

const htmlPluginOptions = {
  template: './static/template.html'
};
const htmlPlugin = new HtmlPlugin(htmlPluginOptions);

module.exports = {
  devtool: 'source-map',

  module: {
    rules: [babelRule]
  },

  plugins: [htmlPlugin],
  
  devServer: {
    open: true,
    host: '0.0.0.0'
  }
}
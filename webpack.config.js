const HtmlPlugin = require('html-webpack-plugin');

const htmlPLugin = new HtmlPlugin({ template: './static/template.html' });

module.exports = {
  devtool: 'source-map',
  
  plugins: [htmlPLugin],
  
  devServer: {
    open: true
  }
}
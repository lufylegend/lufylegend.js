const lufylegend = require(__dirname + '/lib/lufylegend-2.0.0');
const webpack = require('webpack');
module.exports = {
  context: __dirname + '/source',
  entry: {
    'application': './application',
  },
  output: {
    path: __dirname + '/build/javascript',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin(lufylegend)
  ]
};
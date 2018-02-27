module.exports = {
  context: __dirname + '/assets',
  entry: {
    'application': './application',
  },
  output: {
    path: __dirname + '/build/javascript',
    filename: '[name].js'
  }
};
module.exports = {
  context: __dirname + '/assets',
  entry: {
    'application': './application',
  },
  output: {
    path: __dirname + '/build/javascript',
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader", 
        options:{
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
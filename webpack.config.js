const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "production",
  externals: [nodeExternals()],
  entry: {
    app: "./src/index.js"
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
    publicPath: '/', //relative path to output path where  devserver will look for compiled files
  },
  output: {
    filename: '[name].js',
    libraryTarget : 'umd',
    path: path.resolve(__dirname, 'dist'), // base path where to send compiled assets
    publicPath: '/' // base path where referenced files will be look for
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src') // shortcut to reference src folder from anywhere
    }
  },
  module: {
    rules: [
      { // config for es6 jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
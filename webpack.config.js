var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


module.exports = {
	context: path.join(__dirname, '/'),
	entry: './public/index.js',
  output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
      sourceMapFilename: 'bundle.map'
  },
  devtool: 'source-map',
  module: {
      loaders: [
          {test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
  },
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
				to: "bootstrap.min.css"
			},
			{
				from: 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
				to: "bootstrap-theme.min.css"
			},
			{
				from: 'public/default.html',
				to: 'default.html'
			}
		]),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings: true
			}
		})
	]
};
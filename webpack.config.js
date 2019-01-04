const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [{
			test: /\.jsx?$/,
      use: 'babel-loader',
			include: path.resolve(__dirname, 'src'),
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html'),
		})
	],
	devtool: 'inline-source-map',
	devServer: {
		port: 3555,
		open: true,
		overlay: true,
		historyApiFallback: true,
	}
}
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
} , {
  test: /\.(png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
    name: "[path][name].[ext]",
    publicPath: "..", // move up from 'main_window'
    context: "src", // set relative working folder to src
  }
});

plugins.push(
  new CopyWebpackPlugin({
    patterns: [{ from: path.join("src", "images"), to: "images" }]
  })
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "source-map",
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ExtractCssChunks.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new ExtractCssChunks(),
    new HtmlWebpackPlugin({
      title: "Hello Webpack",
    }),
  ],
};

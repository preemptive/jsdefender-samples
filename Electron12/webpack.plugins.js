const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: false,
  })
];

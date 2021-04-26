const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
         new JSDefenderWebpackPlugin({
            configurationFile: "./jsdefender.config.json",
            quietMode: false,
            enableInDevelopmentMode: true,
        })
  ]
}
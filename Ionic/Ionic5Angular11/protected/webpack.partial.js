const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
         new JSDefenderWebpackPlugin({
            configurationFile: "./jsdefender.config.json",
            quietMode: false,
            enableInDevelopmentMode: true,
            excludeChunks: ["runtime-main", "vendors~main", "vendors~polyfills-core-js", "vendors~polyfills-dom"],
        })
  ]
}
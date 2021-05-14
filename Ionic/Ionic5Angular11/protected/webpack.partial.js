const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: true,
      excludeChunks: ["common", "polyfills", "polyfills-core-js", "polyfills-css-shim", "polyfills-dom", "polyfills-es5", "runtime", "styles", "vendor"]
    })
  ]
}
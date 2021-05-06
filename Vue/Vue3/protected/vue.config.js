const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new JSDefenderWebpackPlugin({
        configurationFile: "./jsdefender.config.json",
        quietMode: false,
        enableInDevelopmentMode: false,
        excludeChunks: [ 'chunk-vendors' ]
      })
    ]
  }
}
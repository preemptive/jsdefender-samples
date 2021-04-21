const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
    // new JSDefenderWebpackPlugin({
    //   /* All the configuration from the above example can be used here, plus: */
    //   excludeChunks: [ 'vendor', 'scripts', 'common', 'runtime', 'polyfills', 'polyfills-es5', 'styles', 'inline' ] // vendor chunk should be always excluded, but other system chunks could also have problems, especially the polyfills
    // })
         new JSDefenderWebpackPlugin({
            configurationFile: "./jsdefender.config.json",
            quietMode: false,
            enableInDevelopmentMode: false,
        })
  ]
}
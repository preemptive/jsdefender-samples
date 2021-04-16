const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new JSDefenderWebpackPlugin({
        configurationFile: "./jsdefender.config.json",
        quietMode: false,
        enableInDevelopmentMode: false,
    })
  );

  return config;
}
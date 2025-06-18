const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    const babelLoader = config.module.rules
    .find(rule => Array.isArray(rule.oneOf)).oneOf
    .find(rule => rule.loader && rule.loader.includes('babel-loader'));

    babelLoader.options.presets = [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: {
              esmodules: true, // ✅ Target modern ES modules supporting environments
            },
            useBuiltIns: 'entry',
            corejs: '3',
            bugfixes: true,
            shippedProposals: true, // ✅ Include stage 3+ proposals (ES2024+)
          },
        ],
        require.resolve('@babel/preset-react')
      ];

    config.plugins.push(
        new JSDefenderWebpackPlugin({
            configurationFile: "./jsdefender.config.json",
            quietMode: false,
            enableInDevelopmentMode: true,
            excludeChunks: ["runtime-main", "vendors~main"]
        })
    );

    return config;
}
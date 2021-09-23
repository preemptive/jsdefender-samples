/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const jsdefenderMetroPlugin = require("@preemptive/jsdefender-metro-plugin")(
  // --- JSDefender config
  {
    configurationFile: "./jsdefender.config.json",
    quietMode: false,
    protectUserModulesOnly: false,
    enableInDevelopmentMode: true,
    ignoreUnsafeConstructs: true
  },
  // --- Metro config
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  }
);

module.exports = jsdefenderMetroPlugin;

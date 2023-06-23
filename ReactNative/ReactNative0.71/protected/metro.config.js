/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const jsdefenderMetroPlugin = require("@preemptive/jsdefender-metro-plugin")(
  // --- JSDefender config
  {
    configurationFile: "jsdefender.config.json",
    quietMode: false,
    protectUserModulesOnly: true,
    enableInDevelopmentMode: false,
  },
  // --- Metro config
  {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      })
    }
  }
)

module.exports = jsdefenderMetroPlugin;

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     })
//   }
// }
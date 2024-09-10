/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('@react-native/metro-config');
const jsdefenderMetroPlugin = require('@preemptive/jsdefender-metro-plugin');

// Default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// JSDefender configuration
const jsdefenderConfig = {
  configurationFile: 'jsdefender.config.json', // Ensure the path is correct
  quietMode: false,
  protectUserModulesOnly: true,
  enableInDevelopmentMode: false,
};



// Merging default Metro configuration with JSDefender plugin
const metroConfig = jsdefenderMetroPlugin(jsdefenderConfig, defaultConfig);

module.exports = metroConfig;

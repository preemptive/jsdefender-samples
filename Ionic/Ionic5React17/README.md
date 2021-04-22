# PreEmptive Ionic React sample app

## About this project
This project displays list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API upon landing the app. This project showcases how to integrate the JSDefender with your project.

## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `jsdefender-core-<version>.tgz` and `jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Run `npm install` command

## Commands
1. `npm start` to run the build in Dev mode.
2. `npm build` to build in Prod mode. To run:
    ```
    npm install -g serve
    serve -s build
    ```
3. `npm run build:android` to run the build for Android.
4. `npm run build:ios` to run the build for iOS.


## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses [`react-app-rewired`](https://www.npmjs.com/package/react-app-rewired) which overrides webpack configuration using `config-overrides.js` file:

```javascript
const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = function override(config, env) {
  ...
  config.plugins.push(
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: true
    })
  );
};
```

The most relevant part of this file is the `plugin` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
JSDefenderWebpackPlugin:
Preemptive Protection JSDefender (v2.0.0-next.0)
(C) Preemptive, 2019-2020
Processing chunk id: 0, name: ...
Processing chunk id: 1, name: ...
Processing chunk id: 2, name: ...
Processing chunk id: 3, name: ...
Processing chunk id: 4, name: ...
Info: Developer license is valid.
...
Execution time: 3s 562ms

(other messages omitted for the sake of brevity)
```

By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details on how the webpack plugin works refer this [link](https://www.preemptive.com/jsdefender/userguide/en/webpack_plugin.html).
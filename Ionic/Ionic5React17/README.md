# PreEmptive Ionic React sample app

## Prerequisites
1. Npm installed
2. Install `npm install -g serve`

## Commands
1. `npm start` to run the build in Dev mode.
2. `npm build` to run the build in Prod mode.
3. `npm run build:android` to run the build for Android.
4. `npm run build:ios` to run the build for iOS.

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
1. Copy the `jsdefender-core-<version>.tgz` and `jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](protected/assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
1. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](protected/package.json) based on the version of your `*.tgz` files.

## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses this `webpack.config.js` file:

```javascript
const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = {
  ...
  plugins: [
    ...
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: false,
    })
  ]
};
```

The most relevant part of this file is the `plugins` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the project's root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

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

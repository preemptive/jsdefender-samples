# PreEmptive Electron sample app

## About this project
This project displays list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API upon landing the app. This project showcases how to integrate the JSDefender with your project.

## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed. JSDefender requires Node.js version 7.10.1 or higher.

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `preemptive-jsdefender-core-<version>.tgz` and `preemptive-jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Run `npm install` command

## Commands
1. `npm start` to run the build in Dev mode.
2. `npm run package` to create build for target OS.

## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses this `webpack.plugins.js` file:

```javascript
const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = [
  ...
  new JSDefenderWebpackPlugin({
    configurationFile: "./jsdefender.config.json",
    quietMode: false,
    enableInDevelopmentMode: true
  })
};
```

Adding plugin sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
Compiling Renderer Template[Info] JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.       
[Info] JSDefenderWebpackPlugin: Processing chunk id: 0, name: main_window (runtime)
⠙ Compiling Renderer TemplateInfo: Evaluation Copy.
Licensed to: ...
Floating User License: ...
This software may not be used on binaries for general release.Distinct License Users: 1/3; Concurrent Build Limit: 3     
Info: JSDefender is up to date.
⠹ Compiling Renderer TemplateInfo: Source tree building in progress...
Info: File #1 is recognized as 'webpack4-bundle/prod' with 9 modules.
Info: Source tree successfully built.
Info: Total length: 51140
Info: #of scripts: 1
Info: #of syntax nodes: 2052
Info: Highest ES version: ES5
...
Info: Protected files rendered successfully.
⠹ Compiling Renderer Template[Info] JSDefenderWebpackPlugin: Chunk id: 0, name: main_window is successfully processed    
[Info] JSDefenderWebpackPlugin: All chunks are protected successfully.
[Info] JSDefenderWebpackPlugin: Execution time: 3s 927ms

(other messages omitted for the sake of brevity)
```

By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details refer this [link](https://www.preemptive.com/jsdefender/userguide/en/index.html).
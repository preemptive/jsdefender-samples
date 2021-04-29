# PreEmptive Vue sample app

## Project Info
This is a sample Vue app where [JsDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Vue 3.

## About the BackEnd
This is a Login based project which is using the [Swapi People](https://swapi.dev/api/people/1) API to Authenticate. And after the successful authentication, in dashboard it displays list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API.
SWAPI (Star Wars API) is an open source project which provides the Star Wars Data and used here for the demonstration purpose.

**Sample credentials to login:**
Username: `Luke Skywalker`
DOB: `19BBY`

## Prerequisites
1. JSDefender requires **[Node.js](https://nodejs.org/en/download/)** version 7.10.1 or higher.
2. **[Npm](https://nodejs.org/en/download/)** installed. 

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `preemptive-jsdefender-core-<version>.tgz` and `preemptive-jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Run `npm install` command

## Commands
1. `npm run serve` to run the build in Dev mode.
2. `npm run build` to run the build in Prod mode.

## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses this `vue.config.js` file:

```javascript
const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = {
  configureWebpack: [
    plugins: [
      ...
      new JSDefenderWebpackPlugin({
        configurationFile: "./jsdefender.config.json",
        quietMode: false,
        enableInDevelopmentMode: true
      })
    ]
  ]
};
```

The most relevant part of this file is the `plugins` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
[Info] JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.
[Info] JSDefenderWebpackPlugin: Processing chunk id: app, name: app (runtime)
[Info] JSDefenderWebpackPlugin: Processing chunk id: chunk-0cce43c0, name: null
[Info] JSDefenderWebpackPlugin: Processing chunk id: chunk-2d21a3d2, name: null
[Info] JSDefenderWebpackPlugin: Processing chunk id: chunk-vendors, name: chunk-vendors
...
This software may not be used on binaries for general release.Distinct License Users: 1/3; Concurrent Build Limit: 3     
Info: JSDefender is up to date.
...
[Info] JSDefenderWebpackPlugin: All chunks are protected successfully.
[Info] JSDefenderWebpackPlugin: Execution time: 10s 101ms
```

### Flag: enableInDevelopmentMode
By setting `enableInDevelopmentMode` option of the plugin to `true`, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as `false`. For more details refer this [link](https://www.preemptive.com/jsdefender/userguide/en/index.html).
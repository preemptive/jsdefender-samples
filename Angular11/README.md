# PreEmptive Angular sample app

## About this project
This is a Login based project which uses [Swapi people](https://swapi.dev/api/people/1) API to be able to Authenticate at the time of login. And after the successful authentication, in dashboard it displays list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API. This project showcases how to integrate the JSDefender with your project.

**Sample credentials to login:**

Username: `Luke Skywalker`

DOB: `19BBY`

## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed. JSDefender requires Node.js version 7.10.1 or higher.

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `jsdefender-core-<version>.tgz` and `jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Run `npm install` command

## Commands
1. `ng serve` to run the build in Dev mode.
2. `ng build --prod` to build in Prod mode.

## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses [`@angular-builders/custom-webpack`](https://www.npmjs.com/package/@angular-builders/custom-webpack) which overrides webpack configuration using `webpack.partial.js` file:

```javascript
const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
    ...
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: true
    })
  ]
}
```

The most relevant part of this file is the `plugin` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.
[Info] JSDefenderWebpackPlugin: Processing chunk id: home-home-module, name: home-home-module
[Info] JSDefenderWebpackPlugin: Processing chunk id: login-login-module, name: login-login-module
[Info] JSDefenderWebpackPlugin: Processing chunk id: main, name: main
[Info] JSDefenderWebpackPlugin: Processing chunk id: polyfills, name: polyfills
[Info] JSDefenderWebpackPlugin: Processing chunk id: runtime, name: runtime (runtime)
[Info] JSDefenderWebpackPlugin: Processing chunk id: styles, name: styles
[Info] JSDefenderWebpackPlugin: Processing chunk id: vendor, name: vendor
This software may not be used on binaries for general release.Distinct License Users: 1/3; Concurrent Build Limit: 3
Info: JSDefender is up to date.
Info: Source tree building in progress...
Info: File #1 is recognized as 'webpack4-chunk/dev' with 3 modules.
Info: File #2 is recognized as 'webpack4-chunk/dev' with 4 modules.
Info: File #3 is recognized as 'webpack4-chunk/prod' with 14 modules.
Info: File #4 is recognized as 'webpack4-chunk/prod' with 3 modules.
Info: File #5 is recognized as 'webpack4-bundle/dev' with 0 module.
Info: File #6 is recognized as 'webpack4-chunk/dev' with 238 modules.
Info: Source tree successfully built.
Info: Total length: 3516651
Info: #of scripts: 6
Info: #of syntax nodes: 287400
Info: Highest ES version: ES2017

(other messages omitted for the sake of brevity)
```
By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details refer this [link](https://www.preemptive.com/jsdefender/userguide/en/index.html).
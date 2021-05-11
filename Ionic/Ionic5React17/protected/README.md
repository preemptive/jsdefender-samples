# JSDefender Ionic React sample application

## Project Info
This is a sample Ionic React app where [JSDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Ionic 5 React 17.

## About the BackEnd
This project displays a list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API upon landing the app. SWAPI (Star Wars API) is an open-source project which provides the Star Wars Data and used here for the demonstration purpose.

## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed. JSDefender requires Node.js version 7.10.1 or higher.
2. [Ionic cli](https://ionicframework.com/docs/cli) installed.
3. For building Android app, [Android Studio](https://developer.android.com/studio) installed.
4. For building an iOS app, [Xcode](https://developer.apple.com/xcode/) installed.

## Setting up the JSDefender Toolset

1. If you have not done yet, download [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) to your machine.
2. Copy the `preemptive-jsdefender-core-<version>.tgz` and `preemptive-jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Set the `JSDEFENDER_LICENSE` environment variable as your license with or without your email address separated by a colon.
    ```
    E.g. <your_license_key>

    With email: <your_license_key>:my_email@test.com
    ```

    For more detail refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/intro_licensing.html)
5. Run the `npm install` command.
6. Run the `npx cap sync android` command for running Android build.
7. Run the `npx cap sync ios` command for running Android build.

## Commands
1. `npm run start:browser:dev` to run the app in Dev mode in the browser.
2. `npm run start:browser:prod` to run the app in Prod mode in the browser.
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
      enableInDevelopmentMode: true,
      excludeChunks: ["runtime-main", "vendors~main", "vendors~polyfills-core-js", "vendors~polyfills-dom"]
    })
  );
};
```

The most relevant part of this file is the `plugin` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
[Info] JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.
[Info] JSDefenderWebpackPlugin: Processing chunk id: 0, name: null
[Info] JSDefenderWebpackPlugin: Processing chunk id: 1, name: main
[Info] JSDefenderWebpackPlugin: Processing chunk id: 2, name: polyfills-dom
[Info] JSDefenderWebpackPlugin: Processing chunk id: 3, name: runtime-main (runtime)
...
Info: Source tree building in progress...
Info: File #1 is recognized as 'webpack4-chunk/prod' with 1 module.
Info: File #2 is recognized as 'webpack4-chunk/prod' with 7 modules.
Info: File #3 is recognized as 'webpack4-chunk/prod' with 1 module.
Info: File #4 is recognized as 'webpack4-bundle/prod' with 0 module.
...
[Info] JSDefenderWebpackPlugin: All chunks are protected successfully.
[Info] JSDefenderWebpackPlugin: Execution time: 57s 135ms

(other messages omitted for the sake of brevity)
```

### **enableInDevelopmentMode**
By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details refer to [user guid](https://www.preemptive.com/jsdefender/userguide/en/webpack_plugin.html).

### **excludeChunks**
We excluded the React runtime chunk called `runtime-main` and the vendor chunk called `vendors-main` by providing those to the `excludeChunks` array. As a best practice, most of the time framework related and vendor chunks should not be protected because those type of chunks contain only 3rd party code. We recommend to exclude these chunks mostly because of performance reasons, but sometimes these contain code which cannot be correctly protected by JSDefender.
# PreEmptive Ionic Vue sample app

## Project Info
This is a sample Ionic Vue app where [JsDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Ionic 5 Vue 3.

## About the BackEnd
This project displays a list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API upon landing the app. SWAPI (Star Wars API) is an open-source project which provides the Star Wars Data and used here for the demonstration purpose.
## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed. JSDefender requires Node.js version 7.10.1 or higher.
2. For building Android app, [Android Studio](https://developer.android.com/studio) installed.
3. For building an iOS app, [Xcode](https://developer.apple.com/xcode/) installed.

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `preemptive-jsdefender-core-<version>.tgz` and `preemptive-jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Set the `JSDEFENDER_LICENSE` environment variable as your license with or without your email address separated by a colon.
    ```
    E.g. C3B940E5A00D492AAB45DD28091E9C53

    With email: C3B940E5A00D492AAB45DD28091E9C53:my_email@test.com
    ```

    For more detail refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/intro_licensing.html)

5. Run the `npm install` command
## Commands
1. `npm run serve` to run the build in Dev mode.
2. `npm run build` to run the build in Prod mode.
3. `npm run build:android` to run the build for Android.
4. `npm run build:ios` to run the build for iOS.

## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses this `vue.config.js` file:

```javascript
const {
  JSDefenderWebpackPlugin,
} = require("@preemptive/jsdefender-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      ...
      new JSDefenderWebpackPlugin({
        configurationFile: "./jsdefender.config.json",
        quietMode: false,
        enableInDevelopmentMode: false,
        excludeChunks: [ 'chunk-vendors' ]
      })
    ]
  }
};
```

The most relevant part of this file is the `plugins` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
[Info] JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.
[Info] JSDefenderWebpackPlugin: Processing chunk id: 0, name: null
[Info] JSDefenderWebpackPlugin: Processing chunk id: 1, name: main
[Info] JSDefenderWebpackPlugin: Processing chunk id: 2, name: polyfills-dom
[Info] JSDefenderWebpackPlugin: Processing chunk id: 3, name: runtime-main (runtime)
...
This software may not be used on binaries for general release.Distinct License Users: 1/3; Concurrent Build Limit: 3
Info: JSDefender is up to date.
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
The `enableInDevelopmentMode` option of the plugin should be turned off by setting it to `false` in case of vue-cli projects to prevent the app to crash in development mode. The Webpack chunks created by the vue-cli in development mode rely heavily on `eval()` statements to make debugging work but those statements cannot be correctly protected by JSDefender. However, these statements are removed in production mode, so JSDefender is able to protect the project in that mode. Check out the [user guide](https://www.preemptive.com/jsdefender/userguide/en/index.html) for more details.

This option is turned off by default, here we set it to `false` explicitly just to showcase it, feel free to fully omit that line in your configuration.

### **excludeChunks**
We excluded the vendor chunk called `chunk-vendors` by providing it to the `excludeChunks` array. As a best practice, most of the time vendor chunks should not be protected because those type of chunks contain only 3rd party code. We recommend to exclude vendor chunks mostly because of performance reasons, but sometimes these contain code which cannot be correctly protected by JSDefender.
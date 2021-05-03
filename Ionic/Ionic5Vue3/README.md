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
By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. The chunks in development mode of vue-cli rely heavily on `eval()` statements, JSDefender cannot protect that, but it works perfectly in production mode. For more details refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/webpack_plugin.html).

### **excludeChunks**
Be sure to not include the `vendor` chunk because it has some deprecated code in it that JSDefender cannot protect. If you still encounter problems after excluding the `vendor` chunk, then you should try to exclude other system chunks starting with the `polyfills` and `polyfills-es5`, but if you want maximal performance, exclude every system chunk. The exclusion can be achieved either by including the app's chunks one-by-one, or by excluding the appropriate chunks. Of course you can also include or exclude any other chunk.
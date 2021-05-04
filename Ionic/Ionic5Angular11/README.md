# PreEmptive Ionic Angular sample app

## Project Info
This is a sample Ionic Angular app where [JsDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Ionic 5 Angular 11.

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
1. `ng serve` to run the build in Dev mode.
2. `ng serve --prod` to build in Prod mode.
3. `npm run build:android` to run the build for Android.
4. `npm run build:ios` to run the build for iOS.

## How It Works

This project uses the JSDefenderWebpackPlugin that invokes JSDefender as the last step of the build process. The sample uses @angular-builders/custom-webpack which overrides webpack configuration using webpack.partial.js file:

```javascript
const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
    ...
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: true,
    })
  ]
}
```

The most relevant part of this file is the `plugin` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

```
JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.
[Info] JSDefenderWebpackPlugin: Processing chunk id: 0, name: common
[Info] JSDefenderWebpackPlugin: Processing chunk id: 1, name: runtime (runtime)
[Info] JSDefenderWebpackPlugin: Processing chunk id: 2, name: null
[Info] JSDefenderWebpackPlugin: Processing chunk id: 3, name: main

...
This software may not be used on binaries for general release.Distinct License Users: 1/3; Concurrent Build Limit: 3
Info: JSDefender is up to date.
Info: Source tree building in progress...
Info: File #2 is recognized as 'webpack4-bundle/prod' with 0 module.
Info: File #3 is recognized as 'webpack4-chunk/dev' with 1 module.
Info: File #12 is recognized as 'webpack4-chunk/dev' with 1 module.
Info: File #19 is recognized as 'webpack4-chunk/dev' with 1 module.
Info: File #21 is recognized as 'webpack4-chunk/dev' with 1 module.
Info: File #23 is recognized as 'webpack4-chunk/dev' with 1 module.

...
[Info] JSDefenderWebpackPlugin: All chunks are protected successfully.
[Info] JSDefenderWebpackPlugin: Execution time: 25s 58ms

(other messages omitted for the sake of brevity)
```
### **enableInDevelopmentMode**

By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/webpack_plugin.html).
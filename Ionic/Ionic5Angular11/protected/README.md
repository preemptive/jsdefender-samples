# JSDefender Ionic Angular sample application

## Project Info
This is a sample Ionic Angular app where [JSDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Ionic 5 Angular 11.

## About the BackEnd
This project displays a list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API upon landing the app. SWAPI (Star Wars API) is an open-source project which provides the Star Wars Data and used here for the demonstration purpose.

## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed. JSDefender requires Node.js version 7.10.1 or higher.
2. [Ionic cli](https://ionicframework.com/docs/cli) installed.
3. For building Android app, [Android Studio](https://developer.android.com/studio) installed.
4. For building an iOS app, [Xcode](https://developer.apple.com/xcode/) installed.

## Setting up the JSDefender Toolset
1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `preemptive-jsdefender-core-<version>.tgz` and `preemptive-jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Set the `JSDEFENDER_LICENSE` environment variable as your license with or without your email address separated by a colon.
    ```
    E.g. <your_license_key>

    With email: <your_license_key>:my_email@test.com
    ```

    For more detail refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/intro_licensing.html)

5. Run the `npm install` command

## Commands
1. `npm run start:browser:dev` to run the app in Dev mode in the browser.
2. `npm run start:browser:prod`  to run the app in Prod mode in the browser.
3. `npm run start:android` to run the build for Android.
4. `npm run start:ios` to run the build for iOS.

## How It Works

This project uses the JSDefenderWebpackPlugin that invokes JSDefender as the last step of the build process. The sample uses `@angular-builders/custom-webpack` which overrides webpack configuration using webpack.partial.js file:

```javascript
const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = {
  plugins: [
    ...
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: true,
      excludeChunks: ["common", "polyfills", "polyfills-core-js", "polyfills-css-shim", "polyfills-dom", "polyfills-es5", "runtime", "styles", "vendor"]
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
JSDefenderWebpackPlugin: Preemptive Protection JSDefender(TM) (v2.3.0)
Copyright 2019-2021 PreEmptive Solutions, LLC. All Rights Reserved
[Info] JSDefenderWebpackPlugin: Use of this software constitutes acceptance of the accompanying license agreement.
...
Info: Source tree successfully built.
Info: Total length: 3516651
Info: #of scripts: 6
Info: #of syntax nodes: 287400
Info: Highest ES version: ES2017

(other messages omitted for the sake of brevity)
```

### **enableInDevelopmentMode**
By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/webpack_plugin.html).

### **excludeChunks**
We excluded the Angular runtime chunks namely `common`, `polyfills`, `polyfills-core-js`, `polyfills-css-shim`, `polyfills-dom`, `polyfills-es5`, `runtime`, `styles`, and the `vendor` chunk by providing those to the `excludeChunks` array. As a best practice, most of the time framework related and vendor chunks should not be protected because those type of chunks contain only 3rd party code. We recommend to exclude these chunks mostly because of performance reasons, but sometimes these contain code which cannot be correctly protected by JSDefender.
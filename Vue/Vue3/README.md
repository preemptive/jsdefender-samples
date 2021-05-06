# JSDefender Vue sample application

## Project Info
This is a sample Vue app where [JSDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Vue 3.

## About the BackEnd
This is a Login-based project which is using the [Swapi People](https://swapi.dev/api/people/1) API to Authenticate. And after the successful authentication, the dashboard displays a list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API.
SWAPI (Star Wars API) is an open-source project which provides the Star Wars Data and used here for the demonstration purpose.

**Sample credentials to login:**
Username: `Luke Skywalker`

DOB: `19BBY`

## Prerequisites
1. JSDefender requires **[Node.js](https://nodejs.org/en/download/)** version 7.10.1 or higher.
2. **[Npm](https://nodejs.org/en/download/)** installed. 

## Setting up the JSDefender Toolset

1. If you have not done yet, download [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) to your machine.
2. Copy the `preemptive-jsdefender-core-<version>.tgz` and `preemptive-jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Set `JSDEFENDER_LICENSE` environment variable as your license with or without your email address separated by a colon.
    ```
    E.g. <your_license_key>

    With email: <your_license_key>:my_email@test.com
    ```

    For more detail refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/intro_licensing.html)

5. Run the `npm install` command

## Commands
1. `npm run start:dev` to run the build in Dev mode.
2. `npm run start:prod` to run the build in Prod mode.

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
        enableInDevelopmentMode: false,
        excludeChunks: [ 'chunk-vendors' ]
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
[Info] JSDefenderWebpackPlugin: All chunks are protected successfully.
[Info] JSDefenderWebpackPlugin: Execution time: 10s 101ms
```

### **enableInDevelopmentMode**
The `enableInDevelopmentMode` option of the plugin should be turned off by setting it to `false` in case of vue-cli projects to prevent the app to crash in development mode. The Webpack chunks created by the vue-cli in development mode rely heavily on `eval()` statements to make debugging work but those statements cannot be correctly protected by JSDefender. However, these statements are removed in production mode, so JSDefender is able to protect the project in that mode. Check out the [user guide](https://www.preemptive.com/jsdefender/userguide/en/index.html) for more details.

This option is turned off by default, here we set it to `false` explicitly just to showcase it, feel free to fully omit that line in your configuration.

### **excludeChunks**
We excluded the vendor chunk called `chunk-vendors` by providing it to the `excludeChunks` array. As a best practice, most of the time vendor chunks should not be protected because those type of chunks contain only 3rd party code. We recommend to exclude vendor chunks mostly because of performance reasons, but sometimes these contain code which cannot be correctly protected by JSDefender.
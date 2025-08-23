# JSDefender Electron sample application

## Project Info
This is a sample Electron app where [JSDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Electron 12.

## About the BackEnd
This project displays a list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API upon landing the app. SWAPI (Star Wars API) is an open-source project which provides the Star Wars Data and used here for the demonstration purpose.

## Prerequisites
1. [Npm](https://nodejs.org/en/download/) installed. JSDefender requires Node.js version 7.10.1 or higher.

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

5. Run the `npm install` command

## Commands
1. `npm start` to run the build in Dev mode.
2. `npm run make` to build the app in prod mode and create the installers for the platforms specified in `package.json`. Please note you normally can only target the platform that you run the command from.

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
⠙ Compiling Renderer Template
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

### **enableInDevelopmentMode**
By setting `enableInDevelopmentMode` option of the plugin to true, the protection is enabled for all modes('development', 'production'). To change this behavior, set this option as false. For more details refer to this [link](https://www.preemptive.com/jsdefender/userguide/en/webpack_plugin.html).

### CSP Error for unsafe-eval
Electron forge using webpack and webpack-ts template faces runtime CSP(Content Security Policy) error while using the 'npm run start' command to run this on the dev mode. However 'npm un make' to build the production will not face this issue. This is the issue of electron forge webpack.
In order to allow this unsafe-eval there is a config in the package.json 'devContentSecurityPolicy'. This config allows the unsafe-eval and thus, allows the application to run in the dev mode along with production as well.
This config fix the issue only for Electron forge, as eval is also not allowed by the JSDefender, this config will not fix the JSDefender issue, as it is related to core JSDefender.
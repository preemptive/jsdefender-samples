# PreEmptive Angular sample app

## Prerequisites
1. Npm installed

> *Remark*: Please name the minimum version of npm to use. The JSDefender team uses v6.14 or over

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
2. Copy the `jsdefender-core-<version>.tgz` and `jsdefender-webpack-plugin-<version>.tgz` files from your download directory to the [`assets`](assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
3. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](package.json) based on the version of your `*.tgz` files.
4. Run `npm install` command

## The Demo Application

> *Remark*: Describe in a few sentences what the application does. If it is important, discuss a few implementation details.

## Commands
1. `ng serve` to run the build in Dev mode.
2. `ng build --prod` to build in Prod mode.

## How It Works

This project uses the `JSDefenderWebpackPlugin` that invokes JSDefender as the last step of the build process. The sample uses [`@angular-builders/custom-webpack`](https://www.npmjs.com/package/@angular-builders/custom-webpack) which overrides webpack configuration using `webpack.partial.js` file:

```javascript
const { JSDefenderWebpackPlugin } = require('@preemptive/jsdefender-webpack-plugin');

module.exports = function override(config, env) {
  ...
  config.plugins.push(
    new JSDefenderWebpackPlugin({
      configurationFile: "./jsdefender.config.json",
      quietMode: false,
      enableInDevelopmentMode: false,
    })
  );
};
```

The most relevant part of this file is the `plugin` section that sets up the `JSDefenderWebpackPlugin`. It reads the protection configuration from the `jsdefender.config.json` file, which you can find in the sample root folder. By setting `quietMode` to false, the plugin displays log messages while Webpack runs:

> *Remark*: The output below is not the the one JSDefender emits when using with Angular build pipeline. Change it to an extract from the real  output.

```
JSDefenderWebpackPlugin:
Preemptive Protection JSDefender (v2.0.0-next.0)
(C) Preemptive, 2019-2020
Processing chunk id: 0, name: ...
Processing chunk id: 1, name: ...
Processing chunk id: 2, name: ...
Processing chunk id: 3, name: ...
Processing chunk id: 4, name: ...
Info: Developer license is valid.
...
Execution time: 3s 562ms

(other messages omitted for the sake of brevity)
```

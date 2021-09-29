# PreEmptive Protection JSDefender Samples

This sample project demonstrates how you can use the JSDefender metor plugin to protect React Native applications. The code in this demo utilizes fundamental React Native features.

- The [original](original) folder contains the _unprotected_ version of the code.
- You can discover [protected](protected) folder to examine the project that leverages JSDefender.

> **Note**: All further explanations assume you use the `protected` folder as the root project directory.

## Setting up the JSDefender Toolset

1. If you have not done yet, install [JSDefender](https://www.preemptive.com/products/jsdefender/downloads) on your machine.
1. Copy the `jsdefender-core-<version>.tgz` and `jsdefender-metro-plugin-<version>.tgz` files from your download directory to the [`assets`](protected_demo/assets/) folder of this demo. Here, `<version>` represents your downloaded JSDefender version number.
1. Replace the `{version}` placeholders within the `"devDependencies"` section in [`package.json`](protected_demo/package.json) based on the version of your `*.tgz` files.

## Configure JSDefender Metro plugin

You can configure it in the [metro.config.js](protected_demo/metro.config.js) file and in the [jsdefender.config.json](protected_demo/jsdefender.config.json) file.

## Build and Run the Sample on Android

1. Run `npm install` to set up the dependencies to run this project.
1. If you are running it for the first time make sure that everything is configured like it is written in the official [documentation](https://reactnative.dev/docs/environment-setup)
1. Connect your Android device to your computer via USB OR start a compatible (see the [build.gradle](android/build.gradle) file's `buildscript` section for the SDK version) Android emulator
1. Run `npm run android:release` - it builds, bundles, minifies, packages and installs the app to an Android device or emulator
1. Because this is release mode feel free to close the Metro Bundler cli window after it opens

## Build and Run the Sample on iOS

1. Run `npm install` to set up the dependencies to run this project.
1. If you are running it for the first time make sure that everything is configured like it is written in the official [documentation](https://reactnative.dev/docs/environment-setup)
1. Run `npm run ios:release` - it builds, bundles, minifies, packages and installs the app to an Android device or emulator
1. Because this is release mode feel free to close the Metro Bundler cli window after it opens

## Differences from the Original Code

- [`package.json`](protected/package.json): new `devDependencies` entries for JSDefender packages
- [`metro.config.js`](protected/metro.config.js): the configured `jsdefenderMetroPlugin` as the export
- [`jsdefender.config.json`](protected/jsdefender.config.json): The JSDefender configuration file

# Webpack4 demo

Simple webpack4 project for demo.

This demo program contains five source files with these dependencies among them:
![image](loadingorder.png)

The Webpack configuration creates a separate chunk for each file. The chunk of `index.js` is the entry chunk, it loads the other chunks on demand.

## Build and run

1. Run `npm install` &mdash; it installs the dependencies plus symlinks the required JSDefender packages.
1. Run `npm run build:prod` to create the webpack bundles and put them into the `dist` folder.
1. Open the dist/index.html file in a browser and check the developer console

## Expected output

When you open up the [index.html](dist/index.html) file (which is in the dist directory) in your browser, you should see a beautiful unicorn in the middle and 3 button under it.

If you open up the developer console before you click any of the buttons, you should see `Styles are loaded.` message in the console.


### First button (_Print component_) expected output:

```
Print button is clicked!
The print.js module has loaded! See the network tab in dev tools...
I get called from print.js!
I get called from print.js for the second time!
```

### Second button (_Alert component_) expected output:

```
Alert button is clicked!
The alert.js module has loaded! See the network tab in dev tools...
I get called from alert.js!
The alertchild.js module has loaded! See the network tab in dev tools...
I get called from alertchild.js!
```

### Third button (_Hello component_) expected output:

```
Hello button is clicked!
The hello.json module is loaded! See the network tab in dev tools...
```

- And you should get an alert which is say: `Message from hello.json: Hello, World`


# JSDefender Vanilla JavaScript sample application

## Project Info
This is a sample Vanilla JavaScript app where [JSDefender](https://www.preemptive.com/products/jsdefender) is pre-configured and working with Vanilla JavaScript.

## About the BackEnd
This is a Login-based project which is using the [Swapi People](https://swapi.dev/api/people/1) API to Authenticate. And after the successful authentication, the dashboard displays a list of planets using [SWAPI planets](https://swapi.dev/api/planets/?page=1) API.
SWAPI (Star Wars API) is an open-source project which provides the Star Wars Data and used here for the demonstration purpose.

**Sample credentials to login:**

Username: `Luke Skywalker`

DOB: `19BBY`

## Prerequisites
1. JSDefender requires **[Node.js](https://nodejs.org/en/download/)** version 7.10.1 or higher.
2. **[Npm](https://nodejs.org/en/download/)** installed.

## Steps to Set up the JSDefender Toolset
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
For deployment: `npm run start-unix` or `npm run start-windows` depending on your platform.
After running this command in the root of the sample project, in your web browser navigate to http://localhost:8080 to view the sample.

## How It Works

This project uses the `JSDefenderCLI` that invokes JSDefender as the last step of the build process and protects all JavaScript files in the project. The protection runs
as part of the build script `build.sh` in command `jsdefender`. It reads the protection configuration from the `jsdefender.config.json`
file, which you can find in the sample root folder.

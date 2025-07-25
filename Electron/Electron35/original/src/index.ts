import { app, BrowserWindow } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// import { app, BrowserWindow, ipcMain, net } from 'electron';
// import path from 'path';
// declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }

// const createWindow = (): void => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     height: 600,
//     width: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       contextIsolation: true,
//       enableRemoteModule: false, // This should be false for security reasons
//     }
//   });

//   // and load the index.html of the app.
//   mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();
// };

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// ipcMain.handle('fetch-planets', async () => {
//   return new Promise((resolve, reject) => {
//     const request = net.request({
//       method: 'GET',
//       protocol: 'https:',
//       hostname: 'swapi.dev',
//       path: '/api/planets/?page=1',
//       redirect: 'follow'
//     });

//     request.on('response', (response) => {
//       let data = '';
//       response.on('data', (chunk) => {
//         data += chunk;
//       });
//       response.on('end', () => {
//         resolve(JSON.parse(data));
//       });
//     });

//     request.on('error', (error) => {
//       reject(error);
//     });

//     request.end();
//   });
// });

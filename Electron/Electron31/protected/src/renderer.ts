/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
// import remote  from '@electron/remote';

// const { net } = remote;
// const { net } = require('@electron/remote')
// const https = require('https');
import axios from 'axios';
// api to get list of planets from SWAPI
const request = axios.request({
    responseType:'stream',
    method: 'GET',
    baseURL: 'https://swapi.dev',
    // hostname: 'swapi.dev',
    url: '/api/planets/?page=1',
});

// on api response set to html
request.then((response) => {
        const data = JSON.parse(response.data);
        let elem = '<div>';

        for (let i = 0; i < data.results.length; i++) {
            elem += `<div class="response">
            <p>Planet Name: ${data.results[i].name}</p>
            <p>Rotation period: ${data.results[i].rotation_period}, Orbital period: ${data.results[i].orbital_period}, Diameter: ${data.results[i].diameter}</p>
            <p>Climate: ${data.results[i].climate}, Gravity: ${data.results[i].gravity}, Terrain: ${data.results[i].terrain}</p>
            <p>Surface water: ${data.results[i].surface_water}, Population: ${data.results[i].population}</p>
            </div>`;
        }

        elem += '</div>';
        document.getElementById('planets-card').innerHTML = elem;
        document.getElementById('show-loading').style.display = 'none';
});